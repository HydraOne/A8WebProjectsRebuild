package com.seeyon.apps.work.work02.dao;

import com.seeyon.apps.timeview.po.TimeViewAuth;
import com.seeyon.apps.timeview.po.TimeViewInfo;

/**
 * @author Ch1stuntQAQ
 * @data 2021/9/26 - 16:33
 * mapper接口
 */
public interface FormTimeViewMapper {
    void addTimeViewInfo(TimeViewInfo timeViewInfo);

    void addTimeViewAuth(TimeViewAuth timeViewAuth);
}
