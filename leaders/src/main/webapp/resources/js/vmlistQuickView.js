// quick view start
function makeVMQuickView(data, offset, type) {  
	
	// console.log("type : " + type);
	var $modal = makeQuickView(data);
	 
	$("body").prepend($modal);
	$("#modal").modal({backdrop: false});
	$("#modal-dialog").offset({top: offset.top});
	if (type === "instance") {
		$("#modal-content").offset({left: offset.left + $(".vmQuickViewButton").outerWidth() - $(".modal-content").outerWidth()});	
	} else if (type === "metrics") {
		$("#modal-content").offset({left: offset.left + $(".vmQuickViewButtonMetrics").outerWidth() - $(".modal-content").outerWidth()});
	}
	disableScrolling(); // scroll 안되게 
	
	$("#modal-content").mouseleave(function() {
		enableScrolling(); // scroll 다시 가능하게
		$("#modal").remove();		
	
	});
}

var makeQuickviewTitle = function() {
	var $title = $('<div/>');
	
	// var $titlePre = $('<h4/>').text('Quickview: ' + name);
	var $titlePre = $('<h4/>').text('Quickview: Instance');

	$title.append($titlePre);
	
	return $title;
}

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
var makeQuickviewDetailVM = function(data) {  
	var $tbody = $('<tbody/>');
	// console.log(data);
	$tbody.append(makeQuickviewDetail('Display Name', data.displayname));  
	$tbody.append(makeQuickviewDetail('Name', data.name));
	$tbody.append(makeQuickviewDetail('State', data.state));     
	$tbody.append(makeQuickviewDetail('Template', data.templatename));
	
	// console.log(data);
	return $tbody;
}

var makeQuickviewBody = function(data) {
	var $modalTable = $('<table/>');  
	$modalTable.append(makeQuickviewDetailVM(data));
	return $modalTable;
}

var makeQuickviewButton = function(buttonName, iconName, buttonExplanation, data) {  
	var $button = $('<td/>', {
		class: buttonName,
		click: function(e) {
			
			var instanceData = data;
			
			if (buttonName === "recover") {
				//console.log("quickview_recover");
				recoverBtnClicked(instanceData);
				
			} else if (buttonName === "expunge") {
				//console.log("quickview_expunge");
				expungeBtnClicked(instanceData);
				
			} else if (buttonName === "startinstance") {
				//console.log("quickview_startinstance");
				startBtnClicked(instanceData);
				
			} else if (buttonName === "snapshot") {
				//console.log("quickview_snapshot");
				takeSnapshotBtnClicked(instanceData);
				
			} else if (buttonName === "destroy") {
				//console.log("quickview_destroy");
				destroyBtnClicked(instanceData);
				
			} else if (buttonName === "reinstall") {
				//console.log("quickview_reinstall");
				reinstoreBtnClicked(instanceData);
				
			} else if (buttonName === "attachiso") {
				//console.log("quickview_attachiso");
				attachISOBtnClicked(instanceData);
				// button hide 하고 detach iso로 변경해줄것, 추후 반영 f5 누르면 해결
				
			} else if (buttonName === "detachiso") {
				//console.log("quickview_detachiso");
				detachISOBtnClicked(instanceData);
				// button hide 하고 attach iso로 변경해줄것, 추후 반영 f5 누르면 해결
				
			} else if (buttonName === "migratestopped") {
				//console.log("quickview_migratestopped");
				migrateStopBtnClicked(instanceData);
				
			} else if (buttonName === "changeservice") {
				//console.log("quickview_changeservice");
				changeServiceOfferingBtnClicked(instanceData);
				
			} else if (buttonName === "assigninstance") {
				//console.log("quickview_assigninstance");
				assignInstanceBtnClicked(instanceData);
				
			} else if (buttonName === "stopinstance") {
				//console.log("quickview_stopinstance");
				stopBtnClicked(instanceData);
				
			} else if (buttonName === "reboot") {
				//console.log("quickview_reboot");
				rebootBtnClicked(instanceData);
				
			} else if (buttonName === "migrate") {
				//console.log("quickview_migrate");
				migrateRunBtnClicked(instanceData);
				
			} else if (buttonName === "viewsnapshot") {
				//console.log("quickview_viewsnapshot");
				viewSnapshotsClicked(instanceData);
				
			}
			
		},
		mouseover: function() {
			this.style.color='#6EB2FF';
			//console.log("mouseover");
		},
		mouseout: function() {
			this.style.color='#455a64';
			//console.log("mouseout");
		}

	}).css({
		'float': 'left',
		'width': '130px',	
		'height': '40px',
		'margin-right': '5px',
		'margin-left': '5px',
		'margin-top': '5px',
		'text-align': 'left',
		'cursor':'pointer'
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


/*
 * var makeQuickviewLink = function(linkText, url) { var view = $('<td/>');
 * 
 * var href = $('<a/>', { href: url }).css({ "float": 'left' }); var text = $('<span/>').text(linkText);
 * 
 * href.append(text); view.append(href); return view; }
 */
var makeQuickviewActionVM = function(data) {
	var $tbody = $('<tbody/>');
	
	var $detailButtonLine2 = $('<tr/>');
	instance_state = data.state;
	instance_iso_name = data.isoname;
	// state 별 button setting
	if (instance_state === "Destroyed") {
		$detailButtonLine2.append(makeQuickviewButton('recover', 'fa fa-recycle', 'Recover VM', data));
		$detailButtonLine2.append(makeQuickviewButton('expunge', 'fa fa-trash', 'Expunge', data));
		
		$detailButtonLine2.append(makeQuickviewButton('viewsnapshot', 'fa fa-eye', 'View Snapshot', data));
		
	} else if (instance_state === "Stopped") {
		$detailButtonLine2.append(makeQuickviewButton('startinstance', 'fa fa-play', 'Start Instance', data));
		$detailButtonLine2.append(makeQuickviewButton('snapshot', 'fa fa-camera', 'Take VM Snapshot', data));
		$detailButtonLine2.append(makeQuickviewButton('destroy', 'fa fa-times', 'Destroy', data));
		$detailButtonLine2.append(makeQuickviewButton('reinstall', 'fa fa-recycle', 'Reinstall', data));
		if (instance_iso_name != null) {
			$detailButtonLine2.append(makeQuickviewButton('detachiso', 'fa fa-chain-broken', 'Detach ISO', data));	
		} else {
			$detailButtonLine2.append(makeQuickviewButton('attachiso', 'fa fa-link', 'Attach ISO', data));
		}
		$detailButtonLine2.append(makeQuickviewButton('migratestopped', 'fa fa-arrows', 'Migrate to storage', data));
		$detailButtonLine2.append(makeQuickviewButton('changeservice', 'fa fa-exchange', 'Change Service Offering', data));
		$detailButtonLine2.append(makeQuickviewButton('assigninstance', 'fa fa-user-plus', 'Asign Instance To Another Account', data));
		
		$detailButtonLine2.append(makeQuickviewButton('viewsnapshot', 'fa fa-eye', 'View Snapshot', data));
		
	} else if (instance_state.includes("ing") && instance_state != "Running"){
		$detailButtonLine2.append(makeQuickviewButton('viewsnapshot', 'fa fa-eye', 'View Snapshot', data));
	} else {
		$detailButtonLine2.append(makeQuickviewButton('stopinstance', 'fa fa-ban', 'Stop Instance', data));
		$detailButtonLine2.append(makeQuickviewButton('reboot', 'fa fa-refresh', 'Reboot VM', data));
		$detailButtonLine2.append(makeQuickviewButton('snapshot', 'fa fa-camera', 'Take VM Snapshot', data));	
		$detailButtonLine2.append(makeQuickviewButton('destroy', 'fa fa-times', 'Destroy', data));
		$detailButtonLine2.append(makeQuickviewButton('reinstall', 'fa fa-recycle', 'Reinstall', data));
		if (instance_iso_name != null) {
			$detailButtonLine2.append(makeQuickviewButton('detachiso', 'fa fa-chain-broken', 'Detach ISO', data));	
		} else {
			$detailButtonLine2.append(makeQuickviewButton('attachiso', 'fa fa-link', 'Attach ISO', data));
		}
		$detailButtonLine2.append(makeQuickviewButton('migrate', 'fa fa-arrows', 'Migrate to storage', data));
		$detailButtonLine2.append(makeQuickviewButton('changeservice', 'fa fa-exchange', 'Change Service Offering', data));
		
		$detailButtonLine2.append(makeQuickviewButton('viewsnapshot', 'fa fa-eye', 'View Snapshot', data));
	}
	
	
	// var $link = $('<tr/>');
	$tbody.append($detailButtonLine2);
	
	return $tbody;
	
}

var makeQuickviewAction = function(data) {
	var $modalTable = $('<table/>');
	$modalTable.append(makeQuickviewActionVM(data));
	return $modalTable;
} 

var makeQuickView = function(data) {
	// modal
	var $quickView = $('<div/>', {
		class: 'modal',
		id: 'modal'
	});
	var $modalDialog = $('<div/>', {
		class: 'modal-dialog',
		id: 'modal-dialog'
	}).css({
		"position": 'absolute'
	});  
	var $modalContent = $('<div/>', {
		class: 'modal-content',
		id: 'modal-content'
	}).css({
		"position": 'absolute',
		'width': '450px'
	});
	// modal header
	var $modalHeader = $('<div/>', {
		class: 'modal-header',
		id: 'modal-header'
	});
	
	$modalHeader.append(makeQuickviewTitle());
	
	// modal body
	var $modalBody = $('<div/>', {
		class: 'modal-body',
		id: 'modal-body'  
	});
	
	$modalBody.append(makeQuickviewBody(data));    
	
	// modal footer
	var $modalFooter = $('<div/>', {
		class: 'modal-footer',  
		id: 'modal-footer'
	}).css({
		'float': 'left'
	});
	
	// buttons
	var $buttons = $('<div/>', {
		class: 'quickview-buttons w-100',
		id: 'modal-btn'
	});
	
	var $modalTable = $('<table/>', {
		id: 'modal-table'
		
	});
	

	$buttons.append(makeQuickviewAction(data));
	
	$modalFooter.append($buttons);  
	
	// end modal
	$modalContent.append($modalHeader);
	$modalContent.append($modalBody);
	$modalContent.append($modalFooter);
	
	$modalDialog.append($modalContent);
	$quickView.append($modalDialog);
	return $quickView;
}   
// quick view end


// 동명대에서 quick view 뜨면 scrolling이 안됨
// scrolling 못하게
function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}
// scrolling 다시 가능하게
function enableScrolling(){
    window.onscroll=function(){};
}
