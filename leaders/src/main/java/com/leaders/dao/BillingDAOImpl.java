package com.leaders.dao;

import java.util.ArrayList;
import java.util.HashMap;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.leaders.dto.BillingDTO;

@Repository
public class BillingDAOImpl implements BillingDAO {

	@Inject
	private SqlSession sqlSession;
	
	private static final String Namespace = "com.leaders.mapper.billingMapper";
	
	@Override
	public ArrayList<BillingDTO> selectbillinginfo(String billingUser) throws Exception {
		// TODO Auto-generated method stub
		return (ArrayList)sqlSession.selectList(Namespace+".selectbillinginfo", billingUser);
	}

	@Override
	public ArrayList<BillingDTO> selectbilling() throws Exception {
		// TODO Auto-generated method stub
		return (ArrayList)sqlSession.selectList(Namespace+".selectbilling");
	}

	@Override
	public String insertbiling(String billingUser, String price, String balance) throws Exception {
		HashMap<String, String> data = new HashMap<String, String>();
		data.put("billingUser", billingUser);
		data.put("price", price);
		data.put("balance", balance);
		
		try {
			sqlSession.insert(Namespace+".insertbiling", data);
			return "true";
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return "false";
		}
	}

	@Override
	public String updateBalance(String userBalance, String userId) throws Exception {
		HashMap<String, String> data = new HashMap<String, String>();
		data.put("userBalance", userBalance);
		data.put("userId", userId);
			
		try {
			sqlSession.update(Namespace+".updateBalance", data);
			return "true";
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return "false";
		}
	}

	@Override
	public int selecttotal() throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.selectOne(Namespace+".selecttotal");
	}

	@Override
	public ArrayList<BillingDTO> billinginfo(String billingUser) throws Exception {
		// TODO Auto-generated method stub
		return (ArrayList)sqlSession.selectList(Namespace+".billinginfo", billingUser);
	}
}
