package com.seeyon.apps.work.work05.dao.impl;

import com.seeyon.apps.work.utils.CtpCustomVariables;
import com.seeyon.apps.work.work05.dao.TimerDao;
import com.seeyon.cap4.form.bean.FormTableBean;
import com.seeyon.cap4.form.service.CAP4FormManager;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.common.log.CtpLogFactory;
import com.seeyon.ctp.util.JDBCAgent;
import org.apache.commons.logging.Log;
import org.json.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * @author Ch1stuntQAQ
 * @data 2021/9/29 - 10:50
 *      
 */
public class TimerDaoImpl implements TimerDao {
    //日志
    private static final Log log = CtpLogFactory.getLog(TimerDaoImpl.class);
    //表单管理对象
    @Autowired
    private CAP4FormManager cap4FormManager;
    @Override
    public List getDate() {
        //返回明细表结果集合
        List resultList = null;
        //返回主表结果集合
        List res = null ;
        //获取明细表的付款时间是今天的集合，只要集合有值，就需要拿主表信息去提醒
        List<FormTableBean> subTableBean = null;
        try {
            //此处获取的是子表javabean对象
            subTableBean = cap4FormManager.getFormByFormCode(CtpCustomVariables.demandConfiguration_contractFileFlowChart).getSubTableBean();
        } catch (BusinessException e) {
            log.error(e);
        }
        //取到数据库与当前日相同数据，使用DATE()获取时间中日期部分，得到每日时间条件下的数据
        assert subTableBean != null;
        FormTableBean tableBean = subTableBean.get(0);
        //获取域对象并得到名字
        String dateName = tableBean.getFieldBeanByDisplay("预订合同-付款日期").getName();
        //获取表单名字
        String tableName = tableBean.getTableName();
        String sql = "SELECT * FROM " + tableName + " WHERE DATE("+dateName+") = DATE(NOW())";
        JDBCAgent jdbcAgent = new JDBCAgent(false, false);
        try {
            jdbcAgent.execute(sql);
            resultList =jdbcAgent.resultSetToList();
        } catch (BusinessException | SQLException e) {
            log.error("查询当日表单错误",e);
        }finally {
            jdbcAgent.close();
        }
        if (resultList!=null && resultList.size()>0) {
            int size = resultList.size(),i=0;
            StringBuilder stringBuilder = new StringBuilder();
            for (Object o : resultList) {
                i++;
                Map map = (Map) o;
                String formmainId =String.valueOf(map.get("formmain_id"));
                stringBuilder.append("'");
                stringBuilder.append(formmainId);
                stringBuilder.append("'");
                if (i<size){
                    stringBuilder.append(",");
                }
            }
            String ids = "(" + stringBuilder.toString() + ")";
            FormTableBean masterTableBean = null;
            try {
                masterTableBean = cap4FormManager.getFormByFormCode(CtpCustomVariables.demandConfiguration_contractFileFlowChart).getMasterTableBean();
            } catch (BusinessException e) {
                log.error(e);
            }
            String sql2 = "SELECT * FROM " + masterTableBean.getTableName() + " WHERE ID in "+ids ;
            JDBCAgent jdbcAgent2 = new JDBCAgent(false, false);
            try {
                jdbcAgent2.execute(sql2);
                res = jdbcAgent2.resultSetToList();
            } catch (BusinessException | SQLException e) {
                log.error(e);
            }finally {
                jdbcAgent2.close();
            }
        }
        return res;
    }
}
