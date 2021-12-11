package com.seeyon.apps.work.work02.manager;

import com.seeyon.apps.collaboration.event.CollaborationFinishEvent;
import com.seeyon.apps.collaboration.event.CollaborationStartEvent;
import com.seeyon.apps.collaboration.po.ColSummary;
import com.seeyon.apps.timeview.po.TimeViewAuth;
import com.seeyon.apps.timeview.po.TimeViewInfo;
import com.seeyon.apps.work.utils.CtpCustomVariables;
import com.seeyon.apps.work.work01.dao.ContractManagementMapper;
import com.seeyon.apps.work.work01.manager.ContractFormListener;
import com.seeyon.apps.work.work02.dao.FormTimeViewMapper;
import com.seeyon.cap4.form.bean.FormBean;
import com.seeyon.cap4.form.bean.FormTableBean;
import com.seeyon.cap4.form.service.CAP4FormManager;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.organization.manager.OrgManager;
import com.seeyon.ctp.util.annotation.ListenEvent;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import www.seeyon.com.utils.UUIDUtil;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @data 2021/9/26 - 16:12
 * @Description 合同流程结束的事件监听，监听合同档案登记表单，获取申请日期
 */
public class EndOfContractProcessMonitoring {

    //日志
    protected static Logger LOGGER = Logger.getLogger(EndOfContractProcessMonitoring.class);

    //注入dao层
    @Autowired
    private FormTimeViewMapper formTimeViewMapper;

    //注入orgManager
    @Autowired
    private OrgManager orgManager;

    @Autowired
    private ContractManagementMapper contractManagementMapper;

    private final CAP4FormManager cap4FormManager = (CAP4FormManager) AppContext.getBean("cap4FormManager");

    //监听合同档案管理开始事件，同步执行
    @ListenEvent(event = CollaborationStartEvent.class,async = true)
    //协同结束立刻执行，异步模式，监听代码出现异常不影响协同发起，但如果协同发起自身事务回滚，监听代码仍然会执行
    public void addEventView(CollaborationStartEvent event){
        //获取summary对象
        ColSummary summary = event.getSummary();
        HashMap<Integer, String> map = new HashMap<>();
        //获取表单模板id
        Long formAppid = summary.getFormAppid();
        //获取具体该条数据的id
        Long formRecordId = summary.getFormRecordid();
        //通过表单模板id取到具体的表单记录
        FormBean form = cap4FormManager.getForm(formAppid);
//      获取从表

        if (form!=null) {
            //拿到主表
            FormTableBean masterTableBean = form.getMasterTableBean();

            if (masterTableBean!=null) {
                try {
                    if (!masterTableBean.
                            getTableName().
                            equals(cap4FormManager.
                                    getFormByFormCode(CtpCustomVariables.demandConfiguration_contractFileFlowChart).
                                    getMasterTableBean().
                                    getTableName())) {
                        return;
                    }
                } catch (BusinessException e) {
                    LOGGER.error(e);
                }
                //从数据库获取数据
                Map resultMap = contractManagementMapper.selectTableDetailsByTableNameAndFormRecordId(masterTableBean.getTableName(), formRecordId);
                //取一个uuid
                long uuidLong = UUIDUtil.getUUIDLong();
                //时间视图表
                TimeViewInfo timeViewInfo = new TimeViewInfo();
                timeViewInfo.setId(uuidLong);
                timeViewInfo.setAppId(summary.getId());
                timeViewInfo.setAppTitle(summary.getSubject());
                timeViewInfo.setAppCategory("payment");
//
                timeViewInfo.setStartTime((Date) resultMap.get(masterTableBean.getFieldBeanByDisplay("申请日期").getName()));
                timeViewInfo.setEndTime(new Date());
                final HashMap<Object, Object> objectHashMap = new HashMap<>();
                timeViewInfo.setCreateMember(Long.valueOf(
                        String.valueOf(resultMap.get(masterTableBean.getFieldBeanByDisplay("经办人").getName()))));
                timeViewInfo.setCreateTime(new Date());
                timeViewInfo.setUpdateMember(Long.valueOf(
                        String.valueOf(resultMap.get(masterTableBean.getFieldBeanByDisplay("经办人").getName()))));
                timeViewInfo.setUpdateTime(new Date());
                //设置单位id
                Long orgAccountId = orgManager.getGroupAdmin().getOrgAccountId();
                timeViewInfo.setAccountId(orgAccountId);
                timeViewInfo.setAppStatus(3);
                timeViewInfo.setProjectId(-1L);
                timeViewInfo.setRemindTime(0L);
                timeViewInfo.setTimeViewStatus(0);
                formTimeViewMapper.addTimeViewInfo(timeViewInfo);
                TimeViewAuth timeViewAuth = new TimeViewAuth();
                timeViewAuth.setNewId();
                timeViewAuth.setAppId(summary.getId());
                timeViewAuth.setTimeViewId(uuidLong);
                timeViewAuth.setOrgentId(summary.getStartMemberId());
                timeViewAuth.setOrgentType(3);
                timeViewAuth.setAuthType(0);
                timeViewAuth.setRoleType("0");
                formTimeViewMapper.addTimeViewAuth(timeViewAuth);
            }
        }
    }
}