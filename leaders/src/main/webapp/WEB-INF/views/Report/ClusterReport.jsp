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
label{
	font-size:12px;
}
th {
	  font-size : 14px;
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
                    <h3 class="text-primary">ClusterReport</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Report</a></li>
                        <li class="breadcrumb-item active">ClusterReport</li>
                    </ol>
                </div>
            </div>
            <!-- End Bread crumb -->
            
            
            
            <div class="container">
            	<div class="row">
					<h4>Query Type</h4>
					<div class="col">
					    <div class="funkyradio">
					        <div class="funkyradio-warning">
					            <input type="checkbox" name="checkbox" id="checkbox1" checked/>
					            <label for="checkbox1">Cluster Resource</label>
					        </div>
					    </div>
					</div>
					<div class="col">
					    <div class="funkyradio">
					        <div class="funkyradio-warning">
					            <input type="checkbox" name="checkbox" id="checkbox2" />
					            <label for="checkbox2">Node Resource</label>
					        </div>
					    </div>
				</div>
					<div class="col">
					    <div class="funkyradio">
					        <div class="funkyradio-warning">
					            <input type="checkbox" name="checkbox" id="checkbox3" />
					            <label for="checkbox3">Job Scale</label>
					        </div>
					    </div>
					    
					    </div>
					<div class="col">
					    <div class="funkyradio">
					        <div class="funkyradio-warning">
					            <input type="checkbox" name="checkbox" id="checkbox4" />
					            <label for="checkbox4">Job Number</label>
					        </div>
					    </div>
					    </div>
					<div class="col">
					    <div class="funkyradio">
					        <div class="funkyradio-warning">
					            <input type="checkbox" name="checkbox" id="checkbox5" />
					            <label for="checkbox5">Job/Queue</label>
					        </div>
					    </div>
					  </div>
				 </div>
				 
				 
				 <div class="row">
					<h4>Query Date</h4>
					<div class="col-2">
					    <div class="funkyradio">
					        <div class="funkyradio-warning">
					            <input type="checkbox" name="checkbox" id="checkbox6" checked/>
					            <label for="checkbox6">Cluster Resource</label>
					        </div>
					    </div>
					</div>
					<div class="col-2">
					    <div class="funkyradio">
					        <div class="funkyradio-warning">
					            <input type="checkbox" name="checkbox" id="checkbox7" />
					            <label for="checkbox7">Node Resource</label>
					        </div>
					    </div>
				</div>
					<div class="col-2">
					    <div class="funkyradio">
					        <div class="funkyradio-warning">
					            <input type="checkbox" name="checkbox" id="checkbox8" />
					            <label for="checkbox8">Job Scale</label>
					        </div>
					    </div>
					 </div>
					 <div class="col-2">
						<br>
					 	<input type="date" class="form-control" placeholder="date input">
					 </div>
					 <div class="col-2">
					 	<br>
					 	<input type="date" class="form-control" placeholder="date input">
					 </div>
					 
				 </div>
				 
				 <div class="row">
				 	<div class="col text-right">
				 		<input type="button" class="btn btn-primary" value="Query">&nbsp;
				 		<input type="button" class="btn btn-primary" value="Export">
				 	</div>
				 </div>
		
			</div>
			
			<hr>
			
			<div class="container">
            	<div class="row">
            		<div class="col">
            		
            		 <div class="card" >
                            <div class="card-body" >
								<canvas id="myChart"></canvas>
							</div>
                        </div>
            		
            		</div>
            		<div class="col">
            			<table id="SubmitTrainTasksTable" class="display nowrap table table-hover table-bordered" cellspacing="0" width="100%">
						<thead class="table-success">
				    		<tr>
				    			<th width="30%">Time</th>
				    			<th width="30%">GPU Ratio</th>
				    			<th width="40%">Memory Ratio</th>
				    		</tr>
			    		</thead>
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
    
    var table = $('#SubmitTrainTasksTable').DataTable({
		'order': [1, 'desc']
    });
    
    $(function(){ 
		 
    		var ctx = document.getElementById( "myChart" );
    		ctx.height = 100;
    		
    		var myChart = new Chart( ctx, {
    			type: 'line',
    			data: {
    				labels: [04, 07, 10, 13, 16],
    				datasets: [
    					{
    						label: "Memory Ratio",
    						fill:false,
    						borderColor: "rgba(128,195,64,0.9)",
    						borderWidth: "1",
    						backgroundColor: "rgba(128,195,64,0.5)",
    						data: [ 15,16,17,20,25 ]
    	                },
    	                {
    						label: "CPU tatio",
    						fill:false,
    						borderColor: "rgba(77,106,187, 0.9)",
    						borderWidth: "1",
    						backgroundColor: "rgba(77,106,187, 0.5)",
    						pointHighlightStroke: "rgba(26,179,148,1)",
    						data: [ 0 ,1 , 0, 2,0]
    	                },
    	                ]
    			},
    			options: {
    				responsive: true,
    				tooltips: {
    					mode: 'index',
    					intersect: false
    				},
    				hover: {
    					mode: 'nearest',
    					intersect: true
    				},
    				scales: {
                        yAxes: [{
                                display: true,
                                ticks: {
                                    beginAtZero: true,
                                    steps: 10,
                                    stepValue: 5,
                                    max: 30,
                                }
                            }]
                    }

    			}
    		}); 
    });
    </script>

</body>
</html>