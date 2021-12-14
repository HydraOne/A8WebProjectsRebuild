package com.seeyon.apps.work.oasso;

import com.seeyon.ctp.portal.sso.SSOLoginHandshakeAbstract;
import com.seeyon.ctp.util.Base64;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.UnsupportedEncodingException;
import java.util.Date;

/**
 * @author 杨乾基
 * @version 1.0.0
 * @ClassName OASSOLoginImpl.java
 * @Description TODO  用于单点登陆的握手类
 * @createTime 2021年08月25日 15:30:00
 */

public class OASSOLoginImpl extends SSOLoginHandshakeAbstract {

    private static final Log log = LogFactory.getLog(OASSOLoginImpl.class);

    @Override
    public String handshake(String token) {
        if(token == null || token.equals(""))
        {
            log.error("单点登录token为空， 登录时间：" + (new Date()));
            return null;
        }else
        {
            String loginName = null;
            try {
                String s = Base64.decode2String(token);
                //此处获取获取token后切割
                String [] arr =s.split(",");
					loginName = arr[0];
             
            } catch (UnsupportedEncodingException e) {
                // TODO Auto-generated catch block
                log.error("单点登录错误" , e);
            }
            return loginName;
        }
    }

    @Override
    public void logoutNotify(String arg0) {
        // TODO Auto-generated method stub

    }

}
