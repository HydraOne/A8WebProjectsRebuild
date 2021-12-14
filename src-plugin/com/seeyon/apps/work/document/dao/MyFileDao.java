package com.seeyon.apps.work.document.dao;

import com.seeyon.ctp.common.exceptions.BusinessException;

import java.io.File;

/**
 * @author wangjiahao
 * @email  wangjiahao@microcental.net
 */
public interface MyFileDao {
//    通过id编号获取文件
    File  getFile(Long id) throws BusinessException;
//    获得文件类型
    String getFileType(Long id) throws  BusinessException;
}
