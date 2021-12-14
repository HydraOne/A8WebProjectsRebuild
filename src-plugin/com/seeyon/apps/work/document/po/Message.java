package com.seeyon.apps.work.document.po;



public class Message {
    private Long id;
    private String fileName;
    private String fileNum;
    private String fileType;

    public Message(Long id, String fileName, String fileNum, String fileType) {
        this.id = id;
        this.fileName = fileName;
        this.fileNum = fileNum;
        this.fileType = fileType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileNum() {
        return fileNum;
    }

    public void setFileNum(String fileNum) {
        this.fileNum = fileNum;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }


    @Override
    public Message clone() {
        try {
            Message clone = (Message) super.clone();
            // TODO: copy mutable state here, so the clone can't change the internals of the original
            return clone;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }
}
