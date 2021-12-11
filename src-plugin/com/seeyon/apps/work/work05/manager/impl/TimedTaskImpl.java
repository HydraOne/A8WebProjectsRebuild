package com.seeyon.apps.work.work05.manager.impl;

import com.alibaba.fastjson.JSONObject;
import com.seeyon.apps.work.utils.CtpCustomVariables;
import com.seeyon.apps.work.utils.RestHttpUtils;
import com.seeyon.apps.work.work05.dao.TimerDao;
import com.seeyon.apps.work.work05.manager.TimedTask;
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

import java.security.acl.LastOwnerException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author Ch1stuntQAQ
 * @data 2021/9/29 - 9:22
 * @Description 实现类
 * 
ZH2021-09-222021100600076
 */

public class TimedTaskImpl implements  TimedTask{

    //日志
    private static final Log log = CtpLogFactory.getLog(TimedTaskImpl.class);

    //注入表单管理对象
    @Autowired
    private CAP4FormManager cap4FormManager;

    //注入dao层
    @Autowired
    private TimerDao timerDao;

    @Override
    public void initiateThePaymentProcess() {

        //获取符合条件的主表结果
        List resultList = timerDao.getDate();
        Map map = null;
        //拿到token
        String restName = CtpCustomVariables.demandConfiguration_restAccount;
        String restPassword = CtpCustomVariables.demandConfiguration_restPassword;
        String getUrl = CtpCustomVariables.demandConfiguration_getTokenUrl;
        getUrl += "/" + restName + "/" + restPassword;
        String tokenJson = RestHttpUtils.sendGetRequest(getUrl, "");
        //将token集合字符串转为map，再拿到token字符串
        Map<String, Object> map2 = JSONObject.parseObject(tokenJson);
        String tokenString = (String) map2.get("id");
        //拼接url为rest接口
        String timerRestUrlString = CtpCustomVariables.demandConfiguration_nativePostRestUrlCtrls;
        timerRestUrlString+="?token="+tokenString;
        String templateCode = CtpCustomVariables.demandConfiguration_bottomSheetOfContractFile;
        FormTableBean masterTableBean = null;
        try {
            masterTableBean = cap4FormManager.getFormByFormCode(templateCode).getMasterTableBean();
        } catch (BusinessException e) {
            log.error(e);//error
        }
        //循环遍历每一条纪律，每条记录发起一次付款流程
        if (resultList == null) return;
        for (Object o : resultList) {
            map = (Map) o;
            assert masterTableBean != null;
            //获取合同名称 ，合同编号，合同金额
            String contractName = String.valueOf(map.get(masterTableBean.getFieldBeanByDisplay("合同名称").getName()));
            String contractNo = String.valueOf(map.get(masterTableBean.getFieldBeanByDisplay("合同编号").getName()));
            String contractMoney = String.valueOf(map.get(masterTableBean.getFieldBeanByDisplay("合同金额").getName()));
            String resultMoney = String.valueOf(map.get(masterTableBean.getFieldBeanByDisplay("累计已付金额").getName()));
            //获取底表
            FormBean formBean = null;
            try {
                formBean = cap4FormManager.getFormByFormCode(templateCode);
            } catch (BusinessException e) {
                log.error("获取formBean失败——lisi",e);//error
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
            valuesElement.addElement("column").addAttribute("name", "合同编号").addElement("value").addText(contractNo != null ? contractNo : "");
            valuesElement.addElement("column").addAttribute("name", "合同名称").addElement("value").addText(contractName != null ? contractName : "");
            valuesElement.addElement("column").addAttribute("name", "合同金额").addElement("value").addText(contractMoney != null ? contractMoney : "");
            valuesElement.addElement("column").addAttribute("name", "已付款金额合计").addElement("value").addText(resultMoney != null ? resultMoney : "");
            valuesElement.addElement("subForms");
            RestHttpUtils.sendPostRequest(timerRestUrlString, document.asXML());
        }
    }

    @Override
    public void init() {

        final int[] i = {0};
        //任务定时器
        Timer timer = new Timer();
        //参数：
        //task - 要安排的任务。
        //delay - 执行任务之前的延迟（以毫秒为单位）。
        //period - 连续任务执行之间的时间（以毫秒为单位）
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                //调用发起流程的方法
            	try {
                    log.info("第"+ i[0]++ +"次进入定时器");
            		initiateThePaymentProcess();
            	}catch (Exception e) {
					log.error("定时任务异常",e);
				}
            }
            //1000 * 60 *60 * 24
        },1000,1000 * 60 *60 * 24);
    }
}