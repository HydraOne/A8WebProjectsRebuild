package com.seeyon.apps.work.work03.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.seeyon.apps.work.work03.manager.RegulatoryContractManager;
import com.seeyon.apps.work.work03.pojo.RegulatoryContract;
import org.apache.commons.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONArray;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.controller.BaseController;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.common.log.CtpLogFactory;
import com.seeyon.ctp.util.FlipInfo;

 /**
 * @author yanglinchuan
 * @describe 合同管理控制层
 * @date 2021-11-26
 *
 */
public class RegulatoryContractController extends BaseController{
	//日志
	private static final Log LOG = CtpLogFactory.getLog(RegulatoryContractController.class);
	//注入manager
	@Autowired
	private RegulatoryContractManager regulatoryContractManager;
	//请求数据
	public void getColumnFormDate(HttpServletRequest request,HttpServletResponse response){
		response.setCharacterEncoding("UTF-8");
		//获取监管合同参数
		String regulatoryContract = request.getParameter("regulatoryContract");
		//调用manager层方法查询对象
		ArrayList<RegulatoryContract> formDateList = regulatoryContractManager.getFormDate(regulatoryContract);
		//将实体类对象转化未json
		Object json = JSONArray.toJSON(formDateList);
		try {
			response.getWriter().print(json);
		} catch (IOException e) {
			LOG.error("实体类转换json出错",e);
		}
	}


	//加载视图
	public ModelAndView showPage(HttpServletRequest request,HttpServletResponse response){
		response.setCharacterEncoding("UTF-8");
		FlipInfo flipInfo = new FlipInfo();
		String sectionCount = request.getParameter("sectionCount");
		flipInfo.setSize(Integer.parseInt(sectionCount));
		return new ModelAndView("/testContract/contractSection");
	}
}