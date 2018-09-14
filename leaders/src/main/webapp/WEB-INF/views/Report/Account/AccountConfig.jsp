<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
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

<style>

.EditTool {
		display: none; 
		padding: 10 10 10 10; 
		border: outset;
	}
	

</style>

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
                    <h3 class="text-primary">AccountConfig</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Report</a>
                        <li class="breadcrumb-item">Account</li>
                        <li class="breadcrumb-item active">AccountConfig</li>
                    </ol>
                </div>
            </div>
            <!-- End Bread crumb -->
          
          <div class="container">
            	<div class="row">
            		<!-- <button type="button" class="btn btn-primary">User Config</button>&nbsp; -->
            		<!-- <button type="button" class="btn btn-primary">Group Config</button>&nbsp; -->
            		<button type="button" class="btn btn-primary" onclick="opentool()">Edit Amount</button>
            	</div>
            	
            	
            	
            	
            	<form action="<%=cp%>/updateconfig" method="POST">
	            	<div id="EditTool" class="EditTool">
						<div style="width: 30%;">
							<div style="width: 90%;">
								<label>GroupName</label>
								<input type="text" name="groupName" style="width: 100%;" readonly/>
							</div>
							<div style="width: 90%; margin-top: 10px;">
								<label>CPUTime&nbsp;(￥/Hour)</label>
								<input type="text" name="cpuTime" style="width: 100%;" onkeypress="onlyNumber();"/>
							</div>
						</div>
						<div style="width: 30%;">
							<div style="width: 90%;">
								<label>WallTime&nbsp;(￥/Hour)</label>
								<input type="text" name="wallTime" style="width: 100%;" onkeypress="onlyNumber();"/>
							</div>
							<div style="width: 90%; margin-top: 10px;">
								<label>GPUTime&nbsp;(￥/Hour)</label>
								<input type="text" name="gpuTime" style="width: 100%;" onkeypress="onlyNumber();"/>
							</div>
						</div>
						<div style="width: 30%;">
							<div style="width: 90%;">
								<label>Detail</label>
								<input type="text" name="detail" style="width: 100%;" />
							</div>
							<div style="width: 90%; margin-top: 30px; display: flex;">
								<input type="submit" value="수정" class="btn btn-primary"
									style="width:50%;" onclick="return check()"> 
								<input type="button" value="취소" class="btn btn-primary"
									style="width: 50%; float: right; margin-left: 10px;"
									onclick="cancelInput();"/>
							</div>
						</div>
						<div style="width: 90%; margin-top: 30px; display: none;">
								<input type="hidden" name="accountNum"/>
							</div>
					</div>
				</form>
				
				
			
	            <div class="row">
	            <table id="ImageManagerTable" class="display nowrap table table-hover table-bordered" cellspacing="0" width="100%">
						<thead class="table-success">
				    		<tr>
				    			<th width="3%"></th>
				    			<th width="17%">Group</th>
				    			<th width="20%">CPU Time(￥/Hour)</th>
				    			<th width="20%">GPU Time(￥/Hour)</th>
				    			<th width="20%">Walltime(￥/Hour)</th>
				    			<th width="20%">Detail</th>
				    		</tr>
			    		</thead>
			    		<tbody>
			    			<c:forEach  var="AccountList" items="${AccountList}" >
				    		<tr>
				    			<td><input type="checkbox" id="accountNum" value="${AccountList.accountNum}"></td>
				    			<td>${AccountList.groupName}</td>
				    			<td><fmt:formatNumber value="${AccountList.cpuTime}" pattern="#,###"/></td>
				    			<td><fmt:formatNumber value="${AccountList.gpuTime}" pattern="#,###"/></td>
				    			<td><fmt:formatNumber value="${AccountList.wallTime}" pattern="#,###"/></td>
				    			<td>${AccountList.detail}</td>
				    		</tr>
				   			</c:forEach>
				   		</tbody>
					</table>
					</div>
				</div>
          
			<br>
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
    var table = $('#ImageManagerTable').DataTable({
		'order': [0, 'desc'],
		"bInfo" : false
    });
    
    function addComma(num) {
		  var regexp = /\B(?=(\d{3})+(?!\d))/g;
		   return num.toString().replace(regexp, ',');
		}
    
    function opentool(){
    	if($("input[id='accountNum']:checked").val()==null){
			 alert("지불금액을 수정할 그룹을 선택하세요.")
		 }else if($("input[id='accountNum']:checked").length>1){
			 alert("지불금액을 수정할 그룹을 하나만 선택하세요.")
		 }else{
    	
	    	$("#EditTool").css("display","flex");
	    	
	    	$.ajax({
				url:'<%=cp%>/getaccountconfig',
				type:'POST',
				dataType:'json',
				data:{"accountNum":$("input[id='accountNum']:checked").val(),
					},
				success:function(data){
					
					$("input[name='accountNum']").val(data.accountNum);
					$("input[name='groupName']").val(data.groupName);
					/* 	
					$("input[name='cpuTime']").val(addComma(data.cpuTime));
					$("input[name='gpuTime']").val(addComma(data.gpuTime));
					$("input[name='wallTime']").val(addComma(data.wallTime));
					 */
					$("input[name='cpuTime']").val(data.cpuTime);
					$("input[name='gpuTime']").val(data.gpuTime);
					$("input[name='wallTime']").val(data.wallTime);
						
					$("input[name='detail']").val(data.detail);
	   			}
			});
		 }
    }
    
    function cancelInput(){
    	if (confirm("그룹별 지불금액설정을 취소하시겠습니까?") == true){
    		clearInfo();
		}else{
			return false;
		}
	}
	
	function clearInfo() {
		$("#EditTool").css("display","none");
		
		$("input[name='groupName']").val("");
		$("input[name='cpuTime']").val("");
		$("input[name='gpuTime']").val("");
		$("input[name='wallTime']").val("");
		$("input[name='detail']").val("");
		$("input[id='accountNum']").prop("checked",false);
	}
	
	function check(){
		if($("input[name='wallTime']").val()==""){
			 alert("해당 그룹에 적용할 사용시간당 지불 금액을 입력해주세요.");
			 $("input[name='wallTime']").focus(); 
			 return false;
		}
		if($("input[name='cpuTime']").val()==""){
			 alert("해당 그룹에 적용할 CPU 사용시간당 지불 금액을 입력해주세요.");
			 $("input[name='cpuTime']").focus(); 
			 return false;
		 }
		if($("input[name='gpuTime']").val()==""){
			 alert("해당 그룹에 적용할 GPU 사용시간당 지불 금액을 입력해주세요.");
			 $("input[name='gpuTime']").focus(); 
			 return false;
		 }
		
	}
	function onlyNumber(){
		if ((event.keyCode < 48) || (event.keyCode > 57)) {
			alert("숫자만 입력하세요");
			event.returnValue = false;
		}
	}
    </script>

</body>
</html>