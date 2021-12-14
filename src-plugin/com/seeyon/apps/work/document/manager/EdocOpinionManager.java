package com.seeyon.apps.work.document.manager;


import com.seeyon.ctp.util.FlipInfo;

import java.util.List;
import java.util.Map;

/**
 * @author wangjiahao
 * @email  wangjiahao@microcental.net
 * 查询公文意见、可修改意见
 */
public interface EdocOpinionManager {
    //按条件查询公文意见
    List<Map<String, Object>> findOpinionList(String sql, Map map, FlipInfo fi);
}
