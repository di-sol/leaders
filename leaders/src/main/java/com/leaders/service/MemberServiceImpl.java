package com.leaders.service;

import java.util.ArrayList;

import javax.inject.Inject;

import org.springframework.stereotype.Repository;

import com.leaders.dao.MemberDAO;
import com.leaders.dto.LoginVO;
import com.leaders.dto.MemberDTO;

@Repository 
public class MemberServiceImpl implements MemberService {

	@Inject
	private MemberDAO dao;

	@Override
	public String insertMember(MemberDTO member) throws Exception {
		// TODO Auto-generated method stub
		
		return dao.insertMember(member);
	}

	@Override
	public MemberDTO selectMemberId(String userId) throws Exception {
		// TODO Auto-generated method stub
		return dao.selectMemberId(userId);
	}

	@Override
	public MemberDTO selectMember(LoginVO vo) throws Exception {
		// TODO Auto-generated method stub
		return dao.selectMember(vo);
	}

	@Override
	public String insertLoginLog(String userId) throws Exception {
		// TODO Auto-generated method stub
		return dao.insertLoginLog(userId);
	}

	@Override
	public MemberDTO selectMemberinfo(String userId) throws Exception {
		// TODO Auto-generated method stub
		return dao.selectMemberinfo(userId);
	}

	@Override
	public String Deletemember(String userId) throws Exception {
		// TODO Auto-generated method stub
		return dao.Deletemember(userId);
	}

	@Override
	public void updateMember(MemberDTO dto) throws Exception {
		// TODO Auto-generated method stub
		dao.updateMember(dto);
	}

	@Override
	public void updateMemberpw(String userPwd, String userId) throws Exception {
		dao.updateMemberpw(userPwd, userId);
	}

	@Override
	public MemberDTO selectMemberpw(String userId, String userPwd) throws Exception {
		// TODO Auto-generated method stub
		return dao.selectMemberpw(userId, userPwd);
	}

	@Override
	public ArrayList<MemberDTO> memberlist() throws Exception {
		// TODO Auto-generated method stub
		return dao.memberlist();
	}

	@Override
	public ArrayList<MemberDTO> member() throws Exception {
		// TODO Auto-generated method stub
		return dao.member();
	}
}
