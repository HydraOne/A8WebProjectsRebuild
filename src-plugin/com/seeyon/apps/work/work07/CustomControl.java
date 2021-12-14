package com.seeyon.apps.work.work07;

import com.seeyon.cap4.form.bean.fieldCtrl.FormFieldCustomCtrl;

/**
 * @author wangjiahao
 * @email  wangjiahao@microcental.net
 * @data 2021/10/7 - 14:18
 */
public class CustomControl extends FormFieldCustomCtrl {
    //别动key，谁动谁后悔
    @Override
    public String getKey() {
        return "4793689415239855350";
    }

    //字段长度
    public String getFieldLength() {
        return "255";
    }

    @Override
    public void init() {
        // TODO Auto-generated method stub

    }
    //动态自动加载控件js资源
    @Override
    public String getPCInjectionInfo() {
        return "{path:'apps_res/cap/customCtrlResources/mapResources/',jsUri:'js/location.js',initMethod:'test',nameSpace:'field_" + getKey() + "'}";
    }

    @Override
    public String getMBInjectionInfo() {
        return "{path:'http://mapResource.v5.cmp/v1.0.0/',weixinpath:'invoice',jsUri:'js/location.js',initMethod:'init',nameSpace:'feild_" + this.getKey() + "'}";
    }

    @Override
    public String[] getDefaultVal(String arg0) {
        return null;
    }

    //自定义控件名字
    @Override
    public String getText() {
        return "付款简要说明";
    }

}