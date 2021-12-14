package com.seeyon.apps.work.document.dao.impl;

import com.seeyon.apps.work.document.dao.FtpDao;
import com.seeyon.apps.work.document.po.Message;
import com.seeyon.apps.work.document.po.Reference;
import com.seeyon.ctp.common.po.content.CtpContentAll;
import com.seeyon.ctp.util.DBAgent;
import com.seeyon.ctp.util.JDBCAgent;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.sql.SQLException;
import java.util.*;

/**
 * @author wangjiahao
 * @email  wangjiahao@microcental.net
 * 查询公文意见 也可修改意见
 */
public class FtpDaoImpl implements FtpDao {
    private static final Log LOGGER = LogFactory.getLog(FtpDaoImpl.class);
    //查找正文
    @Override
    public CtpContentAll findCtpContentAll(Long edocId) {
        HashMap<Object, Object> hashMap = new HashMap<>();
        hashMap.put("mId",edocId);
        List result = DBAgent.find("from CtpContentAll where moduleId = :mId and content_type = 41",hashMap);
        if (result.size()==0){
            return null;
        }
        return (CtpContentAll) result.get(0);
    }

    //查找附件
    @Override
    public List findCtpAttAll(String edocId) {
        //ctp_attachment 不存在实体类
        String sql = "select * from ctp_attachment where att_reference = '" + edocId + "'";
        List resultSetToList = new ArrayList();
        JDBCAgent jdbcAgent = null;
        try {
            jdbcAgent = new JDBCAgent(false, false);
            jdbcAgent.execute(sql);
            resultSetToList = jdbcAgent.resultSetToList();
        } catch (Exception e) {
            LOGGER.error("执行sql异常",e);//error
        } finally {
            jdbcAgent.close();
        }
        return resultSetToList;
    }

    //存储消息
    @Override
    public void insertMessage(Long uuid, String subject, String docMark, String docType) {
        Message message = new Message(uuid,subject,docMark,docType);
        DBAgent.save(message);
    }

    //存储参考信息
    @Override
    public void insertReference(Long uuid, String type,String content , Date zwdate) {
        Reference reference = new Reference(uuid, type, content, zwdate);
        DBAgent.save(reference);
    }
}