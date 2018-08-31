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
<style type="text/css">
	.bg-dark{
		background: #e7e7e7 !important;
	}
	
	.bg-primary{
		background: #80c340 !important;
	}
	
	.bg-pink{
		background: #539fcc !important;
	}
	
	.bg-success{
		background: #4d6abb !important;
	}
	
	.bg-danger{
		background: #855486 !important;
		/* background: #6c757d !important; */
	}
	
	.canvas{
		height: 100vh; 
  		width: 100vw;
		display: block;
	}
	
	.custom-table td, .custom-table th {
		padding: 0 5 0 5 !important;
		font-size: smaller;
	}
	ul.tabs{
	  margin: 0px;
	  padding: 0px;
	  list-style: none;
	}
	ul.tabs li{
	  background: none;
	  color: #222;
	  display: inline-block;
	  padding: 10px 15px;
	  cursor: pointer;
	}
	 
	ul.tabs li.current{
	  background: #ededed;
	  color: #222;
	}
	 
	.tab-content{
	  display: none;
	  background: #ededed;
	  padding: 15px;
	}
	 
	.tab-content.current{
	  display: inherit;
	}
	
	<!-- checkbox -->
	.funkyradio div {
	  clear: both;
	  overflow: hidden;
	}
	
	.funkyradio label {
	  width: 100%;
	  border-radius: 3px;
	  border: 1px solid #D1D3D4;
	  font-weight: normal;
	}
	
	.funkyradio input[type="radio"]:empty,
	.funkyradio input[type="checkbox"]:empty {
	  display: none;
	}
	
	.funkyradio input[type="radio"]:empty ~ label,
	.funkyradio input[type="checkbox"]:empty ~ label {
	  position: relative;
	  line-height: 2.5em;
	  text-indent: 3.25em;
	  margin-top: 2em;
	  cursor: pointer;
	  -webkit-user-select: none;
	     -moz-user-select: none;
	      -ms-user-select: none;
	          user-select: none;
	}
	
	.funkyradio input[type="radio"]:empty ~ label:before,
	.funkyradio input[type="checkbox"]:empty ~ label:before {
	  position: absolute;
	  display: block;
	  top: 0;
	  bottom: 0;
	  left: 0;
	  content: '';
	  width: 2.5em;
	  background: #D1D3D4;
	  border-radius: 3px 0 0 3px;
	}
	
	.funkyradio input[type="radio"]:hover:not(:checked) ~ label,
	.funkyradio input[type="checkbox"]:hover:not(:checked) ~ label {
	  color: #888;
	}
	
	.funkyradio input[type="radio"]:hover:not(:checked) ~ label:before,
	.funkyradio input[type="checkbox"]:hover:not(:checked) ~ label:before {
	  content: '\2714';
	  text-indent: .9em;
	  color: #C2C2C2;
	}
	
	.funkyradio input[type="radio"]:checked ~ label,
	.funkyradio input[type="checkbox"]:checked ~ label {
	  color: #777;
	}
	
	.funkyradio input[type="radio"]:checked ~ label:before,
	.funkyradio input[type="checkbox"]:checked ~ label:before {
	  content: '\2714';
	  text-indent: .9em;
	  color: #333;
	  background-color: #ccc;
	}
	
	.funkyradio input[type="radio"]:focus ~ label:before,
	.funkyradio input[type="checkbox"]:focus ~ label:before {
	  box-shadow: 0 0 0 3px #999;
	}
	
	
	.funkyradio-warning input[type="radio"]:checked ~ label:before,
	.funkyradio-warning input[type="checkbox"]:checked ~ label:before {
	  color: #fff;
	  background-color: #f0ad4e;
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
                    <h3 class="text-primary">SubmitTrainTasks</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">AIApplications</a></li>
                        <li class="breadcrumb-item active">SubmitTrainTasks</li>
                    </ol>
                </div>
            </div>
            <!-- End Bread crumb -->
            
             <div class="container">
				  <ul class="tabs text-center">
				    <li class="tab-link current text" data-tab="tab-1" style="margin-right:20%">
				    <p style="font-size:20px">1</p>Container</li>
				    <li class="tab-link " data-tab="tab-2" style="margin-right:20%">
				    <p style="font-size:20px">2</p>Node</li>
				    <li class="tab-link" data-tab="tab-3" style="margin-right:20%">
					<p style="font-size:20px">3</p>Dataset</li>
				    <li class="tab-link" data-tab="tab-4">
					<p style="font-size:20px">4</p>Task</li>
				  </ul>
				   <div class="progress">
					  <div class="progress-bar progress-bar-striped bg-success" id="bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
					</div>
				  <hr>
				  
				  
				  <div id="tab-1" class="tab-content current">
				  	<div class="container">
				  		<div class="row">
					  		<div class="col-5">
						  	<label><span style="color:red">*</span>Image</label>
							  	<div class="col">
								  	<select name='fruits' class="form-control">
										<option value='' selected>-- 선택 --</option>
									  	<option value='1'>nvcr.io/nvidia/tensorflow:18.04-py3/3.49GB</option>
									  	<option value='2'>2</option>
									  	<option value='3'>3</option>
									</select>
								</div>
							</div>
						</div>
						<br>
						
						<div class="row">
							<div class="col-5">
						  	<label><span style="color:red">*</span>Resource</label>
						  	</div>
						</div>
						<div class="row">
							<div class="col-3">
					    		<div class="funkyradio">
					        		<div class="funkyradio-warning">
					            	<input type="radio" name="radio" id="checkbox1" checked/>
					            	<label for="checkbox1">1*GPU / 2*CPU</label>
					        		</div>
					    		</div>
							</div>
							<div class="col-3">
							    <div class="funkyradio">
							        <div class="funkyradio-warning">
							            <input type="radio" name="radio" id="checkbox2" />
							            <label for="checkbox2">2*GPU / 4*CPU</label>
							        </div>
							    </div>
							</div>
							<div class="col-3">
							    <div class="funkyradio">
							        <div class="funkyradio-warning">
							            <input type="radio" name="radio" id="checkbox3" />
							            <label for="checkbox3">4*GPU / 8*CPU</label>
							        </div>
							    </div>
					    	</div>
					    </div>
					   
				 
						
						
						
						
						
						
						
						<div class="row text-right">
							<div class="col">
								<input type="button" class="btn" value="Previous">&ensp;
								<input type="button" class="btn btn-primary" value="Next"  style="margin-right:10%" onclick="next1()">
							</div>
						</div>	
					  </div>
					</div>
				
				  <div id="tab-2" class="tab-content">
				 	<div class="container">
				  		<div class="row">
					  		<div class="col-5">
						  	2
							</div>
						</div>
						
						<div class="row text-right">
							<div class="col">
								<input type="button" class="btn btn-primary" value="Previous" onclick="back1();">&ensp;
								<input type="button" class="btn btn-primary" value="Next"  style="margin-right:10%" onclick="next2()">
							</div>
						</div>
				  </div>
				</div>
				
				  <div id="tab-3" class="tab-content">
				  	<div class="container">
				  		<div class="row">
					  		<div class="col-5">
					  		 3
							</div>
						</div>
						
						<div class="row text-right">
							<div class="col">
								<input type="button" class="btn btn-primary" value="Previous" onclick="back2();">&ensp;
								<input type="button" class="btn btn-primary" value="Next"  style="margin-right:10%" onclick="next3()">
							</div>
						</div>
				  	</div>
				  </div>
				  
				  <div id="tab-4" class="tab-content">
				  	<div class="container">
				  		<div class="row">
					  		<div class="col-5">
						  	4
							</div>
						</div>
						<div class="row text-right">
							<div class="col">
								<input type="button" class="btn btn-primary" value="Previous" onclick="back3();">&ensp;
								<input type="button" class="btn btn-danger" value="Submit"  style="margin-right:10%">
							</div>
						</div>
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
    /* 
    $(document).ready(function(){
    	   
    	  $('ul.tabs li').click(function(){
    	    var tab_id = $(this).attr('data-tab');
    	 
    	    $('ul.tabs li').removeClass('current');
    	    $('.tab-content').removeClass('current');
    	 
    	    $(this).addClass('current');
    	    $("#"+tab_id).addClass('current');
    	  })
    	}) */
  
    function next1(){
    	$("#tab-2").show();
		$("#tab-1").hide();
	
		$("#bar").css({"width": "50%","aria-valuenow":"50"});
		
		$('ul.tabs li:nth-child(2)').addClass('current');
   	    $("#tab-2").addClass('current');
    }
    function back1(){
    	$("#tab-1").show();
		$("#tab-2").hide();
		
		$("#bar").css({"width": "25%","aria-valuenow":"25"});
		
		$('ul.tabs li:nth-child(1)').addClass('current');
		$('ul.tabs li:nth-child(2)').removeClass('current');
	    $("#tab-2").removeClass('current');
    }
    function next2(){
    	$("#tab-3").show();
		$("#tab-2").hide();
		
		$("#bar").css({"width": "75%","aria-valuenow":"75"});
		
		$('ul.tabs li:nth-child(3)').addClass('current');
		 $("#tab-3").addClass('current');
    }
    function back2(){
    	$("#tab-2").show();
		$("#tab-3").hide();
		
		$("#bar").css({"width": "50%","aria-valuenow":"50"});
		
		$('ul.tabs li:nth-child(3)').removeClass('current');
	    $("#tab-3").removeClass('current');
    }
    function next3(){
    	$("#tab-4").show();
		$("#tab-3").hide();
		
		$("#bar").css({"width": "100%","aria-valuenow":"100"});
		
		$('ul.tabs li:nth-child(4)').addClass('current');
		 $("#tab-4").addClass('current');
    }
    function back3(){
    	$("#tab-3").show();
		$("#tab-4").hide();
		
		$("#bar").css({"width": "75%","aria-valuenow":"75"});
		
		$('ul.tabs li:nth-child(4)').removeClass('current');
	    $("#tab-4").removeClass('current');
    }
    </script>

</body>
</html>