package com.seeyon.apps.work.document.dao.impl;

import com.seeyon.apps.work.document.dao.OpinionListDao;
import com.seeyon.ctp.common.dao.BaseHibernateDao;
import com.seeyon.ctp.util.DBAgent;
import com.seeyon.ctp.util.FlipInfo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Test extends BaseHibernateDao implements OpinionListDao {
    @Override
    public List<Map<String, Object>> getPersonalOpinionsByCreateId(Long createId, FlipInfo fi, Map pas) {
        StringBuffer hql = new StringBuffer(
                "from CtpCommentAll b,EdocSummary c,OrgMember d " +
                        "where b.moduleId = c.id and b.createId = d.id and b.createId = d.id and b.moduleType = '4' and b.createId ="
                        + createId);
//        String hql = "from OrgLevel where deleted=0 and enable=1";
        List<Object> param = new ArrayList<Object>();
        return DBAgent.find(String.valueOf(hql), null);
    }
}