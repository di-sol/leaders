/**
 * 
 * Api 작업할때 Loading Image 불러오는것 아래 소스는 jsp 페이지에 추가 되어야 함.
 * 
 */
var stateCheckArray = []; // array 형태로 할것 여러개 넘어왔을때 정지 안되고 계속 도는 오류 있음

function loadingImageMethod (jobid, work) {
	
	// 실수거나 우연히 jobid 없는게 들어오면
	if (jobid === undefined) {
		// 준승씨가 만든걸로 error 체크 하고 실수로 들어온것이기 때문에 success 로 해줄 것
		setNotification(work, "success");
		return;
	}
	
	setSessionJobid(jobid, work, "Add");
	
	// f5, f6 막으면서 다른 작업 막기
	releaseF5F6(false);

	// loadingImg
	loadingImg = setContextPath + '/resources/img/loading/loading5.gif';

    swal({
        title: "Loading...",
        allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
        allowEscapeKey: false,
        confirmButtonClass: "swalConfirmBtnClass",
        imageUrl: loadingImg,
        imageWidth: 150,
        showConfirmButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "다른작업하기"
	}).then(function(result) {
		// 다른작업하기 누르면		
		// clearInterval(stateCheck); // 인터벌 중지, 인터벌 중지해도 계속 확인하고 noti 해줘야 된다., 페이지 리로딩, 페이지 변환은 어쩔수 없다. ㅜㅜ 
		releaseF5F6(true);
		
		return false; // 창닫기
	});
    
    setIntervalStateCheck(jobid, work);
    
}

function setIntervalStateCheck (jobid, work) {
	
	var index; 
	for (var i=0;;i++){
		if (stateCheckArray[i] == null) { // null 이면 i 는 stateCheckArray 의 새로운 index
			index = i;
			// console.log("check : " + index);
			break;
		}
	}
	
	// console.log("index check : " + index);
	
	stateCheckArray[index] = setInterval(function(){
		
		console.log("stateCheckArray[index] : " + stateCheckArray[index]);
		
		$.ajax({
			url: setContextPath + '/apiQueryAsyncJobResult',
			type:'POST',
			dataType:'text',
			async: false,
			data:{"test":"queryAsyncJobResult&jobid="+jobid},
			success:function(data){
				// console.log("queryAsyncJobResult");
				// console.log(data);
				
				var jobresult = JSON.parse(data).queryasyncjobresultresponse.jobresult;
				// console.log(jobresult);
				
				if (jobresult != null) { // result 값이 있으면 완료
					clearInterval(stateCheckArray[index]);
					
					releaseF5F6(true);
					var notiMessage = "";
					var success = "";
					// swalConfirmBtnClass 이게 보이면 다른작업중이 아니고 대기 상태니깐 swal 창이 뜨는게 맞다., 안보이면 swal 창은 따로 안떠야 됨
					if (jobresult.errorcode != null) {
						if ($(".swalConfirmBtnClass").is(":visible")) {
							swal("error",jobresult.errortext,"error");
						}
						notiMessage = jobresult.errortext;
						success = "error";
					} else { 
						
						// add instance 이면 이름이 없기 때문에 jobresult에서 찾아보고 work 에 추가 해줄것
						if (work === 'Add Instance') {
							// console.log(jobresult);
							// console.log(jobresult.virtualmachine.name);
							work += " : " + jobresult.virtualmachine.name;
							
							console.log("insert instance to db.");
							
							// db 에 추가
							addInstanceInsertDB(jobresult.virtualmachine);
							
							// powershell instance 추가 
							addInstancePowerShell(jobresult.virtualmachine.name, jobresult.virtualmachine.nic[0].ipaddress);
							
						} else if (work.split(':')[0].trim() === 'Expunge VM') {
							console.log(work.split(':')[0].trim());
							// console.log(jobresult);
							// jobresult 가 없는 관계로 name 분할해서 지워줄것

							deletename = work.split(':')[1].trim();
							console.log(work.split(':')[1].trim()); // 이름

							console.log("delete instance from db.");
							
							// db 에서 삭제
							deleteInstanceFromDB(deletename);

							// powershell instance 삭제
							removeInstancePowerShell(deletename);
						}
						
						if ($(".swalConfirmBtnClass").is(":visible")) {
							swal("Success",work,"success");
						}							
						notiMessage = work;
						success = "success";
					}
					
					// notification 추가 하기
					setNotification(notiMessage, success);

					// jobid 완료 된것 session 지워줄것
					setSessionJobid(jobid, work, "Del"); 
					// console.log(index);

				}
				
			},error:function(request, status, error){
   				console.log(request+","+status+","+error);  
   			}
   		});
	},3000);
	
}

function setSessionJobid (jobid, work, state) {
	// session 에 저장
	$.ajax({
		url: setContextPath + '/setSessionJobid',
		type:'POST',
		dataType:'text',
		async: false,
		data:{"jobid":jobid,
			"work":work,
			"state":state},
		success:function(data){
			console.log("setSessionJobid");
			
		},error:function(request, status, error){
			console.log(request+","+status+","+error);
		}
	});
}

function releaseF5F6(input) { // f5, f6 막고 푸는것
	
	document.onkeydown = function (e) {
		// console.log("key : " + e.keyCode);
		if (((e.which || e.keyCode) == 116) || ((e.which || e.keyCode) == 117)) { // f5, f6  막기, f6이 주소입력 칸으로 바로 이동해주는 단축키임
			return input;
		}			
    };		
    
}

function setNotification(work, success) {
	// count +
	var count = $("#notificationCountId").text();
	count = parseInt(count) + 1;
	$("#notificationCountId").text(count);
	
	// count 와 작업내용 session 저장하려고 넘김
	setNotificationInSession(count, work, success);
	
	// notificationCountId 에 배경색 변경, sidemenu.jsp 에 function 있음
	chagneNotificationCountColor();
	
	// 창열고 있으면 바로 반영되게 하기 위해서 
	getNotificationFromSession();
	
	newAlarmModal(work, success);
}

function setNotificationInSession(count, work, success){
	$.ajax({
		url: setContextPath + '/setSessionForNotification',
		type:'POST',
		dataType:'text',
		async: false,
		data:{"count":count,
			"work":work,
			"success": success},
		success:function(data){
			console.log("setSessionForNotification");
		},error:function(request, status, error){
				console.log(request+","+status+","+error);
			}
		});	
}


function getNotificationFromSession() {
	
	// 내용 지우기
	$("#notificationContentDivId").empty();
	
	$.ajax({
		url: setContextPath + '/getSessionForNotification',
		type:'POST',
		dataType:'json',
		async: false,
		data:{"":""},
		success:function(data){
			console.log("getSessionForNotification");
			// console.log(data);
			var htmlText = '';
			if (data != null) {
				htmlText = '<table>';
				for (var i=data.length-2; i>=0; i--) {//data.length-2 까지가 알림내용, data.length-1(마지막은)는 count,제일 최근꺼 부터 위에 보여야 되니깐 역순으로
		    		// add to list
					var iconClass = "";
					if (data[i].success === "success") {
						iconClass = "fa fa-check"; 
					} else {
						iconClass = "fa fa-ban fa-stack-lg text-danger";
					}
					
		    		htmlText += '<tr style="border-style:solid; border-width:0 0 1 0;">' + 
		    		'<td><i class="' + iconClass + '">&nbsp;</i></td>' +   
		    		'<td style="color:#455a64;font-size:15;overflow:hidden; text-overflow:ellipsis; white-space:nowrap;padding: 10 10 10 0;width:210px;max-width:210px;" title="' + data[i].work + '">' + 
		    		data[i].work + '</td>' +
		    		'<td><i class="fa fa-times-circle fa-lg" style="float: right; cursor:pointer;" onclick="deleteNotificationIconClicked(\'' + data[i].id + '\');"></i></td></tr>'; 
				}
				htmlText += '</table>';

				$("#notificationContentDivId").append(htmlText);

				count = data[data.length-1];
				$("#notificationCountId").text(count);
			
			} else {
				htmlText = '<span class="noneAlarm" style="color:#455a64;font-size:20;">알림이 없습니다.</span>';
				$("#notificationContentDivId").append(htmlText);
				$("#notificationCountId").text("0");
			}

		},error:function(request, status, error){
				console.log(request+","+status+","+error);
			}
		});	
	
	chagneNotificationCountColor();
	
}

// notification 삭제
function deleteNotificationIconClicked(id) {
	// id 가 없으면 전체 삭제
	// id 가 있으면 개별 삭제
	// console.log(id);
	$.ajax({
		url: setContextPath + '/deleteNotificationMethod',
		type:'POST',
		dataType:'text',
		async: false,
		data:{"id":id},
		success:function(data){
			console.log("deleteNotificationMethod");
		},error:function(request, status, error){
			console.log(request+","+status+","+error);
		}
	});
	
	// 삭제 했을때 list 즉각적인 반응 위해서 
	getNotificationFromSession();
	
	// 알림이 없으면 창닫기
	checkCloseNotificationModal();
}

function chagneNotificationCountColor() {
	// 알람이 있으면 색깔 변경
	if 	($("#notificationCountId").text() == "0") {
		$("#notificationCountId").css({
			"backgroundColor":"white"
		})
	} else {
		$("#notificationCountId").css({
			"backgroundColor":"moccasin"
		})
	}
}


// db 관련 부분 (추후 js 로 분리 할것)
function addInstanceInsertDB(data) { // 성공하면 db 에 삽입, 
	
	var instanceid = data.id;
	var instancename = data.name;
	
	$.ajax({
		url: setContextPath + '/insertInstance',
		type:'POST',
		dataType:'text',
		async: false,
		data:{	"instanceid":instanceid,
				"instancename":instancename },
		success:function(data){
			console.log("insertInstance");
		},error:function(request, status, error){
			console.log(request+","+status+","+error);
		}
	});	
	
}

function deleteInstanceFromDB(deletename) {

	$.ajax({
		url: setContextPath + '/deleteInstance',
		type:'POST',
		dataType:'text',
		async: false,
		data:{	"instancename":deletename },
		success:function(data){
			console.log("deleteInstance");
		},error:function(request, status, error){
			console.log(request+","+status+","+error);
		}
	});	
	
}

