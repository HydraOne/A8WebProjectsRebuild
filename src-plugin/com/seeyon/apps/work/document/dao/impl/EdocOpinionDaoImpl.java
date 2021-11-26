package com.seeyon.apps.work.document.dao.impl;

import com.seeyon.apps.work.document.dao.EdocOpinionDao;
import com.seeyon.ctp.util.FlipInfo;
import com.seeyon.ctp.util.JDBCAgent;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.List;
import java.util.Map;

/**
 * 查询公文意见 也可修改意见
 */
public class EdocOpinionDaoImpl implements EdocOpinionDao {

    private static final Log log = LogFactory.getLog(EdocOpinionDaoImpl.class);
    
	//条件查询意见列表
	public List<Map<String,Object>> findOpinionListByUserId(String sql,Map map ,FlipInfo fi){
    	JDBCAgent jdbc = new JDBCAgent();
    	try {
			fi = jdbc.findNameByPaging(sql, map, fi);
		} catch (Exception e) {
			log.info("查询意见列表出现异常-",e);
		}finally {
			jdbc.close();//error
		}

    	log.info("打印出的sql------"+sql);
    	List<Map<String,Object>> data = fi.getData();
    	return data;
    }

	 //修改意见
	 public void update(Long opinionId, String opinionContent) {
		 String sql = "update ctp_comment_all set content = '" + opinionContent + "' where id = " + opinionId;
		 JDBCAgent jdbcAgent = null ;
		 try {
			 jdbcAgent = new JDBCAgent(false,false);
			jdbcAgent.execute(sql);
		} catch (Exception e) {
			log.error("修改意见sql出错了"+e);
		}finally {
		 	jdbcAgent.close();
		 }
	 }
}
