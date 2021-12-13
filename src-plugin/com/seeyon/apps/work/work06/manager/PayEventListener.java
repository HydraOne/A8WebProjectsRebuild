package com.seeyon.apps.work.work06.manager;

import com.seeyon.apps.collaboration.event.CollaborationFinishEvent;
import com.seeyon.apps.collaboration.po.ColSummary;
import com.seeyon.apps.work.utils.CtpCustomVariables;
import com.seeyon.apps.work.utils.HttpHelper;
import com.seeyon.apps.work.work01.dao.impl.ContractManagementMapperImpl;
import com.seeyon.cap4.form.bean.FormBean;
import com.seeyon.cap4.form.bean.FormTableBean;
import com.seeyon.cap4.form.service.CAP4FormManager;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.log.CtpLogFactory;
import com.seeyon.ctp.util.annotation.ListenEvent;
import org.apache.commons.logging.Log;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;


public class PayEventListener {

    @Autowired
    private ContractManagementMapperImpl contractManagementMapperImpl;

    @Autowired
    private CAP4FormManager cap4FormManager;
    private static final Log log = CtpLogFactory.getLog(PayEventListener.class);

    @ListenEvent(event = CollaborationFinishEvent.class, async = true)
    public void payAddToWebService(CollaborationFinishEvent event) throws Exception {
        ColSummary summary = event.getSummary();
        //获取表单模板id
        Long formAppid = summary.getFormAppid();
        //获取具体该条数据的id
        Long formRecordId = summary.getFormRecordid();
        //通过表单模板id取到表格
        FormBean form = cap4FormManager.getForm(formAppid);
        FormTableBean masterTableBean = null;
        if (form != null) {
            //拿到主表
            masterTableBean = form.getMasterTableBean();
        }
        if (masterTableBean != null) {
            //拿到表名
            String tableName = masterTableBean.getTableName();
            //判断是否是自己定义的那张表格，不是的话取反，让方法结束，是的话取反，让继续执行代码
            if (!tableName.equals(cap4FormManager.getFormByFormCode(CtpCustomVariables.demandConfiguration_paymentFlowSheet).getMasterTableBean().getTableName())) {
                return;
            }
            log.info("合同支付完成，进行金额累加");
            //监听到流程结束，拿到合同编号和本次付款金额
            Map resultMap = contractManagementMapperImpl.selectTableDetailsByTableNameAndFormRecordId(tableName, formRecordId);
            String contractNo = String.valueOf(resultMap.get(masterTableBean.getFieldBeanByDisplay("合同编号").getName()));
            String contractMoney = String.valueOf(resultMap.get(masterTableBean.getFieldBeanByDisplay("合同金额").getName()));
            //封装xml，传入工具类，调用webservice接口进行金额累加
            String WebServiceUrl =  CtpCustomVariables.demandConfiguration_webservice;
            //document
            Document document = DocumentHelper.createDocument();
            //添加一个根节点
            Element rootElement = document.addElement("formExport");
            rootElement.addAttribute("version", "2.0");
            Element valuesElement = rootElement.addElement("values");
            valuesElement.addElement("column").addAttribute("name", "合同编号").addElement("value").addText(contractNo != null ? contractNo : "");
            valuesElement.addElement("column").addAttribute("name", "付款金额").addElement("value").addText(contractMoney != null ? contractMoney : "");
            String  requestXML = document.asXML();
            String method = "updateMoney";
            HttpHelper.sendRPCClient(WebServiceUrl, method, requestXML);
        }
    }
}