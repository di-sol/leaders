<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html;" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
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
    	<div class="container">
    	<br><br>
    		<div class="row text-center">
	       	<table id="usagehistoryTable" class="display nowrap table table-hover table-bordered" cellspacing="0" width="100%">
				<thead class="table-success">
				 		<tr>
				   			<th width="25%">History</th>
				   			<th width="25%">Price</th>
				   			<th width="25%">Time</th>
				  			<th width="25%">balance</th>
				   		</tr>
			    	</thead>
			    	<c:forEach  var="Billinglist" items="${Billinglist}" >
				    		<tr>
				    			<td>${Billinglist.billinghistory}</td>
				    			
				    			<c:choose>
								    <c:when test="${Billinglist.price lt 0}">
								       <td><a class="text-danger" style="color:#0000FF;"><fmt:formatNumber value="${Billinglist.price}" pattern="#,###"/></a></td>
								    </c:when>
								    <c:when test="${Billinglist.price ge 0}">
								       <td><a style="color:#0000FF;">+<fmt:formatNumber value="${Billinglist.price}" pattern="#,###"/></a></td>
								    </c:when>
								</c:choose>
				    			<td>${Billinglist.billingTime}</td>
				    			<td><fmt:formatNumber value="${Billinglist.balance}" pattern="#,###"/></td>
				    		</tr>
				   		</c:forEach>
				</table>
			</div>
			<br><br>
			<div class="row">
				<div class="col">
				<input type="button" class="btn btn-outline-danger" value="충전하기" onclick="charge()" style="width:100%">
				</div>
				<div class="col">
				<input type="button" class="btn btn-outline-info" value="돌아가기" onclick="javascript:history.go(-1)" style="width:100%">
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
    function charge(){
			location.href = "<%=cp %>/charge";
		}
    </script>

</body>
</html>