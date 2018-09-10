package com.leaders.app;


import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Locale;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.leaders.dto.ModuleDTO;
import com.leaders.service.MemberService;
import com.leaders.service.ModuleService;

/**	
 * Handles requests for the application home page.
 */
@Controller
public class MainController {
	
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@Inject
	MemberService member_service;
	
	@Inject
	ModuleService module_service;

	@RequestMapping(value = "/Setting/Module", method = RequestMethod.GET)
	public String Module(Locale locale, Model model) throws Exception {
		
		logger.info("MainController - Module");
		
		ArrayList<ModuleDTO> moduleList = module_service.selectAllModule();
		
		// System.out.println(moduleList);
		
		model.addAttribute("moduleList", moduleList);
		
		return "/Setting/Module";
	}
	
	@RequestMapping(value = "/Setting/addModule", method = RequestMethod.POST)
	public String addModule(Locale locale, Model model, HttpServletRequest request, ModuleDTO moduleDto) throws Exception {
		
		logger.info("MainController - addModule");
		
		String updateNum = request.getParameter("updateNum");
		
		try {
			if (updateNum == null || updateNum.trim().equals("")) { // modify number 가 없으면 신규등록
				module_service.insertModule(moduleDto);
				System.out.println("신규");
				
			} else {
				moduleDto.setModuleNum(Integer.parseInt(updateNum)); // 수정할 넘버 넣어주기
				module_service.updateModule(moduleDto);
				System.out.println("update num : " + updateNum);
			}

		} catch (Exception e) {
			e.printStackTrace();

		}

		return "redirect:/Setting/Module";
	}
	
	@RequestMapping(value = "/Setting/getModuleData", method = RequestMethod.POST)
	public void deleteModule(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response, ModuleDTO moduleDto) throws Exception {
		
		logger.info("MainController - getModuleData");
		
		String updateNum = request.getParameter("updateNum");
		
		System.out.println("update num : " + updateNum);
		
		ModuleDTO dto = null;
		 
		try {
			dto = module_service.selectModuleByNum(updateNum);
			System.out.println(dto.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}

		JSONObject outputObject = new JSONObject();
		outputObject.put("model", dto.getModel());
		outputObject.put("version", dto.getVersion());
		outputObject.put("installDate", dto.getInstallDate());
		outputObject.put("expirationDate", dto.getExpirationDate());
		outputObject.put("status", dto.getStatus());

		// ajax로 받는 데이터에서 한글 깨져서, <% %>안에 똑같이 써줬는데 무용지물이었음 이미 로드된 데이터에 삽입하는거라서 그런가봄
		response.setCharacterEncoding("UTF-8");

		PrintWriter out = response.getWriter();
		out.print(outputObject);
		out.flush();
		out.close();
	}
	
	@RequestMapping(value = "/Setting/changeModuleStatusMulti", method = RequestMethod.POST)
	public void changeModuleStatusMulti(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response, ModuleDTO moduleDto) throws Exception {
		
		logger.info("MainController - changeModuleStatusMulti");
		
		String moduleNumbers = request.getParameter("moduleNumbers");
		String moduleStatus = request.getParameter("moduleStatus");
		
		System.out.println("moduleNumbers : " + moduleNumbers);
		System.out.println("moduleStatus : " + moduleStatus);
		
		String moduleNumbersSqlString = moduleNumbers.replace(",", "' or moduleNum = '");
		moduleNumbersSqlString = "'" + moduleNumbersSqlString + "'";

		System.out.println("moduleNumbersSqlString : " + moduleNumbersSqlString);

		PrintWriter out = response.getWriter();
		String output = module_service.updateMultiModuleStatus(moduleNumbersSqlString, moduleStatus);
		out.print(output);
		out.flush();
		out.close();
		
	}
	
}
