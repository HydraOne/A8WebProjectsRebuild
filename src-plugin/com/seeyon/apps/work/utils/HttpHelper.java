package com.seeyon.apps.work.utils;


import org.apache.axiom.om.OMElement;
import org.apache.axis2.AxisFault;
import org.apache.axis2.addressing.EndpointReference;
import org.apache.axis2.client.Options;
import org.apache.axis2.rpc.client.RPCServiceClient;

import javax.xml.namespace.QName;


/**
 * 接口调用工具类
 *  zhengshuohong
 * @author WXT
 *
 */
public class HttpHelper {

	/**
	 * 使用webservice wsdl接口
	 * url:webservice wsdl接口地址
	 * method:接口中被访问的方法
	 * param:json格式请求字符串参数
	 */
	public static String sendRPCClient(String url,String method,String param) {
		String result = "";
		try {
			// 使用RPC方式调用WebService
			RPCServiceClient serviceClient = new RPCServiceClient();
			// 指定调用WebService的URL
			EndpointReference targetEPR = new EndpointReference(url);
			Options options = serviceClient.getOptions();
			//确定目标服务地址
			options.setTo(targetEPR);
			//确定调用方法
			options.setAction(method);
			options.setProperty(org.apache.axis2.Constants.Configuration.DISABLE_SOAP_ACTION, true);
			/**
			 * 指定要调用的getPrice方法及WSDL文件的命名空间
			 * 如果 webservice 服务端由axis2编写
			 * 命名空间 不一致导致的问题
			 * org.apache.axis2.AxisFault: java.lang.RuntimeException: Unexpected subelement arg0
			 */
			QName qname = new QName("http://impl.webService.services.apps.seeyon.com", method);
			// 指定getPrice方法的参数值
			Object[] parameters = new Object[] { param };
			// 指定getPrice方法返回值的数据类型的Class对象
			// 调用方法一 传递参数，调用服务，获取服务返回结果集
			OMElement element = serviceClient.invokeBlocking(qname, parameters);
			//值得注意的是，返回结果就是一段由OMElement对象封装的xml字符串。
			//我们可以对之灵活应用,下面我取第一个元素值，并打印之。因为调用的方法返回一个结果
			result = element.getFirstElement().getText();
		} catch (AxisFault e) {
			System.out.println("----------------------"+e);
			throw new RuntimeException(e);
		}
		return result;
	}
}