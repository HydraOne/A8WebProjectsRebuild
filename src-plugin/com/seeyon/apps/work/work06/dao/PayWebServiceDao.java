package com.seeyon.apps.work.work06.dao;

import com.seeyon.ctp.common.exceptions.BusinessException;

import java.util.Map;

/**
 * @author wangjiahao
 * @email  wangjiahao@microcental.net
 * 支付服务Service层
 */
public interface PayWebServiceDao {
    //查询付款信息
    Map findPay(String htNum) throws BusinessException;

    //更新付款金额
    void updatePay(String num, String htNum) throws BusinessException;

}
