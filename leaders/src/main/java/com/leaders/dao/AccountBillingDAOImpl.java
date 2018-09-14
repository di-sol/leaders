package com.leaders.dao;

import java.util.ArrayList;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.leaders.dto.AccountBillingDTO;

@Repository
public class AccountBillingDAOImpl implements AccountBillingDAO {
	
	@Inject
	private SqlSession sqlSession;
	
	private static final String Namespace = "com.leaders.mapper.AccountBillingMapper";

	@Override
	public ArrayList<AccountBillingDTO> selectaccountconfig() throws Exception {
		// TODO Auto-generated method stub
		return (ArrayList)sqlSession.selectList(Namespace+".selectaccountconfig");
	}

	@Override
	public AccountBillingDTO getaccountconfig(String accountNum) throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.selectOne(Namespace+".getaccountconfig", accountNum);
	}

	@Override
	public void updateconfig(AccountBillingDTO dto) throws Exception {
		sqlSession.update(Namespace+".updateconfig", dto);
	}

	@Override
	public int wallTime(String userId) throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.selectOne(Namespace+".wallTime", userId);
	}

	@Override
	public int cpuTIme(String userId) throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.selectOne(Namespace+".cpuTIme", userId);
	}

	@Override
	public int gpuTime(String userId) throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.selectOne(Namespace+".gpuTime", userId);
	}
}
