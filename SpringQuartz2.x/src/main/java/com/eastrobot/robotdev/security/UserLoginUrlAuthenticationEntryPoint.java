package com.eastrobot.robotdev.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;

public class UserLoginUrlAuthenticationEntryPoint extends LoginUrlAuthenticationEntryPoint {

	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {
		String requestURI = request.getRequestURI();	// /dev/index.do
		request.getSession().setAttribute("USER_REDIRECT", requestURI);
        super.commence(request, response, authException);
    }
}
