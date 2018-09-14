package com.leaders.dao;

import java.util.ArrayList;

import com.leaders.dto.GroupDTO;

public interface GroupDAO {
	
	public String insertGroup(GroupDTO groupDto) throws Exception;
	public ArrayList<GroupDTO> selectAllGroup() throws Exception;
	public GroupDTO selectGroupByNum(String updateNum) throws Exception;
	public void updateGroup(GroupDTO groupDto) throws Exception;
	
	public String selectByGroupName(String groupName) throws Exception; 
	public GroupDTO selectByGroupNum(String updateNum) throws Exception;
	
	public String deleteGroup(String num) throws Exception;

}
