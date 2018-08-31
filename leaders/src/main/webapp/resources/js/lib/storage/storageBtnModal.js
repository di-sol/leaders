
//Space바 입력을 막기 위해 사용하는 함수
// non-space로 정의된 클래스를 대상으로 적용
window.onload = function(){
		$(".not-space").keyup(function(){
			textValue = $(this).val();
			length1 = textValue.length; 
			textValue2 = textValue.replace(" ","");
			length2 = textValue2.length;
			//console.log(length1 + " " + length2);
			if (length1 != length2) { // 길이가 다르면 공란 들어옴
					$(this).val(textValue2);
				alert("스페이스바 입력은 안됩니다.")
				//swal("error","공란은 입력 안됩니다.","error");
				return; 
			}
		});
	}

/*
 함수명 : getAttachDisk
 기능 : 버튼 클릭시 나타나는 SelectBox에 세팅할 데이터를 서버에서 받아오는 함수
파라미터 : data (버튼 클릭시 해당 버튼과 연관된 JSON 데이터)
분기 : appendSelectOption() - selectBox에 데이터를 append하는 함수
 */
function getAttachDisk (data) {
			var zoneid = data.zoneid;
			var domainid = data.domainid;
			var account = data.account;
			var hypervisor = data.hypervisor;
			var state='Stopped';
			var command= "listVirtualMachines&zoneid="+zoneid+"&domainid="+domainid+"&account="+account+"&hypervisor"+hypervisor+"state="+state;
			
			$.ajax({
				url: contextPath + '/apiCall',
				type:'POST',
				dataType:'text',
				data:{"test": command},
				success:function(data){
					var obj = JSON.parse(data).listvirtualmachinesresponse.virtualmachine;
					
					appendSelectOption(obj,'attachDiskSelectBox');
					
				},error:function(request, status, error){
				}
			});
			
			var state='Running';
			var command= "listVirtualMachines&zoneid="+zoneid+"&domainid="+domainid+"&account="+account+"&hypervisor"+hypervisor+"state="+state;

			$.ajax({
				url: contextPath + '/apiCall',
				type:'POST',
				dataType:'text',
				data:{"test":"listVirtualMachines&zoneid="+zoneid+"&domainid="+domainid+"&account="+account+"&hypervisor"+hypervisor+"state="+state},
				success:function(data){
					var obj = JSON.parse(data).listvirtualmachinesresponse.virtualmachine;
					appendSelectOption(obj,'attachDiskSelectBox');
					
				},error:function(request, status, error){
				}
			});
			
};


/*
함수명 : getOStypelist
기능 : 버튼 클릭시 나타나는 SelectBox에 세팅할 데이터를 서버에서 받아오는 함수
파라미터 : data (버튼 클릭시 해당 버튼과 연관된 JSON 데이터)
분기 : appendSelectOption() - selectBox에 데이터를 append하는 함수
*/
function getOStypelist(btnID) {

	var command= "listOsTypes";
	
	$.ajax({
		url: contextPath + '/apiCall',
		type:'POST',
		dataType:'text',
		data:{"test": command},
		success:function(data){
			var obj = JSON.parse(data).listostypesresponse.ostype;
			if(btnID == 'createVolumeTemplate'){
				appendSelectOption(obj,'createVolumeTemplateOstypeSelectbox');
				
			}else if(btnID == 'createSnapshotTemplate'){
				appendSelectOption(obj,'createSnapshotsTemplateOstypeSelectbox');
			}
				
		},error:function(request, status, error){
		}
	});
	

};


/*
함수명 : getZoneList
기능 : 버튼 클릭시 나타나는 SelectBox에 세팅할 데이터를 서버에서 받아오는 함수
파라미터 : data (버튼 클릭시 해당 버튼과 연관된 JSON 데이터)
분기 : appendSelectOption() - selectBox에 데이터를 append하는 함수
*/
function getZoneList(data, btnID){
	var command= "listZones&available=true";
	
	$.ajax({
		url: contextPath + '/apiCall',
		type:'POST',
		dataType:'text',
		data:{"test": command},
		success:function(data){
			var obj = JSON.parse(data).listzonesresponse.zone;
			appendSelectOption(obj,btnID);
		},error:function(request, status, error){
		}
	})
};



/*
함수명 : getDiskoffering
기능 : 버튼 클릭시 나타나는 SelectBox에 세팅할 데이터를 서버에서 받아오는 함수
파라미터 : data (버튼 클릭시 해당 버튼과 연관된 JSON 데이터)
분기 : appendSelectOption() - selectBox에 데이터를 append하는 함수
*/
function getDiskoffering(btnID){
	
	$.ajax({
		url: contextPath + '/apilistDiskOfferings',
		type:'POST',
		dataType:'text',
		data:{"test":""},
		success:function(data){
			
			var obj = JSON.parse(data).listdiskofferingsresponse.diskoffering;
			appendSelectOption(obj, btnID);

		},error:function(request, status, error){
		}
	})
}


/*
함수명 : getAdd
기능 : 버튼 클릭시 나타나는 SelectBox에 세팅할 데이터를 서버에서 받아오는 함수
파라미터 : data (버튼 클릭시 해당 버튼과 연관된 JSON 데이터)
분기 : appendSelectOption() - selectBox에 데이터를 append하는 함수
*/
function getAdd(){

	
	$.ajax({
		url:contextPath + '/apilistZones',
		type:'POST',
		dataType:'text',
		data:{"test":"listZones&available=true"},
		success:function(data){
			var obj = JSON.parse(data).listzonesresponse.zone;
			appendSelectOption(obj, 'addBtnAvailabilitySelectbox');
			
			
			
		},error:function(request, status, error){
		}
	})
	
	$.ajax({
		url: contextPath + '/apilistDiskOfferings',
		type:'POST',
		dataType:'text',
		data:{"test":""},
		success:function(data){
			var obj = JSON.parse(data).listdiskofferingsresponse.diskoffering;
			appendSelectOption(obj, 'addBtnDiskofferingSelectbox');

		},error:function(request, status, error){
		}
	})
};




/*
함수명 : appendSelectOption
기능 : 
파라미터 : data (SelectBox에 append할 데이터)
		selectID (selectBox에 할당된 ID값)
분기 : Switch문을 통해 selectID으로 구별하여 append함
*/
function appendSelectOption(data, selectID){
	var index = 0;
	
	//빈 JSON이 들어올경우 에러처리
	try{
		var length = data.length;
	}catch(e){
		
	}

	if(selectID == 'addBtnDiskofferingSelectbox' || selectID == 'URLuploadDiskOfferingSelectBox' || selectID =='resizeNewofferingSelectBox'){
		while(index < length){
			
			$('#'+ selectID).append($('<option/>',{
				value: data[index].id
			}).text(data[index].displaytext));
			
			index += 1;
		}
	}else if(selectID == 'addBtnAvailabilitySelectbox'){
		while(index < length){

			$('#'+ selectID).append($('<option/>',{
				value: data[index].id
			}).text(data[index].name));
			
			index += 1;
		}
	}else if(selectID == 'attachDiskSelectBox'){
		while(index < length){

			$('#'+ selectID).append($('<option/>',{
				value: data[index].id
			}).text(data[index].name));
			
			index += 1;
		}
	}else if(selectID =='hourlyTimeMinutesSelectbox' || selectID == 'dailyTimeMinutesSelectbox' || selectID == 'weeklyTimeMinutesSelectbox' || selectID == 'monthlyTimeMinutesSelectbox' ){
		
		while(index < 60){

			$('#'+ selectID).append($('<option/>',{
				value: index
			}).text(index));
			
			index += 1;
		}
	}else if(selectID =='dailyTimeHoursSelectbox' || selectID == 'weeklyTimeHoursSelectbox' || selectID == 'monthlyTimeHoursSelectbox' ){
		while(index < 13){

			$('#'+ selectID).append($('<option/>',{
				value: index
			}).text(index));
			
			index += 1;
		}
	}else if(selectID =='monthlyDayofWeekSelectbox'){
		while(index < 29){

			$('#'+ selectID).append($('<option/>',{
				value: index
			}).text(index));
			
			index += 1;
		}
	}else if(selectID =='createVolumeTemplateOstypeSelectbox' || selectID =='createSnapshotsTemplateOstypeSelectbox'){
		while(index < length){

			$('#'+ selectID).append($('<option/>',{
				value: data[index].id
			}).text(data[index].description));
			
			index += 1;
		}
	}else if(selectID == 'migrateVolumeAnotherSelectList'){
		while(index < length){

			$('#'+ selectID).append($('<option/>',{
				value: data[index].id
			}).text(data[index].name));
			
			index += 1;
		}
	}else if(selectID == 'availabilityZoneSelectBox'||selectID == 'URLuploadAvailabilityZoneSelectBox'||selectID == 'uploadFromLocalavailabilityZoneSelectBox' ){
		
		while(index < length){
			$('#'+ selectID).append($('<option/>',{
				value: data[index].id
			}).text(data[index].name));
			
			index += 1;
		}
	}else if(selectID == 'migrateVolumeSelectList' || 'takeVMSnapshotVolumeSelectBox'){
		
		while(index < length){
			$('#'+ selectID).append($('<option/>',{
				value: data[index].id
			}).text(data[index].name));
			
			index += 1;
		}
	}
	
	
};


/*버튼(모달) 종류
Volume페이지
1. take Snapshot
	createSnapshot - 스냅샷 command를 생성해서 API요청 하는 함수
	
2. recurring Snapshot
	setRecurringSnapshot - Select태그에 value, name값을 setting하는 함수
	getSnapshotPolicies - 기존에 설정된 Snapshot policy를 가져오는 함수
	createSnapshotPolicy - Snapshot policy를 생성하는 함수
	makeRecurringTR
	deleteRecurringTR
	disableRecurring
	enableRecurring
	showtab
	
3. resize
	resizePrefilter
	resizeSelectedfilter
	resizeVolume
	
4. download Volume
	downloadVolume
	
5. migrate Volume
	findStoragePoolsForMigration
	migrateVolume
	
6. migrate To Another Storage

7. attach Disk
8. detach Disk
9. create Volume Template
10. delete Volume
*/


/*
함수명 : createSnapshot
기능 : Snapshot을 생성하는 함수
파라미터 : data(해당 버튼과 연관된 JSON 데이터)
*/
function createSnapshot(data){
	
	var volumeId = data.id;
	var quiescevm = data.quiescevm;
	var asyncBackup = false;
	var name = $('#takeSnapshotBtnInputbox').val();
	var work = "Take Snapshot ";
	
	//필수 폼 체크
	if($('input:checkbox[id="takeSnapshotBtnAsyncCheckbox"]').is(":checked") == true)
			asyncBackup = true;
	
	var command = "createSnapshot&volumeId="+volumeId+"&quiescevm="+quiescevm+"&asyncBackup="+asyncBackup
	
	if(name !=""){
		command += "&name="+name;
	}
	
	//모달창의 ID를 재지정
	//modal.hide(); 수행하기 위해서 필요함
	
	var modal = new Example.Modal({
        id: 'takeSnapshotModal' // 모달창 아이디 지정
    });

	$.ajax({
		url: contextPath + '/apicreateVolume',
		type:'POST',
		dataType:'text',
		data:{"test":command},
		success:function(data){
			
			
			var jobid = JSON.parse(data).createsnapshotresponse.jobid;
			loadingImageMethod(jobid, work);
			
			var arr = data.split("~");
			
			//창 닫기
			modal.hide();
			if ( arr[0] != "connection failed.")
				{
				$("#diskcreateBtn").modal('hide');
				swal("Success", "", "success")
				.then((value) => {
				});
	
			}
			
			else
				{
				var obj = JSON.parse(arr[1]);				

				swal({ title: "Error!", 
					text: obj.createsnapshotresponse.errortext, 
					type: "error", 
					confirmButtonText: "확인" 
						});
				}

			
		},error:function(request, status, error){
		}
	});
	
};


/*
함수명 : setRecurringSnapshotSelectTag
기능 : Recurring Snapshot의 페이지에 존재하는 selectbox에 데이터를 append하는 함수
파라미터 : data(해당 버튼과 연관된 JSON 데이터)
*/
function setRecurringSnapshotSelectTag(data){
	
	$('#hourlyTimeMinutesSelectbox').find('option').remove();
	$('#dailyTimeMinutesSelectbox').find('option').remove();
	$('#weeklyTimeMinutesSelectbox').find('option').remove();
	$('#monthlyTimeMinutesSelectbox').find('option').remove();
	$('#dailyTimeHoursSelectbox').find('option').remove();
	$('#weeklyTimeHoursSelectbox').find('option').remove();
	$('#monthlyTimeHoursSelectbox').find('option').remove();
	$('#monthlyDayofWeekSelectbox').find('option').remove();
	
	appendSelectOption(data, 'hourlyTimeMinutesSelectbox');
	appendSelectOption(data, 'dailyTimeMinutesSelectbox');
	appendSelectOption(data, 'weeklyTimeMinutesSelectbox');
	appendSelectOption(data, 'monthlyTimeMinutesSelectbox');
	appendSelectOption(data, 'dailyTimeHoursSelectbox');
	appendSelectOption(data, 'weeklyTimeHoursSelectbox');
	appendSelectOption(data, 'monthlyTimeHoursSelectbox');
	appendSelectOption(data, 'monthlyDayofWeekSelectbox');
	
}


/*
함수명 : getSnapshotPolicies
기능 : snapshot 정책관련 해서 미리 세팅된 값을 서버에서 가져오는 함수
파라미터 : data(해당 버튼과 연관된 JSON 데이터)
*/
function getSnapshotPolicies(data){
	
	var volumeid = data.id;
	var command= "listSnapshotPolicies&volumeid="+volumeid;
	
	var hourlyKeepInputboxlabel = document.getElementById("hourlyKeepInputboxAlertRequired");
	var dailyKeepInputboxlabel = document.getElementById("dailyKeepInputboxAlertRequired");
	var weeklyKeepInputboxlabel = document.getElementById("weeklyKeepInputboxAlertRequired");
	var monthlyKeepInputboxlabel = document.getElementById("monthlyKeepInputboxAlertRequired");
	hourlyKeepInputboxlabel.style.display='none';
	dailyKeepInputboxlabel.style.display='none';
	weeklyKeepInputboxlabel.style.display='none';
	monthlyKeepInputboxlabel.style.display='none';
	
	enableRecurring('hourlyAddBtn');
	enableRecurring('dailyAddBtn');
	enableRecurring('weeklyAddBtn');
	enableRecurring('monthlyAddBtn');
	
	$.ajax({
		url: contextPath + '/apiCall',
		type:'POST',
		dataType:'text',
		data:{"test": command},
		success:function(data){
			var obj = JSON.parse(data).listsnapshotpoliciesresponse.snapshotpolicy;

			var index=0;
			$('.recurring.table').find('tr').remove();
			
			try{
				
				while(index < obj.length){
					var intervertype = obj[index].intervaltype;
					var schedule = obj[index].schedule;
					var timezone = obj[index].timezone;
					var maxsnaps = obj[index].maxsnaps;
					var schedulingid = obj[index].id;
					if(intervertype==0){
						disableRecurring('hourlyAddBtn');
					}else if(intervertype==1){
						disableRecurring('dailyAddBtn');
					}else if(intervertype==2){
						disableRecurring('weeklyAddBtn');
					}else if(intervertype==3){
						disableRecurring('monthlyAddBtn');
					}
					// disableRecurring(addBtn);
					
					makeRecurringTR(intervertype, schedule, timezone, maxsnaps, schedulingid);
					
					index += 1;
				}
			}catch(e){
				
			}
			
		},error:function(request, status, error){
		}
	})
}



/*
함수명 : createSnapshotPolicy
기능 : snapshot 생성하는 함수
파라미터 : data(해당 버튼과 연관된 JSON 데이터)
		addBtn(4개의 탭에서 각각 다른 버튼으로 생성을 한다. tab의 JS액션을 제어하기 위해서 사용함)
*/
function createSnapshotPolicy(data, addBtn){
	var volumeid=data.id;
	var timezone;
	var maxsnaps;
	var intervaltype;
	var schedule;
	var command;
	
	
	var hourlyKeepInputboxlabel = document.getElementById("hourlyKeepInputboxAlertRequired");
	var dailyKeepInputboxlabel = document.getElementById("dailyKeepInputboxAlertRequired");
	var weeklyKeepInputboxlabel = document.getElementById("weeklyKeepInputboxAlertRequired");
	var monthlyKeepInputboxlabel = document.getElementById("monthlyKeepInputboxAlertRequired");


	var maxsnaps1, maxsnaps2, maxsnaps3, maxsnaps4;
	//snapshot에서 keep, 스냅샷찍는 횟수를 저장하는 함수
	
	//누른 버튼에 따라 해당 inputbox에서 데이터를 가져옴
	if(addBtn=="hourlyAddBtn"){
		maxsnaps1 = $("#hourlyKeepInputbox").val();
	}else if(addBtn=="dailyAddBtn"){
		maxsnaps2 = $("#dailyKeepInputbox").val();
	}else if(addBtn=="weeklyAddBtn"){
		maxsnaps3 = $("#weeklyKeepInputbox").val();
	}else if(addBtn=="monthlyAddBtn"){
		maxsnaps4 = $("#monthlyKeepInputbox").val();
	
	}
	
	//keep 항목이 없을 경우 require 메세지를 띄우는 함수
	if(maxsnaps1==""){
		hourlyKeepInputboxlabel.style.display='';
	}else{
		hourlyKeepInputboxlabel.style.display='none';
	}
	if(maxsnaps2==""){
		dailyKeepInputboxlabel.style.display='';
	}else{
		dailyKeepInputboxlabel.style.display='none';
	}
	if(maxsnaps3==""){
		weeklyKeepInputboxlabel.style.display='';
	}else{
		weeklyKeepInputboxlabel.style.display='none';
	}
	if(maxsnaps4==""){
		monthlyKeepInputboxlabel.style.display='';
	}else{
		monthlyKeepInputboxlabel.style.display='none';
	}
	
	
	//maxsnaps1이 공백이 아닐 경우(keep값) addBtn의 종류에 따라 생성 하는 로직 실행
	if(addBtn=="hourlyAddBtn"&&maxsnaps1!=""){
		intervaltype='hourly'
		timezone = $("#hourlyTimeMinutesSelectbox option:selected").val();
		maxsnaps = $("#hourlyKeepInputbox").val();
		schedule = $("#hourlyTimeMinutesSelectbox option:selected").val();
		command="createSnapshotPolicy&volumeid="+volumeid+"&intervaltype="+intervaltype+"&maxsnaps="+maxsnaps+"&schedule="+schedule+"&timezone="+timezone;
		
		$.ajax({
			url: contextPath + '/apiCall',
			type:'POST',
			dataType:'text',
			data:{"test":command},
			success:function(data){
				
				var arr = data.split("~");
				
				
				if ( arr[0] != "connection failed.")
				{
					
					var work = "Create Snapshot Policy"
					setNotification(work, 'success');
					
					var intervertype = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.intervaltype;
					var schedule = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.schedule;
					var timezone = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.timezone;
					var maxsnaps = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.maxsnaps;
					var schedulingid = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.id;
					makeRecurringTR(intervertype, schedule, timezone, maxsnaps, schedulingid);
					disableRecurring(addBtn);
				}
				else
					{
					var obj = JSON.parse(arr[1]);				

					swal({ title: "Error!", 
						text: obj.createsnapshotpolicyresponse.errortext, 
						type: "error", 
						confirmButtonText: "확인" 
							});
					}

			},error:function(request, status, error){
			}
		});
	
	}else if(addBtn=="dailyAddBtn"&&maxsnaps2!=""){
		intervaltype='daily'
		timezone = $("#dailyTimezoneSelectbox option:selected").val();
		maxsnaps = $("#dailyKeepInputbox").val();
		
		var hour = $("#dailyTimeHoursSelectbox option:selected").val();
		var minute = $("#dailyTimeMinutesSelectbox option:selected").val();
		var AMPM = $("#dailyTimeAMPMSelectbox option:selected").val();
		if(AMPM=='PM'){
			hour += 12;
		}
		schedule = minute+":"+hour;
		command="createSnapshotPolicy&volumeid="+volumeid+"&intervaltype="+intervaltype+"&maxsnaps="+maxsnaps+"&schedule="+schedule+"&timezone="+timezone;
		
		$.ajax({
			url: contextPath + '/apiCall',
			type:'POST',
			dataType:'text',
			data:{"test":command},
			success:function(data){
				
				var arr = data.split("~");
				
				
				if ( arr[0] != "connection failed.")
				{
					
					var work = "Create Snapshot Policy"
					setNotification(work, 'success');
					
					var intervertype = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.intervaltype;
					var schedule = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.schedule;
					var timezone = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.timezone;
					var maxsnaps = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.maxsnaps;
					var schedulingid = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.id;
					makeRecurringTR(intervertype, schedule, timezone, maxsnaps, schedulingid);
					disableRecurring(addBtn);
				}
				else
					{
					var obj = JSON.parse(arr[1]);				

					swal({ title: "Error!", 
						text: obj.createsnapshotpolicyresponse.errortext, 
						type: "error", 
						confirmButtonText: "확인" 
							});
					}

			},error:function(request, status, error){
			}
		});
	
	}else if(addBtn=="weeklyAddBtn"&&maxsnaps3!=""){
		intervaltype='weekly'
		timezone = $("#weeklyTimezoneSelectbox option:selected").val();
		maxsnaps = $("#weeklyKeepInputbox").val();
		
		var dayofweek = $("#weeklyDayofWeekSelectbox option:selected").val();
		var hour = $("#weeklyTimeHoursSelectbox option:selected").val();
		var minute = $("#weeklyTimeMinutesSelectbox option:selected").val();
		var AMPM = $("#weeklyTimeAMPMSelectbox option:selected").val();
		if(AMPM=='PM'){
			hour += 12;
		}
		schedule = minute+":"+hour+":"+dayofweek;
		command="createSnapshotPolicy&volumeid="+volumeid+"&intervaltype="+intervaltype+"&maxsnaps="+maxsnaps+"&schedule="+schedule+"&timezone="+timezone;
	
		$.ajax({
			url: contextPath + '/apiCall',
			type:'POST',
			dataType:'text',
			data:{"test":command},
			success:function(data){
				
				var arr = data.split("~");
				
				
				if ( arr[0] != "connection failed.")
				{
					
					
					var work = "Create Snapshot Policy"
					setNotification(work, 'success');
					
					var intervertype = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.intervaltype;
					var schedule = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.schedule;
					var timezone = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.timezone;
					var maxsnaps = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.maxsnaps;
					var schedulingid = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.id;
					makeRecurringTR(intervertype, schedule, timezone, maxsnaps, schedulingid);
					disableRecurring(addBtn);
				}
				else
					{
					var obj = JSON.parse(arr[1]);				

					swal({ title: "Error!", 
						text: obj.createsnapshotpolicyresponse.errortext, 
						type: "error", 
						confirmButtonText: "확인" 
							});
					}

			},error:function(request, status, error){
			}
		});
		
	}else if(addBtn=="monthlyAddBtn"&&maxsnaps4!=""){
		intervaltype='monthly'
		timezone = $("#monthlyTimezoneSelectbox option:selected").val();
		maxsnaps = $("#monthlyKeepInputbox").val();
		
		var dayofmonth = $("#monthlyDayofWeekSelectbox option:selected").val();
		var hour = $("#monthlyTimeHoursSelectbox option:selected").val();
		var minute = $("#monthlyTimeMinutesSelectbox option:selected").val();
		var AMPM = $("#monthlyTimeAMPMSelectbox option:selected").val();
		if(AMPM=='PM'){
			hour += 12;
		}
		schedule = minute+":"+hour+":"+dayofmonth;
		
		command="createSnapshotPolicy&volumeid="+volumeid+"&intervaltype="+intervaltype+"&maxsnaps="+maxsnaps+"&schedule="+schedule+"&timezone="+timezone;
	
		$.ajax({
			url: contextPath + '/apiCall',
			type:'POST',
			dataType:'text',
			data:{"test":command},
			success:function(data){
				
				var arr = data.split("~");
				
				
				if ( arr[0] != "connection failed.")
				{
					var work = "Create Snapshot Policy"
					setNotification(work, 'success');
					
					var intervertype = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.intervaltype;
					var schedule = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.schedule;
					var timezone = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.timezone;
					var maxsnaps = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.maxsnaps;
					var schedulingid = JSON.parse(data).createsnapshotpolicyresponse.snapshotpolicy.id;
					makeRecurringTR(intervertype, schedule, timezone, maxsnaps, schedulingid);
					disableRecurring(addBtn);
				}
				else
					{
					var obj = JSON.parse(arr[1]);				

					swal({ title: "Error!", 
						text: obj.createsnapshotpolicyresponse.errortext, 
						type: "error", 
						confirmButtonText: "확인" 
							});
					}

			},error:function(request, status, error){
			}
		});
	
	}

}

/*
함수명 : deleteRecurringTR
기능 : Shapshot 버튼 클릭시 미리 설정된 snapshot 정책을 보여주는 Table이 존재한다. 해당 테이블에서 X 버튼을 누를경우 해당 정책을 삭제하는 함수이다.
파라미터 : schedulingid(해당 정책의 ID값)
		intervertype(Hourly, Daily, Weekly, Monthly)
*/
function deleteRecurringTR(schedulingid, intervertype){
	var command="deleteSnapshotPolicies&id="+schedulingid

	
	$.ajax({
		url: contextPath + '/apiCall',
		type:'POST',
		dataType:'text',
		data:{"test":command},
		success:function(data){

			var arr = data.split("~");
			
			if ( arr[0] != "connection failed.")
			{
				var work = "Delete Recurring Policy"
				setNotification(work, 'success');
				if(intervertype=="Hourly"){
					//정책 삭제후 해당 tab을 다시 활성화
					enableRecurring('hourlyAddBtn');
					$('.recurring.table').find('tr.Hourly').remove();
				}else if(intervertype=="Daily"){
					//정책 삭제후 해당 tab을 다시 활성화
					enableRecurring('dailyAddBtn');
					$('.recurring.table').find('tr.Daily').remove();
				}else if(intervertype=="Weekly"){
					//정책 삭제후 해당 tab을 다시 활성화
					enableRecurring('weeklyAddBtn');
					$('.recurring.table').find('tr.Weekly').remove();
				}else if(intervertype=="Monthly"){
					//정책 삭제후 해당 tab을 다시 활성화
					enableRecurring('monthlyAddBtn');
					$('.recurring.table').find('tr.Monthly').remove();
				}
				
	
			}
			
			else
				{
				var obj = JSON.parse(arr[1]);				

				swal({ title: "Error!", 
					text: obj.deletesnapshotpoliciesresponse.errortext, 
					type: "error", 
					confirmButtonText: "확인" 
						});
				}

		},error:function(request, status, error){
		}
	});
	
}

/*
함수명 : makeRecurringTR
기능 : 미리 설정되거나 생성되는 snapshot 정책을 하나의 행으로 생성해서 Table에 삽입하는 함수
파라미터 : intervertype(Hourly, Daily, Weekly, Monthly)
		schedule(스냅샷 스케줄 시간)
		timezone(타임존)
		maxsnaps(스냅샷 생성 갯수)
		schedulingid(스냅샷 정책의 ID)
*/
function makeRecurringTR(intervertype, schedule, timezone, maxsnaps, schedulingid){
	
	if(intervertype==0){
		intervertype='Hourly'
	}else if(intervertype==1){
		intervertype='Daily'
	}else if(intervertype==2){
		intervertype='Weekly'
	}else if(intervertype==3){
		intervertype='Monthly'
	}
	
	var $tr = $('<tr/>',{
		class: intervertype
	});
	
	var $td = $('<td/>').text(intervertype)
	$tr.append($td);
	var $td1 = $('<td/>').text('Time')
	$tr.append($td1);
	var $td2 = $('<td/>').text(schedule)
	$tr.append($td2);
	var $td3 = $('<td/>').text('Timezone')
	$tr.append($td3);
	var $td4 = $('<td/>').text(timezone)
	$tr.append($td4);
	var $td5 = $('<td/>').text('Keep')
	$tr.append($td5);
	var $td6 = $('<td/>').text(maxsnaps)
	$tr.append($td6);
	var $td7 = $('<td/>',{
		click: function(e){
			// 클릭시 해당 정책을 삭제하는 함수로 연결
			deleteRecurringTR(schedulingid, intervertype);
		}
	}).css({
		'cursor': 'pointer'
	})
	
	var $icon = $('<i/>',{
		class: 'fa fa-times fa-sm recurring',
		id: schedulingid
	})
	$td7.append($icon)
	
	$tr.append($td7);
	$('.recurring.table').append($tr);
}

/*
함수명 : disableRecurring
기능 : snapshot 모달창에서 탭과 폼의 내용을 사라지게 하는 함수
     snapshot 모달 창에서 정책 추가 버튼 누를 경우 사라진다.
파라미터 : btnID(HourlyAddBtn, DailyAddBtn, WeeklyAddBtn, MonthlyAddBtn)
*/
function disableRecurring(btnID){
	switch(btnID){
	case 'hourlyAddBtn':
		var hourlytab = document.getElementById("hourlyTab");
		var hourlydiv = document.getElementById("hourlytabContent")
		hourlytab.style.display='none';
		hourlydiv.style.display='none';
		break;
	case 'dailyAddBtn':
		var dailytab = document.getElementById("dailyTab");
		var dailydiv = document.getElementById("dailytabContent")
		dailytab.style.display='none';
		dailydiv.style.display='none';
		break;
	case 'weeklyAddBtn':
		var weeklytab = document.getElementById("weeklyTab");
		var weeklydiv = document.getElementById("weeklytabContent")
		weeklytab.style.display='none';
		weeklydiv.style.display='none';
		break;
	case 'monthlyAddBtn':
		var monthlytab = document.getElementById("monthlyTab");
		var monthlydiv = document.getElementById("monthlytabContent")
		monthlytab.style.display='none';
		monthlydiv.style.display='none';
		break;	
	default:
			break;
	}
	
}

/*
함수명 : enableRecurring
기능 : snapshot 모달창에서 탭과 폼의 내용을 나타나게 하는 함수
     snapshot 모달 창에서 하단 Table에서 정책 삭제 버튼 누를 경우 나타난다.
파라미터 : btnID(HourlyAddBtn, DailyAddBtn, WeeklyAddBtn, MonthlyAddBtn)
*/
function enableRecurring(btnID){
	switch(btnID){
	case 'hourlyAddBtn':
		var hourlytab = document.getElementById("hourlyTab");
		var hourlydiv = document.getElementById("hourlytabContent")
		hourlytab.style.display='';
		hourlydiv.style.display='';
		break;
	case 'dailyAddBtn':
		var dailytab = document.getElementById("dailyTab");
		var dailydiv = document.getElementById("dailytabContent")
		dailytab.style.display='';
		dailydiv.style.display='';
		break;
	case 'weeklyAddBtn':
		var weeklytab = document.getElementById("weeklyTab");
		var weeklydiv = document.getElementById("weeklytabContent")
		weeklytab.style.display='';
		weeklydiv.style.display='';
		break;
	case 'monthlyAddBtn':
		var monthlytab = document.getElementById("monthlyTab");
		var monthlydiv = document.getElementById("monthlytabContent")
		monthlytab.style.display='';
		monthlydiv.style.display='';
		break;	
	default:
			break;
	}
	
}

/*
함수명 : showtab
기능 : snapshot 모달창에서 탭을 제어하는 함수.
파라미터 : tabID(hourlytabContent, dailytabContent, weeklytabContent, monthlytabContent)
*/
 function showtab(tabID){
		// tab 선택에 따라 사라져야 되는 탭의 아이디를 배열로 선언함.
		var selectHorly = new Array("daily", "weekly", "monthly");
		var selectdaily = new Array("hourly", "weekly", "monthly");
		var selectweekly = new Array("hourly", "daily", "monthly");
		var selectmonthly = new Array("hourly", "daily", "weekly");
		var tabID = tabID + 'tabContent';
		
		switch(tabID){
		case 'hourlytabContent':
			$('#'+ tabID).show();
			$('#'+ tabID).addClass('show active');
			removeClass(selectHorly);
			break;
		case 'dailytabContent':
			$('#'+ tabID).show();
			$('#'+ tabID).addClass('show active');
			removeClass(selectdaily);
			break;
		case 'weeklytabContent':
			$('#'+ tabID).show();
			$('#'+ tabID).addClass('show active');
			removeClass(selectweekly);
			break;
		case 'monthlytabContent':
			$('#'+ tabID).show();
			$('#'+ tabID).addClass('show active');
			removeClass(selectmonthly);
			break;
		}
		
		// 다른 tab선택시 현재 탭을 숨기고 선택한 탭으로 이동
		function removeClass(data){
			var index = 0;
			while(index < data.length){
				$('#' + data[index] + 'tabContent').hide();
				$('#' + data[index] + 'tabContent').removeClass('show active');
				index += 1;
			}
		} 
	}


 /*
 함수명 : resizePrefilter
 기능 : resize 버튼 클릭시 data 파라미터에 따라 폼을 제어하는 함수
 파라미터 : data(특정 Volume에 대한 JSON data)
 */
function resizePrefilter(data){
	 var vol;
	 var newsizelabel = document.getElementById("reszieNewSizeAlertRequired");
	 var newdiskoffering = document.getElementById("resizeNewofferingPtag");
	 var newsize = document.getElementById("resizeNewsizePtag");
	 var shrinkok = document.getElementById("resizeShrinkPtag");
	 var miniops = document.getElementById("resizeMiniopsPtag");
	 var maxiops = document.getElementById("resizeMaxiopsPtag");
   
	 // 초기 설정
	 newdiskoffering.style.display='none';
     newsize.style.display='none';
	 shrinkok.style.display='none';
	 miniops.style.display='none';
	 maxiops.style.display='none';
	 newsizelabel.style.display='none';
	 
    if (data != null){
   	 vol = data
    }
			
    if (vol.type == "ROOT" && (vol.hypervisor == "XenServer" || vol.hypervisor == "KVM" || vol.hypervisor == "VMware")) {
        newdiskoffering.style.display='none';
        newsize.style.display='';
        
    } else {
   	 newdiskoffering.style.display = '';
        newsize.style.display='none';
    }
}

/*
함수명 : resizeSelectedfilter
기능 : resize에서 select값이 변경될 경우 해당 값에 따라 파라미터에 따라 폼을 제어하는 함수
파라미터 : resizedata(resize 버튼 클릭시 전달 받은 특정 Volume에 대한 JSON data)
		selectedObj(select된 값)
*/
function resizeSelectedfilter(resizedata, selectedObj){
	var shrinkok = document.getElementById("resizeShrinkPtag");
	var miniops = document.getElementById("resizeMiniopsPtag");
	var maxiops = document.getElementById("resizeMaxiopsPtag");
	
	if (resizedata.size > selectedObj.disksize * (1024 * 1024 * 1024)) { 
		shrinkok.style.display='';
   } else {
   	shrinkok.style.display='none';
   }	

	if (selectedObj.iscustomizediops == true) {
		miniops.style.display='';
		maxiops.style.display='';
   } else {
   	miniops.style.display='none';
		maxiops.style.display='none';
   }

}

/*
함수명 : resizeVolume
기능 : resize 기능을 수행하는 함수
파라미터 : data(특정 Volume에 대한 JSON data)
*/
function resizeVolume(data){
	

	var id = data.id;
	var diskofferingid = data.diskofferingid;
	
	var newsize = $('#resizeNewsizeInputbox').val();
	var newoffering = $('#resizeNewofferingSelectBox option:selected').val();
	var shirnkok = false;
	var miniops = $('#resizeMiniopsInputbox').val();
	var maxiops = $('#resizeMiniopsInputbox').val();
	
	if($('input:checkbox[id="resizeShrinkokCheckbox"]').is(":checked") == true){
		shirnkok = true;
	}
	
	var newsizelabel = document.getElementById("reszieNewSizeAlertRequired");
	
	var command="resizeVolume&id="+id;
	
	if(newsize != ""){
		command = command+"&size="+newsize;
	}else{
		command = command+"&diskofferingid="+newoffering;
	}
	if(shirnkok == true){
		command = command+"&shrinkok=true";
	}
	
	if(miniops != ""){
		command = command+"&miniops="+miniops;
	}
	if(maxiops != ""){
		command = command+"&maxiops="+maxiops;
	}
	
	
	var modal = new Example.Modal({
        id: 'resizeModal' // 모달창 아이디 지정
    });
	
	// var command;
	if (newsize == "" ){
		 newsizelabel.style.display = '';
	 }else{
		 newsizelabel.style.display = 'none';
	 }
		   
	 var work="Resize Volume"
		
	 if (newsize != "" || newoffering != undefined){
		 
		 
		 
		 $.ajax({
				url: contextPath + '/apiCall',
				type:'POST',
				dataType:'text',
				data:{"test":command},
				success:function(data){
					
					var arr = data.split("~");
					
					
					var jobid = JSON.parse(data).resizevolumeresponse.jobid;
					loadingImageMethod(jobid, work);
					
					if ( arr[0] != "connection failed.")
						{
						$("#diskcreateBtn").modal('hide');
						swal("Success", "", "success")
						.then((value) => {
						});
						setNotification(work, 'success');
					}
					else
						{
						var obj = JSON.parse(arr[1]);				

						swal({ title: "Error!", 
							text: obj.resizevolumeresponse.errortext, 
							type: "error", 
							confirmButtonText: "확인" 
								});
						}
					
					

				},error:function(request, status, error){
				}
			});
		 $('#resizeNewofferingSelectBox').find('option').remove();
		 modal.hide();
		 
	 }
	 
};



/*
함수명 : downloadVolume
기능 : volume download 기능을 수행하는 함수
파라미터 : data(특정 Volume에 대한 JSON data)
*/
function downloadVolume(data){
	
	
	var id = data.id;
	var zoneid = data.zoneid;
	var mode = "HTTP_DOWNLOAD";
	var name = $('#takeSnapshotBtnInputbox').val();
	var work = "Download volume"
	
	var command = "extractVolume&id="+id+"&zoneid="+zoneid+"&mode="+mode;
	
	

	$.ajax({
		url: contextPath + '/apiCall',
		type:'POST',
		dataType:'text',
		data:{"test":command},
		success:function(data){
			var arr = data.split("~");
			
			var jobid = JSON.parse(data).extractvolumeresponse.jobid;
			loadingImageMethod(jobid, work);
			 
			
			if ( arr[0] != "connection failed.")
				{
				$("#diskcreateBtn").modal('hide');
				swal("Success", "", "success")
				.then((value) => {
				});
	
			}
			
			else
				{
				var obj = JSON.parse(arr[1]);				

				swal({ title: "Error!", 
					text: obj.extractvolumeresponse.errortext, 
					type: "error", 
					confirmButtonText: "확인" 
						});
				}

			
		},error:function(request, status, error){
		}
	});
	
}


/*
함수명 : findStoragePoolsForMigration
기능 : migrate 모달창에 존재하는 select 태그에 storage pool에 대한 정보를 서버에서 가져와 append하는 함수
파라미터 : data(특정 Volume에 대한 JSON data)
*/
function findStoragePoolsForMigration(data){
	var id = data.id;
	var command= "findStoragePoolsForMigration&id="+id;
	
	$.ajax({
		url: contextPath + '/apiCall',
		type:'POST',
		dataType:'text',
		data:{"test": command},
		success:function(data){
			var obj = JSON.parse(data).findstoragepoolsformigrationresponse;
			appendSelectOption(obj,'migrateVolumeSelectList');
		},error:function(request, status, error){
		}
	});
	
}

/*
함수명 : migrateVolume
기능 : migrate 기능을 수행하는 함수
파라미터 : data(특정 Volume에 대한 JSON data)
*/
function migrateVolume(data){
	var volumeid = data.id;
	var storageid = $('#migrateVolumeSelectList option:selected').val();
	var livemigrate = false;
	if(data.vmstate == 'Running'){
		livemigrate = true;
	};
	
	
	var migrateVolumeSelectListlabel = document.getElementById("migrateVolumeSelectListAlertRequired");
	var modal = new Example.Modal({
        id: 'migrateVolumeModal' 
    });
	
	if(storageid == undefined){
		migrateVolumeSelectListlabel.style.display = '';
	}else{
		migrateVolumeSelectListlabel.style.display = 'none';
	}
	
	if(storageid != undefined){
		var command = "migrateVolume&storageid="+storageid+"&volumeid="+volumeid+"&livemigrate="+livemigrate;
		var work = "Migrate Volume ";
		
		
		$.ajax({
			url: contextPath + '/apiCall',
			type:'POST',
			dataType:'text',
			data:{"test":command},
			success:function(data){
				
				
				var arr = data.split("~");
				
				 var jobid = JSON.parse(data).migratevolumeresponse.jobid;
				 loadingImageMethod(jobid, work);
				 migrateVolumeSelectListlabel.style.display = 'none';
				 modal.hide();
				 
				if ( arr[0] != "connection failed.")
					{
					$("#diskcreateBtn").modal('hide');
					swal("Success", "", "success")
					.then((value) => {
					});
		
				}
				
				else
					{
					var obj = JSON.parse(arr[1]);				

					swal({ title: "Error!", 
						text: obj.migratevolumeresponse.errortext, 
						type: "error", 
						confirmButtonText: "확인" 
							});
					}
				

				
			},error:function(request, status, error){
			}
		});
	}
	
	
}


/*
함수명 : getlistVolumes
기능 : VM Snapshot 모달 창에 존재하는  selectbox에  volumelist데이터를 서버에서 가져와 append하는 함수
파라미터 : data(특정 Volume에 대한 JSON data)
*/
function getlistVolumes(data){
	virtualmachineid = data.virtualmachineid;
	command = "listVolumes&virtualMachineId="+virtualmachineid;
	$.ajax({
		url: contextPath + '/apiCall',
		type:'POST',
		dataType:'text',
		data:{"test":command},
		success:function(data){
			
			var volumeList = JSON.parse(data).listvolumesresponse;
			appendSelectOption(volumeList, 'takeVMSnapshotVolumeSelectBox')

   			},error:function(request, status, error){
			}
		});
}


/*
함수명 : getStoragePoollist
기능 : VM Snapshot 모달 창에 존재하는  selectbox에  listStoragePools 데이터를 서버에서 가져와 append하는 함수
파라미터 : data(특정 Volume에 대한 JSON data)
*/
function getStoragePoollist(data){
	
	var zoneid = data.zoneid;
	
	var command= "listStoragePools&zoneid="+zoneid;
	
	$.ajax({
		url: contextPath + '/apiCall',
		type:'POST',
		dataType:'text',
		data:{"test": command},
		success:function(data){
			var obj = JSON.parse(data).liststoragepoolsresponse.storagepool;
			appendSelectOption(obj,'migrateVolumeAnotherSelectList');
		},error:function(request, status, error){
		}
	});
	
}


/*
함수명 : getStoragePoollist
기능 : migrateVolumeAnother 기능을수행하는 함수
파라미터 : data(특정 Volume에 대한 JSON data)
*/
function migrateVolumeAnother(data){
	var volumeid = data.id;
	var storageid = $('#migrateVolumeAnotherModal option:selected').val();
	
	var command = "migrateVolume&storageid="+storageid+"&volumeid="+volumeid;
	
	var work = "Migrate Volume ";
	
	
	
	$.ajax({
		url: contextPath + '/apiCall',
		type:'POST',
		dataType:'text',
		data:{"test":command},
		success:function(data){
			
			var arr = data.split("~");
			
			
			 var jobid = JSON.parse(data).migratevolumeresponse.jobid;
			 loadingImageMethod(jobid, work);
			 
			if ( arr[0] != "connection failed.")
				{
				$("#diskcreateBtn").modal('hide');
				swal("Success", "", "success")
				.then((value) => {
				});
	
			}
			
			else
				{
				var obj = JSON.parse(arr[1]);				

				swal({ title: "Error!", 
					text: obj.migratevolumeresponse.errortext, 
					type: "error", 
					confirmButtonText: "확인" 
						});
				}

			
		},error:function(request, status, error){
		}
	});
}




/*
함수명 : createAttachDisk
기능 : attach 기능을 수행하는 함수
파라미터 : data(특정 Volume에 대한 JSON data)
*/
function createAttachDisk(data){
	var id = data.id;
	var virtualMachineId = $('#attachDiskSelectBox').val();
	
	var command = "attachVolume&id="+id+"&virtualMachineId="+virtualMachineId;
	
	var work = "Attach Disk ";
	
	
	
	$.ajax({
		url: contextPath + '/apiCall',
		type:'POST',
		dataType:'text',
		async: false,
		data:{"test":command},
		success:function(data){
			
			var arr = data.split("~");
			
			

			if ( arr[0] != "connection failed.")
				{
				$("#diskcreateBtn").modal('hide');
				swal("Success", "", "success")
				.then((value) => {
				});
	
			}
			
			else
				{
				var obj = JSON.parse(arr[1]);				

				swal({ title: "Error!", 
					text: obj.attachvolumeresponse.errortext, 
					type: "error", 
					confirmButtonText: "확인" 
						});
				}
			
			
			
			var jobid = JSON.parse(data).attachvolumeresponse.jobid;
			loadingImageMethod(jobid, work);
			
		},error:function(request, status, error){
		}
		
		 
	});

	
};

/*
함수명 : detachDisk
기능 : detach 기능을 수행하는 함수
파라미터 : data(특정 Volume에 대한 JSON data)
*/
function detachDisk(data){
	var id = data.id;
	
	
	var command = "detachVolume&id="+id;
	
	var work = "Detach Disk ";
	
	
	
	$.ajax({
		url: contextPath + '/apiCall',
		type:'POST',
		dataType:'text',
		async: false,
		data:{"test":command},
		success:function(data){
			
			
			var arr = data.split("~");
			
			
			var jobid = JSON.parse(data).detachvolumeresponse.jobid;
			loadingImageMethod(jobid, work);
			
			if ( arr[0] != "connection failed.")
				{
				$("#diskcreateBtn").modal('hide');
				swal("Success", "", "success")
				.then((value) => {
				});
	
			}
			
			else
				{
				var obj = JSON.parse(arr[1]);				

				swal({ title: "Error!", 
					text: obj.detachvolumeresponse.errortext, 
					type: "error", 
					confirmButtonText: "확인" 
						});
				}
			

			
		},error:function(request, status, error){
		}
	});
	

};


/*
함수명 : createVolume
기능 : volume을 생성하는 함수
파라미터 : data(특정 Volume에 대한 JSON data)
*/
function createVolume(){
	var name = $('#addBtnNameInputbox').val();
	var zoneId = $('#addBtnAvailabilitySelectbox option:selected').val();
	var diskOfferingId = $('#addBtnDiskofferingSelectbox option:selected').val();
	
	var command = "createVolume&name="+name+"&zoneId="+zoneId+"&diskOfferingId="+diskOfferingId;
	var work = "Create Volume";
	
	
	
	$.ajax({
		url: contextPath + '/apicreateVolume',
		type:'POST',
		dataType:'text',
		data:{"test":command},
		success:function(data){
			
			var arr = data.split("~");
			
			var jobid = JSON.parse(data).createvolumeresponse.jobid;
			loadingImageMethod(jobid, work);
			
			
			
			if ( arr[0] != "connection failed.")
				{
				$("#diskcreateBtn").modal('hide');
				swal("Success", "", "success")
				.then((value) => {
				});
	
			}
			
			else
				{
				var obj = JSON.parse(arr[1]);				

				swal({ title: "Error!", 
					text: obj.detachvolumeresponse.errortext, 
					type: "error", 
					confirmButtonText: "확인" 
						});
				}

		},error:function(request, status, error){
		}
	});
	
	
};

/*
함수명 : createSnapshotVolume
기능 : Snapshot에서 volume을 생성하는 함수
파라미터 : data(특정 Volume에 대한 JSON data)
*/
function createSnapshotVolume(data){
	var snapshotid = data.id;
	var name = $('#createSnapshotVolumeNameInputBox').val();
	
	var command = "createVolume&snapshotid="+snapshotid+"&name="+name;
	var work = "Create Snapshot Volume";
	
	
	var createSnapshotVolumelabel = document.getElementById("createSnapshotVolumeNameInputBoxAlertRequired");
	
	
	if(name==""){
		createSnapshotVolumelabel.style.display = '';
	}else{
		createSnapshotVolumelabel.style.display = 'none';
	}
	
	var modal = new Example.Modal({
        id: 'createSnapshotVolumeModal' // 모달창 아이디 지정
    });
	
	if(name != ""){
		$.ajax({
			url: contextPath + '/apiCall',
			type:'POST',
			dataType:'text',
			data:{"test":command},
			success:function(data){
				
				var arr = data.split("~");
				
				var jobid = JSON.parse(data).createvolumeresponse.jobid;
				loadingImageMethod(jobid, work);
				
				
				
				if ( arr[0] != "connection failed.")
					{
					modal.hide();
					$("#diskcreateBtn").modal('hide');
					swal("Success", "", "success")
					.then((value) => {
					});
					
		
				}
				
				else
					{
					var obj = JSON.parse(arr[1]);				

					swal({ title: "Error!", 
						text: obj.createvolumeresponse.errortext, 
						type: "error", 
						confirmButtonText: "확인" 
							});
					}

			},error:function(request, status, error){
			}
		});
	}
	
	
	
	
};



/*
함수명 : createSnapshotVolume
기능 : Volume에서  Template을 생성하는 함수
파라미터 : data(특정 Volume에 대한 JSON data)
*/
function createVolumeTemplate(data){
	
	var volumeId = data.id;
	var name = $('#createVolumeTemplateNameInputbox').val();
	var displayText = $('#createVolumeTemplateDescInputbox').val();
	var osTypeId = $('#createVolumeTemplateOstypeSelectbox option:selected').val();
	var isPublic = false;
	var passwordEnabled = false;
	var isdynamicallyscalable = false;
	var XSversion = "";
	var isfeatured= false;
	var work = "Create Volume Template ";
	
	var createVolumeTemplateNamelable = document.getElementById("createVolumeTemplateNameAlertRequired");
	var createVolumeTemplateDescriptionlabel = document.getElementById("createVolumeTemplateDescriptionAlertRequired");
	
	var modal = new Example.Modal({
        id: 'createVolumeTemplateModal' // 모달창 아이디 지정
    });
		
	
	if($('input:checkbox[id="createVolumeTemplateXSVersionCheckbox"]').is(":checked") == true){
		XSversion = 'xenserver61';
	}
	
	if($('input:checkbox[id="createVolumeTemplatePublicCheckbox"]').is(":checked") == true){
		isPublic = true;
	}
		
	
	if($('input:checkbox[id="createVolumeTemplatePasswordCheckbox"]').is(":checked") == true){
		passwordEnabled = true;
	}
		
	
	if($('input:checkbox[id="createVolumeTemplateDynamicallyCheckbox"]').is(":checked") == true){
		isdynamicallyscalable = true;
	}
		
	if($('input:checkbox[id="createVolumeTemplateFeatureCheckbox"]').is(":checked") == true){
		isfeatured = true;
	}
	
	var command = "createTemplate&volumeId="+volumeId+"&name="+name+"&displayText="+displayText+"&osTypeId="+osTypeId+"&isPublic="+isPublic+"&passwordEnabled="+passwordEnabled+"&isdynamicallyscalable="+isdynamicallyscalable+"&isfeatured="+isfeatured+"&details%5B0%5D.hypervisortoolsversion="+XSversion;

	// 필수 항목들이 채워졌는지 체크 후경고창 나타내는 코드
	if(name==""){
		createVolumeTemplateNamelable.style.display = '';
	}else{
		createVolumeTemplateNamelable.style.display = 'none';
	}
		
	
	
	if(displayText==""){
		createVolumeTemplateDescriptionlabel.style.display = '';
	}else{
		createVolumeTemplateDescriptionlabel.style.display = 'none';
	}
		
	
	
	if(name != "" && displayText != ""){
		$('#createVolumeTemplateOstypeSelectbox').find('option').remove();
		
		
		$.ajax({
			url: contextPath + '/apiCall',
			type:'POST',
			dataType:'text',
			data:{"test":command},
			success:function(data){
				
				
				var arr = data.split("~");
				
				 var jobid = JSON.parse(data).createtemplateresponse.jobid;
				 loadingImageMethod(jobid, work);
				
				
				
				if ( arr[0] != "connection failed.")
					{
					$("#diskcreateBtn").modal('hide');
					swal("Success", "", "success")
					.then((value) => {
					});
					// setNotification(work, 'success');
		
				}
				
				else
					{
					var obj = JSON.parse(arr[1]);				

					swal({ title: "Error!", 
						text: obj.createtemplateresponse.errortext, 
						type: "error", 
						confirmButtonText: "확인" 
							});
					}
				

				
			},error:function(request, status, error){
			}
		});
		modal.hide();
		
	}

		
		
};


/*
함수명 : createSnapshotTemplate
기능 : Snapshot에서  Template을 생성하는 함수
파라미터 : data(특정 Volume에 대한 JSON data)
*/
function createSnapshotTemplate(data){
	
	var snapshotid = data.id;
	var name = $('#createSnapshotTemplateNameInputbox').val();
	var displayText = $('#createSnapshotTemplateDescInputbox').val();
	var osTypeId = $('#createSnapshotsTemplateOstypeSelectbox option:selected').val();
	var isPublic = false;
	var passwordEnabled = false;
	var isdynamicallyscalable = false;
	var work = "Create Snapshot Template ";

	var createSnapshotTemplateNamelable = document.getElementById("createSnapshotTemplateNameAlertRequired");
	var createSnapshotTemplateDescriptionlabel = document.getElementById("createSnapshotTemplateDescriptionAlertRequired");
	
	var modal = new Example.Modal({
        id: 'createSnapshotTemplateModal' // 모달창 아이디 지정
    });
		
	
	if($('input:checkbox[id="createSnapshotTemplatePublicCheckbox"]').is(":checked") == true){
		isPublic = true;
	}
		
	
	if($('input:checkbox[id="createSnapshotTemplatePublicCheckbox"]').is(":checked") == true){
		passwordEnabled = true;
	}
		
	
	if($('input:checkbox[id="createSnapshotTemplateDynamicallyCheckbox"]').is(":checked") == true){
		isdynamicallyscalable = true;
	}
		
	
	var command = "createTemplate&snapshotid="+snapshotid+"&name="+name+"&displayText="+displayText+"&osTypeId="+osTypeId+"&isPublic="+isPublic+"&passwordEnabled="+passwordEnabled+"&isdynamicallyscalable="+isdynamicallyscalable;

	
	// 필수 항목들이 채워졌는지 체크 후경고창 나타내는 코드
	if(name==""){
		createSnapshotTemplateNamelable.style.display = '';
	}else{
		createSnapshotTemplateNamelable.style.display = 'none';
	}
		
	
	
	if(displayText==""){
		createSnapshotTemplateDescriptionlabel.style.display = '';
	}else{
		createSnapshotTemplateDescriptionlabel.style.display = 'none';
	}
		
	
	
	if(name != "" && displayText != ""){
		
		$.ajax({
			url: contextPath + '/apiCall',
			type:'POST',
			dataType:'text',
			data:{"test":command},
			success:function(data){
				
				
				var arr = data.split("~");
				
				 var jobid = JSON.parse(data).createtemplateresponse.jobid;
				 loadingImageMethod(jobid, work);
				
				
				
				if ( arr[0] != "connection failed.")
					{
					$("#diskcreateBtn").modal('hide');
					swal("Success", "", "success")
					.then((value) => {
					});
		
				}
				
				else
					{
					var obj = JSON.parse(arr[1]);				

					swal({ title: "Error!", 
						text: obj.createtemplateresponse.errortext, 
						type: "error", 
						confirmButtonText: "확인" 
							});
					}
				

				
			},error:function(request, status, error){
			}
		});
		modal.hide();
	}

};

/*
함수명 : deleteVolume
기능 : volume을 삭제하는 기능을 하는 함수
파라미터 : data(특정 Volume에 대한 JSON data)
*/
function deleteVolume(data){
	
	var id = data.id;
	var work = "Delete Disk ";
	
	var command = "deleteVolume&id="+id;
	
	$.ajax({
		url: contextPath + '/apiCall',
		type:'POST',
		dataType:'text',
		data:{"test":command},
		success:function(data){
			
			var arr = data.split("~");
			 
			 

			if ( arr[0] != "connection failed.")
				{
				$("#diskcreateBtn").modal('hide');
				swal("Success", "", "success")
				.then((value) => {
				});
				
				setNotification(work, 'success');
			}
			
			else
				{
				var obj = JSON.parse(arr[1]);				

				swal({ title: "Error!", 
					text: obj.deletevolumeresponse.errortext, 
					type: "error", 
					confirmButtonText: "확인" 
						});
				}
			

			
		},error:function(request, status, error){
		}
	});
	//setTimeout("location.reload()", 1500);
	
};


/*
함수명 : deleteSnapshot
기능 : Snapshot을 삭제하는 기능을 하는 함수
파라미터 : data(특정 Volume에 대한 JSON data)
*/
function deleteSnapshot(data){

	
	var id = data.id;
	var work = "Delete Snapshot ";
	
	var command = "deleteSnapshot&id="+id;
	
	$.ajax({
		url: contextPath + '/apiCall',
		type:'POST',
		dataType:'text',
		data:{"test":command},
		success:function(data){
			
			var arr = data.split("~");
			
			
			
			if ( arr[0] != "connection failed.")
				{
				$("#diskcreateBtn").modal('hide');
				swal("Success", "", "success")
				.then((value) => {
				});
				setNotification(work, 'success');
			}
			
			else
				{
				var obj = JSON.parse(arr[1]);				

				swal({ title: "Error!", 
					text: obj.deletesnapshotresponse.errortext, 
					type: "error", 
					confirmButtonText: "확인" 
						});
				}

			
		},error:function(request, status, error){
		}
	});
	//setTimeout("location.reload()", 1500);
	
};

/*
함수명 : deleteSnapshot
기능 : VM Snapshot을 삭제하는 기능을 하는 함수
파라미터 : data(특정 Volume에 대한 JSON data)
*/
function deleteVMSnapshot(data){
	var vmsnapshotid = data.id;
	var work = "Delete VM Snapshot ";
	
	var command = "deleteVMSnapshot&vmsnapshotid="+vmsnapshotid;
	
	$.ajax({
		url: contextPath + '/apiCall',
		type:'POST',
		dataType:'text',
		data:{"test":command},
		success:function(data){
			
			var arr = data.split("~");
			
			

			if ( arr[0] != "connection failed.")
				{
				$("#diskcreateBtn").modal('hide');
				swal("Success", "", "success")
				.then((value) => {
					setNotification(work, 'success');
				});
	
			}
			
			else
				{
				var obj = JSON.parse(arr[1]);				

				swal({ title: "Error!", 
					text: obj.deletevmsnapshotresponse.errortext, 
					type: "error", 
					confirmButtonText: "확인" 
						});
				}

			
		},error:function(request, status, error){
		}
	});
	//setTimeout("location.reload()", 1500);
};


/*function recurringSnapshotModal(){
	$("html, body").attr('class', 'fix-header fix-sidebar')
    $('html, body').css("padding-right", "");
	// style="display:none"
};
*/


/*
함수명 : uploadFromLocal
기능 : volume 파일을 서버로 업로드해서 volume을 생성하는 함수 
파라미터 :
*/
function uploadFromLocal(){
	 var localfile = $('#uploadFromLocalFileInputbox').val(); 
	 var name = $('#uploadFromLocalNameInputBox').val();
	 var zoneId = $('#uploadFromLocalavailabilityZoneSelectBox option:selected').val();
	 var checksum = $('#uploadFromLocalMD5InputBox').val(); 
	 var format = $('#uploadFromLocalFormatSelectbox option:selected').val();
	  
	  var command = "getUploadParamsForVolume&name="+name+"&zoneId="+zoneId+"&format="+format;
	  var work = "Upload Volume from Local";
	  
	  var uploadFromLocalFileInputboxlabel = document.getElementById("uploadFromLocalFileInputboxAlertRequired"); 
	  var uploadFromLocalNameInputBoxlabel = document.getElementById("uploadFromLocalNameInputBoxAlertRequired");
	  
	  uploadFromLocalFileInputboxlabel.style.display = 'none';
	  uploadFromLocalNameInputBoxlabel.style.display = 'none';
	  
	  // 필수 입력 폼 체크
	  if(localfile==""){ 
		  uploadFromLocalFileInputboxlabel.style.display = ''; 
	  }else{ 
		  uploadFromLocalFileInputboxlabel.style.display ='none'; 
	  }
	  
	  if(name==""){ 
		  uploadFromLocalNameInputBoxlabel.style.display =''; 
	  }else{ 
		  uploadFromLocalNameInputBoxlabel.style.display = 'none'; 
	  }
	  
	  var modal = new Example.Modal({
	        id: 'uploadFromLocalModal' // 모달창 아이디 지정
	   });
	  
	  //필수로 입력해야되는 폼 입력시 실행
	  if(localfile != "" && name != ""){ 
		  
		  $.ajax({ 
			  url:contextPath + '/apiCall', 
			  type:'POST', 
			  dataType:'text', 
			  data:{"test":command}, 
			  success:function(data){
				  
				  data.response.success({
						 url: uploadparams.postURL,
	                     ajaxPost: true,
	                     data: {
	                         'X-signature': uploadparams.signature,
	                         'X-expires': uploadparams.expires,
	                         'X-metadata': uploadparams.metadata
	                     }
				 });
				  
				  
				  var arr = data.split("~"); 
				  
				  if ( arr[0] != "connection failed.") { 
					  $("#diskcreateBtn").modal('hide');
					  swal("Success", "", "success") .then((value) => { });
					  refreshVolumeTable(); 
					  refreshVolumeEventTable();
				  }else { 
					  var obj = JSON.parse(arr[1]); 
					  swal({ title: "Error!", text:'', 
					  type: "error", confirmButtonText: "확인" }); 
				}
				  
	  
			  },error:function(request, status, error){
			  } });
		  //버튼 페이지 숨기고 테이블 갱신
	  modal.hide();
	  refreshVolumeTable(); 
	  refreshVolumeEventTable();
	  $('#uploadFromLocalavailabilityZoneSelectBox').find('option').remove();  
	  }
}

/*
함수명 : uploadFromURL
기능 : volume URL을 통해 서버에 업로드하고 volume을 생성하는 함수 
파라미터 :
*/
function uploadFromURL(){
	
	var url = $('#uploadURLInputBox').val();
	var name = $('#uploadNameInputBox').val();
	var zoneId = $('#URLuploadAvailabilityZoneSelectBox option:selected').val();
	var diskOfferingId = $('#URLuploadDiskOfferingSelectBox option:selected').val();
	var checksum = $('#uploadChecksumInputBox').val();
	var format = $('#URLuploadFormatSelectbox option:selected').val();
	
	var command = "uploadVolume&name="+name+"&zoneId="+zoneId+"&format="+format+"&url="+url+"&diskOfferingId="+diskOfferingId+"&checksum="+checksum;
	var work = "Upload Volume from URL";
	
	var uploadURLInputBoxURLlabel = document.getElementById("uploadURLInputBoxURLAlertRequired");
	var uploadURLInputBoxNamelabel = document.getElementById("uploadURLInputBoxNameAlertRequired");
	
	var modal = new Example.Modal({
        id: 'uploadModal' // 모달창 아이디 지정
    });
	
	if(url==""){
		uploadURLInputBoxURLlabel.style.display = '';
	}else{
		uploadURLInputBoxURLlabel.style.display = 'none';
	}
	
	if(name==""){
		uploadURLInputBoxNamelabel.style.display = '';
	}else{
		uploadURLInputBoxNamelabel.style.display = 'none';
	}
	
	if(url != "" && name != ""){
		$.ajax({
			url: contextPath + '/apiCall',
			type:'POST',
			dataType:'text',
			data:{"test":command},
			success:function(data){
				
				var arr = data.split("~");
				
				 var jobid = JSON.parse(data).uploadvolumeresponse.jobid;
				 loadingImageMethod(jobid, work);

				if ( arr[0] != "connection failed.")
					{
					$("#diskcreateBtn").modal('hide');
					swal("Success", "", "success")
					.then((value) => {
					});
					refreshVolumeTable();
      	           	refreshVolumeEventTable();
      	           	modal.hide()
		
				}
				
				else
					{
					var obj = JSON.parse(arr[1]);				

					swal({ title: "Error!", 
						text: obj.uploadvolumeresponse.errortext, 
						type: "error", 
						confirmButtonText: "확인" 
							});
					}

				
			},error:function(request, status, error){
			}
		});
		
		$('#URLuploadAvailabilityZoneSelectBox').find('option').remove();
     	$('#URLuploadDiskOfferingSelectBox').find('option').remove();
	}
}

/*
함수명 : revertToVMSnapshot
기능 : VM Snaphot을 revert하는 기능을 수행하는 함수
파라미터 : data(특정 Volume에 대한 JSON data)
*/
function revertToVMSnapshot(data){
	var vmsnapshotid = data.id;
	
	var work = "Revert to VM Snapshot ";
	
	var command = "revertToVMSnapshot&vmsnapshotid="+vmsnapshotid;
	
	
	$.ajax({
		url: contextPath + '/apiCall',
		type:'POST',
		dataType:'text',
		data:{"test":command},
		success:function(data){
			
			var arr = data.split("~");
			
			
			var jobid = JSON.parse(data).reverttovmsnapshotresponse.jobid;
			loadingImageMethod(jobid, work);
			
			if ( arr[0] != "connection failed.")
				{
				$("#diskcreateBtn").modal('hide');
				swal("Success", "", "success")
				.then((value) => {
				});
	
			}
			
			else
				{
				var obj = JSON.parse(arr[1]);				

				swal({ title: "Error!", 
					text: obj.reverttovmsnapshotresponse.errortext, 
					type: "error", 
					confirmButtonText: "확인" 
						});
				}

		},error:function(request, status, error){
		}
	});
}


/*
함수명 : takeVMSnapshot
기능 : VM Snapshot을 생성하는 함수
파라미터 : data(특정 Volume에 대한 JSON data)
*/

function takeVMSnapshot(data){
	var volumeid=data.id;
	var name=$('#takeVMSnapshotBtnInputbox').val();
	var volume = $('#takeVMSnapshotVolumeSelectBox option:selected').val();
	var volumelabel = document.getElementById("TakeVMSnapshotVolumeSelectBoxAlertRequired");
	var command="createSnapshotFromVMSnapshot&volumeid="+volumeid;
	var work = "Take VM Snapshot"
	var modal = new Example.Modal({
        id: 'takeVMSnapshotModal' // 모달창 아이디 지정
    });
	volumelabel.style.display = 'none';
	
	if(volume == undefined){
		volumelabel.style.display = '';
	}else{
		volumelabel.style.display = 'none';
		command = command+"&vmsnapshotid="+volume;
	}
	
	if(name != ""){
		command = command+"&name="+name;
	}
	
	if(volume != undefined){
		$.ajax({
			url: contextPath + '/apiCall',
			type:'POST',
			dataType:'text',
			data:{"test":command},
			success:function(data){
				
				var arr = data.split("~");
				
				modal.hide();
				$('#takeVMSnapshotVolumeSelectBox').find('option').remove();
				
				if ( arr[0] != "connection failed.")
					{
					$("#diskcreateBtn").modal('hide');
					swal("Success", "", "success")
					.then((value) => {
					});
					var jobid = JSON.parse(data).createsnapshotfromvmsnapshotresponse.jobid;
					loadingImageMethod(jobid, work);
		
				}
				
				else
					{
					var obj = JSON.parse(arr[1]);				

					swal({ title: "Error!", 
						text: obj.createsnapshotfromvmsnapshotresponse.errortext, 
						type: "error", 
						confirmButtonText: "확인" 
							});
					}

			},error:function(request, status, error){
			}
		});
	}
}



/*
함수명 : storageModalMaker
기능 : Quick뷰나 페이지에 있는 버튼을 클릭시 이 함수로 연결이 된다.
파라미터 :
btnID를 통해 어떤 버튼인지 구별해서 알맞은 기능을 수행하고, 
data는 해당 버튼과 연관된 Volume에 대한 JSON data로 버튼 클릭 후 동작시 필요하다.

분기:
takeSnapshot
recurringSnapshot
resize
downloadVolume
migrateVolume
migrateToAnotherStorage
attachDisk
detachDisk
createVolumeTemplate
deleteVolume
createSnapshotTemplate
createSnapshotVolume
revertSnapshot
deleteSnapshot
takeSnapshotVM
deleteVMSnapshot
revertToVMSnapshot
uploadFromLocal
upload
add
metrics
volume
addTag
hourlyAddBtn
dailyAddBtn
weeklyAddBtn
monthlyAddBtn


switch문 기본 구조

				case 'takeSnapshot':				--> buttonID로 Switch문 분기가 나뉜다.
				var modal = new Example.Modal({		--> 버튼 클릭시 나타나는 창을 생성한다. JSP에 작성된 Div의 id를 매칭 시켜서 modal이라는 객체를 만든다.
		            id: 'takeSnapshotModal'
		        });
				
				modal.show(); 						--> modal을 화면 정중앙에 나타낸다
				
		        $("#takeSnapshotBtn").unbind("click").click(function() {			--> OK 버튼 클릭시 동작
		        	createSnapshot(data);											--> 버튼에 알맞은 함수를 호출한다.	
		        	refreshVolumeTable();											
		        	refreshVolumeEventTable();
		        });
		        
		        $("#takeSnapshotBtnClose").unbind("click").click(function() {		--> cancle 버튼 클릭시 동작
	    	        $('#takeSnapshotBtnClose').find('option').remove();
	    	        $('#takeSnapshotBtnClose').find('option').remove();
	    	        modal.hide();
	    	        
		        });
				break;
*/

function storageModalMaker(btnID, data){		
    	switch (btnID){	
    		
	    	case 'takeSnapshot':
				var modal = new Example.Modal({
		            id: 'takeSnapshotModal'
		        });
				
				modal.show(); 
				
		        $("#takeSnapshotBtn").unbind("click").click(function() {
		        	createSnapshot(data);
		        	refreshVolumeTable();
		        	refreshVolumeEventTable();
		        });
		        
		        $("#takeSnapshotBtnClose").unbind("click").click(function() {
	    	        $('#takeSnapshotBtnClose').find('option').remove();
	    	        $('#takeSnapshotBtnClose').find('option').remove();
	    	        modal.hide();
	    	        
		        });
				break;
				
    		case 'recurringSnapshot':
    			setRecurringSnapshotSelectTag(data)
    			var modal = new Example.Modal({
    	            id: 'recurringSnapshotModal' 
    	        });
    			
    			getSnapshotPolicies(data);	 			
    			modal.show();
	     
    	
    	        $("#recurringSnapshotBtnClose").unbind("click").click(function() {
    	            modal.hide();
    	        });
    			break;
    		
    		case 'resize':
    			var resizedata = data;
    			var modal = new Example.Modal({
    	            id: 'resizeModal' 
    	        });
    			getDiskoffering('resizeNewofferingSelectBox')
    			resizePrefilter(data);
    			
    			$("#resizeNewofferingSelectBox").on('change', function() {
    				var selectedID=$("#resizeNewofferingSelectBox option:selected").val();
    				var diskOfferinglist;
    				
    				$.ajax({
    					url: contextPath + '/apilistDiskOfferings',
    					type:'POST',
    					dataType:'text',
    					data:{"test":""},
    					success:function(data){
    						var index;
    						var obj = JSON.parse(data).listdiskofferingsresponse.diskoffering;
    						var count = 0;
    						
    						while(count < obj.length){
    							if(obj[count].id == selectedID){
    								index = count;
    							}
    							count += 1;
    						}
    						resizeSelectedfilter(resizedata, obj[index])
    					},error:function(request, status, error){
    					}
    				})
    			});
    			
    			modal.show(); 
	            
    			 $("#resizeBtn").unbind("click").click(function() {
    				 resizeVolume(resizedata);
    				 
     	        });
    	        $("#resizeBtnClose").unbind("click").click(function() {
    	        	$('#resizeNewofferingSelectBox').find('option').remove();
    	            modal.hide(); 
    	        });
    			break;
    			
    		case 'downloadVolume':
    			var modal = new Example.Modal({
    	            id: 'downloadVolumeModal' 
    	        });
    			
    			modal.show(); 
	            
    	        $("#downloadVolumeBtn").unbind("click").click(function() {
    	        	downloadVolume(data);
    	        	modal.hide();
    	        });
    	        
    	        $("#downloadVolumeBtnClose").unbind("click").click(function() {
    	        	modal.hide();
    	        });
    			break;
    			
    		case 'migrateVolume':
    			var modal = new Example.Modal({
    	            id: 'migrateVolumeModal' 
    	        });
    			
    			 modal.show(); 
    			 findStoragePoolsForMigration(data);
    			 var migrateVolumeSelectListlabel = document.getElementById("migrateVolumeSelectListAlertRequired");
    			 migrateVolumeSelectListlabel.style.display='none';
    			 
    	        $("#migrateVolumeBtn").unbind("click").click(function() {
    	        	migrateVolume(data);
    	        	$('#migrateVolumeSelectList').find('option').remove();
    	           
    	        });
    	        
    	        $("#migrateVolumeBtnClose").unbind("click").click(function() {	
    	        	$('#migrateVolumeSelectList').find('option').remove();
    	            modal.hide(); 
    	        });
    			break;
    			
    		case 'migrateToAnotherStorage':
    			getStoragePoollist(data);
    			var modal = new Example.Modal({
    	            id: 'migrateVolumeAnotherModal'
    	        });
    			
    			modal.show(); 
    			  $("#migrateVolumeAnotherBtn").unbind("click").click(function() {
    				  migrateVolumeAnother(data);
    				  $('#migrateVolumeAnotherSelectList').find('option').remove();
      	              modal.hide(); 
      	        });
      	        
      	        $("#migrateVolumeAnotherBtnClose").unbind("click").click(function() {
      	        	$('#migrateVolumeAnotherSelectList').find('option').remove();
      	        	modal.hide();
      	        });
    			break;	
    			
    		case 'attachDisk':
    			getAttachDisk (data);
    			var modal = new Example.Modal({
    	            id: 'attachDiskModal' 
    	        });
    			
    			modal.show(); 
	            
    			 $("#attachDiskBtn").unbind("click").click(function() {
    				 createAttachDisk(data);
     	        	$('#attachDiskSelectBox').find('option').remove();
     	            modal.hide(); 
     	           setTimeout("refreshVolumeTable()",6000);
     	           refreshVolumeEventTable();
     	        });
     	        
     	        $("#attachDiskBtnClose").unbind("click").click(function() {
     	        	$('#attachDiskSelectBox').find('option').remove();
     	        	modal.hide();
     	        });
    			break;	
    			
    		case 'detachDisk':
    			var modal = new Example.Modal({
    	            id: 'detachDiskModal' 
    	        });
    			
    			modal.show();
    			 $("#detachDiskBtn").unbind("click").click(function() {
    				detachDisk(data);
     	            modal.hide();
     	            setTimeout("refreshVolumeTable()",2000);
     	            refreshVolumeEventTable();
     	          
     	        });
     	        
     	        $("#detachDiskBtnClose").unbind("click").click(function() {
     	        	modal.hide();
     	        });
    			break;	
    		
    		case 'createVolumeTemplate':
    			getOStypelist(btnID);
    			var modal = new Example.Modal({
    	            id: 'createVolumeTemplateModal'
    	        });
    			
    			modal.show(); 
    			 $("#createVolumeTemplateBtn").unbind("click").click(function() {
    				 createVolumeTemplate(data);
     	        });
     	        
     	        $("#createVolumeTemplateBtnClose").unbind("click").click(function() {
     	        	$('#createVolumeTemplateOstypeSelectbox').find('option').remove();
     	        	modal.hide();
     	        });
    			break;


    		case 'deleteVolume':
    			var modal = new Example.Modal({
    	            id: 'deleteVolumeModal' 
    	        });
    			
    			modal.show(); 
    			 $("#deleteVolumeBtn").unbind("click").click(function() {
    				deleteVolume(data);
     	            modal.hide(); 
     	            setTimeout("refreshVolumeTable()",2000);
     	        });
     	        
     	        $("#deleteVolumeBtnClose").unbind("click").click(function() {
     	        	modal.hide();
     	        });
    			break;
    		case 'createSnapshotTemplate':
    			
    			getOStypelist(btnID);
    			var modal = new Example.Modal({
    	            id: 'createSnapshotTemplateModal'
    	        });
    			modal.show(); 
    			
    			 $("#createSnapshotTemplateBtn").unbind("click").click(function() {
    				 createSnapshotTemplate(data);
     	        });
     	        
     	        $("#createSnapshotTemplateBtnClose").unbind("click").click(function() {
     	        	$('#createSnapshotsTemplateOstypeSelectbox').find('option').remove();
     	        	modal.hide();
     	        });
    			break;
    			
    		case 'createSnapshotVolume':
    			var modal = new Example.Modal({
    	            id: 'createSnapshotVolumeModal' 
    	        });
    			modal.show();
    			
    			 $("#createSnapshotVolumeBtn").unbind("click").click(function() {
    				 createSnapshotVolume(data);
     	        });
     	        
     	        $("#createSnapshotVolumeBtnClose").unbind("click").click(function() {
     	        	$('#createSnapshotsTemplateOstypeSelectbox').find('option').remove();
     	        	modal.hide();
     	        });
    			break;
    		
    		case 'revertSnapshot':
    			break;
    			
    		case 'deleteSnapshot':
    			var modal = new Example.Modal({
    	            id: 'deleteSnapshotModal'
    	        });
    			
    			modal.show();
    			 $("#deleteSnapshotBtn").unbind("click").click(function() {
    				deleteSnapshot(data);
     	            modal.hide(); 
     	            setTimeout("refreshSnapshotTable()",3000);
     	            refreshVolumeEventTable();
     	        });
     	        
     	        $("#deleteSnapshotBtnClose").unbind("click").click(function() {
     	        	modal.hide();
     	        });
    			break;	
    	
    		case 'takeSnapshotVM':
    			var modal = new Example.Modal({
    	            id: 'takeVMSnapshotModal' 
    	        });
    			getlistVolumes(data);
    			
    			var volumelabel = document.getElementById("TakeVMSnapshotVolumeSelectBoxAlertRequired");
    			volumelabel.style.display = 'none';
    			
    			modal.show(); 
    			 $("#takeVMSnapshotBtn").unbind("click").click(function() {
    				 takeVMSnapshot(data);
     	            
     	        });
     	        
     	        $("#takeVMSnapshotBtnClose").unbind("click").click(function() {
     	        	modal.hide();
    				$('#takeVMSnapshotVolumeSelectBox').find('option').remove();
     	        });
    			break;
    			
    		case 'deleteVMSnapshot':
    			var modal = new Example.Modal({
    	            id: 'deleteVMSnapshotModal'
    	        });
    			
    			modal.show(); 
    			 $("#deleteVMSnapshotBtn").unbind("click").click(function() {
    				 deleteVMSnapshot(data);
     	            modal.hide(); 
     	            setTimeout("refreshVMSnapshotTable()",2000);
     	        });
     	        
     	        $("#deleteVMSnapshotBtnClose").unbind("click").click(function() {
     	        	modal.hide();
     	        });
    			break;
    			
    		case 'revertToVMSnapshot':

    			var modal = new Example.Modal({
    	            id: 'revertToVMSnapshotModal'
    	        });
    			
    			modal.show(); 
    			  $("#revertToVMSnapshotBtn").unbind("click").click(function() {
    				  revertToVMSnapshot(data);
    				  modal.hide(); 
      	        });
      	        
      	        $("#revertToVMSnapshotBtnClose").unbind("click").click(function() {      	        	
      	        	modal.hide();
      	        });
    			break;
    		
    		
    		case 'uploadFromLocal':
    			btnID = 'uploadFromLocalavailabilityZoneSelectBox';
    			var modal = new Example.Modal({
    	            id: 'uploadFromLocalModal' 
    	        });
    			getZoneList(data, btnID)
    			modal.show(); 
    	        $("#uploadFromLocalBtn").unbind("click").click(function() {
    	        	uploadFromLocal()
    	            
    	        });
    	        $("#uploadFromLocalBtnClose").unbind("click").click(function() {
        			$('#availabilityZoneSelectBox').find('option').remove();
    	             modal.hide();
    	        });
    			break;
    			
    		case 'upload':
    			btnID = 'URLuploadAvailabilityZoneSelectBox';
    			getZoneList(data, btnID)
    			getDiskoffering('URLuploadDiskOfferingSelectBox')
    			var modal = new Example.Modal({
    	            id: 'uploadModal' 
    	        });
    			
    			modal.show(); 
    			 $("#uploadBtn").unbind("click").click(function() {
    				 uploadFromURL();
    	        });
    	        
    	       
    	        $("#uploadBtnClose").unbind("click").click(function() {
    	        	$('#URLuploadAvailabilityZoneSelectBox').find('option').remove();
    	        	$('#URLuploadDiskOfferingSelectBox').find('option').remove();
    	            modal.hide(); 
    	        });
    	        
    	       
    	        
    			break;
    			
    		case 'add':
    			var modal = new Example.Modal({
    	            id: 'addModal'
    	        });
    			getAdd();
    			modal.show(); 
    	        $("#addBtn").unbind("click").click(function() {
    	        	createVolume();
    	        	$('#addBtnAvailabilitySelectbox').find('option').remove();
    	        	$('#addBtnDiskofferingSelectbox').find('option').remove();
    	            modal.hide(); 
    	            refreshVolumeTable();
    	            refreshVolumeEventTable();
    	        });
    	        
    	        $("#addBtnClose").unbind("click").click(function() {
    	        	$('#addBtnAvailabilitySelectbox').find('option').remove();
    	        	$('#addBtnDiskofferingSelectbox').find('option').remove();
    	        	enableScrolling
    	        	modal.hide();
    	        });
    	    	
    			break;
    			
    		case 'metrics':
    			showTable(4);
    			break;
    		case 'volume':
    			showTable(1);
    		case 'addTag':
    			break;
    		case 'hourlyAddBtn':
    			createSnapshotPolicy(globalData, btnID)
    			break;
    		case 'dailyAddBtn':
    			createSnapshotPolicy(globalData, btnID)
    			break;
    		case 'weeklyAddBtn':
    			createSnapshotPolicy(globalData, btnID)
    			break;
    		case 'monthlyAddBtn':
    			createSnapshotPolicy(globalData, btnID)
    			break;	
    		default: 
    			break;
    		
    		
    	}
    };
    
    
/*
    함수명 : Example.Modal
    기능 : 버튼 클릭시 나타나는 창을 제어하기 위한 함수
    파라미터 : 
*/    

if(typeof(Example) == "undefined") var Example = {};
 
(function($){
    Example.Modal = function() {
    this.initialize.apply(this,arguments);
    }
 
Example.Modal.prototype = {
    initialize : function(hash) {
        var obj = this;
 
        // 멤버변수 정의
        this.hash = this.getHashData(hash);
        this.width = 0; // 콘텐츠 레이어 너비
        this.height = 0; // 콘텐츠 레이어 높이
        this.c_width = 0; // body 화면 너비
        this.c_height = 0; // body 화면 높이
        this.s_width = 0; // body 전체 너비
        this.s_height = 0; // body 전체 높이
 
        // 콘텐츠 레이어 사이즈 구하기(멤버변수에 저장)
        this.getLayerSize();
 
        // body 사이즈 구하기(멤버변수에 저장)
        this.getBodySize();
 
        // 추가 엘리먼트 생성
        this.addElement();
 
        // 마우스, 키 이벤트 정의
        this.addEvent();
    },
 
    // Hash 변수정의
    getHashData : function(hash) {
        if(typeof(hash.id) == "undefined") hash.id = "modal"; // 개체 아이디
        if(typeof(hash.is_slide) == "undefined") hash.is_slide = 0; // 슬라이딩 여부
 
        return hash;
    },
 
    // 추가 엘리먼트 생성 - JS에서 추가해 주어야 할 HTML 작성합니다.
    addElement : function() {
        // 배경 레이어 HTML 받아오기
        var html = this.addOverlay();
 
        // 배경레이어 HTML을 콘텐츠레이어 앞에 추가
        $("#"+this.hash.id).before(html);
    },
 
    // 마우스, 키 이벤트 정의
    addEvent : function() {
        var obj = this;
   
    },  
 
    /* 주요기능 */
 
    // 모달창 보여주기
    show : function() {
        // 가운데로 이동
        this.moveCenter();
 
        // 배경레이어 적용
        this.applyOverlay();
 
        // 콘텐츠 레이어 보여주기
        $("#"+this.hash.id).show(); 
 
        // 배경 레이어 보여주기
        $("#"+this.hash.id+"_overlay").show();
        
        disableScrolling();
      
    },
 
    // 모달창 감추기
    hide : function() {
        $("#"+this.hash.id).hide(); // 콘텐츠 레이어 감추기
        $("#"+this.hash.id+"_overlay").hide(); // 배경 레이어 감추기
        enableScrolling();
    },  
 
    /* 부가 기능 */
 
    // 콘텐츠 레이어의 너비와 높이를 구해서 멤버변수에 정의
    getLayerSize : function() {
        this.width = $("#"+this.hash.id).outerWidth();
        this.height = $("#"+this.hash.id).outerHeight();
    },
 
    // body 사이즈 구해서 멤버변수에 정의
    getBodySize : function() {
        this.c_width = document.documentElement.clientWidth;
        this.c_height = document.documentElement.clientHeight;
        this.s_width = document.documentElement.scrollWidth;
        this.s_height = document.documentElement.scrollHeight;
    },
 
    // 배경 레이어 HTML 생성
    addOverlay : function() {
        var html = "";
        html += "<div id='"+this.hash.id+"_overlay'style='display:none;width:100%;position:absolute;top:0px;left:0px;opacity:0.5;background-color:#000000;z-Index:999'></div>";
 
        return html;
    },
 
    // 콘텐츠 레이어를 가운데로 이동(top, left 조절해 줌)
    moveCenter : function() {
        // left 좌표 구하기
        var left = Math.floor((this.c_width-this.width)/2);
 
        // top 좌표 구하기
        var res_height; // 콘텐츠를 화면상의 가운데로 두었을 때의 높이
        if(this.c_height < this.height) { // 화면 높이 < 콘텐츠 레이어 높이
            res_height = 0;
        } else { // 화면 높기 >= 콘텐츠 레이어 높이
            res_height = Math.floor((this.c_height-this.height)/2); // 차이를 빼서 2로
																	// 나눔. 그리고
																	// 내림.
        }
        var top = res_height+$(document).scrollTop(); // 화면상의 높이에 스크롤높이를 더한
														// 절대좌표를 top에 저장
 
        // css의 top,left 조정
        $("#"+this.hash.id).css("top",top);
        $("#"+this.hash.id).css("left",left);
    },
 
    // 배경 레이어 적용
    applyOverlay : function() {
        // body 사이즈 구하기(멤버변수에 저장)
        this.getBodySize();
 
        // 배경 레이어에 width, height css 값 조정
        $("#"+this.hash.id+"_overlay").css("width",this.s_width);
        $("#"+this.hash.id+"_overlay").css("height",this.s_height);
    	}
	}
    
})(jQuery);




