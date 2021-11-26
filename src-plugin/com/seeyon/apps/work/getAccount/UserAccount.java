package com.seeyon.apps.work.getAccount;

import com.seeyon.apps.work.work06.dao.impl.PayWebServiceDaoImpl;
import com.seeyon.ctp.common.controller.BaseController;
import com.seeyon.ctp.common.exceptions.BusinessException;
import com.seeyon.ctp.common.log.CtpLogFactory;
import com.seeyon.ctp.organization.bo.V3xOrgAccount;
import com.seeyon.ctp.organization.bo.V3xOrgMember;
import com.seeyon.ctp.organization.manager.OrgManager;
import com.seeyon.ctp.util.annotation.AjaxAccess;
import org.apache.commons.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;
import org.yaml.snakeyaml.events.Event;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Ch1stuntQAQ
 * @data 2021/10/11 - 16:44
 * 根据用户id获取类名的接口
 */
public class UserAccount extends BaseController {
    @Autowired
    OrgManager orgManager;

    private static final Log log = CtpLogFactory.getLog(UserAccount.class);

    @AjaxAccess
    public ModelAndView selectUserAccount(HttpServletRequest request , HttpServletResponse response){
        String id = request.getParameter("id");
        String loginName= null;
        try {
            V3xOrgMember memberById = orgManager.getMemberById(Long.valueOf(id));
            loginName = memberById.getLoginName();
        } catch (BusinessException e) {
            log.error("用户查找异常",e);
        }
        HashMap<String, String> resultMap = new HashMap<>();
        resultMap.put("account",loginName);
        return new ModelAndView(new MappingJackson2JsonView()).addAllObjects(resultMap);
    }
}
