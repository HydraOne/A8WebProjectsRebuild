package com.seeyon.apps.work.work03.manager;

import com.seeyon.apps.work.work03.dao.ContractSupervisionColumnMapper;
import com.seeyon.apps.work.work03.pojo.RegulatoryContract;
import com.seeyon.ctp.util.FlipInfo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @author Ch1stuntQAQ
 * @data 2021/9/28 - 10:35
 */
public class ContractSupervisionColumnService {
    //注入dao层
    @Autowired
    private ContractSupervisionColumnMapper contractSupervisionColumnMapper;

    public ArrayList<RegulatoryContract> getColumnFormDataService(String regulatoryContract) {
        //分页
        FlipInfo flipInfo = new FlipInfo();
        //设置页数
        flipInfo.setSize(Integer.parseInt(regulatoryContract));
        //pojo集合
        ArrayList<RegulatoryContract> regulatoryContracts = new ArrayList<>();
        //查询监管合同详情
        FlipInfo flipInfoData = contractSupervisionColumnMapper.querySupervisionContractInformation(flipInfo);
        List<Map<String,Object>> data = flipInfoData.getData();
        for (Map<String, Object> map : data) {
            RegulatoryContract contract = new RegulatoryContract();
            contract.setField0001(String.valueOf(map.get("field0001")));
            contract.setField0002(String.valueOf(map.get("field0002")));
            contract.setField0003((Date) map.get("field0003"));
            contract.setField0004(String.valueOf(map.get("field0004")));
            contract.setField0005(String.valueOf(map.get("field0005")));
            contract.setField0006(String.valueOf(map.get("field0006")));
            contract.setField0033(String.valueOf(map.get("field0033")));
            contract.setField0036(String.valueOf(map.get("field0036")));
            regulatoryContracts.add(contract);
        }
        return regulatoryContracts;
    }
}
