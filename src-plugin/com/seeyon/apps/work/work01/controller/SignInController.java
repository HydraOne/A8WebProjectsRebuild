package com.seeyon.apps.work.work01.controller;

import com.seeyon.apps.work.work01.manager.ContractFormListener;
import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.controller.BaseController;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.organization.bo.V3xOrgMember;
import com.seeyon.ctp.organization.manager.OrgManager;
import com.seeyon.ctp.util.Base64;
import com.seeyon.ctp.util.Strings;
import com.seeyon.ctp.util.annotation.NeedlessCheckLogin;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Random;

/**
 * @author wangjiahao
 * @Description TODO 单点登陆的控制层，用于单点登陆的校验 校验唯一值为 登陆名 loginName
 */
public class SignInController extends BaseController {
    //日志
    protected static Logger LOGGER = Logger.getLogger(ContractFormListener.class);
    //组织架构管理类
    private final OrgManager orgManager = (OrgManager) AppContext.getBean("orgManager");

    @NeedlessCheckLogin
    public void signIn(HttpServletRequest request, HttpServletResponse response){
        //url传入的Id
        String loginId = request.getParameter("LoginId");
        String loginName = null;
            //用id查询登录名
        try {
            V3xOrgMember memberById = orgManager.getMemberById(Long.valueOf(loginId));
            loginName = memberById.getLoginName();
            if (loginName!=null) {
                LOGGER.info("获取到用户名称"+loginName);
                //loginName后加入随机数防止ticket过期
                String appServerWelcomeUrl = "/seeyon/login/sso?from=oasso&ticket=" + Base64.encodeString(loginName+","+new Random().nextInt());
                response.sendRedirect(appServerWelcomeUrl);
            }else {
                super.rendJavaScript(response,"alert('未获取到用户信息')");
            }
        } catch (Exception e) {
            LOGGER.error("单点登录异常",e);
        }
    }
}