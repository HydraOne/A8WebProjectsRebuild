package com.seeyon.apps.work.document.dao.impl;

import com.seeyon.apps.work.document.dao.FtpDao;
import com.seeyon.ctp.util.JDBCAgent;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FtpDaoImpl implements FtpDao {
    private static final Log LOGGER = LogFactory.getLog(FtpDaoImpl.class);
    //查找正文
    @Override
    public Map findCtpContentAll(String edocId) {
        String sql = "select * from ctp_content_all where module_id = '" + edocId + "' and content_type = 41";
        Map resultSetToMap = new HashMap();
        JDBCAgent jdbcAgent = null;
        try {
            jdbcAgent = new JDBCAgent();
            jdbcAgent.execute(sql);
            resultSetToMap = jdbcAgent.resultSetToMap();
        } catch (Exception e) {
            LOGGER.error(e);//error
        } finally {
            jdbcAgent.close();
        }
        return resultSetToMap;
    }

    //查找附件
    @Override
    public List findCtpAttAll(String edocId) {
        String sql = "select * from ctp_attachment where att_reference = '" + edocId + "'";
        List resultSetToList = new ArrayList();
        JDBCAgent jdbcAgent = null;
        try {
            jdbcAgent = new JDBCAgent(false, false);
            jdbcAgent.execute(sql);
            resultSetToList = jdbcAgent.resultSetToList();
        } catch (Exception e) {
            LOGGER.error(e);//error
        } finally {
            jdbcAgent.close();
        }
        return resultSetToList;
    }
}
