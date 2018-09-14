package com.leaders.dao;

import java.util.ArrayList;
import java.util.HashMap;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.leaders.dto.GroupDTO;


@Repository
public class GroupDAOImpl implements GroupDAO {
	
	@Inject
	private SqlSession sqlSession;
	
	private static final String Namespace = "com.leaders.mapper.groupMapper";

	@Override
	public String insertGroup(GroupDTO groupDto) throws Exception {
		// TODO Auto-generated method stub
		String result = "false";
		try {
			sqlSession.insert(Namespace+".insertGroup", groupDto);
			result = "true";
		} catch (Exception e) {
			// TODO: handle exception
			result = "false";
		}
		
		return result; 
	}

	@Override
	public ArrayList<GroupDTO> selectAllGroup() throws Exception {
		// TODO Auto-generated method stub
		return (ArrayList)sqlSession.selectList(Namespace+".selectAllGroup");
	}

	@Override
	public GroupDTO selectGroupByNum(String updateNum) throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.selectOne(Namespace+".selectGroupByNum", updateNum);
	}

	@Override
	public void updateGroup(GroupDTO groupDto) throws Exception {
		// TODO Auto-generated method stub
		sqlSession.update(Namespace+".updateGroup", groupDto);
	}

	@Override
	public String selectByGroupName(String groupName) throws Exception {
		// TODO Auto-generated method stub

		String result = "true"; 

		GroupDTO dto = sqlSession.selectOne(Namespace+".selectByGroupName", groupName);

		if (dto != null) {
			result = "false";
		}

		return result;
	}


	@Override
	public GroupDTO selectByGroupNum(String updateNum) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("update num : " + updateNum);
		GroupDTO dto = sqlSession.selectOne(Namespace+".selectByGroupNum", updateNum);
		return dto;
	}

	
	@Override
	public String deleteGroup(String num) throws Exception {
		// TODO Auto-generated method stub
		String result = "false";
		try {
			sqlSession.delete(Namespace+".deleteGroup", num);
			result = "true";
		} catch (Exception e) {
			// TODO: handle exception
			result = "false";
		}
		
		return result;
	}

}
