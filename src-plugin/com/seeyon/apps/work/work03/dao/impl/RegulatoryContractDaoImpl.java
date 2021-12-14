package com.seeyon.apps.work.work03.dao.impl;

import com.seeyon.apps.work.utils.CtpCustomVariables;
import com.seeyon.apps.work.work03.controller.RegulatoryContractController;
import com.seeyon.apps.work.work03.dao.RegulatoryContractDao;
import org.apache.commons.logging.Log;

import com.seeyon.cap4.form.api.FormApi4Cap4;
import com.seeyon.cap4.form.bean.FormBean;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.common.log.CtpLogFactory;
import com.seeyon.ctp.util.FlipInfo;
import com.seeyon.ctp.util.JDBCAgent;

/**
 * @author wangjiahao
 * @email wangjiahao@microcental.net
 * 查询栏目数据
 */
public class RegulatoryContractDaoImpl implements RegulatoryContractDao {
	// 注入cap4
	private final FormApi4Cap4 formApi4Cap4 = (FormApi4Cap4) AppContext.getBean("formApi4Cap4");
	// 日志
	private static final Log LOG = CtpLogFactory.getLog(RegulatoryContractController.class);
	
	@Override
	public FlipInfo querySupervisionContractInformation(FlipInfo flipInfo) {
		FormBean formByFormCode = null;
		String sql = "";
		JDBCAgent agent=null;
		FlipInfo byPaging=null;
		try {
			//通过cap4获取合同底表
			formByFormCode = formApi4Cap4.getFormByFormCode(CtpCustomVariables.demandConfiguration_bottomSheetOfContractFile);
			sql = "select m.`NAME` AS "+formByFormCode.getMasterTableBean().getFieldBeanByDisplay("经办人").getName()+
					", u.`NAME` AS "+formByFormCode.getMasterTableBean().getFieldBeanByDisplay("经办部门").getName()+
					", con."+formByFormCode.getMasterTableBean().getFieldBeanByDisplay("申请日期").getName()+" , "
					+ "con."+formByFormCode.getMasterTableBean().getFieldBeanByDisplay("合同编号").getName()+
					", con."+formByFormCode.getMasterTableBean().getFieldBeanByDisplay("合同名称").getName()+
					", con."+formByFormCode.getMasterTableBean().getFieldBeanByDisplay("合同金额").getName()+
					", con."+formByFormCode.getMasterTableBean().getFieldBeanByDisplay("累计已付金额").getName()+
					", con."+formByFormCode.getMasterTableBean().getFieldBeanByDisplay("单点登录").getName()+" from "+
					formByFormCode.getMasterTableBean().getTableName()
					+" AS con , org_member AS m , org_unit AS u where con."+formByFormCode.getMasterTableBean().getFieldBeanByDisplay("经办人").getName()+
					" = m.ID AND con."+formByFormCode.getMasterTableBean().getFieldBeanByDisplay("经办部门").getName()+" = u.ID";
			//创建jdbc对象
			agent = new JDBCAgent(false,false);
			byPaging = agent.findByPaging(sql, flipInfo);
		} catch (Exception e) {
			LOG.error("查询合同底表信息出错",e);
		}finally {
			agent.close();
		}
		if(byPaging!=null){
			return byPaging;
		}else{
			return null;
		}

	}

}
