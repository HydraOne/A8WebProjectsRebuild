
package com.seeyon.apps.timeview.utils;

import com.seeyon.apps.calendar.enums.StatesEnum;
import com.seeyon.apps.calendar.enums.TemplateEventEnum;
import com.seeyon.apps.calendar.po.TimeCalEvent;
import com.seeyon.apps.taskmanage.enums.TaskStatus;
import com.seeyon.apps.timeview.enums.TimeViewAppEnum;
import com.seeyon.apps.timeview.enums.TimeViewStatus;
import com.seeyon.apps.timeview.po.TimeViewInfo;
import com.seeyon.apps.timeview.vo.TimeViewInfoVO;
import com.seeyon.ctp.common.constants.ApplicationCategoryEnum;
import com.seeyon.ctp.common.taglibs.functions.Functions;
import com.seeyon.ctp.organization.dao.OrgHelper;
import com.seeyon.ctp.util.DateUtil;
import com.seeyon.ctp.util.Datetimes;
import com.seeyon.ctp.util.ParamUtil;
import com.seeyon.ctp.util.Strings;
import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.text.ParseException;
import java.util.*;
/**
 * 时间视图工具类
 * @author Ch1stuntQAQ
 * @data 2021/9/26 - 17:32
 */
public class TimeViewUtil {
    private static final Log logger = LogFactory.getLog(TimeViewUtil.class);

    /**
     * @Title:
     * @Description: 将多个逗号分隔的字符串合并成一个字符串
     * @param args
     * @return 设定文件
     * @return String 返回类型
     * @throws
     */
    public static String contact(String... args) {
        StringBuilder sb = new StringBuilder();
        if (ArrayUtils.isNotEmpty(args)) {
            for (String arg : args) {
                if (StringUtils.isNotBlank(arg)) {
                    String array[] = arg.split(",");
                    for (String s : array) {
                        if (StringUtils.isNotBlank(s)) {
                            sb.append(s).append(",");
                        }
                    }
                }
            }
        }
        if (sb.toString().endsWith(",")) {
            return sb.toString().substring(0, sb.toString().length() - 1);
        } else {
            return sb.toString();
        }
    }

    /**
     * <p>
     * 根据前端设置不同获取各个模块不同的数据
     * </p>
     *
     * @param app
     * @param status
     * @return
     * @since V5 V7.0SP1
     * @author shuqi
     */
    public static List<Integer> getCategroryStatus(ApplicationCategoryEnum app, List<TimeViewStatus> status) {
        List<Integer> cstatus = new ArrayList<Integer>();
        switch (app) {
            case taskManage:
                for (TimeViewStatus st : status) {
                    for (TaskStatus s : st.getTaskStatus()) {
                        cstatus.add(s.getKey());
                    }
                }
                break;
            case plan:
                for (TimeViewStatus st : status) {
                    for (String s : st.getPlanStatus()) {
                        cstatus.add(Integer.parseInt(s));
                    }
                }
                break;
            case calendar:
                for (TimeViewStatus st : status) {
                    cstatus.addAll(st.getCalEventStatus());
                }
                break;
            case meeting:
                for (TimeViewStatus st : status) {
                    cstatus.addAll(st.getMeetingStatus());
                }
                break;
            case leaderagenda:
                for (TimeViewStatus st : status) {
                    cstatus.addAll(st.getLeaderAgendaStatus());
                }
                break;
            default:
                break;
        }
        return cstatus;
    }

    public static TimeCalEvent covert2TimeCalEvent(TimeViewInfo timeViewInfo) {
        TimeCalEvent timeCalEvent = new TimeCalEvent();
        timeCalEvent.setBeginDate(timeViewInfo.getStartTime());
        if (ApplicationCategoryEnum.plan.name().equals(timeViewInfo.getAppCategory())) {
            if (("23:59").equals(Datetimes.format(timeViewInfo.getEndTime(), "HH:mm"))) { // 5.0的环境
                timeCalEvent.setEndDate(timeViewInfo.getEndTime());
            } else { // 升级数据环境
                try {
                    timeCalEvent.setEndDate(Datetimes.addDate(DateUtil
                            .parse(Datetimes.format(timeViewInfo.getEndTime(), DateUtil.YEAR_MONTH_DAY_PATTERN)), 1));
                } catch (ParseException e) {
                    logger.error("", e);
                }
            }
            timeCalEvent.setType(TemplateEventEnum.PLAN);
            timeCalEvent.setTitle(TimeViewAppEnum.plan.getText());
        } else if (ApplicationCategoryEnum.taskManage.name().equals(timeViewInfo.getAppCategory())) {
            timeCalEvent.setEndDate(timeViewInfo.getEndTime());
            timeCalEvent.setType(TemplateEventEnum.TASK);
            timeCalEvent.setTitle(TimeViewAppEnum.task.getText());
            // ?不支持
            // timeCalEvent.setMilestone(timeViewInfo.isMilestone() ? 1 : 0) ;
        } else if (ApplicationCategoryEnum.meeting.name().equals(timeViewInfo.getAppCategory())) {
            timeCalEvent.setEndDate(timeViewInfo.getEndTime());
            timeCalEvent.setType(TemplateEventEnum.MEETING);
            timeCalEvent.setTitle(TimeViewAppEnum.meeting.getText());
            timeCalEvent.setCanView(Boolean.TRUE);
            // ?不支持
            // timeCalEvent.setAccount(Functions.showMemberName(meeting.getCreateUser()));
        } else if (ApplicationCategoryEnum.calendar.name().equals(timeViewInfo.getAppCategory())) {
            timeCalEvent.setEndDate(timeViewInfo.getEndTime());
            timeCalEvent.setType(TemplateEventEnum.CALEVENT);
            timeCalEvent.setTitle(TimeViewAppEnum.calEvent.getText());
        }
        timeCalEvent.setId(timeViewInfo.getAppId());
        timeCalEvent.setStates(String.valueOf(timeViewInfo.getAppStatus()));
        timeCalEvent.setSubject(timeViewInfo.getAppTitle());
        timeCalEvent.setContent(Functions.toHTML(timeViewInfo.getAppTitle()));
        timeCalEvent.setCreateUserId(timeViewInfo.getCreateMember());
        return timeCalEvent;
    }

    /**
     * @Title: getTimeViewStatus
     * @Description: 将事件状态转换成时间视图对应的状态
     * @param taskmanage
     * @param status
     * @return 设定文件
     * @return Integer 返回类型
     * @throws
     */
    public static Integer getTimeViewStatus(ApplicationCategoryEnum app, Integer status) {
        Integer viewStatus = null;
        switch (app) {
            case taskManage:
                if (status == TaskStatus.notstarted.getKey() || status == TaskStatus.marching.getKey()) {
                    viewStatus = TimeViewStatus.unfinshed.ordinal();
                } else if (status == TaskStatus.finished.getKey()) {
                    viewStatus = TimeViewStatus.finshed.ordinal();
                } else {
                    viewStatus = status;
                }
                break;
            case plan:
                if (status == 1 || status == 2 || status == 5) { // 计划状态:1.未开始 2.进行中 5.已推迟
                    viewStatus = TimeViewStatus.unfinshed.ordinal();
                } else if (status == 3) { // 计划状态:3.已完成
                    viewStatus = TimeViewStatus.finshed.ordinal();
                } else {
                    viewStatus = status;
                }
                break;
            case calendar:
                if (status == StatesEnum.toBeArranged.getKey() || status == StatesEnum.hasBeenArranged.getKey()
                        || status == StatesEnum.inHand.getKey()) {
                    viewStatus = TimeViewStatus.unfinshed.ordinal();
                } else if (status == StatesEnum.completed.getKey()) {
                    viewStatus = TimeViewStatus.finshed.ordinal();
                } else {
                    viewStatus = status;
                }
                break;
            case meeting:
                if (status == 10 || status == 20) { // 10:已发送;20:已开始
                    viewStatus = TimeViewStatus.unfinshed.ordinal();
                } else if (status == 30 || status == 31) { // 30:已结束;31:提前结束
                    viewStatus = TimeViewStatus.finshed.ordinal();
                } else {
                    viewStatus = status;
                }
                break;
            default:
                break;
        }
        return viewStatus;
    }

    /**
     * 列表时间格式 1.时间视图数据时间格式： 当天开始当天结束事件不考虑是否今天，显示HH:MM——HH:MM, 跨天不跨年事件不考虑是否本月显示MM-DD
     * —— MM-DD， 跨年事件不考虑是否本年显示YYYY-MM-DD —— YYYY-MM-DD 2.tips时间格式
     * 当天开始当天结束事件不考虑是否今天，显示MM-DD HH:MM ——HH:MM, 跨天不跨年事件不考虑是否本月显示MM-DD HH:MM —— MM-DD
     * HH:MM， 跨年事件不考虑是否本年显示YYYY-MM-DD HH:MM —— YYYY-MM-DD HH:MM
     */
    public static String getListDisplayDate(Date startDate, Date endDate, boolean tipsFormat) {

        int syear = DateUtil.getYear(startDate);// 开始年
        int smonth = DateUtil.getMonth(startDate);// 开始月
        int sday = DateUtil.getDay(startDate);// 开始日

        int eyear = DateUtil.getYear(endDate);// 结束年
        int emonth = DateUtil.getMonth(endDate);// 结束月
        int eday = DateUtil.getDay(endDate);// 结束日

        if (syear == eyear && smonth == emonth && sday == eday) {// 开始时间和结束时间在同一天
            if (tipsFormat) {
                if (syear != eyear) {
                    return formatDateStyle(Datetimes.formatNoTimeZone(startDate, Datetimes.dateStyle), startDate, null,
                            endDate);
                }
                if (smonth != emonth || sday != eday) {
                    return formatDateStyle(Datetimes.formatNoTimeZone(startDate, Datetimes.dateStyleWithoutYear),
                            startDate, null, endDate);
                }
                return formatDateStyle(Datetimes.formatNoTimeZone(startDate, Datetimes.dateStyleWithoutYear), startDate,
                        null, endDate);
            } else {
                return formatDateStyle(null, startDate, null, endDate);
            }
        } else {
            // 开始时间和结束时间不在同一天
            return getDifferentDisplayDate(startDate, endDate, tipsFormat);
        }
    }

    /**
     * 跨天时间格式
     */
    private static String getDifferentDisplayDate(Date startDate, Date endDate, boolean tipsFormat) {
        int syear = DateUtil.getYear(startDate);// 年
        int smonth = DateUtil.getMonth(startDate);// 月
        int sday = DateUtil.getDay(startDate);// 日
        int eyear = DateUtil.getYear(endDate);// 结束年
        int emonth = DateUtil.getMonth(endDate);// 结束月
        int eday = DateUtil.getDay(endDate);// 结束日

        if (tipsFormat) {
            if (syear != eyear) {
                return formatDateStyle(Datetimes.formatNoTimeZone(startDate, Datetimes.dateStyle), startDate,
                        Datetimes.formatNoTimeZone(endDate, Datetimes.dateStyle), endDate);
            } else if (smonth != emonth || sday != eday) {
                return formatDateStyle(Datetimes.formatNoTimeZone(startDate, Datetimes.dateStyleWithoutYear), startDate,
                        Datetimes.formatNoTimeZone(endDate, Datetimes.dateStyleWithoutYear), endDate);
            } else {
                return formatDateStyle(Datetimes.formatNoTimeZone(startDate, Datetimes.dateStyleWithoutYear), startDate,
                        Datetimes.formatNoTimeZone(endDate, Datetimes.dateStyleWithoutYear), endDate);
            }
        } else {
            if (syear != eyear) {
                return formatDateStyle(Datetimes.formatNoTimeZone(startDate, Datetimes.dateStyle), null,
                        Datetimes.formatNoTimeZone(endDate, Datetimes.dateStyle), null);
            } else if (smonth != emonth || sday != eday) {
                return formatDateStyle(Datetimes.formatNoTimeZone(startDate, Datetimes.dateStyleWithoutYear), null,
                        Datetimes.formatNoTimeZone(endDate, Datetimes.dateStyleWithoutYear), null);
            } else {
                return formatDateStyle(Datetimes.formatNoTimeZone(startDate, Datetimes.dateStyleWithoutYear), startDate,
                        Datetimes.formatNoTimeZone(endDate, Datetimes.dateStyleWithoutYear), endDate);
            }
        }
    }

    /**
     * 时间格式化
     *
     * @return
     */
    private static String formatDateStyle(String prex1, Date startDate, String prex2, Date endDate) {
        StringBuilder build = new StringBuilder(20);
        if (Strings.isNotBlank(prex1)) {
            build.append(prex1).append(" ");
        }
        if (startDate != null) {
            build.append(Datetimes.formatNoTimeZone(startDate, "HH:mm"));
        }
        build.append(" - ");
        if (Strings.isNotBlank(prex2)) {
            build.append(prex2).append(" ");
        }
        if (endDate != null) {
            build.append(Datetimes.formatNoTimeZone(endDate, "HH:mm"));
        }
        return build.toString();
    }

    /**
     * 致信卡片显示时间
     */
    public static String getZxShowTime(Date start, Date end) {
        String beginDatetime = Datetimes.format(start, "yyyy-MM-dd HH:mm");
        String endDatetime = Datetimes.format(end, "yyyy-MM-dd HH:mm");
        String startDateYearMD = beginDatetime.substring(0, 10);
        String endDateYearMD = endDatetime.substring(0, 10);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        String year = String.valueOf(calendar.get(Calendar.YEAR));
        String beginDate = beginDatetime.substring(5, 10), endDate = endDatetime.substring(5, 10);
        String beginYear = beginDatetime.substring(0, 4), endYear = endDatetime.substring(0, 4);

        if (!beginYear.equals(year) || !beginYear.equals(endYear)) {
            beginDate = beginDatetime.substring(0, 10);
        }

        if (!endYear.equals(year) || !endYear.equals(beginYear)) {
            endDate = endDatetime.substring(0, 10);
        }

        String showTime = "";
        if (startDateYearMD.equals(endDateYearMD)) {
            showTime = beginDate + " " + beginDatetime.substring(11, 16) + " - " + endDatetime.substring(11, 16);
        } else {
            showTime = beginDate + " " + beginDatetime.substring(11, 16) + " - " + endDate + " "
                    + endDatetime.substring(11, 16);
        }
        return showTime;
    }

    public enum ViewAppEnum {
        leaderagenda, plan, taskManage, meeting, calendar;

        public static ViewAppEnum getAppByName(String name) {
            ViewAppEnum _enum = null;
            for (ViewAppEnum app : ViewAppEnum.values()) {
                if (app.name().equals(name)) {
                    _enum = app;
                    break;
                }
            }
            return _enum;
        }
    }

    /**
     * 将Map对象转换成时间视图VO
     */
    public static TimeViewInfoVO toTimewViewVo(Map<String, Object> m, Boolean isMyTimeView) {
        TimeViewInfoVO vo = new TimeViewInfoVO();
        String appCategory = ParamUtil.getString(m, "appCategory");
        Long appId = ParamUtil.getLong(m, "appId");
        vo.setType(appCategory);
        vo.setTypeName(TimeViewAppEnum.typeName(appCategory));
        vo.setAppId(appId);
        Date date1 = Datetimes.parseNoTimeZone(
                Datetimes.format((Date) m.get("startTime"), Datetimes.datetimeWithoutSecondStyle),
                Datetimes.datetimeWithoutSecondStyle);
        Date date2 = Datetimes.parseNoTimeZone(
                Datetimes.format((Date) m.get("endTime"), Datetimes.datetimeWithoutSecondStyle),
                Datetimes.datetimeWithoutSecondStyle);
        vo.setDbStartDate(Datetimes.formatNoTimeZone(date1, Datetimes.datetimeWithoutSecondStyle));
        vo.setDbEndDate(Datetimes.formatNoTimeZone(date2, Datetimes.datetimeWithoutSecondStyle));
        if (isMyTimeView) {
            vo.setStartDate(Datetimes.formatNoTimeZone(date1, Datetimes.datetimeWithoutSecondStyle));
            vo.setEndDate(Datetimes.formatNoTimeZone(date2, Datetimes.datetimeWithoutSecondStyle));
        } else {
            vo.setStartDate(Datetimes.formatNoTimeZone(Datetimes.getTodayFirstTime(date1),
                    Datetimes.datetimeWithoutSecondStyle));
            vo.setEndDate(Datetimes.formatNoTimeZone(Datetimes.getTodayLastTime(date2),
                    Datetimes.datetimeWithoutSecondStyle));
        }
        vo.setDisplayDate(TimeViewUtil.getListDisplayDate(date1, date2, false));
        vo.setTipsDate(TimeViewUtil.getListDisplayDate(date1, date2, true));
        vo.setTitle(ParamUtil.getString(m, "appTitle"));
        vo.setCreateMember(ParamUtil.getLong(m, "createMember"));
        vo.setOrgentId(ParamUtil.getLong(m, "orgentId"));
        vo.setMemberId(ParamUtil.getLong(m, "orgentId"));
        vo.setMemberName(OrgHelper.showMemberName(ParamUtil.getLong(m, "orgentId")));
        return vo;
    }
}
