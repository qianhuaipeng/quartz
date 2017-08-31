package com.eastrobot.robotdev.controller;

import java.text.ParseException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.quartz.SchedulerException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.eastrobot.robotdev.entity.JobInfo;
import com.eastrobot.robotdev.service.ScheduleService;

@Controller
public class TestController extends BaseController{

	@Resource
	private ScheduleService scheduleService;
	
	
	@RequestMapping(value="add")
	@ResponseBody
	public void addJob(){
		
	}
	
	@RequestMapping(value="execute")
	@ResponseBody
	public void executeJob(){
		try {
			scheduleService.resumeTrigger("test", "testGroup1");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="stop")
	@ResponseBody
	public void stopJob(){
		try {
			scheduleService.pauseTrigger("test", "testGroup1");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
		
	@RequestMapping(value="modify")
	@ResponseBody
	public void modifyJob(){
		try {
			scheduleService.rescheduleJob("test", "testGroup1","* * * * * ? *");
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="list")
	@ResponseBody
	public void listJob(HttpServletResponse response){
		List<JobInfo> jobInfos = scheduleService.queryInfo(null);
		writeJson(response, jobInfos);
	}
}
