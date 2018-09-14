package com.leaders.service;

import java.util.ArrayList;

import javax.inject.Inject;

import org.springframework.stereotype.Repository;

import com.leaders.dao.BillingDAO;
import com.leaders.dto.BillingDTO;

@Repository
public class BillingServiceImpl implements BillingService {

	@Inject
	private BillingDAO dao;
	
	@Override
	public ArrayList<BillingDTO> selectbillinginfo(String billingUser) throws Exception {
		// TODO Auto-generated method stub
		return dao.selectbillinginfo(billingUser);
	}

	@Override
	public ArrayList<BillingDTO> selectbilling() throws Exception {
		// TODO Auto-generated method stub
		return dao.selectbilling();
	}
	
	@Override
	public String insertbiling(String billingUser, String price, String balance) throws Exception {
		// TODO Auto-generated method stub
		return dao.insertbiling(billingUser, price, balance);
	}

	@Override
	public String updateBalance(String userBalance, String userId) throws Exception {
		// TODO Auto-generated method stub
		return dao.updateBalance(userBalance, userId);
	}

	@Override
	public int selecttotal() throws Exception {
		// TODO Auto-generated method stub
		return dao.selecttotal();
	}

	@Override
	public ArrayList<BillingDTO> billinginfo(String billingUser) throws Exception {
		// TODO Auto-generated method stub
		return dao.billinginfo(billingUser);
	}

}
