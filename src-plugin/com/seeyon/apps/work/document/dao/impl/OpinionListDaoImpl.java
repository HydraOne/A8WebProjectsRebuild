package com.seeyon.apps.work.document.dao.impl;

import com.seeyon.apps.work.document.dao.OpinionListDao;
import com.seeyon.apps.work.document.manager.EdocOpinionManager;
import com.seeyon.ctp.util.FlipInfo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author wangjiahao
 * @email wangjiahao@microcental.net
 * 主要获得个人的意见列表
 */
public class OpinionListDaoImpl implements OpinionListDao {

    @Autowired
    private EdocOpinionManager edocOpinionManagerImpl;

    public Map<String, Object> packageSql(Map<String, Object> map, Long userId) {
        StringBuffer sql = new StringBuffer();
        Map<String, Object> p = new HashMap();
        Map<String, Object> pa = new HashMap();
        List<Long> longList = new ArrayList();
        //p.put("userId", userId);
        if (map.get("attribute") != null && !"".equals(map.get("attribute"))) {
            Integer type = Integer.valueOf((String) map.get("attribute"));
            sql.append(" and c.subject like :subject");
            p.put("attribute", type);
        }
        if (map.get("subject") != null) {
            sql.append(" and c.subject like :subject");
            p.put("subject", "%" + map.get("subject") + "%");
        }
        if (map.get("datetime") != null) {
            List object = (List) map.get("datetime");
            sql.append(" and to_char( b.create_time, 'yyyy-mm-dd hh24:mi:ss' ) >= :crateaDate AND to_char( b.create_time, 'yyyy-mm-dd hh24:mi:ss' ) <= :endDate ");
            p.put("crateaDate", object.get(0));
            p.put("endDate", object.get(1));
        }
        if (map.get("createPerson") != null) {
            sql.append(" and d.name like :createPerson");
            p.put("createPerson", "%" + map.get("createPerson") + "%");
        }
        if (map.get("docMark") != null) {
            sql.append(" and c.doc_Mark like :docMark");
            p.put("docMark", "%" + map.get("docMark") + "%");
        }
        sql.insert(0, "from CtpCommentAll b,EdocSummary c,OrgMember d where b.moduleId = c.id and b.createId = d.id and b.createId = d.id and b.moduleType = '4' and b.createId =" +  userId);
//        sql.append(" and b.content is not null order by b.createDate desc");
        pa.put("p", p);
        pa.put("sql", sql);
        return pa;
    }

    @Override
    public List<Map<String, Object>> getPersonalOpinionsByCreateId(Long createId, FlipInfo fi, Map pas) {
        Map map = packageSql(pas,createId);
        StringBuffer hql = (StringBuffer) map.get("sql");
        Map conditions = (Map) map.get("p");
        return edocOpinionManagerImpl.findOpinionList(hql.toString(), conditions, fi);
    }
}