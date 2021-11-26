package com.seeyon.apps.work.work02.dao.impl;

import com.seeyon.apps.timeview.po.TimeViewAuth;
import com.seeyon.apps.timeview.po.TimeViewInfo;
import com.seeyon.apps.work.work02.dao.FormTimeViewMapper;
import com.seeyon.ctp.util.DBAgent;

/**
 * @author Ch1stuntQAQ
 * @data 2021/9/26 - 16:48
 */
public class FormTimeViewMapperImpl implements FormTimeViewMapper {
    @Override
    public void addTimeViewInfo(TimeViewInfo timeViewInfo) {
        DBAgent.save(timeViewInfo);
    }

    @Override
    public void addTimeViewAuth(TimeViewAuth timeViewAuth) {
        DBAgent.save(timeViewAuth);
    }
}
