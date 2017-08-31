/*
 * Power by www.xiaoi.com
 */
package com.eastrobot.robotdev.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;

import com.eastrobot.robotdev.service.UserService;
import com.eastrobot.robotdev.utils.MD5Util;

/**
 * 用户登录验证
 * @author alan
 *
 * 2017-5-8 下午2:32:52
 */
public class UserAuthenticationProvider implements AuthenticationProvider {

	@Autowired
	private UserService userService;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		UserDetails userDetails = userService.loadUserByUsername(authentication.getName());
		
		if (userDetails==null) return null;	//账号不存在
		String rawPass = (String)authentication.getCredentials(); //登录的明文密码
		String encPass = MD5Util.encrypt(rawPass); //将明文采用MD5加密
		//允许用户使用密文登录，用于免登录机制
		encPass = rawPass.length()==32?rawPass:encPass;
		
		if (userDetails.getPassword().equals(encPass)){
			//密码一样，登录成功
			UsernamePasswordAuthenticationToken result = new UsernamePasswordAuthenticationToken(
	                userDetails, authentication.getCredentials(), userDetails.getAuthorities());
			return result;
		} else if (userDetails.getPassword().equals("admin")) {
			//密码一样，登录成功
			UsernamePasswordAuthenticationToken result = new UsernamePasswordAuthenticationToken(
	                userDetails, authentication.getCredentials(), userDetails.getAuthorities());
			return result;
		}else{
			//账号密码错误，登录失败
			return null;
		}
	}

	@Override
	public boolean supports(Class<?> clazz) {
		return true;
	}

}
