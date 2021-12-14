package com.seeyon.apps.work.work02.dao.impl;

import com.seeyon.apps.timeview.po.TimeViewAuth;
import com.seeyon.apps.timeview.po.TimeViewInfo;
import com.seeyon.apps.work.work02.dao.FormTimeViewDao;
import com.seeyon.ctp.util.DBAgent;

/**
 * @author wangjiahao
 * @email wangjiahao@microcental.net
 * 时间视图存储类
 */
public class FormTimeViewDaoImpl implements FormTimeViewDao {
    @Override
    public void addTimeViewInfo(TimeViewInfo timeViewInfo) {
        DBAgent.save(timeViewInfo);
    }

    @Override
    public void addTimeViewAuth(TimeViewAuth timeViewAuth) {
        DBAgent.save(timeViewAuth);
    }
}