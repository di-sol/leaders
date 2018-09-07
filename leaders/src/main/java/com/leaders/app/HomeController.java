package com.leaders.app;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Locale;

import javax.inject.Inject;
import javax.mail.Session;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.leaders.dto.LoginVO;
import com.leaders.dto.MemberDTO;
import com.leaders.service.MemberService;
import com.mysql.fabric.Server;
import com.mysql.fabric.xmlrpc.base.Member;

/**	
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@Inject
	MemberService member_service;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) throws Exception {
		
		return "home";
	}
	@RequestMapping(value = "/signup", method = RequestMethod.GET)
	public String signup(Locale locale, Model model) throws Exception {
		
		return "signup";
	}
	@RequestMapping(value = "/adduser", method = RequestMethod.POST)
	public String adduser(HttpServletRequest request, Model model,MemberDTO member) throws Exception {
		
		member_service.insertMember(member);
		
		return "redirect:/";
	}
	@RequestMapping(value = "/checkUserId", method = RequestMethod.POST)
	public void checkUserId(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String userId = request.getParameter("userId");

		PrintWriter out = response.getWriter();
		String output = "";
		if (member_service.selectMemberId(userId) != null) {
			// 이건 값이 있으면 false
			output = "false";
		} else {
			// 이건 값이 없으면 true
			output = "true";
		}
		out.print(output);
		out.flush();
		out.close();
	}
	
	

	@RequestMapping(value = "/loginPost", method = RequestMethod.POST)
	public String loginPost(Model model, HttpServletRequest request, HttpServletResponse response, LoginVO vo,
			HttpSession session) throws Exception {
		if (member_service.selectMember(vo) != null) {
			
			MemberDTO dto = member_service.selectMember(vo);
			
			session.setAttribute("username", dto.getUserName());
			session.setAttribute("isadmin", dto.getIsAdmin());
			session.setAttribute("useremail", dto.getUserEmail());
			session.setAttribute("userid", dto.getUserId());


			member_service.insertLoginLog(dto.getUserId());
			return "redirect:/AIResources/GPUMonitor";
		} else {
			model.addAttribute("flag", "false");
			return "redirect:/";
		}
	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout(Model model, HttpSession session) throws Exception {
		session.setAttribute("username", null);
		session.setAttribute("isadmin", null);
		session.setAttribute("useremail", null);
		session.setAttribute("userid", null);
		
		session.invalidate();
		return "redirect:/";
	}

	@RequestMapping(value = "/updateuserinfo", method = RequestMethod.GET)
	public String updateuserinfo(HttpSession session, Model model) throws Exception {
		String userId = (String)session.getAttribute("userid");
		MemberDTO dto = member_service.selectMemberinfo(userId);
		model.addAttribute("MemberDTO", dto);
		
		String phone = dto.getUserPhone();
		
		String[] phoneArr = phone.split("\t");
		
		String userPhone1 = phoneArr.length < 1 ? "" : phoneArr[0];
		String userPhone2 = phoneArr.length < 2 ? "" : phoneArr[1];
		String userPhone3 = phoneArr.length < 3 ? "" : phoneArr[2];
		
		model.addAttribute("userPhone1", userPhone1);
		model.addAttribute("userPhone2", userPhone2);
		model.addAttribute("userPhone3", userPhone3);
		
		return "/updateuserinfo";
	}
	
	@RequestMapping(value = "/modifyuser", method = RequestMethod.POST)
	public String modifyuser(MemberDTO dto,HttpSession session, Model model) throws Exception {
		
		member_service.updateMember(dto);
		
		return "redirect:/mypage";
	}
	
	@RequestMapping(value = "/updatepw", method = RequestMethod.GET)
	public String updatepw(HttpSession session, Model model) throws Exception {
		
		return "/updatepw";
	}
	@RequestMapping(value = "/checkCurrentPwd", method = RequestMethod.POST)
	public void checkCurrentPwd(HttpSession session,HttpServletRequest request,HttpServletResponse response) throws Exception {
		String userId = (String)session.getAttribute("userid");
		String userPwd = request.getParameter("userPwd");
		
		PrintWriter out = response.getWriter();
		String output = "";
		
		if (member_service.selectMemberpw(userId, userPwd) == null) {
			output = "false";
		} else {
			output = "true";
		}
		
		out.print(output);
		out.flush();
		out.close();
	}
	@RequestMapping(value = "/modifypw", method = RequestMethod.POST)
	public void modifypw(HttpSession session, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String userId = (String)session.getAttribute("userid");
		String userPwd = request.getParameter("userPwd");
		
		member_service.updateMemberpw(userPwd, userId);
		
		PrintWriter out = response.getWriter();
		
		String output = null;
		
		out.print(output);
		out.flush();
		out.close();	
	}
	
	
	@RequestMapping(value = "/deletemember", method = RequestMethod.POST)
	public void deletemember(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String userId = request.getParameter("userId");
		member_service.Deletemember(userId);
		
		PrintWriter out = response.getWriter();
		
		String output = null;
		
		out.print(output);
		out.flush();
		out.close();	
	}
	
	
	
	@RequestMapping(value = "/mypage", method = RequestMethod.GET)
	public String mypage(HttpSession session, Model model) throws Exception {
		
		String userId = (String)session.getAttribute("userid");
		MemberDTO dto = member_service.selectMemberinfo(userId);
		model.addAttribute("MemberDTO", dto);
		
		return "mypage";
	}
	
	@RequestMapping(value = "/AIResources/GPUMonitor", method = RequestMethod.GET)
	public String GPUMonitor(Locale locale, Model model) throws Exception {
		
		return "/AIResources/GPUMonitor";
	}
	@RequestMapping(value = "/AIResources/GPUMonitorinfo", method = RequestMethod.GET)
	public String GPUMonitorinfo(Locale locale, Model model) throws Exception {
		
		return "/AIResources/GPUMonitorinfo";
	}
	@RequestMapping(value = "/AIResources/GPUservers", method = RequestMethod.GET)
	public String GPUservers(Locale locale, Model model) throws Exception {
		
		return "/AIResources/GPUservers";
	}
	
	@RequestMapping(value = "/AIApplications/SubmitTrainTasks", method = RequestMethod.GET)
	public String SubmitTrainTasks(Locale locale, Model model,HttpSession session) throws Exception {
		String userid = (String)session.getAttribute("userid");
		model.addAttribute("userid", userid);
		
		return "/AIApplications/SubmitTrainTasks";
	}
	
	@RequestMapping(value = "/AIApplications/SourcesApply", method = RequestMethod.GET)
	public String SourcesApply(Locale locale, Model model) throws Exception {
		
		return "/AIApplications/SourcesApply";
	}
	@RequestMapping(value = "/AIApplications/TasksManage", method = RequestMethod.GET)
	public String TasksManage(Locale locale, Model model) throws Exception {
		
		return "/AIApplications/TasksManage";
	}
	@RequestMapping(value = "/AIApplications/TasksCompleted", method = RequestMethod.GET)
	public String TasksCompleted(Locale locale, Model model) throws Exception {
		
		return "/AIApplications/TasksCompleted";
	}
	@RequestMapping(value = "/ImagesManage/ImagesManager", method = RequestMethod.GET)
	public String ImagesManage(Locale locale, Model model) throws Exception {
		
		return "/ImagesManage/ImagesManager";
	}
	@RequestMapping(value = "/FeatureMonitor/teyeMonitor", method = RequestMethod.GET)
	public String teyeMonitor(Locale locale, Model model) throws Exception {
		
		
		
		
		return "/FeatureMonitor/teyeMonitor";
	}
	@RequestMapping(value = "/FeatureMonitor/teyeExport", method = RequestMethod.GET)
	public String teyeExport(Locale locale, Model model) throws Exception {
		
		return "/FeatureMonitor/teyeExport";
	}
	@RequestMapping(value = "/Alarm/AlarmThreshold", method = RequestMethod.GET)
	public String AlarmThreshold(Locale locale, Model model) throws Exception {
		
		return "/Alarm/AlarmThreshold";
	}
	@RequestMapping(value = "/Alarm/AlarmSetting", method = RequestMethod.GET)
	public String AlarmSetting(Locale locale, Model model) throws Exception {
		
		return "/Alarm/AlarmSetting";
	}
	@RequestMapping(value = "/Alarm/AlarmInfo", method = RequestMethod.GET)
	public String AlarmInfo(Locale locale, Model model) throws Exception {
		
		return "/Alarm/AlarmInfo";
	}
	@RequestMapping(value = "/Report/Account/AccountConfig", method = RequestMethod.GET)
	public String AccountConfig(Locale locale, Model model) throws Exception {
		
		return "/Report/Account/AccountConfig";
	}
	@RequestMapping(value = "/Report/Account/BillReport", method = RequestMethod.GET)
	public String BillReport(Locale locale, Model model) throws Exception {
		
		return "/Report/Account/BillReport";
	}
	@RequestMapping(value = "/Report/Account/PayManage", method = RequestMethod.GET)
	public String PayManage(Locale locale, Model model) throws Exception {
		
		return "/Report/Account/PayManage";
	}
	@RequestMapping(value = "/Report/ClusterReport", method = RequestMethod.GET)
	public String ClusterReport(Locale locale, Model model) throws Exception {
		
		return "/Report/ClusterReport";
	}
	
	
	@RequestMapping(value = "/SystemManage/User", method = RequestMethod.GET)
	public String User(Locale locale, Model model) throws Exception {
		logger.info("user");
		
		ArrayList<MemberDTO> memberlist = member_service.memberlist();
		model.addAttribute("memberlist", memberlist);
		
		return "/SystemManage/User";
	}
	
	
	@RequestMapping(value = "/SystemManage/Group", method = RequestMethod.GET)
	public String Group(Locale locale, Model model) throws Exception {
		
		return "/SystemManage/Group";
	}
	@RequestMapping(value = "/SystemManage/Queue", method = RequestMethod.GET)
	public String Queue(Locale locale, Model model) throws Exception {
		
		return "/SystemManage/Queue";
	}
	@RequestMapping(value = "/SystemManage/Shell", method = RequestMethod.GET)
	public String Shell(Locale locale, Model model) throws Exception {
		
		return "/SystemManage/Shell";
	}
	@RequestMapping(value = "/Tools/File", method = RequestMethod.GET)
	public String File(Locale locale, Model model) throws Exception {
		
		return "/Tools/File";
	}
	@RequestMapping(value = "/Setting/Module", method = RequestMethod.GET)
	public String Module(Locale locale, Model model) throws Exception {
		
		return "/Setting/Module";
	}
}
