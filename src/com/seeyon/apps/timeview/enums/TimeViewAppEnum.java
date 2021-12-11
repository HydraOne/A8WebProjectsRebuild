
package com.seeyon.apps.timeview.enums;

import com.google.common.collect.Lists;
import com.seeyon.ctp.common.code.EnumsCode;
import com.seeyon.ctp.common.constants.ApplicationCategoryEnum;
import com.seeyon.ctp.common.i18n.ResourceUtil;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;


/**
 * @author Ch1stuntQAQ
 * @data 2021/9/26 - 17:29
 * @Description TODO 时间安排类型枚举
 */
public enum TimeViewAppEnum implements EnumsCode {
    plan(1, ("common.plan.label")), task(2, ("common.taskmanage.label")), meeting(3, ("common.meeting.label")),
    calEvent(4, ("calendar.event.create.reply.event")),
    /** 公文协同，不再显示在时间线上 @date 2017-02-17 */
    collaboration(5, ("common.collaboration.label")), edoc(6, ("common.edoc.label")),
    leaderagenda(94, ("common.leaderagenda.title"));

    private int key;
    private String text;

    TimeViewAppEnum(int key, String text) {
        this.key = key;
        this.text = text;
    }

    @Override
    public String getValue() {
        return String.valueOf(key);
    }

    public int getKey() {
        return key;
    }

    @Override
    public String getText() {
        return ResourceUtil.getString(text);
    }

    public static ApplicationCategoryEnum findByKey(int key) {
        ApplicationCategoryEnum app = null;
        switch (key) {
            case 1:
                app = ApplicationCategoryEnum.plan;
                break;
            case 2:
                app = ApplicationCategoryEnum.taskManage;
                break;
            case 3:
                app = ApplicationCategoryEnum.meeting;
                break;
            case 4:
                app = ApplicationCategoryEnum.calendar;
                break;
            case 5:
                app = ApplicationCategoryEnum.collaboration;
                break;
            case 6:
                app = ApplicationCategoryEnum.edoc;
                break;
            case 94:
                app = ApplicationCategoryEnum.leaderagenda;
                break;

            /**
             * 新增枚举  register
             */
            case 107:
                app = ApplicationCategoryEnum.register;
                break;
            /**
             *  end
             */
            default:
                break;
        }
        return app;
    }

    public static List<ApplicationCategoryEnum> find(List<Integer> appssl) {
        List<ApplicationCategoryEnum> apps = new ArrayList<ApplicationCategoryEnum>();
        for (Integer integer : appssl) {
            // 公文协同，不再显示在时间线上 @date 2017-02-17 @author shuqi
            ApplicationCategoryEnum app = TimeViewAppEnum.findByKey(integer);
            if (app != null && !app.equals(ApplicationCategoryEnum.collaboration)
                    && !app.equals(ApplicationCategoryEnum.edoc)) {
                apps.add(TimeViewAppEnum.findByKey(integer));
            }
        }
        return apps;
    }

    public static Collection<? extends ApplicationCategoryEnum> findByName(String name) {
        List<ApplicationCategoryEnum> apps = Lists.newArrayList();
        for (ApplicationCategoryEnum category : ApplicationCategoryEnum.values()) {
            if (category.name().equals(name)) {
                apps.add(category);
            }
        }
        return apps;
    }

    /**
     * <p>
     * 机器任务需要全部模块的数据
     * </p>
     *
     * @param isRobot是否为语言机器人
     * @return
     * @date Feb 20, 2017
     * @author shuqi
     * @since v5 v6.1
     */
    public static List<ApplicationCategoryEnum> findAll(boolean isRobot) {
        if (isRobot) {
            return Arrays.asList(new ApplicationCategoryEnum[] { ApplicationCategoryEnum.plan,
                    ApplicationCategoryEnum.taskManage, ApplicationCategoryEnum.calendar, ApplicationCategoryEnum.edoc,
                    ApplicationCategoryEnum.collaboration, ApplicationCategoryEnum.meeting });
        } else {
            return Arrays.asList(new ApplicationCategoryEnum[] { ApplicationCategoryEnum.plan,
                    ApplicationCategoryEnum.taskManage, ApplicationCategoryEnum.calendar,
                    ApplicationCategoryEnum.meeting, ApplicationCategoryEnum.leaderagenda });
        }
    }

    /**
     * @param appCategory
     * @return
     * @date 2018年6月7日 下午5:15:46
     * @since V5 V7.0SP1
     * @author shuqi
     */
    public static String typeName(String appCategory) {
        ApplicationCategoryEnum type = ApplicationCategoryEnum.valueOf(appCategory);
        String typeName = "";
        switch (type) {
            case taskManage:
                typeName = task.getText();
                break;
            case meeting:
                typeName = meeting.getText();
                break;
            case plan:
                typeName = plan.getText();
                break;
            case calendar:
                typeName = calEvent.getText();
                break;
            case collaboration:
                typeName = collaboration.getText();
                break;
            case edoc:
                typeName = edoc.getText();
                break;
            case leaderagenda:
                typeName = leaderagenda.getText();
                break;
            //error
            case register:
                typeName = "付款";
                break;
            default:
                break;
        }
        return typeName;
    }

}
