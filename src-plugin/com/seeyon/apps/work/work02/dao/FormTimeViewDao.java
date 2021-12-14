package com.seeyon.apps.work.work02.dao;

import com.seeyon.apps.timeview.po.TimeViewAuth;
import com.seeyon.apps.timeview.po.TimeViewInfo;

/**
 * @author wangjiahao
 * @email wangjiahao@microcental.net
 * 时间视图存储层接口
 */
public interface FormTimeViewDao {
    void addTimeViewInfo(TimeViewInfo timeViewInfo);

    void addTimeViewAuth(TimeViewAuth timeViewAuth);
}
