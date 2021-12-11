
package com.seeyon.apps.timeview.manager;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.seeyon.apps.agent.bo.MemberAgentBean;
import com.seeyon.apps.calendar.manager.CalEventManager;
import com.seeyon.apps.calendar.po.CalEvent;
import com.seeyon.apps.calendar.util.CalendarNotifier;
import com.seeyon.apps.collaboration.event.CollaborationStartEvent;
import com.seeyon.apps.leaderagenda.LeaderAgendaApi;
import com.seeyon.apps.meeting.api.MeetingApi;
import com.seeyon.apps.meeting.bo.MeetingBO;
import com.seeyon.apps.plan.api.PlanApi;
import com.seeyon.apps.plan.bo.PlanBO;
import com.seeyon.apps.plan.enums.PlanTypeEnum;
import com.seeyon.apps.taskmanage.api.TaskmanageApi;
import com.seeyon.apps.taskmanage.bo.TaskInfoBO;
import com.seeyon.apps.timeview.Constants;
import com.seeyon.apps.timeview.dao.TimeViewDao;
import com.seeyon.apps.timeview.enums.TimeViewAppEnum;
import com.seeyon.apps.timeview.enums.TimeViewStatus;
import com.seeyon.apps.timeview.util.TimeViewUtil;
import com.seeyon.apps.timeview.vo.TimeViewInfoVO;
import com.seeyon.apps.timeview.vo.TimeViewMemberVO;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.bo.Result;
import com.seeyon.ctp.common.constants.ApplicationCategoryEnum;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.common.i18n.ResourceUtil;
import com.seeyon.ctp.organization.bo.V3xOrgMember;
import com.seeyon.ctp.organization.dao.OrgHelper;
import com.seeyon.ctp.util.*;
import com.seeyon.ctp.util.annotation.ListenEvent;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.collections.Transformer;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.text.ParseException;
import java.util.*;
/**
 * @author Ch1stuntQAQ
 * @data 2021/9/26 - 17:31
 */

public class TimeViewAjaxManagerImpl implements TimeViewAjaxManager {

    private static final Log logger = LogFactory.getLog(TimeViewAjaxManagerImpl.class);

    private TimeViewDao timeViewDao;
    private PlanApi planApi;
    private TaskmanageApi taskmanageApi;
    private CalEventManager calEventManager;
    private CalendarNotifier calendarNotifier;
    private LeaderAgendaApi leaderAgendaApi;
    private MeetingApi meetingApi;

    public TimeViewDao getTimeViewDao() {
        return timeViewDao;
    }

    public void setTimeViewDao(TimeViewDao timeViewDao) {
        this.timeViewDao = timeViewDao;
    }

    public PlanApi getPlanApi() {
        return planApi;
    }

    public void setPlanApi(PlanApi planApi) {
        this.planApi = planApi;
    }

    public TaskmanageApi getTaskmanageApi() {
        return taskmanageApi;
    }

    public void setTaskmanageApi(TaskmanageApi taskmanageApi) {
        this.taskmanageApi = taskmanageApi;
    }

    public CalEventManager getCalEventManager() {
        return calEventManager;
    }

    public void setCalEventManager(CalEventManager calEventManager) {
        this.calEventManager = calEventManager;
    }

    public CalendarNotifier getCalendarNotifier() {
        return calendarNotifier;
    }

    public void setCalendarNotifier(CalendarNotifier calendarNotifier) {
        this.calendarNotifier = calendarNotifier;
    }

    public LeaderAgendaApi getLeaderAgendaApi() {
        return leaderAgendaApi;
    }

    public void setLeaderAgendaApi(LeaderAgendaApi leaderAgendaApi) {
        this.leaderAgendaApi = leaderAgendaApi;
    }

    public MeetingApi getMeetingApi() {
        return meetingApi;
    }

    public void setMeetingApi(MeetingApi meetingApi) {
        this.meetingApi = meetingApi;
    }

    @SuppressWarnings("unchecked")
    @Override
    public Map<String, Object> findMyViewData(Map<String, Object> params) throws BusinessException {
        Map<String, Object> retMap = new HashMap<String, Object>(16);

        // 事件信息
        List<TimeViewInfoVO> eventInfo = new ArrayList<TimeViewInfoVO>();
        // 状态
        List<TimeViewStatus> status = Lists.newArrayList(TimeViewStatus.findAll());
        // APP
        List<ApplicationCategoryEnum> apps = new ArrayList<ApplicationCategoryEnum>();
        if (params.containsKey("apps")) {
            List<Integer> appssl = (List<Integer>) params.get("apps");
            if (CollectionUtils.isNotEmpty(appssl)) {
                apps.addAll(TimeViewAppEnum.find(appssl));
            }
        } else {
            apps.addAll(TimeViewAppEnum.findAll(false));
        }
        // 视图类型
        int schedulerType = MapUtils.getIntValue(params, "schedulerType", 1);
        // 时间段
        Date beginDate = MapUtils.getLong(params, "startDate") == null ? null
                : new Date(MapUtils.getLong(params, "startDate"));
        Date endDate = MapUtils.getLong(params, "endDate") == null ? null
                : new Date(MapUtils.getLong(params, "endDate"));
        if (beginDate == null || endDate == null) {
            beginDate = DateUtil.addDay(Datetimes.getTodayFirstTime(Datetimes.getFirstDayInWeek0(new Date())), 1);
            endDate = DateUtil.addDay(Datetimes.getTodayLastTime(Datetimes.getLastDayInWeek0(new Date())), 1);
        }

        // 我的视图数据
        List<Long> myDataList = Lists.newArrayList();
        // 被查人人员ID(不传时为查当前登陆人员)
        Long memberId = MapUtils.getLong(params, "memberId", AppContext.currentUserId());

        // 我的视图数据
        List<Map<String, Object>> myData = timeViewDao.findMembersTimeViewInfo(
                Lists.newArrayList(AppContext.currentUserId()), beginDate, endDate, apps, status, true);
        if (CollectionUtils.isNotEmpty(myData)) {
            for (Map<String, Object> m : myData) {
                myDataList.add(ParamUtil.getLong(m, "appId"));
            }
        }
        // 我可见的领导行程数据
        List<Long> myCanViewData = Lists.newArrayList();
        if (AppContext.hasPlugin("leaderagenda")) {
            myCanViewData.addAll(leaderAgendaApi.getMemberAuthAgendaIds(AppContext.currentUserId()));
        }

        // 查询出当前登录人员作为告知人参与的会议
        List<Long> imparts = Lists.newArrayList();
        if (apps.contains(ApplicationCategoryEnum.meeting)) {
            List<Map<String, Object>> impartData = timeViewDao
                    .findImpartMeeting(Lists.newArrayList(AppContext.currentUserId()), beginDate, endDate, status);
            if (CollectionUtils.isNotEmpty(impartData)) {
                for (Map<String, Object> m : impartData) {
                    imparts.add(ParamUtil.getLong(m, "appId"));
                }
            }
        }

        List<Pair<Long, Long>> uniqueList = new UniqueList<Pair<Long, Long>>();
        List<Map<String, Object>> viewInfos = timeViewDao.findMembersTimeViewInfo(Lists.newArrayList(memberId),
                beginDate, endDate, apps, status, true);
        if (CollectionUtils.isNotEmpty(viewInfos)) {
            List<Long> leaders = new ArrayList<Long>();
            for (Map<String, Object> m : viewInfos) {
                Long orgentId = ParamUtil.getLong(m, "orgentId");
                if (TimeViewAppEnum.leaderagenda.name().equals(ParamUtil.getString(m, "appCategory"))) {
                    if (!leaders.contains(orgentId)) {
                        leaders.add(orgentId);
                    }
                }
            }
            List<Long> realLeaders = Lists.newArrayList();
            if (AppContext.hasPlugin("leaderagenda")) {
                realLeaders.addAll(leaderAgendaApi.isLeaders(leaders));
            }

            for (Map<String, Object> m : viewInfos) {
                // 过滤掉已非领导人员的行程事件并去重
                if (uniqueList.contains(Pair.of(ParamUtil.getLong(m, "orgentId"), ParamUtil.getLong(m, "appId")))) {
                    continue;
                } else {
                    uniqueList.add(Pair.of(ParamUtil.getLong(m, "orgentId"), ParamUtil.getLong(m, "appId")));
                }
                if (TimeViewAppEnum.leaderagenda.name().equals(ParamUtil.getString(m, "appCategory"))) {
                    boolean isLeader = realLeaders.contains(ParamUtil.getLong(m, "orgentId", -1L));
                    if (!isLeader) {
                        continue;
                    }
                }
                // 生成VO
                TimeViewInfoVO vo = TimeViewUtil.toTimewViewVo(m, true);
                vo.setTitle(this.getViewTitleByAuth(m, myDataList, imparts, myCanViewData));
                fmtShowTime(m, vo, true);
                eventInfo.add(vo);
            }
        }
        Collections.sort(eventInfo);
        retMap.put("eventInfo", eventInfo);
        retMap.put("schedulerType", schedulerType);
        retMap.put("dateStamp", Datetimes.formatDatetime(new Date()));
        return retMap;
    }

    @SuppressWarnings("unchecked")
    @Override
    public Map<String, Object> findOtherViewData(Map<String, Object> params) throws BusinessException {

        Map<String, Object> retMap = new HashMap<String, Object>(16);

        List<TimeViewMemberVO> memberInfo = new ArrayList<TimeViewMemberVO>(); // 人员信息
        List<TimeViewInfoVO> eventInfo = new ArrayList<TimeViewInfoVO>(); // 事件信息
        List<Long> paramIds = CommonTools.parseStr2Ids(ParamUtil.getString(params, "memberIds", "")); // 人员ID集合

        List<Long> memberIds = Lists.newArrayList();

        if (CollectionUtils.isNotEmpty(paramIds)) {
            List<String> typeAndIds = Lists.newArrayList();
            CollectionUtils.collect(paramIds, new Transformer() {
                @Override
                public Object transform(Object input) {
                    return "Member|" + input;
                }
            }, typeAndIds);

            List<V3xOrgMember> allMembers = OrgHelper.getMembersByElements(String.join(",", typeAndIds));
            if (CollectionUtils.isNotEmpty(allMembers)) {
                for (int i = 0; i < allMembers.size(); i++) {
                    V3xOrgMember member = allMembers.get(i);
                    if (!memberIds.contains(member.getId()) && member.getIsValid()) {
                        TimeViewMemberVO leader = new TimeViewMemberVO();
                        leader.setMemberId(member.getId());
                        leader.setMemberName(OrgHelper.showMemberName(member.getId()));
                        leader.setLeaderHeadUrl(OrgHelper.getAvatarImageUrl(member.getId()));
                        leader.setRole(OrgHelper.showOrgPostName(member.getOrgPostId()));
                        leader.setSortId(member.getSortId());
                        int colorIndex = i % Constants.ColorArray.size();
                        leader.setTxtColor("#113991");
                        leader.setLineColor(Constants.ColorArray.get(colorIndex).getLeft());
                        leader.setBgColor(Constants.ColorArray.get(colorIndex).getRight());
                        memberInfo.add(leader);
                        memberIds.add(member.getId());
                    }
                }
            }
        }

        // 如果未找到对应人员信息直接返回
        if (CollectionUtils.isEmpty(memberIds)) {
            retMap.put("memberInfo", memberInfo);
            retMap.put("eventInfo", eventInfo);
            retMap.put("dateStamp", Datetimes.formatDatetime(new Date()));
            return retMap;
        }

        // 状态
        List<TimeViewStatus> status = Lists.newArrayList(TimeViewStatus.findAll());

        // APP
        List<ApplicationCategoryEnum> apps = new ArrayList<ApplicationCategoryEnum>();
        if (params.containsKey("apps")) {
            List<Integer> appssl = (List<Integer>) params.get("apps");
            if (CollectionUtils.isNotEmpty(appssl)) {
                apps.addAll(TimeViewAppEnum.find(appssl));
            }
        } else {
            apps.addAll(TimeViewAppEnum.findAll(false));
        }
        // 时间段
        Date beginDate = MapUtils.getLong(params, "startDate") == null ? null
                : new Date(MapUtils.getLong(params, "startDate"));
        Date endDate = MapUtils.getLong(params, "endDate") == null ? null
                : new Date(MapUtils.getLong(params, "endDate"));
        if (beginDate == null || endDate == null) {
            beginDate = DateUtil.addDay(Datetimes.getTodayFirstTime(Datetimes.getFirstDayInWeek0(new Date())), 1);
            endDate = DateUtil.addDay(Datetimes.getTodayLastTime(Datetimes.getLastDayInWeek0(new Date())), 1);
        }

        // 我的视图数据
        List<Long> myDataList = Lists.newArrayList();
        List<Map<String, Object>> myData = timeViewDao.findMembersTimeViewInfo(
                Lists.newArrayList(AppContext.currentUserId()), beginDate, endDate, apps, status, true);
        if (CollectionUtils.isNotEmpty(myData)) {
            for (Map<String, Object> m : myData) {
                myDataList.add(ParamUtil.getLong(m, "appId"));
            }
        }
        // 我可见的领导行程数据
        List<Long> myCanViewData = Lists.newArrayList();
        if (AppContext.hasPlugin("leaderagenda")) {
            myCanViewData.addAll(leaderAgendaApi.getMemberAuthAgendaIds(AppContext.currentUserId()));
        }
        // 查询出当前登录人员作为告知人参与的会议
        List<Long> imparts = Lists.newArrayList();
        if (apps.contains(ApplicationCategoryEnum.meeting)) {
            List<Map<String, Object>> impartData = timeViewDao
                    .findImpartMeeting(Lists.newArrayList(AppContext.currentUserId()), beginDate, endDate, status);
            if (CollectionUtils.isNotEmpty(impartData)) {
                for (Map<String, Object> m : impartData) {
                    imparts.add(ParamUtil.getLong(m, "appId"));
                }
            }
        }
        // 所有视图数据
        List<Map<String, Object>> viewInfos = timeViewDao.findMembersTimeViewInfo(memberIds, beginDate, endDate, apps,
                status, true);
        List<Pair<Long, Long>> uniqueList = new UniqueList<Pair<Long, Long>>();
        if (CollectionUtils.isNotEmpty(viewInfos)) {
            List<Long> leaderIds = new ArrayList<Long>();
            for (Map<String, Object> m : viewInfos) {
                if (TimeViewAppEnum.leaderagenda.name().equals(ParamUtil.getString(m, "appCategory"))) {
                    leaderIds.add(ParamUtil.getLong(m, "orgentId", -1L));
                }
            }
            List<Long> realLeaders = Lists.newArrayList();
            if (AppContext.hasPlugin("leaderagenda")) {
                realLeaders.addAll(leaderAgendaApi.isLeaders(leaderIds));
            }
            for (Map<String, Object> m : viewInfos) {
                // 过滤掉已非领导人员的行程事件并去重
                if (uniqueList.contains(Pair.of(ParamUtil.getLong(m, "orgentId"), ParamUtil.getLong(m, "appId")))) {
                    continue;
                } else {
                    uniqueList.add(Pair.of(ParamUtil.getLong(m, "orgentId"), ParamUtil.getLong(m, "appId")));
                }
                if (TimeViewAppEnum.leaderagenda.name().equals(ParamUtil.getString(m, "appCategory"))) {
                    Long leader = ParamUtil.getLong(m, "orgentId", -1L);
                    if (!realLeaders.contains(leader)) {
                        continue;
                    }
                }
                // 生成VO
                TimeViewInfoVO vo = TimeViewUtil.toTimewViewVo(m, false);
                vo.setTitle(this.getViewTitleByAuth(m, myDataList, imparts, myCanViewData));
                if (ApplicationCategoryEnum.plan.name().equals(ParamUtil.getString(m, "appCategory"))) {
                    fmtShowTime(m, vo, false);
                }
                eventInfo.add(vo);
            }
        }
        // 排序
//        Collections.sort(eventInfo);

        retMap.put("memberInfo", memberInfo);
        retMap.put("eventInfo", eventInfo);
        retMap.put("dateStamp", Datetimes.formatDatetime(new Date()));
        return retMap;
    }

    /**
     * 任意期计划和全天任务显示时间格式化,解决起止时间为同一天时时间视图组件显示时间错误（00:00-00:00 会显示成00:05）
     */
    private void fmtShowTime(Map<String, Object> m, TimeViewInfoVO vo, Boolean isMyTimeView) throws BusinessException {
        boolean isSameDay = false;
        try {
            isSameDay = DateUtils.isSameDay(DateUtil.parse(vo.getDbStartDate()), DateUtil.parse(vo.getDbEndDate()));
        } catch (ParseException e) {
            isSameDay = false;
        }
        String appCategory = ParamUtil.getString(m, "appCategory");
        Date date1 = Datetimes.parseNoTimeZone(Datetimes.format((Date) m.get("startTime"), Datetimes.datetimeStyle),
                Datetimes.datetimeStyle);
        Date date2 = Datetimes.parseNoTimeZone(Datetimes.format((Date) m.get("endTime"), Datetimes.datetimeStyle),
                Datetimes.datetimeStyle);
        if (isSameDay) {
            if (ApplicationCategoryEnum.plan.name().equals(appCategory)) {
                PlanBO plan = planApi.getPlan(vo.getAppId());
                if (plan != null) {
                    vo.setStartDate(Datetimes.formatNoTimeZone(Datetimes.getTodayFirstTime(date1),
                            Datetimes.datetimeWithoutSecondStyle));
                    vo.setDbStartDate(Datetimes.formatNoTimeZone(Datetimes.getTodayFirstTime(date1),
                            Datetimes.datetimeWithoutSecondStyle));
                    if (PlanTypeEnum.anyscope_plan.getValue().equals(plan.getType())) {
                        vo.setEndDate(Datetimes.formatNoTimeZone(Datetimes.addDate(date2, 1),
                                Datetimes.datetimeWithoutSecondStyle));
                        vo.setDbEndDate(Datetimes.formatNoTimeZone(Datetimes.addDate(date2, 1),
                                Datetimes.datetimeWithoutSecondStyle));
                        vo.setDisplayDate(TimeViewUtil.getListDisplayDate(date1, Datetimes.addDate(date2, 1), false));
                        vo.setTipsDate(TimeViewUtil.getListDisplayDate(date1, Datetimes.addDate(date2, 1), true));
                    }
                    // OA-228233计划修改时未传入时分秒，造成时间视图显示有问题。
                    else if (PlanTypeEnum.day_plan.getValue().equals(plan.getType())
                            || PlanTypeEnum.week_plan.getValue().equals(plan.getType())) {
                        if (date1.compareTo(date2) == 0) {
                            vo.setEndDate(Datetimes.formatNoTimeZone(Datetimes.addDate(date2, 1),
                                    Datetimes.datetimeWithoutSecondStyle));
                            vo.setDbEndDate(Datetimes.formatNoTimeZone(Datetimes.addDate(date2, 1),
                                    Datetimes.datetimeWithoutSecondStyle));
                            vo.setDisplayDate(
                                    TimeViewUtil.getListDisplayDate(date1, Datetimes.addDate(date2, 1), false));
                            vo.setTipsDate(TimeViewUtil.getListDisplayDate(date1, Datetimes.addDate(date2, 1), true));
                        } else {
                            vo.setEndDate(Datetimes.formatNoTimeZone(Datetimes.addSecond(date2, 1),
                                    Datetimes.datetimeWithoutSecondStyle));
                            vo.setDbEndDate(Datetimes.formatNoTimeZone(Datetimes.addSecond(date2, 1),
                                    Datetimes.datetimeWithoutSecondStyle));
                            vo.setDisplayDate(
                                    TimeViewUtil.getListDisplayDate(date1, Datetimes.addSecond(date2, 1), false));
                            vo.setTipsDate(TimeViewUtil.getListDisplayDate(date1, Datetimes.addSecond(date2, 1), true));
                        }

                    }
                }
            }
            if (ApplicationCategoryEnum.taskManage.name().equals(appCategory)) {
                TaskInfoBO task = taskmanageApi.getTaskInfo(Long.valueOf(vo.getAppId()));
                if (task.isFulltime()) {
                    vo.setStartDate(Datetimes.formatNoTimeZone(Datetimes.getTodayFirstTime(date1),
                            Datetimes.datetimeWithoutSecondStyle));
                    vo.setDbStartDate(Datetimes.formatNoTimeZone(Datetimes.getTodayFirstTime(date1),
                            Datetimes.datetimeWithoutSecondStyle));
                    vo.setEndDate(Datetimes.formatNoTimeZone(Datetimes.addMinute(date2, 1),
                            Datetimes.datetimeWithoutSecondStyle));
                    vo.setDbEndDate(Datetimes.formatNoTimeZone(Datetimes.addMinute(date2, 1),
                            Datetimes.datetimeWithoutSecondStyle));
                    vo.setDisplayDate(TimeViewUtil.getListDisplayDate(date1, Datetimes.addMinute(date2, 1), false));
                    vo.setTipsDate(TimeViewUtil.getListDisplayDate(date1, Datetimes.addMinute(date2, 1), true));
                }
            }
        } else {
            // OA-220205 跨天且结束时间等于00:00:00，则自动加1秒解决我的视图占用第2天的第0秒但不显示问题
            if (date2 != null && date2.equals(Datetimes.getTodayFirstTime(date2)) && isMyTimeView) {
                vo.setStartDate(Datetimes.formatNoTimeZone(Datetimes.getTodayFirstTime(date1),
                        Datetimes.datetimeWithoutSecondStyle));
                vo.setDbStartDate(Datetimes.formatNoTimeZone(Datetimes.getTodayFirstTime(date1),
                        Datetimes.datetimeWithoutSecondStyle));
                vo.setEndDate(Datetimes.formatNoTimeZone(Datetimes.addMinute(date2, 1),
                        Datetimes.datetimeWithoutSecondStyle));
                vo.setDbEndDate(Datetimes.formatNoTimeZone(Datetimes.addMinute(date2, 1),
                        Datetimes.datetimeWithoutSecondStyle));
                vo.setDisplayDate(TimeViewUtil.getListDisplayDate(date1, Datetimes.addSecond(date2, 1), false));
                vo.setTipsDate(TimeViewUtil.getListDisplayDate(date1, Datetimes.addSecond(date2, 1), true));
            }
        }
    }

    /**
     * 根据权限计算视图数据标题 myDataList-我的可见数据集合 imparts-会议告知人集合 myCanViewData-我可见的领导行程数据
     *
     * @param myCanViewData
     */
    private String getViewTitleByAuth(Map<String, Object> map, List<Long> myDataList, List<Long> imparts,
                                      List<Long> myCanViewData) throws BusinessException {

        String appTitle = ParamUtil.getString(map, "appTitle", "");
        Long appId = ParamUtil.getLong(map, "appId");
        if (myDataList.contains(appId) || imparts.contains(appId) || myCanViewData.contains(appId)) { // 非领导行程根据本人事件交集判断是否可见
            return appTitle;
        } else {
            return ResourceUtil.getString("calendar.label.existingAgenda");
        }
    }

    @Override
    public Map<String, Object> checkTimeViewAuth(Map<String, Object> params) throws BusinessException {
        String app = ParamUtil.getString(params, "app");
        String appId = ParamUtil.getString(params, "appId");
        Map<String, Object> res = Maps.newHashMap();
        boolean hasViewAuth = false;
        boolean hasEditAuth = false;
        ApplicationCategoryEnum appEnum = ApplicationCategoryEnum.getEnumByName(app);
        switch (appEnum) {
            case taskManage:
                hasViewAuth = taskmanageApi.canViewTask(Long.valueOf(appId));
                hasEditAuth = taskmanageApi.canEditTask(Long.valueOf(appId));
                break;
            case register:
                if (appId != null) {
                    hasViewAuth = true;
                    hasEditAuth = true;
                }
                break;
            case plan:
                // 计划不能穿透
                PlanBO bo = planApi.getPlan(Long.valueOf(appId));
                hasViewAuth = planApi.hasViewPermission(AppContext.currentUserId(), Long.valueOf(appId));
                hasEditAuth = bo != null && (bo.getCreateUserId() == AppContext.currentUserId());
                break;
            case calendar:
                CalEvent calEvent = calEventManager.getCalEventById(Long.valueOf(appId));
                // 事件创建者
                long currentUserId = AppContext.currentUserId();
                // 如果当前人员在其中表示为“委托|安排”权限
                String receiveMemberId = calEvent.getReceiveMemberId();
                // 公开范围
                Set<V3xOrgMember> members = calendarNotifier.getMembers(calEvent, false);

                if (Long.valueOf(currentUserId).equals(calEvent.getCreateUserId())) {
                    hasViewAuth = true;
                    hasEditAuth = true;
                    break;
                }
                if (StringUtils.isNotEmpty(receiveMemberId)) {
                    if (CommonTools.parseTypeAndIdStr2Ids(calEvent.getReceiveMemberId()).contains(currentUserId)) {
                        hasViewAuth = true;
                        hasEditAuth = true;
                        break;
                    }
                }
                if (CollectionUtils.isNotEmpty(members)) {
                    for (V3xOrgMember member : members) {
                        if (member.getId().equals(currentUserId)) {
                            hasViewAuth = true;
                            hasEditAuth = false;
                            break;
                        }
                    }
                }
                break;
            case meeting:
                List<Long> mtMemberIds = meetingApi.getAllTypeMember(Long.valueOf(appId));
                if (Strings.isNotEmpty(mtMemberIds) && mtMemberIds.contains(AppContext.currentUserId())) {
                    hasViewAuth = true;
                } else {
                    hasViewAuth = false;
                }
                MeetingBO meetingBO = meetingApi.getMeeting(Long.valueOf(appId));
                hasEditAuth = meetingBO != null && (AppContext.currentUserId() == meetingBO.getCreateUser())
                        && (meetingBO.getState() == 0 || meetingBO.getState() == 10); // 待发、已发状态允许修改！
                break;
            case leaderagenda:

                if (Long.valueOf(appId) == -1) { // 新建权限
                    Result result = leaderAgendaApi.checkEditAuth(Long.valueOf(appId));
                    hasEditAuth = result.isSuccess();
                    hasViewAuth = result.isSuccess();
                } else {// 编辑或修改权限
                    Result result = leaderAgendaApi.isAgendaInclude(Long.valueOf(appId), false);
                    if (result.isSuccess()) {
                        // 有操作权限
                        result = leaderAgendaApi.checkEditAuth(Long.valueOf(appId));
                        hasEditAuth = result.isSuccess();
                        List<Long> myCanViewData = leaderAgendaApi.getMemberAuthAgendaIds(AppContext.currentUserId());
                        hasViewAuth = myCanViewData != null && myCanViewData.contains(Long.valueOf(appId));
                    }
                }
                break;
            default:
                break;
        }
        res.put("hasViewAuth", hasViewAuth);
        res.put("hasEditAuth", hasEditAuth);
        return res;
    }

    @Override
    public Map<String, Object> findMeetingViewData(Map<String, Object> params) throws BusinessException {

        Map<String, Object> retMap = new HashMap<String, Object>(16);
        List<TimeViewInfoVO> eventInfo = new ArrayList<TimeViewInfoVO>();
        // 视图类型
        int schedulerType = MapUtils.getIntValue(params, "schedulerType", 1);
        // 时间段
        Date beginDate = MapUtils.getLong(params, "startDate") == null ? null
                : new Date(MapUtils.getLong(params, "startDate"));
        Date endDate = MapUtils.getLong(params, "endDate") == null ? null
                : new Date(MapUtils.getLong(params, "endDate"));
        if (beginDate == null || endDate == null) {
            beginDate = DateUtil.addDay(Datetimes.getTodayFirstTime(Datetimes.getFirstDayInWeek0(new Date())), 1);
            endDate = DateUtil.addDay(Datetimes.getTodayLastTime(Datetimes.getLastDayInWeek0(new Date())), 1);
        }
        // 被查人人员ID(不传时为查当前登陆人员)
        Long memberId = MapUtils.getLong(params, "memberId", AppContext.currentUserId());
        // 回执状态
        String replyState = MapUtils.getString(params, "replyState", "");

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("beginDate", beginDate);
        map.put("endDate", endDate);
        map.put("_notUserPage", "true");
        map.put("currentUserID", AppContext.currentUserId());
        map.put("replyState", replyState);
        map.put("perId", memberId);
        map.put("mtStates", Arrays.asList(new Integer[] { 10, 20, 30, 31 }));// 跟时间视图保持一致，只查询已发送、已开始、已结束、提前结束四类状态数据

        // 状态
        List<TimeViewStatus> status = Lists.newArrayList(TimeViewStatus.findAll());

        // APP
        List<ApplicationCategoryEnum> apps = new ArrayList<ApplicationCategoryEnum>();
        apps.add(TimeViewAppEnum.findByKey(TimeViewAppEnum.meeting.getKey()));

        // 查询出当前登录人员作为告知人参与的会议
        List<Long> imparts = Lists.newArrayList();
        List<Map<String, Object>> impartData = timeViewDao
                .findImpartMeeting(Lists.newArrayList(AppContext.currentUserId()), beginDate, endDate, status);
        if (CollectionUtils.isNotEmpty(impartData)) {
            for (Map<String, Object> m : impartData) {
                imparts.add(ParamUtil.getLong(m, "appId"));
            }
        }

        List<MeetingBO> meetingList = meetingApi.findMeetings(ApplicationCategoryEnum.meeting, map);
        if (CollectionUtils.isNotEmpty(meetingList)) {
            // 代理信息
            List<Long> proxyList = MemberAgentBean.getInstance()
                    .getAgentToMemberId(ApplicationCategoryEnum.meeting.key(), AppContext.currentUserId());
            // 循环拼装视图数据
            for (MeetingBO bo : meetingList) {
                TimeViewInfoVO vo = new TimeViewInfoVO();
                vo.setAppId(bo.getId());
                vo.setType(ApplicationCategoryEnum.meeting.name());
                vo.setTypeName(TimeViewAppEnum.typeName(ApplicationCategoryEnum.meeting.name()));
                Date date1 = bo.getBeginDate();
                Date date2 = bo.getEndDate();
                vo.setDbStartDate(DateUtil.format(date1, Datetimes.datetimeWithoutSecondStyle));
                vo.setDbEndDate(DateUtil.format(date2, Datetimes.datetimeWithoutSecondStyle));
                vo.setStartDate(DateUtil.format(date1, Datetimes.datetimeWithoutSecondStyle));
                vo.setEndDate(DateUtil.format(date2, Datetimes.datetimeWithoutSecondStyle));
                vo.setDisplayDate(TimeViewUtil.getListDisplayDate(date1, date2, false));
                vo.setTipsDate(TimeViewUtil.getListDisplayDate(date1, date2, true));

                // 所有会议相关人员
                List<Long> mtMemberIds = meetingApi.getAllTypeMember(bo.getId());
                if (Strings.isNotEmpty(mtMemberIds) && mtMemberIds.contains(AppContext.currentUserId())) { // 根据本人事件交集判断是否可见
                    vo.setTitle(bo.getTitle());
                } else {
                    vo.setTitle(ResourceUtil.getString("calendar.label.existingAgenda"));// 已有安排
                }
                // 代理人信息
                if (proxyList != null && proxyList.size() > 0) {
                    List<Long> allMemberId = meetingApi.getAllTypeMember(bo.getId());
                    for (Long proxyId : proxyList) {
                        if (allMemberId.contains(proxyId)) {
                            bo.setTitle(bo.getTitle() + "(" + ResourceUtil.getString("common.agent.label")
                                    + OrgHelper.showMemberName(proxyId) + ")");
                        }
                    }
                }
                vo.setCreateMember(bo.getCreateUser());
                vo.setOrgentId(memberId);
                vo.setMemberId(memberId);
                vo.setMemberName(OrgHelper.showMemberName(memberId));
                eventInfo.add(vo);
            }
        }
        Collections.sort(eventInfo);
        retMap.put("eventInfo", eventInfo);
        retMap.put("schedulerType", schedulerType);
        retMap.put("dateStamp", Datetimes.formatDatetime(new Date()));
        return retMap;
    }
}