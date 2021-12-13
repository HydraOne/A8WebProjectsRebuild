package com.seeyon.apps.work.work04.manager.impl;

import com.seeyon.apps.work.utils.CtpCustomVariables;
import com.seeyon.apps.work.work04.dao.impl.ContractInfoModifyDaoImpl;
import com.seeyon.apps.work.work04.manager.ContractInfoModify;
import com.seeyon.apps.work.work04.dao.ContractInfoModifyDao;
import com.seeyon.cap4.form.bean.FormDataMasterBean;
import com.seeyon.cap4.form.modules.event.FormDataBeforeSubmitEvent;
import com.seeyon.cap4.form.service.CAP4FormManager;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.common.log.CtpLogFactory;
import com.seeyon.ctp.util.annotation.ListenEvent;
import org.apache.commons.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.Map;

/**
 * @data 2021/9/28 - 15:47
 * @Description 监管合同档案修改
 */
public class ContractInfoModifyImpl implements ContractInfoModify {
    //日志
    private static final Log log = CtpLogFactory.getLog(ContractInfoModifyDaoImpl.class);

    @Autowired
    ContractInfoModifyDao contractInfoModifyDaoImpl;

    //通过表单提交事件监听，用携带的表名数据区分监听，如果是修改操作，那么原表里面就是存在数据的
    @Override
    @ListenEvent(event = FormDataBeforeSubmitEvent.class ,async = true)
    public void monitorContractInfoModifyEvents(FormDataBeforeSubmitEvent event) {
        final CAP4FormManager cap4FormManager = (CAP4FormManager) AppContext.getBean("cap4FormManager");
        FormDataMasterBean formDataMasterBean = (FormDataMasterBean) event.getSource();
        String currentTableName = formDataMasterBean.getFormTable().getTableName();
        String targetTableName = null;
        try {
            targetTableName = cap4FormManager.getFormByFormCode(CtpCustomVariables.demandConfiguration_bottomSheetOfContractFile).getMasterTableBean().getTableName();
        } catch (BusinessException e) {
            log.error("未能找到表信息",e);
        }
        if (!currentTableName.equals(targetTableName)){
            return;
        }
        Map<String, Object> allDataMap = formDataMasterBean.getAllDataMap();
        if(!contractInfoModifyDaoImpl.isContainData(allDataMap.get("id").toString())){
            log.info("此提交表单非修改监管操作");
            return;
        }
        String contractNo = String.valueOf(allDataMap.get(formDataMasterBean.formTable.getFieldBeanByDisplay("合同编号").getName()));
        String contractTitle = String.valueOf(allDataMap.get(formDataMasterBean.formTable.getFieldBeanByDisplay("合同名称").getName()));
        log.info("合同监管修改事件：时间："+new Date()+"合同编号："+contractNo+" 合同名称："+contractTitle);
    }
}