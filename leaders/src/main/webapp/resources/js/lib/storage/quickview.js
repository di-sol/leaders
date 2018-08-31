/**
 * @brief
 * modal을 사용하여 QuickView화면을 만드는 main스크립트이다.
 * @author 김영기
 * @param category 	
 * @param data
 * @return 파라메터를 더한 값을 리턴한다
*/

//$("table tr td").click(alert("clicked"));


//호출 함수시작

var globalData;

function callQuickViewStorage(list, index, offset) {
	globalIndex=index;
	var data = list[index];
	globalData = data;
	var $modal = makeQuickView('Storage', data);

	$(".showmodal").prepend($modal);
	$('.modal.quickview').modal({
		backdrop : false
	});
	$(".modal-dialog").offset({
		top : offset.top
	});
	// offset오류 이상할경우 class 이름 중복 안되게 해주면 된다.
	$(".modal-content.quickview").offset(
			{
				left : offset.left + $(".storageQuickViewButton").outerWidth()
						- $(".modal-content.quickview").outerWidth()
			});
	disableScrolling();
	$('.modal-content').mouseleave(function() {
		// 에러 발생
		// $('.modal').remove(); --> Quickview와 Notification 두개다 modal로 class가
		// 설정되어 동시에 지워짐
		$('.modal.quickview').remove();
		// modal이 실행 되면 body 태그 부분의 class이름과 속성이 변하게 된다.
		// modal이 종료될 때 body 태그 부분의 class이름과 속성을 원상복구 시키기 위한 코드이다.
		$("html, body").attr('class', 'fix-header fix-sidebar')
		$('html, body').css("padding-right", "");
		enableScrolling();
	});
}

function callQuickViewStorageMetrics(list, index, offset) {
	var data = list[index];
	var $modal = makeQuickView('Metric', data);

	$(".showmodal").prepend($modal);
	$('.modal.quickview').modal({
		backdrop : false
	});
	$(".modal-dialog").offset({
		top : offset.top
	});
	// offset오류 이상할경우 class 이름 중복 안되게 해주면 된다.
	$(".modal-content.metricsquickview").offset(
			{
				left : offset.left
						+ $(".storageMetricsQuickViewButton").outerWidth()
						- $(".modal-content.metricsquickview").outerWidth()
			});
	disableScrolling();
	$('.modal-content').mouseleave(function() {
		$('.modal.quickview').remove();
		// modal이 실행 되면 body 태그 부분의 class이름과 속성이 변하게 된다.
		// modal이 종료될 때 body 태그 부분의 class이름과 속성을 원상복구 시키기 위한 코드이다.
		$("html, body").attr('class', 'fix-header fix-sidebar')
		$('html, body').css("padding-right", "");
		enableScrolling();
	});
}

function callQuickViewSnapshot(list, index, offset) {
	
	var data = list[index];
	var $modal = makeQuickView('Snapshot', data);

	$(".showmodal").prepend($modal);
	$('.modal.quickview').modal({
		backdrop : false
	});
	$(".modal-dialog").offset({
		top : offset.top
	});
	$(".modal-content.snapshotquickview").offset(
			{
				left : offset.left
						+ $(".storageSnapshotQuickViewButton").outerWidth()
						- $(".modal-content.snapshotquickview").outerWidth()
			});



	disableScrolling();

	$('.modal-content').mouseleave(function() {
		$('.modal.quickview').remove();
		// modal이 실행 되면 body 태그 부분의 class이름과 속성이 변하게 된다.
		// modal이 종료될 때 body 태그 부분의 class이름과 속성을 원상복구 시키기 위한 코드
		$("html, body").attr('class', 'fix-header fix-sidebar')
		$('html, body').css("padding-right", "");
		enableScrolling();
	});

}

function callQuickViewVMSnapshot(list, index, offset) {

	var data = list[index];
	var $modal = makeQuickView('Vmsnapshot', data);

	$(".showmodal").prepend($modal);
	$('.modal.quickview').modal({
		backdrop : false
	});
	$(".modal-dialog").offset({
		top : offset.top
	});
	$(".modal-content.vmsnapshotquickview").offset(
			{
				left : offset.left
						+ $(".storageVMSnapshotQuickViewButton").outerWidth()
						- $(".modal-content.vmsnapshotquickview").outerWidth()
			});

	

	disableScrolling();

	$('.modal-content').mouseleave(function() {
		$('.modal.quickview').remove();
		// modal이 실행 되면 body 태그 부분의 class이름과 속성이 변하게 된다.
		// modal이 종료될 때 body 태그 부분의 class이름과 속성을 원상복구 시키기 위한 코드
		$("html, body").attr('class', 'fix-header fix-sidebar')
		$('html, body').css("padding-right", "");
		enableScrolling();
	});

}

function disableScrolling() {
	var x = window.scrollX;
	var y = window.scrollY;
	window.onscroll = function() {
		window.scrollTo(x, y);
	};
}
// scrolling 다시 가능하게
function enableScrolling() {
	window.onscroll = function() {
	};
};

//호출함수 끝



var makeQuickView = function(category,data) {
	//quickview를 저장할 변수

	
	var btnList
	
	if(category==='Storage'){
		btnList = volumeActionfilter(data);
	}else if(category==='Snapshot'){
		btnList = snapshotActionfilter(data);
	}else if(category==='Vmsnapshot'){
		btnList = vmSnapshotActionfilter(data);
	}else if(category==='Metric'){
		btnList = volumeActionfilter(data);
	}

	
	var $quickView = $('<div/>', {
		class: 'modal quickview'
	});
	
	var $modalDialog = $('<div/>', {
		class: 'modal-dialog',
		id: 'modal-dialog'
	}).css({
		"position": 'absolute'
	});
	
	var $modalContent;
	
	if(category=="Storage"){
		$modalContent = $('<div/>', {
			class: 'modal-content quickview',
		}).css({
			"position": 'absolute',
			'width': '450px'
		});
	}else if(category=="Metric"){
		$modalContent = $('<div/>', {
			class: 'modal-content metricsquickview',
		}).css({
			"position": 'absolute',
			'width': '450px'
		});
	}else if(category=="Snapshot"){
		$modalContent = $('<div/>', {
			class: 'modal-content snapshotquickview',
		}).css({
			"position": 'absolute',
			'width': '450px'
		});
	}else if(category=="Vmsnapshot"){
		$modalContent = $('<div/>', {
			class: 'modal-content vmsnapshotquickview',
		}).css({
			"position": 'absolute',
			'width': '450px'
		});
	};
	//offset오류 이상할경우  class 이름 중복 안되게 해주면 된다.
	
	
	
	// modal header
	var $modalHeader = $('<div/>', {
		class: 'modal-header'
	});
	
	$modalHeader.append(makeQuickviewTitle(data.name));
	
	//modal body
	var $modalBody = $('<div/>', {
		class: 'modal-body'
	});
	
	$modalBody.append(makeQuickviewBody(category, data));
	
	//modal footer
	var $modalFooter = $('<div/>', {
		class: 'modal-footer'
	}).css({
		'float': 'left'
	});
	
	
	//buttons
	var $buttons = $('<div/>', {
		class: 'quickview-buttons w-100'
	});
	
	//category
	var $modalTable = $('<table/>');
	$buttons.append(makeQuickviewAction(category, btnList, data));
	
	$modalFooter.append($buttons);
	
	//end modal
	
	$modalContent.append($modalHeader);
	$modalContent.append($modalBody);
	$modalContent.append($modalFooter);
	
	$modalDialog.append($modalContent);
	$quickView.append($modalDialog);
	
	return $quickView;
}


//QuickView 중에 Title생성함수
 var makeQuickviewTitle = function(name) {
	var $title = $('<div/>');
	
	var $titlePre = $('<h4/>').text('Quickview: ' + name);
	
	$title.append($titlePre);
	
	return $title;
}


//body부분  table을 category에 따라 case로 선택해서 생성
var makeQuickviewBody = function(category,data) {
	var $modalTable = $('<table/>');

	
	switch(category) {
	
    case 'Storage':
    	$modalTable.append(makeQuickviewDetailStorage(data));
        break;
    case 'Snapshot':
    	$modalTable.append(makeQuickviewDetailSnapshot(data));
    	break;
    case 'Vmsnapshot':
    	$modalTable.append(makeQuickviewDetailVmsnapshot(data));
        break;
    case 'Metric':
    	$modalTable.append(makeQuickviewDetailVmmetrics(data));
        break;

    default:
	}
	return $modalTable;
}

//테이블 생성 - case로 선택 후 상세한 구현
var makeQuickviewDetailStorage = function(data) {
	var $tbody = $('<tbody/>');
	//for Pod
	//Pod name
	$tbody.append(makeQuickviewDetail('Name', data.name));
	//id
	$tbody.append(makeQuickviewDetail('ID', data.id));
	//netmask
	$tbody.append(makeQuickviewDetail('Zone', data.zonename));
	//Gateway
	$tbody.append(makeQuickviewDetail('State', data.state));
	return $tbody;
}

var makeQuickviewDetailSnapshot = function(data) {
	var $tbody = $('<tbody/>');
	//for Pod
	//Pod name
	$tbody.append(makeQuickviewDetail('Name', data.name));
	//id
	$tbody.append(makeQuickviewDetail('ID', data.id));
	//netmask
	$tbody.append(makeQuickviewDetail('Volume Name', data.volumename));
	//Gateway
	$tbody.append(makeQuickviewDetail('State', data.state));
	return $tbody;
	
}

//테이블 생성 - case로 선택 후 상세한 구현
var makeQuickviewDetailVmsnapshot = function(data) {
	var $tbody = $('<tbody/>');
	//for Pod
	//Pod name
	$tbody.append(makeQuickviewDetail('ID', data.id));
	//id
	$tbody.append(makeQuickviewDetail('Name', data.name));
	//netmask
	$tbody.append(makeQuickviewDetail('Dispaly Name', data.displayname));
	//Gateway
	$tbody.append(makeQuickviewDetail('Type', data.type));
	return $tbody;
}

var makeQuickviewDetailVmmetrics = function(data) {
	var $tbody = $('<tbody/>');
	//for Pod
	//Pod name
	$tbody.append(makeQuickviewDetail('Name', data.name));
	//id
	$tbody.append(makeQuickviewDetail('ID', data.id));
	//netmask
	$tbody.append(makeQuickviewDetail('Zone', data.zonename));
	//Gateway
	$tbody.append(makeQuickviewDetail('State', data.state));
	return $tbody;
	
}

//테이블 생성 
var makeQuickviewDetail = function(name, value) {
	var $detail = $('<tr/>');
	var $detailName = $('<td/>', {
		class:"quickview_detail-name"
	}).text(name);
	$detailName.css({
		'color': '#000000 !important',
		'padding-top': '0px !important',
		'padding-right': '29px !important',
		'padding-bottom': '0px !important',
		'padding-left': '5px !important',
		'font-size': '13px',
		'font-weight': 'bold',
		'width': '122px',
		'height': '40px'
	});
	$detail.append($detailName);
	var $detailValue = $('<td/>',{
		class: 'quickview_detail-value'
	}).text(value);
	$detailValue.css({
		'text-align': 'left'
	});
	$detail.append($detailValue);
	return $detail;
}



//버튼 생성 - case
var makeQuickviewAction = function(category, Array_data, data) {
	var $modalTable = $('<table/>');

	switch(category) {
    case 'Storage':
    	$modalTable.append(makeQuickviewActionStorage(Array_data, data));
        break;
    case 'Snapshot':
    	$modalTable.append(makeQuickviewActionStorage(Array_data, data));
        break;
    case 'Vmsnapshot':
    	$modalTable.append(makeQuickviewActionStorage(Array_data, data));
    	break;
    case 'Metric':
    	$modalTable.append(makeQuickviewActionStorage(Array_data, data));
    	break;
    default:
        //
	}
	return $modalTable;
}
// 버튼 생성 - case 선택 후 상세
var makeQuickviewActionStorage = function(buttonList, data) {
	var index = 0;
	var rowcount = 0;
	var max = buttonList.length;
	var $tbody = $('<tbody/>');
	
	var $detailButtonLine1 = $('<tr/>');
	var $detailButtonLine2 = $('<tr/>');
	var $detailButtonLine3 = $('<tr/>');
	
	
	
	
	while(max > index){
		if(rowcount < 3){
			switch(buttonList[index]){
			case 'migrateVolume':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-arrows fa-sm', 'Migrate Volume', data))
				break;
			case 'migrateToAnotherStorage':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-arrows fa-sm', 'Migrate To Another Storage', data))
				break;
			case 'takeSnapshotVM':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-camera fa-sm', 'Take VM Snapshot', data))
				break;
			case 'takeSnapshot':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-camera fa-sm', 'Take Snapshot', data))
				break;
			case 'recurringSnapshot':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-calendar fa-sm', 'Set up Recurring Snapshot', data))
				break;
			case 'attachDisk':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-sign-in fa-sm', 'Attach Disk', data))
				break;
			case 'detachDisk':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-sign-out fa-sm', 'Detach Disk', data))
				break;
			case 'downloadVolume':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-download fa-sm', 'Downlaod Volume', data))
				break;
			case 'resize':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-crop fa-sm', 'Resize', data))
				break;
			case 'createVolumeTemplate':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-plus-circle fa-sm', 'CreateTemplate', data))
				break;
			case 'createSnapshotTemplate':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-plus-circle fa-sm', 'CreateTemplate', data))
				break;
			case 'createSnapshotVolume':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-plus-circle fa-sm', 'Create Volume', data))
				break;
			case 'createVolume':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-plus-circle fa-sm', 'Create Volume', data))
				break;
			case 'revertSnapshot':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-tasks fa-sm', 'Revert Snapshot', data))
				break;
			case 'revertToVMSnapshot':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-tasks fa-sm', 'Revert VM Snapshot', data))
				break;
			case 'deleteVolume':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-times fa-sm', 'Delete', data))
				break;
			case 'deleteSnapshot':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-times fa-sm', 'Delete', data))
				break;
			case 'deleteVMSnapshot':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-times fa-sm', 'Delete', data))
				break;
			default:
					break;
			}
		}else if(rowcount < 6){
			switch(buttonList[index]){
			case 'migrateVolume':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-arrows fa-sm', 'Migrate Volume', data))
				break;
			case 'migrateToAnotherStorage':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-arrows fa-sm', 'Migrate To Another Storage', data))
				break;
			case 'takeSnapshot':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-camera fa-sm', 'Take Snapshot', data))
				break;
			case 'recurringSnapshot':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-calendar fa-sm', 'Set up Recurring Snapshot', data))
				break;
			case 'attachDisk':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-sign-in fa-sm', 'Attach Disk', data))
				break;
			case 'detachDisk':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-sign-out fa-sm', 'Detach Disk', data))
				break;
			case 'downloadVolume':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-download fa-sm', 'Downlaod Volume', data))
				break;
			case 'resize':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-crop fa-sm', 'Resize', data))
				break;
			case 'createVolumeTemplate':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-plus-circle fa-sm', 'CreateTemplate', data))
				break;
			case 'createSnapshotTemplate':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-plus-circle fa-sm', 'CreateTemplate', data))
				break;
			case 'createSnapshotVolume':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-plus-circle fa-sm', 'Create Volume', data))
				break;
			case 'createVolume':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-plus-circle fa-sm', 'Create Volume', data))
				break;
			case 'revertSnapshot':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-tasks fa-sm', 'Revert Snapshot', data))
				break;
			case 'revertToVMSnapshot':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-tasks fa-sm', 'Revert VM Snapshot', data))
				break;
			case 'deleteVolume':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-times fa-sm', 'Delete', data))
				break;
			case 'deleteSnapshot':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-times fa-sm', 'Delete', data))
				break;
			case 'deleteVMSnapshot':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-times fa-sm', 'Delete', data))
				break;
			default:
					break;
			}
		}else{
			switch(buttonList[index]){
			case 'migrateVolume':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-arrows fa-sm', 'Migrate Volume', data))
				break;
			case 'migrateToAnotherStorage':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-arrows fa-sm', 'Migrate To Another Storage', data))
				break;
			case 'takeSnapshot':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-camera fa-sm', 'Take Snapshot', data))
				break;
			case 'recurringSnapshot':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-calendar fa-sm', 'Set up Recurring Snapshot', data))
				break;
			case 'attachDisk':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-sign-in fa-sm', 'Attach Disk', data))
				break;
			case 'detachDisk':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-sign-out fa-sm', 'Detach Disk', data))
				break;
			case 'downloadVolume':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-download fa-sm', 'Downlaod Volume', data))
				break;
			case 'resize':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-crop fa-sm', 'Resize', data))
				break;
			case 'createVolumeTemplate':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-plus-circle fa-sm', 'CreateTemplate', data))
				break;
			case 'createSnapshotTemplate':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-plus-circle fa-sm', 'CreateTemplate', data))
				break;
			case 'createSnapshotVolume':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-plus-circle fa-sm', 'Create Volume', data))
				break;
			case 'createVolume':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-plus-circle fa-sm', 'Create Volume', data))
				break;
			case 'revertSnapshot':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-tasks fa-sm', 'Revert Snapshot', data))
				break;
			case 'revertToVMSnapshot':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-tasks fa-sm', 'Revert VM Snapshot', data))
				break;
			case 'deleteVolume':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-times fa-sm', 'Delete', data))
				break;
			case 'deleteSnapshot':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-times fa-sm', 'Delete', data))
				break;
			case 'deleteVMSnapshot':
				$detailButtonLine1.append(makeQuickviewButton(buttonList[index], 'fa fa-times fa-sm', 'Delete', data))
				break;
			default:
					break;
			}
		}
		index += 1;
		rowcount +=1;
	}
	
	
	var $link = $('<tr/>');
	//$link.append(makeQuickviewLink('View Snapshot', '#'));
	
	$tbody.append($detailButtonLine1);
	$tbody.append($detailButtonLine2);
	$tbody.append($link);
	
	return $tbody;
}

//Button생성함수
var makeQuickviewButton = function(buttonName, iconName, buttonExplanation, data) {
	var id=buttonName;
	var $button = $('<td/>', {
		class: buttonName,
		//해당 부분이  sotrageBtnMaker JS 모듈과 연결고리
		click: function(e){
			//클릭시 모달생성하는 함수 호출
			//storageBtnModal.js파일에 있는 storageModalMaker라는 함수
			storageModalMaker(id, data);
			$('.modal.quickview').remove();
		},
		mouseover: function() {
			this.style.color='#6EB2FF';
			//console.log("mouseover");
		},
		mouseout: function() {
			this.style.color='#455a64';
			//console.log("mouseout");
		}
		
		//영기 추가
		//button클릭시 모달과 연결을 위해서 data-id삽입
	}).css({
		'float': 'left',
		'width': '130px',
		'height': '40px',
		'margin-right': '5px',
		'margin-left': '5px',
		'text-align': 'left',
		'cursor': 'pointer'
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
	var $text = $('<span/>').text(buttonExplanation);

	
	$button.append($icon);
	$button.append($text);
	
	return $button;
}


//링크연결
var makeQuickviewLink = function(linkText, url) {
	
	
	var view = $('<td/>');
	
	var href = $('<a/>', {
		href: url
	}).css({
		"float": 'left'
	});
	var text = $('<span/>').text(linkText);

	href.append(text);
	view.append(href);
	return view;
}





