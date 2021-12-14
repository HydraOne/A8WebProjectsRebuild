package com.seeyon.apps.work.work05.dao.impl;

import com.seeyon.apps.work.utils.CtpCustomVariables;
import com.seeyon.apps.work.work05.dao.PaymentStatusDao;
import com.seeyon.apps.work.work05.dao.TimerDao;
import com.seeyon.cap4.form.api.FormApi4Cap4;
import com.seeyon.cap4.form.bean.FormTableBean;
import com.seeyon.cap4.form.service.CAP4FormManager;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.common.log.CtpLogFactory;
import com.seeyon.ctp.util.JDBCAgent;
import org.apache.commons.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * @author wangjiahao
 * @email wangjiahao@microcental.net
 * 定时器
 */
public class TimerDaoImpl implements TimerDao {
    //日志
    private static final Log log = CtpLogFactory.getLog(TimerDaoImpl.class);
    //表单管理对象
    private FormApi4Cap4 formApi4Cap4 = (FormApi4Cap4) AppContext.getBean("formApi4Cap4");

    @Autowired
    private PaymentStatusDao paymentStatusDaoImpl;

    @Override
    public List getPaymentPlanCurrentDate() {
        //返回明细表结果集合
        List resultList = null;
        //返回主表结果集合
        List res = null;
        //获取明细表的付款时间是今天的集合，只要集合有值，就需要拿主表信息去提醒
        List<FormTableBean> subTableBean = null;
        try {
            //此处获取的是子表javabean对象
            subTableBean = formApi4Cap4.getFormByFormCode(CtpCustomVariables.demandConfiguration_contractFileFlowChart).getSubTableBean();
        } catch (BusinessException e) {
            log.error("获取子表异常", e);
        }
        //取到数据库与当前日相同数据，使用DATE()获取时间中日期部分，得到每日时间条件下的数据
        assert subTableBean != null;
        FormTableBean tableBean = subTableBean.get(0);
        //获取域对象并得到名字
        String dateName = tableBean.getFieldBeanByDisplay("预订合同-付款日期").getName();
        String amounts = tableBean.getFieldBeanByDisplay("预订合同-付款金额").getName();
        String paymentStatusName = tableBean.getFieldBeanByDisplay("付款状态").getName();
        Long unPaymentEnumId = paymentStatusDaoImpl.getEnumIdByName("未支付");
        //获取表单名字
        String tableName = tableBean.getTableName();
        StringBuilder sql = new StringBuilder("SELECT formmain_id,").append(amounts).
                append(" FROM ").append(tableName).append(" WHERE DATE(").
                append(dateName).append(") = DATE(NOW()) AND ")
                .append(paymentStatusName).append("=").append(unPaymentEnumId);
        try (JDBCAgent jdbcAgent = new JDBCAgent()) {
            jdbcAgent.execute(sql.toString());
            //得到明细表每行数据  合同档案主表 需支付金额
            resultList = jdbcAgent.resultSetToList();
        } catch (BusinessException | SQLException e) {
            log.error("查询当日表单错误", e);
        }
        if (resultList == null || resultList.size() == 0) {
            log.info("暂时无付款计划");
            return null;
        }
        //获取合同id关联当日应付金额
        Map<Long, BigDecimal> idRelAmountsMap = new HashMap<>();
        for (Object item : resultList) {
            Map map = (Map) item;
            Long key = (Long) map.get("formmain_id");
            if (idRelAmountsMap.containsKey(key)) {
                BigDecimal oriSumAmount = idRelAmountsMap.get(key);
                BigDecimal rowAmount = (BigDecimal) map.get(key);
                BigDecimal sum = oriSumAmount.add(rowAmount);
                idRelAmountsMap.replace(key, sum);
            } else {
                idRelAmountsMap.put(key, (BigDecimal) map.get(amounts));
            }
        }
        //拼接出当日有付款计划的合同 id 编号 在用 in 关键字 再去主表获得合同编号 名字信息
        StringBuilder stringBuilder = new StringBuilder();
        for (Long mainId : idRelAmountsMap.keySet()) {
            stringBuilder.append("'");
            stringBuilder.append(mainId);
            stringBuilder.append("',");
        }
        int len = stringBuilder.length();
        stringBuilder.deleteCharAt(len - 1);
        FormTableBean masterTableBean = null;
        try {
            masterTableBean = formApi4Cap4.getFormByFormCode(CtpCustomVariables.demandConfiguration_contractFileFlowChart).getMasterTableBean();
        } catch (BusinessException e) {
            log.error("获取主表异常", e);
        }
        FormTableBean bottomTable = null;
        try {
            bottomTable = formApi4Cap4.getFormByFormCode(CtpCustomVariables.demandConfiguration_bottomSheetOfContractFile).getMasterTableBean();
        } catch (BusinessException e) {
            log.error("未能找到表信息", e);
        }
        if (resultList != null && resultList.size() > 0) {
            StringBuffer ids = new StringBuffer("(").append(stringBuilder.toString()).append(")");
            StringBuffer flowTableContractNumColName = new StringBuffer(masterTableBean.getTableName()).append(".").append(masterTableBean.getFieldBeanByDisplay("合同编号").getName());
            String bottomTableContractNumColName = bottomTable.getTableName() + "." + bottomTable.getFieldBeanByDisplay("合同编号").getName();
            StringBuffer sql2 = new StringBuffer("SELECT ").append(masterTableBean.getTableName()).append(".* FROM ").append(masterTableBean.getTableName()).append(
                    " right join ").append(bottomTable.getTableName()).append(" on ").append(
                    flowTableContractNumColName).append("=").append(bottomTableContractNumColName).append(" WHERE ").append(masterTableBean.getTableName()).append(".ID in ").append(ids);
            try (JDBCAgent jdbcAgent = new JDBCAgent(false, false)) {
                jdbcAgent.execute(sql.toString());
                res = jdbcAgent.resultSetToList();
            } catch (BusinessException | SQLException e) {
                if (e instanceof BusinessException) {
                    log.error("获取数据异常", e);
                } else {
                    log.error("执行SQL语句错误", e);
                }
            }
        }
        LinkedList<Map<Object, Object>> result = new LinkedList<>();
        for (Object obj : res) {
            Map map = new HashMap();
            map.put("合同名称", ((Map) obj).get(masterTableBean.getFieldBeanByDisplay("合同名称").getName()));
            map.put("合同编号", ((Map) obj).get(masterTableBean.getFieldBeanByDisplay("合同编号").getName()));
            Long mainId = (Long) ((Map) obj).get("id");
            map.put("合同金额", idRelAmountsMap.get(mainId));
            result.add(map);
        }
        return result;
    }
}