package com.eastrobot.robotdev.security;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;


/**
 * 用户登录失败
 * @author alan
 *
 * 2017-5-8 下午2:28:53
 */
public class AuthenticationFailureHandlerImpl implements AuthenticationFailureHandler{

	
	private String defaultFailureUrl;
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request,
			HttpServletResponse response, AuthenticationException exception)
			throws IOException, ServletException {
		
		
		Integer result = -1;
		if (exception.getMessage().contains("Maximum sessions")){
//			message = "该账号已登录，不能重复登录";
			result = -1;
		}else if (exception.getMessage().contains("No AuthenticationProvider found")){
//			message = "账号或密码错误，请重新输入";
			result = 0;
		}
		
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		json.put("type", 0);
		json.put("result", result);
		out.println(json.toString());
	}

	public String getDefaultFailureUrl() {
		return defaultFailureUrl;
	}

	public void setDefaultFailureUrl(String defaultFailureUrl) {
		this.defaultFailureUrl = defaultFailureUrl;
	}

	
}
