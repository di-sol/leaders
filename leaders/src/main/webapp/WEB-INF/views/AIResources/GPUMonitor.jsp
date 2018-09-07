<%@page import="java.text.DecimalFormat"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
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
                    <h3 class="text-primary">GPUMonitor</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">AIResources</a></li>
                        <li class="breadcrumb-item active">GPUMonitor</li>
                    </ol>
                </div>
            </div>
            <!-- End Bread crumb -->
             <div class="container">
  				<div class="row text-center">
					<div class="col-4">
						<label>GPUs:4</label>
                       	<canvas id="myChart"></canvas>
                    </div>
                    <div class="col-4">
                    	<label>GPU Core</label>
                       	<canvas id="myChart2"></canvas>
                    </div>
                    <div class="col-4">
                    	<label>GPU MEM</label>
                       	<canvas id="myChart3"></canvas>
                    </div>
                 </div>
                 <br><br><br>
                 <div class="col">
                 	 <div class="row text-center">
                 	 	 <a href="<%=cp%>/AIResources/GPUMonitorinfo">
                        <div class="card bg-primary p-15">
                            <div class="media widget-ten">
                                <div class="media-body">
                                    <h2 class="color-white">aicu01</h2>
                                    <p class="m-b-0">ID : GPU_0</p>
                                    <p class="m-b-0">Utilization : 0%</p>
                                    <p class="m-b-0">mem : 0%</p>
                                </div>
                            </div>
                        </a>
                        </div>&nbsp;
                        
                        <a href="#">
                        <div class="card bg-primary p-15">
                            <div class="media widget-ten">
                                <div class="media-body">
                                    <h2 class="color-white">aicu01</h2>
                                    <p class="m-b-0">ID : GPU_1</p>
                                    <p class="m-b-0">Utilization : 0%</p>
                                    <p class="m-b-0">mem : 0%</p>
                                </div>
                            </div>
                        </div>
                        </a>&nbsp;
                        
                        <a href="#">
                        <div class="card bg-primary p-15">
                            <div class="media widget-ten">
                                <div class="media-body">
                                    <h2 class="color-white">aicu01</h2>
                                    <p class="m-b-0">ID : GPU_2</p>
                                    <p class="m-b-0">Utilization : 0%</p>
                                    <p class="m-b-0">mem : 0%</p>
                                </div>
                            </div>
                        </div>
                        </a>&nbsp;
                        
                        <a href="#">
                        <div class="card bg-primary p-15">
                            <div class="media widget-ten">
                                <div class="media-body">
                                    <h2 class="color-white">aicu01</h2>
                                    <p class="m-b-0">ID : GPU_3</p>
                                    <p class="m-b-0">Utilization : 0%</p>
                                    <p class="m-b-0">mem : 0%</p>
                                </div>
                            </div>
                        </div>
                        </a>&nbsp;
                        
                        
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
    $(function(){ 
		 		 
    	var ctx = document.getElementById( "myChart" );
    	ctx.height = 200;
    	
    	var myChart = new Chart( ctx, {
    		type: 'pie',
    		data: {
    			labels: ["Red","Blue","Yellow"],
    			datasets: [
    				{						
    					data: [ 300,50,100 ], //그레프 값 labels 값의 개수와 동일
    					backgroundColor : [ 
    						"#FF6384","#36A2EB","#FFCE56" 
    						],
    					hoverBackgroudColor : [
    						"#FF6384",
    						"#36A2EB",
    						"#FFCE56"
    					]
    	               }
    			]
    		},
    	}); 
    	
    	var ctx = document.getElementById( "myChart2" );
    	ctx.height = 200;
    	
    	var myChart2 = new Chart( ctx, {
    		type: 'pie',
    		data: {
    			labels: ["Red","Blue","Yellow"],
    			datasets: [
    				{						
    					data: [ 300,50,100 ],
    					backgroundColor : [ 
    						"#FF6384","#36A2EB","#FFCE56"
    						],
    					hoverBackgroudColor : [
    						"#FF6384",
    						"#36A2EB",
    						"#FFCE56"
    					]
    	               }
    			]
    		},
    	}); 
    	
    	var ctx = document.getElementById( "myChart3" );
    	ctx.height = 200;
    	
    	var myChart3 = new Chart( ctx, {
    		type: 'pie',
    		data: {
    			labels: ["Red","Blue","Yellow"],
    			datasets: [
    				{						
    					data: [ 300,50,100 ],
    					backgroundColor : [ 
    						"#FF6384","#36A2EB","#FFCE56"
    						],
    					hoverBackgroudColor : [
    						"#FF6384",
    						"#36A2EB",
    						"#FFCE56"
    					]
    	               }
    			]
    		},
    	}); 
    });
    </script>

</body>
</html>