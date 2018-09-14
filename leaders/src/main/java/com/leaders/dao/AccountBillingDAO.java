package com.leaders.dao;

import java.util.ArrayList;

import com.leaders.dto.AccountBillingDTO;

public interface AccountBillingDAO {
	public ArrayList<AccountBillingDTO> selectaccountconfig() throws Exception;
	public AccountBillingDTO getaccountconfig(String accountNum) throws Exception;
	public void updateconfig(AccountBillingDTO dto) throws Exception;
	
	
	public int wallTime(String userId) throws Exception;
	public int cpuTIme(String userId) throws Exception;
	public int gpuTime(String userId) throws Exception;
}
