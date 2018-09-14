<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
<link rel="icon" type="image/x-icon" sizes="16x16"
	href="<%=cp %>/resources/images/favicon.ico">
<%-- <link rel="icon" type="image/png" sizes="16x16" href="<%=cp %>/resources/images/favicon.png"> --%>
<title>LEADERS</title>
<link href="<%=cp %>/resources/css/lib/owl.carousel.min.css"
	rel="stylesheet" />
<link href="<%=cp %>/resources/css/lib/owl.theme.default.min.css"
	rel="stylesheet" />
<!-- Bootstrap Core CSS -->
<link href="<%=cp %>/resources/css/lib/bootstrap/bootstrap.min.css"
	rel="stylesheet">
<!-- Custom CSS -->
<link href="<%=cp %>/resources/css/helper.css" rel="stylesheet">
<link href="<%=cp %>/resources/css/style.css" rel="stylesheet">
<link
	href="<%=cp %>/resources/css/lib/calendar2/pignose.calendar.min.css"
	rel="stylesheet">
<link href="<%=cp %>/resources/css/lib/calendar2/semantic.ui.min.css"
	rel="stylesheet">

<link href="<%=cp %>/resources/css/lib/sweetalert/sweetalert.css"
	rel="stylesheet">

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:** -->
<!--[if lt IE 9]>
    <script src="https:**oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https:**oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->

<!-- 정영현 추가 css start -->
<style type="text/css">
	.checkbox_td_css {
		text-align: center;
		vertical-align: middle !important;
	}
	
	.moduleTool {
		display: none; 
		padding: 10 10 10 10; 
		margin: 10 0 10 0; 
		border: outset;
	}
	
	.modelNum_td_css {
		width:50px;
		min-width:50px;
		max-width:50px;
	}

</style>
<!-- 정영현 추가 css end -->

</head>
<body class="fix-header fix-sidebar">
	<!-- Preloader - style you can find in spinners.css -->
	<div class="preloader">
		<svg class="circular" viewBox="25 25 50 50">
			<circle class="path" cx="50" cy="50" r="20" fill="none"
				stroke-width="2" stroke-miterlimit="10" /> </svg>
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
					<h3 class="text-primary">Module</h3>
				</div>
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
					<button type="button" class="btn btn-primary" onclick="insertBtnClicked();">
						<i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;Insert
					</button>
					&nbsp;
					<button type="button" class="btn btn-primary" onclick="updateBtnClicked();">
						<i class="fa fa-wrench" aria-hidden="true"></i>&nbsp;&nbsp;Update
					</button>
					&nbsp;
					<select class="form-control" name="moduleStatusMulti"
					style="width: 115px; margin-left:10px;">
						<option value="">상태선택...</option>
				        <option value="등록">등록</option>
				        <option value="사용중">사용중</option>
				        <option value="정지">정지</option>
				        <option value="만료">만료</option>
				    </select>
				    &nbsp;&nbsp;					
					<button type="button" class="btn btn-primary" onclick="changeMultiStatus();">
						<i class="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;&nbsp;Status Save 
					</button>
					&nbsp;
					<button type="button" class="btn btn-primary"
						onclick="location.reload()">
						<i class="fa fa-refresh" aria-hidden="true"></i>&nbsp;&nbsp;Refresh
					</button>
					&nbsp;
				</div>

				<form action="<%=cp %>/Setting/addModule" method="post" id="addModuleForm">
					<div id="moduleTool" class="moduleTool">
						<div style="width: 30%;">
							<div style="width: 90%;">
								<label>Model</label>
								<input type="text" placeholder="Model" name="model" style="width: 100%;" />
							</div>
							<div style="width: 90%; margin-top: 10px;">
								<label>Verison</label>
								<input type="text" placeholder="Verison" name="version" style="width: 100%;" />
							</div>
						</div>
						<div style="width: 30%;">
							<div style="width: 90%;">
								<label>Install Date</label>
								<input type="date" name="installDate" style="width: 100%;" />
							</div>
							<div style="width: 90%; margin-top: 10px;">
								<label>Expiration Date</label>
								<input type="date" name="expirationDate" style="width: 100%;" onchange="checkEndDay();" />
							</div>
						</div>
						<div style="width: 30%;">
							<div style="width: 90%;">
								<label>Status</label> 
								<select name="status" style="width: 100%;">
									<option selected value="">-- Select --</option>
									<option value="등록">등록</option>
									<option value="사용중">사용중</option>
									<option value="정지">정지</option>
									<option value="만료">만료</option>
								</select>
							</div>
							<div style="width: 90%; margin-top: 30px; display: flex;">
								<input type="button" value="등록" class="btn btn-primary"
									style="width: 50%;" name="addModuleBtn"
									onclick="addModuleMethod();" /> 
								<input type="button" value="취소" class="btn btn-primary"
									style="width: 50%; float: right; margin-left: 10px;"
									onclick="cancelInput();" />
							</div>
						</div>
					</div>
					<input type="hidden" value="" name="updateNum" />
					<!-- 이 값 유무에 따라서 신규등록인지 수정인지 구분 -->
				</form>



				<div class="row">
					<div class="col">
						<table id="ModuleTable"
							class="display nowrap table table-hover table-bordered"
							cellspacing="0" width="100%">
							<thead class="table-success">
								<tr>
									<th class="checkbox_td_css"><input type="checkbox" id="selectAllCheckBox" /></th>
									<th class="modelNum_td_css">No.</th>
									<th>Model</th>
									<th>Version</th>
									<th>Install Date</th>
									<th>Expiration Date</th>
									<th>Status</th>
								</tr>
							</thead>
							<c:forEach var="moduleList" items="${moduleList}">
								<tr>
									<td class="checkbox_td_css"><input type="checkbox" value="${moduleList.moduleNum}" /></td>
									<td>${moduleList.moduleNum}</td>
									<td>${moduleList.model}</td>
									<td>${moduleList.version}</td>
									<td>${moduleList.installDate}</td>
									<td>${moduleList.expirationDate}</td>
									<td>${moduleList.status}</td>
								</tr>
							</c:forEach>
						</table>
					</div>
				</div>
			</div>


			<!-- End Container fluid  -->
			<!-- footer -->
			<footer class="footer">
				© 2018 All rights reserved. <a href="http://leaderssys.com/"
					target="_blank">[주]리더스시스템즈</a>
			</footer>
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
	<script
		src="<%=cp %>/resources/js/lib/sticky-kit-master/dist/sticky-kit.min.js"></script>

	<script
		src="<%=cp %>/resources/js/lib/weather/jquery.simpleWeather.min.js"></script>
	<script src="<%=cp %>/resources/js/lib/weather/weather-init.js"></script>
	<script
		src="<%=cp %>/resources/js/lib/owl-carousel/owl.carousel.min.js"></script>
	<script
		src="<%=cp %>/resources/js/lib/owl-carousel/owl.carousel-init.js"></script>
	<!--Custom JavaScript -->
	<script src="<%=cp %>/resources/js/custom.min.js"></script>

	<script src="<%=cp %>/resources/js/lib/calendar-2/moment.latest.min.js"></script>
	<!-- scripit init-->

	<!-- newAlarmModal 이랑 겹쳐서 에러 남 , 그래서 주석 처리함 나중에 필요하면 로직 수정해야됨. -->
	<%-- <script src="<%=cp %>/resources/js/lib/calendar-2/semantic.ui.min.js"></script> --%>

	<!-- scripit init-->
	<script src="<%=cp %>/resources/js/lib/calendar-2/prism.min.js"></script>
	<!-- scripit init-->
	<script
		src="<%=cp %>/resources/js/lib/calendar-2/pignose.calendar.min.js"></script>
	<!-- scripit init-->
	<script src="<%=cp %>/resources/js/lib/calendar-2/pignose.init.js"></script>

	<!-- Chart Js include -->
	<script src="<%=cp %>/resources/js/lib/chart-js/Chart.bundle.js"></script>

	<script src="<%=cp %>/resources/js/lib/sweetalert/sweetalert2.all.js"></script>

	<!-- data table -->
	<script src="<%=cp %>/resources/js/lib/datatables/datatables.min.js"></script>
	<script
		src="<%=cp %>/resources/js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/dataTables.buttons.min.js"></script>
	<script
		src="<%=cp %>/resources/js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.flash.min.js"></script>
	<script
		src="<%=cp %>/resources/js/lib/datatables/cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"></script>
	<script
		src="<%=cp %>/resources/js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/pdfmake.min.js"></script>
	<script
		src="<%=cp %>/resources/js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/vfs_fonts.js"></script>
	<script
		src="<%=cp %>/resources/js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.html5.min.js"></script>
	<script
		src="<%=cp %>/resources/js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.print.min.js"></script>
	<script src="<%=cp %>/resources/js/lib/datatables/datatables-init.js"></script>

	<script type="text/javascript">
	
	$(document).ready(function(){
		$("#ModuleTable_filter").prepend(
			"<div class='dataTables_paginate paging_simple_numbers'>" +
			"<input type='button' class='paginate_button' value='전체보기' onclick='window.location.reload();' style='padding:0;'>" +
			"<input type='button' class='paginate_button' value='만료제외' style='margin-left:10px; float:right; padding:0;' onclick='exceptForDel();'/>" +
			"</div>"
		);
	}); 
	
	
	/* 정영현 수정 start */
    var moduleTable = $('#ModuleTable').DataTable({
    	/* Disable initial sort */
    	"aaSorting": [], 
    	 columnDefs: [{
    	          targets: [0],
    	          orderable: false 
   		}],
		"bInfo" : false,
    });
	/* 정영현 수정 end */
	
    function insertBtnClicked(){
    	
    	
    	var text = $("input[name='addModuleBtn']").val();
    	
    	if (text.includes("번")){
    		// 수정중일때 신규
			swal({
			  	title: '수정중입니다. 신규등록으로 변경할까요?',
			  	type: "info", 
			  	showCancelButton: true,
			  	allowEscapeKey: false,
			  	allowOutsideClick: false,
			}).then(function (result) {
				
				console.log(result);
				if (result.dismiss === "cancel") { // 취소면 그냥 나감
					return false;
				}
				
				// 신규로 변경이니깐 정보 지워주고
				clearInfo();
				$("input[name='addModuleBtn']").val("등록");
				$("#moduleTool").css("display","flex");
				
		    	// 오늘 날짜로 맞춰줌
				$("input[name='installDate']").val(getToday());
				$("input[name='expirationDate']").val(getToday());
			});
    	} else {
    		// 걍 신규
    		$("#moduleTool").css("display","flex");
        	// 오늘 날짜로 맞춰줌
    		$("input[name='installDate']").val(getToday());
    		$("input[name='expirationDate']").val(getToday());
    	}

    }

	function cancelInput(){

		swal({
		  	title: '입력한 정보는 지워집니다. 취소할까요?',
		  	type: "info", 
		  	showCancelButton: true,
		  	allowEscapeKey: false,
		  	allowOutsideClick: false,
		}).then(function (result) {
			
			console.log(result);
			if (result.dismiss === "cancel") { // 취소면 그냥 나감
				return;
			}
			clearInfo();
		});
		
	}
	
	function clearInfo() {
		$("#moduleTool").css("display","none");
		
		$("input[name='model']").val("");
		$("input[name='version']").val("");
		$("input[name='installDate']").val("");
		$("input[name='expirationDate']").val("");
		$("select[name='status']").val("");

	}
	
	
	function addModuleMethod() {
		
		if ($("input[name='model']").val() == "") {
			swal("model 을 입력하세요.","","error");
			$("input[name='model']").focus(); 
			return false;
		} 
		
		if ($("input[name='version']").val() == "") {
			swal("Version 입력하세요.","","error");
			$("input[name='version']").focus(); 
			return false;
		} 
		
		if ($("input[name='installDate']").val() == "") {
			swal("설치 날짜를 입력하세요.","","error");
			$("input[name='installDate']").focus(); 
			return false;
		} 
		
		if ($("input[name='expirationDate']").val() == "") {
			swal("만료 날짜를 입력하세요.","","error");
			$("input[name='expirationDate']").focus(); 
			return false;
		} 
		
		if ($("select[name='status']").val() == "") {
			swal("상태를 선택하세요.","","error");
			$("select[name='status']").focus(); 
			return false;
		} 
		
		text = $("input[name='addModuleBtn']").val(); // add, modify 선택
		
		// update num 여기서 줘야지 수정 제대로 된다. 
		if (text.includes("번")){
			// 11번 수정~ "번" 기준으로 split
			updateNum = text.split("번")[0].trim(); 
			$("input[name='updateNum']").val(updateNum);
		} else {
			$("input[name='updateNum']").val(""); 
		}

		swal({
		  	title: text + ' 하시겠습니까?',
		  	type: "info", 
		  	showCancelButton: true,
		  	allowEscapeKey: false,
		  	allowOutsideClick: false,
		}).then(function (result) {
			
			console.log(result);
			if (result.dismiss === "cancel") { // 취소면 그냥 나감
				return false;
			}
			
			$("#addModuleForm").submit();
			
		});

	}
	
	function exceptForDel() {
		
		var filteredData = moduleTable
		    .rows()
		    .indexes()
		    .filter( function ( value, index ) {
		  		return moduleTable.row(value).data()[6] == '만료';  
		    });
		moduleTable.rows( filteredData )
		.remove()
		.draw();
	}
	
	function getToday() {
	 	var date = new Date();
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		if (month < 10) month = "0" + month;
		if (day < 10) day = "0" + day;
		var today = year + "-" + month + "-" + day;       
		return today;
	}
	
	function checkEndDay() {
		startDay = new Date($("input[name='installDate']").val());
		endDay = new Date($("input[name='expirationDate']").val());
		if (startDay>endDay) {
			swal("Error","만료일을 설치일보다 이후로 설정하세요.","error");
			$("input[name='expirationDate']").val($("input[name='installDate']").val());
		}
	}
	
	// 전체 선택
	$('#selectAllCheckBox').on('click', function(){
		var rows = moduleTable.rows({ 'search': 'applied' }).nodes();
		$('input[type="checkbox"]', rows).prop('checked', this.checked);
		
	});
	
	
	function changeMultiStatus () {
		
		getNumArray = getmoduleNumListFromCheckedCheckBox();
		if (getNumArray==0) {
			swal("module 을 선택하세요","","error");
			return;
		}
		
		var moduleStatus = $("select[name='moduleStatusMulti']").val();
		console.log(moduleStatus);
		if (moduleStatus == "") {
			swal("상태를 선택하세요","","error");
			return;			
		}
		
		/* 
		console.log(getNumArray);
		console.log(getNumArray.length);
		*/
		
		swal({
		  	title: getNumArray.length + ' 개의 상태를 ' + moduleStatus + '(으)로 변경 하시겠습니까?',
		  	type: "info", 
		  	showCancelButton: true,
		  	allowEscapeKey: false,
		  	allowOutsideClick: false,
		}).then(function (result) {
			
			console.log(result);
			if (result.dismiss === "cancel") { // 취소면 그냥 나감
				return false;
			}
			var moduleNumbers = "";
			
			for (i=0; i<getNumArray.length; i++) {
				if (i == getNumArray.length-1){
					moduleNumbers += getNumArray[i]
				} else {
					moduleNumbers += getNumArray[i] + ",";	
				}
			}
			
			console.log(moduleNumbers);
			
			$.ajax({
				url:'<%=cp%>/Setting/changeModuleStatusMulti',
				type:'POST',
				dataType:'text',
				data:{	"moduleNumbers":moduleNumbers,
						"moduleStatus":moduleStatus },
				success:function(data){
					if (data == "true") {
						swal("상태변경이 성공하였습니다.","","success");
						setTimeout(function () {
							location.reload();	
						}, 1000);
						
					} else {
						swal("상태변경이 실패하였습니다.","","error");				
					}
				},error:function(request, status, error){
					swal("상태변경이 실패하였습니다.","","error");						
	   			}
			});
			
		});
		
	}
	
	
	// checked 된 check box list 얻기
	function getmoduleNumListFromCheckedCheckBox () {
		var checkedCheckBox = moduleTable
	    .rows()
	    .nodes()
	    .to$()      // Convert to a jQuery object
		.find('input[type="checkbox"]:checked');
		
		var newArray = [];
		for (var i=0; i<checkedCheckBox.length; i++) {
			newArray.push(checkedCheckBox.eq(i).val());	
		}
		// console.log(newArray);
		return newArray;
	}
	
	
	function updateBtnClicked() {

		var checkedCheckBox = moduleTable
	    .rows()
	    .nodes()
	    .to$()      // Convert to a jQuery object
		.find('input[type="checkbox"]:checked');
		
		if (checkedCheckBox.length != 1) {
			swal("하나만 선택해주세요.","","error");
			return;
		}
		
		var set_updateNum = checkedCheckBox.eq(0).val();
		
		var text = $("input[name='addModuleBtn']").val();
		if (!text.includes("번") && $("#moduleTool").is(':visible')) { // 번이라는 글자가 없으면 신규 등록 중임
			swal({
			  	title: '신규 등록 중입니다. ' + set_updateNum + ' 번 수정으로 변경할까요?',
			  	type: "info", 
			  	showCancelButton: true,
			  	allowEscapeKey: false,
			  	allowOutsideClick: false,
			}).then(function (result) {
				
				console.log(result);
				if (result.dismiss === "cancel") { // 취소면 그냥 나감
					return false;
				}
				updateRealMethod(set_updateNum);
			});
		} else {
			// 바로 수정 버튼 눌렀을때
			updateRealMethod(set_updateNum);
		}

		
	}
	
 	function updateRealMethod (get_updateNum) {

		$("#moduleTool").css("display","flex");
		$("input[name='addModuleBtn']").val(get_updateNum + "번 수정");

		// input data는 ajax로 가져와서 넣어주기
		$.ajax({
			url:'<%=cp%>/Setting/getModuleData',
			type:'POST',
			dataType:'json',
			data:{	"updateNum": get_updateNum},	
			success:function(data){

				// console.log(data);

				$("input[name='model']").val(data.model);
				$("input[name='version']").val(data.version);
				$("input[name='installDate']").val(data.installDate);
				$("input[name='expirationDate']").val(data.expirationDate);
				$("select[name='status']").val(data.status);
				
			},error:function(request, status, error){
				alert("데이터 가져오기 실패했습니다.");
   			}
		});	
 	}
	
    </script>

</body>
</html>