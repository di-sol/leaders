package com.leaders.service;

import java.util.ArrayList;

import javax.inject.Inject;

import org.springframework.stereotype.Repository;

import com.leaders.dao.ModuleDAO;
import com.leaders.dto.ModuleDTO;

@Repository 
public class ModuleServiceImpl implements ModuleService {

	@Inject
	private ModuleDAO dao;

	@Override
	public String insertModule(ModuleDTO module) throws Exception {
		// TODO Auto-generated method stub
		return dao.insertModule(module);
	}

	@Override
	public ArrayList<ModuleDTO> selectAllModule() throws Exception {
		// TODO Auto-generated method stub
		return dao.selectAllModule();
	}

	@Override
	public ModuleDTO selectModuleByNum(String updateNum) throws Exception {
		// TODO Auto-generated method stub
		return dao.selectModuleByNum(updateNum);
	}

	@Override
	public void updateModule(ModuleDTO moduleDto) throws Exception {
		// TODO Auto-generated method stub
		dao.updateModule(moduleDto);
	}

	@Override
	public String updateMultiModuleStatus(String moduleNumbersSqlString, String moduleStatus) throws Exception {
		// TODO Auto-generated method stub
		return dao.updateMultiModuleStatus(moduleNumbersSqlString, moduleStatus);
	}

}
