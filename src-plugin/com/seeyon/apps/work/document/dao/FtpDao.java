package com.seeyon.apps.work.document.dao;

import com.seeyon.ctp.common.po.content.CtpContentAll;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @author wangjiahao
 * @email  wangjiahao@microcental.net
 */
public interface FtpDao {
    //查找正文
    CtpContentAll findCtpContentAll(Long edocId);

    //查找附件
    List findCtpAttAll(String edocId);
    //插入数据到message表
    void insertMessage(Long uuid,String subject,String docMark,String docType);
    //插入数据到reference表
    void insertReference(Long uuid, String type,String content , Date zwdate);
}
