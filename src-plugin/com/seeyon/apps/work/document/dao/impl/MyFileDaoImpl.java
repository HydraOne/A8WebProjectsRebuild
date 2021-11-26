package com.seeyon.apps.work.document.dao.impl;

import com.seeyon.apps.work.document.dao.MyFileDao;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.common.filemanager.manager.FileManager;
import com.seeyon.ctp.common.log.CtpLogFactory;
import com.seeyon.ctp.util.JDBCAgent;
import org.apache.commons.logging.Log;

import java.io.File;
import java.util.Map;

/**
 * MyFile的实现类
 */
public class MyFileDaoImpl implements MyFileDao {

    private static final Log log = CtpLogFactory.getLog(MyFileDaoImpl.class);
    private final FileManager fileManager = (FileManager) AppContext.getBean("fileManager");
    @Override
    public File getFile(Long id) throws BusinessException {
        String sql = "select * from ctp_attachment where SUB_REFERENCE = " + id;
        Map select = select(sql);
        Object subReference = select.get("file_url");
        Long file1 = (Long) subReference;
        return fileManager.getFile(file1);
    }

    @Override
    public String getFileType(Long id) throws BusinessException {
        String sql = "select * from ctp_attachment where SUB_REFERENCE = " + id;
        Map select = select(sql);
        String s = (String)select.get("mime_type");
        String[] split = s.split("/");
        return split[1];
    }

    public Map select(String sql) {
        //JDBCAgent
        JDBCAgent agent = new JDBCAgent(false, false);
        Map resultSetToMap = null;
        try {
            agent.execute(sql);
            resultSetToMap = agent.resultSetToMap();
        } catch (Exception e) {
            log.error("sql错误"+e);
        } finally {
            agent.close();
        }

        return resultSetToMap;
    }

}
