package com.seeyon.apps.work.work03.dao.impl;

import com.seeyon.apps.work.utils.CtpCustomVariables;
import com.seeyon.apps.work.work01.manager.ContractFormListener;
import com.seeyon.apps.work.work03.dao.ContractSupervisionColumnMapper;
import com.seeyon.cap4.form.bean.FormBean;
import com.seeyon.cap4.form.service.CAP4FormManager;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.util.FlipInfo;
import com.seeyon.ctp.util.JDBCAgent;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.SQLException;

/**
 * @author Ch1stuntQAQ
 * @data 2021/9/28 - 9:34
 */
public class ContractSupervisionColumnMapperImpl implements ContractSupervisionColumnMapper {
    @Autowired
    private CAP4FormManager cap4FormManager;
    //日志
    protected static Logger LOGGER = Logger.getLogger(ContractFormListener.class);
    @Override
    public FlipInfo querySupervisionContractInformation(FlipInfo flipInfo) {
        FormBean formByFormCode = null;
        String sql="";
        FlipInfo byPaging = null;
        JDBCAgent jdbcAgent = null;
        //通过CAP4拿到合同底表
        try {
            formByFormCode = cap4FormManager.getFormByFormCode(CtpCustomVariables.demandConfiguration_bottomSheetOfContractFile);
            
            sql = "select m.`NAME` AS field0001, " +
                    "u.`NAME` AS field0002," +
                    "contractName.field0003 ," +
                    "contractName.field0004," +
                    "contractName.field0005," +
                    "contractName.field0006," +
                    "contractName.field0033," +
                    "contractName.field0036 from "+
                    formByFormCode.getMasterTableBean().getTableName() +
                    " AS contractName " +
                    " , org_member AS m " +
                    " , org_unit AS u "+
                    " where " +
                    " contractName.field0001 = m.ID " +
                    "AND " +
                    "contractName.field0002 = u.ID  ";
            //创建jdbc对象
            jdbcAgent = new JDBCAgent();
            byPaging = jdbcAgent.findByPaging(sql, flipInfo);
        } catch (Exception e) {
            LOGGER.error(e);//error
        }finally {
            jdbcAgent.close();
        }
        if (byPaging!=null){
            return byPaging;
        }else {
            return null;
        }
    }
}
