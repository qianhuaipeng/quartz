package com.eastrobot.robotdev.job;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyJob implements Job{
	
	private static Logger logger = LoggerFactory.getLogger(MyJob.class);
	
	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		logger.info("1111111111111");
	}

}
