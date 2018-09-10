package com.leaders.service;

import java.util.ArrayList;

import com.leaders.dto.BillingDTO;

public interface BillingService {
	
	public ArrayList<BillingDTO> selectbillinginfo(String billingUser) throws Exception;
	public ArrayList<BillingDTO> selectbilling() throws Exception;
	public String insertbiling(String billingUser,String price, String balance) throws Exception;
	
	public String updateBalance(String userBalance, String userId) throws Exception;

}
