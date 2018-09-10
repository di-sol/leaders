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
<style>
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
</style>
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
    
    	<div class="unix-login">
	            <div class="container-fluid">
	                <div class="row justify-content-center">
	                    <div class="col-lg-8">
	                        <div class="login-content card">
	                            <div class="login-form">
	                                <h4 style="margin-bottom: 20px;">충전하기</h4>
	                               
	                               
	                               
	                               
	                                <form action="<%=cp%>/updatepw" method="POST">
		                                <div class="row">
			                                <div class="col">
			                                	<div class="form-group">
			                                        <label>잔액</label>
			                                        <input type="text" class="form-control" value="<fmt:formatNumber value="${MemberDTO.userBalance}" pattern="#,###"/>" readonly>
			                                    </div>
			                                    <div class="form-group">
			                                       <label>충전금액</label>
			                                        <div class="row">
								                     <div class="col-3">
								                        <div class="funkyradio">
								                           <div class="funkyradio-warning">
								                              <input type="radio" name="plusbalance" id="checkbox1" value="10000" onclick="plustotal()"/> 
								                              <label for="checkbox1">10,000</label>
								                           </div>
								                        </div>
								                     </div>
								                     <div class="col-3">
								                        <div class="funkyradio">
								                           <div class="funkyradio-warning">
								                              <input type="radio" name="plusbalance" id="checkbox2" value="30000" onclick="plustotal()"/>
								                              <label for="checkbox2">30,000</label>
								                           </div>
								                        </div>
								                     </div>
								                     <div class="col-3">
								                        <div class="funkyradio">
								                           <div class="funkyradio-warning">
								                              <input type="radio" name="plusbalance" id="checkbox3" value="50000" onclick="plustotal()"/>
								                              <label for="checkbox3">50,000</label>
								                           </div>
								                        </div>
								                     </div>
								                     <div class="col-3">
								                        <div class="funkyradio">
								                           <div class="funkyradio-warning">
								                              <input type="radio" name="plusbalance" id="checkbox4" value="100000" onclick="plustotal()"/>
								                              <label for="checkbox4">100,000</label>
								                           </div>
								                        </div>
								                     </div>
								                  </div>
			                                    </div>
			                                    <div class="form-group">
			                                       <label>충전 후 잔액</label>
			                                        <input type="text" class="form-control" name="balance" readonly>
			                                    </div>
			                              	</div>
		                               	</div>
										<div class="row">
											<div class="col-lg-6">
	                                    		<input type="button" class="btn btn-primary" value="확인" onclick="abcd()">
	                                   	 	</div>
	                                   	 	<div class="col-lg-6">
	                                   	 		<input type="button" class="btn btn-primary" value="취소" onclick="javascript:history.go(-1)">
	                                		</div>
	                                	</div>	                                	
	                                </form>
	                                
	                                
	                                
	                                
	                            </div>
	                        </div>
	                    </div>
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
    
    var userBalance = "${MemberDTO.userBalance}";
    
	function addComma(num) {
		  var regexp = /\B(?=(\d{3})+(?!\d))/g;
		   return num.toString().replace(regexp, ',');
	}
	
	function plustotal(){
   		var total = parseInt(userBalance) + parseInt($("input[name='plusbalance']:checked").val());
   		$("input[name='balance']").val(addComma(total));
   	}
    
	function abcd(){
		var total = parseInt(userBalance) + parseInt($("input[name='plusbalance']:checked").val());
		
		if($("input[name='plusbalance']:checked").val()==null) {
			alert("충전금액을 선택하세요.");
			return;
		}
		if(confirm("충전하시겠습니까?") == true){
			 $.ajax({
					url:'<%=cp%>/plusbalance',
					type:'POST',
					dataType:'text',
					data:{"price":$("input[name='plusbalance']:checked").val(),
						"balance":total
						},
					success:function(data){
						alert("충전되었습니다.");
						location.href = "<%=cp %>/mypage";
		   			}
				});
			 }else{
				 return;
			 }
	}
    </script>

</body>
</html>