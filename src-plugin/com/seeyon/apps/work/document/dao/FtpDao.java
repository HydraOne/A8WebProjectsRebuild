package com.seeyon.apps.work.document.dao;

import java.util.List;
import java.util.Map;

public interface FtpDao {
    //查找正文
    public Map findCtpContentAll(String edocId);

    //查找附件
    public List findCtpAttAll(String edocId);

}
