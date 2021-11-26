package com.seeyon.apps.work.document.dao.impl;



import com.seeyon.apps.work.document.dao.QuartzDao;
import com.seeyon.ctp.common.log.CtpLogFactory;
import com.seeyon.ctp.util.JDBCAgent;
import org.apache.commons.logging.Log;

import java.util.List;

/**
 * 查询公文表，查出流程结束时间是否为3分钟前的数据
 */
public class QuartzDaoImpl implements QuartzDao {

    private static final Log log = CtpLogFactory.getLog(QuartzDaoImpl.class);

    @Override
    public List findOfficialDocument() {

        //查询公文表，查出流程结束时间是否为3分钟前的数据
        String sql = "select * from edoc_summary where complete_time >= now()- interval 3 minute";
        JDBCAgent jdbcAgent = null;
        List resultSetToList = null;
        try {
            jdbcAgent = new JDBCAgent(false, false);
            jdbcAgent.execute(sql);
            resultSetToList = jdbcAgent.resultSetToList();
        } catch (Exception e) {
            log.error("查询公文表出错", e);
        }finally {
            jdbcAgent.close();
        }

        return resultSetToList;
    }

}
