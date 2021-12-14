package com.seeyon.apps.work.work03.manager;

import java.util.ArrayList;


import com.seeyon.apps.work.work03.pojo.RegulatoryContract;
import com.seeyon.ctp.common.exceptions.BusinessException;

/**
 * @author wangjiahao
 * @email wangjiahao@microcental.net
 * 将获取到的查询数据返回
 */
public interface RegulatoryContractManager {

	ArrayList<RegulatoryContract> getFormDate(String regulatoryContract);

}
