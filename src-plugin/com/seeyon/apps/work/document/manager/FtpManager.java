package com.seeyon.apps.work.document.manager;

import com.seeyon.apps.work.document.dao.FtpDao;
import com.seeyon.apps.work.document.dao.QuartzDao;
import com.seeyon.apps.work.utils.FtpUtil;
import com.seeyon.apps.work.utils.JDBCUtil;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.log.CtpLogFactory;
import com.seeyon.ctp.common.usermessage.UserMessageManager;
import org.apache.catalina.core.ApplicationContext;
import org.apache.commons.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import com.seeyon.ctp.common.constants.ApplicationCategoryEnum;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.common.filemanager.manager.FileManager;
import com.seeyon.ctp.common.usermessage.MessageContent;
import com.seeyon.ctp.common.usermessage.MessageReceiver;

import www.seeyon.com.utils.UUIDUtil;

/**
 * @author Ch1stuntQAQ
 * @data 2021/10/8 - 16:18
 * FTP上传文件写入第三方数据库数据
 */
public class FtpManager {
    private static final Log log = CtpLogFactory.getLog(FtpManager.class);
    @Autowired
    private QuartzDao quartzDao;
    @Autowired
    private FtpDao ftpDao;
    private final UserMessageManager userMessageManager = (UserMessageManager) AppContext.getBean("userMessageManager");
    private final FileManager fileManager = (FileManager) AppContext.getBean("fileManager");
    //公文归档对接，定时任务，每5分钟扫描一次公文表，若complete_time不为空，则表示该流程结束
    //将正文、附件，上传到FTP文件夹中；
    //将提取公文元素（文件名称、发文字号、文件类型）和正文、附件的信息（名称、创建时间）保存到中间库中；
    //完成后发送系统消息"（公文名称）公文已归档"给当前登录人。
    public void official(){
        //1.进行扫描
        List resultList = quartzDao.findOfficialDocument();
        if (resultList.size() != 0) {
            String localPath = "";

            //2.2上传至ftp服务器文件夹
            String ip = AppContext.getSystemProperty("demandConfiguration.ftpIP");
            int port = 21;
            String userName = AppContext.getSystemProperty("demandConfiguration.ftpAccount");
            String passWord = AppContext.getSystemProperty("demandConfiguration.ftpPassWrod");
            String remotePath = "/";//上传文件保存目录


            //3.保存公文元素到中间库

            //循环遍历每一条数据，进行接下来的操作
            for (int i = 0; i < resultList.size(); i++) {
                Map map = (Map) resultList.get(i);
                Object edocId = map.get("id");

                //3拿到公文元素
                String subject = (String) map.get("subject");//标题
                String docMark = (String) map.get("doc_mark");//发文字号
                String doc_type = String.valueOf(map.get("doc_type"));//文件类型
                long uuid = UUIDUtil.getUUIDLong();
                //保存公文基本数据            公文标题             发文字号             文件类型
                String sql = "INSERT INTO message (id,file_name,file_num,file_type)"
                        + " VALUES ('" + uuid + "','" + subject + "','" + docMark + "','" + doc_type + "')";
                JDBCUtil jdbcUtil = new JDBCUtil();
                jdbcUtil.insert(sql);//error

                //2.上传ftp文件夹
                //2.1拿到正文及附件文件
                try {
                    //正文
                    //用edocId->moduleId查出ctp_content_all表数据，得到content
                    Map findCtpContentAll = ftpDao.findCtpContentAll(String.valueOf(edocId));
                    String content = (String) findCtpContentAll.get("content");
                    //用content在ctp_file表查出file
                    File file = fileManager.getFile(Long.valueOf(content));
                    String path = file.getPath();//得到正文路径
                    localPath = path;
                    FileInputStream in = new FileInputStream(new File(localPath));
                    //上传至正文ftp
                    FtpUtil.uploadFile(ip, port, userName, passWord, remotePath, content, in);

                    //插入第三方数据库
                    Date zwdate = (Date) findCtpContentAll.get("create_date");
                    // 正文  正文fileName    正文创建时间
                    String sqlOne = "INSERT INTO reference (reference_id,type,file_name,create_date)"
                            + " VALUES ('" + uuid + "','mainBody','" + content + "','" + zwdate + "')";
                    JDBCUtil jdbcUtilOne = new JDBCUtil();
                    jdbcUtilOne.insert(sqlOne);//error


                    //附件
                    //用edocId->att_reference查出ctp_attachment表数据，得到file_url
                    List findCtpAttAll = ftpDao.findCtpAttAll(String.valueOf(edocId));
                    for (int j = 0; j < findCtpAttAll.size(); j++) {
                        Map attachment = (Map) findCtpAttAll.get(j);
                        String fileUrl = String.valueOf(attachment.get("file_url"));
                        String fileName1 = String.valueOf(attachment.get("filename"));
                        String fileName = String.valueOf(uuid);
                        InputStream fileInputStream = fileManager.getFileInputStream(Long.valueOf(fileUrl));
                        //上传附件至ftp
                        FtpUtil.uploadFile(ip, port, userName, passWord, remotePath, fileName, fileInputStream);
                        //插入第三方数据库
                        Date fjdate = (Date) findCtpContentAll.get("create_date");
                        String sqlTwo = "INSERT INTO reference (reference_id,type,file_name,create_date)"
                                + " VALUES ('" + uuid + "','fujian','" + fileName1 + "','" + fjdate + "')";
                        JDBCUtil jdbcUtilTwo = new JDBCUtil();
                        jdbcUtilTwo.insert(sqlTwo);//error
                    }
                } catch (Exception e) {
                    log.error("文件获取错误", e);
                }

                //4.发送系统消息提醒
                /**系统消息start-*/
                String content = "（" + subject + "）公文已归档";
                MessageContent sendContent = new MessageContent(content, null, new Object[]{});//消息体
                Long sender = -7626391470225079280L;//发送者ID
                MessageReceiver receiver = new MessageReceiver(null, -7626391470225079280L, "message.link.url", "");//接收者
                try {
                    //messageCategroy 消息所属应用分类 .exSign模板
                    userMessageManager.sendSystemMessage(sendContent, ApplicationCategoryEnum.exSign, sender, receiver);
                } catch (Exception e4) {
                    log.error("系统消息发送错误", e4);
                }
                /**系统消息end*/
            }
        }
    }

    //启动定时器
    public void init() {
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                try {
                    official();
                } catch (Exception e) {
                    log.error("定时任务启动失败" + e);
                }
            }
//		}, 1000, 1000*60*5);
        }, 1000, 1000 *60);

    }


}
