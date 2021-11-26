package com.seeyon.apps.work.document.manager;


import com.seeyon.apps.work.document.dao.impl.EdocOpinionDaoImpl;
import com.seeyon.ctp.util.FlipInfo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

/**
 * 查询公文意见、可修改意见
 */
public class EdocOpinionManager {
    @Autowired
    private EdocOpinionDaoImpl edocOpinionDao;

    //按条件查询公文意见
    public List<Map<String, Object>> findOpinionList(String sql, Map map, FlipInfo fi) {
        return edocOpinionDao.findOpinionListByUserId(sql, map, fi);
    }
}
