<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html;" pageEncoding="UTF-8" %>
<%
	String cp = request.getContextPath();
	request.setCharacterEncoding("UTF-8");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Favicon icon -->
    <link rel="icon" type="image/x-icon" sizes="16x16" href="<%=cp %>/resources/images/favicon.ico">
    <title>LEADERS</title>
	<link href="<%=cp %>/resources/css/lib/owl.carousel.min.css" rel="stylesheet" />
    <link href="<%=cp %>/resources/css/lib/owl.theme.default.min.css" rel="stylesheet" />
    <!-- Bootstrap Core CSS -->
    <link href="<%=cp %>/resources/css/lib/bootstrap/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="<%=cp %>/resources/css/helper.css" rel="stylesheet">
    <link href="<%=cp %>/resources/css/style.css" rel="stylesheet">
    <link href="<%=cp %>/resources/css/lib/calendar2/pignose.calendar.min.css" rel="stylesheet">
    <link href="<%=cp %>/resources/css/lib/calendar2/semantic.ui.min.css" rel="stylesheet">
	<link href="<%=cp %>/resources/css/lib/sweetalert/sweetalert.css" rel="stylesheet">
	
</head>
<body class="fix-header fix-sidebar">
   <div class="header">
            <nav class="navbar top-navbar navbar-expand-md navbar-light">
                <!-- Logo -->
                <div class="navbar-header">
                    <a class="navbar-brand" href="<%=cp %>/">
                        <span><!-- <img src="" alt="TU cloud" class="dark-logo" /> -->LEADERS</span>
                    </a>
                </div>
            </nav>
        </div>
    <!-- Main wrapper  -->
    <div id="main-wrapper">
    
    	<div class="unix-login">
	            <div class="container-fluid">
	                <div class="row justify-content-center">
	                    <div class="col-lg-8">
	                        <div class="login-content card">
	                            <div class="login-form">
	                                <h4 style="margin-bottom: 20px;">가입하기</h4>
	                                <label style="color:#0000FF; font-size:5px;">(*)는 필수 입력 사항 입니다.</label>
	                               
	                               
	                               
	                               
	                               
	                                <form action="<%=cp%>/adduser" method="POST">
		                                <div class="row">
			                                <div class="col-lg-6">
			                                    <div class="form-group">
			                                        <label>이름(*)</label>
			                                        <input type="text" class="form-control" placeholder="이름" name="userName">
			                                    </div>
			                                    <div class="form-group">
			                                        <label>비밀번호(* <span style="font-size:10px; color:red;">8자리 이상</span>)</label><label id="userPwdLabel" style="float: right;"></label>
			                                        <input type="password" class="form-control" placeholder="비밀번호" name="userPwd" onkeyup="checkUserPwdMethod();">
			                                    </div>
			                                  	<div class="form-group">
			                                        <label>이메일(*)</label>
			                                        <input type="email" class="form-control" placeholder="이메일" name="userEmail">
			                                    </div>
			                                    <div class="form-group">
			                                        <label>성별(*)</label> 
			                                        <label><input type="radio" name="userGender" value="남자" onclick="selectGender();">&nbsp;남자</label>
			                                        <label><input type="radio" name="userGender" value="여자" onclick="selectGender();">&nbsp;여자</label>
			                                        <label id="genderSelectLabel" style="float:right; color:red;">선택 안됨</label>
			                                    </div>
			                              	</div>
			                              	
			                            	<div class="col-lg-6">
			                            	  <div class="form-group">
			                                        <label>ID(*)</label>
			                                        <a style="margin-left:10px;" onclick="checkUserId();">
			                                        	<label style="color:red; cursor:pointer;">ID중복체크</label>
			                                        </a>
			                                        <label id="userIdLabel" style="float: right;"></label>
			                                        <input type="text" class="form-control" placeholder="아이디" name="userId" ><!-- onkeyup="checkUserId();"> -->
			                                    </div>
			                                   <div class="form-group">
			                                        <label>비밀번호 재확인(*)</label><label id="pwdAgainLabel" style="float: right;"></label>
			                                        <input type="password" class="form-control" placeholder="비밀번호 확인" name="pwdAgain" onkeyup="checkPwdAgainMethod();">
			                                    </div>
			                                    <div class="form-group">
			                                        <label>연락처(*)</label><br>
											        <input type="text" class="form-control" name="userPhone1" style="display:inline; width:32%;"/>
											        <input type="text" class="form-control" name="userPhone2" style="display:inline; width:32%;"/>
											        <input type="text" class="form-control" name="userPhone3" style="display:inline; width:33%;"/>
											        <input type="hidden" name="userPhone"/> <!-- js로 값넣고 controller로 넘김 -->
			                                    </div>  
			                                    <div class="checkbox">
			                                        <label>
														<input type="checkbox" name="termcheck" onclick="selectTerm();"> 약관 정책 동의하기(*)
													</label>
													<label id="termSelectLabel" style="float:right; color:red;  text-transform: uppercase;">선택 안됨</label>
			                                    </div>			                                    	                                                                        
			                              	</div>
		                               	</div>
	
	                                    <button type="submit" class="btn btn-primary btn-flat m-b-30 m-t-30" onclick="return inputcheck()">가입하기</button>
	                                    <div class="register-link m-t-15 text-center">
	                                        <p>계정이 있으신가요? <a href="<%=cp %>/"> 로그인하기</a></p>
	                                    </div>
	                                </form>
	                                
	                                
	                                
	                                
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
            <!-- footer -->
            <footer class="footer"> © 2018 All rights reserved. <a href="http://leaderssys.com/" target="_blank">[주]리더스시스템즈</a></footer>
            <!-- End footer -->
    </div>
    <!-- End Wrapper -->
    <!-- All Jquery -->
    <script src="<%=cp %>/resources/js/lib/jquery/jquery.min.js"></script>
    <!-- Bootstrap tether Core JavaScript -->
    <script src="<%=cp %>/resources/js/lib/bootstrap/js/popper.min.js"></script>
    <script src="<%=cp %>/resources/js/lib/bootstrap/js/bootstrap.min.js"></script>
    <!-- slimscrollbar scrollbar JavaScript -->
    <script src="<%=cp %>/resources/js/jquery.slimscroll.js"></script> 
    <!--Menu sidebar -->
    <script src="<%=cp %>/resources/js/sidebarmenu.js"></script>
    <!--stickey kit -->
    <script src="<%=cp %>/resources/js/lib/sticky-kit-master/dist/sticky-kit.min.js"></script>
      
    <script src="<%=cp %>/resources/js/lib/weather/jquery.simpleWeather.min.js"></script>
    <script src="<%=cp %>/resources/js/lib/weather/weather-init.js"></script>
    <script src="<%=cp %>/resources/js/lib/owl-carousel/owl.carousel.min.js"></script>
    <script src="<%=cp %>/resources/js/lib/owl-carousel/owl.carousel-init.js"></script>
    <!--Custom JavaScript -->
    <script src="<%=cp %>/resources/js/custom.min.js"></script>
    
    <script src="<%=cp %>/resources/js/lib/calendar-2/moment.latest.min.js"></script>
    <!-- scripit init-->
    
    <!-- scripit init-->
    <script src="<%=cp %>/resources/js/lib/calendar-2/prism.min.js"></script>
    <!-- scripit init-->
    <script src="<%=cp %>/resources/js/lib/calendar-2/pignose.calendar.min.js"></script>
    <!-- scripit init-->
    <script src="<%=cp %>/resources/js/lib/calendar-2/pignose.init.js"></script>

    <!-- Chart Js include -->
    <script src="<%=cp %>/resources/js/lib/chart-js/Chart.bundle.js"></script>
 
    <script src="<%=cp %>/resources/js/lib/sweetalert/sweetalert2.all.js"></script>
    
    <!-- data table -->
    <script src="<%=cp %>/resources/js/lib/datatables/datatables.min.js"></script>
	<script src="<%=cp %>/resources/js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/dataTables.buttons.min.js"></script>
	<script src="<%=cp %>/resources/js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.flash.min.js"></script>
	<script src="<%=cp %>/resources/js/lib/datatables/cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"></script>
	<script src="<%=cp %>/resources/js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/pdfmake.min.js"></script>
	<script src="<%=cp %>/resources/js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/vfs_fonts.js"></script>
	<script src="<%=cp %>/resources/js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.html5.min.js"></script>
	<script src="<%=cp %>/resources/js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.print.min.js"></script>
	<script src="<%=cp %>/resources/js/lib/datatables/datatables-init.js"></script>
    
    <script type="text/javascript">
    var isValidUserId = false;  
	var isValidUserPwd = false;
	var isValidPwdAgain = false;
	var isValidSelectGender = false;
	var isValidSelectTerm = false;
	
	function checkUserPwdMethod() {
		// 일단은 8자 이상이면 pass 추후 협의해야됨
		if ($("input[name='userPwd']").val().length >= 8) {
			// 8자 이상이면 pass
			$("#userPwdLabel").css("color","green");
			$("#userPwdLabel").text("보안성 체크 완료!");
			isValidUserPwd = true;
		} else {
			$("#userPwdLabel").css("color","red");
			$("#userPwdLabel").text("보안성 약함!");
			isValidUserPwd = false;
			
			// 새로 입력하면 again도 false 로,  			
			$("#pwdAgainLabel").css("color","red");
			$("#pwdAgainLabel").text("불일치!");
			isValidPwdAgain = false;			
		}
		checkPwdAgainMethod();
	}
	
	function checkPwdAgainMethod() {
		// 비밀번호 확인
		if ($("input[name='userPwd']").val() == $("input[name='pwdAgain']").val()){
			$("#pwdAgainLabel").css("color","green");
			$("#pwdAgainLabel").text("일치!");
			isValidPwdAgain = true;
		} else {
			$("#pwdAgainLabel").css("color","red");
			$("#pwdAgainLabel").text("불일치!");
			isValidPwdAgain = false;
		}
	}
	
	function selectGender() {
		isValidSelectGender = true;
		$("#genderSelectLabel").css("color","green");
		$("#genderSelectLabel").text("선택 완료");
	}
	
	function selectTerm() {
		if (!isValidSelectTerm) {
			isValidSelectTerm = true;
			$("#termSelectLabel").css("color","green");
			$("#termSelectLabel").text("선택 완료");
		} else {
			isValidSelectTerm = false;
			$("#termSelectLabel").css("color","red");
			$("#termSelectLabel").text("선택 안됨");
		}
	}
	
	function inputcheck(){
		if (confirm("입력하신 정보로 회원가입 하시겠습니까?") == true){
			userPhone = $("input[name='userPhone1']").val() + "\t" + $("input[name='userPhone2']").val() + "\t" + $("input[name='userPhone3']").val();
			$("input[name='userPhone']").val(userPhone);
	
			if($("input[name='userName']").val() == null || $("input[name='userName']").val() == ""){
				alert("이름은 필수 입력 사항입니다.");
				$("input[name='userName']").focus();
				return false;
			}
			if($("input[name='userId']").val() == null || $("input[name='userId']").val() == ""){
				alert("사용하실 ID를 입력하세요");
				$("input[name='userId']").focus();
				return false;
			}
			if (!isValidUserPwd) {
				alert("비밀번호가 보안이 취약합니다. 8자 이상으로 해주세요");
				$("input[name='userPwd']").focus();
				$("input[name='userPwd']").val("");
				$("#userPwdLabel").text("");
				$("input[name='pwdAgain']").val(""); 
				$("#pwdAgainLabel").text(""); 
				return false;
			}
			if (!isValidPwdAgain) {
				alert("비밀번호가 일치하지 않습니다.");
				$("input[name='pwdAgain']").focus();
				$("input[name='pwdAgain']").val("");
				$("#pwdAgainLabel").text("");
				return false;
			}
			if($("input[name='userEmail']").val() == null || $("input[name='userEmail']").val() == ""){
				alert("이메일을 입력하세요.");
				$("input[name='userEmail']").focus();
				return false;
			}
			if(check_email($("input[name='userEmail']").val())!=true){
				alert("올바른 email 형식이 아닙니다.");
				$("input[name='userEmail']").focus();
				return false;
			}
			
			if (!isValidUserId) {
				alert("아이디 중복체크를 확인 해주세요.");
				return false;
			}
			
			if($("input[name='userPhone1']").val() == null || $("input[name='userPhone1']").val() == ""){
				alert("연락처를 입력해주세요.");
				$("input[name='userPhone1']").focus();
				return false;
			}
			if($("input[name='userPhone2']").val() == null || $("input[name='userPhone2']").val() == ""){
				alert("연락처를 입력해주세요.");
				$("input[name='userPhone2']").focus();
				return false;
			}
			if($("input[name='userPhone3']").val() == null || $("input[name='userPhone3']").val() == ""){
				alert("연락처를 입력해주세요.");
				$("input[name='userPhone3']").focus();
				return false;
			}
			if (!isValidSelectGender) {
				alert("성별을 선택해 주세요");
				return false;
			}
			if (!isValidSelectTerm) {
				alert("약관 동의를 해주세요");
				return false;
			}
			if (!confirm("등록 하시겠습니까?\n*Email은 비밀번호 찾기에 이용됩니다.\n사용하시는 메일 주소를 입력 바랍니다.")){
				return false;
			}
			//create_namespace(namespace)
			$.ajax({
				url:'http://210.110.195.12:5000/create_namespace',
				type:'POST',
				dataType:'json',
				data:{"namespace":$("input[name='userId']").val()},	
				success:function(data){
					console.log(data);
					},
			});	
		}else{
			return false;
		}
	}
	
	//	Email check javascript
	function check_email(val){
	    if(!val.match(/\S+@\S+\.\S+/)){ // Jaymon's / Squirtle's solution
	        // Do something
	        return false;
	    }
	    if( val.indexOf(' ')!=-1 || val.indexOf('..')!=-1){
	        // Do something
	        return false;
	    }
	    return true;
	}
	
	function checkUserId(){
		$.ajax({
			url:'<%=cp%>/checkUserId',
			type:'POST',
			dataType:'text',
			data:{	"userId":$("input[name='userId']").val() },
			success:function(data){
				if (data == "true") {
					$("#userIdLabel").css("color","green");
					$("#userIdLabel").text("아이디 중복체크 완료!");
					isValidUserId = true;
				} else {
					$("#userIdLabel").css("color","red");
					$("#userIdLabel").text("중복됨!");
					isValidUserId = false;
				}
			},error:function(request, status, error){
   				alert(request+","+status+","+error);
				console.log(request+","+status+","+error);
				$("#userIdLabel").css("color","red");
				$("#userIdLabel").text("중복됨!");
				isValidUserId = false;
   			}
		});
	}
	
    </script>

</body>
</html>