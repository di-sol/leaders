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
                    <a class="navbar-brand" >
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
	                                <h4 style="margin-bottom: 20px;">비밀번호 변경</h4>
	                               
	                               
	                               
	                               
	                                <form action="<%=cp%>/updatepw" method="POST">
		                                <div class="row">
			                                <div class="col">
			                                	<div class="form-group">
			                                        <label>기존비밀번호 <a class="text-danger" style="color:#0000FF; font-size:5px;">*기존 비밀번호 오류시 변경되지않습니다.</a></label><label id="currentPwdLabel" style="float: right;"></label>
			                                        <input type="password" class="form-control" placeholder="비밀번호" name="currentPwd" onkeyup="checkCurrentPwdMethod();">
			                                    </div>
			                                    <div class="form-group">
			                                       <label>변경비밀번호(* <span style="font-size:10px; color:red;">8자리 이상</span>)</label><label id="userPwdLabel" style="float: right;"></label>
			                                        <input type="password" class="form-control" placeholder="비밀번호" name="userPwd" onkeyup="checkUserPwdMethod();">
			                                    </div>
			                                  	<div class="form-group">
			                                        <label>변경비밀번호(재입력)</label><label id="pwdAgainLabel" style="float: right;"></label>
			                                        <input type="password" class="form-control" placeholder="비밀번호 확인" name="pwdAgain" onkeyup="checkPwdAgainMethod();">
			                                    </div>
			                                    
			                              	</div>
		                               	</div>
										<div class="row">
											<div class="col-lg-6">
	                                    		<button type="button" class="btn btn-primary" onclick="return inputcheck()">확인</button>
	                                   	 	</div>
	                                   	 	<div class="col-lg-6">
	                                   	 		<button type="button" class="btn btn-primary" onclick="javascript:history.go(-1)">취소</button>
	                                		</div>
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
    
    var isValidUserPwd = false;
	var isValidPwdAgain = false;
	var isValidCurrentPwd = true; 
	
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
	
	function inputcheck(){
		if($("input[name='currentPwd']").val() == null || $("input[name='currentPwd']").val() == ""){
			alert("사용중인 비밀번호를 입력해주세요.");
			$("input[name='currentPwd']").focus();
			return false;
		}
		if (!isValidCurrentPwd) {
			alert("사용중인 비밀번호가 일치하지않습니다.");
			$("input[name='currentPwd']").focus();
			$("input[name='currentPwd']").val("");
			$("#currentPwdLabel").text("");
			return false;
		}
		if($("input[name='userPwd']").val() == null || $("input[name='userPwd']").val() == ""){
			alert("변경할 비밀번호를 입력해주세요.");
			$("input[name='userPwd']").focus();
			return false;
		}
		if (!isValidUserPwd) {
			alert("비밀번호가 보안이 취약합니다. 8자 이상으로 해주세요");
			$("input[name='userPwd']").focus();
			$("input[name='userPwd']").val("");
			$("#userPwdLabel").text("");
			return false;
		}
		if (!isValidPwdAgain) {
			alert("변경하실 비밀번호(재입력)을 확인해주세요.");
			$("input[name='pwdAgain']").focus();
			$("input[name='pwdAgain']").val("");
			$("#pwdAgainLabel").text("");
			return false;
		}

		if(confirm("비밀번호를 변경하시겠습니까?") == true){
			 $.ajax({
					url:'<%=cp%>/modifypw',
					type:'POST',
					dataType:'text',
					data:{"userPwd":$("input[name='userPwd']").val(),
						},
					success:function(data){
						alert("변경되었습니다.");
						location.href = "<%=cp %>/mypage";
		   			}
				});
			 }else{
				 return;
			 }
	}
	
	function checkCurrentPwdMethod(){
		$.ajax({
			url:'<%=cp%>/checkCurrentPwd',
			type:'POST',
			dataType:'text',
			data:{ "userPwd":$("input[name='currentPwd']").val() 
				},
			success:function(data){
				if (data == "true") {
					// 일치하면 통과
					console.log("현재 비밀번호 일치합니다.");
					$("#currentPwdLabel").css("color","green");
					$("#currentPwdLabel").text("일치!");
					isValidCurrentPwd = true;
				} else {
					$("#currentPwdLabel").css("color","red");
					$("#currentPwdLabel").text("불일치!");
					isValidCurrentPwd = false;
				}
			},error:function(request, status, error){
   				alert(request+","+status+","+error);
				console.log(request+","+status+","+error);
				$("#currentPwdLabel").css("color","red");
				$("#currentPwdLabel").text("불일치!");
				isValidCurrentPwd = false;
   			}
		});
	}
	
	
    </script>

</body>
</html>