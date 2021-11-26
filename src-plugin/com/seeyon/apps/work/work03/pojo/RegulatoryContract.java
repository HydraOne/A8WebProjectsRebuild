package com.seeyon.apps.work.work03.pojo;

import java.util.Date;

/**
 * @author Ch1stuntQAQ
 * @data 2021/9/28 - 9:22
 * @Description 监管合同po
 */
public class RegulatoryContract {
    //经办人
    private String field0001;
    //经办部门
    private String field0002;
    //申请日期
    private Date field0003;
    //合同编号
    private String field0004;
    //合同名称
    private String field0005;
    //合同金额
    private String field0006;
    //累计已付金额
    private String field0033;
    //单点登录url
    private String field0036;


    public RegulatoryContract() {
    }

    public RegulatoryContract(String field0001, String field0002, Date field0003, String field0004, String field0005, String field0006, String field0033, String field0036) {
        this.field0001 = field0001;
        this.field0002 = field0002;
        this.field0003 = field0003;
        this.field0004 = field0004;
        this.field0005 = field0005;
        this.field0006 = field0006;
        this.field0033 = field0033;
        this.field0036 = field0036;
    }

    public String getField0001() {
        return field0001;
    }

    public void setField0001(String field0001) {
        this.field0001 = field0001;
    }

    public String getField0002() {
        return field0002;
    }

    public void setField0002(String field0002) {
        this.field0002 = field0002;
    }

    public Date getField0003() {
        return field0003;
    }

    public void setField0003(Date field0003) {
        this.field0003 = field0003;
    }

    public String getField0004() {
        return field0004;
    }

    public void setField0004(String field0004) {
        this.field0004 = field0004;
    }

    public String getField0005() {
        return field0005;
    }

    public void setField0005(String field0005) {
        this.field0005 = field0005;
    }

    public String getField0006() {
        return field0006;
    }

    public void setField0006(String field0006) {
        this.field0006 = field0006;
    }

    public String getField0033() {
        return field0033;
    }

    public void setField0033(String field0033) {
        this.field0033 = field0033;
    }

    public String getField0036() {
        return field0036;
    }

    public void setField0036(String field0036) {
        this.field0036 = field0036;
    }
}
