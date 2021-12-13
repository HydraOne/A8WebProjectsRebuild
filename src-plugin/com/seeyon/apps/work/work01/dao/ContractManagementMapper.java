package com.seeyon.apps.work.work01.dao;

import java.util.List;
import java.util.Map;

/**
 * @author Ch1stuntQAQ
 * @data 2021/9/23 - 14:10
 * @Description TODO 通过表名和 id获取该条数据并以map 类型返回 （通用）
 */
public interface ContractManagementMapper {
    Map selectTableDetailsByTableNameAndFormRecordId(String tableName,Long formRecordId);
}
