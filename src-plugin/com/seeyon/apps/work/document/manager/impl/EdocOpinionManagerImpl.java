package com.seeyon.apps.work.document.manager.impl;

import com.seeyon.apps.work.document.dao.EdocOpinionDao;
import com.seeyon.apps.work.document.manager.EdocOpinionManager;
import com.seeyon.ctp.util.FlipInfo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

/**
 * @author wangjiahao
 * @email  wangjiahao@microcental.net
 */
public class EdocOpinionManagerImpl implements EdocOpinionManager {
    @Autowired
    private EdocOpinionDao edocOpinionDao;

    //按条件查询公文意见
    public List<Map<String, Object>> findOpinionList(String sql, Map map, FlipInfo fi) {
        return edocOpinionDao.findOpinionListByUserId(sql, map, fi);
    }
}