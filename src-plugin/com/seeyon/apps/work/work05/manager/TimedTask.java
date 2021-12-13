package com.seeyon.apps.work.work05.manager;

/**
 * @author wangjiahao
 * @email  wangjiahao@microcental.net
 */
    public interface TimedTask {
    //调用rest接口发起付款流程
    void initiateThePaymentProcess() throws Exception;
    //定时任务
    void init();
}
