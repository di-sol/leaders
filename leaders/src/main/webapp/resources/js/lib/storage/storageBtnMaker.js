
/*
함수명 : showTable
기능 : storage 페이지에 테이블위 좌상단쪽에 위치하는 select box와 연결되는 함수
	 select값을 변경시 select값과 일치하는 table을 나타나게 한다.
파라미터 : choice(1, 2, 3, 4)
		1 - volume table선택
		2 - snapshot table선택
		3 - Vm snapshot table선택
		4 - metrics table선택
*/ 
function showTable(choice) {

	var con1 = document.getElementById("selectVolumes");
	var con2 = document.getElementById("selectSnapshots");
	var con3 = document.getElementById("selectVMSnapshot");
	var con4 = document.getElementById("selectMetrics");

	if (choice == 1) {
		refreshVolumeTable()
		con1.style.display = '';
		con2.style.display = 'none';
		con3.style.display = 'none';
		con4.style.display = 'none';
	}

	if (choice == 2) {
		refreshSnapshotTable()
		con1.style.display = 'none';
		con2.style.display = '';
		con3.style.display = 'none';
		con4.style.display = 'none';
	}

	if (choice == 3) {
		refreshVMSnapshotTable()
		con1.style.display = 'none';
		con2.style.display = 'none';
		con3.style.display = '';
		con4.style.display = 'none';
	}

	if (choice == 4) {
		refreshMetricsTable()
		con1.style.display = 'none';
		con2.style.display = 'none';
		con3.style.display = 'none';
		con4.style.display = '';
	}

}

/*
리스너 : tableSelector
기능 : storage 페이지에 테이블위 좌상단쪽에 위치하는 select의 값 변화되면 해당 리스너가 감지후 showTable함수로 연결
파라미터 :
*/ 
$("#tableSelector").on('change', function() {
	switch ($("#tableSelector option:selected").val()) {
	case "selectVolumes":
		showTable(1);
		break;
	case "selectSnapshots":
		showTable(2);
		break;
	case "selectVMSnapshot":
		showTable(3);
		break;
	}
});


/*
리스너 : .btn.btn-secondary
기능 :  Volume페이지 우상단 (upload from local/upload/metrics/add) 버튼 클릭 감지 후 storageModalMaker함수로 연결
파라미터 :
*/ 
$('.btn.btn-secondary').click(function() {
	var btnID = $(this).attr("id");
	storageModalMaker(btnID);
	
	
});


/*
리스너 : resizeBtn
기능 :  resize 버튼 클릭시 나타나는 폼을 감지하는 함수 
파라미터 :
*/ 
$('.resizeBtn').click(function() {
	var btnID = $(this).attr("id");

});

/*
리스너 : nav-link
기능 :  recurring Snapshot tab감지 함수
파라미터 :
*/ 
$('.nav-link').click(function(){
	var tabID=$(this).attr("id");
		showtab(tabID);
});
// 버튼 이벤트 감지 함수 끝



/*
함수 : clickedStoragelist
기능 :  volume table에서 이름 클릭시 상세페이지로 redirect해서 연결해주는 함수
파라미터 : id (클릭된 volume ID, 상세페이지 구성시 해당 id로 JSON에서 추출함)
*/ 
// 상세페이지 이동을 위한 리다이렉트 함수
function clickedStoragelist(id) {
	var storageid = id;
	$.redirect(contextPath + '/admin/storageVolumesContents', {
		'storageid' : storageid
	});
}

/*
함수 : clickedSnapshotlist
기능 :  snapshot table에서 이름 클릭시 상세페이지로 redirect해서 연결해주는 함수
파라미터 : id (클릭된 volume ID, 상세페이지 구성시 해당 id로 JSON에서 추출함)
*/ 
function clickedSnapshotlist(id) {
	var snapshotid = id;
	$.redirect(contextPath + '/admin/storageSnapshotContents', {
		'snapshotid' : snapshotid
	});
}

/*
함수 : clickedSnapshotlist
기능 :  VM snapshot table에서 이름 클릭시 상세페이지로 redirect해서 연결해주는 함수
파라미터 : id (클릭된 volume ID, 상세페이지 구성시 해당 id로 JSON에서 추출함)
*/ 
function clickedVmsnapshotlist(id) {
	var vmsnapshotid = id;
	$.redirect(contextPath + '/admin/storageVmsnapshotContents', {
		'vmsnapshotid' : vmsnapshotid
	});
}

/*
함수 : storageBtnMaker
기능 :  상세페이지에서 사용하는 버튼을 동적으로 생성하는 함수
파라미터 : array_btnList (필터로 array저장된 볼륨의 이름)
		data (JSON Data)
*/ 
function storageBtnMaker (array_btnList, data) {
        var btnArray = array_btnList;
        //case문을 통해 array저장된 버튼 이름으로 버튼 생성
        buttonSwitchCase(btnArray, data);
        
};


/*
함수 : buttonSwitchCase
기능 :  array_btnList에 저장된 버튼을 하나씩 생성하는 함수
파라미터 : array_btnList (필터로 array저장된 볼륨의 이름)
		data (JSON Data)
*/ 
function buttonSwitchCase(array_btnList, data){
	var index = 0;
	var max = array_btnList.length;

	while(max > index){
		switch (array_btnList[index]){
		case 'migrateVolume':
			$(".display-btn").append(makeButton((array_btnList[index]), data, 'fa fa-arrows fa-sm', 'Migrate Volume'))
			break;
		case 'takeSnapshot':
			$(".display-btn").append(makeButton((array_btnList[index]), data, 'fa fa-camera fa-sm', 'Take Snapshot'))
			break;
		case 'recurringSnapshot':
 
			$(".display-btn").append(makeButton((array_btnList[index]), data, 'fa fa-calendar fa-sm', 'Set up Recurring Snapshot'))
			break;
		case 'resize':
 
			$(".display-btn").append(makeButton((array_btnList[index]), data, 'fa fa-crop fa-sm', 'Resize'))
			break;
		case 'downloadVolume':
 
			$(".display-btn").append(makeButton((array_btnList[index]), data, 'fa fa-download fa-sm', 'Downlaod Volume'))
			break;
		case 'migrateToAnotherStorage':
 
			$(".display-btn").append(makeButton((array_btnList[index]), data, 'fa fa-arrows fa-sm', 'Migrate To Another Storage'))
			break;
		case 'createVolumeTemplate':
			 
			$(".display-btn").append(makeButton((array_btnList[index]), data, 'fa fa-plus-circle fa-sm', 'CreateTemplate'))
			break;
		case 'createSnapshotVolume':
			 
			$(".display-btn").append(makeButton((array_btnList[index]), data,  'fa fa-plus-circle fa-sm', 'Create Volume'))
			break;
		
		case 'createSnapshotTemplate':
			$(".display-btn").append(makeButton((array_btnList[index]), data, 'fa fa-plus-circle fa-sm', 'Create Template'))
			break;
		case 'createVolume':
 
			$(".display-btn").append(makeButton((array_btnList[index]), data, 'fa fa-plus-circle fa-sm', 'Create Volume'))
			break;
		case 'attachDisk':
 
			$(".display-btn").append(makeButton((array_btnList[index]), data, 'fa fa-sign-in fa-sm', 'Attach Disk'))
			break;
		case 'detachDisk':
 
			$(".display-btn").append(makeButton((array_btnList[index]), data, 'fa fa-sign-out fa-sm', 'Detach Disk'))
			break;
		case 'revertSnapshot':
 
			$(".display-btn").append(makeButton((array_btnList[index]), data, 'fa fa-tasks fa-sm', 'Revert Snapshot'))
			break;
		case 'revertToVMSnapshot':
 
			$(".display-btn").append(makeButton((array_btnList[index]), data, 'fa fa-tasks fa-sm', 'Revert VM Snapshot'))
			break;
		case 'deleteVolume':
 
			$(".display-btn").append(makeButton((array_btnList[index]), data, 'fa fa-times fa-sm', 'Delete Snapshot'))
			break;
		case 'deleteSnapshot':
			 
			$(".display-btn").append(makeButton((array_btnList[index]), data, 'fa fa-times fa-sm', 'Delete Snapshot'))
			break;
		case 'deleteVMSnapshot':
			 
			$(".display-btn").append(makeButton((array_btnList[index]), data, 'fa fa-times fa-sm', 'Delete VM Snapshot'))
			break;
		case 'takeSnapshotVM':
			$(".display-btn").append(makeButton((array_btnList[index]), data, 'fa fa-camera fa-sm', 'Take VM Snapshot'))
		default:
		}
		index += 1;
	}
	
}

/*
함수 : makeButton
기능 :  버튼의 이름, 데이터, 아이콘, 설명을 받아 버튼을 만드는 함수
파라미터 : buttonName	- 버튼의 이름 - 버튼 클릭시 리스너가 감지하는 데이터
		data		- 해당 버튼과 연관된 볼륨의 JSON데이터
		iconName	- 버튼의 아이콘 부트스트랩 fa아이콘 사용
		buttonExplain	- 버튼의 설명 title

*/ 
var makeButton = function(buttonName, data, iconName, buttonExplain){
	
	var id=buttonName;
	

		
	var $button = $('<button/>',{
		type: 'button',
		class: 'btn btn-secondary',
		id: buttonName ,
		title: buttonExplain,
		click: function(e){
			storageModalMaker(id, data);
			if(buttonName=='deleteVolume' || buttonName=='deleteSnapshot' || buttonName=='deleteVMSnapshot'){
				setTimeout("history.back()", 5000);
			}
			}
	});
	
	var $icon = $('<i/>', {
		class: iconName + " f-s-17 m-r-5"
	}).css({
		'display': 'block',
		'vertical-align': 'middle',
		'width': '17px',
		'height': '17px',
		'float': 'left'
	});
	
	$button.append($icon);
	
	return $button;
	
}



