// quick view start
function makeSnapshotQuickView(data, offset) {  
	
	// console.log("type : " + type);
	var $modal = makeQuickView(data);
	 
	$("body").prepend($modal);
	$("#modal").modal({backdrop: false});
	$("#modal-dialog").offset({top: offset.top});
	$("#modal-content").offset({left: offset.left + $(".snapshotQuickViewButton").outerWidth() - $(".modal-content").outerWidth()});	

	disableScrolling(); // scroll 안되게 
	
	$("#modal-content").mouseleave(function() {
		enableScrolling(); // scroll 다시 가능하게
		$("#modal").remove();		
	
	});
}

var makeQuickviewTitle = function() {
	var $title = $('<div/>');
	
	// var $titlePre = $('<h4/>').text('Quickview: ' + name);
	var $titlePre = $('<h4/>').text('Quickview: Snapshot');

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
var makeQuickviewDetailSnapshot = function(data) {  
	var $tbody = $('<tbody/>');
	// console.log(data);
	$tbody.append(makeQuickviewDetail('ID', data.id));     
	$tbody.append(makeQuickviewDetail('Name', data.name));
	$tbody.append(makeQuickviewDetail('Display Name', data.displayname));  
	$tbody.append(makeQuickviewDetail('Type', data.type));
	
	// console.log(data);
	return $tbody;
}

var makeQuickviewBody = function(data) {
	var $modalTable = $('<table/>');  
	$modalTable.append(makeQuickviewDetailSnapshot(data));
	return $modalTable;
}

var makeQuickviewButton = function(buttonName, iconName, buttonExplanation, data) {  
	var $button = $('<td/>', {
		class: buttonName,
		click: function(e) {
			
			snapshotObj = data;
			
			if (buttonName === "delete") {
				deleteBtnClicked(snapshotObj);
				
			} else if (buttonName === "revert") {
				revertBtnClicked(snapshotObj);
				
			} else if (buttonName === "snapshot") {
				createSnapshotBtnClicked(snapshotObj);
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
var makeQuickviewActionSnapshot = function(data) {
	var $tbody = $('<tbody/>');
	
	var $detailButtonLine2 = $('<tr/>');
	
	$detailButtonLine2.append(makeQuickviewButton('delete', 'fa fa-times', 'Delete VM Snapshot', data));
	$detailButtonLine2.append(makeQuickviewButton('revert', 'fa fa-recycle', 'Revert to VM Snapshot', data));
	/*$detailButtonLine2.append(makeQuickviewButton('snapshot', 'fa fa-camera', 'Create Snapshot From VM Snapshot', data));*/

	// var $link = $('<tr/>');
	$tbody.append($detailButtonLine2);
	
	return $tbody;
	
}

var makeQuickviewAction = function(data) {
	var $modalTable = $('<table/>');
	$modalTable.append(makeQuickviewActionSnapshot(data));
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
