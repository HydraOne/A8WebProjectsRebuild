package com.seeyon.apps.work.document.controller;

import com.seeyon.apps.work.document.dao.MyFileDao;
import com.seeyon.apps.work.work01.dao.ContractManagementMapper;
import com.seeyon.ctp.common.controller.BaseController;
import com.seeyon.cap4.form.bean.FormBean;
import com.seeyon.cap4.form.bean.FormFieldBean;
import com.seeyon.cap4.form.bean.FormTableBean;
import com.seeyon.cap4.form.service.CAP4FormManager;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.affair.manager.AffairManager;
import com.seeyon.ctp.common.controller.BaseController;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.common.filemanager.manager.FileManager;
import com.seeyon.ctp.common.po.affair.CtpAffair;
import com.seeyon.ctp.util.annotation.AjaxAccess;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

/**
 * @author Ch1stuntQAQ
 * @data 2021/10/8 - 13:45
 * 附件下载的controller
 */
public class DownloadAttachment extends BaseController {
    //文件管理对象
    private final FileManager fileManager = (FileManager) AppContext.getBean("fileManager");
    //表单管理对象
    @Autowired
    private CAP4FormManager cap4FormManager;
    //食物管理对象
    @Autowired
    private AffairManager affairManager;
    //需求6-1dao
    @Autowired
    private ContractManagementMapper contractManagementMapper;
    @Autowired
    private MyFileDao myFileDao;

    @AjaxAccess
    public void getTheDownloadFile(HttpServletRequest request, HttpServletResponse response){
        //获取事务id
        String affairId = request.getParameter("affairId");
        //获取ctp事务对象
        CtpAffair ctpAffair = null;
        try {
            ctpAffair = affairManager.get(Long.valueOf(affairId));
        } catch (BusinessException e) {
            logger.error("根据id获取affair出现异常---",e);
        }

        Long appId = ctpAffair.getFormAppId();
        Long formRecordid = ctpAffair.getFormRecordid();
        FormBean form = cap4FormManager.getForm(appId);
        FormTableBean tableBean = form.getMasterTableBean();
        //获取表单
        String fields = "";
        for (FormFieldBean field : tableBean.getFields()) {
            String inputType = field.getInputType();
            if (inputType.equals("attachment")) {
                if (!"".equals(fields)) {
                    fields = fields + "," + field.getName();
                } else {
                    fields = fields + field.getName();
                }
            }
        }
        //在数据库中查询到该条数据所有信息
        Map resultMap = contractManagementMapper.selectTableDetailsByTableNameAndFormRecordId(tableBean.getTableName(), formRecordid);

        String[] split = fields.split(",");
        ArrayList<Object> list = new ArrayList<>();
        for (String s : split) {
            Object o = resultMap.get(s);
            if (o==null) continue;
            list.add(resultMap.get(s));
        }
        //获取到file类 调用getFile 进行下载
        for (Object o : list) {
            if (o!=null){
                Long aLong = Long.valueOf((String) o);
                File file = null;
                String fileType = null;
                try {
                    file = myFileDao.getFile(aLong);
                    fileType = myFileDao.getFileType(aLong);
                } catch (BusinessException e) {
                    logger.error(e);
                }
                getFile(file,fileType);
            }
        }
    }
    //下载文件
    private void getFile(File srcFile,String type) {
        String desFile = AppContext.getSystemProperty("demandConfiguration.downloadfile");
        String name = srcFile.getName() + "." + type;
        try {
            FileUtils.copyFile(srcFile, new File(desFile, name));
        } catch (IOException e) {
            logger.error(e);
        }
    }
}
