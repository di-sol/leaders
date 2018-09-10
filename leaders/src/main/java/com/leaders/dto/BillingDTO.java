package com.leaders.dto;

public class BillingDTO {
	private int billingNum;
	private String billingUser;
	private String billingTime;
	private String billinghistory;
	private String price;
	private String balance;
	
	public int getBillingNum() {
		return billingNum;
	}
	public void setBillingNum(int billingNum) {
		this.billingNum = billingNum;
	}
	public String getBillingUser() {
		return billingUser;
	}
	public void setBillingUser(String billingUser) {
		this.billingUser = billingUser;
	}
	public String getBillingTime() {
		return billingTime;
	}
	public void setBillingTime(String billingTime) {
		this.billingTime = billingTime;
	}
	public String getBillinghistory() {
		return billinghistory;
	}
	public void setBillinghistory(String billinghistory) {
		this.billinghistory = billinghistory;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getBalance() {
		return balance;
	}
	public void setBalance(String balance) {
		this.balance = balance;
	}
	
}