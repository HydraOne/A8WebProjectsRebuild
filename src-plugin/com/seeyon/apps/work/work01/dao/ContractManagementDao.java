package com.seeyon.apps.work.work01.dao;

import java.util.Map;

/**
 * @author wangjiahao
 * @email wangjiahao@microcental.net
 * 通过表明流程表获取数据
 */
public interface ContractManagementDao {
    Map selectTableDetailsByTableNameAndFormRecordId(String tableName,Long formRecordId);
}
