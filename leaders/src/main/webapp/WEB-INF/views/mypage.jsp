<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
	String cp = request.getContextPath();
	request.setCharacterEncoding("UTF-8");
%>
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
    <%-- <link rel="icon" type="image/png" sizes="16x16" href="<%=cp %>/resources/images/favicon.png"> --%>
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
	
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:** -->
    <!--[if lt IE 9]>
    <script src="https:**oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https:**oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->

</head>

<!-- dto 변수 설정 -->
<c:set var="userName" value="${MemberDTO.userName == null || empty MemberDTO.userName ? '' : MemberDTO.userName}" />
<c:set var="userId" value="${MemberDTO.userId == null || empty MemberDTO.userId ? '' : MemberDTO.userId}" />
<c:set var="userEmail" value="${MemberDTO.userEmail == null || empty MemberDTO.userEmail ? '' : MemberDTO.userEmail}" />
<c:set var="userPhone" value="${MemberDTO.userPhone == null || empty MemberDTO.userPhone ? '' : MemberDTO.userPhone}" />
<c:set var="userGender" value="${MemberDTO.userGender == null || empty MemberDTO.userGender ? '' : MemberDTO.userGender}" />
<c:set var="joinDate" value="${MemberDTO.joinDate == null || empty MemberDTO.joinDate ? '' : MemberDTO.joinDate}" />



<body class="fix-header fix-sidebar">
    <!-- Preloader - style you can find in spinners.css -->
    <div class="preloader">
        <svg class="circular" viewBox="25 25 50 50">
			<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /> </svg>
    </div>
    <!-- Main wrapper  -->
    <div id="main-wrapper">
    
    
	<!-- /////////////////////////////////////////////////////// -->
  	<!-- NAVIGATION MENU -->	
  	<jsp:include page="sidemenu.jsp"></jsp:include>
	<!-- /////////////////////////////////////////////////////// -->
        <!-- header header  -->
        <!-- Page wrapper  -->
        <div class="page-wrapper">
            <!-- Bread crumb -->
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h3 class="text-primary">Mypage</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                        <c:if test="${isadmin eq 0}"><a href="mypage">Mypage</a></c:if>
                        <c:if test="${isadmin eq 1}"><a href="#">Mypage</a></c:if>
                        </li>
                    </ol>
                </div>
            </div>
            <!-- End Bread crumb -->
            
           	<div class="container text-center">
           	<br>
           	<h1>Mypage</h1>
           	<br> 
           		<div class="row justify-content-md-center" style=" height: 60%;">
			            <table class="table" style="magin:auto;text-align:center;">
						  <thead class="thead-light">
						    <tr>
								<td width="30%">Name</td>
								<td width="70%">${userName}</td>
							</tr>
						  </thead>
						  <tbody class="text-center"> 
						  <tr>
								<td>Id</td>
								<td>${userId}</td>
							</tr>	
							<tr>
								<td>Email</td>
								<td>${userEmail}</td>
							</tr>	
							<tr>
						    	<td>Phone</td>
								<td>${userPhone}</td>
							</tr>
						    <tr>
								<td>Gender</td>
								<td>${userGender}</td>
							</tr>
							<tr>
								<td>JoinDate</td>
								<td>${joinDate}</td>
							</tr>
						  </tbody>
						</table>
					</div>
				<c:if test="${isadmin eq 0}">
					<input type="button" class="btn btn-primary btn-flat m-b-30 m-t-30" value="개인정보 수정" onclick="updatemember()">
					<input type="button" class="btn btn-primary btn-flat m-b-30 m-t-30" value="비밀번호 변경" onclick="updatepw()">
					<input type="button" class="btn btn-primary btn-flat m-b-30 m-t-30" value="탈퇴" onclick="deletemember()">
				</c:if>
				
				<input type="hidden" name="userName" value="${userName}"/>
				<input type="hidden" name="userId" value="${userId}"/>
				<input type="hidden" name="userEmail" value="${userEmail}"/>
				<input type="hidden" name="userPhone" value="${userPhone}"/>
				<input type="hidden" name="userGender" value="${userGender}"/>
				<input type="hidden" name="joinDate" value="${joinDate}"/>
            </div>

            <!-- End Container fluid  -->
            <!-- footer -->
            <footer class="footer"> © 2018 All rights reserved. <a href="http://leaderssys.com/" target="_blank">[주]리더스시스템즈</a></footer>
            <!-- End footer -->
        </div>
        <!-- End Page wrapper  -->
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
    
    <!-- newAlarmModal 이랑 겹쳐서 에러 남 , 그래서 주석 처리함 나중에 필요하면 로직 수정해야됨. -->
    <%-- <script src="<%=cp %>/resources/js/lib/calendar-2/semantic.ui.min.js"></script> --%>
    
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
       	function updatemember(){
       		location.href = "<%=cp %>/updateuserinfo";
       	}
       	function updatepw(){
       		location.href = "<%=cp %>/updatepw";
       	}
   		function deletemember(){
    		 if(confirm("관련된 모든 정보가 삭제됩니다.\n탈퇴하시겠습니까?") == true){
				 $.ajax({
						url:'<%=cp%>/modifypw',
						type:'POST',
						dataType:'text',
						data:{"userId":"${userId}"},
						success:function(data){
							alert("변경되었습니다.");
							location.href = "<%=cp %>/";
			   			}
					});
				 }else{
					 return;
				 }
    	}
    </script>

</body>
</html>