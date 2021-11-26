package com.seeyon.ctp.rest.resources;

import com.seeyon.ctp.common.AppContext;
import com.seeyon.ctp.common.log.CtpLogFactory;
import com.seeyon.v3x.dee.util.rest.CTPRestClient;
import com.seeyon.v3x.dee.util.rest.CTPServiceClientManager;
import org.apache.commons.logging.Log;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Ch1stuntQAQ
 * @data 2021/9/29 - 13:12
     * 发起付款流程的rest类
 */
@Path("TimerRest")
@Consumes("application/json")
@Produces("application/json")
public class TimerRest extends BaseResource{
    //本地ip
    String restUrl = "http://127.0.0.1:8081";//error
    //rest账号
    String restName = AppContext.getSystemProperty("demandConfiguration.restAccount");
    //rest密码
    String restPassword = AppContext.getSystemProperty("demandConfiguration.restPassword");
    //发起付款流程表单的编号
    String templateCode = AppContext.getSystemProperty("demandConfiguration.paymentFlowSheet");
    //指定协议、IP和端口、获取CTPServiceClientManager
    CTPServiceClientManager clientManager = CTPServiceClientManager.getInstance(restUrl);
    //流程所需参数
    Map<String, Object> params = new HashMap<>();
    Long flowId;

    //日志
    private static final Log log = CtpLogFactory.getLog(TimerRest.class);
    //发起流程表单
    @POST
    @Path("toTimer")
    @Produces(MediaType.APPLICATION_JSON)
    public Long initiateTheProcessForm(String dataXml){
        //取得rest动态客户机实例
        CTPRestClient client = clientManager.getRestClient();
        client.authenticate(restName, restPassword);
        params.put("templateCode",templateCode);
        params.put("attachments",new Long[]{});
        params.put("senderLoginName","lidan");
        params.put("subject","付款流程");
        params.put("data",dataXml);
        params.put("param","0");
        flowId = client.post("flow/" + templateCode, params, Long.class);
        return flowId;
    }
}
