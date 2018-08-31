
function addBtnClicked(serviceofferingkind) {
	if (serviceofferingkind == 'cpt')
		$("#computecreateBtn").modal('show');
	else if (serviceofferingkind == 'sys')
		$("#systemcreateBtn").modal('show');
	else if (serviceofferingkind == 'disk')
		$("#diskcreateBtn").modal('show');
	else if (serviceofferingkind == 'net')
		$("#networkcreateBtn").modal('show');
	else if (serviceofferingkind == 'vpc')
		$("#vpccreateBtn").modal('show');
}
  
//compute offering create

$('.computeresource-add-btn').click(function() {
	addBtnClicked('cpt');
});

//create 모달 메뉴 숨기기
$(function() {

	var con1 = document.getElementById('computetrnumberofcores');
	var con2 = document.getElementById('computetrcpu');
	var con3 = document.getElementById('computetrmemory');
	var con4 = document.getElementById('computetrdomain');
	var con5 = document.getElementById('computetrplannermode');
	var con6 = document.getElementById('computetrdrrbps');
	var con7 = document.getElementById('computetrdwrbps');
	var con8 = document.getElementById('computetrdrriops');
	var con9 = document.getElementById('computetrdwriops');
	var con10 = document.getElementById('trcomputecustomiops');
	var con11 = document.getElementById('trcomputetminiops');
	var con12 = document.getElementById('trcomputemaxiops');
	var con13 = document.getElementById('trcomputehsr');
	

	$("#computecustom").on('click', function() {
		if ($("#computecustom").is(":checked")) {
			con1.style.display = 'none';
			con2.style.display = 'none';
			con3.style.display = 'none';
		}

		else {
			con1.style.display = '';
			con2.style.display = '';
			con3.style.display = '';
		}
	});
	
	$("#computepublic").on('click', function() {
		if ($("#computepublic").is(":checked")) {
			con4.style.display = 'none';
		}

		else {
			con4.style.display = '';
		}
	});
	
	$("#computedeploymentplanner")
	.on(
			'change',
			function() {
				if ($("#computedeploymentplanner option:selected")
						.val() == "ImplicitDedicationPlanner") {
					con5.style.display = '';
				}

				else {
					con5.style.display = 'none';
				}
			});
	
	$("#computeqostype").on('change', function() {
		if ($("#computeqostype option:selected").val() == "storage") {
			con6.style.display = 'none';
			con7.style.display = 'none';
			con8.style.display = 'none';
			con9.style.display = 'none';
			con10.style.display = '';
			con11.style.display = '';
			con12.style.display = '';
			con13.style.display = '';
			
		}

		else if ($("#computeqostype option:selected").val() == "hypervisor") {
			con6.style.display = '';
			con7.style.display = '';
			con8.style.display = '';
			con9.style.display = '';
			con10.style.display = 'none';
			con11.style.display = 'none';
			con12.style.display = 'none';
			con13.style.display = 'none';			
		}
		
		$("#computecustomiops").on('click', function() {
			if ($("#computecustomiops").is(":checked")) {
				con11.style.display = 'none';
				con12.style.display = 'none';
				con13.style.display = 'none';
			}

			else {
				con11.style.display = '';
				con12.style.display = '';
				con13.style.display = '';
			}
		});
	});
	
	
});

//system offering create

$('.systemresource-add-btn').click(function() {
	addBtnClicked('sys');
});

//create 모달 메뉴 숨기기
$(function() {

	var con1 = document.getElementById('trsystemnumberofcores');
	var con2 = document.getElementById('trsystemcpu');
	var con3 = document.getElementById('trsystemmemory');
	var con4 = document.getElementById('trsystemdomain');
	var con5 = document.getElementById('trsystemdrrbps');
	var con6 = document.getElementById('trsystemdwrbps');
	var con7 = document.getElementById('trsystemdrriops');
	var con8 = document.getElementById('trsystemdwriops');
	var con9 = document.getElementById('trsystemtminiops');
	var con10 = document.getElementById('trsystemmaxiops');

	$("#systemcustom").on('click', function() {
		if ($("#systemcustom").is(":checked")) {
			con1.style.display = 'none';
			con2.style.display = 'none';
			con3.style.display = 'none';
		}

		else {
			con1.style.display = '';
			con2.style.display = '';
			con3.style.display = '';
		}
	});
	
	$("#systempublic").on('click', function() {
		if ($("#systempublic").is(":checked")) {
			con4.style.display = 'none';
		}

		else {
			con4.style.display = '';
		}
	});
	

	$("#systemqostype").on('change', function() {
		if ($("#systemqostype option:selected").val() == "storage") {
			con5.style.display = 'none';
			con6.style.display = 'none';
			con7.style.display = 'none';
			con8.style.display = 'none';
			con9.style.display = '';
			con10.style.display = '';
		}

		else if ($("#systemqostype option:selected").val() == "hypervisor") {
			con5.style.display = '';
			con6.style.display = '';
			con7.style.display = '';
			con8.style.display = '';
			con9.style.display = 'none';
			con10.style.display = 'none';
		}
	});
});

//disk offering create

$('.diskresource-add-btn').click(function() {
	addBtnClicked('disk');
});

//create 모달 메뉴 숨기기
$(function() {

	var con1 = document.getElementById('trdiskdisksize');
	var con2 = document.getElementById('trdiskdomain');
	var con3 = document.getElementById('trdiskdrrbps');
	var con4 = document.getElementById('trdiskdwrbps');
	var con5 = document.getElementById('trdiskdrriops');
	var con6 = document.getElementById('trdiskdwriops');
	var con7 = document.getElementById('trdiskcustomiops');
	var con8 = document.getElementById('trdisktminiops');
	var con9 = document.getElementById('trdiskmaxiops');
	var con10 = document.getElementById('trdiskhsr');

	$("#diskcustom").on('click', function() {
		if ($("#diskcustom").is(":checked")) {
			con1.style.display = 'none';
		}

		else {
			con1.style.display = '';
		}
	});
	
	$("#diskpublic").on('click', function() {
		if ($("#diskpublic").is(":checked")) {
			con2.style.display = 'none';
		}

		else {
			con2.style.display = '';
		}
	});
	
	$("#diskqostype").on('change', function() {
		if ($("#diskqostype option:selected").val() == "storage") {
			con3.style.display = 'none';
			con4.style.display = 'none';
			con5.style.display = 'none';
			con6.style.display = 'none';
			con7.style.display = '';
			con8.style.display = '';
			con9.style.display = '';
			con10.style.display = '';
		}

		else if ($("#diskqostype option:selected").val() == "hypervisor") {
			con3.style.display = '';
			con4.style.display = '';
			con5.style.display = '';
			con6.style.display = '';
			con7.style.display = 'none';
			con8.style.display = 'none';
			con9.style.display = 'none';
			con10.style.display = 'none';
		}

	});
	
	$("#diskcustomiops").on('click', function() {
		if ($("#diskcustomiops").is(":checked")) {
			con8.style.display = 'none';
			con9.style.display = 'none';
			con10.style.display = 'none';
		}

		else {
			con8.style.display = '';
			con9.style.display = '';
			con10.style.display = '';
		}
	});
	

});


//network offering create

$('.networkresource-add-btn').click(function() {
	addBtnClicked('net');
});

//create 모달 메뉴 숨기기
$(function() {
	var con1 = document.getElementById('trnetworksystemofferingrouter');
	var con2 = document.getElementById('trnetworkdefaultegresspolicy');
	var con3 = document.getElementById('trnetworkredundantroutercapability');
	var con4 = document.getElementById('trnetworksupportedsourcenattype');
	var con5 = document.getElementById('trnetworksupportsstrechedl2subnet');
	var con6 = document.getElementById('divnetworkvpnprovider');
	var con7 = document.getElementById('divnetworkdhcpprovider');
	var con8 = document.getElementById('divnetworkdnsprovider');
	var con9 = document.getElementById('divnetworkfirewallprovider');
	var con10 = document.getElementById('divnetworkloadbalancerprovider');
	var con11 = document.getElementById('divnetworkuserdataprovider');
	var con12 = document.getElementById('divnetworksourcenatprovider');
	var con13 = document.getElementById('divnetworkstaticnatprovider');
	var con14 = document.getElementById('divnetworkportforwardingprovider');
	var con15 = document.getElementById('divnetworksecuritygroupsprovider');
	var con16 = document.getElementById('divnetworknetworkaclprovider');
	var con17 = document.getElementById('divnetworkvirtualnetworkingprovider');
	var con18 = document.getElementById('trnetworkpersistent');
	var con19 = document.getElementById('trnetworkspecifyvlan');
	var con20 = document.getElementById('trnetworkvpc');
	var con21 = document.getElementById('trnetworkloadbalancertype');

	$("#networkguesttype").on('change', function() {
		if ($("#networkguesttype option:selected").val() == "isolated") {
			con18.style.display = '';
			con19.style.display = '';
			con20.style.display = '';
		}

		else if ($("#networkguesttype option:selected").val() == "shared") {
			con18.style.display = 'none';
			con19.style.display = 'none';
			con20.style.display = 'none';
		}
		
		else if ($("#networkguesttype option:selected").val() == "l2") {
			con18.style.display = '';
			con19.style.display = '';
			con20.style.display = 'none';
		}

	});
	
	$("#networkvpc").on('click', function() {
		if ($("#networkvpc").is(":checked") && $("#networkloadbalancer").is(":checked")) {
			con21.style.display = '';
		}
		else
			{
			con21.style.display = 'none';
			}
	});
	
	$("#networkloadbalancer").on('click', function() {
		if ($("#networkvpc").is(":checked") && $("#networkloadbalancer").is(":checked")) {
			con21.style.display = '';
		}
		else
			{
			con21.style.display = 'none';
			}
	});
	
	

	
	$("#networkvpn").on('click', function() {
		if ($("#networkvpn").is(":checked")) {
			con1.style.display = '';
			con6.style.display = '';
		}
		else
			{
			con1.style.display = 'none';
			con6.style.display = 'none';
			}
	});
	
	$("#networkdhcp").on('click', function() {
		if ($("#networkdhcp").is(":checked")) {
			con1.style.display = '';
			con7.style.display = '';
		}
		else
			{
			con1.style.display = 'none';
			con7.style.display = 'none';
			}
	});
	
	$("#networkdns").on('click', function() {
		if ($("#networkdns").is(":checked")) {
			con1.style.display = '';
			con8.style.display = '';
		}
		else
			{
			con1.style.display = 'none';
			con8.style.display = 'none';
			}
	});
	
	$("#networkfirewall").on('click', function() {
		if ($("#networkfirewall").is(":checked")) {
			con1.style.display = '';
			con2.style.display = '';
			con9.style.display = '';
		}
		else
			{
			con1.style.display = 'none';
			con2.style.display = 'none';
			con9.style.display = 'none';
			}
	});
	
	$("#networkloadbalancer").on('click', function() {
		if ($("#networkloadbalancer").is(":checked")) {
			con1.style.display = '';
			con10.style.display = '';
		}
		else
			{
			con1.style.display = 'none';
			con10.style.display = 'none';
			}
	});
	
	$("#networkuserdata").on('click', function() {
		if ($("#networkuserdata").is(":checked")) {
			con1.style.display = '';
			con11.style.display = '';
		}
		else
			{
			con1.style.display = 'none';
			con11.style.display = 'none';
			}
	});
	
	$("#networksourcenat").on('click', function() {
		if ($("#networksourcenat").is(":checked")) {
			con1.style.display = '';
			con3.style.display = '';
			con4.style.display = '';
			con12.style.display = '';
		}
		else
			{
			con1.style.display = 'none';
			con3.style.display = 'none';
			con4.style.display = 'none';
			con12.style.display = 'none';
			}
	});
	
	$("#networkstaticnat").on('click', function() {
		if ($("#networkstaticnat").is(":checked")) {
			con1.style.display = '';
			con13.style.display = '';
		}
		else
			{
			con1.style.display = 'none';
			con13.style.display = 'none';
			}
	});
	
	$("#networkportforwarding").on('click', function() {
		if ($("#networkportforwarding").is(":checked")) {
			con1.style.display = '';
			con14.style.display = '';
		}
		else
			{
			con1.style.display = 'none';
			con14.style.display = 'none';
			}
	});
	
	$("#networksecuritygroups").on('click', function() {
		if ($("#networksecuritygroups").is(":checked")) {
			con15.style.display = '';
		}
		else
			{
			con15.style.display = 'none';
			}
	});
	
	$("#networknetworkacl").on('click', function() {
		if ($("#networknetworkacl").is(":checked")) {
			con16.style.display = '';
		}
		else
			{
			con16.style.display = 'none';
			}
	});
	
	$("#networkvirtualnetworking").on('click', function() {
		if ($("#networkvirtualnetworking").is(":checked")) {
			con5.style.display = '';
			con17.style.display = '';
			
		}
		else
			{
			con5.style.display = 'none';
			con17.style.display = 'none';
			}
	});
});

//vpc offering create

$('.vpcresource-add-btn').click(function() {
	addBtnClicked('vpc');
});

//create 모달 메뉴 숨기기
$(function() {

	var con1 = document.getElementById('trvpcregionlevelvpc');
	var con2 = document.getElementById('trvpcdistributedrouter');
	var con3 = document.getElementById('trvpcredundantroutercapability');
	var con4 = document.getElementById('divvpcdhcpprovider');
	var con5 = document.getElementById('divvpcdnsprovider');
	var con6 = document.getElementById('divvpcloadbalancerprovider');
	var con7 = document.getElementById('divvpcgatewayprovider');
	var con8 = document.getElementById('divvpcstaticnatprovider');
	var con9 = document.getElementById('divvpcsourcenatprovider');
	var con10 = document.getElementById('divvpcnetworkaclprovider');
	var con11 = document.getElementById('divvpcportforwardingprovider');
	var con12 = document.getElementById('divvpcuserdataprovider');
	var con13 = document.getElementById('divvpcvpnprovider');
	var con14 = document.getElementById('divvpcconnectivityprovider');
	
	$("#vpcdhcp").on('click', function() {
		if ($("#vpcdhcp").is(":checked")) {
			con4.style.display = '';
		}
		else
			con4.style.display = 'none';
	});
	
	$("#vpcdns").on('click', function() {
		if ($("#vpcdns").is(":checked")) {
			con5.style.display = '';
		}
		else
			con5.style.display = 'none';
	});
	
	$("#vpcloadbalancer").on('click', function() {
		if ($("#vpcloadbalancer").is(":checked")) {
			con6.style.display = '';
		}
		else
			con6.style.display = 'none';
	});
	
	$("#vpcgateway").on('click', function() {
		if ($("#vpcgateway").is(":checked")) {
			con7.style.display = '';
		}
		else
			con7.style.display = 'none';
	});
	
	$("#vpcstaticnat").on('click', function() {
		if ($("#vpcstaticnat").is(":checked")) {
			con8.style.display = '';
		}
		else
			con8.style.display = 'none';
	});
	
	$("#vpcsourcenat").on('click', function() {
		if ($("#vpcsourcenat").is(":checked")) {
			con3.style.display = '';
			con9.style.display = '';
		}
		else
			{
				con3.style.display = 'none';
				con9.style.display = 'none';
			}
	});
	
	$("#vpcnetworkacl").on('click', function() {
		if ($("#vpcnetworkacl").is(":checked")) {
			con10.style.display = '';
		}
		else
			con10.style.display = 'none';
	});
	
	$("#vpcportforwarding").on('click', function() {
		if ($("#vpcportforwarding").is(":checked")) {
			con11.style.display = '';
		}
		else
			con11.style.display = 'none';
	});
	
	$("#vpcuserdata").on('click', function() {
		if ($("#vpcuserdata").is(":checked")) {
			con12.style.display = '';
		}
		else
			con12.style.display = 'none';
	});
	
	$("#vpcvpn").on('click', function() {
		if ($("#vpcvpn").is(":checked")) {
			con13.style.display = '';
		}
		else
			con13.style.display = 'none';
	});
	
	$("#vpcconnectivity").on('click', function() {
		if ($("#vpcconnectivity").is(":checked")) {
			con14.style.display = '';
			con1.style.display = '';
			con2.style.display = '';
		}
		else
			{
				con14.style.display = 'none';
				con2.style.display = 'none';
				con3.style.display = 'none';
			}
		
	});
	
	

	
});

//숫자인지 아닌지 판별 후 경고창 출력,감추기
$('.valid').blur(function() {

	var val = $(this).val();
	var labelid = this.id + "Alert";
	var label = document.getElementById(labelid);

	if (isNaN(val) == true) {
		label.style.display = '';

	} else {
		label.style.display = 'none';
	}
});


/*// Add resource button 클릭 시
$('.computeresource-add-btn').click(function() {
	addBtnClicked();
});

$('.systemresource-add-btn').click(function() {
	addBtnClicked();
});

$('.diskresource-add-btn').click(function() {
	addBtnClicked();
});

$('.networkresource-add-btn').click(function() {
	addBtnClicked();
});

$('.vpcresource-add-btn').click(function() {
	addBtnClicked();
});*/


// compute resource 커맨드 조합 후 api로 create
$("#computeCreateBtnClicked").click(function()
		{
	
	// 모달 폼에서 아이디로 text,숫자들 받아오기
	var name = $("#computename").val();
	var displaytext = $("#computedescription").val();
	var storageType = $("#computestoragetype option:selected").val();
	var provisioningType = $("#computeprovisioningtype option:selected").val();
	var customized = $("#computecustom").prop("checked");
	var cpuNumber = $("#computenumberofcores").val();
	var cpuSpeed = $("#computecpu").val();
	var memory = $("#computememory").val();
	var deploymentplanner = $("#computedeploymentplanner option:selected").val();
	var networkrate = $("#computenetworkrate").val();
	var qosType = $("#computeqostype").val();
	var bytesreadrate = $("#computedrrbps").val();
	var byteswriterate = $("#computedwrbps").val();
	var iopsreadrate = $("#computedrriops").val();
	var iopswriterate = $("#computedwriops").val();
	var customiops = $("#computecustomiops").prop("checked");
	var miniops = $("#computeminiops").val();
	var maxiops = $("#computemaxiops").val();
	var hsr = $("#computehsr").val();
	var tags = $("#computestoragetags").val();
	var hosttags = $("#computehosttags").val();
	var offerha = $("#computeofferHA").prop("checked");
	var limitcpuuse = $("#computecpucap").prop("checked");
	var isvolatile = $("#computevolatile").prop("checked");
	var domainid = finddomainID($("#computedomain option:selected").val());
	
	var labelname = document.getElementById("computenameAlertRequired");
	var labeldescription = document.getElementById("computedescriptionAlertRequired");
	var labelnumberofcores = document.getElementById("computenumberofcoresAlertRequired");
	var labelcpu = document.getElementById("computecpuAlertRequired");
	var labelmemory = document.getElementById("computememoryAlertRequired");
	
	
	//필수 항목들이 채워졌는지 체크 후 경고창 전시
	if (name == "" )
		labelname.style.display = '';
	else
		labelname.style.display = 'none';
	
	if (displaytext == "")
		labeldescription.style.display = '';
	else
		labeldescription.style.display = 'none';
	
	if (cpuNumber == "")
		labelnumberofcores.style.display = '';
	else
		labelnumberofcores.style.display = 'none';
		
	if (cpuSpeed == "")
		labelcpu.style.display = '';
	else
		labelcpu.style.display = 'none';
		
	if (memory == "")
		labelmemory.style.display = '';
	else
		labelmemory.style.display = 'none';
	
	var command = "";

	command = "createServiceOffering&issystem=false&name=" + name 
			+ "&displaytext=" + displaytext + "&storageType=" + storageType
			+ "&provisioningType=" + provisioningType + "&customized="
			+ customized + "&cpuNumber=" + cpuNumber + "&cpuSpeed=" + cpuSpeed
			+ "&memory=" + memory;

	if (deploymentplanner != "")
		command = command + "&deploymentplanner=" + deploymentplanner;
	if (networkrate != "")
		command = command + "&networkrate=" + networkrate;
	if (bytesreadrate != "")
		command = command + "&bytesreadrate=" + bytesreadrate;
	if (byteswriterate != "")
		command = command + "&byteswriterate=" + byteswriterate;
	if (iopsreadrate != "")
		command = command + "&iopsreadrate=" + iopsreadrate;
	if (iopswriterate != "")
		command = command + "&iopswriterate=" + iopswriterate;
	if (qosType == "storage")
		{
			command = command + "&customizediops=" + customiops + "&miniops=" + miniops + "&maxiops=" + maxiops + "&hypervisorsnapshotreserve=" + hsr;
		}

	command = command + "&offerha=" + offerha

	if (tags != "")
		command = command + "&tags=" + tags;
	if (hosttags != "")
		command = command + "&hosttags=" + hosttags;

	command = command + "&limitcpuuse=" + limitcpuuse + "&isvolatile="
			+ isvolatile + "&domainid=" + domainid;
	
	console.log(command);
	
	if (name != "" && displaytext != "" && cpuNumber != "" && cpuSpeed != "" && memory != "")
		{
			$.ajax({
				//url:'<%=cp%>/apiEditServiceOffering',
				url : contextPath + '/apiEditServiceOffering',
				type : 'POST',
				dataType : 'text',
				async : false,
				data : {
					"test" : command,
				},
				success : function(data) {
					console.log("apiEditServiceOffering");
					console.log(data);
					
					var arr = data.split("~");
					
					console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
					

					if ( arr[0] != "connection failed.")
						{
						$("#computecreateBtn").modal('hide');
						swal("Success", "등록이 완료되었습니다.", "success")
						.then((value) => {
							setNotification("Create compute resource : " + name, 'success');
							location.href = contextPath + "/admin/serviceoffering?kind=com"; 
						});
			
						}
					
					else
						{
						var obj = JSON.parse(arr[1]);						
						console.log(obj.createserviceofferingresponse.errortext);
						
						
						swal({ title: "Error!", 
							text: obj.createserviceofferingresponse.errortext, 
							type: "error", 
							confirmButtonText: "확인" 
								}).then((value) => {
									setNotification("Fail to Create compute resource : " + name, 'error');
								});  
						}
				},
				error:function(request, status, error){
		              console.log(request+","+status+","+error);
		              swal({ title: "Error!", 
							text: "에러 발생!", 
							type: "error", 
							confirmButtonText: "확인" 
								});
		           }
			});
		}
	
		});

//system resource 커맨드 조합 후 api로 create
$("#systemCreateBtnClicked").click(function()
		{
	
	// 모달 폼에서 아이디로 text,숫자들 받아오기
	var name = $("#systemname").val();
	var displaytext = $("#systemdescription").val();
	var systemvmtype = $("#systemvmtype option:selected").val();
	systemvmtype = systemvmtype.toLowerCase();
	systemvmtype = replaceAll(systemvmtype," ","");
	console.log(systemvmtype);
	var storageType = $("#systemstoragetype option:selected").val();
	var provisioningType = $("#systemprovisioningtype option:selected").val();
	var cpuNumber = $("#systemnumberofcores").val();
	var cpuSpeed = $("#systemcpu").val();
	var memory = $("#systemmemory").val();
	var networkrate = $("#systemnetworkrate").val();
	var qosType = $("#systemqostype option:selected").val();
	var bytesreadrate = $("#systemdrrbps").val();
	var byteswriterate = $("#systemdwrbps").val();
	var iopsreadrate = $("#systemdrriops").val();
	var iopswriterate = $("#systemdwriops").val();
	var miniops = $("#systemminiops").val();
	var maxiops = $("#systemmaxiops").val();
	var offerha = $("#systemofferHA").prop("checked");
	var tags = $("#systemstoragetags").val();
	var hosttags = $("#systemhosttags").val();
	var limitcpuuse = $("#systemcpucap").prop("checked");
	var domainid = finddomainID($("#systemdomain option:selected").val());
	
	var labelname = document.getElementById("systemnameAlertRequired");
	var labeldescription = document.getElementById("systemdescriptionAlertRequired");
	var labelnumberofcores = document.getElementById("systemnumberofcoresAlertRequired");
	var labelcpu = document.getElementById("systemcpuAlertRequired");
	var labelmemory = document.getElementById("systemmemoryAlertRequired");
	
	function replaceAll(content,before,after){
	    return content.split(before).join(after);
	}
	
	//필수 항목들이 채워졌는지 체크 후 경고창 전시
	if (name == "" )
		labelname.style.display = '';
	else
		labelname.style.display = 'none';
	
	if (displaytext == "")
		labeldescription.style.display = '';
	else
		labeldescription.style.display = 'none';
	
	if (cpuNumber == "")
		labelnumberofcores.style.display = '';
	else
		labelnumberofcores.style.display = 'none';
		
	if (cpuSpeed == "")
		labelcpu.style.display = '';
	else
		labelcpu.style.display = 'none';
		
	if (memory == "")
		labelmemory.style.display = '';
	else
		labelmemory.style.display = 'none';
	
	var command = "";

	command = "createServiceOffering&issystem=true&name=" + name
			+ "&displaytext=" + displaytext + "&systemvmtype=" + systemvmtype + "&storageType=" + storageType
			+ "&provisioningType=" + provisioningType+ "&cpuNumber=" + cpuNumber + "&cpuSpeed=" + cpuSpeed
			+ "&memory=" + memory;

	if (networkrate != "")
		command = command + "&networkrate=" + networkrate;
	if (bytesreadrate != "")
		command = command + "&bytesreadrate=" + bytesreadrate;
	if (byteswriterate != "")
		command = command + "&byteswriterate=" + byteswriterate;
	if (iopsreadrate != "")
		command = command + "&iopsreadrate=" + iopsreadrate;
	if (iopswriterate != "")
		command = command + "&iopswriterate=" + iopswriterate;
	
	if (qosType == "storage")
	{
		command = command + "&miniops=" + miniops + "&maxiops=" + maxiops;
	}
	
	if (tags != "")
		command = command + "&tags=" + tags;
	if (hosttags != "")
		command = command + "&hosttags=" + hosttags;

	command = command + "&offerha=" + offerha

	command = command + "&limitcpuuse=" + limitcpuuse + "&domainid=" + domainid;
	
	console.log(command);
	
	if (name != "" && displaytext != "" && cpuNumber != "" && cpuSpeed != "" && memory != "")
		{
			$.ajax({
				//url:'<%=cp%>/apiEditServiceOffering',
				url : contextPath + '/apiEditServiceOffering',
				type : 'POST',
				dataType : 'text',
				async : false,
				data : {
					"test" : command
				},
				success : function(data) {
					console.log("apiEditServiceOffering");
					console.log(data);
		
					var arr = data.split("~/");
					
					console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
					


					if ( arr[0] != "connection failed.")
						{
						$("#systemcreateBtn").modal('hide');
						swal("Success", "등록이 완료되었습니다.", "success")
						.then((value) => {
							setNotification("Create system resource : " + name, 'success');
							location.href = contextPath + "/admin/serviceoffering?kind=sys"; 
						});
			
						}
					
					else
						{
						var obj = JSON.parse(arr[1]);				
						console.log(obj);		
						console.log(obj.createserviceofferingresponse.errortext);
						swal({ title: "Error!", 
							text: obj.createserviceofferingresponse.errortext, 
							type: "error", 
							confirmButtonText: "확인" 
								}).then((value) => {
									setNotification("Fail to Create system resource : " + name, 'error');
								});  					 
						}
				},
				error:function(request, status, error){
		              console.log(request+","+status+","+error);
		              swal({ title: "Error!", 
							text: "에러 발생!", 
							type: "error", 
							confirmButtonText: "확인" 
								});
		           }
			});
		}
	
		});

//disk resource 커맨드 조합 후 api로 create
$("#diskCreateBtnClicked").click(function()
		{
	
	// 모달 폼에서 아이디로 text,숫자들 받아오기
	var name = $("#diskname").val();
	var displaytext = $("#diskdescription").val();
	var storageType = $("#diskstoragetype option:selected").val();
	var provisioningType = $("#diskprovisioningtype option:selected").val();
	var custom = $("#diskcustom").prop("checked");
	var disksize = $("#diskdisksize").val();
	var qosType = $("#diskqostype option:selected").val();
	var bytesreadrate = $("#diskdrrbps").val();
	var byteswriterate = $("#diskdwrbps").val();
	var iopsreadrate = $("#diskdrriops").val();
	var iopswriterate = $("#diskdwriops").val();
	var customiops = $("#diskcustomiops").prop("checked");
	var miniops = $("#diskminiops").val();
	var maxiops = $("#diskmaxiops").val();
	var hsr = $("#diskhsr").val();
	var writecachetype = $("#diskwritecachetype option:selected").val();
	var tags = $("#diskstoragetags").val();
	var domainid = finddomainID($("#diskdomain option:selected").val());
	var labelname = document.getElementById("disknameAlertRequired");
	var labeldescription = document.getElementById("diskdescriptionAlertRequired");
	var labeldisksize = document.getElementById("diskdisksizeAlertRequired");

	
	function replaceAll(content,before,after){
	    return content.split(before).join(after);
	}
	
	//필수 항목들이 채워졌는지 체크 후 경고창 전시
	if (name == "" )
		labelname.style.display = '';
	else
		labelname.style.display = 'none';
	
	if (displaytext == "")
		labeldescription.style.display = '';
	else
		labeldescription.style.display = 'none';
	
	if (disksize == "")
		labeldisksize.style.display = '';
	else
		labeldisksize.style.display = 'none';


	
	var command = "";

	command = "createDiskOffering&isMirrored=false&name=" + name
			+ "&displaytext=" + displaytext + "&storageType=" + storageType + "&cacheMode=none"  //+ writecachetype
			+ "&provisioningType=" + provisioningType + "&customized=" + custom + "&disksize=" + disksize

	if (bytesreadrate != "")
		command = command + "&bytesreadrate=" + bytesreadrate;
	if (byteswriterate != "")
		command = command + "&byteswriterate=" + byteswriterate;
	if (iopsreadrate != "")
		command = command + "&iopsreadrate=" + iopsreadrate;
	if (iopswriterate != "")
		command = command + "&iopswriterate=" + iopswriterate;
	if (qosType == "storage")
	{
		command = command + "&customizediops=" + customiops + "&miniops=" + miniops + "&maxiops=" + maxiops + "&hypervisorsnapshotreserve=" + hsr;
	}
	if (tags != "")
		command = command + "&tags=" + tags;

	command = command + "&domainid=" + domainid;
	
	console.log(command);
	
	if (name != "" && displaytext != "" && disksize != "" )
		{
			$.ajax({
				//url:'<%=cp%>/apiEditServiceOffering',
				url : contextPath + '/apiEditServiceOffering',
				type : 'POST',
				dataType : 'text',
				async : false,
				data : {
					"test" : command,
				},
				success : function(data) {
					console.log("apiEditServiceOffering");
					console.log(data);
					setNotification("Create disk resource : " + name, 'success');
					
					var arr = data.split("~");
					
					console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
					
					

					if ( arr[0] != "connection failed.")
						{
						$("#diskcreateBtn").modal('hide');
						swal("Success", "등록이 완료되었습니다.", "success")
						.then((value) => {
							location.href = contextPath + "/admin/serviceoffering?kind=disk"; 
						});
			
					}
					
					else
						{
						var obj = JSON.parse(arr[1]);					
						console.log(obj);				
						console.log(obj.creatediskofferingresponse.errortext);
						
						swal({ title: "Error!", 
							text: obj.creatediskofferingresponse.errortext, 
							type: "error", 
							confirmButtonText: "확인" 
								}).then((value) => {
									setNotification("Fail to Create disk resource : " + name, 'error');
								});    
						}

				},
				error:function(request, status, error){
		              console.log(request+","+status+","+error);
		              swal({ title: "Error!", 
							text: "에러 발생!", 
							type: "error", 
							confirmButtonText: "확인" 
								});
		           }
			});
		}
	
		});

//network resource 커맨드 조합 후 api로 create
$("#networkCreateBtnClicked").click(function()
		{
	
	// 모달 폼에서 아이디로 text,숫자들 받아오기
	var name = $("#networkname").val();
	var displaytext = $("#networkdescription").val();
	var networkrate = $("#networknetworkrate").val();
	var guesttype = $("#networkguesttype option:selected").val();
	var persistent = $("#networkpersistent").prop("checked");
	var specifyvlan = $("#networkspecifyvlan").prop("checked");
	var vpc = $("#networkvpc").prop("checked");
	var promiscuousmode = $("#networkpromiscuousmode option:selected").val();
	var macaddresschanges = $("#networkmacaddresschanges option:selected").val();
	var forgedtransmits = $("#networkforgedtransmits option:selected").val();
	
	var systemofferingrouter = findsoID($("#networksystemofferingrouter option:selected").val());
	var redundantroutercapability = $("#networkredundantroutercapability").prop("checked"); 
	var supportedsourcenattype = $("#networksupportedsourcenattype option:selected").val(); 
	var supportsstreched12subnet = $("#networksupportsstrechedl2subnet").prop("checked"); 
	var conservemode = $("#networkconservemode").prop("checked"); 
	var tags = $("#networktags").val(); 
	var defaultegresspolicy = $("#networkdefaultegresspolicy option:selected").val();
	
	var labelname = document.getElementById("networknameAlertRequired");
	var labeldescription = document.getElementById("networkdescriptionAlertRequired");
	
	var vpn = $("#networkvpn").prop("checked");
	var dhcp = $("#networkdhcp").prop("checked");
	var dns = $("#networkdns").prop("checked");
	var firewall = $("#networkfirewall").prop("checked");
	var loadbalancer = $("#networkloadbalancer").prop("checked");
	var userdata = $("#networkuserdata").prop("checked");
	var sourcenat = $("#networksourcenat").prop("checked");
	var staticnat = $("#networkstaticnat").prop("checked");
	var portforwarding = $("#networkportforwarding").prop("checked");
	var securitygroups = $("#networksecuritygroups").prop("checked");
	var networkacl = $("#networknetworkacl").prop("checked");
	var virtualnetworking = $("#networkvirtualnetworking").prop("checked");	
	var baremetalpxeservice = $("#networkbaremetalpxeservice").prop("checked"); 
	
	var vpnprovider = $("#networkvpnprovider option:selected").val();
	var dhcpprovider = $("#networkdhcpprovider option:selected").val();
	var dnsprovider = $("#networkdnsprovider option:selected").val();
	var firewallprovider = $("#networkfirewallprovider option:selected").val();
	var loadbalancerprovider = $("#networkloadbalancerprovider option:selected").val();
	var userdataprovider = $("#networkuserdataprovider option:selected").val();
	var sourcenatprovider = $("#networksourcenatprovider option:selected").val();
	var staticnatprovider = $("#networkstaticnatprovider option:selected").val();
	var portforwardingprovider = $("#networkportforwardingprovider option:selected").val();
	var securitygroupsprovider = $("#networksecuritygroupsprovider option:selected").val();
	var networkaclprovider = $("#networknetworkaclprovider option:selected").val();
	var virtualnetworkingprovider = $("#networkvirtualnetworkingprovider option:selected").val();
	var baremetalpxeprovider = "BaremetalPxeProvider";
	
	var supportedservices = "";
	var comma = 0;
	var servicelist = new Array();
	var providerlist = new Array();
	var j = 0;
	var k = 0;
	var snlb = new Array();
	
	for ( var i = 0; i < 12; i++)
		{
			servicelist[i] = "";
			providerlist[i] = "";
		}
	
	for ( var i = 0; i < 6; i++)
		{
			snlb[i] = "";
		}
	
	if ( vpn == true )
		{
			supportedservices += "Vpn";
			servicelist[j] = "Vpn";
			providerlist[j] = vpnprovider;
			j++;
			comma++;
		}
	if ( dhcp == true )
		{
		if ( comma != 0 )
			{
				supportedservices +=",";
				comma--;
			}
			supportedservices += "Dhcp";
			servicelist[j] = "Dhcp";
			providerlist[j] = dhcpprovider;
			j++;
			comma++;
		}
	if ( dns == true )
		{
		if ( comma != 0 )
		{
			supportedservices +=",";
			comma--;
		}
			supportedservices += "Dns";
			servicelist[j] = "Dns";
			providerlist[j] = dnsprovider;
			j++;
			comma++;
		}
	if ( firewall == true )
		{
		if ( comma != 0 )
		{
			supportedservices +=",";
			comma--;
		}
			supportedservices += "Firewall";
			servicelist[j] = "Firewall";
			providerlist[j] = firewallprovider;
			j++;
			comma++;
		}
	if ( loadbalancer == true )
		{
		if ( comma != 0 )
		{
			supportedservices +=",";
			comma--;
		}
			supportedservices += "Lb";
			servicelist[j] = "Lb";
			providerlist[j] = loadbalancerprovider;
			j++;
			comma++;
			snlb[k] = "lb";
			k++;
			snlb[k] = "SupportedLbIsolation";
			k++;
			snlb[k] = "dedicated";
			k++;
		}
	if ( userdata == true )
		{
		if ( comma != 0 )
		{
			supportedservices +=",";
			comma--;
		}
			supportedservices += "UserData";
			servicelist[j] = "UserData";
			providerlist[j] = userdataprovider;
			j++;
			comma++;
		}
	if ( sourcenat == true )
		{
		if ( comma != 0 )
		{
			supportedservices +=",";
			comma--;
		}
			supportedservices += "SourceNat";
			servicelist[j] = "SourceNat";
			providerlist[j] = sourcenatprovider;
			j++;
			comma++;
			snlb[k] = "SourceNat";
			k++;
			snlb[k] = "SupportedSourceNatTypes";
			k++;
			snlb[k] = supportedsourcenattype;
			k++;
		}
	if ( staticnat == true )
		{
		if ( comma != 0 )
		{
			supportedservices +=",";
			comma--;
		}
			supportedservices += "StaticNat";
			servicelist[j] = "StaticNat";
			providerlist[j] = staticnatprovider;
			j++;
			comma++;
		}
	if ( portforwarding == true )
		{
		if ( comma != 0 )
		{
			supportedservices +=",";
			comma--;
		}
			supportedservices += "PortForwarding";
			servicelist[j] = "PortForwarding";
			providerlist[j] = portforwardingprovider;
			j++;
			comma++;
		}
	if ( securitygroups == true )
		{
		if ( comma != 0 )
		{
			supportedservices +=",";
			comma--;
		}
			supportedservices += "SecurityGroup";
			servicelist[j] = "SecurityGroup";
			providerlist[j] = securitygroupsprovider;
			j++;
			comma++;
		}
	if ( networkacl == true )
		{
		if ( comma != 0 )
		{
			supportedservices +=",";
			comma--;
		}
			supportedservices += "NetworkACL";
			servicelist[j] = "NetworkACL";
			providerlist[j] = networkaclprovider;
			j++;
			comma++;
		}
	if ( virtualnetworking == true )
		{
		if ( comma != 0 )
		{
			supportedservices +=",";
			comma--;
		}
			supportedservices += "Connectivity";
			servicelist[j] = "Connectivity";
			providerlist[j] = virtualnetworkingprovider;
			j++;
			comma++;
		}
	if ( baremetalpxeservice == true )
		{
		if ( comma != 0 )
		{
			supportedservices +=",";
			comma--;
		}
			supportedservices += "BaremetalPxeService";
			servicelist[j] = "BaremetalPxeService";
			providerlist[j] = baremetalpxeprovider;
			j++;
			comma++;
		}

			
	console.log(supportedservices);
	console.log($("#networksystemofferingrouter option:selected").val());
	
	console.log('array = ' , servicelist[0] , " ", providerlist[0]);


	
	//필수 항목들이 채워졌는지 체크 후 경고창 전시
	if (name == "" )
		labelname.style.display = '';
	else
		labelname.style.display = 'none';
	
	if (displaytext == "")
		labeldescription.style.display = '';
	else
		labeldescription.style.display = 'none';

	
	if (name != "" && displaytext != "")
		{
			$.ajax({
				//url:'<%=cp%>/apiEditServiceOffering',
				url : contextPath + '/apiNetworkOffering',
				type : 'POST',
				dataType : 'text',
				async : false,
				data : {
					"name" : name,
					"displayText" : displaytext,
					"networkRate" : networkrate,
					"guestIpType" : guesttype,
					"isPersistent" : persistent,
					"specifyVlan" : specifyvlan,
					"forvpc" : vpc,
					"serviceofferingid" : systemofferingrouter,
					"servicecapabilitylist[0].service" : snlb[0],
					"servicecapabilitylist[0].capabilitytype" : snlb[1],
					"servicecapabilitylist[0].capabilityvalue" : snlb[2],
					"servicecapabilitylist[1].service" : snlb[3],
					"servicecapabilitylist[1].capabilitytype" : snlb[4],
					"servicecapabilitylist[1].capabilityvalue" : snlb[5],
					"tags" : tags,
					"supportedServices" : supportedservices,
					"conservemode" : conservemode,
					"serviceProviderList[0].service" : servicelist[0],
					"serviceProviderList[0].provider" : providerlist[0],
					"serviceProviderList[1].service" : servicelist[1],
					"serviceProviderList[1].provider" : providerlist[1],
					"serviceProviderList[2].service" : servicelist[2],
					"serviceProviderList[2].provider" :providerlist[2],
					"serviceProviderList[3].service" : servicelist[3],
					"serviceProviderList[3].provider" :providerlist[3],
					"serviceProviderList[4].service" : servicelist[4],
					"serviceProviderList[4].provider" :providerlist[4],
					"serviceProviderList[5].service" : servicelist[5],
					"serviceProviderList[5].provider" :providerlist[5],
					"serviceProviderList[6].service" : servicelist[6],
					"serviceProviderList[6].provider" :providerlist[6],
					"serviceProviderList[7].service" : servicelist[7],
					"serviceProviderList[7].provider" :providerlist[7],
					"serviceProviderList[8].service" : servicelist[8],
					"serviceProviderList[8].provider" :providerlist[8],
					"serviceProviderList[9].service" : servicelist[9],
					"serviceProviderList[9].provider" : providerlist[9],
					"serviceProviderList[10].service" : servicelist[10],
					"serviceProviderList[10].provider" :providerlist[10],
					"serviceProviderList[11].service" : servicelist[11],
					"serviceProviderList[11].provider" :providerlist[11],
					"serviceProviderList[12].service" : servicelist[12],
					"serviceProviderList[12].provider" :providerlist[12],
					"details[0].promiscuousMode" : promiscuousmode,
					"details[0].macAddressChanges" : macaddresschanges,
					"details[0].forgedTransmits" : forgedtransmits,
					"traffictype" : "GUEST"
					
					
				},
				success : function(data) {
					console.log("apiNetwork");
					console.log(data);
		
					var arr = data.split("~");
					
					console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
					

					if ( arr[0] != "connection failed.")
						{
						$("#networkcreateBtn").modal('hide');
						swal("Success", "등록이 완료되었습니다.", "success")
						.then((value) => {
							setNotification("Create network resource : " + name, 'success');
							location.href = contextPath + "/admin/serviceoffering?kind=net"; 
						});
			
					}
					
					else
						{
						var obj = JSON.parse(arr[1]);				
						console.log(obj);				
						console.log(obj.createnetworkofferingresponse.errortext);

						swal({ title: "Error!", 
							text: obj.createnetworkofferingresponse.errortext, 
							type: "error", 
							confirmButtonText: "확인" 
								}).then((value) => {
									setNotification("Fail to Create network resource : " + name, 'error');
								});    
						}
				},
				error:function(request, status, error){
		              console.log(request+","+status+","+error);
		              swal({ title: "Error!", 
							text: "에러 발생!", 
							type: "error", 
							confirmButtonText: "확인" 
								});
		           }
			});  
		}
	
		});

//vpc resource 커맨드 조합 후 api로 create
$("#vpcCreateBtnClicked").click(function()
		{
	
	// 모달 폼에서 아이디로 text,숫자들 받아오기
	var name = $("#vpcname").val();
	var displaytext = $("#vpcdescription").val();
	
	var regionlevelvpc = $("#vpcredundantroutercapability").prop("checked"); 
	var distributedrouter = $("#vpcredundantroutercapability").prop("checked"); 
	var redundantroutercapability = $("#vpcredundantroutercapability").prop("checked"); 

	var labelname = document.getElementById("vpcnameAlertRequired");
	var labeldescription = document.getElementById("vpcdescriptionAlertRequired");
	

	var dhcp = $("#vpcdhcp").prop("checked");
	var dns = $("#vpcdns").prop("checked");
	var loadbalancer = $("#vpcloadbalancer").prop("checked");	
	var gateway = $("#vpcgateway").prop("checked");	
	var staticnat = $("#vpcstaticnat").prop("checked");
	var sourcenat = $("#vpcsourcenat").prop("checked");
	var networkacl = $("#vpcnetworkacl").prop("checked");
	var portforwarding = $("#vpcportforwarding").prop("checked");
	var userdata = $("#vpcuserdata").prop("checked");
	var vpn = $("#vpcvpn").prop("checked");
	var virtualnetworking = $("#vpcvirtualnetworking").prop("checked");	

	
	var vpnprovider = $("#vpcvpnprovider option:selected").val();
	var dhcpprovider = $("#vpcdhcpprovider option:selected").val();
	var dnsprovider = $("#vpcdnsprovider option:selected").val();
	var gatewayprovider = $("#vpcgatewayprovider option:selected").val();
	var loadbalancerprovider = $("#vpcloadbalancerprovider option:selected").val();
	var userdataprovider = $("#vpcuserdataprovider option:selected").val();
	var sourcenatprovider = $("#vpcsourcenatprovider option:selected").val();
	var staticnatprovider = $("#vpcstaticnatprovider option:selected").val();
	var portforwardingprovider = $("#vpcportforwardingprovider option:selected").val();
	var networkaclprovider = $("#vpcnetworkaclprovider option:selected").val();
	var virtualnetworkingprovider = $("#vpcvirtualnetworkingprovider option:selected").val();
	
	var supportedservices = "";
	var comma = 0;
	var servicelist = new Array();
	var providerlist = new Array();
	var j = 0;
	var k = 0;
	var snlb = new Array();
	
	for ( var i = 0; i < 11; i++)
		{
			servicelist[i] = "";
			providerlist[i] = "";
		}
	
	for ( var i = 0; i < 9; i++)
		{
			snlb[i] = "";
		}
	
	
	if(regionlevelvpc)
	{
		snlb[k] = "Connectivity";
		k++;
		snlb[k] = "RegionLevelVpc";
		k++;
		snlb[k] = true;
		k++;
	}
	
	if(distributedrouter)
	{
		snlb[k] = "Connectivity";
		k++;
		snlb[k] = "DistributedRouter";
		k++;
		snlb[k] = true;
		k++;
	}
	
	
	if ( dhcp == true )
		{
			supportedservices += "Dhcp";
			servicelist[j] = "Dhcp";
			providerlist[j] = dhcpprovider;
			j++;
			comma++;
		}
	if ( dns == true )
		{
		if ( comma != 0 )
		{
			supportedservices +=",";
			comma--;
		}
			supportedservices += "Dns";
			servicelist[j] = "Dns";
			providerlist[j] = dnsprovider;
			j++;
			comma++;
		}
	
	if ( loadbalancer == true )
		{
		if ( comma != 0 )
		{
			supportedservices +=",";
			comma--;
		}
			supportedservices += "Lb";
			servicelist[j] = "Lb";
			providerlist[j] = loadbalancerprovider;
			j++;
		}
	
	if ( gateway == true )
	{
	if ( comma != 0 )
	{
		supportedservices +=",";
		comma--;
	}
		supportedservices += "Gateway";
		servicelist[j] = "Gateway";
		providerlist[j] = gatewayprovider;
		j++;
		comma++;
	}

	if ( staticnat == true )
		{
		if ( comma != 0 )
		{
			supportedservices +=",";
			comma--;
		}
			supportedservices += "StaticNat";
			servicelist[j] = "StaticNat";
			providerlist[j] = staticnatprovider;
			j++;
			comma++;
		}

	if ( sourcenat == true )
	{
	if ( comma != 0 )
	{
		supportedservices +=",";
		comma--;
	}
		supportedservices += "SourceNat";
		servicelist[j] = "SourceNat";
		providerlist[j] = sourcenatprovider;
		j++;
		comma++;
		
		if(redundantroutercapability)
			{
				snlb[k] = "SourceNat";
				k++;
				snlb[k] = "RedundantRouter";
				k++;
				snlb[k] = true;
				k++;
			}
		
	}

	if ( networkacl == true )
		{
		if ( comma != 0 )
		{
			supportedservices +=",";
			comma--;
		}
			supportedservices += "NetworkACL";
			servicelist[j] = "NetworkACL";
			providerlist[j] = networkaclprovider;
			j++;
			comma++;
		}
	
	if ( portforwarding == true )
	{
	if ( comma != 0 )
	{
		supportedservices +=",";
		comma--;
	}
		supportedservices += "PortForwarding";
		servicelist[j] = "PortForwarding";
		providerlist[j] = portforwardingprovider;
		j++;
		comma++;
	}

	if ( userdata == true )
	{
	if ( comma != 0 )
	{
		supportedservices +=",";
		comma--;
	}
		supportedservices += "UserData";
		servicelist[j] = "UserData";
		providerlist[j] = userdataprovider;
		j++;
		comma++;
	}
	
	if ( vpn == true )
	{
		if ( comma != 0 )
		{
			supportedservices +=",";
			comma--;
		}
		supportedservices += "Vpn";
		servicelist[j] = "Vpn";
		providerlist[j] = vpnprovider;
		j++;
		comma++;
	}
	
	if ( virtualnetworking == true )
	{
	if ( comma != 0 )
	{
		supportedservices +=",";
		comma--;
	}
		supportedservices += "Connectivity";
		servicelist[j] = "Connectivity";
		providerlist[j] = virtualnetworkingprovider;
		j++;
		comma++;
		

		
	}


	//필수 항목들이 채워졌는지 체크 후 경고창 전시
	if (name == "" )
		labelname.style.display = '';
	else
		labelname.style.display = 'none';
	
	if (displaytext == "")
		labeldescription.style.display = '';
	else
		labeldescription.style.display = 'none';

	
	if (name != "" && displaytext != "")
		{
			$.ajax({
				//url:'<%=cp%>/apiEditServiceOffering',
				url : contextPath + '/apiVPCOffering',
				type : 'POST',
				dataType : 'text',
				async : false,
				data : {
					"name" : name,
					"displayText" : displaytext,
					
					"servicecapabilitylist[0].service" : snlb[0],
					"servicecapabilitylist[0].capabilitytype" : snlb[1],
					"servicecapabilitylist[0].capabilityvalue" : snlb[2],
					"servicecapabilitylist[1].service" : snlb[3],
					"servicecapabilitylist[1].capabilitytype" : snlb[4],
					"servicecapabilitylist[1].capabilityvalue" : snlb[5],
					"servicecapabilitylist[2].service" : snlb[6],
					"servicecapabilitylist[2].capabilitytype" : snlb[7],
					"servicecapabilitylist[2].capabilityvalue" : snlb[8],
					"state" : "Creating",
					"status" : "state.Creating",
					"allocationstate" : "Creating",
					"supportedServices" : supportedservices,
					"serviceProviderList[0].service" : servicelist[0],
					"serviceProviderList[0].provider" : providerlist[0],
					"serviceProviderList[1].service" : servicelist[1],
					"serviceProviderList[1].provider" : providerlist[1],
					"serviceProviderList[2].service" : servicelist[2],
					"serviceProviderList[2].provider" :providerlist[2],
					"serviceProviderList[3].service" : servicelist[3],
					"serviceProviderList[3].provider" :providerlist[3],
					"serviceProviderList[4].service" : servicelist[4],
					"serviceProviderList[4].provider" :providerlist[4],
					"serviceProviderList[5].service" : servicelist[5],
					"serviceProviderList[5].provider" :providerlist[5],
					"serviceProviderList[6].service" : servicelist[6],
					"serviceProviderList[6].provider" :providerlist[6],
					"serviceProviderList[7].service" : servicelist[7],
					"serviceProviderList[7].provider" :providerlist[7],
					"serviceProviderList[8].service" : servicelist[8],
					"serviceProviderList[8].provider" :providerlist[8],
					"serviceProviderList[9].service" : servicelist[9],
					"serviceProviderList[9].provider" : providerlist[9],
					"serviceProviderList[10].service" : servicelist[10],
					"serviceProviderList[10].provider" :providerlist[10]
	
				},
				success : function(data) {
					console.log("apiVPC");
					console.log(data);
		
					var arr = data.split("~");
					
					console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
					

					if ( arr[0] != "connection failed.")
						{
						$("#vpccreateBtn").modal('hide');
						swal("Success", "등록이 완료되었습니다.", "success")
						.then((value) => {
							setNotification("Create vpc resource : " + name, 'success');
							location.href = contextPath + "/admin/serviceoffering?kind=vpc"; 
						});
			
					}
					
					else
						{
						var obj = JSON.parse(arr[1]);				
						console.log(obj);				
						console.log(obj.createvpcofferingresponse.errortext);

						swal({ title: "Error!", 
							text: obj.createvpcofferingresponse.errortext, 
							type: "error", 
							confirmButtonText: "확인" 
								}).then((value) => {
									setNotification("Fail to Create vpc resource : " + name, 'error');
								}); 
						}
				},
				error:function(request, status, error){
		              console.log(request+","+status+","+error);
		              swal({ title: "Error!", 
							text: "에러 발생!", 
							type: "error", 
							confirmButtonText: "확인" 
								});
		           }
			});  
		}
	
		});


