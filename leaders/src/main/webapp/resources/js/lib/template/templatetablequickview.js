function callQuickViewTemplate(index, offset) {  
		
	    var data = templateList[index];
        var $modal = makeQuickView('template', data, index);
         
       $("body").prepend($modal);
       $("#modal").modal({backdrop: false});
       $("#modal-dialog").offset({top: offset.top});
       $("#modal-content").offset({left: offset.left + $(".quickViewButton1").outerWidth() - $(".modal-content").outerWidth()});
 
       $("#modal-content").mouseleave(function() {        
          $("#modal").remove();      
       });
    }
    
function callQuickViewISO(index, offset) {  
	
    var data = isoList[index];
    var $modal = makeQuickView('iso', data, index);
     
   $("body").prepend($modal);
   $("#modal").modal({backdrop: false});
   $("#modal-dialog").offset({top: offset.top});
   $("#modal-content").offset({left: offset.left + $(".quickViewButton2").outerWidth() - $(".modal-content").outerWidth()});

   $("#modal-content").mouseleave(function() {        
      $("#modal").remove();      
   });
}

	
	var makeQuickviewTitle = function(name) {
		var $title = $('<div/>');
		
		var $titlePre = $('<h4/>').text('Quickview: ' + name);
		
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
	var makeQuickviewDetailTemplate = function(data) {  
		var $tbody = $('<tbody/>');


		$tbody.append(makeQuickviewDetail('Name', data.name));  
		// description
		$tbody.append(makeQuickviewDetail('Hypervisor', data.hypervisor));

		try {
			if ( data.details.hypervisortoolsversion == 'xenserver61')
			{
				var v = "Yes";
			}
			else
				var v = "No";
			
			$tbody.append(makeQuickviewDetail('Original XS Version is 6.1+', v));   
		} catch (e) {
			$tbody.append(makeQuickviewDetail('Original XS Version is 6.1+', ""));   
		}

		
			if ( data.size >= 1000000000)
			{
				var v = data.size / 1000000000 + " GB";
				$tbody.append(makeQuickviewDetail('Size', v));
			}
			else if ( data.size > 0 && data.size < 1000000000)
			{
				var v = data.size + " MB";
				$tbody.append(makeQuickviewDetail('Size', v));
			}
			else
				$tbody.append(makeQuickviewDetail('Size', ""));
	
			
		return $tbody;
	}
	
	var makeQuickviewDetailISO = function(data) {  
		var $tbody = $('<tbody/>');


		$tbody.append(makeQuickviewDetail('Name', data.name));  
		// description
		$tbody.append(makeQuickviewDetail('Id', data.id));

		$tbody.append(makeQuickviewDetail('Description', data.displaytext));     

		if ( data.directdownload == true)
			{
				var v = "Yes";
				$tbody.append(makeQuickviewDetail('Direct Download', v));
			}
		else
			{
				var v = "No";
				$tbody.append(makeQuickviewDetail('Direct Download', v));
			}
		
		
		return $tbody;
	}
	

	var makeQuickviewBody = function(category,data) {
		var $modalTable = $('<table/>');  

		switch(category) {
	    case 'template':  
	    	$modalTable.append(makeQuickviewDetailTemplate(data));
	        break;
	    case 'iso':
	    	$modalTable.append(makeQuickviewDetailISO(data));  
	    	break;
	    default:
		}
		return $modalTable;
	}
	
	var index;
	
	var getIndex = function()
	{
		return index;
	}
	
	var setIndex = function(index)
	{
		this.index = index;
	}
	


	var makeQuickviewButtonDownload = function(buttonName, iconName, buttonExplanation,index) {  
		var $button = $('<td/>', {
			class: buttonName,
			click: function(e) {  
				$("#downloadBtn").modal();    
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
		
		setIndex(index);
		
		return $button;
	}
	
	var makeQuickviewButtonInstance = function(buttonName, iconName, buttonExplanation,index) {  
		var $button = $('<td/>', {
			class: buttonName,
			click: function(e) {  
				viewInstance();
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
		
		setIndex(index);
		
		return $button;
	}
	
	
	

	var makeQuickviewActionTemplate = function(index) {
		var $tbody = $('<tbody/>');
		

		var $detailButtonLine2 = $('<tr/>');

		$detailButtonLine2.append(makeQuickviewButtonDownload('download', 'fa fa-download', 'Download Template', index));  
		$detailButtonLine2.append(makeQuickviewButtonInstance('View Instance', 'fa fa-eye', 'View Instance', index));
		

		$tbody.append($detailButtonLine2);
		
		return $tbody;
	}
	
	var makeQuickviewActionISO = function(index) {
		var $tbody = $('<tbody/>');
		

		var $detailButtonLine2 = $('<tr/>');

		$detailButtonLine2.append(makeQuickviewButtonDownload('download', 'fa fa-download', 'Download ISO', index));
		$detailButtonLine2.append(makeQuickviewButtonInstance('View Instance', 'fa fa-eye', 'View Instance', index));
		

		$tbody.append($detailButtonLine2);
		
		return $tbody;
	}
	  

	var makeQuickviewAction = function(category,index) {
		var $modalTable = $('<table/>');

		switch(category) {
	    case 'template':
	    	$modalTable.append(makeQuickviewActionTemplate(index));
	        break;
	    case 'iso':
	    	$modalTable.append(makeQuickviewActionISO(index));
	    	break;


	    default:
	        //
		}
		return $modalTable;
	} 
  
	var makeQuickView = function(category,data,index) {
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
		
		$modalHeader.append(makeQuickviewTitle(data.name));
		
		// modal body
		var $modalBody = $('<div/>', {
			class: 'modal-body',
			id: 'modal-body'  
		});
		
		$modalBody.append(makeQuickviewBody(category, data));    
		
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
		
		// category ????????
		var $modalTable = $('<table/>', {
			id: 'modal-table'
			
		});
		$buttons.append(makeQuickviewAction(category,index));
		
		$modalFooter.append($buttons);  
		
		// end modal
		$modalContent.append($modalHeader);
		$modalContent.append($modalBody);
		$modalContent.append($modalFooter);
		
		$modalDialog.append($modalContent);
		$quickView.append($modalDialog);
		return $quickView;
	}    
	
	function viewInstance()
	{
		
		// 1 = template
		if ( kind == 1)
		{
			id = templateList[index].id;
			location.href =  contextPath + "/admin/vms?templateid="+id;    
		}	
		// 2 = iso
		else if ( kind == 2)
		{
			id = isoList[index].id;
			location.href = contextPath + "/admin/vms?isoid"+id; 
		}
		
	}