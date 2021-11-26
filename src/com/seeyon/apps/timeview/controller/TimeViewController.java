package com.seeyon.apps.timeview.controller;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Lists;
import com.seeyon.apps.leaderagenda.manager.LeaderAgendaManager;
import com.seeyon.apps.taskmanage.util.MenuPurviewUtil;
import com.seeyon.apps.timeview.enums.TimeViewAppEnum;
import com.seeyon.apps.timeview.enums.TimeViewPageEnum;
import com.seeyon.apps.uc.api.ZxApi;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.authenticate.domain.User;
import com.seeyon.ctp.common.controller.BaseController;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.common.i18n.ResourceUtil;
import com.seeyon.ctp.organization.bo.MemberPost;
import com.seeyon.ctp.organization.bo.V3xOrgPost;
import com.seeyon.ctp.organization.manager.OrgManager;
import com.seeyon.ctp.util.Datetimes;
import com.seeyon.ctp.util.ReqUtil;
import com.seeyon.ctp.util.Strings;
import com.seeyon.ctp.util.json.JSONUtil;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

/**
 * @author Ch1stuntQAQ
 * @ClassName TimeViewController.java
 * @Description TODO 时间视图控制层
 * @data 2021/9/26 - 17:14
 */
public class TimeViewController extends BaseController {

    private LeaderAgendaManager leaderAgendaManager;
    private ZxApi zxApi;

    public void setZxApi(ZxApi zxApi) {
        this.zxApi = zxApi;
    }

    public void setLeaderAgendaManager(LeaderAgendaManager leaderAgendaManager) {
        this.leaderAgendaManager = leaderAgendaManager;
    }

    /**
     * 时间视图主页
     */
    public ModelAndView timeViewHome(HttpServletRequest request, HttpServletResponse response){
        ModelAndView mav = new ModelAndView("apps/calendar/timeView/timeViewHome");
        return mav;
    }

    /**
     * 时间视图主页-我的视图
     */
    public ModelAndView myTimeView(HttpServletRequest request, HttpServletResponse response) throws BusinessException {
        ModelAndView mav = new ModelAndView("apps/calendar/timeView/myTimeView");

        // 按钮权限处理
        addAuthAttributeOfModel(mav);

        // 页面请求来源，详见TimeViewPageEnum
        TimeViewPageEnum pageEnum = TimeViewPageEnum.findByKey(ReqUtil.getInt(request, "sourceType", 0));
        switch (pageEnum) {
            case CalSectionWeekView: // 我的日程栏目-周视图
                mav.addObject("entityId", ReqUtil.getString(request, "entityId", ""));
                break;
            case CalEventView: // 日程事件-事件视图
                mav.addObject("curDate", ReqUtil.getString(request, "curDate", ""));
                break;
            case RelateMemberView: // 关联人员穿透视图
                mav.addObject("curDate", ReqUtil.getString(request, "curDate", ""));
                mav.addObject("memberId", ReqUtil.getString(request, "relateMemberId", ""));
                break;
            case TimeView: // 时间视图
                break;
            case MeetingSectionView: // 我的会议日程栏目视图
                mav.addObject("entityId", ReqUtil.getString(request, "entityId", ""));
                mav.addObject("replyState", ReqUtil.getString(request, "replyState", ""));
                break;
            case IndexView: // 关联人员穿透视图
                mav.addObject("memberId", ReqUtil.getString(request, "memberId", ""));
                break;
            default:
                break;
        }
        mav.addObject("sourceType", pageEnum.name());
        // 服务器时间
        mav.addObject("serverTimeStamp", Datetimes.formatDatetime(new Date()));
        return mav;
    }

    /**
     * 时间视图主页-部门视图
     */
    public ModelAndView deptTimeView(HttpServletRequest request, HttpServletResponse response)
            throws BusinessException {
        ModelAndView mav = new ModelAndView("apps/calendar/timeView/otherTimeView");
        // 视图类型-部门视图
        mav.addObject("viewType", "deptView");
        // 要展示的人员ID集合
        mav.addObject("memberIds", ReqUtil.getString(request, "memberIds", ""));
        // 按钮权限处理
        addAuthAttributeOfModel(mav);
        // 请求来源
        mav.addObject("sourceType", TimeViewPageEnum.TimeView.ordinal());
        // 服务器时间
        mav.addObject("serverTimeStamp", Datetimes.formatDatetime(new Date()));
        // 页面标题(为了适配致信特在此处理)
        mav.addObject("pageTitle", ResourceUtil.getString("timeview.pageTitle1"));


        //实训项目 添加新类型日程 lidan  2021-10-13 start

        // 判断登录人岗位是否为部门经理
        String kalendarRole = AppContext.getSystemProperty("demandConfiguration.deptManager");
        // 获取当前登录人岗位信息
        User user = AppContext.getCurrentUser();
        OrgManager orgManager = (OrgManager) AppContext.getBean("orgManager");
        List<MemberPost> memberPosts = orgManager.getMemberPosts(user.getAccountId(), user.getId());
        for (MemberPost memberPost : memberPosts) {
            V3xOrgPost post = orgManager.getPostById(memberPost.getPostId());
            if (post.getName().equals(kalendarRole)) {
                // 当前登录人有权限查看登记测试项
                mav.addObject("register", true);
            }
        }
        //实训项目 添加新类型日程 lidan  2021-10-13 end
        return mav;
    }

    /**
     * 时间视图主页-他人视图
     */
    public ModelAndView otherTimeView(HttpServletRequest request, HttpServletResponse response)
            throws BusinessException, ParseException {
        ModelAndView mav = new ModelAndView("apps/calendar/timeView/otherTimeView");
        // 视图类型-他人视图
        mav.addObject("viewType", "otherView");

        String sourceType = ReqUtil.getString(request, "sourceType", null);
        String memberIds = "";

        TimeViewPageEnum timeViewPageEnum = TimeViewPageEnum.TimeView;
        if (StringUtils.isNotBlank(sourceType)) {
            timeViewPageEnum = TimeViewPageEnum.findByKey(Integer.parseInt(sourceType));
            if (TimeViewPageEnum.ZxView.equals(timeViewPageEnum)) {
                // 来自致信客户端获取致信群id
                String zxGroupId = ReqUtil.getString(request, "zxGroupId", "");
                if (StringUtils.isNotBlank(zxGroupId)) {
                    StringBuilder idBuilder = new StringBuilder();
                    // 查询全部群成员
                    List<Long> memberIdSet = zxApi
                            .getGroupInfo(Long.parseLong(zxGroupId), AppContext.getCurrentUser().getId())
                            .getOrderlyGroupMemberIds();
                    if (CollectionUtils.isNotEmpty(memberIdSet)) {
                        memberIdSet.forEach(memberIdLong -> idBuilder.append(memberIdLong).append(","));
                    }
                    if (idBuilder.length() > 0) {
                        memberIds = idBuilder.substring(0, idBuilder.length() - 1);
                    }
                }
                mav.addObject("pageTitle", "timeview.pageTitle2");
            }
        } else {
            memberIds = ReqUtil.getString(request, "memberIds", "");
            mav.addObject("pageTitle", ResourceUtil.getString("timeview.pageTitle1"));
        }

        mav.addObject("sourceType", timeViewPageEnum.ordinal());
        // 要展示的人员ID集合
        mav.addObject("memberIds", memberIds);
        // 按钮权限处理
        addAuthAttributeOfModel(mav);
        // 服务器时间
        mav.addObject("serverTimeStamp", Datetimes.formatDatetime(new Date()));
        return mav;
    }

    /**
     * 时间视图主页-展示单个成员的时间视图
     */
    public ModelAndView showEvnetsByMember(HttpServletRequest request, HttpServletResponse response)
            throws BusinessException {
        ModelAndView mav = new ModelAndView("apps/calendar/timeView/showEvnetsByMember");
        // 视图类型-他人视图
        mav.addObject("viewType", ReqUtil.getString(request, "viewType", ""));
        // 要展示的人员ID
        mav.addObject("memberId", ReqUtil.getString(request, "memberId", ""));
        // 服务器时间
        mav.addObject("serverTimeStamp", Datetimes.formatDatetime(new Date()));
        return mav;
    }

    /**
     * 为页面视图添加人员权限相关属性
     */
    private void addAuthAttributeOfModel(ModelAndView mav) throws BusinessException {
        // 是否有新建日程事件的权限
        boolean hasNewEventAuth = AppContext.hasPlugin("calendar")
                && MenuPurviewUtil.isHaveEvent(AppContext.getCurrentUser());
        // 是否有新建计划的权限
        boolean hasNewPlanAuth = AppContext.hasPlugin("plan")
                && MenuPurviewUtil.isHavePlan(AppContext.getCurrentUser());
        // 是否有新建会议的权限
        boolean hasNewMeetingAuth = AppContext.hasPlugin("meeting")
                && MenuPurviewUtil.isHaveMeetingArrange(AppContext.getCurrentUser());
        // 是否有新建任务的权限
        boolean hasNewTaskAuth = AppContext.hasPlugin("taskmanage")
                && MenuPurviewUtil.isHaveNewTask(AppContext.getCurrentUser());
        // 是否有新建领导行程权限
        boolean newAgendaAuth = AppContext.hasPlugin("leaderagenda")
                && leaderAgendaManager.checkEditAuth(-1L).isSuccess();

        // 新建按钮列表
        List<String> newBtnList = Lists.newArrayList();
        List<Integer> defaultOptions = Lists.newArrayList();
        if (newAgendaAuth) {
            defaultOptions.add(TimeViewAppEnum.leaderagenda.getKey());
            newBtnList.add(JSONUtil.toJSONString(ImmutableMap.of("value", "newAgenda", "label",
                    ResourceUtil.getString("timeview.oprates.create.new_agenda"))));
        }
        if (hasNewMeetingAuth) {
            defaultOptions.add(TimeViewAppEnum.meeting.getKey());
            newBtnList.add(JSONUtil.toJSONString(ImmutableMap.of("value", "newMeeting", "label",
                    ResourceUtil.getString("timeview.oprates.create.new_meeting"))));
        }
        if (hasNewPlanAuth) {
            // defaultOptions.add(TimeViewAppEnum.plan.getKey());
            newBtnList.add(JSONUtil.toJSONString(ImmutableMap.of("value", "newPlan", "label",
                    ResourceUtil.getString("timeview.oprates.create.new_plan"))));
        }
        if (hasNewTaskAuth) {
            defaultOptions.add(TimeViewAppEnum.task.getKey());
            newBtnList.add(JSONUtil.toJSONString(ImmutableMap.of("value", "newTask", "label",
                    ResourceUtil.getString("timeview.oprates.create.new_task"))));
        }
        if (hasNewEventAuth) {
            defaultOptions.add(TimeViewAppEnum.calEvent.getKey());
            newBtnList.add(JSONUtil.toJSONString(ImmutableMap.of("value", "newEvent", "label",
                    ResourceUtil.getString("timeview.oprates.create.new_event"))));
        }

        mav.addObject("hasNewEventAuth", hasNewEventAuth);
        mav.addObject("hasNewPlanAuth", hasNewPlanAuth);
        mav.addObject("hasNewMeetingAuth", hasNewMeetingAuth);
        mav.addObject("hasNewTaskAuth", hasNewTaskAuth);
        mav.addObject("newAgendaAuth", newAgendaAuth);
        mav.addObject("newBtnList", newBtnList);
        mav.addObject("defaultOptions", Strings.join(defaultOptions, ","));
    }
}