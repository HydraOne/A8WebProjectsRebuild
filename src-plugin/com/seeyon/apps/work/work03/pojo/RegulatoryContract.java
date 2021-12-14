package com.seeyon.apps.work.work03.pojo;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author wangjiahao
 * @email wangjiahao@microcental.net
 * 监管合同实体类
 */
public class RegulatoryContract {
	//经办人
	private String agentMan;
	//经办部门
	private String agentDept;
	//申请日期
	private Date applyDate;
	//合同编号
	private String contractNo;
	//合同名称
	private String contractName;
	//合同金额
	private BigDecimal contractMoney;
	//累计已付金额
	private BigDecimal cumulativeMoney;
	//单点登录url
	private String ssoSignInUrl;
	
	
	public RegulatoryContract() {
		super();
	}
	public RegulatoryContract(String agentMan, String agentDept, Date applyDate, String contractNo,
			String contractName, BigDecimal contractMoney, BigDecimal cumulativeMoney, String ssoSignInUrl) {
		super();
		this.agentMan = agentMan;
		this.agentDept = agentDept;
		this.applyDate = applyDate;
		this.contractNo = contractNo;
		this.contractName = contractName;
		this.contractMoney = contractMoney;
		this.cumulativeMoney = cumulativeMoney;
		this.ssoSignInUrl = ssoSignInUrl;
	}
	public String getAgentMan() {
		return agentMan;
	}
	public void setAgentMan(String agentMan) {
		this.agentMan = agentMan;
	}
	public String getAgentDept() {
		return agentDept;
	}
	public void setAgentDept(String agentDept) {
		this.agentDept = agentDept;
	}
	public Date getApplyDate() {
		return applyDate;
	}
	public void setApplyDate(Date applyDate) {
		this.applyDate = applyDate;
	}
	public String getContractNo() {
		return contractNo;
	}
	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
	}
	public String getContractName() {
		return contractName;
	}
	public void setContractName(String contractName) {
		this.contractName = contractName;
	}
	public BigDecimal getContractMoney() {
		return contractMoney;
	}
	public void setContractMoney(BigDecimal contractMoney) {
		this.contractMoney = contractMoney;
	}
	public BigDecimal getCumulativeMoney() {
		return cumulativeMoney;
	}
	public void setCumulativeMoney(BigDecimal cumulativeMoney) {
		this.cumulativeMoney = cumulativeMoney;
	}
	public String getSsoSignInUrl() {
		return ssoSignInUrl;
	}
	public void setSsoSignInUrl(String ssoSignInUrl) {
		this.ssoSignInUrl = ssoSignInUrl;
	}
	

}
