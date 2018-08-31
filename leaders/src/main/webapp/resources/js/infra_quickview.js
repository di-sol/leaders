// infrastructure Quickview
// 민재 quickView

var makeQuickviewTitle = function(name) {
	var $title = $('<div/>');
	
	var $titlePre = $('<h4/>').text('Quickview: ' + name);
	
	$title.append($titlePre);
	
	return $title;
}

var makeQuickviewDetail = function(name, value, trClass) {
	var $detail = $('<tr/>', {
		class: trClass
	});
	var $detailName = $('<td/>', {
		class:"quickview-detail-name"
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
		class: 'quickview-detail-value'
	}).text(value);
	$detailValue.css({
		'text-align': 'left'
	});
	$detail.append($detailValue);
	return $detail;
}
//detail return tbody
var makeQuickviewDetailZone = function(data) {
	var $tbody = $('<tbody/>');
	//for zone
	//zone name
	$tbody.append(makeQuickviewDetail('Zone', data.name));
	//id
	$tbody.append(makeQuickviewDetail('ID', data.id));
	//allocation state
	$tbody.append(makeQuickviewDetail('Allocation State', data.allocationstate));
	//dns
	$tbody.append(makeQuickviewDetail('DNS 1', data.dns1));
	return $tbody;
}
var makeQuickviewDetailPod = function(data) {
	var $tbody = $('<tbody/>');
	//for Pod
	//Pod name
	$tbody.append(makeQuickviewDetail('Name', data.name));
	//id
	$tbody.append(makeQuickviewDetail('ID', data.id));
	//netmask
	$tbody.append(makeQuickviewDetail('Netmask', data.netmask));
	//Gateway
	$tbody.append(makeQuickviewDetail('Gateway', data.gateway));
	return $tbody;
}
var makeQuickviewDetailCluster = function(data) {
	var $tbody = $('<tbody/>');
	//for Pod
	//Pod name
	$tbody.append(makeQuickviewDetail('Name', data.name));
	//id
	$tbody.append(makeQuickviewDetail('ID', data.id));
	//netmask
	$tbody.append(makeQuickviewDetail('Zone', data.zonename));
	//Gateway
	$tbody.append(makeQuickviewDetail('Pod', data.podname));
	return $tbody;
}
var makeQUickviewDetailHost = function(data) {
	var $tbody = $('<tbody/>');
	//for Pod
	//Pod name
	$tbody.append(makeQuickviewDetail('Name', data.name));
	//id
	$tbody.append(makeQuickviewDetail('ID', data.id));
	//netmask
	$tbody.append(makeQuickviewDetail('Resource State', data.resourcestate));
	//Gateway
	$tbody.append(makeQuickviewDetail('State', data.state));
	
	return $tbody;
}
var makeQuickviewDetailPrimaryStorage = function(data) {
	var $tbody = $('<tbody/>');
	//for Pod
	//Pod name
	$tbody.append(makeQuickviewDetail('Name', data.name));
	//id
	$tbody.append(makeQuickviewDetail('ID', data.id));
	//netmask
	$tbody.append(makeQuickviewDetail('State', data.state));
	//Gateway
	$tbody.append(makeQuickviewDetail('Storage Tags', data.tags));
	return $tbody;
}
var makeQuickviewDetailSecondaryStorage = function(data) {
	var $tbody = $('<tbody/>');
	//for Pod
	//Pod name
	$tbody.append(makeQuickviewDetail('Name', data.name, "name"));
	//id
	$tbody.append(makeQuickviewDetail('URL', data.url, "url"));
	//netmask
	$tbody.append(makeQuickviewDetail('Protocol', data.protocol, "protocol"));
	//Gateway
	$tbody.append(makeQuickviewDetail('Provider', data.providername, "provider"));
	
	//부속 modal setting
	$('.modal#quickviewdelete').find('.modal-body').find('.id').text(data.id);
	return $tbody;
}
var makeQuickviewDetailSystemVM = function(data) {
	var $tbody = $('<tbody/>');
	//for Pod
	//Pod name
	$tbody.append(makeQuickviewDetail('Name', data.name));
	//id
	$tbody.append(makeQuickviewDetail('ID', data.id));
	//netmask
	$tbody.append(makeQuickviewDetail('State', data.state));
	//Gateway
	$tbody.append(makeQuickviewDetail('Type', data.systemvmtype));
	return $tbody;
}
var makeQuickviewDetailVirtualRouter = function(data) {
	var $tbody = $('<tbody/>');
	//for Pod
	//Pod name
	$tbody.append(makeQuickviewDetail('Name', data.name));
	//id
	$tbody.append(makeQuickviewDetail('ID', data.id));
	//netmask
	$tbody.append(makeQuickviewDetail('State', data.state));
	//Gateway
	$tbody.append(makeQuickviewDetail('Version', data.version));
	return $tbody;
}

var makeQuickviewBody = function(category,data) {
	var $modalTable = $('<table/>');

	switch(category) {
    case 'Zone':
    	$modalTable.append(makeQuickviewDetailZone(data));
        break;
    case 'Pod':
    	$modalTable.append(makeQuickviewDetailPod(data));
        break;
    case 'Cluster':
    	$modalTable.append(makeQuickviewDetailCluster(data));
        break;
    case 'Host':
    	$modalTable.append(makeQUickviewDetailHost(data));
    	break;
    case 'Primary Storage':
    	$modalTable.append(makeQuickviewDetailPrimaryStorage(data));
        break;
    case 'Secondary Storage':
    	$modalTable.append(makeQuickviewDetailSecondaryStorage(data));
        break;
    case 'SystemVM':
    	$modalTable.append(makeQuickviewDetailSystemVM(data));
        break;
    case 'VirtualRouter':
    	$modalTable.append(makeQuickviewDetailVirtualRouter(data));
        break;
    default:
	}
	return $modalTable;
}

var makeQuickviewButton = function(buttonName, iconName, buttonExplanation, action) {
	var $button = $('<td/>', {
		class: buttonName, 
		click: function(e) {
			action();
		},
		mouseover: function() {
           this.style.color='#6EB2FF';
        },
        mouseout: function() {
           this.style.color='#455a64';
        }
	}).css({
		'float': 'left',
		'width': '130px',
		'height': '40px',
		'margin-right': '5px',
		'margin-left': '5px',
		'text-align': 'left'
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
var makeQuickviewLink = function(linkText, url) {
	var view = $('<td/>').css({
		'float': 'left',
		'width': '130px',
		'margin-right': '5px',
		'margin-left': '5px',
		'text-align': 'left'
	});
	
	var href = $('<a/>', {
		href: url
	});
	var text = $('<span/>').text(linkText);

	href.append(text);
	view.append(href);
	return view;
}
//Action return tbody
var makeQuickviewActionZone = function(data) {
	var $tbody = $('<tbody/>');
	
	var $detailButtonLine1 = $('<tr/>');
	var $detailButtonLine2 = $('<tr/>');

	quickviewId = data.id;		
	var Dedicated = false;
	var OutOfBandMangenetEnabled = true;
	var resourceHAEnabled = true;
	
	var dedicateZone = function() {
		var domainSelector = $('.modal#quickviewDedicateZone').find('select.domain');
		clearListOption(domainSelector);
		
		$.ajax({
            url: setContextPath + "/admin/infra/listDomains",
            async: false,
	        dataType: "json",
	        data: {"param": "&listAll=true&details=min"},
            success: function(json) {
            	console.log('listDomain Success');
            	
            	var Objs = json.listdomainsresponse.domain;
            	var availablDomainArray = [];
            	$(Objs).each(function() {
            		var thisDomain = this;
            		var domain = {};
            		domain.id = thisDomain.id;
            		domain.name = thisDomain.name;
            		
            		availablDomainArray.push(domain);
            	});

            	//domainList 생성
            	makeListOption(availablDomainArray, domainSelector);
            },
            error: function(json) {
            	console.log('listDomains error');
            }
		});
		
		$(".modal#quickviewDedicateZone").modal({backdrop: 'static', keyboard: false});
	};
	var releaseDedicatedZone = function() {
		$(".modal#quickviewReleaseDedicateZone").modal({backdrop: 'static', keyboard: false});
	}
	var disableZone = function() {
		$(".modal#quickviewDisableZone").modal({backdrop: 'static', keyboard: false});		
	}
	var enableZone = function() {
		$(".modal#quickviewEnableZone").modal({backdrop: 'static', keyboard: false});		
	}
	var deleteZone = function() {
		$(".modal#quickviewDeleteZone").modal({backdrop: 'static', keyboard: false});			
	}
	var disableOutOfBandManagement = function() {
		$(".modal#quickviewDisableOutOfBandManagementZone").modal({backdrop: 'static', keyboard: false});			
	}
	var enableOutOfBandManagement = function() {
		$(".modal#quickviewEnableOutOfBandManagementZone").modal({backdrop: 'static', keyboard: false});			
	}
	var disableHAForZone = function() {
		$(".modal#quickviewDisableHA").modal({backdrop: 'static', keyboard: false});			
	}
	var enableHAForZone = function() {
		$(".modal#quickviewEnableHA").modal({backdrop: 'static', keyboard: false});			
	}
/*	
	var VmwareDc = false;
	var addVmwareDc = function() {
		$(".modal#quickviewAddVmwareDc").modal({backdrop: 'static', keyboard: false});				
	}
	var removeVmwareDc = function() {
		$(".modal#quickviewRemoveVmwareDc").modal({backdrop: 'static', keyboard: false});				
	}
	$.ajax({
        url: setContextPath + "/admin/infra/listApis",
        async: false,
        dataType: "json",
        data: {"param": "&name=listVmwareDcs"},
        success: function(json) {
        	console.log('listApis Success');
        	
        	var vmwaredcs = json.listvmwaredcsresponse.VMwareDC;

        	if(vmwaredcs != null && vmwaredcs != undefined) {
            	VmwareDc = vmwaredcs;        		
        	}
        },
        error: function(json) {
        	console.log('listApis error');
        }
	});
*/
	
	$.ajax({
        url: setContextPath + "/admin/infra/listDedicatedZones",
        dataType: "json",
        data: {"param": "&zoneid=" + data.id},
        success: function(json) {
        	console.log('listDedicatedZones Success');
        	
        	var Objs = json.listdedicatedzonesresponse;

        	Dedicated = !jQuery.isEmptyObject(Objs);
        	

        	if(data.resourcedetails != null && data.resourcedetails != undefined) {
        		if(data.resourcedetails.outOfBandManagementEnabled != null && data.resourcedetails.outOfBandManagementEnabled != undefined) {
        			OutOfBandMangenetEnabled = data.resourcedetails.outOfBandManagementEnabled;					
        		}
        		if(data.resourcedetails.resourceHAEnabled != null && data.resourcedetails.resourceHAEnabled != undefined) {
        			resourceHAEnabled = data.resourcedetails.resourceHAEnabled;		
        		}
        	}
        	                	                	        	
//        	if(VmwareDc == true || VmwareDc == 'true') {
//        		$detailButtonLine1.append(makeQuickviewButton('removeVmwareDc', 'fa fa-plus', 'Remove VMware datacenter', removeVmwareDc));				
//        	}
//        	else {
//        		$detailButtonLine1.append(makeQuickviewButton('addVmwareDc', 'fa fa-plus', 'Add VMware datacenter', addVmwareDc));		
//        	}
        	if(data.allocationstate == "Disabled") {
        		$detailButtonLine1.append(makeQuickviewButton('enableZone', 'fa fa-plus', 'Enable Zone', enableZone));	
        	}
        	else { // Enabled
        		$detailButtonLine1.append(makeQuickviewButton('disableZone', 'fa fa-plus', 'Disable Zone', disableZone));		
        	}
        	if(Dedicated == true || Dedicated == 'true') {
        		$detailButtonLine1.append(makeQuickviewButton('releaseDedicateZone', 'fa fa-plus', 'Release Dedicate Zone', releaseDedicatedZone));		
        	}
        	else {
        		$detailButtonLine1.append(makeQuickviewButton('dedicateZone', 'fa fa-plus', 'Dedicate Zone', dedicateZone));
        	}
        	
        	$detailButtonLine1.append(makeQuickviewButton('deleteZone', 'fa fa-plus', 'Delete Zone', deleteZone));
        	
        	if(OutOfBandMangenetEnabled == true || OutOfBandMangenetEnabled == 'true') {
        		$detailButtonLine2.append(makeQuickviewButton('disableOutOfBandManagement', 'fa fa-plus', 'Disable Out-of-band Management', disableOutOfBandManagement));		
        	}
        	else {
        		$detailButtonLine2.append(makeQuickviewButton('enableOutOfBandManagement', 'fa fa-plus', 'Enable Out-of-band Management', enableOutOfBandManagement));		
        	}
        	if(resourceHAEnabled == true || resourceHAEnabled == 'true') {
        		$detailButtonLine2.append(makeQuickviewButton('disableHA', 'fa fa-plus', 'Disable HA', disableHAForZone));		
        	}
        	else {
        		$detailButtonLine2.append(makeQuickviewButton('enableHA', 'fa fa-plus', 'Enable HA', enableHAForZone));		
        	}
        	
        	$tbody.append($detailButtonLine1);
        	$tbody.append($detailButtonLine2);
        	
        },
        error: function(json) {
        	console.log('listDedicatedZones error');
        }
	});
	
	return $tbody;
}
var makeQuickviewActionPod = function(data) {
	var $tbody = $('<tbody/>');
	
	var $detailButtonLine1 = $('<tr/>');
	var $link = $('<tr/>');
	
	quickviewId = data.id;		
	
	var Dedicated = false;

	var dedicatepod = function() {
        var domainSelector = $('.modal#quickviewDedicatepod').find('select.domain');
        clearListOption(domainSelector);
        
        $.ajax({
            url: setContextPath + "/admin/infra/listDomains",
            async: false,
            dataType: "json",
            data: {"param": "&listAll=true&details=min"},
            success: function(json) {
                console.log('listDomain Success');
                
                var Objs = json.listdomainsresponse.domain;
                var availablDomainArray = [];
                $(Objs).each(function() {
                    var thisDomain = this;
                    var domain = {};
                    domain.id = thisDomain.id;
                    domain.name = thisDomain.name;
                    
                    availablDomainArray.push(domain);
                });

                //domainList 생성
                makeListOption(availablDomainArray, domainSelector);
            },
            error: function(json) {
                console.log('listDomains error');
            }
        });
        
        $(".modal#quickviewDedicatepod").modal({backdrop: 'static', keyboard: false});
    };
    var releaseDedicatedpod = function() {
        $(".modal#quickviewReleaseDedicatepod").modal({backdrop: 'static', keyboard: false});
    }
    var disablepod = function() {
        $(".modal#quickviewDisablepod").modal({backdrop: 'static', keyboard: false});		
    }
    var enablepod = function() {
        $(".modal#quickviewEnablepod").modal({backdrop: 'static', keyboard: false});		
    }
    var deletepod = function() {
        $(".modal#quickviewDeletepod").modal({backdrop: 'static', keyboard: false});			
    }
    
	$.ajax({
	    url: setContextPath + "/admin/infra/listDedicatedPods",
	    dataType: "json",
	    data: {"param": "&podid=" + data.id},
	    success: function(json) {
	        console.log('listDedicatedPods Success');
	        
	        var Objs = json.listdedicatedpodsresponse;

	        Dedicated = !jQuery.isEmptyObject(Objs);
	        	        
	        if(Dedicated == true || Dedicated == 'true') {
	            $detailButtonLine1.append(makeQuickviewButton('releaseDedicatePod', 'fa fa-plus', 'Release Dedicate pod', releaseDedicatedpod));		
	        }
	        else {
	            $detailButtonLine1.append(makeQuickviewButton('dedicatePod', 'fa fa-plus', 'Dedicate Pod', dedicatepod));
	        }
	        if(data.allocationstate == "Disabled") {
	            $detailButtonLine1.append(makeQuickviewButton('enablePod', 'fa fa-plus', 'Enable Pod', enablepod));	
	        }
	        else { // Enabled
	            $detailButtonLine1.append(makeQuickviewButton('disablePod', 'fa fa-plus', 'Disable Pod', disablepod));		
	        }
	        
	        $detailButtonLine1.append(makeQuickviewButton('deletePod', 'fa fa-plus', 'Delete Pod', deletepod));
	        
	        $tbody.append($detailButtonLine1);

	    	$link.append(makeQuickviewLink('View Clusters', setContextPath + "/admin/infra/clustersRedirect?param=" + encodeURIComponent('&podid=' + data.id + '&zoneid=' + data.zoneid)));
	    	
	    	$tbody.append($link);
	        
	    },
	    error: function(json) {
	        console.log('listDedicatedPods error');
	    }
	});
	
	
	return $tbody;
}
var makeQuickviewActionCluster = function(data) {
	var $tbody = $('<tbody/>');
	
	var $detailButtonLine1 = $('<tr/>');
	var $detailButtonLine2 = $('<tr/>');
    var $link = $('<tr/>');
    
	quickviewId = data.id;		
	var Dedicated = false;
	var OutOfBandMangenetEnabled = true;
	var resourceHAEnabled = true;
	
	var dedicateCluster = function() {
         var domainSelector = $('.modal#quickviewDedicateCluster').find('select.domain');
         clearListOption(domainSelector);
         
         $.ajax({
             url: setContextPath + "/admin/infra/listDomains",
             async: false,
             dataType: "json",
             data: {"param": "&listAll=true&details=min"},
             success: function(json) {
                 console.log('listDomain Success');
                 
                 var Objs = json.listdomainsresponse.domain;
                 var availablDomainArray = [];
                 $(Objs).each(function() {
                     var thisDomain = this;
                     var domain = {};
                     domain.id = thisDomain.id;
                     domain.name = thisDomain.name;
                     
                     availablDomainArray.push(domain);
                 });

                 //domainList 생성
                 makeListOption(availablDomainArray, domainSelector);
             },
             error: function(json) {
                 console.log('listDomains error');
             }
         });
         
         $(".modal#quickviewDedicateCluster").modal({backdrop: 'static', keyboard: false});
     };
    var releaseDedicatedCluster = function() {
         $(".modal#quickviewReleaseDedicateCluster").modal({backdrop: 'static', keyboard: false});
     }
    var disableCluster = function() {
         $(".modal#quickviewDisableCluster").modal({backdrop: 'static', keyboard: false});		
     }
    var enableCluster = function() {
         $(".modal#quickviewEnableCluster").modal({backdrop: 'static', keyboard: false});		
     }
    var disableCluster = function() {
         $(".modal#quickviewDisableCluster").modal({backdrop: 'static', keyboard: false});		
     }
    var manageCluster = function() {
         $(".modal#quickviewManageCluster").modal({backdrop: 'static', keyboard: false});		
     }
    var unmanageCluster = function() {
         $(".modal#quickviewUnmanageCluster").modal({backdrop: 'static', keyboard: false});			
     }
    var disableOutOfBandManagement = function() {
         $(".modal#quickviewDisableOutOfBandManagementCluster").modal({backdrop: 'static', keyboard: false});			
     }
    var enableOutOfBandManagement = function() {
         $(".modal#quickviewEnableOutOfBandManagementCluster").modal({backdrop: 'static', keyboard: false});			
     }
    var disableHAForCluster = function() {
         $(".modal#quickviewDisableHA").modal({backdrop: 'static', keyboard: false});			
     }
    var enableHAForCluster = function() {
         $(".modal#quickviewEnableHA").modal({backdrop: 'static', keyboard: false});			
     }
     	
    $.ajax({
        url: setContextPath + "/admin/infra/listDedicatedClusters",
        dataType: "json",
        data: {"param": "&clusterid=" + data.id},
        success: function(json) {
            console.log('listDedicatedClusters Success');
            
            var Objs = json.listdedicatedclustersresponse;

            Dedicated = !jQuery.isEmptyObject(Objs);
            

            if(data.resourcedetails != null && data.resourcedetails != undefined) {
                if(data.resourcedetails.outOfBandManagementEnabled != null && data.resourcedetails.outOfBandManagementEnabled != undefined) {
                    OutOfBandMangenetEnabled = data.resourcedetails.outOfBandManagementEnabled;					
                }
                if(data.resourcedetails.resourceHAEnabled != null && data.resourcedetails.resourceHAEnabled != undefined) {
                    resourceHAEnabled = data.resourcedetails.resourceHAEnabled;		
                }
            }
           
            if(Dedicated == true || Dedicated == 'true') {
                $detailButtonLine1.append(makeQuickviewButton('releaseDedicateCluster', 'fa fa-plus', 'Release Dedicate Cluster', releaseDedicatedCluster));		
            }
            else {
                $detailButtonLine1.append(makeQuickviewButton('dedicateCluster', 'fa fa-plus', 'Dedicate Cluster', dedicateCluster));
            }
            if(data.managedstate == "Managed"){
                if(data.allocationstate == "Disabled") {
                    $detailButtonLine1.append(makeQuickviewButton('enableCluster', 'fa fa-plus', 'Enable Cluster', enableCluster));	
                }
                else { // Enabled
                    $detailButtonLine1.append(makeQuickviewButton('disableCluster', 'fa fa-plus', 'Disable Cluster', disableCluster));		
                }
            	$detailButtonLine1.append(makeQuickviewButton('unmanageCluster', 'fa fa-plus', 'Unmanage Cluster', unmanageCluster));
            }
            else { // Unmanaged
                $detailButtonLine1.append(makeQuickviewButton('', '', ''));	
                $detailButtonLine1.append(makeQuickviewButton('manageCluster', 'fa fa-plus', 'manage Cluster', manageCluster));            	
            }
           
            $detailButtonLine2.append(makeQuickviewButton('deleteCluster', 'fa fa-plus', 'Delete Cluster', deleteCluster));
            
            if(OutOfBandMangenetEnabled == true || OutOfBandMangenetEnabled == 'true') {
                $detailButtonLine2.append(makeQuickviewButton('disableOutOfBandManagement', 'fa fa-plus', 'Disable Out-of-band Management', disableOutOfBandManagement));		
            }
            else {
                $detailButtonLine2.append(makeQuickviewButton('enableOutOfBandManagement', 'fa fa-plus', 'Enable Out-of-band Management', enableOutOfBandManagement));		
            }
            if(resourceHAEnabled == true || resourceHAEnabled == 'true') {
                $detailButtonLine2.append(makeQuickviewButton('disableHA', 'fa fa-plus', 'Disable HA', disableHAForCluster));		
            }
            else {
                $detailButtonLine2.append(makeQuickviewButton('enableHA', 'fa fa-plus', 'Enable HA', enableHAForCluster));		
            }
            
            $tbody.append($detailButtonLine1);
            $tbody.append($detailButtonLine2);
                    	
        	$link.append(makeQuickviewLink('View Hosts', setContextPath + "/admin/infra/hostsRedirect?param=" + encodeURIComponent('&clusterid=' + data.id + '&zoneid=' + data.zoneid + '&type=Routing')));
        	
        	$tbody.append($link);
        	
        },
        error: function(json) {
            console.log('listDedicatedClusters error');
        }
    });

	return $tbody;
}
var makeQuickviewActionHost = function(data) {
	var $tbody = $('<tbody/>');
	
	var $detailButtonLine1 = $('<tr/>');
	var $detailButtonLine2 = $('<tr/>');
	var $detailButtonLine3 = $('<tr/>');
	var $detailButtonLine4 = $('<tr/>');

	var $link = $('<tr/>');
	
	quickviewId = data.id;		
	
	var Dedicated = false;
	
	var dedicatedHost = function() {
        var domainSelector = $('.modal#quickviewDedicateHost').find('select.domain');
        clearListOption(domainSelector);
        
        $.ajax({
            url: setContextPath + "/admin/infra/listDomains",
            async: false,
            dataType: "json",
            data: {"param": "&listAll=true&details=min"},
            success: function(json) {
                console.log('listDomain Success');
                
                var Objs = json.listdomainsresponse.domain;
                var availablDomainArray = [];
                $(Objs).each(function() {
                    var thisDomain = this;
                    var domain = {};
                    domain.id = thisDomain.id;
                    domain.name = thisDomain.name;
                    
                    availablDomainArray.push(domain);
                });

                //domainList 생성
                makeListOption(availablDomainArray, domainSelector);
            },
            error: function(json) {
                console.log('listDomains error');
            }
        });
        
        $(".modal#quickviewDedicateHost").modal({backdrop: 'static', keyboard: false});
    };
    var releaseDedicatedHost = function() {
        $(".modal#quickviewReleaseDedicateHost").modal({backdrop: 'static', keyboard: false});
    }
    var enableMaintenanceModeForHost = function() {
    	 $(".modal#quickviewEnableMaintenanceModeForHost").modal({backdrop: 'static', keyboard: false});
    }
    var cancelMaintenanceModeForHost = function() {
    	 $(".modal#quickviewCancelMaintenanceModeForHost").modal({backdrop: 'static', keyboard: false});
   }
    var forceReconnectForHost = function() {
      	 $(".modal#quickviewForceReconnectForHost").modal({backdrop: 'static', keyboard: false});
    }
    var disableHost = function() {
      	 $(".modal#quickviewDisableHost").modal({backdrop: 'static', keyboard: false});
       }
    var enableHost = function() {
    	 $(".modal#quickviewEnableHost").modal({backdrop: 'static', keyboard: false});
    }
    var deleteHost = function() {
    	 $(".modal#quickviewDeleteHost").modal({backdrop: 'static', keyboard: false});
    }
/*
    var configureHAForHost = function() {
    	var providerSelector = $('.modal#quickviewConfigureHAForHost').find('select.provider');
        clearListOption(providerSelector);
        
        $.ajax({
            url: setContextPath + "/admin/infra/listHostHAProviders",
            async: false,
            dataType: "json",
            data: {"param": "&hypervisor=" + data.hypervisor},
            success: function(json) {
                console.log('listHostHAProviders Success');
                
                var Objs = json.listhosthaprovidersresponse;
                var availablProviderArray = [];
                $(Objs).each(function() {
                    var provider = {};
                    provider.id = this.haprovider;
                    provider.name = this.haprovider;
                    
                    availablProviderArray.push(provider);
                });

                //provider 생성
                makeListOption(availablProviderArray, providerSelector);
            },
            error: function(json) {
                console.log('listHostHAProviders error');
            }
        });
        
    	$(".modal#quickviewConfigureHAForHost").modal({backdrop: 'static', keyboard: false});
    }
    var enableHAForHost = function() {
    	$(".modal#quickviewEnableHAForHost").modal({backdrop: 'static', keyboard: false});
    }
    var disableHAForHost = function() {
    	$(".modal#quickviewDisableHAForHost").modal({backdrop: 'static', keyboard: false});
    }
    var configureOutOfBandManagementForHost = function() {
    	$(".modal#quickviewConfigureOutOfBandManagement").modal({backdrop: 'static', keyboard: false});
    }
    var issueOutOfBandManagementPowerAction = function() {
    	$(".modal#quickviewIssueOutOfBandManagementPowerAction").modal({backdrop: 'static', keyboard: false});
    }
    var changeOutOfBandManagementPassword = function() {
    	$(".modal#quickviewChangeOutOfBandManagementPassword").modal({backdrop: 'static', keyboard: false});
    }
    var disableOutOfBandManagementForHost = function() {
    	$(".modal#quickviewDisableOutOfBandManagementForHost").modal({backdrop: 'static', keyboard: false});
    }
    var enableOutOfBandManagementForHost = function() {
    	$(".modal#quickviewEnableOutOfBandManagementForHost").modal({backdrop: 'static', keyboard: false});
    }
*/
    
	$.ajax({
        url: setContextPath + "/admin/infra/listDedicatedHosts",
        dataType: "json",
        data: {"param": "&hostid=" + data.id},
        success: function(json) {
        	console.log('listDedicatedHosts Success');
        	
        	var Objs = json.listdedicatedhostsresponse;

        	Dedicated = !jQuery.isEmptyObject(Objs);
        	
        	if(data.resourcedetails != null && data.resourcedetails != undefined) {
                if(data.resourcedetails.outOfBandManagementEnabled != null && data.resourcedetails.outOfBandManagementEnabled != undefined) {
                    OutOfBandMangenetEnabled = data.resourcedetails.outOfBandManagementEnabled;					
                }
                if(data.resourcedetails.resourceHAEnabled != null && data.resourcedetails.resourceHAEnabled != undefined) {
                    resourceHAEnabled = data.resourcedetails.resourceHAEnabled;		
                }
            }
       	
        	if(Dedicated){
        		$detailButtonLine1.append(makeQuickviewButton('releaseDedicatedHost', 'fa fa-plus', 'Release Dedicated Host', releaseDedicatedHost));
        	}
        	else {
        		$detailButtonLine1.append(makeQuickviewButton('dedicatedHost', 'fa fa-plus', 'Dedicated Host', dedicatedHost));
        	}
        	    
        	if (data.resourcestate == "Enabled") {
        		$detailButtonLine1.append(makeQuickviewButton('enableMaintenanceMode', 'fa fa-plus', 'Enable Maintenance Mode', enableMaintenanceModeForHost));
        		$detailButtonLine2.append(makeQuickviewButton('disableHost', 'fa fa-plus', 'Disable Host', disableHost));
                if (data.state != "Disconnected") {
	        		$detailButtonLine1.append(makeQuickviewButton('forceReconnect', 'fa fa-plus', 'Force Reconnect', forceReconnectForHost));
                }

            } else if (data.resourcestate == "ErrorInMaintenance") {
        		$detailButtonLine1.append(makeQuickviewButton('enableMaintenanceMode', 'fa fa-plus', 'Enable Maintenance Mode', enableMaintenanceModeForHost));
        		$detailButtonLine1.append(makeQuickviewButton('cancelMaintenanceMode', 'fa fa-plus', 'Cancel Maintenance Mode', cancelMaintenanceModeForHost));
            } else if (data.resourcestate == "PrepareForMaintenance") {
        		$detailButtonLine1.append(makeQuickviewButton('cancelMaintenanceMode', 'fa fa-plus', 'Cancel Maintenance Mode', cancelMaintenanceModeForHost));
            } else if (data.resourcestate == "Maintenance") {
        		$detailButtonLine1.append(makeQuickviewButton('cancelMaintenanceMode', 'fa fa-plus', 'Cancel Maintenance Mode', cancelMaintenanceModeForHost));
        		$detailButtonLine2.append(makeQuickviewButton('deleteHost', 'fa fa-plus', 'Remove Host', deleteHost));
            } else if (data.resourcestate == "Disabled") {
        		$detailButtonLine1.append(makeQuickviewButton('enableHost', 'fa fa-plus', 'Enable Host', enableHost));
        		$detailButtonLine1.append(makeQuickviewButton('deleteHost', 'fa fa-plus', 'Remove Host', deleteHost));
            }

        	if ((data.state == "Down" || data.state == "Alert" || data.state == "Disconnected") && (data.resourcestate != "Disabled" && data.resourcestate != "Maintenance")) {
        		$detailButtonLine2.append(makeQuickviewButton('deleteHost', 'fa fa-plus', 'Remove Host', deleteHost));
            } 
        	
        	/*
            $detailButtonLine2.append(makeQuickviewButton('configureHAForHost', 'fa fa-plus', 'Configure HA', configureHAForHost));
            if (data.hasOwnProperty("hostha") && data.hostha.haenable) {
        		$detailButtonLine3.append(makeQuickviewButton('disableHAForZone', 'fa fa-plus', 'Disable HA', disableHAForHost));
            } else {
        		$detailButtonLine3.append(makeQuickviewButton('enableHAForZone', 'fa fa-plus', 'Enable HA', enableHAForHost));
            }

        	$detailButtonLine3.append(makeQuickviewButton('', '', ''));
    		$detailButtonLine3.append(makeQuickviewButton('configureOutOfBandManagementForHost', 'fa fa-plus', 'Configure Out-of-band Management', configureOutOfBandManagementForHost));
            if (data.hasOwnProperty("outofbandmanagement") && data.outofbandmanagement.enabled) {
                $detailButtonLine4.append(makeQuickviewButton('disableOutOfBandManagementForHost', 'fa fa-plus', 'Disable Out-of-band Management', disableOutOfBandManagementForHost));
        		$detailButtonLine4.append(makeQuickviewButton('issueOutOfBandManagementPowerAction', 'fa fa-plus', 'Issue Out-of-band Management Power Action', issueOutOfBandManagementPowerAction));
        		$detailButtonLine4.append(makeQuickviewButton('changeOutOfBandManagementPassword', 'fa fa-plus', 'change Out-of-band Management Password', changeOutOfBandManagementPassword));
            } else {
                $detailButtonLine4.append(makeQuickviewButton('enableOutOfBandManagementForHost', 'fa fa-plus', 'Enable Out-of-band Management', enableOutOfBandManagementForHost));
            }
        	*/

        	$tbody.append($detailButtonLine1);
        	$tbody.append($detailButtonLine2);
//        	$tbody.append($detailButtonLine3);
//        	$tbody.append($detailButtonLine4);
        	
        	$link.append(makeQuickviewLink('View Instances', setContextPath + "/admin/vms?hosid=" + data.id));
        	
        	
        	$tbody.append($link);
        },
        error: function(json) {
        	console.log('listDedicatedHosts error');
        }
	});
	
	return $tbody;
}
var makeQuickviewActionPrimaryStorage = function(data) {
	var $tbody = $('<tbody/>');
	
	var $detailButtonLine1 = $('<tr/>');
	
	quickviewId = data.id;
	
	var enableStorageMaintenance = function() {
		$(".modal#quickviewEnableStorageMaintenance").modal({backdrop: 'static', keyboard: false});
	}
	var cancelStorageMaintenance = function() {
		$(".modal#quickviewCancelStorageMaintenance").modal({backdrop: 'static', keyboard: false});		
	}
	var deleteStoragePool = function() {
		$(".modal#quickviewDeleteStoragePool").modal({backdrop: 'static', keyboard: false});				
	}

	if (data.state == 'Up' || data.state == "Connecting") {
		$detailButtonLine1.append(makeQuickviewButton('enableStorageMaintenance', 'fa fa-plus', 'Enable Maintenance Mode', enableStorageMaintenance));
    } else if (data.state == 'Down') {
    	$detailButtonLine1.append(makeQuickviewButton('enableStorageMaintenance', 'fa fa-plus', 'Enable Maintenance Mode', enableStorageMaintenance));
    	$detailButtonLine1.append(makeQuickviewButton('deleteStoragePool', 'fa fa-plus', 'Delete Primary Storage', deleteStoragePool));
    } else if (data.state == "Alert") {
    	$detailButtonLine1.append(makeQuickviewButton('deleteStoragePool', 'fa fa-plus', 'Delete Primary Storage', deleteStoragePool));
    } else if (data.state == "ErrorInMaintenance") {
    	$detailButtonLine1.append(makeQuickviewButton('enableStorageMaintenance', 'fa fa-plus', 'Enable Maintenance Mode', enableStorageMaintenance));
    	$detailButtonLine1.append(makeQuickviewButton('cancelStorageMaintenance', 'fa fa-plus', 'Cancel Maintenance Mode', cancelStorageMaintenance));
    } else if (data.state == "PrepareForMaintenance") {
    	$detailButtonLine1.append(makeQuickviewButton('cancelStorageMaintenance', 'fa fa-plus', 'Cancel Maintenance Mode', cancelStorageMaintenance));
    } else if (data.state == "Maintenance") {
    	$detailButtonLine1.append(makeQuickviewButton('cancelStorageMaintenance', 'fa fa-plus', 'Cancel Maintenance Mode', cancelStorageMaintenance));
    	$detailButtonLine1.append(makeQuickviewButton('deleteStoragePool', 'fa fa-plus', 'Delete Primary Storage', deleteStoragePool));
    } else if (data.state == "Disconnected") {
    	$detailButtonLine1.append(makeQuickviewButton('deleteStoragePool', 'fa fa-plus', 'Delete Primary Storage', deleteStoragePool));
    }

	$tbody.append($detailButtonLine1);
	
	return $tbody;
}
var makeQuickviewActionSecondaryStorage = function(data) {
	var $tbody = $('<tbody/>');
	
	var $detailButtonLine1 = $('<tr/>');
	
	quickviewId = data.id;
	
	var action = function() {
		$(".modal#quickviewDelete").modal({backdrop: 'static', keyboard: false});
	};
	$detailButtonLine1.append(makeQuickviewButton('deleteSecondaryStorage', 'fa fa-plus', 'Delete Secondary Storage', action));
	
	$tbody.append($detailButtonLine1);
	
	return $tbody;
}
var makeQuickviewActionSystemVM = function(data) {
	var $tbody = $('<tbody/>');
	
	var $detailButtonLine1 = $('<tr/>');
	var $detailButtonLine2 = $('<tr/>');
	
	quickviewId = data.id;
	
	var startSystemVM = function(){
		$(".modal#quickviewStartSystemVM").modal({backdrop: 'static', keyboard: false});
	}
	var stopSystemVM = function() {
		$(".modal#quickviewStopSystemVM").modal({backdrop: 'static', keyboard: false});		
	}
	var rebootSystemVM = function() {
		$(".modal#quickviewRebootSystemVM").modal({backdrop: 'static', keyboard: false});		
	}
	var destroySystemVM = function() {
		$(".modal#quickviewDestroySystemVM").modal({backdrop: 'static', keyboard: false});				
	}
	var migrateSystemVM = function() {
		var serviceHostId = $('.modal#quickviewMigrateSystemVM').find('select.hostid');
		clearListOption(serviceHostId);

		$.ajax({
            url: setContextPath + "/admin/infra/findHostsForMigration",
            async: false,
	        dataType: "json",
	        data: {"param": "&VirtualMachineId=" + data.id},
            success: function(json) {
            	console.log('findHostsForMigration Success');
            	
            	var Objs = json.findhostsformigrationresponse.serviceoffering;
            	var availablHostArray = [];
            	$(Objs).each(function() {
            		var host = {};
            		host.id = this.id;
            		host.name = this.name + ("(" + this.suitableformigration ? "Suitable": "Not Suitable" + ")");
            		
            		availablHostArray.push(serviceofferings);
            	});

            	if(availablHostArray.length == 0) {
            		var empty = $('<option/>');
            		availablHostArray.push(empty);
            	}
            	
            	//serviceOffering 생성
            	makeListOption(availablHostArray, serviceHostId);
            },
            error: function(json) {
            	console.log('findHostsForMigration error');
            }
		});
		
		$(".modal#quickviewMigrateSystemVM").modal({backdrop: 'static', keyboard: false});		
	}
	var scaleUpSystemVM = function() {
		var serviceOfferingSelector = $('.modal#quickviewScaleUpSystemVM').find('select.serviceOffering');
		clearListOption(serviceOfferingSelector);

		var array = [];
		array.push("&issystem=true");
		array.push("&virtualmachineid=" + data.id);
		if(data.systemvmtype == "secondarystoragevm") {
			array.push("&systemvmtype=secondarystoragevm");
		}
		else  if(data.systemvmtype == "consoleproxy") {
			array.push("&systemvmtype=consoleproxy");
		}
		$.ajax({
            url: setContextPath + "/admin/infra/listServiceOfferings",
            async: false,
	        dataType: "json",
	        data: {"param": array.join("")},
            success: function(json) {
            	console.log('listServiceOfferings Success');
            	
            	var Objs = json.listserviceofferingsresponse.serviceoffering;
            	var availablServiceOfferingArray = [];
            	$(Objs).each(function() {
            		var serviceofferings = {};
            		serviceofferings.id = this.id;
            		serviceofferings.name = this.name;
            		
            		availablServiceOfferingArray.push(serviceofferings);
            	});

            	//serviceOffering 생성
            	makeListOption(availablServiceOfferingArray, serviceOfferingSelector);
            },
            error: function(json) {
            	console.log('listServiceOfferings error');
            }
		});
				
		$(".modal#quickviewScaleUpSystemVM").modal({backdrop: 'static', keyboard: false});				
	}
	
	if(data.state == "Running") {
		$detailButtonLine1.append(makeQuickviewButton('stopSystemVM', 'fa fa-plus', 'stop System VM', stopSystemVM));
		$detailButtonLine1.append(makeQuickviewButton('rebootSystemVM', 'fa fa-plus', 'Reboot System VM', rebootSystemVM));
		$detailButtonLine1.append(makeQuickviewButton('destorySystemVM', 'fa fa-plus', 'Destory System VM', destroySystemVM));

		if(data.hypervisor == "VMware") {
			$detailButtonLine2.append(makeQuickviewButton('scaleUpSystemVM', 'fa fa-plus', 'Change service offering', scaleUpSystemVM));			
		}

		$detailButtonLine2.append(makeQuickviewButton('migrateSystemVM', 'fa fa-plus', 'Migrate System VM', migrateSystemVM));
	
	} 
	else if(data.state == "Stopped") {
		$detailButtonLine1.append(makeQuickviewButton('startSystemVM', 'fa fa-plus', 'start System VM', startSystemVM));
		$detailButtonLine1.append(makeQuickviewButton('destorySystemVM', 'fa fa-plus', 'Destory System VM', destroySystemVM));
		$detailButtonLine1.append(makeQuickviewButton('scaleUpSystemVM', 'fa fa-plus', 'Change service offering', scaleUpSystemVM));			
		
	}
	else if(data.state == "Error") {
		$detailButtonLine1.append(makeQuickviewButton('destorySystemVM', 'fa fa-plus', 'Destory System VM', destroySystemVM));
	}	
	
	$tbody.append($detailButtonLine1);
	$tbody.append($detailButtonLine2);
	
	return $tbody;
}
var makeQuickviewActionVirtualRouter = function(data) {
	var $tbody = $('<tbody/>');
	
	var $detailButtonLine1 = $('<tr/>');
	var $detailButtonLine2 = $('<tr/>');
	var $link = $('<tr/>');
	
	quickviewId = data.id;
	
	var startRouter = function(){
		$(".modal#quickviewStartRouter").modal({backdrop: 'static', keyboard: false});
	}
	var stopRouter = function() {
		$(".modal#quickviewStopRouter").modal({backdrop: 'static', keyboard: false});
	}
	var rebootRouter = function() {
		$(".modal#quickviewRebootRouter").modal({backdrop: 'static', keyboard: false});		
	}
	var destroyRouter = function() {
		$(".modal#quickviewDestroyRouter").modal({backdrop: 'static', keyboard: false});				
	}
	var migrateRouter = function() {
		var serviceHostId = $('.modal#quickviewMigrateRouter').find('select.hostid');
		clearListOption(serviceHostId);

		$.ajax({
            url: setContextPath + "/admin/infra/findHostsForMigration",
            async: false,
	        dataType: "json",
	        data: {"param": "&VirtualMachineId=" + data.id},
            success: function(json) {
            	console.log('findHostsForMigration Success');
            	
            	var Objs = json.findhostsformigrationresponse.serviceoffering;
            	var availablHostArray = [];
            	$(Objs).each(function() {
            		var host = {};
            		host.id = this.id;
            		host.name = this.name + ("(" + this.suitableformigration ? "Suitable": "Not Suitable" + ")");
            		
            		availablHostArray.push(serviceofferings);
            	});

            	if(availablHostArray.length == 0) {
            		var empty = $('<option/>');
            		availablHostArray.push(empty);
            	}
            	
            	//serviceOffering 생성
            	makeListOption(availablHostArray, serviceHostId);
            },
            error: function(json) {
            	console.log('findHostsForMigration error');
            }
		});
		
		$(".modal#quickviewMigrateRouter").modal({backdrop: 'static', keyboard: false});		
	}
	var scaleUpRouter = function() {
		var serviceOfferingSelector = $('.modal#quickviewScaleUpRouter').find('select.serviceOffering');
		clearListOption(serviceOfferingSelector);

		var array = [];
		array.push("&issystem=true");
		array.push("&virtualmachineid=" + data.id);
		array.push("&systemvmtype=domainrouter");
		$.ajax({
            url: setContextPath + "/admin/infra/listServiceOfferings",
            async: false,
	        dataType: "json",
	        data: {"param": array.join("")},
            success: function(json) {
            	console.log('listServiceOfferings Success');
            	
            	var Objs = json.listserviceofferingsresponse.serviceoffering;
            	var availablServiceOfferingArray = [];
            	$(Objs).each(function() {
            		var serviceofferings = {};
            		serviceofferings.id = this.id;
            		serviceofferings.name = this.name;
            		
            		availablServiceOfferingArray.push(serviceofferings);
            	});
            	
            	//serviceOffering 생성
            	makeListOption(availablServiceOfferingArray, serviceOfferingSelector);
            },
            error: function(json) {
            	console.log('listServiceOfferings error');
            }
		});
				
		$(".modal#quickviewScaleUpRouter").modal({backdrop: 'static', keyboard: false});				
	}
	var upgradeRouterToUseNewerTemplate = function() {
		$(".modal#quickviewUpgradeRouterToUseNewerTemplate").modal({backdrop: 'static', keyboard: false});		
	}
	
	
    if (data.state == 'Running') {
    	$detailButtonLine1.append(makeQuickviewButton('stopRouter', 'fa fa-plus', 'Stop Router', stopRouter));
    	
        //when router is Running, only VMware support scaleUp(change service offering)
        if (data.hypervisor == "VMware") {
    		$detailButtonLine1.append(makeQuickviewButton('scaleUpRouter', 'fa fa-plus', 'Change service offering', scaleUpRouter));			
        }

    	$detailButtonLine1.append(makeQuickviewButton('rebootRouter', 'fa fa-plus', 'Reboot Router', rebootRouter));
    	$detailButtonLine1.append(makeQuickviewButton('destroyRouter', 'fa fa-plus', 'Destory Router', destroyRouter));

        // always admin because admin console.
    	$detailButtonLine2.append(makeQuickviewButton('migrateRouter', 'fa fa-plus', 'Migrate Router', migrateRouter));
 	} 
    else if (data.state == 'Stopped') {
    	$detailButtonLine1.append(makeQuickviewButton('startRouter', 'fa fa-plus', 'Start Router', startRouter));

        //when router is Stopped, all hypervisors support scaleUp(change service offering)
		$detailButtonLine1.append(makeQuickviewButton('scaleUpRouter', 'fa fa-plus', 'Change service offering', scaleUpRouter));			

    	$detailButtonLine1.append(makeQuickviewButton('destroyRouter', 'fa fa-plus', 'Destory Router', destroyRouter));
    }
	if (data.requiresupgrade == true) {//??
    	$detailButtonLine2.append(makeQuickviewButton('upgradeRouterToUseNewerTemplate', 'fa fa-plus', 'Upgrade Router To Use Newer Template', upgradeRouterToUseNewerTemplate));
    }
	
	
	
	
	var networkid;
	if(data.vpcid != null && data.vpcid != undefined) {
		networkid = vpcid;
	}
	else if(data.guestnetworkid != null && data.guestnetworkid != undefined) {
		networkid = guestnetworkid;		
	}
	else if(data.projectid != null && data.projectid != undefined) {
		networkid = projectid;		
	}
	$link.append(makeQuickviewLink('View Networks', setContextPath + "/admin/infra/networksRedirect?id=" + networkid));
	$link.append(makeQuickviewLink('View Instances', setContextPath + "/admin/vms?networkid=" + networkid));
	
	$tbody.append($detailButtonLine1);
	$tbody.append($detailButtonLine2);
	$tbody.append($link);
	
	return $tbody;
}

var makeQuickviewAction = function(category, data) {
	var $modalTable = $('<table/>');

	switch(category) {
    case 'Zone':
    	$modalTable.append(makeQuickviewActionZone(data));
        break;
    case 'Pod':
    	$modalTable.append(makeQuickviewActionPod(data));
        break;
    case 'Cluster':
    	$modalTable.append(makeQuickviewActionCluster(data));
        break;
    case 'Host':
    	$modalTable.append(makeQuickviewActionHost(data));
    	break;
    case 'Primary Storage':
    	$modalTable.append(makeQuickviewActionPrimaryStorage(data));
        break;
    case 'Secondary Storage':
    	$modalTable.append(makeQuickviewActionSecondaryStorage(data));
        break;
    case 'SystemVM':
    	$modalTable.append(makeQuickviewActionSystemVM(data));
        break;
    case 'VirtualRouter':
    	$modalTable.append(makeQuickviewActionVirtualRouter(data));
        break;

    default:
        //
	}
	return $modalTable;
}

var makeQuickView = function(category,data) {
	//modal
	var $quickView = $('<div/>', {
		class: 'modal quickview'
	});
	var $modalDialog = $('<div/>', {
		class: 'modal-dialog quickview',
		id: 'modal-dialog'
	}).css({
		"position": 'absolute'
	});
	var $modalContent = $('<div/>', {
		class: 'modal-content quickview',
	}).css({
		"position": 'absolute',
		'width': '450px'
	});
	// modal header
	var $modalHeader = $('<div/>', {
		class: 'modal-header quickview'
	});
	
	$modalHeader.append(makeQuickviewTitle(data.name));
	
	//modal body
	var $modalBody = $('<div/>', {
		class: 'modal-body quickview'
	});
	
	$modalBody.append(makeQuickviewBody(category, data));
	
	//modal footer
	var $modalFooter = $('<div/>', {
		class: 'modal-footer quickview'
	}).css({
		'float': 'left'
	});
	
	//buttons
	var $buttons = $('<div/>', {
		class: 'quickview-buttons w-100'
	});
	
	//
	$buttons.append(makeQuickviewAction(category, data));
	
	$modalFooter.append($buttons);
	
	//end modal
	$modalContent.append($modalHeader);
	$modalContent.append($modalBody);
	$modalContent.append($modalFooter);
	
	$modalDialog.append($modalContent);
	$quickView.append($modalDialog);
	
	return $quickView;
}

var moveQuickview = function(offset) {
	$('.modal.quickview').modal({backdrop: false});
	$(".modal-dialog.quickview").offset({top: offset.top});
	$(".modal-content.quickview").offset({left: offset.left + $(".quickViewButton").outerWidth() - $(".modal-content.quickview").outerWidth()});
	
	$('.modal-content.quickview').mouseleave(function() {
		$('.modal.quickview').remove();
	});
}

//quickview action function
//zone
var enableZone = function() {
	var zoneid = quickviewId;
	
	$.ajax({
        url: setContextPath + "/admin/infra/updateZone",
        dataType: "json",
        data: {"param": "&id=" + zoneid + "&allocationstate=Enabled"},
        success: function (json) {
            console.log('updateZone success');

           	swal({ title: "Success!", text: 'Enable Zone', type: "success", confirmButtonText: "확인" }).then(
           			function() {
           				window.location.reload();
           			});
         	
     		setNotification('Enable Zone', 'success');
     		
         }, error: function (json) {
         	console.log('updateZone error');
         	
         	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).updatezoneresponse.errortext;
        	
        	
        	swal({ title: "Error: Enable Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
         	setNotification('Enable Zone, errortext: ' + errortext, 'error');
         }
    });
}
var disableZone = function() {
	var zoneid = quickviewId;
	
	$.ajax({
        url: setContextPath + "/admin/infra/updateZone",
        dataType: "json",
        data: {"param": "&id=" + zoneid + "&allocationstate=Disabled"},
        success: function (json) {
            console.log('updateZone success');

           	swal({ title: "Success!", text: 'Disable Zone', type: "success", confirmButtonText: "확인" }).then(
           			function() {
           				window.location.reload();
           			});
           	
     		setNotification('Disable Zone', 'success');
     		
         }, error: function (json) {
         	console.log('updateZone error');
         	
         	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).updatezoneresponse.errortext;
        	
        	
        	swal({ title: "Error: Disable Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
        	setNotification('Disable Zone, errortext: ' + errortext, 'error');
         }
    });
}
var dedicateZone = function() {
	var array = [];
	
	var zoneid = quickviewId;
	var domainid = $('.modal#quickviewDedicateZone').find('.modal-body').find('select.domain').val();
	var account = $('.modal#quickviewDedicateZone').find('.modal-body').find('input.account').val();
	
	array.push("&zoneid=" + zoneid);
	array.push("&domainid=" + domainid);
	if(account != "" && account != undefined) {
		array.push("&account=" + account);		
	}
	
	$.ajax({
         url: setContextPath + "/admin/infra/dedicateZone",
         dataType: "json",
         data: {"param":  array.join("")},
         success: function (json) {
         	console.log('dedicateZone success');
         	
           	var jobid = json.dedicatezoneresponse.jobid;
           	swal({
                title: "Loading...",
                allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
                allowEscapeKey: false,
                confirmButtonClass: "swalConfirmBtnClass",
                imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
          	
          	var dedicateZoneIntervalID = setInterval(function() {
                $.ajax({
                    url: setContextPath + "/admin/infra/queryAsyncJobResult",
                    dataType: "json",
                    data: {"param": '&jobid=' + jobid},
                    success: function(json) {
                        var result = json.queryasyncjobresultresponse;
                        if (result.jobstatus == 0) {
                            return; //Job has not completed
                        } else {
                            clearInterval(dedicateZoneIntervalID);

                            if (result.jobstatus == 1) {
                            	swal({ title: "Success!", text: 'Dedicate Zone', type: "success", confirmButtonText: "확인" }).then(
                               			function() {
                               				window.location.reload();
                               			});
                             	
                         		setNotification('Dedicate Zone', 'success');
                            } else if (result.jobstatus == 2) {
        	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

        	                	swal({ title: "Error: Dedicate Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
                              	
                              	setNotification('Dedicate Zone, errortext: ' + errortext, 'error');
                            }
                        }
                    },
                    error: function(json) {
                    	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                    	swal({ title: "Error: Dedicate Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
                      	
                      	setNotification('Dedicate Zone, errortext: ' + errortext, 'error');
                    }
                });
            }, queryAsyncJobResultInterval);
         }, error: function (json) {
         	console.log('dedicateZone error');
         	
         	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).dedicatezoneresponse.errortext;
        	

        	swal({ title: "Error: Dedicate Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
         	setNotification('Dedicate Zone, errortext: ' + errortext, 'error');
         }
     });
}
var releaseDedicateZone = function() {
	var zoneid = quickviewId;
	
	 $.ajax({
        url: setContextPath + "/admin/infra/releaseDedicatedZone",
        dataType: "json",
	        data: {"param": "&zoneid=" + zoneid},
        success: function (json) {
        	console.log('releaseDedicatedZone success');

           	var jobid = json.releasededicatedzoneresponse.jobid;
           	
           	swal({
                title: "Loading...",
                allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
                allowEscapeKey: false,
                confirmButtonClass: "swalConfirmBtnClass",
                imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
          	
          	var releaseDedicateZoneIntervalID = setInterval(function() {
                $.ajax({
                    url: setContextPath + "/admin/infra/queryAsyncJobResult",
                    dataType: "json",
                    data: {"param": '&jobid=' + jobid},
                    success: function(json) {
                        var result = json.queryasyncjobresultresponse;
                        if (result.jobstatus == 0) {
                            return; //Job has not completed
                        } else {
                            clearInterval(releaseDedicateZoneIntervalID);

                            if (result.jobstatus == 1) {
                            	swal({ title: "Success!", text: 'Release Dedicate Zone', type: "success", confirmButtonText: "확인" }).then(
                               			function() {
                               				window.location.reload();
                               			});
                             	
                         		setNotification('Release Dedicate Zone', 'success');
                            } else if (result.jobstatus == 2) {
        	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

        	                	swal({ title: "Error: Release Dedicate Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
                              	
                              	setNotification('Release Dedicate Zone, errortext: ' + errortext, 'error');
                            }
                        }
                    },
                    error: function(json) {
                    	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                    	swal({ title: "Error: Release Dedicate Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
                      	
                      	setNotification('Release Dedicate Zone, errortext: ' + errortext, 'error');
                    }
                });
            }, queryAsyncJobResultInterval);
      		
        }, error: function (json) {
        	console.log('releaseDedicatedZone error');
        	
        	var responseText = json.responseText.split('~');
	       	
	       	var errortext = JSON.parse(responseText[1]).releasededicatedzoneresponse.errortext;
	       	

        	swal({ title: "Error: Release Dedicate Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
        	setNotification('Release Dedicate Zone, errortext: ' + errortext, 'error');
        }
    });
}
var deleteZone = function() {
	var zoneid = quickviewId;
	
	 $.ajax({
       url: setContextPath + "/admin/infra/deleteZone",
       dataType: "json",
	        data: {"param": "&id=" + zoneid},
       success: function (json) {
       	console.log('deleteZone success');

       	swal({ title: "Success!", text: 'Delete Zone', type: "success", confirmButtonText: "확인" }).then(
       			function() {
       				window.location.reload();
       			});
     	
   		setNotification('Delete Zone', 'success');
   		
       }, error: function (json) {
       	console.log('deleteZone error');
       	
       	var responseText = json.responseText.split('~');
       	
       	var errortext = JSON.parse(responseText[1]).deletezoneresponse.errortext;
       	

       	swal({ title: "Error: Delete Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
       	
       	setNotification('Delete Zone, errortext: ' + errortext, 'error');
       }
   });
}
var disableOutOfBandManagementZone = function() {
	var zoneid = quickviewId;
	
	 $.ajax({
      url: setContextPath + "/admin/infra/disableOutOfBandManagementForZone",
      dataType: "json",
	        data: {"param": "&zoneid=" + zoneid},
      success: function (json) {
      	console.log('disableOutOfBandManagementForZone success');

    	var jobid = json.disableoutofbandmanagementforzoneresponse.jobid;
    	
       	swal({
            title: "Loading...",
            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
            allowEscapeKey: false,
            confirmButtonClass: "swalConfirmBtnClass",
            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
      	
      	var intervalID = setInterval(function() {
            $.ajax({
                url: setContextPath + "/admin/infra/queryAsyncJobResult",
                dataType: "json",
                data: {"param": '&jobid=' + jobid},
                success: function(json) {
                    var result = json.queryasyncjobresultresponse;
                    if (result.jobstatus == 0) {
                        return; //Job has not completed
                    } else {
                        clearInterval(intervalID);

                        if (result.jobstatus == 1) {
                        	swal({ title: "Success!", text: 'Disable Out Of Band Management For Zone', type: "success", confirmButtonText: "확인" }).then(
                           			function() {
                           				window.location.reload();
                           			});
                         	
                     		setNotification('Disable Out Of Band Management For Zone', 'success');
                        } else if (result.jobstatus == 2) {
    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

    	                	swal({ title: "Error: Disable Out Of Band Management For Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
                          	
                          	setNotification('Disable Out Of Band Management For Zone, errortext: ' + errortext, 'error');
                        }
                    }
                },
                error: function(json) {
                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                	swal({ title: "Error: Disable Out Of Band Management For Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
                  	
                  	setNotification('Disable Out Of Band Management For Zone, errortext: ' + errortext, 'error');
                }
            });
        }, queryAsyncJobResultInterval);
      }, error: function (json) {
      	console.log('disableOutOfBandManagementForZone error');
      	
      	var responseText = json.responseText.split('~');
      	
      	var errortext = JSON.parse(responseText[1]).disableoutofbandmanagementforzoneresponse.errortext;
      	

      	swal({ title: "Error: Disable Out Of Band Management For Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
      	
      	setNotification('Disable Out Of Band Management For Zone, errortext: ' + errortext, 'error');
      }
  });	
}
var enableOutOfBandManagementZone = function() {
	var zoneid = quickviewId;
	
	 $.ajax({
      url: setContextPath + "/admin/infra/enableOutOfBandManagementForZone",
      dataType: "json",
	        data: {"param": "&zoneid=" + zoneid},
      success: function (json) {
      	console.log('enableOutOfBandManagementForZone success');

  		
  		var jobid = json.enableoutofbandmanagementforzoneresponse.jobid;
  		
  		swal({
            title: "Loading...",
            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
            allowEscapeKey: false,
            confirmButtonClass: "swalConfirmBtnClass",
            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
      	
      	var intervalID = setInterval(function() {
            $.ajax({
                url: setContextPath + "/admin/infra/queryAsyncJobResult",
                dataType: "json",
                data: {"param": '&jobid=' + jobid},
                success: function(json) {
                    var result = json.queryasyncjobresultresponse;
                    if (result.jobstatus == 0) {
                        return; //Job has not completed
                    } else {
                        clearInterval(intervalID);

                        if (result.jobstatus == 1) {
                        	swal({ title: "Success!", text: 'Enable Out Of Band Management For Zone', type: "success", confirmButtonText: "확인" }).then(
                           			function() {
                           				window.location.reload();
                           			});
                         	
                     		setNotification('Enable Out Of Band Management For Zone', 'success');
                        } else if (result.jobstatus == 2) {
    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

    	                	swal({ title: "Error: Enable Out Of Band Management For Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
                          	
                          	setNotification('Enable Out Of Band Management For Zone, errortext: ' + errortext, 'error');
                        }
                    }
                },
                error: function(json) {
                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                	swal({ title: "Error: Enable Out Of Band Management For Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
                  	
                  	setNotification('Enable Out Of Band Management For Zone, errortext: ' + errortext, 'error');
                }
            });
        }, queryAsyncJobResultInterval);
  		
      }, error: function (json) {
      	console.log('enableOutOfBandManagementForZone error');
      	
      	var responseText = json.responseText.split('~');
      	
      	var errortext = JSON.parse(responseText[1]).enableoutofbandmanagementforzoneresponse.errortext;
      	

      	swal({ title: "Error: Enable Out Of Band Management For Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
      	
      	setNotification('Enable Out Of Band Management For Zone, errortext: ' + errortext, 'error');
      }
  });	
}
var disableHAForZone = function() {
	var zoneid = quickviewId;
	
	$.ajax({
		url: setContextPath + "/admin/infra/disableHAForZone",
		dataType: "json",
        data: {"param": "&zoneid=" + zoneid},
        success: function (json) {
        	console.log('disableHAForZone success');

        	var jobid = json.disablehaforzoneresponse.jobid;
        	
           	swal({
                title: "Loading...",
                allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
                allowEscapeKey: false,
                confirmButtonClass: "swalConfirmBtnClass",
                imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
          	
          	var intervalID = setInterval(function() {
                $.ajax({
                    url: setContextPath + "/admin/infra/queryAsyncJobResult",
                    dataType: "json",
                    data: {"param": '&jobid=' + jobid},
                    success: function(json) {
                        var result = json.queryasyncjobresultresponse;
                        if (result.jobstatus == 0) {
                            return; //Job has not completed
                        } else {
                            clearInterval(intervalID);

                            if (result.jobstatus == 1) {
                            	swal({ title: "Success!", text: 'Disable HA For Zone', type: "success", confirmButtonText: "확인" }).then(
                               			function() {
                               				window.location.reload();
                               			});
                             	
                         		setNotification('Disable HA For Zone', 'success');
                            } else if (result.jobstatus == 2) {
        	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

        	                	swal({ title: "Error: Disable HA For Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
                              	
                              	setNotification('Disable HA For Zone, errortext: ' + errortext, 'error');
                            }
                        }
                    },
                    error: function(json) {
                    	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                    	swal({ title: "Error: Disable HA For Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
                      	
                      	setNotification('Disable HA For Zone, errortext: ' + errortext, 'error');
                    }
                });
            }, queryAsyncJobResultInterval);
 		
        }, error: function (json) {
        	console.log('disableHAForZone error');
     	
	     	var responseText = json.responseText.split('~');
	     	
	     	var errortext = JSON.parse(responseText[1]).disablehaforzoneresponse.errortext;
	     	
	
	     	swal({ title: "Error: Disable HA For Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
	     	
	     	setNotification('Disable HA For Zone, errortext: ' + errortext, 'error');
        }
	});	
}
var enableHAForZone = function() {
	var zoneid = quickviewId;
	
	$.ajax({
		url: setContextPath + "/admin/infra/enableHAForZone",
		dataType: "json",
        data: {"param": "&zoneid=" + zoneid},
        success: function (json) {
        	console.log('enableHAForZone success');
        	
        	var jobid = json.enablehaforzoneresponse.jobid;

           	swal({
                title: "Loading...",
                allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
                allowEscapeKey: false,
                confirmButtonClass: "swalConfirmBtnClass",
                imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
          	
          	var intervalID = setInterval(function() {
                $.ajax({
                    url: setContextPath + "/admin/infra/queryAsyncJobResult",
                    dataType: "json",
                    data: {"param": '&jobid=' + jobid},
                    success: function(json) {
                        var result = json.queryasyncjobresultresponse;
                        if (result.jobstatus == 0) {
                            return; //Job has not completed
                        } else {
                            clearInterval(intervalID);

                            if (result.jobstatus == 1) {
                            	swal({ title: "Success!", text: 'Enable HA For Zone', type: "success", confirmButtonText: "확인" }).then(
                               			function() {
                               				window.location.reload();
                               			});
                             	
                         		setNotification('Enable HA For Zone', 'success');
                            } else if (result.jobstatus == 2) {
        	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

        	                	swal({ title: "Error: Enable HA For Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
                              	
                              	setNotification('Enable HA For Zone, errortext: ' + errortext, 'error');
                            }
                        }
                    },
                    error: function(json) {
                    	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                    	swal({ title: "Error: Enable HA For Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
                      	
                      	setNotification('Enable HA For Zone, errortext: ' + errortext, 'error');
                    }
                });
            }, queryAsyncJobResultInterval);
        }, error: function (json) {
        	console.log('enableHAForZone error');
     	
	     	var responseText = json.responseText.split('~');
	     	
	     	var errortext = JSON.parse(responseText[1]).enablehaforzoneresponse.errortext;
	     	
	
	     	swal({ title: "Error: Enable HA For Zone!", text: errortext, type: "error", confirmButtonText: "확인" });
	     	
	     	setNotification('Enable HA For Zone, errortext: ' + errortext, 'error');
        }
	});	
}
//pod
var enablePod = function() {
	var podid = quickviewId;
	
	$.ajax({
        url: setContextPath + "/admin/infra/updatePod",
        dataType: "json",
        data: {"param": "&id=" + podid + "&allocationstate=Enabled"},
        success: function (json) {
            console.log('updatePod success');

           	swal({ title: "Success!", text: 'Enable Pod', type: "success", confirmButtonText: "확인" }).then(
           			function() {
           				window.location.reload();
           			});
         	
     		setNotification('Enable Pod', 'success');
     		
         }, error: function (json) {
         	console.log('updatePod error');
         	
         	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).updatepodresponse.errortext;
        	
        	
        	swal({ title: "Error: Enable Pod!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
         	setNotification('Enable Pod, errortext: ' + errortext, 'error');
         }
    });
}
var disablePod = function() {
	var podid = quickviewId;
	
	$.ajax({
        url: setContextPath + "/admin/infra/updatePod",
        dataType: "json",
        data: {"param": "&id=" + podid + "&allocationstate=Disabled"},
        success: function (json) {
            console.log('updatePod success');

           	swal({ title: "Success!", text: 'Disable Pod', type: "success", confirmButtonText: "확인" }).then(
           			function() {
           				window.location.reload();
           			});
           	
     		setNotification('Disable Pod', 'success');
     		
         }, error: function (json) {
         	console.log('updatePod error');
         	
         	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).updatepodresponse.errortext;
        	
        	
        	swal({ title: "Error: Disable Pod!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
        	setNotification('Disable Pod, errortext: ' + errortext, 'error');
         }
    });
}
var dedicatePod = function() {
	var array = [];
	
	var podid = quickviewId;
	var domainid = $('.modal#quickviewDedicatePod').find('.modal-body').find('select.domain').val();
	var account = $('.modal#quickviewDedicatePod').find('.modal-body').find('input.account').val();
	
	array.push("&podid=" + podid);
	array.push("&domainid=" + domainid);
	if(account != "" && account != undefined) {
		array.push("&account=" + account);		
	}
	
	$.ajax({
         url: setContextPath + "/admin/infra/dedicatePod",
         dataType: "json",
         data: {"param":  array.join("")},
         success: function (json) {
         	console.log('dedicatePod success');
         	
           	var jobid = json.dedicatepodresponse.jobid;
           	
           	swal({
                title: "Loading...",
                allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
                allowEscapeKey: false,
                confirmButtonClass: "swalConfirmBtnClass",
                imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
          	
          	var IntervalID = setInterval(function() {
                $.ajax({
                    url: setContextPath + "/admin/infra/queryAsyncJobResult",
                    dataType: "json",
                    data: {"param": '&jobid=' + jobid},
                    success: function(json) {
                        var result = json.queryasyncjobresultresponse;
                        if (result.jobstatus == 0) {
                            return; //Job has not completed
                        } else {
                            clearInterval(IntervalID);

                            if (result.jobstatus == 1) {
                            	swal({ title: "Success!", text: 'Dedicate Pod', type: "success", confirmButtonText: "확인" }).then(
                               			function() {
                               				window.location.reload();
                               			});
                             	
                         		setNotification('Dedicate Pod', 'success');
                            } else if (result.jobstatus == 2) {
        	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

        	                	swal({ title: "Error: Dedicate Pod!", text: errortext, type: "error", confirmButtonText: "확인" });
                              	
                              	setNotification('Dedicate Pod, errortext: ' + errortext, 'error');
                            }
                        }
                    },
                    error: function(json) {
                    	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                    	swal({ title: "Error: Dedicate Pod!", text: errortext, type: "error", confirmButtonText: "확인" });
                      	
                      	setNotification('Dedicate Pod, errortext: ' + errortext, 'error');
                    }
                });
            }, queryAsyncJobResultInterval);
     		
         }, error: function (json) {
         	console.log('dedicatePod error');
         	
         	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).dedicatepodresponse.errortext;
        	

        	swal({ title: "Error: Dedicate Pod!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
         	setNotification('Dedicate Pod, errortext: ' + errortext, 'error');
         }
     });
}
var releaseDedicatePod = function() {
	var podid = quickviewId;
	
	 $.ajax({
        url: setContextPath + "/admin/infra/releaseDedicatedPod",
        dataType: "json",
	        data: {"param": "&podid=" + podid},
        success: function (json) {
        	console.log('releaseDedicatedPod success');

           	var jobid = json.releasededicatedpodresponse.jobid;

           	loadingImageMethod(jobid, 'Release Dedicate Pod');
           	
           	swal({
                title: "Loading...",
                allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
                allowEscapeKey: false,
                confirmButtonClass: "swalConfirmBtnClass",
                imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
          	
          	var IntervalID = setInterval(function() {
                $.ajax({
                    url: setContextPath + "/admin/infra/queryAsyncJobResult",
                    dataType: "json",
                    data: {"param": '&jobid=' + jobid},
                    success: function(json) {
                        var result = json.queryasyncjobresultresponse;
                        if (result.jobstatus == 0) {
                            return; //Job has not completed
                        } else {
                            clearInterval(IntervalID);

                            if (result.jobstatus == 1) {
                            	swal({ title: "Success!", text: 'Release Dedicate Pod', type: "success", confirmButtonText: "확인" }).then(
                               			function() {
                               				window.location.reload();
                               			});
                             	
                         		setNotification('Release Dedicate Pod', 'success');
                            } else if (result.jobstatus == 2) {
        	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

        	                	swal({ title: "Error: Release Dedicate Pod!", text: errortext, type: "error", confirmButtonText: "확인" });
                              	
                              	setNotification('Release Dedicate Pod, errortext: ' + errortext, 'error');
                            }
                        }
                    },
                    error: function(json) {
                    	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                    	swal({ title: "Error: Release Dedicate Pod!", text: errortext, type: "error", confirmButtonText: "확인" });
                      	
                      	setNotification('Release Dedicate Pod, errortext: ' + errortext, 'error');
                    }
                });
            }, queryAsyncJobResultInterval);
        }, error: function (json) {
        	console.log('releaseDedicatedPod error');
        	
        	var responseText = json.responseText.split('~');
	       	
	       	var errortext = JSON.parse(responseText[1]).releasededicatedpodresponse.errortext;
	       	

        	swal({ title: "Error: Release Dedicate Pod!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
        	setNotification('Release Dedicate Pod, errortext: ' + errortext, 'error');
        }
    });
}
var deletePod = function() {
	var podid = quickviewId;
	
	 $.ajax({
       url: setContextPath + "/admin/infra/deletePod",
       dataType: "json",
	        data: {"param": "&id=" + podid},
       success: function (json) {
       	console.log('deletePod success');

       	swal({ title: "Success!", text: 'Delete Pod', type: "success", confirmButtonText: "확인" }).then(
       			function() {
       				window.location.reload();
       			});
     	
   		setNotification('Delete Pod', 'success');
   		
       }, error: function (json) {
       	console.log('deletePod error');
       	
       	var responseText = json.responseText.split('~');
       	
       	var errortext = JSON.parse(responseText[1]).deletepodresponse.errortext;
       	

       	swal({ title: "Error: Delete Pod!", text: errortext, type: "error", confirmButtonText: "확인" });
       	
       	setNotification('Delete Pod, errortext: ' + errortext, 'error');
       }
   });
}
//cluster
var enableCluster = function() {
	var clusterid = quickviewId;
	
	$.ajax({
        url: setContextPath + "/admin/infra/updateCluster",
        dataType: "json",
        data: {"param": "&id=" + clusterid + "&allocationstate=Enabled"},
        success: function (json) {
            console.log('updateCluster success');

           	swal({ title: "Success!", text: 'Enable Cluster', type: "success", confirmButtonText: "확인" }).then(
           			function() {
           				window.location.reload();
           			});
         	
     		setNotification('Enable Cluster', 'success');
     		
         }, error: function (json) {
         	console.log('updateCluster error');
         	
         	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).updateclusterresponse.errortext;
        	
        	
        	swal({ title: "Error: Enable Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
         	setNotification('Enable Cluster, errortext: ' + errortext, 'error');
         }
    });
}
var disableCluster = function() {
	var clusterid = quickviewId;
	
	$.ajax({
        url: setContextPath + "/admin/infra/updateCluster",
        dataType: "json",
        data: {"param": "&id=" + clusterid + "&allocationstate=Disabled"},
        success: function (json) {
            console.log('updateCluster success');

           	swal({ title: "Success!", text: 'Disable Cluster', type: "success", confirmButtonText: "확인" }).then(
           			function() {
           				window.location.reload();
           			});
           	
     		setNotification('Disable Cluster', 'success');
     		
         }, error: function (json) {
         	console.log('updateCluster error');
         	
         	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).updateclusterresponse.errortext;
        	
        	
        	swal({ title: "Error: Disable Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
        	setNotification('Disable Cluster, errortext: ' + errortext, 'error');
         }
    });
}
var dedicateCluster = function() {
	var array = [];
	
	var clusterid = quickviewId;
	var domainid = $('.modal#quickviewDedicateCluster').find('.modal-body').find('select.domain').val();
	var account = $('.modal#quickviewDedicateCluster').find('.modal-body').find('input.account').val();
	
	array.push("&clusterid=" + clusterid);
	array.push("&domainid=" + domainid);
	if(account != "" && account != undefined) {
		array.push("&account=" + account);		
	}
	
	$.ajax({
         url: setContextPath + "/admin/infra/dedicateCluster",
         dataType: "json",
         data: {"param":  array.join("")},
         success: function (json) {
         	console.log('dedicateCluster success');
         	
           	var jobid = json.dedicateclusterresponse.jobid;
           	swal({
                title: "Loading...",
                allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
                allowEscapeKey: false,
                confirmButtonClass: "swalConfirmBtnClass",
                imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
          	
          	var intervalID = setInterval(function() {
                $.ajax({
                    url: setContextPath + "/admin/infra/queryAsyncJobResult",
                    dataType: "json",
                    data: {"param": '&jobid=' + jobid},
                    success: function(json) {
                        var result = json.queryasyncjobresultresponse;
                        if (result.jobstatus == 0) {
                            return; //Job has not completed
                        } else {
                            clearInterval(intervalID);

                            if (result.jobstatus == 1) {
                            	swal({ title: "Success!", text: 'Dedicate Cluster', type: "success", confirmButtonText: "확인" }).then(
                               			function() {
                               				window.location.reload();
                               			});
                             	
                         		setNotification('Dedicate Cluster', 'success');
                            } else if (result.jobstatus == 2) {
        	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

        	                	swal({ title: "Error: Dedicate Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
                              	
                              	setNotification('Dedicate Cluster, errortext: ' + errortext, 'error');
                            }
                        }
                    },
                    error: function(json) {
                    	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                    	swal({ title: "Error: Dedicate Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
                      	
                      	setNotification('Dedicate Cluster, errortext: ' + errortext, 'error');
                    }
                });
            }, queryAsyncJobResultInterval);
         }, error: function (json) {
         	console.log('dedicateCluster error');
         	
         	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).dedicateclusterresponse.errortext;
        	

        	swal({ title: "Error: Dedicate Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
         	setNotification('Dedicate Cluster, errortext: ' + errortext, 'error');
         }
     });
}
var releaseDedicateCluster = function() {
	var clusterid = quickviewId;
	
	 $.ajax({
        url: setContextPath + "/admin/infra/releaseDedicatedCluster",
        dataType: "json",
	        data: {"param": "&clusterid=" + clusterid},
        success: function (json) {
        	console.log('releaseDedicatedCluster success');

           	var jobid = json.releasededicatedclusterresponse.jobid;

           	swal({
                title: "Loading...",
                allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
                allowEscapeKey: false,
                confirmButtonClass: "swalConfirmBtnClass",
                imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
          	
          	var intervalID = setInterval(function() {
                $.ajax({
                    url: setContextPath + "/admin/infra/queryAsyncJobResult",
                    dataType: "json",
                    data: {"param": '&jobid=' + jobid},
                    success: function(json) {
                        var result = json.queryasyncjobresultresponse;
                        if (result.jobstatus == 0) {
                            return; //Job has not completed
                        } else {
                            clearInterval(intervalID);

                            if (result.jobstatus == 1) {
                            	swal({ title: "Success!", text: 'Release Dedicate Cluster', type: "success", confirmButtonText: "확인" }).then(
                               			function() {
                               				window.location.reload();
                               			});
                             	
                         		setNotification('Dedicate Cluster', 'success');
                            } else if (result.jobstatus == 2) {
        	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

        	                	swal({ title: "Error: Release Dedicate Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
                              	
                              	setNotification('Release Dedicate Cluster, errortext: ' + errortext, 'error');
                            }
                        }
                    },
                    error: function(json) {
                    	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                    	swal({ title: "Error: Release Dedicate Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
                      	
                      	setNotification('Release Dedicate Cluster, errortext: ' + errortext, 'error');
                    }
                });
            }, queryAsyncJobResultInterval);
        }, error: function (json) {
        	console.log('releaseDedicatedCluster error');
        	
        	var responseText = json.responseText.split('~');
	       	
	       	var errortext = JSON.parse(responseText[1]).releasededicatedclusterresponse.errortext;
	       	

        	swal({ title: "Error: Release Dedicate Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
        	setNotification('Release Dedicate Cluster, errortext: ' + errortext, 'error');
        }
    });
}
var deleteCluster = function() {
	var clusterid = quickviewId;
	
	 $.ajax({
       url: setContextPath + "/admin/infra/deleteCluster",
       dataType: "json",
	        data: {"param": "&id=" + clusterid},
       success: function (json) {
       	console.log('deleteCluster success');

       	swal({ title: "Success!", text: 'Delete Cluster', type: "success", confirmButtonText: "확인" }).then(
       			function() {
       				window.location.reload();
       			});
     	
   		setNotification('Delete Cluster', 'success');
   		
       }, error: function (json) {
       	console.log('deleteCluster error');
       	
       	var responseText = json.responseText.split('~');
       	
       	var errortext = JSON.parse(responseText[1]).deleteclusterresponse.errortext;
       	

       	swal({ title: "Error: Delete Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
       	
       	setNotification('Delete Cluster, errortext: ' + errortext, 'error');
       }
   });
}
var disableOutOfBandManagementCluster = function() {
	var clusterid = quickviewId;
	
	 $.ajax({
      url: setContextPath + "/admin/infra/disableOutOfBandManagementForCluster",
      dataType: "json",
	        data: {"param": "&clusterid=" + clusterid},
      success: function (json) {
      	console.log('disableOutOfBandManagementForCluster success');

    	var jobid = json.disableoutofbandmanagementforclusterresponse.jobid;
       	swal({
            title: "Loading...",
            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
            allowEscapeKey: false,
            confirmButtonClass: "swalConfirmBtnClass",
            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
      	
      	var intervalID = setInterval(function() {
            $.ajax({
                url: setContextPath + "/admin/infra/queryAsyncJobResult",
                dataType: "json",
                data: {"param": '&jobid=' + jobid},
                success: function(json) {
                    var result = json.queryasyncjobresultresponse;
                    if (result.jobstatus == 0) {
                        return; //Job has not completed
                    } else {
                        clearInterval(intervalID);

                        if (result.jobstatus == 1) {
                        	swal({ title: "Success!", text: 'Disable Out Of Band Management For Cluster', type: "success", confirmButtonText: "확인" }).then(
                           			function() {
                           				window.location.reload();
                           			});
                         	
                     		setNotification('Disable Out Of Band Management For Cluster', 'success');
                        } else if (result.jobstatus == 2) {
    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

    	                	swal({ title: "Error: Disable Out Of Band Management For Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
                          	
                          	setNotification('Disable Out Of Band Management For Cluster, errortext: ' + errortext, 'error');
                        }
                    }
                },
                error: function(json) {
                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                	swal({ title: "Error: Disable Out Of Band Management For Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
                  	
                  	setNotification('Disable Out Of Band Management For Cluster, errortext: ' + errortext, 'error');
                }
            });
        }, queryAsyncJobResultInterval);
      }, error: function (json) {
      	console.log('disableOutOfBandManagementForCluster error');
      	
      	var responseText = json.responseText.split('~');
      	
      	var errortext = JSON.parse(responseText[1]).disableoutofbandmanagementforclusterresponse.errortext;
      	

      	swal({ title: "Error: Disable Out Of Band Management For Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
      	
      	setNotification('Disable Out Of Band Management For Cluster, errortext: ' + errortext, 'error');
      }
  });	
}
var enableOutOfBandManagementCluster = function() {
	var clusterid = quickviewId;
	
	$.ajax({
      url: setContextPath + "/admin/infra/enableOutOfBandManagementForCluster",
      dataType: "json",
	        data: {"param": "&clusterid=" + clusterid},
      success: function (json) {
      	console.log('enableOutOfBandManagementForCluster success');

  		
  		var jobid = json.enableoutofbandmanagementforclusterresponse.jobid;
  		
       	swal({
            title: "Loading...",
            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
            allowEscapeKey: false,
            confirmButtonClass: "swalConfirmBtnClass",
            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
      	
      	var intervalID = setInterval(function() {
            $.ajax({
                url: setContextPath + "/admin/infra/queryAsyncJobResult",
                dataType: "json",
                data: {"param": '&jobid=' + jobid},
                success: function(json) {
                    var result = json.queryasyncjobresultresponse;
                    if (result.jobstatus == 0) {
                        return; //Job has not completed
                    } else {
                        clearInterval(intervalID);

                        if (result.jobstatus == 1) {
                        	swal({ title: "Success!", text: 'Enable Out Of Band Management For Cluster', type: "success", confirmButtonText: "확인" }).then(
                           			function() {
                           				window.location.reload();
                           			});
                         	
                     		setNotification('Enable Out Of Band Management For Cluster', 'success');
                        } else if (result.jobstatus == 2) {
    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

    	                	swal({ title: "Error: Enable Out Of Band Management For Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
                          	
                          	setNotification('Enable Out Of Band Management For Cluster, errortext: ' + errortext, 'error');
                        }
                    }
                },
                error: function(json) {
                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                	swal({ title: "Error: Enable Out Of Band Management For Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
                  	
                  	setNotification('Enable Out Of Band Management For Cluster, errortext: ' + errortext, 'error');
                }
            });
        }, queryAsyncJobResultInterval);
  		
      }, error: function (json) {
      	console.log('enableOutOfBandManagementForCluster error');
      	
      	var responseText = json.responseText.split('~');
      	
      	var errortext = JSON.parse(responseText[1]).enableoutofbandmanagementforclusterresponse.errortext;
      	

      	swal({ title: "Error: Enable Out Of Band Management For Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
      	
      	setNotification('Enable Out Of Band Management For Cluster, errortext: ' + errortext, 'error');
      }
  });	
}
var disableHAForCluster = function() {
	var clusterid = quickviewId;
	
	$.ajax({
		url: setContextPath + "/admin/infra/disableHAForCluster",
		dataType: "json",
        data: {"param": "&clusterid=" + clusterid},
        success: function (json) {
        	console.log('disableHAForCluster success');

        	var jobid = json.disablehaforclusterresponse.jobid;
        	
           	swal({
                title: "Loading...",
                allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
                allowEscapeKey: false,
                confirmButtonClass: "swalConfirmBtnClass",
                imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
          	
          	var intervalID = setInterval(function() {
                $.ajax({
                    url: setContextPath + "/admin/infra/queryAsyncJobResult",
                    dataType: "json",
                    data: {"param": '&jobid=' + jobid},
                    success: function(json) {
                        var result = json.queryasyncjobresultresponse;
                        if (result.jobstatus == 0) {
                            return; //Job has not completed
                        } else {
                            clearInterval(intervalID);

                            if (result.jobstatus == 1) {
                            	swal({ title: "Success!", text: 'Disable HA For Cluster', type: "success", confirmButtonText: "확인" }).then(
                               			function() {
                               				window.location.reload();
                               			});
                             	
                         		setNotification('Disable HA For Cluster', 'success');
                            } else if (result.jobstatus == 2) {
        	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

        	                	swal({ title: "Error: Disable HA For Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
                              	
                              	setNotification('Disable HA For Cluster, errortext: ' + errortext, 'error');
                            }
                        }
                    },
                    error: function(json) {
                    	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                    	swal({ title: "Error: Disable HA For Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
                      	
                      	setNotification('Disable HA For Cluster, errortext: ' + errortext, 'error');
                    }
                });
            }, queryAsyncJobResultInterval);
        }, error: function (json) {
        	console.log('disableHAForCluster error');
     	
	     	var responseText = json.responseText.split('~');
	     	
	     	var errortext = JSON.parse(responseText[1]).disablehaforclusterresponse.errortext;
	     	
	
	     	swal({ title: "Error: Disable HA For Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
	     	
	     	setNotification('Disable HA For Cluster, errortext: ' + errortext, 'error');
        }
	});	
}
var enableHAForCluster = function() {
	var clusterid = quickviewId;
	
	$.ajax({
		url: setContextPath + "/admin/infra/enableHAForCluster",
		dataType: "json",
        data: {"param": "&clusterid=" + clusterid},
        success: function (json) {
        	console.log('enableHAForCluster success');
        	
        	var jobid = json.enablehaforclusterresponse.jobid;
           	swal({
                title: "Loading...",
                allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
                allowEscapeKey: false,
                confirmButtonClass: "swalConfirmBtnClass",
                imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
          	
          	var intervalID = setInterval(function() {
                $.ajax({
                    url: setContextPath + "/admin/infra/queryAsyncJobResult",
                    dataType: "json",
                    data: {"param": '&jobid=' + jobid},
                    success: function(json) {
                        var result = json.queryasyncjobresultresponse;
                        if (result.jobstatus == 0) {
                            return; //Job has not completed
                        } else {
                            clearInterval(intervalID);

                            if (result.jobstatus == 1) {
                            	swal({ title: "Success!", text: 'Enable HA For Cluster', type: "success", confirmButtonText: "확인" }).then(
                               			function() {
                               				window.location.reload();
                               			});
                             	
                         		setNotification('Enable HA For Cluster', 'success');
                            } else if (result.jobstatus == 2) {
        	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

        	                	swal({ title: "Error: Enable HA For Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
                              	
                              	setNotification('Enable HA For Cluster, errortext: ' + errortext, 'error');
                            }
                        }
                    },
                    error: function(json) {
                    	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                    	swal({ title: "Error: Enable HA For Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
                      	
                      	setNotification('Enable HA For Cluster, errortext: ' + errortext, 'error');
                    }
                });
            }, queryAsyncJobResultInterval);
        }, error: function (json) {
        	console.log('enableHAForCluster error');
     	
	     	var responseText = json.responseText.split('~');
	     	
	     	var errortext = JSON.parse(responseText[1]).enablehaforclusterresponse.errortext;
	     	
	
	     	swal({ title: "Error: Enable HA For Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
	     	
	     	setNotification('Enable HA For Cluster, errortext: ' + errortext, 'error');
        }
	});	
}
var manageCluster = function() {
	var clusterid = quickviewId;

	swal({
        title: "Loading...",
        allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
        allowEscapeKey: false,
        confirmButtonClass: "swalConfirmBtnClass",
        imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
	
	$.ajax({
        url: setContextPath + "/admin/infra/updateCluster",
		dataType: "json",
        data: {"param": "&id=" + clusterid + "&managedstate=Managed"},
        success: function (json) {
        	console.log('updateCluster success');
        	
           	swal({ title: "Success!", text: 'Managed Cluster', type: "success", confirmButtonText: "확인" }).then(
           			function() {
           				window.location.reload();
           			});
           	
     		setNotification('Managed Cluster', 'success');
        },
        error: function(json) {
        	console.log('updateCluster error');
         	
	     	var responseText = json.responseText.split('~');
	     	
	     	var errortext = JSON.parse(responseText[1]).updateclusterresponse.errortext;
	     	

	     	swal({ title: "Error: Managed Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
	     	
	     	setNotification('Managed Cluster, errortext: ' + errortext, 'error');
        }
    });
	
}
var unmanageCluster = function() {
	var clusterid = quickviewId;
	
	swal({
        title: "Loading...",
        allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
        allowEscapeKey: false,
        confirmButtonClass: "swalConfirmBtnClass",
        imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
	
	$.ajax({
        url: setContextPath + "/admin/infra/updateCluster",
		dataType: "json",
        data: {"param": "&id=" + clusterid + "&managedstate=Unmanaged"},
        success: function (json) {
        	console.log('updateCluster success');
        	
     		setNotification('Unmanage Cluster', 'success');

     		swal({ title: "Success!", text: 'Unmanage Cluster', type: "success", confirmButtonText: "확인" }).then(
           			function() {
           				window.location.reload();
           			});
           	
        },
        error: function(json) {
        	console.log('updateCluster error');
         	
	     	var responseText = json.responseText.split('~');
	     	
	     	var errortext = JSON.parse(responseText[1]).updateclusterresponse.errortext;
	     	

	     	swal({ title: "Error: Unmanage Cluster!", text: errortext, type: "error", confirmButtonText: "확인" });
	     	
	     	setNotification('Unmanage Cluster, errortext: ' + errortext, 'error');
        }
    });
}
//host
var dedicateHost = function() {
	var array = [];
	
	var hostid = quickviewId;
	var domainid = $('.modal#quickviewDedicateHost').find('.modal-body').find('select.domain').val();
	var account = $('.modal#quickviewDedicateHost').find('.modal-body').find('input.account').val();
	
	array.push("&hostid=" + hostid);
	array.push("&domainid=" + domainid);
	if(account != "" && account != undefined) {
		array.push("&account=" + account);		
	}
	
	$.ajax({
         url: setContextPath + "/admin/infra/dedicateHost",
         dataType: "json",
         data: {"param":  array.join("")},
         success: function (json) {
         	console.log('dedicateHost success');
         	
           	var jobid = json.dedicatehostresponse.jobid;
           	
           	swal({
                title: "Loading...",
                allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
                allowEscapeKey: false,
                confirmButtonClass: "swalConfirmBtnClass",
                imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
          	
          	var intervalID = setInterval(function() {
                $.ajax({
                    url: setContextPath + "/admin/infra/queryAsyncJobResult",
                    dataType: "json",
                    data: {"param": '&jobid=' + jobid},
                    success: function(json) {
                        var result = json.queryasyncjobresultresponse;
                        if (result.jobstatus == 0) {
                            return; //Job has not completed
                        } else {
                            clearInterval(intervalID);

                            if (result.jobstatus == 1) {
                            	swal({ title: "Success!", text: 'Dedicate Host', type: "success", confirmButtonText: "확인" }).then(
                               			function() {
                               				window.location.reload();
                               			});
                             	
                         		setNotification('Dedicate Host', 'success');
                            } else if (result.jobstatus == 2) {
        	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

        	                	swal({ title: "Error: Dedicate Host!", text: errortext, type: "error", confirmButtonText: "확인" });
                              	
                              	setNotification('Dedicate Host, errortext: ' + errortext, 'error');
                            }
                        }
                    },
                    error: function(json) {
                    	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                    	swal({ title: "Error: Dedicate Host!", text: errortext, type: "error", confirmButtonText: "확인" });
                      	
                      	setNotification('Dedicate Host, errortext: ' + errortext, 'error');
                    }
                });
            }, queryAsyncJobResultInterval);
         }, error: function (json) {
         	console.log('dedicateHost error');
         	
         	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).dedicatehostresponse.errortext;
        	

        	swal({ title: "Error: Dedicate Host!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
         	setNotification('Dedicate Host, errortext: ' + errortext, 'error');
         }
     });
}
var releaseDedicateHost = function() {
	var hostid = quickviewId;
	
	 $.ajax({
       url: setContextPath + "/admin/infra/releaseDedicatedHost",
       dataType: "json",
	        data: {"param": "&hostid=" + hostid},
       success: function (json) {
       		console.log('releaseDedicatedHost success');

          	var jobid = json.releasededicatedhostresponse.jobid;

          	swal({
                title: "Loading...",
                allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
                allowEscapeKey: false,
                confirmButtonClass: "swalConfirmBtnClass",
                imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
          	
          	var intervalID = setInterval(function() {
                $.ajax({
                    url: setContextPath + "/admin/infra/queryAsyncJobResult",
                    dataType: "json",
                    data: {"param": '&jobid=' + jobid},
                    success: function(json) {
                        var result = json.queryasyncjobresultresponse;
                        if (result.jobstatus == 0) {
                            return; //Job has not completed
                        } else {
                            clearInterval(intervalID);

                            if (result.jobstatus == 1) {
                            	swal({ title: "Success!", text: 'Release Dedicate Host', type: "success", confirmButtonText: "확인" }).then(
                               			function() {
                               				window.location.reload();
                               			});
                             	
                         		setNotification('Release Dedicate Host', 'success');
                            } else if (result.jobstatus == 2) {
        	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

        	                	swal({ title: "Error: Release Dedicate Host!", text: errortext, type: "error", confirmButtonText: "확인" });
                              	
                              	setNotification('Release Dedicate Host, errortext: ' + errortext, 'error');
                            }
                        }
                    },
                    error: function(json) {
                    	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                    	swal({ title: "Error: Release Dedicate Host!", text: errortext, type: "error", confirmButtonText: "확인" });
                      	
                      	setNotification('Release Dedicate Host, errortext: ' + errortext, 'error');
                    }
                });
            }, queryAsyncJobResultInterval);
       }, 
       error: function (json) {
	       	console.log('releaseDedicatedHost error');
	       	
	       	var responseText = json.responseText.split('~');
	       	var errortext = JSON.parse(responseText[1]).releasededicatedhostresponse.errortext;
	
	       	swal({ title: "Error: Release Dedicate Host!", text: errortext, type: "error", confirmButtonText: "확인" });
	       	
	       	setNotification('Release Dedicate Host, errortext: ' + errortext, 'error');
       }
   });
}
var enableMaintenanceModeForHost = function() {
	var hostid = quickviewId;
	
	$.ajax({
      url: setContextPath + "/admin/infra/prepareHostForMaintenance",
      dataType: "json",
	        data: {"param": "&id=" + hostid},
      success: function (json) {
      	console.log('prepareHostForMaintenance success');

      	swal({
            title: "Loading...",
            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
            allowEscapeKey: false,
            confirmButtonClass: "swalConfirmBtnClass",
            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
      	
      	var enableMaintenanceModeForHostIntervalID = setInterval(function() {
            $.ajax({
                url: setContextPath + "/admin/infra/queryAsyncJobResult",
                dataType: "json",
                data: {"param": '&jobid=' + json.preparehostformaintenanceresponse.jobid},
                success: function(json) {
                    var result = json.queryasyncjobresultresponse;
                    if (result.jobstatus == 0) {
                        return; //Job has not completed
                    } else {
                        clearInterval(enableMaintenanceModeForHostIntervalID);

                        if (result.jobstatus == 1) {
                        	swal({ title: "Success!", text: 'Enable Maintenance Mode For Host', type: "success", confirmButtonText: "확인" }).then(
                           			function() {
                           				window.location.reload();
                           			});
                         	
                     		setNotification('Enable Maintenance Mode For Host', 'success');
                        } else if (result.jobstatus == 2) {
    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

    	                	swal({ title: "Error: Enable Maintenance Mode For Host!", text: errortext, type: "error", confirmButtonText: "확인" });
                          	
                          	setNotification('Enable Maintenance Mode For Host, errortext: ' + errortext, 'error');
                        }
                    }
                },
                error: function(json) {
                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                	swal({ title: "Error: Enable Maintenance Mode For Host!", text: errortext, type: "error", confirmButtonText: "확인" });
                  	
                  	setNotification('Enable Maintenance Mode For Host, errortext: ' + errortext, 'error');
                }
            });
        }, queryAsyncJobResultInterval);
  		
      }, error: function (json) {
      	console.log('prepareHostForMaintenance error');
      	
      	var responseText = json.responseText.split('~');
      	var errortext = JSON.parse(responseText[1]).preparehostformaintenanceresponse.errortext;

      	swal({ title: "Error: Enable Maintenance Mode For Host!", text: errortext, type: "error", confirmButtonText: "확인" });
      	
      	setNotification('Enable Maintenance Mode For Host, errortext: ' + errortext, 'error');
      }
  });	
}
var cancelMaintenanceModeForHost = function() {
	var hostid = quickviewId;
	$.ajax({
      url: setContextPath + "/admin/infra/cancelHostMaintenance",
      dataType: "json",
	        data: {"param": "&id=" + hostid},
      success: function (json) {
      	console.log('cancelHostMaintenance success');

      	swal({
            title: "Loading...",
            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
            allowEscapeKey: false,
            confirmButtonClass: "swalConfirmBtnClass",
            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
      	
      	var cancelMaintenanceModeForHostIntervalID = setInterval(function() {
            $.ajax({
                url: setContextPath + "/admin/infra/queryAsyncJobResult",
                dataType: "json",
                data: {"param": '&jobid=' + json.cancelhostmaintenanceresponse.jobid},
                success: function(json) {
                    var result = json.queryasyncjobresultresponse;
                    if (result.jobstatus == 0) {
                        return; //Job has not completed
                    } else {
                        clearInterval(cancelMaintenanceModeForHostIntervalID);

                        if (result.jobstatus == 1) {
                        	swal({ title: "Success!", text: 'Cancel Maintenance Mode For Host', type: "success", confirmButtonText: "확인" }).then(
                           			function() {
                           				window.location.reload();
                           			});
                         	
                     		setNotification('Cancel Maintenance Mode For Host', 'success');
                        } else if (result.jobstatus == 2) {
    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

    	                	swal({ title: "Error: Cancel Maintenance Mode For Host!", text: errortext, type: "error", confirmButtonText: "확인" });
                          	
                          	setNotification('Cancel Maintenance Mode For Host, errortext: ' + errortext, 'error');
                        }
                    }
                },
                error: function(json) {
                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                	swal({ title: "Error: Cancel Maintenance Mode For Host!", text: errortext, type: "error", confirmButtonText: "확인" });
                  	
                  	setNotification('Cancel Maintenance Mode For Host, errortext: ' + errortext, 'error');
                }
            });
        }, queryAsyncJobResultInterval);
  		
      }, error: function (json) {
      	console.log('cancelHostMaintenance error');
      	
      	var responseText = json.responseText.split('~');
      	
      	var errortext = JSON.parse(responseText[1]).cancelhostmaintenanceresponse.errortext;
      	

      	swal({ title: "Error: Cancel Maintenance For Host!", text: errortext, type: "error", confirmButtonText: "확인" });
      	
      	setNotification('Cancel Maintenance For Host, errortext: ' + errortext, 'error');
      }
  });	
}
var forceReconnectHost = function() {
	var hostid = quickviewId;
	$.ajax({
      url: setContextPath + "/admin/infra/reconnectHost",
      dataType: "json",
	        data: {"param": "&id=" + hostid},
      success: function (json) {
      	console.log('reconnectHost success');

      	swal({
            title: "Loading...",
            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
            allowEscapeKey: false,
            confirmButtonClass: "swalConfirmBtnClass",
            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
      	
      	var forceReconnectHostIntervalID = setInterval(function() {
            $.ajax({
                url: setContextPath + "/admin/infra/queryAsyncJobResult",
                dataType: "json",
                data: {"param": '&jobid=' + json.reconnecthostresponse.jobid},
                success: function(json) {
                    var result = json.queryasyncjobresultresponse;
                    if (result.jobstatus == 0) {
                        return; //Job has not completed
                    } else {
                        clearInterval(forceReconnectHostIntervalID);

                        if (result.jobstatus == 1) {
                        	swal({ title: "Success!", text: 'Cancel Maintenance Mode For Host', type: "success", confirmButtonText: "확인" }).then(
                           			function() {
                           				window.location.reload();
                           			});
                         	
                     		setNotification('Cancel Maintenance Mode For Host', 'success');
                        } else if (result.jobstatus == 2) {
    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

    	                	swal({ title: "Error: Cancel Maintenance Mode For Host!", text: errortext, type: "error", confirmButtonText: "확인" });
                          	
                          	setNotification('Cancel Maintenance Mode For Host, errortext: ' + errortext, 'error');
                        }
                    }
                },
                error: function(json) {
                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                	swal({ title: "Error: Cancel Maintenance Mode For Host!", text: errortext, type: "error", confirmButtonText: "확인" });
                  	
                  	setNotification('Cancel Maintenance Mode For Host, errortext: ' + errortext, 'error');
                }
            });
        }, queryAsyncJobResultInterval);

  		
      }, error: function (json) {
      	console.log('reconnectHost error');
      	
      	var responseText = json.responseText.split('~');
      	
      	var errortext = JSON.parse(responseText[1]).reconnecthostresponse.errortext;
      	

      	swal({ title: "Error: Reconnect Host!", text: errortext, type: "error", confirmButtonText: "확인" });
      	
      	setNotification('Reconnect Host, errortext: ' + errortext, 'error');
      }
  });	
}
var disableHost = function() {
	var hostid = quickviewId;
	
	$.ajax({
        url: setContextPath + "/admin/infra/updateHost",
        dataType: "json",
        data: {"param": "&id=" + hostid + "&allocationstate=Disable"},
        success: function (json) {
            console.log('updateHost success');

           	swal({ title: "Success!", text: 'Disable Host', type: "success", confirmButtonText: "확인" }).then(
           			function() {
           				window.location.reload();
           			});
         	
     		setNotification('Disable Host', 'success');
     		
         }, error: function (json) {
         	console.log('updateHost error');
         	
         	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).updateclusterresponse.errortext;
        	
        	
        	swal({ title: "Error: Disable Host!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
         	setNotification('Disable Host, errortext: ' + errortext, 'error');
         }
    });
}
var enableHost = function() {
	var hostid = quickviewId;
	
	$.ajax({
        url: setContextPath + "/admin/infra/updateHost",
        dataType: "json",
        data: {"param": "&id=" + hostid + "&allocationstate=Enable"},
        success: function (json) {
            console.log('updateHost success');

           	swal({ title: "Success!", text: 'Enable Host', type: "success", confirmButtonText: "확인" }).then(
           			function() {
           				window.location.reload();
           			});
         	
     		setNotification('Enable Host', 'success');
     		
         }, error: function (json) {
         	console.log('updateHost error');
         	
         	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).updateclusterresponse.errortext;
        	
        	
        	swal({ title: "Error: Enable Host!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
         	setNotification('Enable Host, errortext: ' + errortext, 'error');
         }
    });
}
var deleteHost = function() {
	var array = [];
	
	var hostid = quickviewId;
	var forceRemove = $('.modal#quickviewDeleteHost').find('.modal-body').find('input.forceRemove').prop('checked');
	
	array.push("&id=" + hostid);
	if(forceRemove) {
		array.push("&forced=true");		
	}
	
	$.ajax({
      url: setContextPath + "/admin/infra/deleteHost",
      dataType: "json",
	        data: {"param": array.join("")},
      success: function (json) {
      	console.log('deleteHost success');

      	swal({ title: "Success!", text: 'Delete Host, The host has been removed. Please eject the host from the XenServer Resource Pool.', type: "success", confirmButtonText: "확인" }).then(
      			function() {
      				window.location.reload();
      			});
    	
  		setNotification('Delete Host, The host has been removed. Please eject the host from the XenServer Resource Pool.', 'success');
  		
      }, error: function (json) {
      	console.log('deleteHost error');
      	
      	var responseText = json.responseText.split('~');
      	
      	var errortext = JSON.parse(responseText[1]).deletehostresponse.errortext;
      	

      	swal({ title: "Error: Delete Host!", text: errortext, type: "error", confirmButtonText: "확인" });
      	
      	setNotification('Delete Host, errortext: ' + errortext, 'error');
      }
  });
}
//primary storage
var enableStorageMaintenance = function() {
	var primaryStorageid = quickviewId;
	
	$.ajax({
      url: setContextPath + "/admin/infra/enableStorageMaintenance",
      dataType: "json",
	        data: {"param": "&id=" + primaryStorageid},
      success: function (json) {
      	console.log('enableStorageMaintenance success');

      	swal({
            title: "Loading...",
            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
            allowEscapeKey: false,
            confirmButtonClass: "swalConfirmBtnClass",
            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
      	
      	var enableStorageMaintenanceIntervalID = setInterval(function() {
            $.ajax({
                url: setContextPath + "/admin/infra/queryAsyncJobResult",
                dataType: "json",
                data: {"param": '&jobid=' + json.prepareprimarystorageformaintenanceresponse.jobid},
                success: function(json) {
                    var result = json.queryasyncjobresultresponse;
                    if (result.jobstatus == 0) {
                        return; //Job has not completed
                    } else {
                        clearInterval(enableStorageMaintenanceIntervalID);

                        if (result.jobstatus == 1) {
                        	swal({ title: "Success!", text: 'Enable Primary Storage Maintenance', type: "success", confirmButtonText: "확인" }).then(
                           			function() {
                           				window.location.reload();
                           			});
                         	
                     		setNotification('Enable Primary Storage Maintenance', 'success');
                        } else if (result.jobstatus == 2) {
    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

    	                	swal({ title: "Error: Enable Primary Storage Maintenance!", text: errortext, type: "error", confirmButtonText: "확인" });
                          	
                          	setNotification('Enable Primary Storage Maintenance, errortext: ' + errortext, 'error');
                        }
                    }
                },
                error: function(json) {
                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                	swal({ title: "Error: Enable Primary Storage Maintenance!", text: errortext, type: "error", confirmButtonText: "확인" });
                  	
                  	setNotification('Enable Primary Storage Maintenance, errortext: ' + errortext, 'error');
                }
            });
        }, queryAsyncJobResultInterval);
  		
      }, error: function (json) {
      	console.log('enableStorageMaintenance error');
      	
      	var responseText = json.responseText.split('~');
      	
      	var errortext = JSON.parse(responseText[1]).prepareprimarystorageformaintenanceresponse.errortext;
      	

      	swal({ title: "Error: Enable Storage Maintenance!", text: errortext, type: "error", confirmButtonText: "확인" });
      	
      	setNotification('Enable Primary Storage Maintenance, errortext: ' + errortext, 'error');
      }
  });	
}
var cancelStorageMaintenance = function() {
	var primaryStorageid = quickviewId;
	
	$.ajax({
      url: setContextPath + "/admin/infra/cancelStorageMaintenance",
      dataType: "json",
	        data: {"param": "&id=" + primaryStorageid},
      success: function (json) {
      	console.log('cancelStorageMaintenance success');

      	swal({
            title: "Loading...",
            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
            allowEscapeKey: false,
            confirmButtonClass: "swalConfirmBtnClass",
            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
      	
      	var cancelStorageMaintenanceIntervalID = setInterval(function() {
            $.ajax({
                url: setContextPath + "/admin/infra/queryAsyncJobResult",
                dataType: "json",
                data: {"param": '&jobid=' + json.cancelprimarystoragemaintenanceresponse.jobid},
                success: function(json) {
                    var result = json.queryasyncjobresultresponse;
                    if (result.jobstatus == 0) {
                        return; //Job has not completed
                    } else {
                        clearInterval(cancelStorageMaintenanceIntervalID);

                        if (result.jobstatus == 1) {
                        	swal({ title: "Success!", text: 'Cancel Primary Storage Maintenance', type: "success", confirmButtonText: "확인" }).then(
                           			function() {
                           				window.location.reload();
                           			});
                         	
                     		setNotification('Cancel Primary Storage Maintenance', 'success');
                        } else if (result.jobstatus == 2) {
    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

    	                	swal({ title: "Error: Cancel Primary Storage Maintenance!", text: errortext, type: "error", confirmButtonText: "확인" });
                          	
                          	setNotification('Cancel Primary Storage Maintenance, errortext: ' + errortext, 'error');
                        }
                    }
                },
                error: function(json) {
                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

                	swal({ title: "Error: Cancel Primary Storage Maintenance!", text: errortext, type: "error", confirmButtonText: "확인" });
                  	
                  	setNotification('Cancel Primary Storage Maintenance, errortext: ' + errortext, 'error');
                }
            });
        }, queryAsyncJobResultInterval);
     	
  		
      }, error: function (json) {
      	console.log('cancelStorageMaintenance error');
      	
      	var responseText = json.responseText.split('~');
      	
      	var errortext = JSON.parse(responseText[1]).cancelprimarystoragemaintenanceresponse.errortext;
      	

      	swal({ title: "Error: Cancel Primary Storage Maintenance!", text: errortext, type: "error", confirmButtonText: "확인" });
      	
      	setNotification('Cancel Primary Storage Maintenance, errortext: ' + errortext, 'error');
      }
  });	
	
}
var deleteStoragePool = function() {
	var array = [];
	
	var primarystorageid = quickviewId;
	var forceRemove = $('.modal#quickviewDeleteStoragePool').find('.modal-body').find('input.forceRemove').prop('checked');
	
	array.push("&id=" + primarystorageid);
	if(forceRemove) {
		array.push("&forced=true");		
	}
	
	$.ajax({
      url: setContextPath + "/admin/infra/deleteStoragePool",
      dataType: "json",
	        data: {"param": array.join("")},
      success: function (json) {
      	console.log('deleteStoragePool success');

      	swal({ title: "Success!", text: 'Delete Primary Storage.', type: "success", confirmButtonText: "확인" }).then(
      			function() {
      				window.location.reload();
      			});
    	
  		setNotification('Delete Primary Storage.', 'success');
  		
      }, error: function (json) {
      	console.log('deleteStoragePool error');
      	
      	var responseText = json.responseText.split('~');
      	
      	var errortext = JSON.parse(responseText[1]).deletestoragepoolresponse.errortext;
      	

      	swal({ title: "Error: Delete Primary Storage!", text: errortext, type: "error", confirmButtonText: "확인" });
      	
      	setNotification('Delete Primary Storage, errortext: ' + errortext, 'error');
      }
  });
}
//secondary storage
var deleteSecondaryStorage = function() {
	var id = quickviewId;
	
	console.log(id);
	$.ajax({
	    url: setContextPath + "/admin/infra/deleteImageStore",
        dataType: "json",
        data: {"param": "&id=" + id},
	    success: function(json) {
	    	console.log('deleteImageStore Success');
	    	
	    	setNotification('Delete Secondary Storage', 'success');
	    	
	    	swal({ title: "Success!", text: 'Delete Secondary Storage.', type: "success", confirmButtonText: "확인" }).then(
	      			function() {
	      				window.location.reload();
	      			});
	    }, error: function(json) {
	    	console.log('deleteImageStore error');
	    	
	    	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).deleteimagestoreresponse.errortext;
        	
        	
	    	setNotification('Delete Secondary Storage, errortext: ' + errortext, 'error');
	    	
	    	swal({ title: "Error: Delete Primary Storage!", text: errortext, type: "error", confirmButtonText: "확인" });
	    }
	});
	
}
//system VM
var startSystemVM = function() {
	var id = quickviewId;
	
	console.log(id);
	$.ajax({
	    url: setContextPath + "/admin/infra/startSystemVm",
        dataType: "json",
        data: {"param": "&id=" + id},
	    success: function(json) {
	    	console.log('startSystemVm Success');
	    	
	    	swal({
	            title: "Loading...",
	            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
	            allowEscapeKey: false,
	            confirmButtonClass: "swalConfirmBtnClass",
	            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
	    	
	    	var startSystemVMIntervalID = setInterval(function() {
	            $.ajax({
	                url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                dataType: "json",
	                data: {"param": '&jobid=' + json.startsystemvmresponse.jobid},
	                success: function(json) {
	                    var result = json.queryasyncjobresultresponse;
	                    if (result.jobstatus == 0) {
	                        return; //Job has not completed
	                    } else {
	                        clearInterval(startSystemVMIntervalID);

	                        if (result.jobstatus == 1) {
	                        	swal({ title: "Success!", text: 'Start System VM', type: "success", confirmButtonText: "확인" }).then(
	                           			function() {
	                           				window.location.reload();
	                           			});
	                         	
	                     		setNotification('Start System VM', 'success');
	                        } else if (result.jobstatus == 2) {
	    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

	                          	swal({ title: "Error: Start System VM!", text: errortext, type: "error", confirmButtonText: "확인" });
	                          	
	                          	setNotification('Start System VM, errortext: ' + errortext, 'error');
	                        }
	                    }
	                },
	                error: function(json) {
	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext
	                	
	                  	swal({ title: "Error: Start System VM!", text: errortext, type: "error", confirmButtonText: "확인" });
	                  	
	                  	setNotification('Start System VM, errortext: ' + errortext, 'error');
	                }
	            });
	        }, queryAsyncJobResultInterval);
	    	
	    }, error: function(json) {
	    	console.log('startSystemVm error');
	    	
	    	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).startsystemvmresponse.errortext;
        	
        	
	    	setNotification('Start System VM, errortext: ' + errortext, 'error');
	    	
	    	swal({ title: "Error: Start System VM!", text: errortext, type: "error", confirmButtonText: "확인" });
	    }
	});
}
var stopSystemVM = function() {
	var id = quickviewId;
	
	console.log(id);
	$.ajax({
	    url: setContextPath + "/admin/infra/stopSystemVm",
        dataType: "json",
        data: {"param": "&id=" + id},
	    success: function(json) {
	    	console.log('stopSystemVm Success');
	    	
	    	swal({
	            title: "Loading...",
	            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
	            allowEscapeKey: false,
	            confirmButtonClass: "swalConfirmBtnClass",
	            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
	    	
	    	var stopSystemVMIntervalID = setInterval(function() {
	            $.ajax({
	                url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                dataType: "json",
	                data: {"param": '&jobid=' + json.stopsystemvmresponse.jobid},
	                success: function(json) {
	                    var result = json.queryasyncjobresultresponse;
	                    if (result.jobstatus == 0) {
	                        return; //Job has not completed
	                    } else {
	                        clearInterval(stopSystemVMIntervalID);

	                        if (result.jobstatus == 1) {
	                        	swal({ title: "Success!", text: 'Stop System VM', type: "success", confirmButtonText: "확인" }).then(
	                           			function() {
	                           				window.location.reload();
	                           			});
	                         	
	                     		setNotification('Stop System VM', 'success');
	                        } else if (result.jobstatus == 2) {
	    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext
	                        	
	                          	swal({ title: "Error: Stop System VM!", text: errortext, type: "error", confirmButtonText: "확인" });
	                          	
	                          	setNotification('Stop System VM, errortext: ' + errortext, 'error');
	                        }
	                    }
	                },
	                error: function(json) {
	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

	                	swal({ title: "Error: Stop System VM!", text: errortext, type: "error", confirmButtonText: "확인" });
	                  	
	                  	setNotification('Stop System VM, errortext: ' + errortext, 'error');
	                }
	            });
	        }, queryAsyncJobResultInterval);
	    	
	    }, error: function(json) {
	    	console.log('stopSystemVm error');
	    	
	    	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).stopsystemvmresponse.errortext;
        	
        	
	    	setNotification('Stop System VM, errortext: ' + errortext, 'error');
	    	
	    	swal({ title: "Error: Stop System VM!", text: errortext, type: "error", confirmButtonText: "확인" });
	    }
	});
}
var rebootSystemVM = function() {
	var id = quickviewId;
	
	console.log(id);
	$.ajax({
	    url: setContextPath + "/admin/infra/rebootSystemVm",
        dataType: "json",
        data: {"param": "&id=" + id},
	    success: function(json) {
	    	console.log('rebootSystemVm Success');
	    	
	    	swal({
	            title: "Loading...",
	            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
	            allowEscapeKey: false,
	            confirmButtonClass: "swalConfirmBtnClass",
	            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
	    	
	    	var restartSystemVMIntervalID = setInterval(function() {
	            $.ajax({
	                url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                dataType: "json",
	                data: {"param": '&jobid=' + json.rebootsystemvmresponse.jobid},
	                success: function(json) {
	                    var result = json.queryasyncjobresultresponse;
	                    if (result.jobstatus == 0) {
	                        return; //Job has not completed
	                    } else {
	                        clearInterval(restartSystemVMIntervalID);

	                        if (result.jobstatus == 1) {
	                        	swal({ title: "Success!", text: 'Reboot System VM', type: "success", confirmButtonText: "확인" }).then(
	                           			function() {
	                           				window.location.reload();
	                           			});
	                         	
	                     		setNotification('Reboot System VM', 'success');
	                        } else if (result.jobstatus == 2) {
	    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

	    	                	swal({ title: "Error: Reboot System VM!", text: errortext, type: "error", confirmButtonText: "확인" });
	                          	
	                          	setNotification('Reboot System VM, errortext: ' + errortext, 'error');
	                        }
	                    }
	                },
	                error: function(json) {
	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

	                	swal({ title: "Error: Reboot System VM!", text: errortext, type: "error", confirmButtonText: "확인" });
	                  	
	                  	setNotification('Reboot System VM, errortext: ' + errortext, 'error');
	                }
	            });
	        }, queryAsyncJobResultInterval);
	    	
	    }, error: function(json) {
	    	console.log('rebootSystemVm error');
	    	
	    	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).rebootsystemvmresponse.errortext;
        	
        	
	    	setNotification('Reboot System VM, errortext: ' + errortext, 'error');
	    	
	    	swal({ title: "Error: Reboot System VM!", text: errortext, type: "error", confirmButtonText: "확인" });
	    }
	});
}
var destroySystemVM = function() {
	var id = quickviewId;
	
	console.log(id);
	$.ajax({
	    url: setContextPath + "/admin/infra/destroySystemVm",
        dataType: "json",
        data: {"param": "&id=" + id},
	    success: function(json) {
	    	console.log('destroySystemVm Success');
	    	
	    	swal({
	            title: "Loading...",
	            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
	            allowEscapeKey: false,
	            confirmButtonClass: "swalConfirmBtnClass",
	            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
	    	
	    	var restartSystemVMIntervalID = setInterval(function() {
	            $.ajax({
	                url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                dataType: "json",
	                data: {"param": '&jobid=' + json.destroysystemvmresponse.jobid},
	                success: function(json) {
	                    var result = json.queryasyncjobresultresponse;
	                    if (result.jobstatus == 0) {
	                        return; //Job has not completed
	                    } else {
	                        clearInterval(restartSystemVMIntervalID);

	                        if (result.jobstatus == 1) {
	                        	swal({ title: "Success!", text: 'Destroy System VM', type: "success", confirmButtonText: "확인" }).then(
	                           			function() {
	                           				window.location.reload();
	                           			});
	                         	
	                     		setNotification('Destroy System VM', 'success');
	                        } else if (result.jobstatus == 2) {
	    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

	    	                	swal({ title: "Error: Destroy System VM!", text: errortext, type: "error", confirmButtonText: "확인" });
	                          	
	                          	setNotification('Destroy System VM, errortext: ' + errortext, 'error');
	                        }
	                    }
	                },
	                error: function(json) {
	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

	                	swal({ title: "Error: Destroy System VM!", text: errortext, type: "error", confirmButtonText: "확인" });
	                  	
	                  	setNotification('Destroy System VM, errortext: ' + errortext, 'error');
	                }
	            });
	        }, queryAsyncJobResultInterval);
	    	
	    }, error: function(json) {
	    	console.log('destroySystemVm error');
	    	
	    	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).destroysystemvmresponse.errortext;
        	
        	
	    	setNotification('Destroy System VM, errortext: ' + errortext, 'error');
	    	
	    	swal({ title: "Error: Destroy System VM!", text: errortext, type: "error", confirmButtonText: "확인" });
	    }
	});
}
var migrateSystemVM = function() {
	var id = quickviewId;
	var hostid = $('.modal#quickviewMigrateSystemVM').find('.modal-body').find('select.hostid').val();
	
	if(isValidEssential('.modal#quickviewMigrateSystemVM', "")) {	
		$.ajax({
		    url: setContextPath + "/admin/infra/migrateSystemVm",
	        dataType: "json",
	        data: {"param": "&hostid=" + hostid + "&virtualmachineid=" + id},
		    success: function(json) {
		    	console.log('migrateSystemVm Success');
		    	
		    	swal({
		            title: "Loading...",
		            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
		            allowEscapeKey: false,
		            confirmButtonClass: "swalConfirmBtnClass",
		            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
		    	
		    	var migrateSystemVMIntervalID = setInterval(function() {
		            $.ajax({
		                url: setContextPath + "/admin/infra/queryAsyncJobResult",
		                dataType: "json",
		                data: {"param": '&jobid=' + json.migratesystemvmresponse.jobid},
		                success: function(json) {
		                    var result = json.queryasyncjobresultresponse;
		                    if (result.jobstatus == 0) {
		                        return; //Job has not completed
		                    } else {
		                        clearInterval(migrateSystemVMIntervalID);

		                        if (result.jobstatus == 1) {
		                        	location.href = setContextPath + "/admin/infra/systemVmsRedirect?param=" + '&id=' + json.queryasyncjobresultresponse.jobresult.systemvm.id; //listRouters
		         		            
		                        } else if (result.jobstatus == 2) {
		    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

		    	                	swal({ title: "Error: Migrate System VM!", text: errortext, type: "error", confirmButtonText: "확인" });
		                          	
		                          	setNotification('Migrate System VM, errortext: ' + errortext, 'error');
		                        }
		                    }
		                },
		                error: function(json) {
		                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

		                	swal({ title: "Error: Migrate System VM!", text: errortext, type: "error", confirmButtonText: "확인" });
		                  	
		                  	setNotification('Migrate System VM, errortext: ' + errortext, 'error');
		                }
		            });
		        }, queryAsyncJobResultInterval);
		    		    	
		    }, error: function(json) {
		    	console.log('migrateSystemVm error');
		    	
		    	var responseText = json.responseText.split('~');
		    	
		    	var errortext = JSON.parse(responseText[1]).migratesystemvmresponse.errortext;
		    	
		    	
		    	setNotification('Migrate System VM, errortext: ' + errortext, 'error');
		    	
		    	swal({ title: "Error: Migrate System VM!", text: errortext, type: "error", confirmButtonText: "확인" });
		    }
		});		
	}
}
var scaleUpSystemVM = function() {
	var id = quickviewId;
	
	console.log(id);
	$.ajax({
	    url: setContextPath + "/admin/infra/scaleSystemVm",
        dataType: "json",
        data: {"param": "&id=" + id},
	    success: function(json) {
	    	console.log('scaleSystemVm Success');
	    	
	    	swal({
	            title: "Loading...",
	            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
	            allowEscapeKey: false,
	            confirmButtonClass: "swalConfirmBtnClass",
	            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
	    	
	    	var restartSystemVMIntervalID = setInterval(function() {
	            $.ajax({
	                url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                dataType: "json",
	                data: {"param": '&jobid=' + json.changeserviceforsystemvmresponse.jobid},
	                success: function(json) {
	                    var result = json.queryasyncjobresultresponse;
	                    if (result.jobstatus == 0) {
	                        return; //Job has not completed
	                    } else {
	                        clearInterval(restartSystemVMIntervalID);

	                        if (result.jobstatus == 1) {
	                        	swal({ title: "Success!", text: 'Change Service Offering(VM)', type: "success", confirmButtonText: "확인" }).then(
	                           			function() {
	                           				window.location.reload();
	                           			});
	                         	
	                     		setNotification('Change Service Offering(VM)', 'success');
	                        } else if (result.jobstatus == 2) {
	    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

	    	                	swal({ title: "Error: Change Service Offering(VM)!", text: errortext, type: "error", confirmButtonText: "확인" });
	                          	
	                          	setNotification('Change Service Offering(VM), errortext: ' + errortext, 'error');
	                        }
	                    }
	                },
	                error: function(json) {
	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

	                	swal({ title: "Error: Change Service Offering(VM)!", text: errortext, type: "error", confirmButtonText: "확인" });
	                  	
	                  	setNotification('Change Service Offering(VM), errortext: ' + errortext, 'error');
	                }
	            });
	        }, queryAsyncJobResultInterval);
	    	
	    }, error: function(json) {
	    	console.log('scaleSystemVm error');
	    	
	    	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).changeserviceforsystemvmresponse.errortext;
        	
        	
	    	setNotification('Change Service Offering(VM), errortext: ' + errortext, 'error');
	    	
	    	swal({ title: "Error: Change Service Offering(VM)!", text: errortext, type: "error", confirmButtonText: "확인" });
	    }
	});
}
//router
var startRouter = function() {
	var id = quickviewId;
	
	console.log(id);
	$.ajax({
	    url: setContextPath + "/admin/infra/startRouter",
        dataType: "json",
        data: {"param": "&id=" + id},
	    success: function(json) {
	    	console.log('startRouter Success');
	    	
	    	swal({
	            title: "Loading...",
	            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
	            allowEscapeKey: false,
	            confirmButtonClass: "swalConfirmBtnClass",
	            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
	    	
	    	var startRouterIntervalID = setInterval(function() {
	            $.ajax({
	                url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                dataType: "json",
	                data: {"param": '&jobid=' + json.startrouterresponse.jobid},
	                success: function(json) {
	                    var result = json.queryasyncjobresultresponse;
	                    if (result.jobstatus == 0) {
	                        return; //Job has not completed
	                    } else {
	                        clearInterval(startRouterIntervalID);

	                        if (result.jobstatus == 1) {
	                        	swal({ title: "Success!", text: 'Start Router', type: "success", confirmButtonText: "확인" }).then(
	                           			function() {
	                           				window.location.reload();
	                           			});
	                         	
	                     		setNotification('Start Router', 'success');
	                        } else if (result.jobstatus == 2) {
	    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

	                          	swal({ title: "Error: Start Router!", text: errortext, type: "error", confirmButtonText: "확인" });
	                          	
	                          	setNotification('Start Router, errortext: ' + errortext, 'error');
	                        }
	                    }
	                },
	                error: function(json) {
	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext
	                	
	                  	swal({ title: "Error: Start Router!", text: errortext, type: "error", confirmButtonText: "확인" });
	                  	
	                  	setNotification('Start Router, errortext: ' + errortext, 'error');
	                }
	            });
	        }, queryAsyncJobResultInterval);
	    	
	    }, error: function(json) {
	    	console.log('startRouter error');
	    	
	    	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).startrouterresponse.errortext;
        	
        	
	    	setNotification('Start Router, errortext: ' + errortext, 'error');
	    	
	    	swal({ title: "Error: Start Router!", text: errortext, type: "error", confirmButtonText: "확인" });
	    }
	});
}
var stopRouter = function() {
	var id = quickviewId;
	var forceStop = $('.modal#quickviewStopRouter').find('.modal-body').find('input.forceStop').prop('checked');
	
	var array = [];
	array.push("&id=" + id);
	array.push("&forced=" + forceStop);
	
	$.ajax({
	    url: setContextPath + "/admin/infra/stopRouter",
        dataType: "json",
        data: {"param": array.join("")},
	    success: function(json) {
	    	console.log('stopRouter Success');
	    	
	    	swal({
	            title: "Loading...",
	            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
	            allowEscapeKey: false,
	            confirmButtonClass: "swalConfirmBtnClass",
	            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
	    	
	    	var stopRouterIntervalID = setInterval(function() {
	            $.ajax({
	                url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                dataType: "json",
	                data: {"param": '&jobid=' + json.stoprouterresponse.jobid},
	                success: function(json) {
	                    var result = json.queryasyncjobresultresponse;
	                    if (result.jobstatus == 0) {
	                        return; //Job has not completed
	                    } else {
	                        clearInterval(stopRouterIntervalID);

	                        if (result.jobstatus == 1) {
	                        	swal({ title: "Success!", text: 'Stop Router', type: "success", confirmButtonText: "확인" }).then(
	                           			function() {
	                           				window.location.reload();
	                           			});
	                         	
	                     		setNotification('Stop Router', 'success');
	                        } else if (result.jobstatus == 2) {
	    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext
	                        	
	                          	swal({ title: "Error: Stop Router!", text: errortext, type: "error", confirmButtonText: "확인" });
	                          	
	                          	setNotification('Stop Router, errortext: ' + errortext, 'error');
	                        }
	                    }
	                },
	                error: function(json) {
	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

	                	swal({ title: "Error: Stop Router!", text: errortext, type: "error", confirmButtonText: "확인" });
	                  	
	                  	setNotification('Stop Router, errortext: ' + errortext, 'error');
	                }
	            });
	        }, queryAsyncJobResultInterval);
	    	
	    }, error: function(json) {
	    	console.log('stopRouter error');
	    	
	    	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).stoprouterresponse.errortext;
        	
        	
	    	setNotification('Stop Router, errortext: ' + errortext, 'error');
	    	
	    	swal({ title: "Error: Stop Router!", text: errortext, type: "error", confirmButtonText: "확인" });
	    }
	});
}
var rebootRouter= function() {
	var id = quickviewId;
	
	console.log(id);
	$.ajax({
	    url: setContextPath + "/admin/infra/rebootRouter",
        dataType: "json",
        data: {"param": "&id=" + id},
	    success: function(json) {
	    	console.log('rebootRouter Success');
	    	
	    	swal({
	            title: "Loading...",
	            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
	            allowEscapeKey: false,
	            confirmButtonClass: "swalConfirmBtnClass",
	            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
	    	
	    	var rebootRouterIntervalID = setInterval(function() {
	            $.ajax({
	                url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                dataType: "json",
	                data: {"param": '&jobid=' + json.rebootrouterresponse.jobid},
	                success: function(json) {
	                    var result = json.queryasyncjobresultresponse;
	                    if (result.jobstatus == 0) {
	                        return; //Job has not completed
	                    } else {
	                        clearInterval(rebootRouterIntervalID);

	                        if (result.jobstatus == 1) {
	                        	swal({ title: "Success!", text: 'Reboot Router', type: "success", confirmButtonText: "확인" }).then(
	                           			function() {
	                           				window.location.reload();
	                           			});
	                         	
	                     		setNotification('Reboot Router', 'success');
	                        } else if (result.jobstatus == 2) {
	    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

	    	                	swal({ title: "Error: Reboot Router!", text: errortext, type: "error", confirmButtonText: "확인" });
	                          	
	                          	setNotification('Reboot Router, errortext: ' + errortext, 'error');
	                        }
	                    }
	                },
	                error: function(json) {
	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

	                	swal({ title: "Error: Reboot Router!", text: errortext, type: "error", confirmButtonText: "확인" });
	                  	
	                  	setNotification('Reboot Router, errortext: ' + errortext, 'error');
	                }
	            });
	        }, queryAsyncJobResultInterval);
	    	
	    }, error: function(json) {
	    	console.log('rebootRouter error');
	    	
	    	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).rebootrouterresponse.errortext;
        	
        	
	    	setNotification('Reboot System VM, errortext: ' + errortext, 'error');
	    	
	    	swal({ title: "Error: Reboot System VM!", text: errortext, type: "error", confirmButtonText: "확인" });
	    }
	});
}
var destroyRouter = function() {
	var id = quickviewId;
	
	console.log(id);
	$.ajax({
	    url: setContextPath + "/admin/infra/destroyRouter",
        dataType: "json",
        data: {"param": "&id=" + id},
	    success: function(json) {
	    	console.log('destroyRouter Success');
	    	
	    	swal({
	            title: "Loading...",
	            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
	            allowEscapeKey: false,
	            confirmButtonClass: "swalConfirmBtnClass",
	            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
	    	
	    	var restartSystemVMIntervalID = setInterval(function() {
	            $.ajax({
	                url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                dataType: "json",
	                data: {"param": '&jobid=' + json.destroyrouterresponse.jobid},
	                success: function(json) {
	                    var result = json.queryasyncjobresultresponse;
	                    if (result.jobstatus == 0) {
	                        return; //Job has not completed
	                    } else {
	                        clearInterval(restartSystemVMIntervalID);

	                        if (result.jobstatus == 1) {
	                        	swal({ title: "Success!", text: 'Destroy Router', type: "success", confirmButtonText: "확인" }).then(
	                           			function() {
	                           				window.location.reload();
	                           			});
	                         	
	                     		setNotification('Destroy System VM', 'success');
	                        } else if (result.jobstatus == 2) {
	    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

	    	                	swal({ title: "Error: Destroy Router!", text: errortext, type: "error", confirmButtonText: "확인" });
	                          	
	                          	setNotification('Destroy Router, errortext: ' + errortext, 'error');
	                        }
	                    }
	                },
	                error: function(json) {
	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

	                	swal({ title: "Error: Destroy Router!", text: errortext, type: "error", confirmButtonText: "확인" });
	                  	
	                  	setNotification('Destroy Router, errortext: ' + errortext, 'error');
	                }
	            });
	        }, queryAsyncJobResultInterval);
	    	
	    }, error: function(json) {
	    	console.log('destroyRouter error');
	    	
	    	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).destroyrouterresponse.errortext;
        	
        	
	    	setNotification('Destroy Router, errortext: ' + errortext, 'error');
	    	
	    	swal({ title: "Error: Destroy Router!", text: errortext, type: "error", confirmButtonText: "확인" });
	    }
	});
}
var migrateRouter = function() {
	var id = quickviewId;
	var hostid = $('.modal#quickviewMigrateSystemVM').find('.modal-body').find('select.hostid').val();
	
	if(isValidEssential('.modal#quickviewMigrateSystemVM', "")) {	
		$.ajax({
		    url: setContextPath + "/admin/infra/migrateSystemVm",
	        dataType: "json",
	        data: {"param": "&hostid=" + hostid + "&virtualmachineid=" + id},
		    success: function(json) {
		    	console.log('migrateSystemVm Success');
		    	
		    	swal({
		            title: "Loading...",
		            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
		            allowEscapeKey: false,
		            confirmButtonClass: "swalConfirmBtnClass",
		            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
		    	
		    	var migrateSystemVMIntervalID = setInterval(function() {
		            $.ajax({
		                url: setContextPath + "/admin/infra/queryAsyncJobResult",
		                dataType: "json",
		                data: {"param": '&jobid=' + json.migratesystemvmresponse.jobid},
		                success: function(json) {
		                    var result = json.queryasyncjobresultresponse;
		                    if (result.jobstatus == 0) {
		                        return; //Job has not completed
		                    } else {
		                        clearInterval(migrateSystemVMIntervalID);

		                        if (result.jobstatus == 1) {
	         		                location.href = setContextPath + "/admin/infra/routersRedirect?param=" + '&id=' + json.queryasyncjobresultresponse.jobresult.systemvm.id; //listRouters
		         		              		                        	
		                        } else if (result.jobstatus == 2) {
		    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

		    	                	swal({ title: "Error: Migrate Router!", text: errortext, type: "error", confirmButtonText: "확인" });
		                          	
		                          	setNotification('Migrate Router, errortext: ' + errortext, 'error');
		                        }
		                    }
		                },
		                error: function(json) {
		                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

		                	swal({ title: "Error: Migrate Router!", text: errortext, type: "error", confirmButtonText: "확인" });
		                  	
		                  	setNotification('Migrate Router, errortext: ' + errortext, 'error');
		                }
		            });
		        }, queryAsyncJobResultInterval);
		    		    	
		    }, error: function(json) {
		    	console.log('migrateSystemVm error');
		    	
		    	var responseText = json.responseText.split('~');
		    	
		    	var errortext = JSON.parse(responseText[1]).migratesystemvmresponse.errortext;
		    	
		    	
		    	setNotification('Migrate Router, errortext: ' + errortext, 'error');
		    	
		    	swal({ title: "Error: Migrate Router!", text: errortext, type: "error", confirmButtonText: "확인" });
		    }
		});		
	}
}
var scaleUpRouter = function() {
	var id = quickviewId;
	
	console.log(id);
	$.ajax({
	    url: setContextPath + "/admin/infra/scaleSystemVm",
        dataType: "json",
        data: {"param": "&id=" + id},
	    success: function(json) {
	    	console.log('scaleSystemVm Success');
	    	
	    	swal({
	            title: "Loading...",
	            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
	            allowEscapeKey: false,
	            confirmButtonClass: "swalConfirmBtnClass",
	            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
	    	
	    	var restartSystemVMIntervalID = setInterval(function() {
	            $.ajax({
	                url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                dataType: "json",
	                data: {"param": '&jobid=' + json.changeserviceforsystemvmresponse.jobid},
	                success: function(json) {
	                    var result = json.queryasyncjobresultresponse;
	                    if (result.jobstatus == 0) {
	                        return; //Job has not completed
	                    } else {
	                        clearInterval(restartSystemVMIntervalID);

	                        if (result.jobstatus == 1) {
	                        	swal({ title: "Success!", text: 'Change Service Offering(Router)', type: "success", confirmButtonText: "확인" }).then(
	                           			function() {
	                           				window.location.reload();
	                           			});
	                         	
	                     		setNotification('Change Service Offering(Router)', 'success');
	                        } else if (result.jobstatus == 2) {
	    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

	    	                	swal({ title: "Error: Change Service Offering(Router)!", text: errortext, type: "error", confirmButtonText: "확인" });
	                          	
	                          	setNotification('Change Service Offering(Router), errortext: ' + errortext, 'error');
	                        }
	                    }
	                },
	                error: function(json) {
	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

	                	swal({ title: "Error: Change Service Offering(Router)!", text: errortext, type: "error", confirmButtonText: "확인" });
	                  	
	                  	setNotification('Change Service Offering(Router), errortext: ' + errortext, 'error');
	                }
	            });
	        }, queryAsyncJobResultInterval);
	    	
	    }, error: function(json) {
	    	console.log('scaleSystemVm error');
	    	
	    	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).changeserviceforsystemvmresponse.errortext;
        	
        	
	    	setNotification('Change Service Offering(Router), errortext: ' + errortext, 'error');
	    	
	    	swal({ title: "Error: Change Service Offering(Router)!", text: errortext, type: "error", confirmButtonText: "확인" });
	    }
	});
}
var upgradeRouterToUseNewerTemplate = function() {
	var id = quickviewId;
	
	console.log(id);
	$.ajax({
	    url: setContextPath + "/admin/infra/upgradeRouterTemplate",
        dataType: "json",
        data: {"param": "&id=" + id},
	    success: function(json) {
	    	console.log('upgradeRouterTemplate Success');
	    	
	    	swal({
	            title: "Loading...",
	            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
	            allowEscapeKey: false,
	            confirmButtonClass: "swalConfirmBtnClass",
	            imageUrl: setContextPath + '/resources/img/loading/loading5.gif',
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
	    	
	    	var startRouterIntervalID = setInterval(function() {
	            $.ajax({
	                url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                dataType: "json",
	                data: {"param": '&jobid=' + json.upgraderoutertemplateresponse.jobid},
	                success: function(json) {
	                    var result = json.queryasyncjobresultresponse;
	                    if (result.jobstatus == 0) {
	                        return; //Job has not completed
	                    } else {
	                        clearInterval(startRouterIntervalID);

	                        if (result.jobstatus == 1) {
	                        	swal({ title: "Success!", text: 'Upgrade Router To Use Newer Template', type: "success", confirmButtonText: "확인" }).then(
	                           			function() {
	                           				window.location.reload();
	                           			});
	                         	
	                     		setNotification('Upgrade Router To Use Newer Template', 'success');
	                        } else if (result.jobstatus == 2) {
	    	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext

	                          	swal({ title: "Error: Upgrade Router To Use Newer Template!", text: errortext, type: "error", confirmButtonText: "확인" });
	                          	
	                          	setNotification('Upgrade Router To Use Newer Template, errortext: ' + errortext, 'error');
	                        }
	                    }
	                },
	                error: function(json) {
	                	var errortext = "errorcode: " + json.queryasyncjobresultresponse.jobresult.errorcode + "errortext: " + json.queryasyncjobresultresponse.jobresult.errortext
	                	
	                  	swal({ title: "Error: Upgrade Router To Use Newer Template!", text: errortext, type: "error", confirmButtonText: "확인" });
	                  	
	                  	setNotification('Upgrade Router To Use Newer Template, errortext: ' + errortext, 'error');
	                }
	            });
	        }, queryAsyncJobResultInterval);
	    	
	    }, error: function(json) {
	    	console.log('upgradeRouterTemplate error');
	    	
	    	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).upgraderoutertemplateresponse.errortext;
        	
        	
	    	setNotification('Upgrade Router To Use Newer Template, errortext: ' + errortext, 'error');
	    	
	    	swal({ title: "Error: Upgrade Router To Use Newer Template!", text: errortext, type: "error", confirmButtonText: "확인" });
	    }
	});
}


/* zone
var addVmwareDc = function() {
	if(isValidEssential('.modal#quickviewAddVmwareDc', "")) {		
	    var zoneid = quickviewId;
	    var name = $('.modal#quickviewAddVmwareDc').find('.modal-body').find('input.dcname').val();
	    var vcenter = $('.modal#quickviewAddVmwareDc').find('.modal-body').find('input.vcenter').val();
	    var username = $('.modal#quickviewAddVmwareDc').find('.modal-body').find('input.username').val();
	    var password = $('.modal#quickviewAddVmwareDc').find('.modal-body').find('input.password').val();

	    var array = [];
	    array.push("&name=" + name);
	    array.push("&zoneid=" + zoneid);
	    array.push("&vcenter=" + vcenter);
	    
	    if (username != null && username.length > 0) {
	        array.push("&username=" + username);
	    }
	    if (password != null && password.length > 0) {
	        array.push("&password=" + password);
	    }

	    $.ajax({
	        url: setContextPath + "/admin/infra/addVmwareDc",
	        dataType: "json",
	        data: {"param": array.join("")},
	        success: function (json) {
	         	console.log('addVmwareDc success');
	         	
	           	swal({ title: "Success!", text: 'Add Vmware datacenter', type: "success", confirmButtonText: "확인" });
	         	
	     		setNotification('Add Vmware datacenter', 'success');
	     		
	         }, error: function (json) {
	         	console.log('addVmwareDc error');
	         	
	         	var responseText = json.responseText.split('~');
	        	
	        	var errortext = JSON.parse(responseText[1]).addvmwaredcresponse.errortext;
	        	
	        	
	           	swal({ title: "Error: Add Vmware datacenter!", text: errortext, type: "error", confirmButtonText: "확인" });

	         	setNotification('Add Vmware datacenter, errortext: ' + errortext, 'error');
	         }
	    });		
	    $('.modla#quickviewAddVmwareDc').modal('hide');
	}
}
var removeVmwareDc = function() {
	var zoneid = quickviewId
    $.ajax({
    	url: setContextPath + "/admin/infra/removeVmwareDc",
        dataType: "json",
        data: {"param": "&zoneid=" + zoneid},
        success: function (json) {
         	console.log('removeVmwareDc success');
         	
           	swal({ title: "Success!", text: 'Remove Vmware Datacenter', type: "success", confirmButtonText: "확인" });
         	
     		setNotification('Remove Vmware Datacenter', 'success');
         }, error: function (json) {
         	console.log('removeVmwareDc error');
         	
         	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).removevmwaredcresponse.errortext;
        	
        	
        	swal({ title: "Error: Remove Vmware Datacenter!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
         	setNotification('Remove Vmware Datacenter, errortext: ' + errortext, 'error');
         }
    });
}
*/
/* host
var configureHAForHost = function() {
	var hostid = quickviewId;
	
	$.ajax({
        url: setContextPath + "/admin/infra/configureHAForHost",
        dataType: "json",
        data: {"param": "&id=" + hostid},
        success: function (json) {
            console.log('configureHAForHost success');

            var jobid = json.preparehostformaintenanceresponse.jobid;
           	loadingImageMethod(jobid, 'Configure HA For Host');
     		
         }, error: function (json) {
         	console.log('configureHAForHost error');
         	
         	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).updateclusterresponse.errortext;
        	
        	
        	swal({ title: "Error: Configure HA For Host!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
         	setNotification('Configure HA For Host, errortext: ' + errortext, 'error');
         }
    });
}
var enableHAForHost = function() {
	var hostid = quickviewId;
	
	$.ajax({
        url: setContextPath + "/admin/infra/enableHAForHost",
        dataType: "json",
        data: {"param": "&id=" + hostid},
        success: function (json) {
            console.log('enableHAForHost success');

            var jobid = json.preparehostformaintenanceresponse.jobid;
           	loadingImageMethod(jobid, 'Enable HA For Host');
     		
         }, error: function (json) {
         	console.log('enableHAForHost error');
         	
         	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).enablehaforhostresponse.errortext;
        	
        	
        	swal({ title: "Error: Enable HA For Host!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
         	setNotification('Enable HA For Host, errortext: ' + errortext, 'error');
         }
    });
}
var disableHAForHost = function() {
	var hostid = quickviewId;
	
	$.ajax({
        url: setContextPath + "/admin/infra/disableHAForHost",
        dataType: "json",
        data: {"param": "&id=" + hostid},
        success: function (json) {
            console.log('disableHAForHost success');

            var jobid = json.preparehostformaintenanceresponse.jobid;
           	loadingImageMethod(jobid, 'Disable HA For Host');
     		
         }, error: function (json) {
         	console.log('disableHAForHost error');
         	
         	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).enablehaforhostresponse.errortext;
        	
        	
        	swal({ title: "Error: Disable HA For Host!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
         	setNotification('Disable HA For Host, errortext: ' + errortext, 'error');
         }
    });
}
var configureOutOfBandManagementForHost = function() {
	if(isValidEssential('.modal#quickviewConfigureOutOfBandManagement', "")) {		
		var array =[];
		
		var hostid = quickviewId;
		var address = $('.modal#quickviewConfigureOutOfBandManagement').find('.modal-body').find('input.address').val(); 
		var port = $('.modal#quickviewConfigureOutOfBandManagement').find('.modal-body').find('input.port').val();
		var username = $('.modal#quickviewConfigureOutOfBandManagement').find('.modal-body').find('input.username').val();
		var password = $('.modal#quickviewConfigureOutOfBandManagement').find('.modal-body').find('input.password').val();
		var driver = $('.modal#quickviewConfigureOutOfBandManagement').find('.modal-body').find('select.driver').val();
		
		array.push("&hostid=" + hostid);
		array.push("&address=" + address);
		array.push("&port=" + port);
		array.push("&username=" + username);
		array.push("&password=" + password);
		array.push("&driver=" + driver);
		
		$.ajax({
	        url: setContextPath + "/admin/infra/configureOutOfBandManagement",
	        dataType: "json",
	        data: {"param": array.join("")},
	        success: function (json) {
	            console.log('configureOutOfBandManagement success');

	            var jobid = json.configureoutofbandmanagementresponse.jobid;
	           	loadingImageMethod(jobid, 'Configure Out-of-band Management');
	      		
	         }, error: function (json) {
	         	console.log('configureOutOfBandManagement error');
	         	
	         	var responseText = json.responseText.split('~');
	        	
	        	var errortext = JSON.parse(responseText[1]).configureoutofbandmanagementresponse.errortext;
	        	
	        	
	        	swal({ title: "Error: Configure Out-of-band Management!", text: errortext, type: "error", confirmButtonText: "확인" });
	        	
	         	setNotification('Configure Out-of-band Management, errortext: ' + errortext, 'error');
	         }
	    });
	}
}
var issueOutOfBandManagementPowerAction = function() {
	var array =[];
	
	var hostid = quickviewId;
	var action = $('.modal#quickviewIssueOutOfBandManagementPowerAction').find('.modal-body').find('select.action').val(); 
	
	array.push("&hostid=" + hostid);
	array.push("&action=" + action);
	
	
	$.ajax({
        url: setContextPath + "/admin/infra/issueOutOfBandManagementPowerAction",
        dataType: "json",
        data: {"param": array.join("")},
        success: function (json) {
            console.log('issueOutOfBandManagementPowerAction success');

            var jobid = json.issueoutofbandmanagementpoweractionresponse.jobid;
           	loadingImageMethod(jobid, 'Issue Out-of-band Management Power Action: ' + action);
      		
         }, error: function (json) {
         	console.log('issueOutOfBandManagementPowerAction error');
         	
         	var responseText = json.responseText.split('~');
        	
        	var errortext = JSON.parse(responseText[1]).issueoutofbandmanagementpoweractionresponse.errortext;
        	
        	
        	swal({ title: "Error: Issue Out-of-band Management Power Action!", text: errortext, type: "error", confirmButtonText: "확인" });
        	
         	setNotification('Issue Out-of-band Management Power Action, errortext: ' + errortext, 'error');
         }
    });
}
var changeOutOfBandManagementPassword = function() {
	if(isValidEssential('.modal#quickviewChangeOutOfBandManagementPassword', "")) {
		if(password == reenterpassword) {
			var array =[];
			
			var hostid = quickviewId;
			var password = $('.modal#quickviewChangeOutOfBandManagementPassword').find('.modal-body').find('input.address').val(); 
			var reenterpassword = $('.modal#quickviewChangeOutOfBandManagementPassword').find('.modal-body').find('input.port').val();
			
			array.push("&hostid=" + hostid);
			array.push("&password=" + password);
			
			$.ajax({
		        url: setContextPath + "/admin/infra/changeOutOfBandManagementPassword",
		        dataType: "json",
		        data: {"param": array.join("")},
		        success: function (json) {
		            console.log('changeOutOfBandManagementPassword success');
	
		            var jobid = json.changeoutofbandmanagementpasswordresponse.jobid;
		           	loadingImageMethod(jobid, 'Change Out-of-band Management Password');
		      		
		         }, error: function (json) {
		         	console.log('changeOutOfBandManagementPassword error');
		         	
		         	var responseText = json.responseText.split('~');
		        	
		        	var errortext = JSON.parse(responseText[1]).changeoutofbandmanagementpasswordresponse.errortext;
		        	
		        	
		        	swal({ title: "Error: Change Out-of-band Management Password!", text: errortext, type: "error", confirmButtonText: "확인" });
		        	
		         	setNotification('Change Out-of-band Management Password, errortext: ' + errortext, 'error');
		         }
		    });
		}
		else {
			swal({ title: "Error: not matched Password  !", text: "", type: "error", confirmButtonText: "확인" });
		}
	}
}
var disableOutOfBandManagementForHost = function() {
	var hostid = quickviewId;
	
	 $.ajax({
	     url: setContextPath + "/admin/infra/disableOutOfBandManagementForHost",
	     dataType: "json",
		        data: {"param": "&hostid=" + hostid},
	     success: function (json) {
	     	console.log('disableOutOfBandManagementForHost success');
	
	   	var jobid = json.disableoutofbandmanagementforhostresponse.jobid;
	      	loadingImageMethod(jobid, 'Disable Out-of-band Management For Host');
	 		
	     }, error: function (json) {
	     	console.log('disableOutOfBandManagementForHost error');
	     	
	     	var responseText = json.responseText.split('~');
	     	
	     	var errortext = JSON.parse(responseText[1]).disableoutofbandmanagementforhostresponse.errortext;
	     	
	
	     	swal({ title: "Error: Disable Out-of-band Management For Host", text: errortext, type: "error", confirmButtonText: "확인" });
	     	
	     	setNotification('Disable Out-of-band Management For Host, errortext: ' + errortext, 'error');
	     }
	 });	
}
var enableOutOfBandManagementForHost = function() {
	var hostid = quickviewId;
	
	 $.ajax({
	     url: setContextPath + "/admin/infra/enableOutOfBandManagementForHost",
	     dataType: "json",
		        data: {"param": "&hostid=" + hostid},
	     success: function (json) {
	     	console.log('enableOutOfBandManagementForHost success');
	
	   	var jobid = json.enableoutofbandmanagementforhostresponse.jobid;
	      	loadingImageMethod(jobid, 'Enable Out-of-band Management For Host');
	 		
	     }, error: function (json) {
	     	console.log('enableOutOfBandManagementForHost error');
	     	
	     	var responseText = json.responseText.split('~');
	     	
	     	var errortext = JSON.parse(responseText[1]).enableoutofbandmanagementforhostresponse
	     	.errortext;
	     	
	
	     	swal({ title: "Error: Enable Out-of-band Management For Host", text: errortext, type: "error", confirmButtonText: "확인" });
	     	
	     	setNotification('Enable Out-of-band Management For Host, errortext: ' + errortext, 'error');
	     }
	 });
}
*/