package com.seeyon.apps.work.work05.manager;

/**
 * @author Ch1stuntQAQ
 * @data 2021/9/29 - 9:22
 * @Description 定时任务接口
 *
 */
    public interface TimedTask {
    //调用rest接口发起付款流程
    void initiateThePaymentProcess();
    //定时任务
    void init();
}
