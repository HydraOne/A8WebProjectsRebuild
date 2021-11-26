package com.seeyon.apps.work.work06.dao;

import com.seeyon.ctp.common.exceptions.BusinessException;

import java.util.Map;

public interface PayWebServiceDao {
    //查询付款信息
    public Map findPay(String htNum) throws BusinessException;

    //更新付款金额
    public void updatePay(String num, String htNum) throws BusinessException;

}
