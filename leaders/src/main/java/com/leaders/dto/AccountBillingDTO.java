package com.leaders.dto;

public class AccountBillingDTO {
	private int accountNum;
	private String groupName;
	private int cpuTime;
	private int gpuTime;
	private int wallTime;
	private String detail;
	
	public int getAccountNum() {
		return accountNum;
	}
	public void setAccountNum(int accountNum) {
		this.accountNum = accountNum;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public int getCpuTime() {
		return cpuTime;
	}
	public void setCpuTime(int cpuTime) {
		this.cpuTime = cpuTime;
	}
	public int getGpuTime() {
		return gpuTime;
	}
	public void setGpuTime(int gpuTime) {
		this.gpuTime = gpuTime;
	}
	public int getWallTime() {
		return wallTime;
	}
	public void setWallTime(int wallTime) {
		this.wallTime = wallTime;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}

}
