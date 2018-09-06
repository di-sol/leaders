package com.leaders.dao;

import java.util.ArrayList;
import java.util.HashMap;

import javax.inject.Inject;

import org.apache.ibatis.jdbc.SQL;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.leaders.dto.LoginVO;
import com.leaders.dto.MemberDTO;

@Repository
public class MemberDAOImpl implements MemberDAO {
	
	@Inject
	private SqlSession sqlSession;
	
	private static final String Namespace = "com.leaders.mapper.memberMapper";
	
	@Override
	public String insertMember(MemberDTO member) throws Exception {
		System.out.println(member.getUserName());
		
		sqlSession.insert(Namespace+".insertMember", member);
		return "true";
	}

	@Override
	public MemberDTO selectMemberId(String userId) throws Exception {
		
		return sqlSession.selectOne(Namespace+".selectMemberId", userId);
	}

	@Override
	public MemberDTO selectMember(LoginVO vo) throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.selectOne(Namespace+".selectMember", vo);
	}

	@Override
	public String insertLoginLog(String userId) throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.selectOne(Namespace+".insertLoginLog", userId);
	}

	@Override
	public MemberDTO selectMemberinfo(String userId) throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.selectOne(Namespace+".selectMemberinfo", userId);
	}

	@Override
	public String Deletemember(String userId) throws Exception {
		sqlSession.delete(Namespace+".Deletemember", userId);
		return "true";
	}

	@Override
	public void updateMember(MemberDTO dto) throws Exception {
		// TODO Auto-generated method stub
		sqlSession.update(Namespace+".updatemember", dto);
	}

	@Override
	public void updateMemberpw(String userPwd, String userId) throws Exception {
		HashMap<String, String> data = new HashMap<String, String>();
		data.put("userPwd", userPwd);
		data.put("userId", userId);
		sqlSession.update(Namespace+".updatememberpw", data);
	}

	@Override
	public MemberDTO selectMemberpw(String userId, String userPwd) throws Exception {
		
		HashMap<String, String> data = new HashMap<String, String>();
		data.put("userPwd", userPwd);
		data.put("userId", userId);
		
		return sqlSession.selectOne(Namespace+".selectMemberpw", data);
	}

	@Override
	public ArrayList<MemberDTO> selectMemberall() throws Exception {
		
		// TODO Auto-generated method stub
		return (ArrayList) sqlSession.selectList(Namespace, ".selectMemberall");
	}
}
