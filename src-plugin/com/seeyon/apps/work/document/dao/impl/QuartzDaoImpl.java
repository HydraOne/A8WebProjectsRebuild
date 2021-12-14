package com.seeyon.apps.work.document.dao.impl;



import com.seeyon.apps.work.document.dao.QuartzDao;
import com.seeyon.ctp.common.log.CtpLogFactory;
import com.seeyon.ctp.util.DBAgent;
import org.apache.commons.logging.Log;
import java.util.List;

/**
 * @author wangjiahao
 * @email  wangjiahao@microcental.net
 * 查询公文表，查出流程结束时间是否为3分钟前的数据
 */
public class QuartzDaoImpl implements QuartzDao {

    private static final Log log = CtpLogFactory.getLog(QuartzDaoImpl.class);

    @Override
    public List findOfficialDocument() {
    //查询公文表，查出流程结束时间是否为3分钟前的数据
        return DBAgent.find("from EdocSummary where (CURRENT_TIMESTAMP() - createTime)<3000");
    }
}