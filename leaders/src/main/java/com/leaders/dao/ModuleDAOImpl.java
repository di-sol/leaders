package com.leaders.dao;

import java.util.ArrayList;
import java.util.HashMap;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.leaders.dto.ModuleDTO;

@Repository
public class ModuleDAOImpl implements ModuleDAO {
	
	@Inject
	private SqlSession sqlSession;
	
	private static final String Namespace = "com.leaders.mapper.moduleMapper";

	@Override
	public String insertModule(ModuleDTO module) throws Exception {
		// TODO Auto-generated method stub
		String result = "false";
		System.out.println(module.toString());
		try {
			sqlSession.insert(Namespace+".insertModule", module);
			result = "true";
		} catch (Exception e) {
			e.printStackTrace();
			result = "false";
		}

		return "true";
	}

	@Override
	public ArrayList<ModuleDTO> selectAllModule() throws Exception {
		// TODO Auto-generated method stub
		return (ArrayList) sqlSession.selectList(Namespace+".selectAllModule");
	}

	@Override
	public ModuleDTO selectModuleByNum(String updateNum) throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.selectOne(Namespace+".selectModuleByNum", updateNum);
	}

	@Override
	public void updateModule(ModuleDTO moduleDto) throws Exception {
		// TODO Auto-generated method stub
		sqlSession.update(Namespace+".updateModule", moduleDto);
	}

	@Override
	public String updateMultiModuleStatus(String moduleNumbersSqlString, String moduleStatus) throws Exception {
		// TODO Auto-generated method stub
		
		HashMap<String, String> data = new HashMap<String, String>();
		data.put("moduleNumbersSqlString", moduleNumbersSqlString);
		data.put("moduleStatus", moduleStatus);
		
		System.out.println(moduleNumbersSqlString + " , " + moduleStatus);
		try {
			sqlSession.update(Namespace+".updateMultiModuleStatus",data);
			return "true";
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return "false";
		}
	}
	

}
