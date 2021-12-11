package com.seeyon.apps.work.work01.manager;

import com.alibaba.fastjson.JSONObject;
import com.seeyon.apps.collaboration.event.CollaborationFinishEvent;
import com.seeyon.apps.collaboration.po.ColSummary;
import com.seeyon.apps.work.utils.CtpCustomVariables;
import com.seeyon.apps.work.utils.RestHttpUtils;
import com.seeyon.apps.work.work01.dao.ContractManagementMapper;
import com.seeyon.cap4.form.api.FormApi4Cap4;
import com.seeyon.cap4.form.bean.FormBean;
import com.seeyon.cap4.form.bean.FormTableBean;
import com.seeyon.cap4.form.service.CAP4FormManager;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.util.annotation.ListenEvent;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * 
 * @author CestutntQAQ
 * 合同前订后监管系统监听
 *
 */
public class ContractFormListener {

	//日志
	protected static Logger logger = Logger.getLogger(ContractFormListener.class);

	//注入dao层
	@Autowired
	private ContractManagementMapper contractManagementMapper;
	
	//注入表单管理对象
	@Autowired
	private FormApi4Cap4 cap4FormManager = (FormApi4Cap4) AppContext.getBean("formApi4Cap4");
	
	
	//监听协作结束时的事件
	@ListenEvent(event = CollaborationFinishEvent.class,async = true)
	public void eventEndMonitoring(CollaborationFinishEvent event) {
		//获取summary对象
		HashMap<Integer, Integer> map = new HashMap();
		ColSummary summary = event.getSummary();
		//获取表单模板id
		Long formAppid = summary.getFormAppid();
		//获取具体该条数据的id
		Long formRecordid = summary.getFormRecordid();
		//通过表单模板id渠道具体的表单记录
		FormBean form = cap4FormManager.getForm(formAppid);
		//初始化tableBean
		FormTableBean masterTableBean = null;
		//非空判断
		if (form != null) {
			//拿到主表
			masterTableBean = form.getMasterTableBean();
		}
		//初始化表名
		String tableName =null;
		//判断非空
		if (masterTableBean !=null) {
			//拿到表名
			tableName= masterTableBean.getTableName();
			//判断是否为合同流程表单
			try {
				//从本地配置中获取流程合同模板id
				String formTemplateId = CtpCustomVariables.demandConfiguration_contractFileFlowChart;
				String currentFormName = cap4FormManager.getFormByFormCode(formTemplateId).getMasterTableBean().getTableName();
				if (!tableName.equals(currentFormName)) {
					return;
				}
			} catch (BusinessException e) {
				logger.error("表单数据异常",e);
			}
		}
		//数据库查表名和id
		Map resultMap = contractManagementMapper.selectTableDetailsByTableNameAndFormRecordId(tableName, formRecordid);
		//得到表单内容进行封装
		HashMap<String, Object> dateMap = new HashMap<>();
		assert masterTableBean != null;
		dateMap.put("合同名称", resultMap.get(masterTableBean.getFieldBeanByDisplay("合同名称").getName()));
		dateMap.put("经办人", resultMap.get(masterTableBean.getFieldBeanByDisplay("经办人").getName()));
		dateMap.put("经办部门", resultMap.get(masterTableBean.getFieldBeanByDisplay("经办部门").getName()));
		dateMap.put("申请日期", resultMap.get(masterTableBean.getFieldBeanByDisplay("申请日期").getName()));
		dateMap.put("合同编号", resultMap.get(masterTableBean.getFieldBeanByDisplay("合同编号").getName()));
		dateMap.put("合同名称", resultMap.get(masterTableBean.getFieldBeanByDisplay("合同名称").getName()));
		dateMap.put("合同金额", resultMap.get(masterTableBean.getFieldBeanByDisplay("合同金额").getName()));
		dateMap.put("累计已付金额", resultMap.get(masterTableBean.getFieldBeanByDisplay("累计已付金额").getName()));
		//单点登录连接
		dateMap.put("单点登录",CtpCustomVariables.demandConfiguration_signInUrl+"?method=signIn&LoginId="+resultMap.get(masterTableBean.getFieldBeanByDisplay("经办人").getName()));
//		http://localhost:80/seeyon/SignInController.do?method=signIn&LoginId=2698108388093480400
		//配置文件获取设置好的tokenUrl
		String getUrl = CtpCustomVariables.demandConfiguration_getTokenUrl;
		getUrl += "/" + CtpCustomVariables.demandConfiguration_restAccount + "/" + CtpCustomVariables.demandConfiguration_restPassword;
		//使用原有已配置的rest接口获取tokenJson
		String tokenJson = RestHttpUtils.sendGetRequest(getUrl, "");
		//获取到的rest接口数据是一个string类型的map集合 所以将string数据类型转换为map类型
		Map<String,Object> jsonMap = JSONObject.parseObject(tokenJson);
		//把查询到的dateMap封装为json格式
		String jsonFormatData = JSONObject.toJSONString(dateMap);
		//获取到token
		String tokenString = (String) jsonMap.get("id");
		//调用rest接口带token
		String postUrl = CtpCustomVariables.demandConfiguration_nativePostRestUrl;
		postUrl += "?token="+tokenString;
		//发送post请求
		RestHttpUtils.sendPostRequest(postUrl,jsonFormatData);
	}
}