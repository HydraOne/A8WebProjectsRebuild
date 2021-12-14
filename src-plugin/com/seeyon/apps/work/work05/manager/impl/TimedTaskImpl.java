package com.seeyon.apps.work.work05.manager.impl;

import com.alibaba.fastjson.JSONObject;
import com.seeyon.apps.work.utils.CtpCustomVariables;
import com.seeyon.apps.work.utils.RestHttpUtils;
import com.seeyon.apps.work.work05.manager.TimedTask;
import com.seeyon.apps.work.work05.dao.TimerDao;
import com.seeyon.cap4.form.bean.FormBean;
import com.seeyon.cap4.form.bean.FormTableBean;
import com.seeyon.cap4.form.service.CAP4FormManager;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.common.log.CtpLogFactory;
import org.apache.commons.logging.Log;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

/**
 * @author wangjiahao
 * @email wangjiahao@microcental.net
 * 定时任务
 */
public class TimedTaskImpl implements TimedTask {

    //日志
    private static final Log log = CtpLogFactory.getLog(TimedTaskImpl.class);

    //注入表单管理对象
    private CAP4FormManager cap4FormManager = (CAP4FormManager) AppContext.getBean("cap4FormManager");

    //注入dao层
    @Autowired
    private TimerDao timerDao;

    @Override
    public void initiateThePaymentProcess() throws Exception {
        //获取符合条件的主表结果
        List resultList = timerDao.getPaymentPlanCurrentDate();
        Map map = null;
        //拿到token
        String restName = CtpCustomVariables.demandConfiguration_restAccount;
        String restPassword = CtpCustomVariables.demandConfiguration_restPassword;
        String getUrl = CtpCustomVariables.demandConfiguration_getTokenUrl;
        getUrl += "/" + restName + "/" + restPassword;
        String tokenXML = RestHttpUtils.sendGetRequest(getUrl, "");
//        //将token集合字符串转为map，再拿到token字符串
        Map<String, Object> map2 = JSONObject.parseObject(tokenXML);
        String tokenString = (String) map2.get("id");
        //拼接url为rest接口
        String timerRestUrlString = CtpCustomVariables.demandConfiguration_nativePostRestUrlCtrls;
        timerRestUrlString += "?token=" + tokenString;
        String templateCode = CtpCustomVariables.demandConfiguration_contractFileFlowChart;
        //循环遍历每一条记录，每条记录发起一次付款流程
        if (resultList == null) return;
        for (Object o : resultList) {
            map = (Map) o;
            //获取合同名称 ，合同编号，合同金额
            Object contractName = map.get("合同名称");
            Object contractNo = map.get("合同编号");
            Object contractMoney = map.get("合同金额");
            //获取底表
            FormBean formBean = null;
            try {
                formBean = cap4FormManager.getFormByFormCode(templateCode);
            } catch (BusinessException e) {
                log.error("获取formBean失败", e);//error
            }
            //document
            Document document = DocumentHelper.createDocument();
            //添加一个节点
            Element rootElement = document.addElement("formExport");
            rootElement.addAttribute("version", "2.0");
            Element summaryElement = rootElement.addElement("summary");
            summaryElement.addAttribute("id", formBean.getId().toString());
            summaryElement.addAttribute("name", formBean.getMasterTableBean().getTableName());
            Element valuesElement = rootElement.addElement("values");
            final HashMap<Object, Object> objectObjectHashMap = new HashMap<>();
            valuesElement.addElement("column").addAttribute("name", "合同编号").addElement("value").addText(contractNo != null ? contractNo.toString() : "");
            valuesElement.addElement("column").addAttribute("name", "合同名称").addElement("value").addText(contractName != null ? contractName.toString() : "");
            valuesElement.addElement("column").addAttribute("name", "合同金额").addElement("value").addText(contractMoney != null ? contractMoney.toString() : "");
            valuesElement.addElement("subForms");
            RestHttpUtils.sendPostRequest(timerRestUrlString, document.asXML());
        }
    }

    @Override
    public void init() {
        //任务定时器
        Timer timer = new Timer();
        log.info("定时器初始化完成");
        final int[] i = {0};
        //参数：
        //task - 要安排的任务。
        //delay - 执行任务之前的延迟（以毫秒为单位）。
        //period - 连续任务执行之间的时间（以毫秒为单位）
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                log.info("第" + i[0]++ + "次执行定时任务");
                //调用发起流程的方法
                try {
                    initiateThePaymentProcess();
                } catch (Exception e) {
                    log.error("定时任务异常", e);
                }
                //未解决bug，事件触发器间隔设置太短，会导致重复发起同一合同的付款流程
                //且未更新原流程表中的状态
            }
            //1000 * 60 *60 * 24
        }, 1000, 1000 * 10);
    }
}