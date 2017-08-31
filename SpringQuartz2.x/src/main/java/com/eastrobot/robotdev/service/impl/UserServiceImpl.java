/*
 * Power by www.xiaoi.com
 */
package com.eastrobot.robotdev.service.impl;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.eastrobot.robotdev.service.UserService;

/**
 * @author <a href="mailto:eko.z@outlook.com">eko.zhan</a>
 * @date Mar 8, 2017 10:35:26 AM
 * @version 1.0
 */
@Service
public class UserServiceImpl implements UserService  {
	
	/**
	 * 登录验证
	 */
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserDetails details = null;
		details = new org.springframework.security.core.userdetails.User("admin", "admin", true, true, true, true, AuthorityUtils.createAuthorityList("ROLE_USER"));
		return details;
	}
	
}
