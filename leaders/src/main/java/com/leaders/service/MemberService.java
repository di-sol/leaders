package com.leaders.service;

import java.util.ArrayList;

import com.leaders.dto.LoginVO;
import com.leaders.dto.MemberDTO;


public interface MemberService {
	public String insertMember(MemberDTO member) throws Exception;
	public MemberDTO selectMemberId(String userId) throws Exception;
	public MemberDTO selectMember(LoginVO vo) throws Exception;
	public String insertLoginLog(String userId) throws Exception;
	public MemberDTO selectMemberinfo(String userId) throws Exception;
	public void updateMember(MemberDTO dto) throws Exception;
	public void updateMemberpw(String userPwd,String userId) throws Exception;
	public String Deletemember(String userId) throws Exception;
	public MemberDTO selectMemberpw(String userId,String userPwd) throws Exception;
	public ArrayList<MemberDTO> memberlist() throws Exception;
	
	public ArrayList<MemberDTO> member() throws Exception;
	
	
}
