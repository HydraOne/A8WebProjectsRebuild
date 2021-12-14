package com.seeyon.apps.work.document.bo;

import com.seeyon.v3x.common.domain.BaseModel;

import java.io.Serializable;
import java.util.Comparator;
import java.util.Date;

/**
 * @author wangjiahao
 * @email  wangjiahao@microcental.net
 * 意见bo
 */
public class OpinionBO extends BaseModel implements Serializable, Comparator<OpinionBO> {

	private String docMark;
	private String subject;
	private String createPerson;
	private String check;
	private String opinion;
	private Long orgId;
	private Integer opinionType;
	private Date createTime;

	public OpinionBO() {
		super();
	}

	public OpinionBO(String docMark, String subject, String createPerson, String check,
                     String opinion, Long orgId, Integer opinionType, Date createTime) {
		super();
		this.docMark = docMark;
		this.subject = subject;
		this.createPerson = createPerson;
		this.check = check;
		this.opinion = opinion;
		this.orgId = orgId;
		this.opinionType = opinionType;
		this.createTime = createTime;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Integer getOpinionType() {
		return opinionType;
	}

	public void setOpinionType(Integer opinionType) {
		this.opinionType = opinionType;
	}

	public String getDocMark() {
		return docMark;
	}

	public void setDocMark(String docMark) {
		this.docMark = docMark;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getCreatePerson() {
		return createPerson;
	}

	public void setCreatePerson(String createPerson) {
		this.createPerson = createPerson;
	}

	public String getCheck() {
		return check;
	}

	public void setCheck(String check) {
		this.check = check;
	}

	public String getOpinion() {
		return opinion;
	}

	public void setOpinion(String opinion) {
		this.opinion = opinion;
	}

	public Long getOrgId() {
		return orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}

	@Override
	public int compare(OpinionBO o1, OpinionBO o2) {
		return 0;
	}

}