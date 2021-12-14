package com.seeyon.apps.work.document.manager;

import com.seeyon.ctp.util.FlipInfo;

import java.util.Map;

/**
 * @author wangjiahao
 * @email  wangjiahao@microcental.net
 * 查询公文意见 也可修改意见
 */

public interface OpinionListManager {

	//查询意见
	FlipInfo opinionList(FlipInfo fi,Map pas);

	//修改意见
	void updateOpinionData(Long opinionId,String opinionContent);
}
