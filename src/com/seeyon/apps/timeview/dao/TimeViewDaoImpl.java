/**
 * @author Ch1stuntQAQ
 * @data 2021/9/26 - 17:26
 * @Description TODO 时间视图实现层
 */

package com.seeyon.apps.timeview.dao;

import com.google.common.base.Joiner;
import com.google.common.collect.Lists;
import com.seeyon.apps.timeview.enums.TimeViewEnum;
import com.seeyon.apps.timeview.enums.TimeViewEnum.TimeViewAuthTypeEnum;
import com.seeyon.apps.timeview.enums.TimeViewStatus;
import com.seeyon.apps.timeview.po.TimeViewAuth;
import com.seeyon.apps.timeview.po.TimeViewInfo;
import com.seeyon.apps.timeview.util.TimeViewUtil;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.constants.ApplicationCategoryEnum;
import com.seeyon.ctp.common.dao.BaseHibernateDao;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.organization.manager.OrgManager;
import com.seeyon.ctp.util.DBAgent;
import com.seeyon.ctp.util.DateUtil;
import com.seeyon.ctp.util.FlipInfo;
import com.seeyon.ctp.util.JDBCAgent;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;

import java.text.MessageFormat;
import java.util.*;
import java.util.function.Consumer;

public class TimeViewDaoImpl extends BaseHibernateDao<TimeViewDaoImpl> implements TimeViewDao {
    // private static final Log LOG = CtpLogFactory.getLog(TimeViewDaoImpl.class);
    private OrgManager orgManager;

    public void setOrgManager(OrgManager orgManager) {
        this.orgManager = orgManager;
    }

    @Override
    public void saveTimeViewInfo(TimeViewInfo tv) {
        DBAgent.save(tv);
    }

    @Override
    public void updateTimeViewInfo(List<TimeViewInfo> viewInfoList) {
        if (CollectionUtils.isNotEmpty(viewInfoList)) {
            DBAgent.updateAll(viewInfoList);
        }
    }

    @Override
    public void deleteTimeViewInfo(Map<String, Object> param) {
        StringBuilder sql = new StringBuilder(50);
        sql.append("delete from TimeViewInfo tv where tv.appId=:appId ");
        DBAgent.bulkUpdate(sql.toString(), param);
    }

    @Override
    public void saveTimeViewAuth(List<TimeViewAuth> authList) {
        if (CollectionUtils.isNotEmpty(authList)) {
            DBAgent.saveAll(authList);
        }

    }

    @Override
    public void updateTimeViewAuth(List<TimeViewAuth> authList) {
        if (CollectionUtils.isNotEmpty(authList)) {
            DBAgent.updateAll(authList);
        }

    }

    @Override
    public void deleteTimeViewAuth(Map<String, Object> param) {
        StringBuilder sql = new StringBuilder(50);
        sql.append("delete from TimeViewAuth ta where ta.appId=:appId ");
        if (param.containsKey("orgentId")) {
            sql.append(" and ta.orgentId=:orgentId ");
        }
        DBAgent.bulkUpdate(sql.toString(), param);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<TimeViewInfo> findTimeViewInfoList(Map<String, Object> param) {
        StringBuilder sql = new StringBuilder(50);
        sql.append("from TimeViewInfo tv where tv.appId=:appId ");
        return DBAgent.find(sql.toString(), param);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<TimeViewAuth> findTimeViewAuthList(Map<String, Object> param) {
        StringBuilder sql = new StringBuilder(50);
        sql.append("from TimeViewAuth ta where ta.appId=:appId ");
        if (param.containsKey("orgentId")) {
            sql.append(" and ta.orgentId=:orgentId ");
        }
        return DBAgent.find(sql.toString(), param);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<TimeViewInfo> find(Long userId, Date startDate, Date endDate, List<ApplicationCategoryEnum> apps,
                                   List<TimeViewStatus> status, FlipInfo flipInfo) throws BusinessException {
        Map<String, Object> param = new HashMap<String, Object>();
        List<Long> userIds = orgManager.getAllUserDomainIDs(userId);

        StringBuilder hql = new StringBuilder(50);
        hql.append(" select distinct si from TimeViewAuth tv,TimeViewInfo si");
        hql.append(" where tv.timeViewId = si.id and tv.orgentId in(:userIds) ");
        hql.append(" and si.endTime >= :startTime and si.startTime <= :endTime");
        hql.append(" AND  ");

        if (status == null) {// 没传状态表示全部
            List<String> appCategorys = new ArrayList<String>(apps.size());
            for (ApplicationCategoryEnum ca : apps) {
                appCategorys.add(ca.name());
            }
            hql.append(" si.appCategory in(:appCategory) ");
            param.put("appCategory", appCategorys);
        } else {
            hql.append(" ( ");
            for (int i = 0, size = apps.size(); i < size; i++) {
                ApplicationCategoryEnum app = apps.get(i);
                if (i != 0) {
                    hql.append(" OR ");
                }
                hql.append(" ( si.appCategory = :appCategory").append(i).append(" AND si.appStatus in(:")
                        .append(app.name()).append("appStatus ) ");
                if (ApplicationCategoryEnum.taskManage.equals(app)) {
                    // 我参与的任务
                    hql.append(" and tv.authType in (:taskAuthType) ");
                    param.put("taskAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.onduty.getKey()));
                }
                if (ApplicationCategoryEnum.plan.equals(app)) {
                    // 我创建或我参与的计划
                    hql.append(" and tv.authType in (:planAuthType) ");
                    param.put("planAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.creator.getKey(),
                            TimeViewAuthTypeEnum.tellme.getKey()));
                }
                if (ApplicationCategoryEnum.calendar.equals(app)) {
                    // 我创建的或安排给我的事件
                    hql.append(" and tv.authType in (:calendarAuthType) ");
                    param.put("calendarAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.creator.getKey(),
                            TimeViewAuthTypeEnum.onduty.getKey()));
                }
                if (ApplicationCategoryEnum.meeting.equals(app)) {
                    // 我回执为参与或未回执的会议
                    hql.append(" and tv.authType in (:meetingAuthType) ");
                    param.put("meetingAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.tellme.getKey()));
                }
                if (ApplicationCategoryEnum.leaderagenda.equals(app)) {
                    // 领导日程
                    hql.append(" and tv.authType = :leaderagendaAuthType");
                    param.put("leaderagendaAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.onduty.getKey()));
                }
                hql.append(")");
                param.put("appCategory" + i, app.name());
                param.put(app.name() + "appStatus", TimeViewUtil.getCategroryStatus(app, status));
            }
            hql.append(" ) ");
        }
        // 先按照开始时间升序排列,然后按照任务,计划,会议,事件 排列
        hql.append(" order by si.startTime asc,si.appCategory desc ");
        param.put("startTime", startDate);
        param.put("endTime", endDate);
        param.put("userIds", userIds);
        if (flipInfo == null) {
            return DBAgent.find(hql.toString(), param);
        } else {
            Map<String, Object> extParams = flipInfo.getParams();
            if (MapUtils.isNotEmpty(extParams)) {
                if (extParams.containsKey("after_createTime")) {// 过滤创建时间在时间后
                    hql.append(" and createTime > :after_createTime ");
                    param.put("after_createTime", userIds);
                }
            }

            return DBAgent.find(hql.toString(), param, flipInfo);
        }
    }

    @Override
    public List<TimeViewInfo> find(Long userId, Date startDate, Date endDate, List<ApplicationCategoryEnum> apps,
                                   List<TimeViewStatus> status) throws BusinessException {
        return this.find(userId, startDate, endDate, apps, status, null);
    }

    @Override
    public List<TimeViewInfo> findTimeViewInfo(Long userId, Date startDate, Date endDate,
                                               List<ApplicationCategoryEnum> apps) throws BusinessException {
        return this.find(userId, startDate, endDate, apps, null, null);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Map<String, Object>> findMembersTimeViewInfo(List<Long> userIds, Date startTime, Date endTime,
                                                             List<ApplicationCategoryEnum> apps, List<TimeViewStatus> status, boolean needShare)
            throws BusinessException {
        List<Map<String, Object>> result = Collections.EMPTY_LIST;
        Map<String, Object> sqlParams = new HashMap<String, Object>();
        StringBuilder sqlAll = new StringBuilder();
        List<String> unionSql = new ArrayList<String>();

        // 时间视图查询sql
        Consumer<Consumer<StringBuilder>> execSql = (callback) -> {
            StringBuilder selectSql = new StringBuilder();
            selectSql.append(" select                               ");
            selectSql.append(" 	{0}.app_category as appCategory,    ");
            selectSql.append(" 	{0}.app_id as appId,                ");
            selectSql.append(" 	{0}.app_title as appTitle,          ");
            selectSql.append(" 	{0}.start_time as startTime,        ");
            selectSql.append(" 	{0}.end_time as endTime,            ");
            selectSql.append(" 	{0}.create_member as createMember,  ");
            selectSql.append(" 	{1}.orgent_id as orgentId,          ");
            selectSql.append(" 	{1}.auth_type as authType,          ");
            selectSql.append(" 	{0}.app_status as appStatus         ");
            selectSql.append(" from time_view_info {0},time_view_auth {1} ");
            selectSql.append(" where {0}.id = {1}.timeview_id ");
            selectSql.append(" and {0}.end_time  >= :startTime ");
            selectSql.append(" and {0}.start_time <= :endTime");
            selectSql.append(" and {1}.orgent_id in (:userIds)");
            callback.accept(selectSql);
            unionSql.add(
                    MessageFormat.format(selectSql.toString(), "info" + unionSql.size(), "auth" + unionSql.size()));
            sqlParams.put("startTime", startTime);
            sqlParams.put("endTime", endTime);
            sqlParams.put("userIds", userIds);
        };

        // 逐个分类拼接SQL
        for (int i = 0, size = apps.size(); i < size; i++) {
            ApplicationCategoryEnum app = apps.get(i);
            if (ApplicationCategoryEnum.taskManage.equals(app)) {
                execSql.accept(sql1 -> {
                    // 我创建或参与的任务
                    sql1.append(" and {1}.auth_type in (:taskAuthType) ").append(" and {0}.app_status in(:")
                            .append(app.name()).append("appStatus ) ");
                    sql1.append(" and {0}.app_category = :taskAppCategory ");
                    sqlParams.put("taskAppCategory", app.name());
                    sqlParams.put("taskAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.onduty.getKey(),
                            TimeViewAuthTypeEnum.creator.getKey()));
                    sqlParams.put(app.name() + "appStatus", TimeViewUtil.getCategroryStatus(app, status));
                });
            }
            if (ApplicationCategoryEnum.plan.equals(app)) {
                execSql.accept(sql1 -> {
                    // 我创建或我参与的计划
                    sql1.append(" and {1}.auth_type in (:planAuthType) ").append(" and {0}.app_status in(:")
                            .append(app.name()).append("appStatus ) ");
                    sql1.append(" and {0}.app_category = :planAppCategory ");
                    sqlParams.put("planAppCategory", app.name());
                    sqlParams.put("planAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.creator.getKey(),
                            TimeViewAuthTypeEnum.tellme.getKey()));
                    sqlParams.put(app.name() + "appStatus", TimeViewUtil.getCategroryStatus(app, status));
                });
            }
            if (ApplicationCategoryEnum.calendar.equals(app)) {
                execSql.accept(sql1 -> {
                    // 我创建的或安排给我的事件
                    sql1.append(" and {1}.auth_type in (:calendarAuthType) ").append(" and {0}.app_status in(:")
                            .append(app.name()).append("appStatus ) ");
                    sql1.append(" and {0}.app_category = :calendarAppCategory ");
                    List<Integer> auths = Lists.newArrayList(TimeViewAuthTypeEnum.creator.getKey(),
                            TimeViewAuthTypeEnum.onduty.getKey());
                    if (needShare) {
                        // 他人,部门的,领导的
                        auths.add(TimeViewAuthTypeEnum.tellme.getKey());
                    }
                    sqlParams.put("calendarAppCategory", app.name());
                    sqlParams.put("calendarAuthType", auths);
                    sqlParams.put(app.name() + "appStatus", TimeViewUtil.getCategroryStatus(app, status));
                });
            }
            /**
             * 新增的 start
             */
            if (ApplicationCategoryEnum.register.equals(app)) {
                execSql.accept(sql1 -> {
                    // 我所有的登记测试
                    sql1.append(" and {1}.auth_type in (:registerAuthType) ").append(" AND {0}.app_status in(:")
                            .append(app.name()).append("appStatus ) ");
                    sql1.append(" and ({1}.role_type != :roleType or {1}.role_type is null)");
                    sqlParams.put("registerAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.onduty.getKey(),
                            TimeViewAuthTypeEnum.creator.getKey()));
                    sqlParams.put(app.name() + "appStatus",
                            TimeViewUtil.getCategroryStatus(ApplicationCategoryEnum.calendar, status));
                    sqlParams.put("roleType", String.valueOf(TimeViewEnum.MeetingRoleType.impart.ordinal()));
                });
            }
            /**
             * 新增 end
             */
            if (ApplicationCategoryEnum.meeting.equals(app)) {
                execSql.accept(sql1 -> {
                    // 我回执为参与或未回执的会议
                    sql1.append(" and {1}.auth_type in (:meetingAuthType) ").append(" and {0}.app_status in(:")
                            .append(app.name()).append("appStatus ) ");
                    sql1.append(" and ({1}.role_type != :meetingAuthRoleType or {1}.role_type is null)");
                    sql1.append(" and {0}.app_category = :meetingAppCategory ");
                    sqlParams.put("meetingAppCategory", app.name());
                    sqlParams.put("meetingAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.tellme.getKey()));
                    sqlParams.put(app.name() + "appStatus", TimeViewUtil.getCategroryStatus(app, status));
                    sqlParams.put("meetingAuthRoleType", String.valueOf(TimeViewEnum.MeetingRoleType.impart.ordinal()));
                });
            }
            if (ApplicationCategoryEnum.leaderagenda.equals(app)) {
                execSql.accept(sql1 -> {
                    // 领导行程
                    sql1.append(" and {1}.auth_type = :leaderagendaAuthType");
                    sqlParams.put("leaderagendaAuthType", TimeViewAuthTypeEnum.onduty.getKey());
                    if (status.contains(TimeViewStatus.finshed) && !status.contains(TimeViewStatus.unfinshed)) { // 查已完成
                        sql1.append(" and {0}.end_time <= :leaderagendaSysDate");
                        sqlParams.put("leaderagendaSysDate", DateUtil.currentDate());
                    } else if (!status.contains(TimeViewStatus.finshed) && status.contains(TimeViewStatus.unfinshed)) { // 查未完成
                        sql1.append(" and {0}.end_time > :leaderagendaSysDate");
                        sqlParams.put("leaderagendaSysDate", DateUtil.currentDate());
                    } else {
                        // 查已完成+未完成,不做处理
                    }
                    sql1.append(" and {0}.app_category = :leaderagendaAppCategory ");
                    sqlParams.put("leaderagendaAppCategory", app.name());
                });
            }
        }
        // select xxx from union结果(下面的字段别名用双引号是为了避免神通数据库将别名自动转成大写导致报错)
        sqlAll.append(" select ");
        sqlAll.append("  t.appCategory as \"appCategory\",    ");
        sqlAll.append("  t.appId as \"appId\",                ");
        sqlAll.append("  t.appTitle as \"appTitle\",          ");
        sqlAll.append("  t.startTime as \"startTime\",        ");
        sqlAll.append("  t.endTime as \"endTime\",            ");
        sqlAll.append("  t.createMember as \"createMember\",  ");
        sqlAll.append("  t.orgentId as \"orgentId\",          ");
        sqlAll.append("  t.authType as \"authType\",          ");
        sqlAll.append("  t.appStatus as \"appStatus\"         ");
        sqlAll.append(" from ( ");
        sqlAll.append(Joiner.on(" union all ").join(unionSql));
        sqlAll.append(" ) t where 1=1 ");

        JDBCAgent agent = new JDBCAgent();
        try {
            agent.executeNamedSql(sqlAll.toString(), sqlParams);
            result = agent.resultSetToList(false);
        } catch (Exception e) {
            throw new BusinessException(e);
        } finally {
            agent.close();
        }
        return result;

    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Map<String, Object>> findArrangeTimeViewInfo(List<Long> userIds, Date startDate, Date endDate,
                                                             List<ApplicationCategoryEnum> apps, List<TimeViewStatus> status) throws BusinessException {
        Map<String, Object> param = new HashMap<String, Object>();
        StringBuilder hql = new StringBuilder(50);
        hql.append(
                " select new Map(si.appCategory as appCategory,tv.appId as appId, si.appTitle as appTitle,si.startTime as startTime,si.endTime as endTime,si.createMember as createMember,tv.orgentId as orgentId,tv.authType as authType) from TimeViewAuth tv,TimeViewInfo si");
        hql.append(" where tv.timeViewId = si.id and si.createMember in(:userIds) ");
        hql.append(" and si.endTime >= :startTime and si.startTime <= :endTime");
        hql.append(" AND ( 1 = 0 ");
        int j = 0;
        for (int i = 0, size = apps.size(); i < size; i++) {
            ApplicationCategoryEnum app = apps.get(i);
            if (j == 0 && (ApplicationCategoryEnum.meeting.equals(app)
                    || ApplicationCategoryEnum.taskManage.equals(app))) {
                // 我创建且我不参与的任务||我创建且我不参与的会议
                hql.append(" OR ");
                hql.append(" ( si.appCategory in (:meetingAndTaskCategory)");
                hql.append(
                        " and not EXISTS(select id from TimeViewAuth ti where tv.appId = ti.appId and ti.orgentId in(:userIds) and ti.authType in(:meetingAndTaskAuthType) and (tv.roleType != :roleType or tv.roleType is null))");
                hql.append(")");
                param.put("meetingAndTaskAuthType",
                        Lists.newArrayList(TimeViewAuthTypeEnum.onduty.getKey(), TimeViewAuthTypeEnum.tellme.getKey()));
                param.put("roleType", String.valueOf(TimeViewEnum.MeetingRoleType.impart.ordinal()));
                j++;
            }
            if (ApplicationCategoryEnum.calendar.equals(app)) {
                // 我创建且我安排给他人的事件
                hql.append(" OR ");
                hql.append(" ( si.appCategory = :appCategory").append(i);
                hql.append(
                        " and EXISTS(select id from TimeViewAuth ti where tv.appId = ti.appId and ti.authType in(:calendarAuthType)) ");
                param.put("calendarAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.onduty.getKey()));
                param.put("appCategory" + i, app.name());
                hql.append(")");
            }
        }
        hql.append(" ) ");
        hql.append(" and tv.authType = :creatorType ");
        hql.append(" and si.timeViewStatus in (:appStatus)");
        List<Integer> appStatus = Lists.newArrayList();
        for (int i = 0; i < status.size(); i++) {
            appStatus.add(status.get(i).ordinal());
        }
        List<String> meetingAndTaskCategory = Lists.newArrayList();
        if (apps.contains(ApplicationCategoryEnum.meeting)) {
            meetingAndTaskCategory.add(ApplicationCategoryEnum.meeting.name());
        }
        if (apps.contains(ApplicationCategoryEnum.taskManage)) {
            meetingAndTaskCategory.add(ApplicationCategoryEnum.taskManage.name());
        }
        if (CollectionUtils.isNotEmpty(meetingAndTaskCategory)) {
            param.put("meetingAndTaskCategory", meetingAndTaskCategory);
        }
        param.put("appStatus", appStatus);
        param.put("creatorType", Lists.newArrayList(TimeViewAuthTypeEnum.creator.getKey()));
        param.put("startTime", startDate);
        param.put("endTime", endDate);
        param.put("userIds", userIds);
        return DBAgent.find(hql.toString(), param);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Map<String, Object>> findAllCalTimeViewInfo(List<Long> deptIds, Date startDate, Date endDate,
                                                            List<ApplicationCategoryEnum> apps, List<TimeViewStatus> status) {
        Map<String, Object> param = new HashMap<String, Object>();
        StringBuilder hql = new StringBuilder(50);
        hql.append(
                " select new Map(si.appCategory as appCategory,tv.appId as appId, si.appTitle as appTitle,si.startTime as startTime,si.endTime as endTime,si.createMember as createMember,tv.orgentId as orgentId,tv.authType as authType) from TimeViewAuth tv,TimeViewInfo si");
        hql.append(" where tv.timeViewId = si.id ");
        hql.append(" and si.startTime >= :startTime and si.endTime <= :endTime");
        hql.append(" AND  ");
        hql.append(" ( si.appCategory = 'calendar'");
        // 他人创建的且安排给我的的事件
        hql.append(" and tv.authType = :calendarCreaterAuthType");
        param.put("calendarCreaterAuthType", TimeViewAuthTypeEnum.creator.getKey());
        hql.append(
                " and EXISTS(select id from TimeViewAuth ti where tv.appId = ti.appId and (ti.orgentId in(:currentUserId) or (ti.orgentType = '1' and ti.orgentId in (:deptIds))) and ti.authType in(:calendarAuthType)) ");
        param.put("calendarAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.tellme.getKey()));
        param.put("currentUserId", AppContext.currentUserId());
        hql.append(")");
        param.put("deptIds", deptIds);
        hql.append(" and si.timeViewStatus in (:appStatus)");
        List<Integer> appStatus = Lists.newArrayList();
        for (int i = 0; i < status.size(); i++) {
            appStatus.add(status.get(i).ordinal());
        }
        param.put("appStatus", appStatus);
        param.put("startTime", startDate);
        param.put("endTime", endDate);
        return DBAgent.find(hql.toString(), param);
    }

    @Override
    public List<Map<String, Object>> findImpartMeeting(List<Long> memberIds, Date startTime, Date endTime,
                                                       List<TimeViewStatus> status) {
        Map<String, Object> param = new HashMap<String, Object>();
        StringBuilder hql = new StringBuilder(50);
        hql.append(
                " select new Map(si.appCategory as appCategory,tv.appId as appId, si.appTitle as appTitle,si.startTime as startTime,si.endTime as endTime,si.createMember as createMember,tv.orgentId as orgentId,tv.authType as authType,si.appStatus as appStatus) from TimeViewAuth tv,TimeViewInfo si");
        hql.append(" where tv.timeViewId = si.id and tv.orgentId in(:memberIds) ");
        hql.append(" and si.endTime >= :startTime and si.startTime <= :endTime");
        hql.append(" and tv.roleType = :roleType ").append(" AND si.appStatus in(:appStatus ) ");
        param.put("roleType", String.valueOf(TimeViewEnum.MeetingRoleType.impart.ordinal()));
        List<Integer> appStatus = Lists.newArrayList();
        for (TimeViewStatus st : status) {
            appStatus.addAll(st.getMeetingStatus());
        }
        param.put("startTime", startTime);
        param.put("endTime", endTime);
        param.put("memberIds", memberIds);
        param.put("appStatus", appStatus);
        return DBAgent.find(hql.toString(), param);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Map<String, Object>> findOtherTimeViewInfo(List<Long> userIds, Date startDate, Date endDate,
                                                           List<ApplicationCategoryEnum> apps, List<TimeViewStatus> status) {
        Map<String, Object> param = new HashMap<String, Object>();
        StringBuilder hql = new StringBuilder(50);
        hql.append(
                " select new Map(si.appCategory as appCategory,tv.appId as appId, si.appTitle as appTitle,si.startTime as startTime,si.endTime as endTime,si.createMember as createMember,tv.orgentId as orgentId,tv.authType as authType) from TimeViewAuth tv,TimeViewInfo si");
        hql.append(" where tv.timeViewId = si.id ");
        hql.append(" and si.startTime >= :startTime and si.endTime <= :endTime");
        hql.append(" AND ( ");
        for (int i = 0, size = apps.size(); i < size; i++) {
            ApplicationCategoryEnum app = apps.get(i);
            if (i != 0) {
                hql.append(" OR ");
            }
            hql.append(" ( si.appCategory = :appCategory").append(i);
            if (ApplicationCategoryEnum.plan.equals(app)) {
                // 他人创建且我参与的计划
                hql.append(" and si.createMember in(:userIds)");
                hql.append(" and tv.orgentId in(:currentUserId) ");
                hql.append(" and tv.authType in(:planAuthType)");
                param.put("planAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.creator.getKey(),
                        TimeViewAuthTypeEnum.tellme.getKey()));
                param.put("currentUserId", AppContext.currentUserId());
            }
            if (ApplicationCategoryEnum.taskManage.equals(app)) {
                // 他人负责且我创建或我负责或我参与的任务
                hql.append(" and tv.orgentId in(:userIds) and tv.authType = :managerType ");
                param.put("managerType", TimeViewAuthTypeEnum.onduty.getKey());
                hql.append(
                        " and EXISTS(select id from TimeViewAuth ti where tv.appId = ti.appId and ti.orgentId in(:currentUserId) and ti.authType in(:taskAuthType))");
                param.put("taskAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.creator.getKey(),
                        TimeViewAuthTypeEnum.onduty.getKey()));
                param.put("currentUserId", AppContext.currentUserId());
            }
            if (ApplicationCategoryEnum.calendar.equals(app)) {
                // 他人创建且共享给我的事件
                hql.append(" and si.createMember in(:userIds)");
                hql.append(" and tv.authType = :calendarCreaterAuthType");
                param.put("calendarCreaterAuthType", TimeViewAuthTypeEnum.creator.getKey());
                hql.append(
                        " and EXISTS(select id from TimeViewAuth ti where tv.appId = ti.appId and ti.orgentId in(:currentUserId) and ti.authType in(:calendarAuthType)) ");
                param.put("calendarAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.tellme.getKey()));
                param.put("currentUserId", AppContext.currentUserId());
            }
            if (ApplicationCategoryEnum.meeting.equals(app)) {
                // 他人回执为参加或未回执的会议
                hql.append(
                        " and (tv.orgentId in(:userIds) or tv.orgentId in(:currentUserId)) and (tv.roleType != :roleType or tv.roleType is null)");
                hql.append(" and tv.authType = :meetingAuthType");
                param.put("meetingAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.tellme.getKey()));
                param.put("currentUserId", AppContext.currentUserId());
                param.put("roleType", String.valueOf(TimeViewEnum.MeetingRoleType.impart.ordinal()));
            }
            if (ApplicationCategoryEnum.leaderagenda.equals(app)) {
                // 他人作为领导的领导行程
                hql.append(" and tv.orgentId in(:userIds)");
                hql.append(" and tv.authType = :leaderAgendaAuthType");
                param.put("leaderAgendaAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.onduty.getKey()));

                if (status.contains(TimeViewStatus.finshed) && !status.contains(TimeViewStatus.unfinshed)) { // 查已完成
                    hql.append(" and si.endTime <= :sysDate");
                    param.put("sysDate", DateUtil.currentDate());
                } else if (!status.contains(TimeViewStatus.finshed) && status.contains(TimeViewStatus.unfinshed)) { // 查未完成
                    hql.append(" and si.endTime > :sysDate");
                    param.put("sysDate", DateUtil.currentDate());
                } else {
                    // 查已完成+未完成,不做处理
                }
            }
            hql.append(")");
            param.put("appCategory" + i, app.name());
        }
        hql.append(" ) ");
        hql.append(" and si.timeViewStatus in (:appStatus)");
        List<Integer> appStatus = Lists.newArrayList();
        for (int i = 0; i < status.size(); i++) {
            appStatus.add(status.get(i).ordinal());
        }
        if (apps.contains(ApplicationCategoryEnum.leaderagenda)) {
            appStatus.addAll(TimeViewUtil.getCategroryStatus(ApplicationCategoryEnum.leaderagenda, status));
        }
        param.put("appStatus", appStatus);
        param.put("startTime", startDate);
        param.put("endTime", endDate);
        param.put("userIds", userIds);
        return DBAgent.find(hql.toString(), param);
    }

    @Override
    public List<Map<String, Object>> getConflictData(List<ApplicationCategoryEnum> apps, List<Long> memberIds,
                                                     List<Long> leaders, Date startDate, Date endDate, Long id) {
        Map<String, Object> param = new HashMap<String, Object>();
        StringBuilder hql = new StringBuilder(50);
        hql.append(
                " select new Map(si.appId as appId,si.appCategory as appCategory,si.appTitle as appTitle,si.startTime as startTime,si.endTime as endTime,tv.orgentId as orgentId,tv.roleType as roleType) from TimeViewAuth tv,TimeViewInfo si");
        hql.append(" where tv.timeViewId = si.id ");
        hql.append(" and si.startTime < :endTime and si.endTime > :startTime");
        hql.append(" AND ( ");
        for (int i = 0, size = apps.size(); i < size; i++) {
            ApplicationCategoryEnum app = apps.get(i);
            if (i != 0) {
                hql.append(" OR ");
            }
            hql.append(" ( si.appCategory = :appCategory").append(i);
            if (ApplicationCategoryEnum.calendar.equals(app)) {
                // 他人创建的或者安排给他人的事件
                hql.append(" and si.timeViewStatus in(:calendarAppStatus)");
                hql.append(" and tv.orgentId in(:createMembers)");
                hql.append(" and tv.authType in(:calendarAuthType)");
                param.put("calendarAppStatus", TimeViewStatus.unfinshed.ordinal());
                param.put("calendarAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.creator.getKey(),
                        TimeViewAuthTypeEnum.onduty.getKey()));
                List<Long> createMembers = Lists.newArrayList();
                createMembers.addAll(memberIds);
                createMembers.add(AppContext.currentUserId());
                param.put("createMembers", createMembers);
            }
            if (ApplicationCategoryEnum.meeting.equals(app)) {
                // 他人回执为参加或未回执的会议
                hql.append(" and tv.orgentId in(:userIds)");
                hql.append(" and tv.authType = :meetingAuthType");
                hql.append(" and (tv.roleType != :roleType or tv.roleType is null)");
                param.put("meetingAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.tellme.getKey()));
                param.put("roleType", String.valueOf(TimeViewEnum.MeetingRoleType.impart.ordinal()));
            }
            if (ApplicationCategoryEnum.leaderagenda.equals(app) && CollectionUtils.isNotEmpty(leaders)) {
                // 领导行程
                hql.append(" and tv.orgentId in(:leaders)");
                hql.append(" and tv.authType = :leaderagendaAuthType");
                param.put("leaderagendaAuthType", Lists.newArrayList(TimeViewAuthTypeEnum.onduty.getKey()));
                param.put("leaders", leaders);
            }
            hql.append(")");
            param.put("appCategory" + i, app.name());
        }
        hql.append(" ) ");
        hql.append(" and tv.orgentId in(:userIds)");
        if (id != null) {
            hql.append(" and si.appId != :id");
            param.put("id", id);
        }
        param.put("startTime", startDate);
        param.put("endTime", endDate);
        param.put("userIds", memberIds);
        return DBAgent.find(hql.toString(), param);
    }
}
