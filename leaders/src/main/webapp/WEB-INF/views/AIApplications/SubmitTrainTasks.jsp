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
   href="<%=cp%>/resources/images/favicon.ico">
<%-- <link rel="icon" type="image/png" sizes="16x16" href="<%=cp %>/resources/images/favicon.png"> --%>
<title>LEADERS</title>
<link href="<%=cp%>/resources/css/lib/owl.carousel.min.css"
   rel="stylesheet" />
<link href="<%=cp%>/resources/css/lib/owl.theme.default.min.css"
   rel="stylesheet" />
<!-- Bootstrap Core CSS -->
<link href="<%=cp%>/resources/css/lib/bootstrap/bootstrap.min.css"
   rel="stylesheet">
<!-- Custom CSS -->
<link href="<%=cp%>/resources/css/helper.css" rel="stylesheet">
<link href="<%=cp%>/resources/css/style.css" rel="stylesheet">
<link
   href="<%=cp%>/resources/css/lib/calendar2/pignose.calendar.min.css"
   rel="stylesheet">
<link href="<%=cp%>/resources/css/lib/calendar2/semantic.ui.min.css"
   rel="stylesheet">

<link href="<%=cp%>/resources/css/lib/sweetalert/sweetalert.css"
   rel="stylesheet">

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:** -->
<!--[if lt IE 9]>
    <script src="https:**oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https:**oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
<style type="text/css">
ul.tabs {
   margin: 0px;
   padding: 0px;
   list-style: none;
}

ul.tabs li {
   background: none;
   color: #222;
   display: inline-block;
   padding: 10px 15px;
   cursor: pointer;
}

ul.tabs li.current {
   background: #ededed;
   color: #222;
}

.tab-content {
   display: none;
   background: #ededed;
   padding: 15px;
}

.tab-content.current {
   display: inherit;
}


checkbox -->.funkyradio div {
   clear: both;
   overflow: hidden;
}

.funkyradio label {
   width: 100%;
   border-radius: 3px;
   border: 1px solid #D1D3D4;
   font-weight: normal;
}

.funkyradio input[type="radio"]:empty, .funkyradio input[type="checkbox"]:empty
   {
   display: none;
}

.funkyradio input[type="radio"]:empty ~ label, .funkyradio input[type="checkbox"]:empty 
   ~ label {
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

.funkyradio input[type="radio"]:empty ~ label:before, .funkyradio input[type="checkbox"]:empty 
   ~ label:before {
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

.funkyradio input[type="radio"]:hover:not (:checked ) ~ label,
   .funkyradio input[type="checkbox"]:hover:not (:checked ) ~ label {
   color: #888;
}

.funkyradio input[type="radio"]:hover:not (:checked ) ~ label:before,
   .funkyradio input[type="checkbox"]:hover:not (:checked ) ~ label:before
   {
   content: '\2714';
   text-indent: .9em;
   color: #C2C2C2;
}

.funkyradio input[type="radio"]:checked ~ label, .funkyradio input[type="checkbox"]:checked 
   ~ label {
   color: #777;
}

.funkyradio input[type="radio"]:checked ~ label:before, .funkyradio input[type="checkbox"]:checked 
   ~ label:before {
   content: '\2714';
   text-indent: .9em;
   color: #333;
   background-color: #ccc;
}

.funkyradio input[type="radio"]:focus ~ label:before, .funkyradio input[type="checkbox"]:focus 
   ~ label:before {
   box-shadow: 0 0 0 3px #999;
}

.funkyradio-warning input[type="radio"]:checked ~ label:before,
   .funkyradio-warning input[type="checkbox"]:checked ~ label:before {
   color: #fff;
   background-color: #f0ad4e;
}


/* 정영현 추가 start */
.file_upload_div {
	display:inline-flex;
	width:100%;
}

.file_uplaod_name {
	width:80%;
}

.file_uplaod_set_info {
	display:inline-flex;
	width:100%;
}

/* 정영현 추가 end */


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
               <h3 class="text-primary">SubmitTrainTasks</h3>
            </div>
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
               <li class="tab-link current text" data-tab="tab-1"
                  style="margin-right: 20%">
                  <p style="font-size: 20px">1</p>Container
               </li>
               <li class="tab-link " data-tab="tab-2" style="margin-right: 20%">
                  <p style="font-size: 20px">2</p>Node
               </li>
               <li class="tab-link" data-tab="tab-3" style="margin-right: 20%">
                  <p style="font-size: 20px">3</p>Dataset
               </li>
               <li class="tab-link" data-tab="tab-4">
                  <p style="font-size: 20px">4</p>Task
               </li>
            </ul>
            <div class="progress">
               <div class="progress-bar progress-bar-striped bg-primary" id="bar"
                  role="progressbar" style="width: 25%" aria-valuenow="25"
                  aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <hr>


            <div id="tab-1" class="tab-content current">
               <div class="container">
                  <div class="row">
                     <div class="col-5">
                        <label><span style="color: red">*</span>Image</label>
                        <div class="col">
                           <select name='image' class="form-control">
                              <option value='선택' selected>-- Select --</option>
                              <option value='tensorflow'>nvcr.io/nvidia/tensorflow:18.04-py3/3.49GB</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <br>

                  <div class="row">
                     <div class="col-5">
                        <label><span style="color: red">*</span>Resource</label>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col-3">
                        <div class="funkyradio">
                           <div class="funkyradio-warning">
                              <input type="radio" name="gpunum" id="checkbox1" value="1"
                                 checked /> <label for="checkbox1">1*GPU / 2*CPU</label>
                           </div>
                        </div>
                     </div>
                     <div class="col-3">
                        <div class="funkyradio">
                           <div class="funkyradio-warning">
                              <input type="radio" name="gpunum" id="checkbox2" value="2" />
                              <label for="checkbox2">2*GPU / 4*CPU</label>
                           </div>
                        </div>
                     </div>
                     <div class="col-3">
                        <div class="funkyradio">
                           <div class="funkyradio-warning">
                              <input type="radio" name="gpunum" id="checkbox3" value="4" />
                              <label for="checkbox3">4*GPU / 8*CPU</label>
                           </div>
                        </div>
                     </div>
                  </div>
                  <br>

                  <div class="row">
                     <div class="col-5">
                        <label><span style="color: red">*</span>Pod_Name</label> <input
                           class="form-control mr-sm-2" type="text" name="podname">
                     </div>
                  </div>



					<!-- 정영현 file upload 추가 start -->
					<br>
                  	<div class="row">
                     	<div class="col-5">
                     		<div>
                        		<label>File_Upload</label>
                        	</div> 
                        	
                       		<form name="file_upload_form" id="file_upload_form" method="post" enctype="multipart/form-data">
                       			<div class="file_upload_div">	
		                        	<input class="form-control mr-sm-2 file_uplaod_name" type="file" name="file">
		                        	<input class="btn" type="button" name="upload_button" value="Upload" onclick="fileUploadMethod();">
	                        	</div>
	                        	<br><br>
	                        	<div class="file_uplaod_set_info">
		                        	<div class="col-6">
			                        	<label>namespace (for upload)</label>
			                        	<input class="form-control mr-sm-2" type="text" name="upload_namespace" >
			                        	
		                        	</div>	                        	
		                        	<div class="col-6">
		                        		<label>podname (for upload)</label>
			                        	<input class="form-control mr-sm-2" type="text" name="upload_podname" >
		                        	</div>
	                        	</div>
                        	</form>

                     	</div>
                  	</div>
                  	<!-- 정영현 file upload 추가 start -->
                  	


                  <div class="row text-right">
                     <div class="col">
                        <input type="button" class="btn" value="Previous">&ensp;
                        <input type="button" class="btn btn-danger" value="Submit"
                           style="margin-right: 10%" onclick="check()">
                        <!-- 
                        <input type="button" class="btn btn-primary" value="Next"  style="margin-right:10%" onclick="next1()">
                         -->
                     </div>
                  </div>
               </div>
            </div>

            <div id="tab-2" class="tab-content">
               <div class="container">
                  <div class="row">
                     <div class="col-5">2</div>
                  </div>

                  <div class="row text-right">
                     <div class="col">
                        <input type="button" class="btn btn-primary" value="Previous"
                           onclick="back1();">&ensp; <input type="button"
                           class="btn btn-primary" value="Next" style="margin-right: 10%"
                           onclick="next2()">
                     </div>
                  </div>
               </div>
            </div>

            <div id="tab-3" class="tab-content">
               <div class="container">
                  <div class="row">
                     <div class="col-5">3</div>
                  </div>

                  <div class="row text-right">
                     <div class="col">
                        <input type="button" class="btn btn-primary" value="Previous"
                           onclick="back2();">&ensp; <input type="button"
                           class="btn btn-primary" value="Next" style="margin-right: 10%"
                           onclick="next3()">
                     </div>
                  </div>
               </div>
            </div>

            <div id="tab-4" class="tab-content">
               <div class="container">
                  <div class="row">
                     <div class="col-5">4</div>
                  </div>
                  <div class="row text-right">
                     <div class="col">
                        <input type="button" class="btn btn-primary" value="Previous"
                           onclick="back3();">&ensp; <input type="button"
                           class="btn btn-danger" value="Submit" style="margin-right: 10%">
                     </div>
                  </div>
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
   <script src="<%=cp%>/resources/js/lib/jquery/jquery.min.js"></script>
   <!-- Bootstrap tether Core JavaScript -->
   <script src="<%=cp%>/resources/js/lib/bootstrap/js/popper.min.js"></script>
   <script src="<%=cp%>/resources/js/lib/bootstrap/js/bootstrap.min.js"></script>
   <!-- slimscrollbar scrollbar JavaScript -->
   <script src="<%=cp%>/resources/js/jquery.slimscroll.js"></script>
   <!--Menu sidebar -->
   <script src="<%=cp%>/resources/js/sidebarmenu.js"></script>
   <!--stickey kit -->
   <script
      src="<%=cp%>/resources/js/lib/sticky-kit-master/dist/sticky-kit.min.js"></script>

   <script
      src="<%=cp%>/resources/js/lib/weather/jquery.simpleWeather.min.js"></script>
   <script src="<%=cp%>/resources/js/lib/weather/weather-init.js"></script>
   <script
      src="<%=cp%>/resources/js/lib/owl-carousel/owl.carousel.min.js"></script>
   <script
      src="<%=cp%>/resources/js/lib/owl-carousel/owl.carousel-init.js"></script>
   <!--Custom JavaScript -->
   <script src="<%=cp%>/resources/js/custom.min.js"></script>

   <script src="<%=cp%>/resources/js/lib/calendar-2/moment.latest.min.js"></script>
   <!-- scripit init-->

   <!-- newAlarmModal 이랑 겹쳐서 에러 남 , 그래서 주석 처리함 나중에 필요하면 로직 수정해야됨. -->
   <%-- <script src="<%=cp %>/resources/js/lib/calendar-2/semantic.ui.min.js"></script> --%>

   <!-- scripit init-->
   <script src="<%=cp%>/resources/js/lib/calendar-2/prism.min.js"></script>
   <!-- scripit init-->
   <script
      src="<%=cp%>/resources/js/lib/calendar-2/pignose.calendar.min.js"></script>
   <!-- scripit init-->
   <script src="<%=cp%>/resources/js/lib/calendar-2/pignose.init.js"></script>

   <!-- Chart Js include -->
   <script src="<%=cp%>/resources/js/lib/chart-js/Chart.bundle.js"></script>

   <script src="<%=cp%>/resources/js/lib/sweetalert/sweetalert2.all.js"></script>

   <!-- data table -->
   <script src="<%=cp%>/resources/js/lib/datatables/datatables.min.js"></script>
   <script
      src="<%=cp%>/resources/js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/dataTables.buttons.min.js"></script>
   <script
      src="<%=cp%>/resources/js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.flash.min.js"></script>
   <script
      src="<%=cp%>/resources/js/lib/datatables/cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"></script>
   <script
      src="<%=cp%>/resources/js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/pdfmake.min.js"></script>
   <script
      src="<%=cp%>/resources/js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/vfs_fonts.js"></script>
   <script
      src="<%=cp%>/resources/js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.html5.min.js"></script>
   <script
      src="<%=cp%>/resources/js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.print.min.js"></script>
   <script src="<%=cp%>/resources/js/lib/datatables/datatables-init.js"></script>

	<!-- file upload 위한 jquery.form.js 추가  -->
   	<script src="<%=cp%>/resources/js/jquery.form.js"></script>
	
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

      function next1() {
         $("#tab-2").show();
         $("#tab-1").hide();

         $("#bar").css({
            "width" : "50%",
            "aria-valuenow" : "50"
         });

         $('ul.tabs li:nth-child(2)').addClass('current');
         $("#tab-2").addClass('current');
      }
      function back1() {
         $("#tab-1").show();
         $("#tab-2").hide();

         $("#bar").css({
            "width" : "25%",
            "aria-valuenow" : "25"
         });

         $('ul.tabs li:nth-child(1)').addClass('current');
         $('ul.tabs li:nth-child(2)').removeClass('current');
         $("#tab-2").removeClass('current');
      }
      function next2() {
         $("#tab-3").show();
         $("#tab-2").hide();

         $("#bar").css({
            "width" : "75%",
            "aria-valuenow" : "75"
         });

         $('ul.tabs li:nth-child(3)').addClass('current');
         $("#tab-3").addClass('current');
      }
      function back2() {
         $("#tab-2").show();
         $("#tab-3").hide();

         $("#bar").css({
            "width" : "50%",
            "aria-valuenow" : "50"
         });

         $('ul.tabs li:nth-child(3)').removeClass('current');
         $("#tab-3").removeClass('current');
      }
      function next3() {
         $("#tab-4").show();
         $("#tab-3").hide();

         $("#bar").css({
            "width" : "100%",
            "aria-valuenow" : "100"
         });

         $('ul.tabs li:nth-child(4)').addClass('current');
         $("#tab-4").addClass('current');
      }
      function back3() {
         $("#tab-3").show();
         $("#tab-4").hide();

         $("#bar").css({
            "width" : "75%",
            "aria-valuenow" : "75"
         });

         $('ul.tabs li:nth-child(4)').removeClass('current');
         $("#tab-4").removeClass('current');
      }

      function check() {
         if ($("select[name='image']").val() == null
               || $("select[name='image']").val() == "선택") {
            alert("image를 선택해주세요.");
            $("select[name='image']").focus();
            return false;
         }
         if ($("input[name='podname']").val() == null
               || $("input[name='podname']").val() == "") {
            alert("Pod_Name을 입력해주세요.");
            $("input[name='podname']").focus();
            return false;
         }
          
         var podname =  $('input[name="podname"]').val();
         
         //공백체크
         if(podname.search(/\s/) != -1) {
            alert("Pod_Name에 공백은 포함될 수 없습니다.");
            return true; 
         }
         //특수문자체크
         if(podname.search(/[~!@\#$%<>^&*\()\=+_\’]/) != -1) {
            alert("Pod_Name에 '-'를 제외한 특수문자는 포함될 수 없습니다.");
            return true; 
         }   
         //공백체크예외 : -허용
         if(podname.substr(podname.length-1)=="-"){
            alert("Pod_Name의 '-'는 마지막에 위치할 수 없습니다.");
            return true; 
         }
         //한글체크
         if(podname.search(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/) != -1) {
            alert("Pod_Name에 한글은 입력될 수 없습니다.");
            return true; 
         }   
         //create_pod(pod_name, namespace, gpu_num)
         var userid = "${userid}";
         
         // 정영현
            // ajax로 get_all_pods 로 이름 중복 체크
            returnTrue = false;
            $.ajax({
               url : 'http://210.110.195.12:5000/get_pods',
               type : 'POST',
               dataType : 'json',
               data : {"namespace":userid},
               async : false, /* 동기화 처리 해야 된다. */ 
               success : function(data) {
                  console.log(data);
                  
                  for (var i=0; i<data.items.length; i++) {
                     var name = data.items[i].metadata.name;
                     if ($("input[name='podname']").val() == name) {
                        swal("namespace 안의 Pod 이름이 중복입니다.","","error");
                        returnTrue = true;
                        break;
                     }
                  }

               }
            });
            
            if (returnTrue) { 
               return;
            }

            $.ajax({
               url : 'http://210.110.195.12:5000/create_pod',
               type : 'POST',
               dataType : 'json',
               data : {
                  "pod_name" : $("input[name='podname']").val(),
                  "namespace" : userid,
                  "gpu_num" : $("input[name='gpunum']:checked").val()
               },
               success : function(data) {
                  alert("Submit");
                  location.href = "<%=cp %>/FeatureMonitor/teyeMonitor";
                  
                  // 정영현 
                  // error function 추가 이름 중복 예외 처리, 이건 그냥 혹시나 모르니깐 오류 처리로 남겨두고, 이름 중복은 사전에 체크 해줄것, 이름 중복 말고 다른이유로 에러 날수도 있으니깐
               },error:function(json){
                  console.log(json.statusText == "error");
                  if (json.statusText == "error") {
                     swal("생성 실패 했습니다.","","error");
                  }
               }
            });
      }
      
      
      	// 정영현 file upload 추가 start
      	function fileUploadMethod () {
      		console.log($("input[name='upload_namespace']").val());
      		console.log($("input[name='upload_podname']").val());
      		$("#file_upload_form").ajaxForm({
                url : "http://210.110.195.12:5000/upload",
                enctype : "multipart/form-data",
                dataType : "json",
                data : {
					"namespace":$("input[name='upload_namespace']").val(),
					"podname":$("input[name='upload_podname']").val()
              	},
                success : function(result){
                	console.log(result);
                	swal("File Upload Success","","success");
                },
                error : function(result){
                	console.log(result);
                	
                	// 아래와 같은 에러 뜨기는 한데 이거 뜨면 upload 성공임
                	// responseText:"Missing the required parameter `name` when calling `read_namespaced_pod`"
                	if (result.responseText == "Missing the required parameter `name` when calling `read_namespaced_pod`") {
                		swal("File Upload Success","","success");
                	} else {
                		swal("File Upload Failed","","error");
                	}
                }
         	});
         	$("#file_upload_form").submit();
     	}
     	// 정영현 file upload 추가 end
      
   </script>

</body>
</html>