package com.seeyon.apps.work.document.po;


import java.util.Date;

public class Reference {
    private Long referenceId;
    private String type;
    private String fileName;
    private Date createDate;

    public Long getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(Long referenceId) {
        this.referenceId = referenceId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Reference(Long referenceId, String type, String fileName, Date createDate) {
        this.referenceId = referenceId;
        this.type = type;
        this.fileName = fileName;
        this.createDate = createDate;
    }
}
