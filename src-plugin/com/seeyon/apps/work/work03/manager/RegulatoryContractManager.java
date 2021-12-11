package com.seeyon.apps.work.work03.manager;

import java.util.ArrayList;


import com.seeyon.apps.work.work03.pojo.RegulatoryContract;
import com.seeyon.ctp.common.exceptions.BusinessException;

/**
 * @description: 查询到的数据接口
 * @author: yanglinchuan
 * @date: 2021年11月26日
 */
public interface RegulatoryContractManager {

	ArrayList<RegulatoryContract> getFormDate(String regulatoryContract);

}
