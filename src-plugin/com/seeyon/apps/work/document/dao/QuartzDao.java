package com.seeyon.apps.work.document.dao;

import java.util.List;

/**
 * @author wangjiahao
 * @email  wangjiahao@microcental.net
 */
public interface QuartzDao {
    //查出流程结束时间是否为3分钟前的数
    List findOfficialDocument();
}
