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
	
		.monitoring-card {
			margin-left:10px;
			width:150px;
			height:150px;
			overflow:hidden;
			cursor:pointer;
		}
		
		.container_name_in_card {
			margin-bottom: 5px !important;
			max-height: 30px;
			max-width: 120px;
			overflow: hidden;
		} 
		
		.progress {
			margin:5 0 5 0;
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
                    <h3 class="text-primary">teyeMonitor</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">FeatureMonitor</a></li>
                        <li class="breadcrumb-item active">teyeMonitor</li>
                    </ol>
                </div>
            </div>
            <!-- End Bread crumb -->
            
            <div class="container">
  				<div class="row text-center">
         			<div class="col">
         				<div class="row text-center" id="monitoring-card-icons">
							<!-- monitoring icons 넣기 -->
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
    
    <!-- detail modal -->
	<div class="modal fade" id="monitor_detail_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document" style="min-width:700px;">
			<div class="modal-content">
				<div class="modal-header">
			   		<h3 class="modal-title" id="exampleModalCenterTitle"><label id="modal_name"></label></h3>
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="modalclose()" style="padding:0;">
			          	<span aria-hidden="true"><i class="fa fa-times fa-lg" aria-hidden="true"></i></span>
			        </button>
				</div>
				<div class="modal-body" style="display:inline-flex;">
					<div>
						<div>cpu : <label id="modal_requests_cpu"></label> m</div>
						<div>memory : <label id="modal_requests_memory"></label> Mi</div>
						<div>namespace : <label id="modal_namespace"></label></div>
						<div>creation_timestamp : <label id="modal_creation_timestamp"></label></div>
					</div>
                    <div class="col-sm">
                    	<label>USAGE(%)</label>
                       	<canvas id="myBarChart"></canvas>
                    </div>
				</div>
				<div class="modal-footer">
			        <button type="button" class="close" onclick="delete_pod();" style="padding:0;">
			          	<span aria-hidden="true"><i class="fa fa-trash"> Delete</i></span>
			        </button>&nbsp;&nbsp;&nbsp;&nbsp;
			        <button type="button" class="close" onclick="modalclose()" style="padding:0;">
			          	<span aria-hidden="true"><i class="fa fa-times"> Close</i></span>
			        </button>			        
				</div>
			</div>
		</div>
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
 	// detail 모달 만들기 위해서, 전역변수로 
	var detailArray = [];
 
    $(document).ready(function(){
    	
    	var sendUrl = "";
    	console.log('${userid}');
    	console.log('${isadmin}');

    	if ('${isadmin}' == 1) { // admin 일때
    		sendUrl = 'http://210.110.195.12:5000/get_all_pods';
    		inputdata = {};
    	} else { // user 일때 
    		sendUrl = 'http://210.110.195.12:5000/get_pods';
    		inputdata = {"namespace":'${userid}'};
    	}
    	
    	$.ajax({
			url: sendUrl,
			type:'POST',
			dataType:'json',
			async:false,
			data:inputdata,
			success:function(data){
				// console.log(data);
				// console.log(JSON.stringify(data));
				
				console.log(data.items);
				console.log(data.items.length);

				for (var i=0; i<data.items.length; i++) {
					console.log("============================================");
					console.log("i 번째 : " + i);
					
					// 시간은 보기 좋게 변경 해줄 것
					var time = new Date(data.items[i].metadata.creation_timestamp);
					console.log("trans time : " + time.toLocaleString());
					var creation_timestamp = time.toLocaleString();
					
					var name = data.items[i].metadata.name;
					console.log(data.items[i].metadata.name);
					
					var namespace = data.items[i].metadata.namespace;
					console.log(data.items[i].metadata.namespace);
					
					var limits_memory = 0;
					var requests_memory = 0;
					var requests_cpu = 0;
					
					// 혹시 containers 가 여러개면 합쳐줘야 돼서 
					var containers = data.items[i].spec.containers;
					for (var k=0; k<containers.length; k++) {
						
						// containers resources 에 있는 limits memory sumary
						try {
							limits_memory_str = containers[k].resources.limits.memory;
							if (limits_memory != null && limits_memory != undefined) {
								console.log("limits_memory_str : " + limits_memory_str);
								
								limits_memory_str = limits_memory_str.toLowerCase();
								split_index = limits_memory_str.lastIndexOf('m');
								limits_memory_str = limits_memory_str.substring(0,split_index);
								limits_memory += parseInt(limits_memory_str);
							} 
						} catch (e) {}
						
						// containers resources 에 있는 requests memory summary
						try {
							requests_memory_str = containers[k].resources.requests.memory;
							if (requests_memory != null && requests_memory != undefined) {
								console.log("requests_memory_str : " + requests_memory_str);	
								
								requests_memory_str = requests_memory_str.toLowerCase();
								split_index = requests_memory_str.lastIndexOf('m');
								requests_memory_str = requests_memory_str.substring(0,split_index);
								requests_memory += parseInt(requests_memory_str);
							} 
						} catch (e) {}
						
						
						// containers resources 에 있는 requests cpu sumary		
						try {
							requests_cpu_str = containers[k].resources.requests.cpu;
							if (requests_cpu_str != null && requests_cpu_str != undefined) {
								console.log("requests_cpu_str : " + requests_cpu_str);	
								
								requests_cpu_str = requests_cpu_str.toLowerCase();
								split_index = requests_cpu_str.lastIndexOf('m');
								requests_cpu_str = requests_cpu_str.substring(0,split_index);
								requests_cpu += parseInt(requests_cpu_str);
							} 
						} catch (e) {}
					}
					

					console.log("limits_memory : " + limits_memory + " , requests_memory : " + requests_memory + " , requests_cpu : " + requests_cpu);
					
					console.log("============================================");
					
					htmlString = "";
					
					htmlString += 	'<div class="card bg-success p-15 monitoring-card" onclick="clickedCard(' + i + ');">' + 
	                    				'<div class="media widget-ten">' + 
		                        			'<div class="media-body">' + 
			                            		'<h2 class="color-white container_name_in_card">' + name + '</h2>' + 
			                            		'<p class="m-b-0"> namespace : ' + namespace + '</p>' +
			                            		'<p class="m-b-0"> cpu : ' + requests_cpu + ' m</p>' +  
			                            		'<div class="progress">' + 
		  						  					'<div class="progress-bar bg-primary" role="progressbar" aria-valuenow="' + 10 + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + 10 + '%;"></div>' +
	  											'</div>' + 
			                            		'<p class="m-b-0"> mem : ' + requests_memory + ' Mi</p>' +
			                            		'<div class="progress">' + 
	  						  						'<div class="progress-bar bg-primary" role="progressbar" aria-valuenow="' + 10 + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + 10 + '%;"></div>' +
												'</div>' + 			                            		
		                        			'</div>' + 
	                    				'</div>' +
                					'</div>';
      					
                	$("#monitoring-card-icons").append(htmlString);


      				/* detail 세부 모달 만들기 위해서  */
  					detailArray.push({
	  					"name":name,
	  					"namespace":namespace,
	  					"creation_timestamp":creation_timestamp,
	  					"limits_memory":limits_memory,
	  					"requests_memory":requests_memory,
	  					"requests_cpu":requests_cpu
  					});
  					
  					// detailArray 여기에 담아서 나중에 index로 호출해서 사용할것, 
  					// 실시간 사용을 원하면 name을 parameter로 던지고 get_pods(namespace)로 데이터 가져와서 던진 parameter name이랑 일치하는 데이터 추출할것, 
  					// 변경하게 된다면 detailArray 지우고 clickedCard 이로직도 수정해야 됨
				}
			}
		});
    	
    	console.log(detailArray);
    });

    
    function clickedCard (index) {
    	
    	// console.log("clicked");
    	
    	$("#monitor_detail_modal").modal('show');
		$("#monitor_detail_modal").show();
		$(".modal-backdrop").show();
		
		$("#modal_name").text(detailArray[index].name);
		$("#modal_requests_cpu").text(detailArray[index].requests_cpu);
		$("#modal_requests_memory").text(detailArray[index].requests_memory);
		$("#modal_namespace").text(detailArray[index].namespace);
		$("#modal_creation_timestamp").text(detailArray[index].creation_timestamp);
		
		// kube system 은 delete button 안보이게
		var hide_namesapce = $("#modal_namespace").text();
		// console.log(hide_namesapce);
		// console.log(hide_namesapce == "kube-system");
		if (hide_namesapce == "kube-system") {
			$(".modal-footer").hide();
		} else {
			$(".modal-footer").show();
		}
    }
    
    function modalclose(){
    	// location.reload();
		$("#monitor_detail_modal").hide();
		$(".modal-backdrop").hide();
    }
    
    function delete_pod() {
    	var del_pod_name = $("#modal_name").text();
    	var del_namespace = $("#modal_namespace").text();
		
    	swal({
   			title: 'Delete Pod',
   			text: 'Pod 삭제 하시겠습니까? (10~20 초 소요됩니다.)',
               showCancelButton: true,
               allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
               confirmButtonColor: "#DD6B55",
               allowEscapeKey: false,
   			}).then(function(result) {
   				
   				console.log(result);
   				
   				if (result.dismiss === "cancel") { // 취소면 그냥 나감
   					return;
   				}
   				
   				$.ajax({
   					url: 'http://210.110.195.12:5000/delete_pod',
   					type:'POST',
   					dataType:'json',
   					async:false,
   					data: {
   						"pod_name":del_pod_name,
   						"namespace":del_namespace
   					},
   					success:function(data){
   						console.log(data);
   						console.log(JSON.stringify(data));
   						swal("삭제 성공 했습니다.","","success");
   						// window.location.reload();
   					}
   		    	});
   		    	
   			});
 
    }

    // chart 생성
	var ctx = document.getElementById( "myBarChart" );
	ctx.height = 200;
	
	var myBarChart = new Chart( ctx, {
		type: 'bar',
		data: {
			datasets: [
				{
					label: "CPU",
					fill:false,
					borderColor: "rgba(0,0,0,0.5)",
					borderWidth: "1",
					backgroundColor: "#FF6384",
					hoverBackgroudColor: "#FF6384",
					data: [ 10 ]
                },
				{
					label: "MEM",
					fill:false,
					borderColor: "rgba(0,0,0,0.5)",
					borderWidth: "1",
					backgroundColor: "#36A2EB",
					hoverBackgroudColor: "#36A2EB",
					data: [ 10 ]
                }
			]
		},
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true,
	                  	step: 5,
	                 	max: 100,
                        userCallback: function(value, index, values) {
                           	value = value.toString();
                           	value = value.split(/(?=(?:...)*$)/);
                           	value = value.join(',');
                           	value += " %";
                           
                           	return value;
                        }
	            	}
	                
	            }]
	        }
	    }

	}); 
	
    </script>

</body>
</html>