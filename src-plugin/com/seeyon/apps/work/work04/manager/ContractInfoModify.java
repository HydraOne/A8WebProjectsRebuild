package com.seeyon.apps.work.work04.manager;


import com.seeyon.cap4.form.modules.event.FormDataBeforeSubmitEvent;


/**
 * @data 2021/12/02 - 14:49
 * @Description 监管合同档案修改
 */

public interface ContractInfoModify {
    void monitorContractInfoModifyEvents(FormDataBeforeSubmitEvent event);
}
