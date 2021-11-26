package com.seeyon.apps.work.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class JDBCUtil {
//    private static final Log log = CtpLogFactory.getLog(FtpManager.class);

    public void insert(String sql) {
        //连接第三方数据库
        String URL = "jdbc:mysql://localhost:3306/doc_data?serverTimezone=UTC&characterEncoding=utf-8&useSSL=false";
        String USER = "root";
        String PASSWORD = "970106";

        Connection conn = null;
        Statement st = null;
        try {
            //1.加载驱动程序
            Class.forName("com.mysql.jdbc.Driver");
            //2.获得数据库链接
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
            //3.通过数据库的连接操作数据库，实现增删改查（使用Statement类）
            st = conn.createStatement();
            st.execute(sql);
        } catch (Exception e2) {
//            log.error("数据库连接、操作错误", e2);
        } finally {
            try {
                assert st != null;
                st.close();
                conn.close();
            } catch (Exception e3) {
//                log.error("关闭资源错误", e3);
            }
        }
    }

}
