package com.seeyon.apps.work.work05.dao.impl;

import com.seeyon.apps.work.work05.dao.PaymentStatusDao;
import com.seeyon.ctp.common.log.CtpLogFactory;
import com.seeyon.ctp.common.po.ctpenumnew.CtpEnumItem;
import com.seeyon.ctp.common.po.ctpenumnew.CtpEnumItemPO;
import com.seeyon.ctp.util.DBAgent;
import org.apache.commons.logging.Log;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PaymentStatusDaoImpl implements PaymentStatusDao {
    //日志
    private static final Log log = CtpLogFactory.getLog(PaymentStatusDaoImpl.class);

    @Override
    public Long getEnumIdByName(String name) {
        Map queryConditions = new HashMap<>();
        queryConditions.put("enumname", name);
        List allResult = DBAgent.find("from CtpEnumItemPO where showvalue = :enumname",queryConditions);
        CtpEnumItemPO onlyResult = (CtpEnumItemPO) allResult.get(0);
        return onlyResult.getId();
    }
}