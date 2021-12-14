package com.seeyon.apps.work.document.manager.impl;

import com.seeyon.apps.work.document.bo.OpinionBO;
import com.seeyon.apps.work.document.dao.OpinionListDao;
import com.seeyon.apps.work.document.dao.impl.EdocOpinionDaoImpl;
import com.seeyon.apps.work.document.dao.impl.Test;
import com.seeyon.apps.work.document.manager.OpinionListManager;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.util.FlipInfo;
import com.seeyon.ctp.util.annotation.AjaxAccess;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

/**
 * @author wangjiahao
 * @email  wangjiahao@microcental.net
 * 查询公文意见 也可修改意见
 */
public class OpinionListManagerImpl implements OpinionListManager {

    private static final Log LOGGER = LogFactory.getLog(OpinionListManagerImpl.class);

    @Autowired
    private EdocOpinionDaoImpl edocOpinionDao;

    @Autowired
    private OpinionListDao opinionListDaoImpl;

    @Override
    @AjaxAccess
    public FlipInfo opinionList(FlipInfo fi, Map pas) {
        long currentTimeMillisTwo2 = System.currentTimeMillis();
        LOGGER.info("00--开始查询意见---" + new Date().getTime());
        List<OpinionBO> queryList = new LinkedList<>();
        Long userId = AppContext.currentUserId();
//        new Test().getPersonalOpinionsByCreateId(userId,fi,pas);
        pas.put("userId", userId);
        try {
            //获得默认密级
            //查询自己处理过的意见
            long time = System.currentTimeMillis();
            //根据userId 查询edocOpinionList
            long currentTimeMillis = System.currentTimeMillis();
            LOGGER.info("0001--开始使用公文id查询意见---" + currentTimeMillis);
            long currentUserId = AppContext.currentUserId();
            List<Map<String, Object>> opinions = opinionListDaoImpl.getPersonalOpinionsByCreateId(currentUserId,fi,pas);
            Long ss = System.currentTimeMillis() - currentTimeMillis;
            LOGGER.info("0002--开始使用公文id查询意见--所用耗时---" + ss);
            for (Map<String, Object> map : opinions) {
                OpinionBO opinionBO = new OpinionBO();
                //文号
                if (map.get("doc_mark")==null){
                    opinionBO.setDocMark("");
                }else {
                    opinionBO.setDocMark(String.valueOf(map.get("doc_mark")));
                }
                //文档名
                if (map.get("subject")==null){
                    opinionBO.setSubject("");
                }else {
                    opinionBO.setSubject(String.valueOf(map.get("subject")));
                }
                //创建人
                if (map.get("create_person")==null){
                    opinionBO.setCreatePerson("");
                }else {
                    opinionBO.setCreatePerson(String.valueOf(map.get("create_person")));
                }
                //意见审批人
                if (map.get("name")==null){
                    opinionBO.setCheck("");
                }else {
                    opinionBO.setCheck(String.valueOf(map.get("name")));
                }
                //意见
                if (map.get("content")==null){
                    opinionBO.setOpinion("");
                }else {
                    opinionBO.setOpinion(String.valueOf(map.get("content")));
                }

                //当前登录人id
                opinionBO.setId(Long.valueOf(String.valueOf(map.get("id"))));
                //意见类型
                //opinionBO.setOpinionType(Integer.valueOf(String.valueOf(map.get("attribute"))));
                if (map.get("create_date") == null){
                    opinionBO.setCreateTime(new Date());
                }else {
                    opinionBO.setCreateTime((Date) (map.get("create_date")));
                }
                queryList.add(opinionBO);
            }
            long xx = System.currentTimeMillis() - currentTimeMillisTwo2;
            LOGGER.info("00--结束查询意见---" + xx);
            if (queryList.size()!=0) {
                fi.setData(queryList);
            }
            //封装数据，向前台传值
        } catch (Exception e) {
            LOGGER.error("意见列表出现异常", e);
        }
        return fi;
    }

    @Override
    @AjaxAccess
    public void updateOpinionData(Long opinionId, String opinionContent) {
        edocOpinionDao.update(opinionId, opinionContent);
    }
}