package com.eastrobot.robotdev.test.common;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.eastrobot.robotdev.common.DataBaseCategoryPagingSQL;
import com.eastrobot.robotdev.test.BaseTest;

public class DataBaseCategoryPagingSQLTest extends BaseTest{
	
	@Test
	public  void test() {
		String sql = DataBaseCategoryPagingSQL.getStatement("ASR_CALL_LOG_201708", "SELECT * from ASR_CALL_LOG_201708 order by create_time desc", 0, 20); 
		System.out.println(sql);
	}
	
	@Test
	public void testP(){
		List<Object> params = new ArrayList<Object>();
		add(params);
		
		System.out.println(params);
	}
	
	public void add(List<Object> params){
		for (int i = 0; i < 10; i++) {
			params.add(i);
		}
	}
}
