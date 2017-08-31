package com.service;

import java.text.ParseException;

import javax.annotation.Resource;

import org.junit.Test;
import org.quartz.SchedulerException;

import com.BaseTest;
import com.eastrobot.robotdev.service.ScheduleService;

public class ScheduleServiceTest extends BaseTest{
	
	@Resource
	private ScheduleService scheduleService;
	
	@Test
	public void addJob(){
		try {
			scheduleService.scheduleJob("test", "testGroup1", "com.eastrobot.robotdev.job.MyJob", "test", "0 /2 * * * ? *", "test");
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void executeJob(){
		try {
			scheduleService.triggerJob("test", "testGroup1");
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Test
	public void removeJob(){
		try {
			scheduleService.removeTrigdger("test", "testGroup1");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
