package com.seeyon.apps.work.document.dao;

import com.seeyon.ctp.common.exceptions.BusinessException;

import java.io.File;

public interface MyFileDao {
    File  getFile(Long id) throws BusinessException;
    String getFileType(Long id) throws  BusinessException;
}
