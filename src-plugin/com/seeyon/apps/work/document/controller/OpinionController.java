package com.seeyon.apps.work.document.controller;


import com.seeyon.apps.work.document.manager.OpinionListManager;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.controller.BaseController;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.util.Strings;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * @author wangjiahao
 * @email  wangjiahao@microcental.net
 * 意见controller
 */
public class OpinionController extends BaseController {
    private static final Log LOGGER = LogFactory.getLog(OpinionController.class);

    @Autowired
    private OpinionListManager opinionListManager;

    //进行查看页面跳转
    public ModelAndView findOpinion(HttpServletRequest request, HttpServletResponse response) throws BusinessException {
        Long time = System.currentTimeMillis();
        LOGGER.info("开始查看意见---start----时间---：--" + time);
        ModelAndView modelAndView = new ModelAndView("edoc/opinionList");
        return modelAndView;
    }

    //进行修改页面跳转
    public ModelAndView updateOpinionDataPage(HttpServletRequest request, HttpServletResponse response) {
        ModelAndView modelAndView = new ModelAndView("edoc/updateOpinion");
        return modelAndView;
    }

    //意见修改
    public ModelAndView updateOpinionData(HttpServletRequest request, HttpServletResponse response) {
        ModelAndView modelAndView = new ModelAndView();
        Map map = new HashMap<>();
        //意见ID
        long opinionId = Strings.isBlank(request.getParameter("id")) ? -1 : Long.parseLong(request.getParameter("id"));
        //修改的意见内容
        String opinionContent = Strings.isBlank(request.getParameter("opinion")) ? "" : request.getParameter("opinion");
        try {
            opinionListManager.updateOpinionData(opinionId, opinionContent);
            //返回json
            map.put("message", 0);
        } catch (Exception e) {
            map.put("message", 1);
            LOGGER.error("修改意见出现异常", e);
        }
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }
}