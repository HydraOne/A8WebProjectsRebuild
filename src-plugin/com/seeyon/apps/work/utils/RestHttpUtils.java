package com.seeyon.apps.work.utils;

import com.seeyon.apps.work.work01.manager.ContractFormListener;
import org.apache.http.HttpEntity;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;

/**
 * @author Ch1stuntQAQ
 * @data 2021/9/23 - 17:40
 * @Description 发送rest请求的工具类
 */
public class RestHttpUtils {
    //日志
    protected static Logger LOGGER = Logger.getLogger(ContractFormListener.class);

    //发送get请求
    public static String sendGetRequest(String url,String param){
        //创建响应字符串
        StringBuffer result = new StringBuffer();
        //初始化一个字符输入缓冲流
        BufferedReader bufferInputStream = null;
        //初始化urlName
        String urlName;

        try {
            urlName = url+"?"+param;
            URL realUrl = new URL(urlName);
            URLConnection urlConnection = realUrl.openConnection();
            urlConnection.setRequestProperty("accept", "*/*");
            urlConnection.setRequestProperty("connection", "Keep-Alive");
            urlConnection.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            //建立连接
            urlConnection.connect();

            bufferInputStream = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), StandardCharsets.UTF_8));

            String line;
            while ((line = bufferInputStream.readLine())!= null){
                result.append(line);
            }
        } catch (IOException e) {
            LOGGER.error("get请求流写入错误",e);
        } finally {
            if (bufferInputStream != null){
                try {
                    bufferInputStream.close();
                } catch (IOException e) {
                    LOGGER.error("流关闭失败",e);
                }
            }
        }
        return result.toString();
    }

    //post请求
    public static void sendPostRequest(String url, String content) {
        CloseableHttpClient httpClient = null;
        HttpPost httpPost = null;
        CloseableHttpResponse httpResponse = null;
        try {
            httpClient = HttpClients.createDefault();
            int CONNECTION_TIMEOUT = 10 * 60 * 1000;
            RequestConfig requestConfig = RequestConfig.custom().setConnectionRequestTimeout(CONNECTION_TIMEOUT).setConnectTimeout(CONNECTION_TIMEOUT).setSocketTimeout(CONNECTION_TIMEOUT).build();
            httpPost = new HttpPost(url);
            httpPost.setConfig(requestConfig);
            httpPost.addHeader("Content-Type", "application/json");
            StringEntity requestEntity = new StringEntity(content, "UTF-8");
            httpPost.setEntity(requestEntity);
            httpResponse = httpClient.execute(httpPost, new BasicHttpContext());
            HttpEntity entity = httpResponse.getEntity();
            if (entity != null) {
                EntityUtils.toString(entity, "UTF-8");
            }
        } catch (Exception e) {
            LOGGER.error("post流写入失败",e);
        } finally {
            if (httpResponse != null) {
                try {
                    httpResponse.close();
                } catch (Exception ignored) {
                }
            }
            if (httpPost != null) {
                try {
                    httpPost.releaseConnection();
                } catch (Exception ignored) {
                }
            }
            if (httpClient != null) {
                try {
                    httpClient.close();
                } catch (Exception e) {
                    LOGGER.error("post流关闭失败",e);
                }
            }
        }
    }
}
