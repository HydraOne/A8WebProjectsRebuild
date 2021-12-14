package com.seeyon.apps.work.work06.dao.impl;


import com.seeyon.apps.work.utils.CtpCustomVariables;
import com.seeyon.apps.work.work06.dao.PayWebServiceDao;
import com.seeyon.cap4.form.bean.FormTableBean;
import com.seeyon.cap4.form.service.CAP4FormManager;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.common.log.CtpLogFactory;
import com.seeyon.ctp.util.JDBCAgent;
import org.apache.commons.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import sun.management.resources.agent;

import java.util.HashMap;
import java.util.Map;

/**
 * @author wangjiahao
 * @email  wangjiahao@microcental.net
 * 支付服务Service层实现类
 */
public class PayWebServiceDaoImpl implements PayWebServiceDao {

    private static final Log log = CtpLogFactory.getLog(PayWebServiceDaoImpl.class);

    @Autowired
    private CAP4FormManager cap4FormManager;
    //合同流程表
    @Override
    public Map findPay(String htNum) throws BusinessException {
    	FormTableBean table = cap4FormManager.getFormByFormCode(CtpCustomVariables.demandConfiguration_bottomSheetOfContractFile).getMasterTableBean();
        String htbh = table.getFieldBeanByDisplay("合同编号").getName();
        String sql = "select * from " + table.getTableName() + " where "+htbh+" = '" + htNum +"'";
        JDBCAgent agent = new JDBCAgent(false, false);
        Map map2 = new HashMap();
        try {
            agent.execute(sql);
            map2 = agent.resultSetToMap();
        } catch (Exception e) {
            log.error("查询付款信息错误", e);
        } finally {
            agent.close();  
        }
        return map2;
    }

    @Override
    public void updatePay(String num, String htNum) throws BusinessException {
        FormTableBean table = cap4FormManager.getFormByFormCode(CtpCustomVariables.demandConfiguration_bottomSheetOfContractFile).getMasterTableBean();
        String htbh = table.getFieldBeanByDisplay("合同编号").getName();
        String ljyf = table.getFieldBeanByDisplay("累计已付金额").getName();
        String sql = "update " + table.getTableName() + " set "+ljyf+ " = " + num + " where "+htbh+" = '" + htNum + "'";
        try(JDBCAgent jdbcAgent=new JDBCAgent(false, false)){
            jdbcAgent.execute(sql);
        } catch (Exception e) {
            log.error("添加累计金额错误", e);
        }
    }
}