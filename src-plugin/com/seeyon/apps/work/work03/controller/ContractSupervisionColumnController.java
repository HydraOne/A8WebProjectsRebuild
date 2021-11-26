package com.seeyon.apps.work.work03.controller;

import com.alibaba.fastjson.JSONArray;
import com.seeyon.apps.work.work01.manager.ContractFormListener;
import com.seeyon.apps.work.work03.dao.ContractSupervisionColumnMapper;
import com.seeyon.apps.work.work03.manager.ContractSupervisionColumnService;
import com.seeyon.apps.work.work03.pojo.RegulatoryContract;
import com.seeyon.ctp.common.controller.BaseController;
import com.seeyon.ctp.util.FlipInfo;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @author Ch1stuntQAQ
 * @data 2021/9/27 - 17:26
 * @Description 监管合同栏目的控制层
 */
public class ContractSupervisionColumnController extends BaseController {
    //日志
    protected static Logger LOGGER = Logger.getLogger(ContractFormListener.class);

    //注入manager
    @Autowired
    private ContractSupervisionColumnService contractSupervisionColumnService;

    //请求数据
    public void getColumnFormData(HttpServletRequest request, HttpServletResponse response){
        response.setCharacterEncoding("UTF-8");
        //获取监管合同参数
        String regulatoryContract = request.getParameter("regulatoryContract");
        //调用service将
        ArrayList<RegulatoryContract> columnFormDataService = contractSupervisionColumnService.getColumnFormDataService(regulatoryContract);
        //将po转换成json
        Object toJSON = JSONArray.toJSON(columnFormDataService);
        //响应json
        try {
            response.getWriter().print(toJSON);
        } catch (IOException e) {
            LOGGER.error(e);//error
        }
    }
    //加载页面
    public ModelAndView loadPage(HttpServletRequest request,HttpServletResponse response){
        response.setCharacterEncoding("UTF-8");
        FlipInfo info = new FlipInfo();
        //获取分页条数
        String sectionCount = request.getParameter("sectionCount");
        info.setSize(Integer.parseInt(sectionCount));
        return new ModelAndView("/testContract/testContract");
    }
}
