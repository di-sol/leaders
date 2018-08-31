
//template create 모달 메뉴 숨기기
$(function() {
	
	var con1 = document.getElementById('trtemplateversion');
	
	// zone 이름으로 hypervisor 셀렉트박스 동적변화
	$("#templatezone").on('change', function() {  
		$("#templatehypervisor").find("option").remove();
		con1.style.dispaly = 'none';

		if ( $("#templatezone option:selected").val() == 'All Zones')
			{
				for ( var i = 0; i < hyperlist.length; i++)
					$("#templatehypervisor").append("<option>" + hyperlist[i].name + "</option>");
				
				$("#templatehypervisor").append("<option>Any</option>");
			}
			
		else
			{
				con1.style.display = '';
				var id = findzoneID($("#templatezone option:selected").val());
				command = "listHypervisors&zoneid=" + id;
				console.log(command);
				
				$.ajax({
					// url:'<%=cp%>/apiEditServiceOffering',
					url : contextPath + '/apitemplate',
					type : 'POST',
					dataType : 'text',
					async : false,
					data : {
						"test" : command,
					},
					success : function(data) {
						console.log("apitemplate");
						console.log(data);
						
						var arr = data.split("~");
						
						console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
						

						if ( arr[0] != "connection failed.")
							{
							var obj = JSON.parse(arr[0]);
							
							for ( var i = 0; i < obj.listhypervisorsresponse.hypervisor.length; i++)
									$("#templatehypervisor").append("<option>" + obj.listhypervisorsresponse.hypervisor[i].name + "</option>");
							
							$("#templatehypervisor").append("<option>Any</option>");
				
							}
						
						else
							{
							var obj = JSON.parse(arr[1]);						
							console.log(obj.listhypervisorsresponse.errortext);
							
							swal({ title: "Error!", 
								text: obj.listhypervisorsresponse.errortext, 
								type: "error", 
								confirmButtonText: "확인" 
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

	
});


// iso create 모달 메뉴 숨기기
$(function() {
	
	var con1 = document.getElementById('trisoostype');
	
	// direct download 체크 시 checksum 메뉴 생기는데 오류남
	var con2 = document.getElementById('trisochecksum');
	
	$("#isobootable").on('click', function() {
		if ($("#isobootable").is(":checked")) {
			con1.style.display = '';

		}

		else {
			con1.style.display = 'none';

		}
	});
	
	$("#isodirectdownload").on('click', function() {
		if ($("#isodirectdownload").is(":checked")) {
			con2.style.display = '';
		}

		else {
			con2.style.display = 'none';

		}
	});
	

	
	
	
	
});

function findzoneID(name){
	
	if ( name == 'All Zones')
		return "-1";

  	for (var i = 0; i < zonelist.length; i++)
 		{
 			if ( zonelist[i].name == name )
 				{			
 					return zonelist[i].id;
 				}
 		}
	}

function findostypeID(name){
	
	
	
	for (var i = 0; i < ostypelist.length; i++)
		{
			if ( ostypelist[i].name == name )
				{			
					return ostypelist[i].id;
				}
		}
	
}

// 숫자인지 아닌지 판별 후 경고창 출력,감추기
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


// template create 커맨드 조합 후 api로 create
$("#templateCreateBtnClicked").click(function()
		{
	
	// 모달 폼에서 아이디로 text,숫자들 받아오기 
	var url = $("#templateurl2").val();
	var name = $("#templatename").val();
	var displaytext = $("#templatedescription").val();
	var zoneid = findzoneID($("#templatezone option:selected").val());
	var hypervisor = $("#templatehypervisor option:selected").val();
	var version = ($("#templateversion").prop("checked") == true ) ? "xenserver61" : "";
	var format = $("#templateformat option:selected").val();
	var ostype = findostypeID($("templateostype option:selected").val());
	var extractable = $("#templateextractable").prop("checked");
	var password = $("#templatepassword").prop("checked");
	var scalable = $("#templatescalable").prop("checked");
	var ispublic = $("#templatepublic").prop("checked");
	var featured = $("#templatefeatured").prop("checked");
	var routing = $("#templaterouting").prop("checked");
	var hvm = $("#templatehvm").prop("checked");
	
	var labelurl = document.getElementById("templateurlAlertRequired");
	var labelname = document.getElementById("templatenameAlertRequired");
	var labeldescription = document.getElementById("templatedescriptionAlertRequired");

	
	
	// 필수 항목들이 채워졌는지 체크 후 경고창 전시
	console.log(url);
	if (url == "" )
		{
		console.log('왜');
		labelurl.style.display = '';
		}
	else
		labelurl.style.display = 'none';
	
	if (name == "" )
		labelname.style.display = '';
	else
		labelname.style.display = 'none';
	
	if (displaytext == "")
		labeldescription.style.display = '';
	else
		labeldescription.style.display = 'none';
	
	var command = "";

	
	//format 없으면 오류남
	
	command = "registerTemplate&name=" + name + "&displayText=" + displaytext + "&url=" + url + "&zoneids=" + zoneid + "&format=" + format + "&isextractable=" + extractable
			+ "&passwordEnabled=" + password + "&isdynamicallyscalable=" + scalable + "&osTypeId=" + ostype + "&hypervisor=" + hypervisor + "&ispublic=" + ispublic + "&requireshvm=" + hvm
			+ "&isfeatured=" + featured + "&isrouting=" + routing + "&details[0].hypervisortoolsversion=" + version;

	console.log(command);
	
	if (url != "" && name != "" && displaytext != "")
		{
			$.ajax({
				// url:'<%=cp%>/apiEditServiceOffering',
				url : contextPath + '/apitemplate',
				type : 'POST',
				dataType : 'text',
				async : false,
				data : {
					"test" : command,
				},
				success : function(data) {
					console.log("apitemplate");
					console.log(data);
					
					var arr = data.split("~");
					
					console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
					

					if ( arr[0] != "connection failed.")
						{
						var obj = JSON.parse(arr[0]);
						var id = obj.registertemplateresponse.template[0].id;
						
						$("#templatecreateBtn").modal('hide');
						location.href = contextPath + "/admin/templates?kind=template&id=" + id; 
						
			
						}
					
					else
						{
						var obj = JSON.parse(arr[1]);						
						console.log(obj.registertemplateresponse.errortext);
						//loadingImageMethod(obj.registertemplateresponse.jobid, "Fail to register template");
						
						swal({ title: "Error!", 
							text: obj.registertemplateresponse.errortext, 
							type: "error", 
							confirmButtonText: "확인" 
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

//iso create 커맨드 조합 후 api로 create
$("#isoCreateBtnClicked").click(function()
		{
	
	// 모달 폼에서 아이디로 text,숫자들 받아오기 
	var name = $("#isoname").val();
	var displaytext = $("#isodescription").val();
	var url = $("#isourl").val();
	var directdownload = $("#isodirectdownlad").prop("checked");
	var checksum = $("#isochecksum").val();
	var zoneid = findzoneID($("#isozone option:selected").val());
	var bootable = $("#isobootable").prop("checked");
	var ostype = findostypeID($("isoostype option:selected").val());
	var extractable = $("#isoextractable").prop("checked");	
	var ispublic = $("#isopublic").prop("checked");
	var featured = $("#isofeatured").prop("checked");

	
	var labelurl = document.getElementById("isourlAlertRequired");
	var labelname = document.getElementById("isonameAlertRequired");
	var labeldescription = document.getElementById("isodescriptionAlertRequired");

	
	
	// 필수 항목들이 채워졌는지 체크 후 경고창 전시
	if (url == "" )
		labelurl.style.display = '';
	else
		labelurl.style.display = 'none';
	
	if (name == "" )
		labelname.style.display = '';
	else
		labelname.style.display = 'none';
	
	if (displaytext == "")
		labeldescription.style.display = '';
	else
		labeldescription.style.display = 'none';
	
	
	var command = "";

	
	//format 없으면 오류남
	
	command = "registerIso&name=" + name + "&displayText=" + displaytext + "&url=" + url + "&zoneid=" + zoneid + "&isextractable=" + extractable
			+ "&bootable=" + bootable + "&osTypeId=" + ostype + "&ispublic=" + ispublic + "&isfeatured=" + featured;

	console.log(command);
	
	if (url != "" && name != "" && displaytext != "")
		{
			$.ajax({
				// url:'<%=cp%>/apiEditServiceOffering',
				url : contextPath + '/apitemplate',
				type : 'POST',
				dataType : 'text',
				async : false,
				data : {
					"test" : command,
				},
				success : function(data) {
					console.log("apitemplate");
					console.log(data);
					
					var arr = data.split("~");
					
					console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
					

					if ( arr[0] != "connection failed.")
						{
						
						var obj = JSON.parse(arr[0]);
						var id = obj.registerisoresponse.iso[0].id;
						$("#isocreateBtn").modal('hide');
						location.href = contextPath + "/admin/templates?kind=iso&id=" + id; 
			
						}
					
					else
						{
						var obj = JSON.parse(arr[1]);						
						console.log(obj.registerisoresponse.errortext);
						
						swal({ title: "Error!", 
							text: obj.registerisoresponse.errortext, 
							type: "error", 
							confirmButtonText: "확인" 
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


