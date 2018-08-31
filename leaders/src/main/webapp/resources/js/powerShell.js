
// http://192.168.194.24:8080/pwsh/newVm?computername=OM-25&username=admin&password=11&computerIP=192.168.194.112&domain=OM
// http://192.168.194.24:8080/pwsh/removebroker?computername=OM-25&domain=OM

// instance 추가할때 powershell 입력부분
function addInstancePowerShell(computerName, computerIp) {
	
	$.ajax({
		url: 'http://192.168.194.24:8080/pwsh/newVm?username=admin&password=11&domain=OM&computername=' + computerName + '&computerIP=' + computerIp,
		type:'GET',
		dataType:'text',
		data:{},
		success:function(data){
			console.log("addInstancePowerShell success");
			console.log(data);
		},error:function(request, status, error){
			console.log(request);
			console.log(status);
			console.log(error);
			console.log("addInstancePowerShell failed");
		}
	});	
}

//instance 삭제할때 powershell 삭제부분
function removeInstancePowerShell(computerName) {
	$.ajax({		
		url: 'http://192.168.194.24:8080/pwsh/removebroker?domain=OM&computername=' + computerName,
		type:'GET',
		dataType:'text',
		data:{},
		success:function(data){
			console.log("removeInstancePowerShell success");
			console.log(data);
		},error:function(request, status, error){
			console.log(request);
			console.log(status);
			console.log(error);
			console.log("removeInstancePowerShell failed");
		}
	});	
}


// vms monitoring icon powershell 사용 가능여부 옆에 뿌려주기 위해서 
function displayResultPowerShell () {

	$.ajax({
		url:'http://192.168.194.24:8080/pwsh/getbrokerall',
		type:'GET',
		dataType:'jsonp',
		jsonpCallback: "myCallback",
		success:function myCallback (data){
			
			console.log(data);

			for (var i=0; i<data.length; i++) {
				instanceName = data[i].MachineName.split('\\')[1];
				iconSelector = getIconSelectorFromNameArray(instanceName);

				iconSelector.removeClass('fa-spinner');
				if (data[i].PowerState === 4 && data[i].RegistrationState === 2) {
					iconSelector.addClass('fa-circle-thin');
				} else {
					iconSelector.addClass('fa-times');
				}
			}
			
			// icon 변경 안된것들은 일괄 x 로 변경해줄것
			iconList = $(".iconSelector");
			for (var t=0; t<iconList.length; t++) {
				if (iconList.eq(t).parent().find('.fa-spinner').length>0) { // spinner 빼주고 x 넣어주기
					iconList.eq(t).removeClass('fa-spinner');
					iconList.eq(t).addClass('fa-times');
				}
			}
			
		},error:function(request, status, error){
			console.log(request);
			console.log(status);
			console.log(request+","+status+","+error);
		}
		
	});

}

// icon 변경해줘야 되니깐  name 기반으로 icon selector 잡기 위해서 
function getIconSelectorFromNameArray(instanceName) {
	// find 종류 안쓰는 이유는 혹시나 instanceName 이 겹치는 것들 방지하기 위해서
	
	iconNameList = $(".nameSelector");
	for (var k=0; k<iconNameList.length; k++) {
		if (instanceName === iconNameList.eq(k).text().trim()) {
			return iconNameList.eq(k).parents('div').eq(0).find('span .iconSelector');
		}
	}
}


