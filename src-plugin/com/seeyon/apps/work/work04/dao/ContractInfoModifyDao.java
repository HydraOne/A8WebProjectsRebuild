package com.seeyon.apps.work.work04.dao;

/**
 * @author wangjiahao
 * @email wangjiahao@microcental.net
 * 判断是否为已写入底表数据
 */
public interface ContractInfoModifyDao {
    boolean isContainData(String id);
}
