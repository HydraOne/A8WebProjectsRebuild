package com.seeyon.apps.work.work04.manager;

import com.seeyon.apps.collaboration.po.ColSummary;
import com.seeyon.apps.work.work01.manager.ContractFormListener;
import com.seeyon.cap4.form.modules.event.FormDataBeforeSubmitEvent;
import com.seeyon.cap4.form.service.CAP4FormManager;


import com.seeyon.ctp.util.annotation.ListenEvent;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author Ch1stuntQAQ
 * @data 2021/9/28 - 14:49
 * @Description 监管合同档案修改
 */
public interface ContractSupervisionModification {
    public void monitorContractSupervisionModificationEvents(FormDataBeforeSubmitEvent event);
}
