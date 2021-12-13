package com.seeyon.apps.work.work04.dao.impl;

import com.seeyon.apps.work.utils.CtpCustomVariables;
import com.seeyon.apps.work.work04.dao.ContractInfoModifyDao;
import com.seeyon.cap4.form.api.FormApi4Cap4;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.common.log.CtpLogFactory;
import com.seeyon.ctp.util.JDBCAgent;
import org.apache.commons.logging.Log;

import java.sql.SQLException;
import java.util.Map;

public class ContractInfoModifyDaoImpl implements ContractInfoModifyDao {
    // 注入cap4
    private final FormApi4Cap4 formApi4Cap4 = (FormApi4Cap4) AppContext.getBean("formApi4Cap4");
    //日志
    private static final Log log = CtpLogFactory.getLog(ContractInfoModifyDaoImpl.class);

    @Override
    public boolean isContainData(String id) {
        Map resultMap = null;
        String targetTableName = null;
        try {
            targetTableName = formApi4Cap4.getFormByFormCode(CtpCustomVariables.demandConfiguration_bottomSheetOfContractFile).getMasterTableBean().getTableName();
        } catch (BusinessException e) {
            log.error("未能找到表信息", e);
        }
        try (JDBCAgent jdbcAgent = new JDBCAgent()) {
            StringBuilder sql = new StringBuilder("select * from ").append(targetTableName).append(" where id=").append(id);
            jdbcAgent.execute(sql.toString());
            resultMap = jdbcAgent.resultSetToMap();
        } catch (BusinessException | SQLException e) {
            log.error("SQL 执行异常",e);
        }
        return resultMap.size() != 0;
    }
}