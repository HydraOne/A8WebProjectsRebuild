package com.seeyon.apps.work.document.manager;

import com.seeyon.ctp.util.FlipInfo;

import java.util.Map;

/**
 * @version 1.0.0
 * @Description TODO 查询公文意见 也可修改意见
 */

public interface OpinionListManager {

	//查询意见
	public FlipInfo opinionList(FlipInfo fi,Map pas);

	//修改意见
	public void updateOpinionData(Long opinionId,String opinionContent);
}
