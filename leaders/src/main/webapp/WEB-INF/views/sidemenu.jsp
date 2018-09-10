<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%

	String cp = request.getContextPath();

	request.setCharacterEncoding("UTF-8");

%>

<html><head>

 

    <link href="<%=cp %>/resources/css/lib/sweetalert/sweetalert.css" rel="stylesheet">

    

</head>
<body>

<!-- header header  -->

        <div class="header">

            <nav class="navbar top-navbar navbar-expand-md navbar-light">

                <!-- Logo -->

                <div class="navbar-header">

                    <a class="navbar-brand">
						
						<!-- 정영현 추가 start -->
                        <img id="logo_image" alt="" src="<%=cp %>/resources/icons/logo/logo_top.png">
						<!-- 정영현 추가 end -->
						
                    </a>

                </div>

                <!-- End Logo -->

                <div class="navbar-collapse">

                    <!-- toggle and nav items -->

                    <ul class="navbar-nav mr-auto mt-md-0">

                        <!-- This is  -->

                        <li class="nav-item"> <a class="nav-link nav-toggler hidden-md-up text-muted  " href="javascript:void(0)"><i class="mdi mdi-menu"></i></a> </li>
						
						<!-- 정영현 onclick 추가  -->
                        <li class="nav-item m-l-10"> <a class="nav-link sidebartoggler hidden-sm-down text-muted  " href="javascript:void(0)" onclick="clickHideMenu();"><i class="ti-menu"></i></a> </li>

                    </ul>

 

 					

                    <!-- User profile and search -->

                    <ul class="navbar-nav my-lg-0">

                    	<!-- 로그인 중일때만 -->

                        <li><a href="<%=cp%>/logout" style="color:#fff"><i class="fa fa-sign-out" style="color:#fff"></i><span class="text">&ensp;Logout</span></a></li>

                        <!--  -->

                    </ul>

                </div>

            </nav>

        </div>

        <!-- End header header -->

        <!-- Left Sidebar  -->

        <div class="left-sidebar">

            <!-- Sidebar scroll-->

            <div class="scroll-sidebar">

                <!-- Sidebar navigation-->

                <nav class="sidebar-nav">

                    <ul id="sidebarnav">

                        <li class="nav-devider"></li>

                        <li class="nav-label">

                        <c:if test="${isadmin eq 0}">

                        <a href="<%=cp%>/mypage">

                        </c:if>

                        <c:if test="${isadmin eq 1}">

                        <a>

                        </c:if>

                        <i class="fa fa-user"></i><span class="text">&ensp;${username}<br></span></a>          

                        <c:if test="${isadmin eq 0}">

                        <p>&emsp;&emsp;&emsp;&emsp;&ensp;user</p>

                        </c:if>

                        <c:if test="${isadmin eq 1}">

                        <p>&emsp;&emsp;&emsp;&emsp;&ensp;admin</p>

                        </c:if> 

                       <hr style=" border-color: #fff"> 

                      	 <li><a href="#" class="js-sub-menu-toggle"><i class="fa fa-th-list"></i><span class="hide-menu">AIResources</span></a>

							<ul class="sub-menu ">

								<li><a href="<%=cp%>/AIResources/GPUMonitor"><i class="fa fa-desktop"></i><span class="text">&ensp;GPUMonitor</span></a></li>

								<li><a href="<%=cp%>/AIResources/GPUservers"><i class="fa fa-th-large"></i><span class="text">&ensp;GPUservers</span></a></li>

							</ul>

						</li>

                       <li><a href="#" class="js-sub-menu-toggle"><i class="fa fa-desktop"></i><span class="hide-menu">AlApplications</span></a>

							<ul class="sub-menu ">

								<li><a href="<%=cp%>/AIApplications/SubmitTrainTasks"><i class="fa fa-briefcase"></i><span class="text">&ensp;SubmitTrainTasks</span></a></li>

								<li><a href="<%=cp%>/AIApplications/SourcesApply"><i class="fa fa-briefcase"></i><span class="text">&ensp;SourcesApply</span></a></li>

								<li><a href="<%=cp%>/AIApplications/TasksManage"><i class="fa fa-align-justify"></i><span class="text">&ensp;TasksManage</span></a></li>

								<li><a href="<%=cp%>/AIApplications/TasksCompleted"><i class="fa fa-list-ul"></i><span class="text">&ensp;TasksCompleted</span></a></li>

							</ul>

						</li>

						<li><a href="#" class="js-sub-menu-toggle"><i class="fa fa-clone"></i><span class="hide-menu">ImagesManage</span></a>

							<ul class="sub-menu ">

								<li><a href="<%=cp%>/ImagesManage/ImagesManager"><i class="fa fa-cloud-download"></i><span class="text">&ensp;ImageManager</span></a></li>

							</ul>

						</li><li><a href="#" class="js-sub-menu-toggle"><i class="fa fa-desktop"></i><span class="hide-menu">FeatureMonitor</span></a>

							<ul class="sub-menu ">

								<li><a href="<%=cp%>/FeatureMonitor/teyeMonitor"><i class="fa fa-eye"></i><span class="text">&ensp;teyeMonitor</span></a></li>

								<li><a href="<%=cp%>/FeatureMonitor/teyeExport"><i class="fa fa-retweet"></i><span class="text">&ensp;teyeExport</span></a></li>

							</ul>

						</li>

						

						<c:if test="${isadmin eq 1}">

						<li><a href="#" class="js-sub-menu-toggle"><i class="fa fa-bell-o"></i><span class="hide-menu">Alarm</span></a>

							<ul class="sub-menu ">

								<li><a href="<%=cp%>/Alarm/AlarmThreshold"><i class="fa fa-table"></i><span class="text">&ensp;AlarmThreshold</span></a></li>

								<li><a href="<%=cp%>/Alarm/AlarmSetting"><i class="fa fa-cog"></i><span class="text">&ensp;AlarmSetting</span></a></li>

								<li><a href="<%=cp%>/Alarm/AlarmInfo"><i class="fa fa-commenting-o"></i><span class="text">&ensp;AlarmInfo</span></a></li>

							</ul>

						</li>

						<li><a href="#" class="js-sub-menu-toggle"><i class="fa fa-print"></i><span class="hide-menu">Report</span></a>

							<ul class="sub-menu ">

								<li><a href="#" class="js-sub-menu-toggle"><i class="fa fa-balance-scale"></i><span class="hide-menu">&ensp;Account</span></a>

									<ul class="sub-menu ">

										<li><a href="<%=cp%>/Report/Account/AccountConfig" class="js-sub-menu-toggle"><i class="fa fa-cog"></i><span class="text">&ensp;AccountConfig</span></a></li>

										<li><a href="<%=cp%>/Report/Account/PayManage"><i class="fa fa-credit-card-alt"></i><span class="text">&ensp;PayManage</span></a></li>

										<li><a href="<%=cp%>/Report/Account/BillReport"><i class="fa fa-wpforms"></i><span class="text">&ensp;BillReport</span></a></li>

									</ul>

								</li>

								<li><a href="<%=cp%>/Report/ClusterReport"><i class="fa fa-book"></i><span class="hide-menu">&ensp;ClusterReport</span></a></li>

							</ul>

						</li>

						</c:if>

						

						

						

						<li><a href="#" class="js-sub-menu-toggle"><i class="fa fa-gavel"></i><span class="hide-menu">SystemManage</span></a>

							<ul class="sub-menu ">

								<c:if test="${isadmin eq 1}">

								<li><a href="<%=cp%>/SystemManage/User"><i class="fa fa-user"></i><span class="text">&ensp;User</span></a></li>

								<li><a href="<%=cp%>/SystemManage/Group"><i class="fa fa-users"></i><span class="text">&ensp;Group</span></a></li>

								<li><a href="<%=cp%>/SystemManage/Queue"><i class="fa fa-list-ol"></i><span class="text">&ensp;Queue</span></a></li>
								
								</c:if>

								<li><a href="<%=cp%>/SystemManage/Shell"><i class="fa fa-terminal"></i><span class="text">&ensp;Shell</span></a></li>

							</ul>

						</li>

						<li><a href="#" class="js-sub-menu-toggle"><i class="fa fa-puzzle-piece"></i><span class="hide-menu">Tools</span></a>

							<ul class="sub-menu ">

								<li><a href="<%=cp%>/Tools/File"><i class="fa fa-file-o"></i><span class="text">&ensp;File</span></a></li>

							</ul>

						</li>

						<c:if test="${isadmin eq 1}">

						<li><a href="#" class="js-sub-menu-toggle"><i class="fa fa-cogs"></i><span class="hide-menu">Setting</span></a>

							<ul class="sub-menu ">

								<li><a href="<%=cp%>/Setting/Module"><i class="fa fa-sliders"></i><span class="text">&ensp;Module</span></a></li>

							</ul>

						</li> 

						</c:if>

 

                    </ul>

                </nav>

                <!-- End Sidebar navigation -->

            </div>

            <!-- End Sidebar scroll-->

        </div>

        <!-- End Left Sidebar  -->

		

	<!-- All Jquery -->

    <script src="<%=cp %>/resources/js/lib/jquery/jquery.min.js"></script>

	<%-- <script src="<%=cp %>/resources/js/lib/sweetalert/sweetalert.min.js"></script> --%>

	<script src="<%=cp %>/resources/js/lib/sweetalert/sweetalert2.all.js"></script>

		

	<script type="text/javascript">
	
		// 정영현 추가 start
		// menu click 시 logo hide / show 처리  
		var isMenuHide = false;
 		function clickHideMenu () {	
 			if (isMenuHide) {
 				isMenuHide = false;
 				$("#logo_image").attr("src","<%=cp %>/resources/icons/logo/logo_top.png");	
 			} else {
 				isMenuHide = true;
 				$("#logo_image").attr("src","");
 			}
 		}
 		// 정영현 추가 end

	</script>

	</body>

</html>