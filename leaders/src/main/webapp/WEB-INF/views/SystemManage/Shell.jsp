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
</head>

<style>
	.tree_box { width:250px; border:1px solid #ccd3d9;margin: 30px auto;}
	.tree_box .title { padding:5px 0 5px 19px ;background:#f8f8f9;border-bottom:1px solid #ccd3d9;}
	.tree_box .title strong {margin-right:12px;}
	.tree_menu {line-height:18px; padding:10px;}
	.tree_menu strong {font-weight:normal;}
	.tree_menu label input {vertical-align:-2px;}
	.tree_menu .depth_1 a {vertical-align:bottom;text-decoration:none;}
	.tree_menu .depth_1 strong {padding-left:19px;background:url(http://cfile26.uf.tistory.com/image/224E6B45569458082AA795) no-repeat 0px 2px;}
	.tree_menu .depth_2 li {margin-top:-2px;background:url(http://cfile9.uf.tistory.com/image/22601F4B569457FF051E7E) no-repeat 5px 0px;}
	.tree_menu .depth_2 li a em {display:inline-block;width:31px;height:11px;background:url(http://cfile27.uf.tistory.com/image/2265AB4B569457FD1306CB) 100% 0;font-size:0;line-height:0;vertical-align:middle;}
	.tree_menu .depth_2 li a em.on {background-position:0 100%;}
	.tree_menu li.last {background:none;}
	.tree_menu li.last {background:none;}
	.tree_menu .depth_3 {display:none;padding-left:23px;} 
	.tree_menu .depth_3 li {margin:0;padding:3px 0 0 14px;line-height:1;background:url(http://cfile8.uf.tistory.com/image/2456D34B569457FC14828D) no-repeat 0 0;}
	.tree_menu .depth_3 li a {display:block;}
	.msie6 .tree_menu .depth_3 li a {display:inline-block;}
	.tree_menu li.end {background:url(http://cfile23.uf.tistory.com/image/2272CF4B5694580418FF9C) no-repeat 0 0;}
	.form_tree_menu .depth_1 {background:url(http://cfile9.uf.tistory.com/image/22601F4B569457FF051E7E) no-repeat 5px 5px;}
	.form_tree_menu ul.depth_2 li {margin-left:6px;padding-left:27px;background:url(http://cfile25.uf.tistory.com/image/2757834B5694580514C5D6) no-repeat 0 5px;}
	

	/* 정영현 추가 start */
		
	.tree_box_parents {
		height:70%;
		background-color:white; 
		width:280px;
	}
	
	.input_console {
		background-color: black;
		color: white;
		width: 100%;
    	height: 740px;
	}
	
	.input_console::selection {
	    background-color: white;
	    color: black;
	}
	
	.custom-menu {
	    display: none;
	    z-index: 1000;
	    position: absolute;
	    overflow: hidden;
	    border: 1px solid #CCC;
	    white-space: nowrap;
	    font-family: sans-serif;
	    background: #FFF;
	    color: #333;
	    border-radius: 5px;
	    padding: 0;
	}
	
	/* Each of the items in the list */
	.custom-menu li {
	    padding: 8px 12px;
	    cursor: pointer;
	    list-style-type: none;
	    transition: all .3s ease;
	    user-select: none;
	}
	
	.custom-menu li:hover {
	    background-color: #DEF;
	}
	/* 정영현 추가 end */
	
</style>



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
                    <h3 class="text-primary">Shell</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">SystemManage</a></li>
                        <li class="breadcrumb-item active">Shell</li>
                    </ol>
                </div>
            </div>
            <!-- End Bread crumb -->
          
          <div class="row">
          	<div class="col-auto"></div>
			<div class="col-2">
				<div class="row">
				 	<div class="col-8">&emsp;CLUSTER DIAGRAM</div>
				 	<div class="col"><i class="fa fa-chevron-down" aria-hidden="true"></i></div>
				</div>
				<br>
				<div class="row border tree_box_parents">
				
				 	<div class="col">
				 		<div class="tree_box">
					    <div class="con">
					        <ul id="tree_menu" class="tree_menu">
					        	<ul class="depth_2" >
				                    <li>
				                        <a href="javascript:void(0)" id="namespace_intree"><input type="checkbox"><i class="fa fa-desktop" aria-hidden="true"></i>&nbsp;</a>
				                        <ul class="depth_3">
				                            
				                        </ul>
				                    </li>
				                </ul>
					        </ul>
					    </div>
						</div>
					</div>
				</div>
				<br>
				<div class="row">	 	
					<div class="col"><input type="button" class="btn btn-primary" value="Shell view"></div>
			 		<div class="col"><input type="button" class="btn btn-primary" value="Text view"></div>
				</div>
			</div>
			  
				<div class="col-8">
					<div class="row">
					  	<div class="col-8"><i class="fa fa-exchange" aria-hidden="true"></i>&emsp;Click to expand / fold shell page</div>
				  	</div>
				  	<br>
				  	
				  	<!-- 정영현 수정 start -->
				  	<!-- <div class="row border" style="height:75%;background-color:black;"></div> -->
				  	<div>
						<textarea class="input_console" spellcheck="false"></textarea>
						<!-- 											
						<input type="text" id="message">
						<input type="button" id="btn1"> 
						-->
					</div>
					<!-- 정영현 수정 end -->
					
				</div>
			
			</div>

            <!-- End Container fluid  -->
            <!-- footer -->
            <footer class="footer"> © 2018 All rights reserved. <a href="http://leaderssys.com/" target="_blank">[주]리더스시스템즈</a></footer>
            <!-- End footer -->
        </div>
        <!-- End Page wrapper  -->
    </div>
    
    <!-- 정영현 우클릭 context menu start -->
    <!-- div 밖에 위치해야지 event.pageX, event.pageY position 제대로 적용된다. -->
	<ul class='custom-menu'>
	  	<li data-action="clear_console">Clear Console</li>
	  	<li data-action="reload_page">Reload Page</li>
	</ul>
    <!-- 정영현 우클릭 context menu end -->	
	
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
	
	<!-- 정영현 추가 web socket -->
    <script src="<%=cp %>/resources/js/lib/socketio/socket.io.js"></script>
    
    <script type="text/javascript">

    	// 정영현 추가 start			
		// web socket 통신, 공용사용을 위해 전역 변수로
	    var address = '210.110.195.12';
	    var portnum = '5001';
	    var socket = io.connect('http://' + address + ':' + portnum + '/test');

	    var input_tag = '';
	    function set_input_tag (pod_name, namespace) {
	    	this.input_tag = "[" + pod_name + "@" + namespace + "] >>";
	    } 
	    
	    function get_input_tag () {
	    	return this.input_tag;
	    }
	    
		$(document).ready(function(){
			// tree connection to function , tree 구성 부분
			// tree 에 namespace(userid) 넣기 
			$("#namespace_intree").append("${userid}");
			
			// admin, user 별 pods list 다르게 가져오기 위함
			var sendUrl = "";
	    	// console.log('${isadmin}');
	
	    	if ('${isadmin}' == 1) { // admin 일때
	    		sendUrl = 'http://210.110.195.12:5000/get_all_pods';
	    		inputdata = {};
	    	} else { // user 일때 
	    		sendUrl = 'http://210.110.195.12:5000/get_pods';
	    		inputdata = {"namespace":"${userid}"};
	    	}
	    	
	    	$.ajax({
				url: sendUrl,
				type:'POST',
				dataType:'json',
				async:false,
				data:inputdata,
				success:function(data){

					// pods list 만들어서 list 에 append 해줄것
					for (var i=0; i<data.items.length; i++) {
						
						var pod_name = data.items[i].metadata.name;
						var namespace = data.items[i].metadata.namespace;
						if (namespace != "kube-system") { // kube-system 이 아닐때만 추가 
							htmlString = 	'<li><a href="javascript:void(0)" onclick="executePod(\'' + pod_name + '\',\'' + namespace + '\');">' + 
							'<input type="checkbox"><i class="fa fa-laptop" aria-hidden="true"></i>&nbsp;' + pod_name + '</a></li>';
					
        					$(".depth_3").append(htmlString);							
						}
					}
				}
			});
	    	
	    	 
			// web socket 통신 부분
		    // socket 받는값
		    socket.on('my response', function(msg) {
		    	var data = msg.data.trim();
		    	// console.log(data);
		    	if (msg.data == "Connected") {
		    		// 처음들어오면 Connected라는 문구 console 에 입력되는데 재접속했을때도 없으니깐 일관성 유지 위해 그냥 없앨것
		    		return;
		    	}
		    	if (data != "") { // 응답이 있으면 
			    	str = msg.data + " \n";
			    	$('.input_console').val($('.input_console').val() + str);
		    	} 

		    	$('.input_console').val($('.input_console').val() + get_input_tag());
		    	
		    	// auto textarea scroll down
		        autoTextareaScrollDown();
		        
		        // 소켓 응답 받으면 수정 가능하게, 여러번 입력하면 입력 tag 앞에 인풋값이 위치하는 오류 발생
		        $(".input_console").prop('disabled', false);
		        $(".input_console").focus();
		    });
		    
	    	// console 창 입력 동작할수 있게끔
	    	$('.input_console').keydown(function (e) {

	    		// 마지막줄, 마지막 글자 정보 얻기
			    lines = jQuery('.input_console').val().split("\n");
			    lastLine = lines[lines.length - 1];
			   	lastStr = lastLine[lastLine.length-1];
			   	// console.log(lastStr);
			   	
	            // backspace 에다가 > 있으면 삭제 안되게
	            if (e.keyCode == 8 && lastStr == '>') { // backspace이면서 마지막이 > 인건 삭제 금지, >는 어차피 입력 금지기 때문에 input tag밖에 없다.
	            	e.preventDefault();
	            	return false;
	            }
	            
	            // console.log(e.keyCode);  
	            if (e.keyCode == 17 || e.keyCode == 88 || e.keyCode == 67 || e.keyCode == 86) { // ctrl 들어와서 x,c,v 복사 붙여넣기 할경우에는 커서이동되면 안된다
	            	// empty
	            } else {
		    		// 마지막 부분만 수정되도록 cursor 위치 맨마지막으로 이동
		            var tmp_value = $('.input_console').val();
		            $('.input_console').focus().val('').val(tmp_value);	            	
	            }

	            // 엔터키 동작
	  			if (e.keyCode == 13) {
				    command = lastLine.replace(get_input_tag(),"");
				    
				    // 특수문자 막기
				 	// [] ; & () | ` ' <>
		    		var stringRegx = /[\[\];&()|`\'<>]/gi; 
	    		    var isValid = true; 
	    		    if(stringRegx.test(command)) {
	    		    	$('.input_console').val($('.input_console').val() + "    ^^_input error \n" + get_input_tag());
	    		    	
				    	// auto textarea scroll down
					    autoTextareaScrollDown();
	    		    	return false; 
	    			}
	    		    
				    // console.log(lastLine);
				    // console.log("command : " + command);
				    $('.input_console').val($('.input_console').val() + " \n"); // 줄바꿈, append 로 하니깐 안되네
					
				    socket.emit('send_message', {data: command});

			    	// auto textarea scroll down
				    autoTextareaScrollDown();

			        // 소켓 응답 받으면 수정 가능하게, 여러번 입력하면 입력 tag 앞에 인풋값이 위치하는 오류 발생
			        $(".input_console").prop('disabled', true);
			        
				    return false;
	  			}
	  			
	  			// auto textarea scroll down, shift 누르면 맨위에 보여주는 에러 있다. 
	  			autoTextareaScrollDown();
			});

	    	
		});
    	
    	// pod 실행 부분
		function executePod (pod_name, namespace) {
			
    		var pre_tag = get_input_tag();
    		var isReturnExecute = false;
    		if (pre_tag == "") { // 처음 실행
    			// 처음 실행
    	    	swal({
    	   			title: 'Connect Pod',
    	   			text: 'Pod 접속 하시겠습니까?',
    	               	showCancelButton: true,
    	               	allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
    	               	confirmButtonColor: "#DD6B55",
    	               	allowEscapeKey: false,
    	   			}).then(function(result) {
    	   				if (result.dismiss === "cancel") { // 취소면 그냥 나감
    	   					return;
    	   				}
    	   				executePodRealMethod (pod_name, namespace);
    	   			});
    		
    		} else {
    			// 실행한적 있음
        		pre_tag = pre_tag.replace("[","");
        		pre_tag = pre_tag.replace("] >>","");
        		pre_tags = pre_tag.split("@");
        		pre_pod_name = pre_tags[0];
        		pre_namespace = pre_tags[1];
        		
        		if (pre_pod_name == pod_name && pre_namespace == namespace) { // 이름이 똑같으면
        	    	swal({
        	   			title: 'Re-Connect Pod',
        	   			text: '동일한 Pod 입니다. Pod 재접속 하시겠습니까?',
        	               	showCancelButton: true,
        	               	allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
        	               	confirmButtonColor: "#DD6B55",
        	               	allowEscapeKey: false,
        	   			}).then(function(result) {
        	   				if (result.dismiss === "cancel") { // 취소면 그냥 나감
        	   					return;
        	   				}
        	   				executePodRealMethod (pod_name, namespace);
        	   			});  			
        		} else {
        	    	swal({
        	   			title: 'Connect Pod',
        	   			text: '다른 Pod 실행중입니다.이 Pod 으로 접속 하시겠습니까?',
        	               	showCancelButton: true,
        	               	allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
        	               	confirmButtonColor: "#DD6B55",
        	               	allowEscapeKey: false,
        	   			}).then(function(result) {
        	   				if (result.dismiss === "cancel") { // 취소면 그냥 나감
        	   					return;
        	   				}
        	   			 	executePodRealMethod (pod_name, namespace);
        	   			});  
        		}

    		}

		}
    	
    	// 실제 실행시키는 메소드, swal 창 때문에 비동기 식으로 swal ok, cancel 응답을 받지않고 미리 실행시켜 버리더라, 캡슐화 위해서 따로 함수로 뺌
    	function executePodRealMethod (pod_name, namespace) {
    		set_input_tag(pod_name, namespace);
			// console clear
			$(".input_console").val("");
		    // pod 접속
		    socket.emit('create_exec',{podname: pod_name, namespace: namespace});
    	}
    	
    	
    	// 자동으로 textarea scroll down
    	function autoTextareaScrollDown() {
		    var height = $('.input_console').prop('scrollHeight');
		    // console.log(height);
		    $('.input_console').scrollTop(height);
    	}
    	
    	// right click context menu 구성
    	$(".input_console").bind("contextmenu", function (event) {
    		// Avoid the real one
    	    event.preventDefault(); // 웹 기본 우클릭 했을때 나오는 메뉴 막아줌
    	    // Show contextmenu
    	    $(".custom-menu").finish().toggle(100).
    	    // In the right position (the mouse)
    	    css({ 
    	        top: event.pageY + "px",
    	        left: event.pageX + "px"
    	    });
    	});
    	// If the document is clicked somewhere
    	$(".input_console").bind("mousedown", function (e) {
    	    // If the clicked element is not the menu
    	    if (!$(e.target).parents(".custom-menu").length > 0) {
    	        // Hide it
    	        $(".custom-menu").hide(100);
    	    }
    	});
    	// If the menu element is clicked
    	$(".custom-menu li").click(function(){
    	    // This is the triggered action name
    	    switch($(this).attr("data-action")) {
    	        // A case for each action. Your actions here
    	        case "clear_console": 
    	        	$(".input_console").val(""); 
		    		$('.input_console').val(get_input_tag());
    	        	break;
    	        	
    	        case "reload_page":
    	        	window.location.reload();
    	        	break;
    	    }
    	    // Hide it AFTER the action was triggered
    	    $(".custom-menu").hide(100);
    	});
    	// 정영현 추가 end
		
    	
    	// pods list drop down
    	function tree_menu() {
    	  	// $('.depth_2');
    	  	$('ul.depth_2 >li > a').click(function(e) {

	    	    var temp_el = $(this).next('ul');
	    	    var depth_3 = $('.depth_3');
	
	    	    // 처음에 모두 슬라이드 업 시켜준다.
	    	    depth_3.slideUp(300);
	    	    // 클릭한 순간 모두 on(-)을 제거한다.// +가 나오도록
	    	    depth_3.parent().find('em').removeClass('on');
	
	    	    if (temp_el.is(':hidden')) {
	    	      	temp_el.slideDown(300);
	    	      	$(this).find('em').addClass('on').html('하위폴더 열림');
	    	    } else {
	    	      	temp_el.slideUp(300);
	    	      	$(this).find('em').removeClass('on').html('하위폴더 닫힘');
	    	    }
	
	    	    return false;

    	  	});
    	}
    	if ($('#tree_menu').is(':visible')) {
    	  	tree_menu();
    	}
    	
    	
    </script>

</body>
</html>