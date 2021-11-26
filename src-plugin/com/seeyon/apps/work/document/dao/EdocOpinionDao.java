package com.seeyon.apps.work.document.dao;

import com.seeyon.ctp.util.FlipInfo;

import java.util.List;
import java.util.Map;

/**
 * 查询公文意见、可修改意见
 */
public interface EdocOpinionDao {

    //条件查询意见列表
    List<Map<String, Object>> findOpinionListByUserId(String sql, Map map, FlipInfo fi);

    //修改公文意见
    void update(Long opinionId, String opinionContent);
}
