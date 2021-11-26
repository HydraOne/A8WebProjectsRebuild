package com.seeyon.apps.work.work01.dao.impl;

import com.seeyon.apps.work.work01.dao.ContractManagementMapper;
import com.seeyon.apps.work.work01.dao.impl.ContractManagementMapperImpl;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.common.lock.manager.ConcreteLockManager;
import com.seeyon.ctp.util.JDBCAgent;
import org.apache.log4j.Logger;

import java.sql.SQLException;
import java.util.Map;

/**
 * @author Ch1stuntQAQ
 * @data 2021/9/23 - 14:19
 * @Description TODO 通过表名和 id获取该条数据并以map 类型返回 （通用）
 */
public class ContractManagementMapperImpl implements ContractManagementMapper {

    //日志
    protected static Logger LOGGER = Logger.getLogger(ContractManagementMapperImpl.class);

    @Override
    public Map selectTableDetailsByTableNameAndFormRecordId(String tableName, Long formRecordId) {
        //sql拼接
        String sql = "select * from " + tableName + " where id = " + formRecordId;
        //JDBCAgent查询
        JDBCAgent jdbcAgent = new JDBCAgent(false, false);
        Map resultMap = null;
        try {
            jdbcAgent.execute(sql);
            resultMap = jdbcAgent.resultSetToMap();
        } catch (BusinessException | SQLException e) {
            LOGGER.error("查询表单数据异常",e);
        }finally {
            jdbcAgent.close();
        }
        return resultMap;
    }
}
