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
  	<jsp:include page="/WEB-INF/views/sidemenu.jsp"></jsp:include>
	<!-- /////////////////////////////////////////////////////// -->
        <!-- header header  -->
        <!-- Page wrapper  -->
        <div class="page-wrapper">
            <!-- Bread crumb -->
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h3 class="text-primary">Module</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Setting</a></li>
                        <li class="breadcrumb-item active">Module</li>
                    </ol>
                </div>
            </div>
            <!-- End Bread crumb -->
            
            
            <div class="container">
            	<div class="row">
            		<button type="button" class="btn btn-primary" onclick="opentool()"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;Insert</button>&nbsp;
            		<button type="button" class="btn btn-primary"><i class="fa fa-wrench" aria-hidden="true"></i>&nbsp;&nbsp;Update</button>&nbsp;
            		<button type="button" class="btn btn-primary"><i class="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;Delete</button>&nbsp;
            		<button type="button" class="btn btn-primary" onclick="location.reload()"><i class="fa fa-refresh" aria-hidden="true"></i>&nbsp;&nbsp;Refresh</button>&nbsp;
            	</div>
            	
            	<form action="<%=cp %>/admin/addLicense" method="post">
            		<div id="licenseTool" style="display:none;padding: 10 10 10 10;margin: 10 0 10 0;border: outset;">
            			<div style="width:30%;">
            				<div style="width:90%;">
            				<label>Model</label><input type="text" placeholder="Model" name="licenseName" style="width:100%;"/>
            				</div>
            				<div style="width:90%; margin-top:10px;">
            				<label>Verison</label><input type="text" placeholder="Verison" name="licenseNumber" style="width:100%;"/>
            				</div>
            			</div>
						<div style="width:30%;">
							<div style="width:90%;">
							<label>Install Date</label><input type="date" name="startDay" style="width:100%;"/>
							</div>
							<div style="width:90%; margin-top:10px;">
							<label>Expiration Date</label><input type="date" name="endDay" style="width:100%;" onchange="checkEndDay();"/>
							</div>	    
						</div>
						<div style="width:30%;">
							<div style="width:90%;">
							<label>Status</label>
            				<select name="licenseStatus" style="width:100%;">
            					<option selected value="선택...">-- Select --</option>
							    <option value="등록">등록</option>
								<option value="사용중">사용중</option>
								<option value="정지">정지</option>
								<option value="만료">만료</option>
							</select>	
							</div>
							<div style="width:90%; margin-top:30px; display:flex;"> 
		                    <input type="submit" value="등록" class="btn btn-primary" style="width:50%;" name="addLicenseBtn" onclick="return addLicenseMethod();"/> 
		                    <input type="button" value="취소" class="btn btn-primary" style="width:50%; float:right; margin-left:10px;" onclick="cancelInput();"/>
		                    </div>
		                 </div>
		             </div>
		             <input type="hidden" value="" name="modifyNum" /> <!-- 이 값 유무에 따라서 신규등록인지 수정인지 구분 -->
		          </form>
            	
            	
            	
            	
            	
            	
            	
            	
            	
	            <div class="row">
            		<div class="col">
	            	<table id="ModuleTable" class="display nowrap table table-hover table-bordered" cellspacing="0" width="100%">
						<thead class="table-success">
				    		<tr>
				    			<th width="3%"></th>
				    			<th width="17%">Model</th>
				    			<th width="20%">Version</th>
				    			<th width="20%">Install Date</th>
				    			<th width="20%">Expiration Date</th>
				    			<th width="20%">Status</th>
				    		</tr>
			    		</thead>
			    		<c:forEach  var="memberlist" items="${memberlist}" >
				    		<tr>
				    			<td></td>
				    			<td></td>
				    			<td></td>
				    			<td></td>
				    			<td></td>
				    		</tr>
				   		</c:forEach>
					</table>
					</div>
				</div>
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
    
    var table = $('#ModuleTable').DataTable({
		'order': [0, 'desc'],
		"bInfo" : false,
    });
    
    function opentool(){
    	$("#licenseTool").css("display","flex");
    }
    
    </script>

</body>
</html>