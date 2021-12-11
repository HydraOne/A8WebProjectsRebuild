package com.seeyon.apps.work.utils;

import com.seeyon.ctp.common.AppContext;

/**
 * @author wangjiahao
 * @email  wangjiahao@microcental.net
 * 增加一个获取配置文件的中间层，使得修改一些配置文件也可以进行热部署
 */
public class CtpCustomVariables {
    public final static String demandConfiguration_contractFileFlowChart = getCtpCustomVariableByKey("contractFileFlowChart");
    public final static String demandConfiguration_bottomSheetOfContractFile = getCtpCustomVariableByKey("bottomSheetOfContractFile");
    public final static String demandConfiguration_paymentFlowSheet = getCtpCustomVariableByKey("paymentFlowSheet");
    public final static String demandConfiguration_bottomSheetOfContractFile1 = getCtpCustomVariableByKey("bottomSheetOfContractFile1");
    public final static String demandConfiguration_restAccount = getCtpCustomVariableByKey("restAccount");
    public final static String demandConfiguration_restPassword = getCtpCustomVariableByKey("restPassword");
    public final static String demandConfiguration_getTokenUrl = getCtpCustomVariableByKey("getTokenUrl");
    public final static String demandConfiguration_signInUrl = getCtpCustomVariableByKey("signInUrl");
    public final static String demandConfiguration_nativePostRestUrl = getCtpCustomVariableByKey("nativePostRestUrl");
    public final static String demandConfiguration_nativePostRestUrlCtrls = getCtpCustomVariableByKey("nativePostRestUrlCtrls");
    public final static String demandConfiguration_deptManager = getCtpCustomVariableByKey("deptManager");
    public final static String demandConfiguration_webservice = getCtpCustomVariableByKey("webservice");
    public final static String demandConfiguration_downloadFile = getCtpCustomVariableByKey("downloadfile");
    public final static String demandConfiguration_ftpIP = getCtpCustomVariableByKey("ftpIP");
    public final static String demandConfiguration_ftpAccount = getCtpCustomVariableByKey("ftpAccount");
    public final static String demandConfiguration_ftpPassWord = getCtpCustomVariableByKey("ftpPassWrod");
    public final static String demandConfiguration_JDBCUrl = getCtpCustomVariableByKey("JDBCUrl");
    public final static String demandConfiguration_JDBCUser = getCtpCustomVariableByKey("JDBCUser");
    public final static String demandConfiguration_JDBCPassword = getCtpCustomVariableByKey("JDBCPassword");
    public final static String demandConfiguration_BaseAddress = getCtpCustomVariableByKey("baseAddress");

    private static String getCtpCustomVariableByKey(String keyName){
        String prefKey = "demandConfiguration.";
        return AppContext.getSystemProperty(prefKey + keyName);
    };
}