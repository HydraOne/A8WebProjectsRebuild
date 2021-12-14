package com.seeyon.apps.work.work03.manager.impl;

import java.math.BigDecimal;
import java.text.Normalizer.Form;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.seeyon.apps.work.utils.CtpCustomVariables;
import com.seeyon.apps.work.work03.dao.RegulatoryContractDao;
import com.seeyon.apps.work.work03.manager.RegulatoryContractManager;
import com.seeyon.apps.work.work03.pojo.RegulatoryContract;
import org.apache.commons.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;

import com.seeyon.cap4.form.api.FormApi4Cap4;
import com.seeyon.cap4.form.bean.FormBean;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.common.log.CtpLogFactory;
import com.seeyon.ctp.util.FlipInfo;

/**
 * @author wangjiahao
 * @email wangjiahao@microcental.net
 * 将获取到的查询数据返回
 */
public class RegulatoryContractManagerImpl implements RegulatoryContractManager {
	//注入Dao层
	@Autowired
	private RegulatoryContractDao regulatoryContractDao;
	// 注入cap4
	private final FormApi4Cap4 formApi4Cap4 = (FormApi4Cap4) AppContext.getBean("formApi4Cap4");
	//日志
	private static final Log log = CtpLogFactory.getLog(RegulatoryContractManagerImpl.class);

	@Override
	public ArrayList<RegulatoryContract> getFormDate(String regulatoryContract){
		//分页
		FlipInfo flipInfo = new FlipInfo();
		//设置页数
		flipInfo.setSize(Integer.parseInt(regulatoryContract));
		//创建实体类集合
		ArrayList<RegulatoryContract> regulatoryContracts = new ArrayList<>();
		//通过cap4获取合同底表
		FormBean formByFormCode;
		try {
			formByFormCode = formApi4Cap4.getFormByFormCode(CtpCustomVariables.demandConfiguration_bottomSheetOfContractFile);
			//监管合同信息
			FlipInfo info = regulatoryContractDao.querySupervisionContractInformation(flipInfo);
			List<Map<String, Object>> data = info.getData();
			for (Map<String, Object> map : data) {
				RegulatoryContract contract = new RegulatoryContract();
				contract.setAgentMan(String.valueOf(map.get(formByFormCode.getMasterTableBean().getFieldBeanByDisplay("经办人").getName())));
				contract.setAgentDept(String.valueOf(map.get(formByFormCode.getMasterTableBean().getFieldBeanByDisplay("经办部门").getName())));
				contract.setApplyDate((Date)map.get(formByFormCode.getMasterTableBean().getFieldBeanByDisplay("申请日期").getName()));
				contract.setContractNo(String.valueOf(map.get(formByFormCode.getMasterTableBean().getFieldBeanByDisplay("合同编号").getName())));
				contract.setContractName(String.valueOf(map.get(formByFormCode.getMasterTableBean().getFieldBeanByDisplay("合同名称").getName())));
				contract.setContractMoney((BigDecimal)map.get(formByFormCode.getMasterTableBean().getFieldBeanByDisplay("合同金额").getName()));
				contract.setCumulativeMoney((BigDecimal)map.get(formByFormCode.getMasterTableBean().getFieldBeanByDisplay("累计已付金额").getName()));
				contract.setSsoSignInUrl(String.valueOf(map.get(formByFormCode.getMasterTableBean().getFieldBeanByDisplay("单点登录").getName())));
				regulatoryContracts.add(contract);
			}	
		} catch (BusinessException e) {
			log.error("获取合同底表出错",e);
		}
		return regulatoryContracts;
		
	}

}
