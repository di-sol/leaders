
function callQuickViewComputing(index, offset) {  
		
	    var data = serviceofferingList[index];
        var $modal = makeQuickView('Computing', data, index);
         
       $("body").prepend($modal);
       $("#modal").modal({backdrop: false});
       $("#modal-dialog").offset({top: offset.top});
       $("#modal-content").offset({left: offset.left + $(".quickViewButton1").outerWidth() - $(".modal-content").outerWidth()});
 
       $("#modal-content").mouseleave(function() {        
          $("#modal").remove();      
       });
    }
	
	function callQuickViewSystem(index, offset) {
	        
	
	        var data = systemofferingList[index]; 
	        var $modal = makeQuickView('System', data, index);
	         
	       $("body").prepend($modal);
	       $("#modal").modal({backdrop: false});
	       $("#modal-dialog").offset({top: offset.top});
	       $("#modal-content").offset({left: offset.left + $(".quickViewButton2").outerWidth() - $(".modal-content").outerWidth()});
	 
	       $("#modal-content").mouseleave(function() {        
	          $("#modal").remove();
	       });
	    }
	
	function callQuickViewDisk(index, offset) {
        
		
        var data = diskofferingList[index]; 
        var $modal = makeQuickView('Disk', data, index);
         
        $("body").prepend($modal);
	       $("#modal").modal({backdrop: false});
	       $("#modal-dialog").offset({top: offset.top});
	       $("#modal-content").offset({left: offset.left + $(".quickViewButton3").outerWidth() - $(".modal-content").outerWidth()});
	 
	       $("#modal-content").mouseleave(function() {        
	          $("#modal").remove();
	       });
    }
	
	function callQuickViewNetwork(index, offset) {
        
		
        var data = networkofferingList[index]; 
        var $modal = makeQuickView('Network', data, index);
         
        $("body").prepend($modal);
	       $("#modal").modal({backdrop: false});
	       $("#modal-dialog").offset({top: offset.top});
	       $("#modal-content").offset({left: offset.left + $(".quickViewButton4").outerWidth() - $(".modal-content").outerWidth()});
	 
	       $("#modal-content").mouseleave(function() {        
	          $("#modal").remove();
	       });
    }
	
	function callQuickViewVPC(index, offset) {
        
		
        var data = vpcofferingList[index]; 
        var $modal = makeQuickView('VPC', data, index);    
           
        $("body").prepend($modal);
	       $("#modal").modal({backdrop: false});
	       $("#modal-dialog").offset({top: offset.top});
	       $("#modal-content").offset({left: offset.left + $(".quickViewButton5").outerWidth() - $(".modal-content").outerWidth()});
	 
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
	var makeQuickviewDetailComputing = function(data) {  
		var $tbody = $('<tbody/>');


		$tbody.append(makeQuickviewDetail('Name', data.name));  
		// description
		$tbody.append(makeQuickviewDetail('Id', data.id));

		$tbody.append(makeQuickviewDetail('Description', data.displaytext));     
	
		$tbody.append(makeQuickviewDetail('Storage Type', data.storagetype));
		return $tbody;
	}
	
	var makeQuickviewDetailSystem = function(data) {  
		var $tbody = $('<tbody/>');

		$tbody.append(makeQuickviewDetail('Name', data.name));  
  
		$tbody.append(makeQuickviewDetail('Id', data.id));

		$tbody.append(makeQuickviewDetail('Description', data.displaytext));         

		$tbody.append(makeQuickviewDetail('System VM Type', data.systemvmtype));
		return $tbody;
	}
	
	var makeQuickviewDetailDisk = function(data) {  
		var $tbody = $('<tbody/>');
		
		$tbody.append(makeQuickviewDetail('Name', data.name));  

		$tbody.append(makeQuickviewDetail('Id', data.id));

		$tbody.append(makeQuickviewDetail('Description', data.displaytext)); 
		
		$tbody.append(makeQuickviewDetail('Custom Disk Size', data.iscustomized));
		return $tbody;
	}
	
	var makeQuickviewDetailNetwork = function(data) {  
		var $tbody = $('<tbody/>');

		$tbody.append(makeQuickviewDetail('Name', data.name));  
		
		$tbody.append(makeQuickviewDetail('Id', data.id));
	
		$tbody.append(makeQuickviewDetail('Description', data.displaytext));     

		$tbody.append(makeQuickviewDetail('State', data.state));
		return $tbody;
	}    
	
	var makeQuickviewDetailVPC = function(data) {    
		var $tbody = $('<tbody/>');

		$tbody.append(makeQuickviewDetail('Name', data.name));  

		$tbody.append(makeQuickviewDetail('Id', data.id));

		$tbody.append(makeQuickviewDetail('Description', data.displaytext));     

		$tbody.append(makeQuickviewDetail('State', data.state));
		return $tbody;
	}

	var makeQuickviewBody = function(category,data) {
		var $modalTable = $('<table/>');  

		switch(category) {
	    case 'Computing':  
	    	$modalTable.append(makeQuickviewDetailComputing(data));
	        break;
	    case 'System':
	    	$modalTable.append(makeQuickviewDetailSystem(data));  
	    	break;
	    case 'Disk':
	    	$modalTable.append(makeQuickviewDetailDisk(data));
	        break;
	    case 'Network':
	    	$modalTable.append(makeQuickviewDetailNetwork(data));
	        break;
	    case 'VPC':
	    	$modalTable.append(makeQuickviewDetailVPC(data));
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
	
	var makeQuickviewButtonEnable = function(buttonName, iconName, buttonExplanation,index) {  
		var $button = $('<td/>', {
			class: buttonName,
			click: function(e) {  
				$("#enableBtn").modal();    
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
	
	var makeQuickviewButtonDisable = function(buttonName, iconName, buttonExplanation,index) {  
		var $button = $('<td/>', {
			class: buttonName,
			click: function(e) {  
				$("#disableBtn").modal();    
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

	var makeQuickviewButtonRemove = function(buttonName, iconName, buttonExplanation,index) {  
		var $button = $('<td/>', {
			class: buttonName,
			click: function(e) {  
				$("#deleteBtn").modal();    
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
	
	
	
	/*
	 * var makeQuickviewLink = function(linkText, url) { var view = $('<td/>');
	 * 
	 * var href = $('<a/>', { href: url }).css({ "float": 'left' }); var text =
	 * $('<span/>').text(linkText);
	 * 
	 * href.append(text); view.append(href); return view; }
	 */
	var makeQuickviewActionComputing = function(index) {
		var $tbody = $('<tbody/>');
		
		/*
		 * var $detailButtonLine1 = $('<tr/>');
		 * 
		 * $detailButtonLine1.append(makeQuickviewButtonRemove('disableCluster', 'fa
		 * fa-plus', 'Disable Cluster'));
		 * $detailButtonLine1.append(makeQuickviewButtonRemove('dedicateCluster', 'fa
		 * fa-plus', 'Dedicate Cluster'));
		 * $detailButtonLine1.append(makeQuickviewButtonRemove('unmanageCluster', 'fa
		 * fa-plus', 'Unmanage Cluster'));
		 */

		var $detailButtonLine2 = $('<tr/>');
		// $detailButtonLine2.append(makeQuickviewButtonRemove('deleteCluster', 'fa
		// fa-plus', 'Delete Cluster'));
		// $detailButtonLine2.append(makeQuickviewButtonRemove('disableOOBMangement',
		// 'fa fa-plus', 'Disalbe Out-of-band Management'));
		$detailButtonLine2.append(makeQuickviewButtonRemove('remove', 'fa fa-times', 'Remove compute offering', index));  
		
		// var $link = $('<tr/>');
		
		// $link.append(makeQuickviewLink('View Hosts', '#'));
		
		// $tbody.append($detailButtonLine1);
		$tbody.append($detailButtonLine2);
		// $tbody.append($link);
		
		return $tbody;
	}
	
	var makeQuickviewActionSystem = function(index) {
		var $tbody = $('<tbody/>');
		

		var $detailButtonLine2 = $('<tr/>');

		$detailButtonLine2.append(makeQuickviewButtonRemove('remove', 'fa fa-times', 'Remove system offering', index));  

		$tbody.append($detailButtonLine2);
		
		return $tbody;
	}
	
	var makeQuickviewActionDisk = function(index) {
		var $tbody = $('<tbody/>');
		
		var $detailButtonLine2 = $('<tr/>');

		$detailButtonLine2.append(makeQuickviewButtonRemove('remove', 'fa fa-times', 'Remove disk offering', index));  

		$tbody.append($detailButtonLine2);
		
		return $tbody;
	}
	
	var makeQuickviewActionNetwork = function(index) {
		var $tbody = $('<tbody/>');
		

		var $detailButtonLine2 = $('<tr/>');
		
		if ( networkofferingList[index].state == "Disabled")
			$detailButtonLine2.append(makeQuickviewButtonEnable('enable', 'fa fa-plug', 'Enable network offering', index));
		else
			$detailButtonLine2.append(makeQuickviewButtonDisable('disable', 'fa fa-ban', 'Disable network offering', index));
		$detailButtonLine2.append(makeQuickviewButtonRemove('remove', 'fa fa-times', 'Remove network offering', index));

		
		// var $link = $('<tr/>');
		$tbody.append($detailButtonLine2);
		
		return $tbody;
	}
	
	var makeQuickviewActionVPC = function(index) {
		var $tbody = $('<tbody/>');
		

		var $detailButtonLine2 = $('<tr/>');
		
		if ( vpcofferingList[index].state == "Disabled")
			$detailButtonLine2.append(makeQuickviewButtonEnable('enable', 'fa fa-plug', 'Enable vpc offering', index));
		else
			$detailButtonLine2.append(makeQuickviewButtonDisable('disable', 'fa fa-ban', 'Disable vpc offering', index));
		$detailButtonLine2.append(makeQuickviewButtonRemove('remove', 'fa fa-times', 'Remove vpc offering', index));  
		

		$tbody.append($detailButtonLine2);
		
		return $tbody;
	}
	  

	var makeQuickviewAction = function(category,index) {
		var $modalTable = $('<table/>');

		switch(category) {
	    case 'Computing':
	    	$modalTable.append(makeQuickviewActionComputing(index));
	        break;
	    case 'System':
	    	$modalTable.append(makeQuickviewActionSystem(index));
	    	break;
	    case 'Disk':
	    	$modalTable.append(makeQuickviewActionDisk(index));
	        break;
	    case 'Network':
	    	$modalTable.append(makeQuickviewActionNetwork(index));
	        break;
	    case 'VPC':
	    	$modalTable.append(makeQuickviewActionVPC(index));
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
	
	