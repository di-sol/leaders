package com.leaders.service;

import java.util.ArrayList;

import javax.inject.Inject;

import org.springframework.stereotype.Repository;

import com.leaders.dao.GroupDAO;
import com.leaders.dto.GroupDTO;

@Repository 
public class GroupServiceImpl implements GroupService {

	@Inject
	private GroupDAO dao;

	@Override
	public String insertGroup(GroupDTO groupDto) throws Exception {
		// TODO Auto-generated method stub
		return dao.insertGroup(groupDto);
	}

	@Override
	public ArrayList<GroupDTO> selectAllGroup() throws Exception {
		// TODO Auto-generated method stub
		return dao.selectAllGroup();
	}

	@Override
	public GroupDTO selectGroupByNum(String updateNum) throws Exception {
		// TODO Auto-generated method stub
		return dao.selectGroupByNum(updateNum);
	}

	@Override
	public void updateGroup(GroupDTO groupDto) throws Exception {
		// TODO Auto-generated method stub
		dao.updateGroup(groupDto);
	}
	
	@Override
	public String selectByGroupName(String groupName) throws Exception {
		// TODO Auto-generated method stub
		return dao.selectByGroupName(groupName);
	}

	@Override
	public GroupDTO selectByGroupNum(String updateNum) throws Exception {
		// TODO Auto-generated method stub
		return dao.selectByGroupNum(updateNum);
	}


	@Override
	public String deleteGroup(String num) throws Exception {
		// TODO Auto-generated method stub
		return dao.deleteGroup(num);
	}


}
