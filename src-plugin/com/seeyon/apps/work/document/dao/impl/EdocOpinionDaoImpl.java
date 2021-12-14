package com.seeyon.apps.work.document.dao.impl;

import com.seeyon.apps.work.document.dao.EdocOpinionDao;
import com.seeyon.ctp.common.po.comment.CtpCommentAll;
import com.seeyon.ctp.organization.po.OrgMember;
import com.seeyon.ctp.util.DBAgent;
import com.seeyon.ctp.util.FlipInfo;
import com.seeyon.ctp.util.JDBCAgent;
import com.seeyon.v3x.edoc.domain.EdocSummary;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.*;

/**
 * @author wangjiahao
 * @email wangjiahao@microcental.net
 * 查询公文意见 也可修改意见
 */
public class EdocOpinionDaoImpl implements EdocOpinionDao {

    private static final Log log = LogFactory.getLog(EdocOpinionDaoImpl.class);

    //条件查询意见列表
    public List<Map<String, Object>> findOpinionListByUserId(String hql, Map map, FlipInfo fi) {
        List dbResult = DBAgent.find(hql,map,fi);
        List<Map<String,Object>> results = new LinkedList<>();
        for (Object item:dbResult) {
            List list = Arrays.asList((Object[]) item);
            Map<String,Object> rowMap = new HashMap<>();
            for (Object rowResult:list){
                Map<String, Object> data = new HashMap<>();
                if (rowResult instanceof CtpCommentAll){
                    CtpCommentAll rowContent = (CtpCommentAll) rowResult;
                    rowMap.put("content",rowContent.getContent());
                    rowMap.put("id",rowContent.getId());
                    rowMap.put("create_date",rowContent.getCreateDate());
                }else {
                    if (rowResult instanceof EdocSummary){
                        EdocSummary summary = (EdocSummary) rowResult;
                        rowMap.put("doc_mark",summary.getDocMark());
                        rowMap.put("subject",summary.getSubject());
                        rowMap.put("create_person",summary.getCreatePerson());
                    }else {
                        OrgMember member = (OrgMember) rowResult;
                        rowMap.put("name",member.getName());
                    }
                }
            }
            results.add(rowMap);
        }

//        JDBCAgent jdbc = new JDBCAgent();
//        try {
//            fi = jdbc.findNameByPaging(sql, map, fi);
//        } catch (Exception e) {
//            log.info("查询意见列表出现异常-", e);
//        } finally {
//            jdbc.close();//error
//        }
        log.info("打印出的sql------" + hql);
        return results;
    }

    //修改意见
    public void update(Long opinionId, String opinionContent) {
        DBAgent.bulkUpdate("update from CtpCommentAll set content = ? where id =?", opinionContent,opinionId);
    }
}