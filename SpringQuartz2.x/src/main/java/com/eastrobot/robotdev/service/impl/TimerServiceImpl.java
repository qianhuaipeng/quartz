package com.eastrobot.robotdev.service.impl;

import javax.annotation.Resource;

import org.quartz.impl.StdScheduler;
import org.springframework.stereotype.Component;

import com.eastrobot.robotdev.service.TimerService;

@Component("timerService")
public class TimerServiceImpl implements TimerService{

	@Resource  
	private StdScheduler  quartzScheduler;
	
	@Override
	public void createTable() {
		
	}

	@Override
	public void read() {
		
	}

	@Override
	public void create() {
		
	}

}
