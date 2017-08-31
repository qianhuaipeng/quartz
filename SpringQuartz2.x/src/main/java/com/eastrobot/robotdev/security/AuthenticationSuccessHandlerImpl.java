package com.eastrobot.robotdev.security;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

public class AuthenticationSuccessHandlerImpl extends SavedRequestAwareAuthenticationSuccessHandler {

	
	/**
	 * 默认跳转的页面
	 */
	private String defaultSuccessUrl;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request,
			HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {
		String redirect = (String) request.getSession().getAttribute("USER_REDIRECT");
		if (StringUtils.isBlank(redirect)) redirect = defaultSuccessUrl;
		
		//setAttribute
		System.out.println("当前用户： " + authentication.getName());
		
		request.getSession().setAttribute("currentUser",authentication.getName());
		
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		json.put("type", 1);
		json.put("targetUrl", redirect);
		out.println(json.toString());
		
	}

	public String getDefaultSuccessUrl() {
		return defaultSuccessUrl;
	}

	public void setDefaultSuccessUrl(String defaultSuccessUrl) {
		this.defaultSuccessUrl = defaultSuccessUrl;
	}
	

}
