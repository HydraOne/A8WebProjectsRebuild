package com.seeyon.apps.work.work04.manager.impl;

import com.seeyon.apps.work.work04.manager.ContractSupervisionModification;
import com.seeyon.cap4.form.bean.FormDataMasterBean;
import com.seeyon.cap4.form.modules.event.FormDataBeforeSubmitEvent;
import com.seeyon.ctp.common.log.CtpLogFactory;
import com.seeyon.ctp.util.annotation.ListenEvent;
import org.apache.commons.logging.Log;

import java.util.Date;
import java.util.Map;

/**
 * @author Ch1stuntQAQ
 * @data 2021/9/28 - 15:47
 * @Description 监管合同档案修改
 */
public class ContractSupervisionModificationImpl implements ContractSupervisionModification {
    //日志
    private static final Log log = CtpLogFactory.getLog(ContractSupervisionModificationImpl.class);

    @Override
    @ListenEvent(event = FormDataBeforeSubmitEvent.class ,async = true)
    public void monitorContractSupervisionModificationEvents(FormDataBeforeSubmitEvent event) {
        FormDataMasterBean formDataMasterBean = (FormDataMasterBean) event.getSource();
        Map<String, Object> allDataMap = formDataMasterBean.getAllDataMap();
        String contractNo = String.valueOf(allDataMap.get(formDataMasterBean.formTable.getFieldBeanByDisplay("合同编号").getName()));
        String contractTitle = String.valueOf(allDataMap.get(formDataMasterBean.formTable.getFieldBeanByDisplay("合同名称").getName()));
        log.info("合同监管修改事件：时间："+new Date()+"合同编号："+contractNo+" 合同名称："+contractTitle);
    }
}
