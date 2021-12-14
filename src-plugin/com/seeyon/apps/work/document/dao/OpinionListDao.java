package com.seeyon.apps.work.document.dao;

import com.seeyon.ctp.util.FlipInfo;

import java.util.List;
import java.util.Map;

/**
 * @author wangjiahao
 * @email  wangjiahao@microcental.net
 */
public interface OpinionListDao {
//    通过id得到自己的意见信息
    List<Map<String, Object>> getPersonalOpinionsByCreateId(Long createId, FlipInfo fi, Map pas);
}

