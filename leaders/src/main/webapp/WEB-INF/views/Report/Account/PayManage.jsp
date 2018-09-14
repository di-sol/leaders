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
                    <h3 class="text-primary">PayManage</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Report</a>
                        <li class="breadcrumb-item">Account</li>
                        <li class="breadcrumb-item active">PayManage</li>
                    </ol>
                </div>
            </div>
            <!-- End Bread crumb -->
            
            
            <div class="container">
            	<div class="row">
            	<!-- 
            		<div class="form-group col-md-2">
            		Group
            		<select name='Node' class="form-control">
					  <option value='' selected>-- ALL --</option>
					  <option value=''></option>
					</select>&emsp;
					</div>
					 -->
					<div class="form-group col-md-2">
            		User
            		<select name="userId" class="form-control">
					  <option selected value="all">-- ALL --</option>
					  <c:forEach  var="memberlist" items="${memberlist}" >
					  	<option value='${memberlist.userId}'>${memberlist.userId}</option>
					  </c:forEach>
					</select>&emsp;
					</div>
					<div class="form-group col-md-2">
					<br>
					<input type="button" class="btn btn-primary" value="Query" onclick="query()">
					<!-- 
					<input type="button" class="btn btn-primary" value="Pay">
					 -->
					</div>
            	</div> 
	            <div class="row">
            		<div class="col">
	            	<table id="PayManageTable" class="display nowrap table table-hover table-bordered" cellspacing="0" width="100%">
						<thead class="table-success">
				    		<tr>
				    			<th width="3%"></th>
				    			<th width="17%">User</th>
				    			<th width="20%">Pay(￥)</th>
				    			<th width="20%">Pay Time</th>
				    			<th width="20%">Balance(￥)</th>
				    			<th width="20%">Detail</th>
				    		</tr>
			    		</thead>
			    		 <tfoot>
				            <tr>
				            	<th class="text-center" colspan="3">Total Pay(￥)</th>
				            	<th class="text-center" colspan="3"><p id="total" style="color:black"><fmt:formatNumber value="${total}" pattern="#,###"/></p></th>
				            
				            </tr>
				        </tfoot>
			    		<tbody>
			    			<c:forEach  var="Billinglist" items="${Billinglist}" >
				    		<tr>
				    			<td></td>
				    			<td>${Billinglist.billingUser}</td>
				    			<td><fmt:formatNumber value="${Billinglist.price}" pattern="#,###"/></td>
				    			<td>${Billinglist.billingTime}</td>
				    			<td><fmt:formatNumber value="${Billinglist.balance}" pattern="#,###"/></td>
				    			<td>${Billinglist.billinghistory}</td>
				    		</tr>
				   			</c:forEach>
				   		</tbody>
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
    var table = $('#PayManageTable').DataTable({
		'order': [3, 'desc'],
		"bInfo" : false
    });

	//천자리 구분기호
		function addComma(num) {
			  var regexp = /\B(?=(\d{3})+(?!\d))/g;
			   return num.toString().replace(regexp, ',');
			}
		
	
    function query(){
    	
    	if($("select[name='userId']").val() == "all"){
    		location.reload();
    	}
    	
    	var table = $('#PayManageTable').DataTable();
			table.clear().draw();
			
		var total = 0;
			
    	$.ajax({
				url:'<%=cp%>/selectbilling',
				type:'POST',
				dataType:'json',
				data:{"billingUser":$("select[name='userId']").val(),
					},
				success:function(data){
					for (var i=0; i<data.length; i++) {
    					workRow = [];
    					workRow[0] = "";
    					workRow[1] = data[i].billinguser;
    					workRow[2] = addComma(data[i].price);
    					workRow[3] = data[i].billingTime;
    					workRow[4] = addComma(data[i].balance);
    					workRow[5] = data[i].billinghistory;
    					
    					table.row.add(workRow).draw(false);
    					
    					total = parseInt(total) + parseInt(data[i].price);
    				}
					$('#total').text(addComma(total));
	   			}
		});
    }
    
    </script>

</body>
</html>