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
<style type="text/css">
	.checkbox_td_css {
		text-align: center;
		vertical-align: middle !important;
	}
		
		
	th {
		font-size: 14px;
	}
	
	.groupform_div {
		display: inline-flex;
	}
	
	.groupform_div div {
		margin: 10 10 10 10;
	}
	
	.groupTool {
		display: none;
		padding: 10 10 10 10;
		margin: 10 0 10 0;
		border: outset;	
		width: fit-content;
	}
	
	.group_tool_button {
		margin: 0;
	}
	
	.btn-intool {
		height: 50px;
		width: 100px;
	}
	
	.set_width_class {
		width: 100%;
	}

</style>
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
					<h3 class="text-primary">Group</h3>
				</div>
				<div class="col-md-7 align-self-center">
					<ol class="breadcrumb">
						<li class="breadcrumb-item"><a href="#">SystemManage</a></li>
						<li class="breadcrumb-item active">Group</li>
					</ol>
				</div>
			</div>
			<!-- End Bread crumb -->


			<div class="container-fluid">
				<div class="row group_tool_button">
					<button type="button" class="btn btn-primary" onclick="insertBtnClicked();">
						<i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;Insert
					</button>
					&nbsp;
					<button type="button" class="btn btn-primary" onclick="updateBtnClicked();">
						<i class="fa fa-wrench" aria-hidden="true"></i>&nbsp;&nbsp;Update
					</button>
					&nbsp;
					<button type="button" class="btn btn-primary" onclick="deleteBtnClicked();">
						<i class="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;Delete
					</button>
					&nbsp;
					<button type="button" class="btn btn-primary"
						onclick="location.reload()">
						<i class="fa fa-refresh" aria-hidden="true"></i>&nbsp;&nbsp;Refresh
					</button>
					&nbsp;

				</div>

				<form action="<%=cp %>/Setting/insertGroup" method="post" id="insertGroupForm">
					<div id="groupTool" class="groupTool">
						<div class="groupform_div">
							<div>
								<label>Group Name</label> 
								<input type="text" placeholder="Group Name" name="groupName" class="set_width_class" />
							</div>
							<div>
								<label>Group Server</label>
								<select name="groupServer" class="set_width_class" >
									<option selected value="">Select Server</option>
									<option value="aicu01">aicu01</option>
								</select>
								
							</div>

							<div>
								<label>Group Priority</label> 
								<input type="text" placeholder="Group Priority" name="groupPriority" class="set_width_class" />
							</div>
							<div>
								<input type="button" value="등록" name="addGroupBtn" onclick="insertGroupMethod();" class="btn-intool btn"/>
							</div>
							<div>
								<input type="button" value="취소" onclick="cancelInput();" class="btn-intool btn"/>
							</div>
						</div>
					</div>
					<input type="hidden" value="" name="updateNum" />
					<!-- 이 값 유무에 따라서 신규등록인지 수정인지 구분 -->
				</form>

               	<div class="table-responsive">
					<table id="GroupTable"
						class="display nowrap table table-hover table-bordered"
						cellspacing="0" width="100%">
						<thead class="table-success">
							<tr>
								<th class="checkbox_td_css"><input type="checkbox" id="selectAllCheckBox" /></th>
								<th width="3%">No</th>
								<th>User Group Name</th>
								<th>Server</th>
								<th>Priority</th>
								<th>Equitable utilization of shared resources</th>
								<th>Maximum number of running jobs</th>
								<th>Maximum number of queued jobs</th>
								<th>Total jobs</th>
								<th>Total Times</th>
								<th>Members Count</th>
							</tr>
						</thead>
						<c:forEach var="groupList" items="${groupList}">
							<tr>
								<td class="checkbox_td_css"><input type="checkbox" value="${groupList.groupNum}" /></td>
								<td>${groupList.groupNum}</td>
								<td>${groupList.groupName}</td>
								<td>${groupList.groupServer}</td>
								<td>${groupList.groupPriority}</td>
								<td></td>
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


	<!-- Grouping Modal Start -->



	<!-- Grouping Modal End -->









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
    
    var groupTable = $('#GroupTable').DataTable({
    	/* Disable initial sort */
    	"aaSorting": [], 
    	 columnDefs: [{
    	          targets: [0],
    	          orderable: false 
   		}],
		"bInfo" : false,
    });
    
	
    function insertBtnClicked(){
    	
		var text = $("input[name='addGroupBtn']").val();
    	
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
				
				$("input[name='addGroupBtn']").val("등록");
				
				$("#groupTool").css("display","flex");

			});
    	} else {
    		// 걍 신규
    		$("#groupTool").css("display","flex");
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
		$("#groupTool").css("display","none");
		
		$("input[name='groupName']").val("");
		$("select[name='groupServer']").val("");
		$("input[name='groupPriority']").val("");
	}
	
	function insertGroupMethod() {
		
		if ($("input[name='groupName']").val().trim() == "") {
			swal("name 을 입력하세요.","","error");
			$("input[name='groupName']").focus(); 
			return false;
		} 
		
		// 이름은 unique 기 때문에 중복 체크 할것
		if (!checkDuplicateName()){
			return false;
		}
		
		if ($("select[name='groupServer']").val() == "") {
			swal("Server 를 선택하세요.","","error");
			$("select[name='groupServer']").focus(); 
			return false;
		} 
		
		if ($("input[name='groupPriority']").val().trim() == "") {
			swal("Priority 입력하세요.","","error");
			$("input[name='groupPriority']").focus(); 
			return false;
		} 
		
		text = $("input[name='addGroupBtn']").val(); // add, modify 선택
		
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
			
			$("#insertGroupForm").submit();
			
		});
		
		
		
	}
	
	function checkDuplicateName() {
		console.log($("input[name='groupName']").val());
		// ajax로 동일한 이름있는지 체크
		var result = true; // 변수로 받아서 return 해야지 제대로 인식 되네
		
		$.ajax({
			url:'<%=cp%>/Setting/getGroupNamesForCheck',
			type:'POST',
			dataType:'text',
			async:false,
			data:{	"groupName":$("input[name='groupName']").val(),
					},
			success:function(data){
				console.log(data);
				if (data != "true") {
					swal("이미 있는 이름입니다.","","error");	
					$("input[name='groupName']").focus(); 
					$("input[name='groupName']").val("");
					result = false;
				}
			}
		});
		
		return result;
	}
	
	// checked 된 check box list 얻기
	function getGroupNumListFromCheckedCheckBox () {
		var checkedCheckBox = groupTable
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
		var checkedCheckBox = groupTable
	    .rows()
	    .nodes()
	    .to$()      // Convert to a jQuery object
		.find('input[type="checkbox"]:checked');
		
		if (checkedCheckBox.length != 1) {
			swal("하나만 선택해주세요.","","error");
			return;
		}
		
		var set_updateNum = checkedCheckBox.eq(0).val();
		
		var text = $("input[name='addGroupBtn']").val();
		if (!text.includes("번") && $("#groupTool").is(':visible')) { // 번이라는 글자가 없으면 신규 등록 중임
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

		$("#groupTool").css("display","flex");
		$("input[name='addGroupBtn']").val(get_updateNum + "번 수정");

		// input data는 ajax로 가져와서 넣어주기
		$.ajax({
			url:'<%=cp%>/Setting/getGroupDataByNum',
			type:'POST',
			dataType:'json',
			data:{	"updateNum":get_updateNum},	
			success:function(data){

				console.log(data);
				$("input[name='groupName']").val(data.groupName);
				$("select[name='groupServer']").val(data.groupServer);
				$("input[name='groupPriority']").val(data.groupPriority);
				
			},error:function(request, status, error){
				console.log(request);
				console.log(status);
				console.log(error);
				alert("데이터 가져오기 실패했습니다.");
   			}
		});	
	}
	
	
	function deleteBtnClicked () {
		
		var checkedCheckBox = groupTable
	    .rows()
	    .nodes()
	    .to$()      // Convert to a jQuery object
		.find('input[type="checkbox"]:checked');
		
		if (checkedCheckBox.length > 0) {
			swal("하나이상 선택하세요","","error");
			return;
		}
		
	}
	
	// 전체 선택
	$('#selectAllCheckBox').on('click', function(){
		var rows = groupTable.rows({ 'search': 'applied' }).nodes();
		$('input[type="checkbox"]', rows).prop('checked', this.checked);
	});
	
    </script>

</body>
</html>