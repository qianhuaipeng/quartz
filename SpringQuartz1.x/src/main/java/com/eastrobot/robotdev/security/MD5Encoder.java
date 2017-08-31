package com.eastrobot.robotdev.security;

import org.springframework.security.authentication.encoding.BasePasswordEncoder;

public class MD5Encoder extends BasePasswordEncoder {

	@Override
	public String encodePassword(String rawPass, Object salt) {
		return MD5Util.encrypt(rawPass, salt);
	}

	@Override
	public boolean isPasswordValid(String encPass, String rawPass, Object salt) {
		return encPass.equals(encodePassword(rawPass, salt));
	}

}
