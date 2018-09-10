package com.leaders.dao;

import java.util.ArrayList;

import com.leaders.dto.ModuleDTO;

public interface ModuleDAO {
	public String insertModule(ModuleDTO module) throws Exception;
	public ArrayList<ModuleDTO> selectAllModule() throws Exception;
	public ModuleDTO selectModuleByNum(String updateNum) throws Exception;
	public void updateModule(ModuleDTO moduleDto) throws Exception;
	public String updateMultiModuleStatus(String moduleNumbersSqlString, String moduleStatus) throws Exception;
	
}
