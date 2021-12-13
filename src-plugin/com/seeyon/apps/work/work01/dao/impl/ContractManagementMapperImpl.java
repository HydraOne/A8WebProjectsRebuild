package com.seeyon.apps.work.work01.dao.impl;

import com.seeyon.apps.work.utils.CtpCustomVariables;
import com.seeyon.apps.work.work01.dao.ContractManagementMapper;
import com.seeyon.apps.work.work01.dao.impl.ContractManagementMapperImpl;
import com.seeyon.cap4.form.api.FormApi4Cap4;
import com.seeyon.cap4.form.bean.FormTableBean;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.common.lock.manager.ConcreteLockManager;
import com.seeyon.ctp.util.JDBCAgent;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * @data 2021/9/23 - 14:19
 * @Description TODO 通过表名和 id获取该条数据并以map 类型返回 （通用）
 */
public class ContractManagementMapperImpl implements ContractManagementMapper {

    //日志
    protected static Logger LOGGER = Logger.getLogger(ContractManagementMapperImpl.class);

    //注入表单管理对象
    @Autowired
    private FormApi4Cap4 cap4FormManager = (FormApi4Cap4) AppContext.getBean("formApi4Cap4");

    @Override
    public Map selectTableDetailsByTableNameAndFormRecordId(String tableName, Long formRecordId) {
        //sql拼接
        StringBuffer sqlBuffer = new StringBuffer();
        sqlBuffer.append("select * from ").append(tableName).append(" where id = ").append(formRecordId);
        //JDBCAgent查询
        JDBCAgent jdbcAgent = new JDBCAgent(false, false);
        Map resultMap = null;
        try {
            jdbcAgent.execute(sqlBuffer.toString());
            resultMap = jdbcAgent.resultSetToMap();
        } catch (BusinessException | SQLException e) {
            LOGGER.error("查询表单数据异常", e);
        } finally {
            jdbcAgent.close();
        }
        return resultMap;
    }
}