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
	                                <h4 style="margin-bottom: 20px;">수정하기</h4>
	                               
	                               
	                               
	                               
	                                <form action="<%=cp%>/modifyuser" method="POST">
		                                <div class="row">
			                                <div class="col-lg-6">
			                                	<div class="form-group">
			                                        <label>아이디</label>
			                                        <input type="text" class="form-control" value="${MemberDTO.userId}" readonly>
			                                    </div>
			                                    <div class="form-group">
			                                        <label>이름</label>
			                                        <input type="text" class="form-control" name="userName" value="${MemberDTO.userName}">
			                                    </div>
			                                  	<div class="form-group">
			                                        <label>이메일</label>
			                                        <input type="email" class="form-control" name="userEmail" value="${MemberDTO.userEmail}">
			                                    </div>
			                                    
			                              	</div>
			                              	
			                            	<div class="col-lg-6">
			                            		<div class="form-group">
			                                        <label>가입날짜</label>
			                                        <input type="text" class="form-control" value="${MemberDTO.joinDate}" readonly>
			                                    </div>
			                                    <div class="form-group">
			                                        <label>연락처</label><br>
											        <input type="text" class="form-control" name="userPhone1" style="display:inline; width:32%;" value="${userPhone1}"/>
											        <input type="text" class="form-control" name="userPhone2" style="display:inline; width:32%;" value="${userPhone2}"/>
											        <input type="text" class="form-control" name="userPhone3" style="display:inline; width:33%;" value="${userPhone3}"/>
											        <input type="hidden" name="userPhone"/> <!-- js로 값넣고 controller로 넘김 -->
			                                    </div>
			                                    <div class="form-group">
			                                        <label>성별</label> 
			                                        <c:choose> 
				                                        <c:when test="${MemberDTO.userGender eq '남자'}">
				                                        	<label><input type="radio" name="userGender" value="남자" checked="checked">&nbsp;남자</label>
				                                        	<label><input type="radio" name="userGender" value="여자">&nbsp;여자</label>
				                                        </c:when>
				                                        <c:otherwise>
				                                        	<label><input type="radio" name="userGender" value="남자">&nbsp;남자</label>
				                                        	<label><input type="radio" name="userGender" value="여자" checked="checked">&nbsp;여자</label> 
				                                        </c:otherwise>
			                                        </c:choose>
			                                    </div> 			                                    	                                                                        
			                              	</div>
		                               	</div>
										<div class="row">
											<div class="col-lg-6">
	                                    		<button type="submit" class="btn btn-primary" onclick="return inputcheck()">수정하기</button>
	                                   	 	</div>
	                                   	 	<div class="col-lg-6">
	                                   	 		<button type="button" class="btn btn-primary" onclick="javascript:history.go(-1)">돌아가기</button>
	                                		</div>
	                                	</div>
	                                	<input type="hidden" name="userId" value="${MemberDTO.userId}"/>
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
	
	function inputcheck(){
		// 번호 합치기
		userPhone = $("input[name='userPhone1']").val() + "\t" + $("input[name='userPhone2']").val() + "\t" + $("input[name='userPhone3']").val();
		// 합쳐진 번호를 input hidden에 대입(DB로 넘기기 위함)
		$("input[name='userPhone']").val(userPhone);
		
		if($("input[name='userName']").val() == null || $("input[name='userName']").val() == ""){
			alert("이름을 입력하세요.");
			$("input[name='userName']").focus();
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
		if (!confirm("수정 하시겠습니까?\n*Email은 비밀번호 찾기에 이용됩니다.\n사용하시는 메일 주소를 입력 바랍니다.")){
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
	
    </script>

</body>
</html>