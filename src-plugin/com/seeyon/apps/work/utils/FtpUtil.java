package com.seeyon.apps.work.utils;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

/**
 * 实现FTP文件上传和文件下载
 */
public class FtpUtil {
	private static final FTPClient ftpClient = new FTPClient();

	private static final String encoding = System.getProperty("file.encoding");

	/**
	 * Description: 向FTP服务器上传文件
	 * @Version1.0
	 * @param url
	 * FTP服务器hostname
	 * @param port
	 * FTP服务器端口
	 * @param username
	 * FTP登录账号
	 * @param password
	 * FTP登录密码
	 * @param path
	 * FTP服务器保存目录,如果是根目录则为“/”
	 * @param filename
	 * 上传到FTP服务器上的文件名
	 * @param input
	 * 本地文件输入流
	 * @return 成功返回true，否则返回false
	 */
	public static boolean uploadFile(String url, int port, String username,

									 String password, String path, String filename, InputStream input) {
		boolean result = false;
		try {
			int reply;
			// 如果采用默认端口，可以使用ftp.connect(url)的方式直接连接FTP服务器
			ftpClient.connect(url, port);
			// 连接FTP服务器
			// 登录
			ftpClient.login(username, password);
			ftpClient.setControlEncoding(encoding);
			// 检验是否连接成功
			reply = ftpClient.getReplyCode();
			if (!FTPReply.isPositiveCompletion(reply)) {
				ftpClient.disconnect();
				return false;
			}
			// 转移工作目录至指定目录下
			boolean change = ftpClient.changeWorkingDirectory(path);
			ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
			if (change) {
				try{
					result = ftpClient.storeFile(new String(filename.getBytes(encoding), StandardCharsets.ISO_8859_1), input);
				}catch(Exception e){
					e.printStackTrace();
				}
			}
			input.close();
			ftpClient.logout();
		} catch (IOException e) {
			e.printStackTrace();

		} finally {
			if (ftpClient.isConnected()) {
				try {
					ftpClient.disconnect();
				} catch (IOException ioe) {
					ioe.printStackTrace();
				}
			}
		}
		return result;
	}
}
