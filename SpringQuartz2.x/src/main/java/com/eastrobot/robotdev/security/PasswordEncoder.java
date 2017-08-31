package com.eastrobot.robotdev.security;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.security.authentication.encoding.BasePasswordEncoder;

public class PasswordEncoder extends BasePasswordEncoder {

	@Override
	public String encodePassword(String rawPass, Object salt) {
		return DigestUtils.shaHex(rawPass);
	}

	@Override
	public boolean isPasswordValid(String encPass, String rawPass, Object salt) {
		return encPass.equals(encodePassword(rawPass, salt));
	}

}
