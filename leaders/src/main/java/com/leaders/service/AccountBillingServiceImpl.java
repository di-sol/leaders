package com.leaders.service;

import java.util.ArrayList;

import javax.inject.Inject;

import org.springframework.stereotype.Repository;

import com.leaders.dao.AccountBillingDAO;
import com.leaders.dto.AccountBillingDTO;

@Repository
public class AccountBillingServiceImpl implements AccountBillingService {
	
	@Inject
	private AccountBillingDAO dao;

	@Override
	public ArrayList<AccountBillingDTO> selectaccountconfig() throws Exception {
		// TODO Auto-generated method stub
		return dao.selectaccountconfig();
	}

	@Override
	public AccountBillingDTO getaccountconfig(String accountNum) throws Exception {
		// TODO Auto-generated method stub
		return dao.getaccountconfig(accountNum);
	}

	@Override
	public void updateconfig(AccountBillingDTO dto) throws Exception {
		dao.updateconfig(dto);
	}

	@Override
	public int wallTime(String userId) throws Exception {
		// TODO Auto-generated method stub
		return dao.wallTime(userId);
	}

	@Override
	public int cpuTIme(String userId) throws Exception {
		// TODO Auto-generated method stub
		return dao.cpuTIme(userId);
	}

	@Override
	public int gpuTime(String userId) throws Exception {
		// TODO Auto-generated method stub
		return dao.gpuTime(userId);
	}
}
