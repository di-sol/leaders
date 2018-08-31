// infrastructure 
// 민재 

var requiredTrafficTypes = function() {
	if (networkType == 'Basic') {
        if (selectedNetworkOfferingHavingEIP || selectedNetworkOfferingHavingELB) {
        	return [
                'div.traffic-type-management',
                'div.traffic-type-guest',
                'div.traffic-type-public'
            ];
        } else {
            return [
                'div.traffic-type-management',
                'div.traffic-type-guest'
            ];
        }
    }
}

//domain Option 생성
var makeDomainOption = function(availablDomainArray) {
	console.log('makeDomainOption');
	
	//clear
	clearDomain();
	
	var selectTagDomain = $('.input-area').find('select.domain');

	for(var i = 0; i < availablDomainArray.length; i++) {		
		var option = $('<option/>', {
			class : "domain",
			value : availablDomainArray[i]['id'],
			text : availablDomainArray[i]['name']
		});
		selectTagDomain.append(option);
	}
}
//add zone step2(setup-zone) - domainList make
var makeDomainList = function() {
	zone.listDomains();
}
//add zone step2(setup-zone) - dedicated onchange event
var onchangeDedicated = function(dedicated) {
	console.log('onchangeDedicated');
	var form = dedicated.closest('form');

	var domain = form.find('.input-detail.domain');

	var account = form.find('.input-detail.account');
	if($('input.dedicated').prop('checked') == true) {
		domain.removeClass('hidden');
		account.removeClass('hidden');		
	}
	else {
		domain.addClass('hidden');
		account.addClass('hidden');		
	}
}

//add zone step1(setup-zone) - hypervisor onchange event
var onchangeHypervisor = function() {
	console.log('onchangeHypervisor');
	//networkOfferingList 다시 생성
	makeNetworkOfferingList();
}
//networkOffering Option 생성
var makeHypervisorOptionZone = function(availableHypervisorArray) {
	console.log('makeHypervisorOptionZone');

	//clear
	clearHypervisorZone();
	
	var selectTagHypervisor = $('select.hypervisor')

	for(var i = 0; i < availableHypervisorArray.length; i++) {
		if(availableHypervisorArray[i]['name'] == "XenServer") {
			var option = $('<option/>', {
				class : "hypervisor",
				value : availableHypervisorArray[i]['id'],
				text : availableHypervisorArray[i]['name']
			});
			selectTagHypervisor.append(option);			
		}
	}
	
	onchangeHypervisor($('select.hypervisor').find(':selected').val());
}
//add zone step1 - make hypervisorList
var makeHypervisorListZone = function(array) {
	console.log('makeHypervisorListZone');

	var data = {};
	
	data.networkModel = networkType;
	zone.listHypervisorsZone(data);
}

//add zone step1(setup-zone) - networkOffering onchange event
var onchangeNetworkOffering = function() {
	console.log('onchangeNetworkOffering');
	checkNetworkOfferingHaving();
	if(selectedNetworkOfferingHavingNetscaler == true) {
		$('li.nav-item.netscaler').removeClass("hidden");
		$('li.nav-item.public-traffic').removeClass("hidden");		
	}
	else {
		$('li.nav-item.netscaler').addClass("hidden");
		$('li.nav-item.public-traffic').addClass("hidden");
	}
}
//networkOffering Option 생성
var makeNetworkOfferingOption = function (availableNetworkOfferingObjs) {
	console.log('makeNetworkOfferingOption');

	//clear
	clearNetworkOffering();
	
	var selectTagNetworkOffering = $('select.network-offering')
	$(availableNetworkOfferingObjs).each(function() {

		//networkOffering 제한
		if(this.name == 'DefaultSharedNetworkOffering' || this.name == 'DefaultSharedNetscalerEIPandELBNetworkOffering') {
			var option = $('<option/>', {
				class : "network-offering",
				value : this.id,
				text : this.name
			});
			if(this.havingNetscaler == true) {
				option.prop("havingNetscaler", "true"); 
			}
			if(this.havingSG == true) {
				option.prop("havingSG", "true"); 
			}
			if(this.havingEIP == true) {
				option.prop("havingEIP", "true"); 
			}
			if(this.havingELB == true) {
				option.prop("havingELB", "true"); 
			}
			selectTagNetworkOffering.append(option);
		}
	});
}
//add zone step1 - make networkOfferingList
var makeNetworkOfferingList = function() {
	var data = {};
	
	var hypervisor = $('select.hypervisor').val();
	var sgEnable = $('input:checked[name="zone-advanced-sg-enabled"]').val();
	
	data.hypervisor = hypervisor;
	data.networkModel = networkType;
	data.sgEnable = sgEnable;
	
	zone.listNetworkOfferings(data);
}
//add zone step1(setup-zone) - networkOffering checking
var checkNetworkOfferingHaving = function() {
	//reset when different network offering is selected
    selectedNetworkOfferingHavingSG = false;
    selectedNetworkOfferingHavingEIP = false;
    selectedNetworkOfferingHavingELB = false;
    selectedNetworkOfferingHavingNetscaler = false;

    
    var selectedNetworkOfferingid = $('select.network-offering').val();
    $(networkOfferingObjs).each(function() {
        if (this.id == selectedNetworkOfferingid) {
            selectedNetworkOfferingObj = this;
            return false; //break $.each() loop
        }
    });
    
    if (selectedNetworkOfferingObj.havingNetscaler == true)
        selectedNetworkOfferingHavingNetscaler = true;
    if (selectedNetworkOfferingObj.havingSG == true)
        selectedNetworkOfferingHavingSG = true;
    if (selectedNetworkOfferingObj.havingEIP == true)
        selectedNetworkOfferingHavingEIP = true;
    if (selectedNetworkOfferingObj.havingELB == true)
        selectedNetworkOfferingHavingELB = true;
}

// cluster hypervisor Option
var makeHypervisorOptionCluster = function(availableHypervisorArray) {
	console.log('makeHypervisorOptionCluster');

	//clear
	clearHypervisorCluster();
	
	var selectTagHypervisor = $('select#clusterHypervisor')

	for(var i = 0; i < availableHypervisorArray.length; i++) {		
		var option = $('<option/>', {
			class : "hypervisor",
			value : availableHypervisorArray[i]['id'],
			text : availableHypervisorArray[i]['name']
		});
		selectTagHypervisor.append(option);
	}
	
}
//add zone step3(add Resources) nav1(cluster) - make hypervisor list
var makeHypervisorListCluster = function() {
	$('select#clusterHypervisor').prop('disabled', true);
	zone.listHypervisorsCluster();
}

//add zone step3(add Resources) nav3(primary storage) - protocol onchange event
var onchangeProtocol = function(protocol) {
	console.log("onchangeProtocol");
	
	var primaryStorageform = $('.add-resources-form.primary-storage');
	var inputDetail = primaryStorageform.find('.input-detail[name="changedByProtocol"]');
	
	for(var i = 0; i < inputDetail.length; i++) {
		inputDetail.eq(i).find('input').removeClass('invalid');
		inputDetail.eq(i).addClass('hidden');
	}
	
	var inputProtocol = primaryStorageform.find('.input-detail.' + protocol);
	for(var i = 0; i < inputProtocol.length; i++) {
		inputProtocol.eq(i).removeClass('hidden');
	}

	if(protocol =='nfs') {
		$('input.primary-storage[name="server"]').val("");
		$('div.input-detail.primary-storage-path').find('label').text('*Path:');		
	}
	else if(protocol =='PreSetup') {
		$('input.primary-storage[name="server"]').val("localhost");		
		$('div.input-detail.primary-storage-path').find('label').text('*SR Name-Label:');		
	}
	else if(protocol =='iscsi') {
		$('input.primary-storage[name="server"]').val("");
	}
}

//add zone step3(add Resources) nav4(secondary storage) - provider onchange event
var onchangeProvider = function(provider) {
	console.log("onchangeProvider");
	
	var secondaryStorageform = $('.add-resources-form.secondary-storage');
	var inputDetail = secondaryStorageform.find('.input-detail[name="changedByProvider"]');
	
	for(var i = 0; i < inputDetail.length; i++) {
		inputDetail.eq(i).find('input').removeClass('invalid');
		inputDetail.eq(i).addClass('hidden');
	}

	if(provider != "") {
		var inputProvider = secondaryStorageform.find('.input-detail.' + provider);
		
		if(provider == "S3") {
			secondaryStorageform.find('input[name="createNfsCache"]').prop('checked', true);
			secondaryStorageform.find('input[name="createNfsCache"]').prop("disabled", true);  //Create NFS staging is required for S3 at this moment. So, disallow user to uncheck "Create NFS Secondary Staging" checkbox
			if(iss3stores) {
				secondaryStorageform.find('input[name="name"]').val(s3stores[0].name);
				secondaryStorageform.find('input[name="name"]').prop('disabled', true);

				secondaryStorageform.find('input[name="createNfsCache"]').removeClass('hidden');
				secondaryStorageform.find('input[name="nfsCacheNfsServer"]').removeClass('hidden');
				secondaryStorageform.find('input[name="nfsCachePath"]').removeClass('hidden');
			}
			else {
				secondaryStorageform.find('input[name="name"]').prop('disabled', false);				
				for(var i = 0; i < inputProvider.length; i++) {
					inputProvider.eq(i).removeClass('hidden');
				}
			}
		}
		else{
			secondaryStorageform.find('input[name="createNfsCache"]').prop('checked', false);			

			for(var i = 0; i < inputProvider.length; i++) {
				inputProvider.eq(i).removeClass('hidden');
			}
		}
	}
}
var makeStorageProviderOption = function(storageproviders) {
	console.log('makeStorageProviderOption');

	//clear
	clearStorageProvider();
	
	var selectStorageProvider = $('select.secondary-storage')
	$(storageproviders).each(function() {

		var option = $('<option/>', {
			class : "secondary-storage",
			value : this.id,
			text : this.description
		});
		selectStorageProvider.append(option);
	});	
	
	onchangeProvider($('select.secondary-storage').find(':selected').val());
}
var makeStorageProviderList = function() {
	zone.listImageStores();
}

//onchange cluster zone
var onchangeZoneCluster = function(zone) {
	console.log("onchangeZoneCluster");
	
	var data = {};
	data.zoneid = zone;

	var selectPod = $('select#podName');
		
	cluster.listPod(data, selectPod);
}
//onchange host zone
var onchangeZoneHost = function(zone) {
	console.log("onchangeZoneHost");
	
	var data = {};
	data.zoneid = zone;

	var selectPod = $('select#podName');
		
	host.listPod(data, selectPod);
}
//onchange host pod
var onchangePodHost = function(pod) {
	console.log("onchangePodHost");
	
	var data = {};
	data.podid = pod;

	var selectCluster = $('select#cluster');
		
	host.listCluster(data, selectCluster);
}//zone List Option
var onchangeScopePrimaryStorage = function(scope) {
	if(scope == "zone") {
		$('div.hypervisor').removeClass('hidden');
		$('div.podid').addClass('hidden');		
		$('div.clusterid').addClass('hidden');		
	}
	else {
		$('div.hypervisor').addClass('hidden');		
		$('div.podid').removeClass('hidden');
		$('div.clusterid').removeClass('hidden');		
	}
}
var onchangeZonePrimaryStorage = function(zone) {
	console.log("onchangeZonePrimaryStorage");

	var data = {};
	data.zoneid = zone;

	var selectPod = $('select#podid');
	
	primaryStorage.listPods(data, selectPod);
}
var onchangePodPrimaryStorage = function(pod) {
	console.log("onchangePodPrimaryStorage");

	var data = {};
	data.podid = pod;

	var selectCluster = $('select#clusterid');
	
	primaryStorage.listClusters(data, selectCluster);
}
var onchangeClusterPrimaryStorage = function(cluster) {
	var selectedClusterObj = {}
	$(availableClusterArray).each(function() {
		if (this.id == cluster) {
            selectedClusterObj = this;
            return false; //break the $.each() loop
        }
	});
	
	if (selectedClusterObj.hypervisortype == "XenServer") {
        var selectProtocol = $('select#protocol');
        
        var items =[];
        items.push({
            id: "nfs",
            name: "nfs"
        });
        items.push({
            id: "PreSetup",
            name: "PreSetup"
        });
        items.push({
            id: "iscsi",
            name: "iscsi"
        });
        items.push({
            id: "custom",
            name: "custom"
        });
        makeListOption(items, selectProtocol);
        onchangeProtocolPrimaryStorage(selectProtocol.val());
	}
} 
var onchangeProtocolPrimaryStorage  = function(protocol) {
	 if (protocol == "nfs") {
         $('div.server').removeClass('hidden');
         $('input#server').val("");

         $('div.path').removeClass('hidden');
         $('div.path').find('label').text('*Path');
         

         $('div.iqn').addClass('hidden');
         $('div.lun').addClass('hidden');

     } else if (protocol == "PreSetup") {
    	 $('div.server').addClass('hidden');
    	 $('input#server').val("localhost");
    	 
    	 $('div.path').removeClass('hidden');
    	 $('div.path').find('label').text('*SR Name-Label');
    	 
    	 $('div.iqn').addClass('hidden');
         $('div.lun').addClass('hidden');
         
     } else if (protocol == "iscsi") {
    	 $('div.server').removeClass('hidden');
    	 $('input#server').val("");

    	 $('div.path').addClass('hidden');

    	 $('div.iqn').removeClass('hidden');
    	 $('div.lun').removeClass('hidden');

     } else if (protocol == "custom") {
    	 $('div.server').addClass('hidden');
    	 $('input#server').val("localhost");

    	 $('div.path').addClass('hidden');
    	 
    	 $('div.iqn').addClass('hidden');
         $('div.lun').addClass('hidden');
     } 
}
var onchangeProviderPrimaryStorage  = function(provider) {
    if (provider == 'DefaultPrimary') {
        $('div.isManaged').addClass('hidden');
        $('div.capacityIops').addClass('hidden');
        $('div.capacityBytes').addClass('hidden');
        $('div.url').addClass('hidden');
    } else {
        $('div.isManaged').removeClass('hidden');
        $('div.capacityIops').removeClass('hidden');
        $('div.capacityBytes').removeClass('hidden');
        $('div.url').removeClass('hidden');
    }
}
//onchange secondary storage provider
var onchangeProviderSecondaryStorage = function(provider) {
	if (provider == "NFS") {
        //NFS, SMB
        $('div.zoneid').removeClass('hidden');
        $('div.nfsServer').removeClass('hidden');
        $('div.path').removeClass('hidden');

        //SMB
        $('div.smbUsername').addClass('hidden')
        $('div.smbPassword').addClass('hidden')
        $('div.smbDomain').addClass('hidden')

        //S3
        $('div.accesskey').addClass('hidden')
        $('div.secretkey').addClass('hidden')
        $('div.bucket').addClass('hidden')
        $('div.endpoint').addClass('hidden')
        $('div.usehttps').addClass('hidden')
        $('div.connectiontimeout').addClass('hidden')
        $('div.maxerrorretry').addClass('hidden')
        $('div.sockettimeout').addClass('hidden')

        $('div.createNfsCache').find('input').prop('checked', false);
        $('div.createNfsCache').addClass('hidden')
        $('div.nfsCacheZoneid').addClass('hidden')
        $('div.nfsCacheNfsServer').addClass('hidden')
        $('div.nfsCachePath').addClass('hidden')

        //Swift
        $('div.url').addClass('hidden')
        $('div.account').addClass('hidden')
        $('div.username').addClass('hidden')
        $('div.key').addClass('hidden')
        $('div.storagepolicy').addClass('hidden')
    } else if (provider == "SMB") {
        //NFS, SMB
    	$('div.zoneid').removeClass('hidden');
    	$('div.nfsServer').removeClass('hidden');
    	$('div.path').removeClass('hidden');

        //SMB
    	$('div.smbUsername').removeClass('hidden');
    	$('div.smbPassword').removeClass('hidden');
    	$('div.smbDomain').removeClass('hidden');

        //S3
    	$('div.accesskey').addClass('hidden')
        $('div.secretkey').addClass('hidden')
        $('div.bucket').addClass('hidden')
        $('div.endpoint').addClass('hidden')
        $('div.usehttps').addClass('hidden')
        $('div.connectiontimeout').addClass('hidden')
        $('div.maxerrorretry').addClass('hidden')
        $('div.sockettimeout').addClass('hidden')

        $('div.createNfsCache').find('input').prop('checked', false);
        $('div.createNfsCache').addClass('hidden')
        $('div.nfsCacheZoneid').addClass('hidden')
        $('div.nfsCacheNfsServer').addClass('hidden')
        $('div.nfsCachePath').addClass('hidden')
         
        //Swift
        $('div.url').addClass('hidden')
        $('div.account').addClass('hidden')
        $('div.username').addClass('hidden')
        $('div.key').addClass('hidden')
        $('div.storagepolicy').addClass('hidden')
    } else if (provider == "S3") {
        //NFS, SMB
    	$('div.zoneid').addClass('hidden')
    	$('div.nfsServer').addClass('hidden')
    	$('div.path').addClass('hidden')

        //SMB
        $('div.smbUsername').addClass('hidden')
        $('div.smbPassword').addClass('hidden')
        $('div.smbDomain').addClass('hidden')

        //S3
        $('div.accesskey').removeClass('hidden');
        $('div.secretkey').removeClass('hidden');
        $('div.bucket').removeClass('hidden');
        $('div.endpoint').removeClass('hidden');
        $('div.usehttps').removeClass('hidden');
        $('div.connectiontimeout').removeClass('hidden');
        $('div.maxerrorretry').removeClass('hidden');
        $('div.sockettimeout').removeClass('hidden');

        $('div.createNfsCache').find('input').prop('checked', true);
        $('div.createNfsCache').removeClass('hidden');
        $('div.nfsCacheZoneid').removeClass('hidden');
        $('div.nfsCacheNfsServer').removeClass('hidden');
        $('div.nfsCachePath').removeClass('hidden');

        //Swift
        $('div.url').addClass('hidden')
        $('div.account').addClass('hidden')
        $('div.username').addClass('hidden')
        $('div.key').addClass('hidden')
        $('div.storagepolicy').addClass('hidden')
    } else if (provider == "Swift") { 
    	//NFS, SMB
    	$('div.zoneid').addClass('hidden')
    	$('div.nfsServer').addClass('hidden')
    	$('div.path').addClass('hidden')

        //SMB
        $('div.smbUsername').addClass('hidden')
        $('div.smbPassword').addClass('hidden')
        $('div.smbDomain').addClass('hidden')

      //S3
        $('div.accesskey').addClass('hidden')
        $('div.secretkey').addClass('hidden')
        $('div.bucket').addClass('hidden')
        $('div.endpoint').addClass('hidden')
        $('div.usehttps').addClass('hidden')
        $('div.connectiontimeout').addClass('hidden')
        $('div.maxerrorretry').addClass('hidden')
        $('div.sockettimeout').addClass('hidden')

        $('div.createNfsCache').find('input').prop('checked', false);
        $('div.createNfsCache').addClass('hidden')
        $('div.nfsCacheZoneid').addClass('hidden')
        $('div.nfsCacheNfsServer').addClass('hidden')
        $('div.nfsCachePath').addClass('hidden')

        //Swift
        $('div.url').removeClass('hidden');
        $('div.account').removeClass('hidden');
        $('div.username').removeClass('hidden');
        $('div.key').removeClass('hidden');
        $('div.storagepolicy').removeClass('hidden');
    }
}
var onchangeCreateNfsCacheSecondaryStorage = function(checked) {
	if(checked) {
        $('div.nfsCacheZoneid').removeClass('hidden')
        $('div.nfsCacheNfsServer').removeClass('hidden')
        $('div.nfsCachePath').removeClass('hidden')
	}
	else {
        $('div.nfsCacheZoneid').addClass('hidden')
        $('div.nfsCacheNfsServer').addClass('hidden')
        $('div.nfsCachePath').addClass('hidden')
	}
}
//make list option
var makeListOption = function(array, select) {
	console.log('makeListOption');
	
	//clear
	clearListOption(select);
	
	$(array).each(function() {
		var option = $('<option/>', {
			value : this.id,
			text : this.name
		});
		select.append(option);
	});		
}

var goPreStep = function(curProgressStep, curIndex) {
	//progress 색변화
	curProgressStep.removeClass('activeBG');
	//공통 진행사항 초기화 이전 step 가시화 현 step 비가시화 
	var Contents = $('.steps-content');
	var curContent = Contents.eq(curIndex);
	var preContent = Contents.eq(curIndex - 1) 
	
	curContent.addClass('hidden');
	preContent.removeClass('hidden');
}
var goPreContent = function(className, curProgressStep) {
	var nav = $('.nav.' + className);
	var navDetail = nav.find('.nav-detail');
	var activeNavDetail = nav.find('.nav-detail.activeBG');
	var curNavIndex = activeNavDetail.length - 1;

	if(curNavIndex > 0) {
		var curNavDetail = navDetail.eq(curNavIndex);
		curNavDetail.removeClass('activeBG');
		
		var setupNetworkStep = $('.steps-content.' + className);
		//info-detail
		var infoDetail = setupNetworkStep.find('.info-detail');
		//cur info-detail
		infoDetail.eq(curNavIndex).addClass('hidden');

		//content
		var content = setupNetworkStep.find('.content');
		//cur content
		content.eq(curNavIndex).addClass('hidden');

		//netscaler
		if(curNavDetail.hasClass('pod')) {
			if(selectedNetworkOfferingHavingNetscaler == false){
				navDetail.eq(curNavIndex - 1).removeClass('activeBG');
				navDetail.eq(curNavIndex - 2).removeClass('activeBG');
				curNavIndex-=2;
			}		
		}
		
		//pre info-detail
		infoDetail.eq(curNavIndex - 1).removeClass('hidden');
		//pre content
		content.eq(curNavIndex - 1).removeClass('hidden')
		
		return false;
	}
	return true;
}
//previous click event
var previousAddZone = function() {
	console.log('previous');
	
	var progress = $(".add-zone-progress");
	var progressStep = progress.find('.progress-step');
	var curIndex = progress.find('.progress-step.activeBG').length-1;
	var curProgressStep = progressStep.eq(curIndex);
	var curProgressStepid = curProgressStep.attr('id');
	
	switch(curProgressStepid) {
	case 'step-progress-2':
		var className = "setup-network";
		if(goPreContent(className, curProgressStep)) {
			var trafficType = requiredTrafficTypes();
			for(var i = 0; i < trafficType.length; i++){
				$(trafficType[i]).addClass('hidden');
			}
			$(".add-zone-button.previous").addClass('hidden');
			goPreStep(curProgressStep, curIndex);
		}
		break;
	case 'step-progress-3':
		var className = "add-resources";
		if(goPreContent(className, curProgressStep)) {
			goPreStep(curProgressStep, curIndex);
		}
		break;
	case 'step-progress-4':
		$(".add-zone-button.next").removeClass("hidden");
		$(".add-zone-button.launch").addClass("hidden");
		goPreStep(curProgressStep, curIndex);
		break;
	}
	
	//현 step 비가시화 && 다음 step 가시화
}

var isValidText = function(id) {
	var name = $("#" + id);
	
	//name 체크
	if(name.val() == "") {
		name.addClass('invalid');		
	}
	else {
		name.removeClass('invalid');
	}
}
var isValidIPAddress= function(id) {
	var IPAddress = $("#" + id);
	var IPAddressRes = IPAddress.val().split(".");
	if(IPAddressRes.length == 4) {
		if(!$.isNumeric(IPAddressRes[0]) || !$.isNumeric(IPAddressRes[1]) || !$.isNumeric(IPAddressRes[2]) || !$.isNumeric(IPAddressRes[3])) {	
			IPAddress.addClass('invalid');
		}
		else {
			IPAddress.removeClass('invalid');
		}
	} else {
		IPAddress.addClass('invalid');
	}
}
var isValidNotEssentialIP = function(id) {
	var IPAddress = $("#" + id);
	if(IPAddress.val() != "") {
		isValidIPAddress(id);
	}
	else {
		IPAddress.removeClass('invalid');
	}
}
var isValidSelect = function(id) {
	var select = $("select#" + id);
	
	//name 체크
	if(select.val() == null || select.val() == undefined || select.val() == "") {
		select.addClass('invalid');		
	}
	else {
		select.removeClass('invalid');
	}
}
var isValidEssential = function(className, essetialClassName) {
	console.log("isValidEssential");
	if(essetialClassName != ""){
		essetialClassName = "." + essetialClassName;
	}
	
	var findClassName = '.essential-text' + essetialClassName;
	var essentialText = $(className).find(findClassName);
	
	for(var i = 0; i < essentialText.length; i++){
		isValidText(essentialText.eq(i).prop('id'));
	}
	
	var essentialIP = $(className).find('.essential-IP' + essetialClassName);
	
	for(var i = 0; i < essentialIP.length; i++){
		isValidIPAddress(essentialIP.eq(i).prop('id'));
	}
	
	var essentialSelect = $(className).find('.essetial-select' + essetialClassName);
	
	for(var i = 0; i < essentialSelect.length; i++) {
		isValidSelect(essentialSelect.eq(i).prop('id'));
	}
	
	if($(className).find('.invalid').length == 0) {
		return true;
	}
	return false;
}
var isValidNotEssentialNum = function(id) {
	var number = $("#" + id);
	if(number.val() != "") {
		if($.isNumeric(number.val())) {
			number.removeClass('invalid');
		}
		else {
			number.addClass('invalid');
		}
	}
	else {
		number.removeClass('invalid');
	}
}

var checkOvsTunnelManager = function() {
	var ovsTunnelManager = false;
    $.ajax({
        url: setContextPath + "/admin/infra/listConfigurations",
        dataType: "json",
        data: {"param": "&name=sdn.ovs.controller"},
        async: false,
        success: function(json) {
            var items = json.listconfigurationsresponse.configuration; //2 entries returned: 'sdn.ovs.controller', 'sdn.ovs.controller.default.label'
            $(items).each(function() {
                if (this.name == 'sdn.ovs.controller') {
                    if (this.value == 'true' || this.value == true) {
                        ovsTunnelManager = true;
                    }
                    return false; //break each loop
                }
            });
        }
    });
    
    return ovsTunnelManager;
}
var goNextStep = function(progressStep, curIndex) {
	var nextProgressStep = progressStep.eq(curIndex + 1);
	
	nextProgressStep.addClass('activeBG');
	
	//curProgress display none, nextStep display block
	var Contents = $('.steps-content');
	var curContent = Contents.eq(curIndex);
	var nextContent = Contents.eq(curIndex + 1) 
	
	curContent.addClass('hidden');
	nextContent.removeClass('hidden');
}
var goNextContent = function(navDetail, curNavIndex, contentStep) {
	//info-detail
	var infoDetail = contentStep.find('.info-detail');
	//cur info-detail
	infoDetail.eq(curNavIndex).addClass('hidden');

	//content
	var content = contentStep.find('.content');	
	//cur content
	content.eq(curNavIndex).addClass('hidden');
	
	//netscaler
	if(infoDetail.eq(curNavIndex).hasClass('physical-network')) {
		if(selectedNetworkOfferingHavingNetscaler == false){
			navDetail.eq(curNavIndex + 1).addClass('activeBG');
			navDetail.eq(curNavIndex + 2).addClass('activeBG');
			curNavIndex+=2;
		}
	}

	var nextNavDetail = navDetail.eq(curNavIndex + 1)
	nextNavDetail.addClass('activeBG');
	
	//next info-detail
	infoDetail.eq(curNavIndex + 1).removeClass('hidden');
	//next content
	content.eq(curNavIndex + 1).removeClass('hidden');
}

//next click event
var nextAddZone = function() {
	console.log("next");
	//progress 색변화
	var progress = $('.add-zone-progress');
	var progressStep = progress.find('.progress-step');
	var curIndex = progress.find('.progress-step.activeBG').length  - 1;
	var curProgressStep = progressStep.eq(curIndex);
	var curProgressStepid = curProgressStep.attr('id');
	
	switch(curProgressStepid) {
	case 'step-progress-1':
		if(isValidEssential('.setup-zone-form', "")) {
			var trafficType = requiredTrafficTypes();
			for(var i = 0; i < trafficType.length; i++){
				$(trafficType[i]).removeClass('hidden');
			}

			var hypervisor = $('.setup-zone-form').find('select[name="hypervisor"]');
			// edit-label
			$('.edit-label').text(hypervisor.val() + ' Traffic label:');

			//traffictype show
			var trafficType = requiredTrafficTypes();
			for(var i = 0; i < trafficType.length; i++){
				$(trafficType[i]).removeClass('hidden');
			}
			
			//skipGuestTrafficStep
            skipGuestTrafficStep = false; //set value
			//ovsTunnelManager
			checkOvsTunnelManager();
			
			$(".add-zone-button.previous").removeClass('hidden');
			goNextStep(progressStep, curIndex);
		}
		break;
	case 'step-progress-2':
		var nav = $('.nav.setup-network');
		var navDetail = nav.find('.nav-detail');
		var activeNavDetail = nav.find('.nav-detail.activeBG');
		var curNavIndex = activeNavDetail.length - 1;
		
		var contentStep = $('.steps-content.setup-network');

		if(activeNavDetail.eq(curNavIndex).hasClass('physical-network')) {
			if(isValidEssential('.setup-network-form.physical-network', "")){

				goNextContent(navDetail, curNavIndex, contentStep);
			}
		} 
		else if(activeNavDetail.eq(curNavIndex).hasClass('pod')){ // pod
			if(isValidEssential('.setup-network-form.pod', "")){
				
				goNextContent(navDetail, curNavIndex, contentStep);
			}
		}
		else if(activeNavDetail.eq(curNavIndex).hasClass('guest-traffic')){ // guest Traffic
			if($('.setup-network.guest-traffic').find('.invalid').length == 0) {
				makeHypervisorListCluster();

				goNextStep(progressStep, curIndex);
			}
		}
		else if(activeNavDetail.eq(curNavIndex).hasClass('netscaler')) {
			if(isValidEssential('.setup-network-form.netscaler', "")){
				
				goNextContent(navDetail, curNavIndex, contentStep);
			}
		} else if(activeNavDetail.eq(curNavIndex).hasClass('public-traffic')) {
			//isValid;
			var publicTraffic = $('table.public-traffic').find('tr.public-traffic-data');
			if(publicTraffic.length < 1) {
				alert("적어도 하나의 public traffic을 생성해야 합니다.")
			}
			else {
				goNextContent(navDetail, curNavIndex, contentStep);
			}
		}
		break;1
	case 'step-progress-3':
		var nav = $('.nav.add-resources');
		var navDetail = nav.find('.nav-detail');
		var activeNavDetail = nav.find('.nav-detail.activeBG');
		var curNavIndex = activeNavDetail.length - 1;
		
		switch(curNavIndex) {
		case 0:
			if(isValidEssential('.add-resources-form.cluster', "")){
				var contentStep = $('.steps-content.add-resources');
				goNextContent(navDetail, curNavIndex, contentStep);
			}
			break;
		case 1:
			if(isValidEssential('.add-resources-form.host', "")) {
				var contentStep = $('.steps-content.add-resources');
				goNextContent(navDetail, curNavIndex, contentStep);
			}
			break;
		case 2:
			var protocol = $('select[name="protocol"]');
			
			if(isValidEssential('.add-resources-form.primary-storage', protocol.val())) {
				var contentStep = $('.steps-content.add-resources');
				
				makeStorageProviderList();
				goNextContent(navDetail, curNavIndex, contentStep);
			}			
			break;
		case 3:
			var provider = $('select[name="provider"]');
			
			if(provider.val() == ""){
				goNextStep(progressStep, curIndex);
				$(".add-zone-button.next").addClass("hidden");
				$(".add-zone-button.launch").removeClass("hidden");
			}
			else {
				if(isValidEssential('.add-resources-form.secondary-storage', provider.val())) {
					goNextStep(progressStep, curIndex);
					$(".add-zone-button.next").addClass("hidden");
					$(".add-zone-button.launch").removeClass("hidden");
				}
			}
			break;
		default:
				break;
		}
		break;
	}
}

//domain option 초기화
var clearDomain = function() {
    var options = $('.input-area').find('select.domain').find('option');
    
    for(var i = 0; i < options.length; i++) {
    	options.eq(i).remove();
    }
}
//zone hypervisor option 초기화
var clearHypervisorZone = function() {
    var options = $('select.hypervisor').find('option');
    
    for(var i = 0; i < options.length; i++) {
    	options.eq(i).remove();
    }
}
//networkOffering option 초기화
var clearNetworkOffering = function() {
	selectedNetworkOfferingHavingSG = false;
    selectedNetworkOfferingHavingEIP = false;
    selectedNetworkOfferingHavingELB = false;
    selectedNetworkOfferingHavingNetscaler = false;
    
    var options = $('select.network-offering').find('option');
    
    for(var i = 0; i < options.length; i++) {
    	options.eq(i).remove();
    }
}
//storage provider option 초기화
var clearStorageProvider = function() {
    var options = $('select.secondary-storage').find('option');
    
    for(var i = 0; i < options.length; i++) {
    	options.eq(i).remove();
    }
}
//cluster hypervisor option 초기화
var clearHypervisorCluster = function() {
    var options = $('select#clusterHypervisor').find('option');
    
    for(var i = 0; i < options.length; i++) {
    	options.eq(i).remove();
    }
}
//cancel시 값 초기화
var clearStep1 = function() {
	console.log("clearStep2");
	//step2
	var formStep2 = $('.setup-zone-form');
	var inputStep2 = formStep2.find('input[type="text"][name="zoneSetup"]');
	var checkboxStep2 = formStep2.find('input[type="checkbox"][name="zoneSetup"]');
		
	for(var i = 0; i < inputStep2.length; i++) {
		inputStep2.eq(i).val("");
		//invalid 제거
		inputStep2.eq(i).removeClass('invalid');
	}
	for(var i = 0; i < checkboxStep2.length; i++) {
		checkboxStep2.eq(i).prop("checked", false);
	}	
	
	//hypervisor
	clearHypervisorZone();
	// networkOffering
	clearNetworkOffering();
	// domain
	clearDomain();
}
var clearStep2 = function() {
	console.log("clearStep3");
	
	//step3
	var step3 = $('.steps-content.setup-network');
	//nav 초기화
	var nav = step3.find('.nav');
	var navDetail = nav.find('.nav-detail');

	navDetail.eq(0).addClass('activeBG');
	for(var i = 1; i < navDetail.length; i++) {
		navDetail.eq(i).removeClass('activeBG');
	}
	
	//info-detail 초기화
	var infoDetail = step3.find('.info-detail');
	
	infoDetail.eq(0).removeClass('hidden');
	for(var i = 1; i < infoDetail.length; i++) {
		infoDetail.eq(i).addClass('hidden');
	}
	
	//content 초기화
	var content = step3.find('.content');

	content.eq(0).removeClass('hidden');
	for(var i = 1; i < content.length; i++) {
		content.eq(i).addClass('hidden');
	}
	
	//physical network 초기화
	var physicalNetworkForm = $('.setup-network-form.physical-network');
	var inputPhysicalNetworkName = physicalNetworkForm.find('input[name="physical-network-name"]');
	var inputTrafficLabel = physicalNetworkForm.find('input.traffic-label-real');
	
	inputPhysicalNetworkName.val("Physical Network 1")
	
	for(var i = 0; i < inputTrafficLabel.length; i++) {
		inputTrafficLabel.eq(i).val("");
	}
	
	//traffic-type 초기화
	physicalNetworkForm.find('.traffic-type-management').addClass('hidden');
	physicalNetworkForm.find('.traffic-type-guest').addClass('hidden');
	physicalNetworkForm.find('.traffic-type-public').addClass('hidden');
	
	//netscaler 초기화
	var netscalerForm = $('.setup-network-form.netscaler');
	var inputNetscaler = netscalerForm.find('input[type="text"]');
	var selectNetscaler = netscalerForm.find('select[name="zoneSetup"]');
	var checkboxNetscaler = netscalerForm.find('input[type="checkbox"][name="zoneSetup"]');
	
	for(var i = 0; i < inputNetscaler.length; i++) {
		inputNetscaler.eq(i).val("");
		//invalid 제거
		if(inputNetscaler.hasClass('invalid')) {
			inputNetscaler.eq(i).removeClass('invalid');
		}
	}
	netscalerForm.find('input[type="text"][name="numberOfRetries"]').val('2');
	for(var i = 0; i < selectNetscaler.length; i++) {
		selectNetscaler.eq(i).find('option:eq(0)').prop("selected", "selected");
	}
	for(var i = 0; i < checkboxNetscaler.length; i++) {
		checkboxNetscaler.eq(i).prop("checked", false);
	}	

	//public-traffic 초기화
	var inputPublicTraffic = $('table.public-traffic').find('tr.public-traffic-input').find('input');
	for(var i = 0; i < inputPublicTraffic.length; i++) {
		inputPublicTraffic.eq(i).val("");
		//invalid 제거
		if(inputPublicTraffic.hasClass('invalid')) {
			inputPublicTraffic.eq(i).removeClass('invalid');
		}
	}
	
	var publicTrafficData = $('table.public-traffic').find('tr.public-traffic-data');
	for(var i = 0; i < publicTrafficData.length; i++) {
		publicTrafficData.eq(i).remove();
	}
	
	//pod 초기화
	var physicalNetworkForm = $('.setup-network-form.pod');
	var inputPodSetup = physicalNetworkForm.find('input[type="text"]');
	
	for(var i = 0; i < inputPodSetup.length; i++) {
		inputPodSetup.eq(i).val("");
		//invalid 제거
		inputPodSetup.eq(i).removeClass('invalid');
	}
	
	//guest-traffic 초기화
	var guestTrafficForm = $('.setup-network-form.guest-traffic');
	var inputGuestTrafficSetup = guestTrafficForm.find('input[type="text"]');
	
	for(var i = 0; i < inputGuestTrafficSetup.length; i++) {
		inputGuestTrafficSetup.eq(i).val("");
		//invalid 제거
		inputGuestTrafficSetup.eq(i).removeClass('invalid');
	}
}
var clearStep3 = function() {
	console.log("clearStep4");
	
	//step4
	var step4 = $('.steps-content.add-resources');
	//nav 초기화
	var nav = step4.find('.nav');
	var activeNavDetail = nav.find('.nav-detail.activeBG');
	for(var i = 1; i < activeNavDetail.length; i++) {
		activeNavDetail.eq(i).removeClass('activeBG');
	}
	
	//info-detail 초기화
	var infoDetail = step4.find('.info-detail');
	
	infoDetail.eq(0).removeClass('hidden');
	for(var i = 1; i < infoDetail.length; i++) {
		infoDetail.eq(i).addClass('hidden');
	}
	
	//content 초기화
	var content = step4.find('.content');
	content.eq(0).removeClass('hidden');
	for(var i = 1; i < content.length; i++) {
		content.eq(i).addClass('hidden');
	}
	//content1 cluster 초기화
	var clusterName = $('.add-resources-form.cluster').find('input[name="clusterName"]');
	clusterName.val("");
	//content2 host 초기화
	var inputHost = $('.add-resources-form.host').find('input');
	for(var i = 0; i < inputHost.length; i++) {
		inputHost.eq(i).val("");
	}
	//content3  primary storage 초기화
	var inputPrimaryStorage = $('.add-resources-form.primary-storage').find('input');
	for(var i = 0; i < inputPrimaryStorage.length; i++) {
		inputPrimaryStorage.eq(i).val("");
	}
	var selectPrimaryStorage = $('.add-resources-form.primary-storage').find('select');
	for(var i = 0; i < selectPrimaryStorage.length; i++) {
		selectPrimaryStorage.eq(i).find('option:eq(0)').prop("selected", "selected");
		selectPrimaryStorage.eq(i).change();
	}

	//content4  secondary storage 초기화 
	var inputTextSecondaryStorage = $('.add-resources-form.secondary-storage').find('input[type="text"]');
	var inputCheckboxSecondaryStorage = $('.add-resources-form.secondary-storage').find('input[type="checkbox"]');

	clearStorageProvider();
	
	for(var i = 0; i < inputTextSecondaryStorage.length; i++) {
		inputTextSecondaryStorage.eq(i).val("");
	}
	for(var i = 0; i < inputCheckboxSecondaryStorage.length; i++) {
		inputCheckboxSecondaryStorage.eq(i).prop("checked", false);
	}
}
var clearStep4 = function() {
	$('div.pre-setup').removeClass('hidden');
	$('div.cur-setup').addClass('hidden');
	
	var li = $('ul#resultWorking').find('li');
	li.each(function() {
		li.find('i').prop('class', 'fa fa-play')
		li.addClass('hidden');
	});
}
//clear list option
var clearListOption = function(select) {
	var options = select.find('option');
    
    for(var i = 0; i < options.length; i++) {
    	options.eq(i).remove();
    }
}
//cancel 버튼
var cancelAddZone = function() {
	console.log("cancel");
	 //step 초기화 추가 필
	var progress = $(".add-zone-progress");
	var progressStep = progress.find('.progress-step');
	var curIndex = progress.find('.progress-step.activeBG').length-1;
	var curProgressStep = progressStep.eq(curIndex);
	var curProgressStepid = curProgressStep.attr('id');
	
	//progress 색 변화
	$(".add-zone-button.previous").addClass('hidden');
	var successedProgress = $('.progress-step.activeBG');
	for(var i = 1; i < successedProgress.length; i++) {
		successedProgress.eq(i).removeClass('activeBG');
	}
	
	//modal 숨기기
	$(".modal.add-zone").modal('hide');
	
	//화면 초기화
	var Contents = $('.steps-content');
	var firstContent = Contents.eq(0); 
	
	firstContent.removeClass('hidden');
	for(var i = 1; i < curIndex + 1; i++) {
		Contents.eq(i).addClass('hidden');
	}

	$(".add-zone-button.next").removeClass("hidden");
	$(".add-zone-button.launch").addClass("hidden");
	$(".add-zone-button.errorfix").addClass("hidden");
	
//	진행 상황 초기화
	clearStep1();
	clearStep2();
	clearStep3();
	clearStep4();
	
	//dataFix 초기화
	dataFix = {};
	
}
var cancelAddPod = function() {
	console.log("cancel");
	
	clearListOption($('select#zone'));
	clearDomain();
//	진행 상황 초기화
	var form = $('form.add-pod-form');
	var inputs = form.find('input[type="text"]');
	
	inputs.each(function() {
		$(this).val("")
		$(this).removeClass('invalid');
	});
	
	var dedicated = form.find('input[type="checkbox"]');
	dedicated.prop('checked', false);;
	onchangeDedicated(dedicated);
	
	//modal 숨기기
	$(".modal.add-pod").modal('hide');
}
var cancelAddCluster = function() {
	console.log("cancel");
	
	clearListOption($('select#zone'));
	clearDomain();
	clearListOption($('select#hypervisor'));
	clearListOption($("select#podName"));
//	진행 상황 초기화
	var form = $('form.add-cluster-form');
	var inputs = form.find('input[type="text"]');
	
	inputs.each(function() {
		$(this).val("")
		$(this).removeClass('invalid');
	});
	
	var dedicated = form.find('input[type="checkbox"]');
	dedicated.prop('checked', false);;
	onchangeDedicated(dedicated);
	
	//modal 숨기기
	$(".modal.add-cluster").modal('hide');
}
var cancelAddHost = function() {
	console.log("cancel");
	
	clearListOption($('select#zone'));
	clearDomain();
	clearListOption($("select#podName"));
	clearListOption($("select#cluster"));
	
//	진행 상황 초기화
	var form = $('form.add-cluster-form');
	var inputs = form.find('input[type="text"]');
	
	inputs.each(function() {
		$(this).val("")
		$(this).removeClass('invalid');
	});
	
	var dedicated = form.find('input[type="checkbox"]');
	dedicated.prop('checked', false);;
	onchangeDedicated(dedicated);
	
	//modal 숨기기
	$(".modal.add-host").modal('hide');
}
var cancelAddPrimaryStroage = function() {
	console.log("cancel");
	
	clearListOption($('select#zoneid'));
	clearListOption($("select#podid"));
	clearListOption($("select#clusterid"));
	clearListOption($("select#protocol"));
	clearListOption($("select#provider"));

//	진행 상황 초기화
	var form = $('form.add-primary-storage-form');
	var inputs = form.find('input[type="text"]');
	
	inputs.each(function() {
		$(this).val("")
		$(this).removeClass('invalid');
	});
	
	//modal 숨기기
	$(".modal.add-primary-storage").modal('hide');
	
}
var cancelAddSecondaryStroage = function() {
	console.log("cancel");
	
	clearListOption($('select#zoneid'));
	clearListOption($("select#nfsCacheZoneid"));
	
//	진행 상황 초기화
	var form = $('form.add-secondary-storage-form');
	var inputs = form.find('input[type="text"]');
	
	inputs.each(function() {
		$(this).val("")
		$(this).removeClass('invalid');
	});
	
	//modal 숨기기
	$(".modal.add-secondary-storage").modal('hide');
	
}

//launch 버튼
var launchAddZone = function() {
	$('div.pre-setup').addClass('hidden');
	$('div.cur-setup').removeClass('hidden');
	$('button.add-zone-button.launch').addClass('hidden');

	zone.addZone();
}
var launchAddPod = function() {
	//valid check
	if(isValidEssential('.add-pod-form', "")){
		var args = {};
		args.zoneid = $('select#zone').find(':selected').val();
		args.name = $('input#inputPodName').val();
		args.gateway = $('input#inputReservedSystemGateway').val();
		args.netmask = $('input#inputReservedSystemNetmask').val();
		args.startIp = $('input#inputStartReservedSystemIP').val();
		args.endip = $('input#inputEndReservedSystemIP').val();
	
		args.dedicated = $('input#dedicated').val();
		if(dedicated) {
			args.domainid = $('select#domain').find(':selected').val();
			args.account = $('input#account').val();
		}
		
		pod.addPod(args);
	}
}
var launchAddCluster = function() {
	//valid check
	if(isValidEssential('.add-cluster-form', "")){
		var args = {};
		
		args.zoneid = $('select#zone').val(); 
		args.hypervisor = $('select#hypervisor').val(); 
		args.podid = $('select#podName').val();
		args.clustername = $('input#clusterName').val();

		args.dedicated = $('input#dedicated').prop('checked');
		if(dedicated) {
			args.domainid = $('select#domain').find(':selected').val();
			args.account = $('input#account').val();
		}
		
        cluster.addCluster(args);
	}
}
var launchAddHost = function() {
	//valid check
	if(isValidEssential('.add-host-form', "")){
		var args = {};

		args.zoneid = $('select#zone').val(); 
		args.podid = $('select#podName').val();
		args.clusterid = $('select#cluster').val();
		if(args.clusterid == null || args.clusterid == undefined) {

			alert("cluster를 설정해 주세요")
			return;
		}
		args.hosttags = $('input#hostTags').val();
		args.username = $('input#username').val();
		args.password = $('input#password').val();
		args.hostname = $('input#hostName').val();
		
		for(var i = 0; i < availableClusterArray.length; i++) {
			if(availableClusterArray[i].id == args.clusterid) {
				args.hypervisor = availableClusterArray[i].hypervisor;
				args.clustertype = availableClusterArray[i].clustertype;
				break;
			} 			
		}
		
		args.dedicated = $('input#dedicated').prop('checked');
		if(dedicated) {
			args.domainid = $('select#domain').find(':selected').val();
			args.account = $('input#account').val();
		}
		
        host.addHost(args);
	}
}
var launchAddPrimaryStorage = function() {
    var data = {};
    
    data.scope = $('select#scope').val();	
    data.zoneid = $('select#zoneid').val();
    data.podid = $('select#podid').val();
    data.clusterid = $('select#clusterid').val();
    data.name = $('input#name').val();
    data.provider = $('select#provider').val();
    
    if(data.provider == "DefaultPrimary") {
    	data.server = $('input#server').val();
    	data.protocol = $('select#protocol').val();
    	
    	if(data.protocol == "nfs") {
    		data.path = $('input#path').val();
    	} 
    	else if(data.protocol == "PreSetup") {
    		data.path = $('input#path').val();
    	} 
    	else if(data.protocol == "iscsi") {
    		data.iqn = $('input#iqn').val();
    		data.lun = $('input#lun').val();
    	}
    }
    else {
    	data.isManaged = $('input#isManaged').val();
    	data.capacityBytes = $('input#capacityBytes)').val();
    	data.capacityIops = $('input#capacityIops)').val();
    	data.url = $('input#url)').val();
    }
    
    data.storageTags = $('input#storagetags').val()
    
    primaryStorage.addStorage(data);
}
var launchAddSecondaryStorage = function() {
    var data = {};
        
    data.name = $('input#name').val();	
    data.provider = $('select#provider').val();
    
    //nfs smb
    data.zoneid = $('select#zoneid').val();
    data.nfsServer = $('input#nfsServer').val();
    data.path = $('input#path').val();
	
    //smb
    data.smbUsername = $('input#smbUsername').val();
    data.smbPassword = $('input#smbPassword').val();
    data.smbDomain = $('input#smbDomain').val();
    
    //S3
    data.accesskey = $('input#accesskey').val();
    data.secretkey = $('input#secretKey').val();
    data.bucket = $('input#bucket').val();
    data.usehttps = $('input#usehttps').prop('checked');
    
    data.endpoint = $('input#endpoint').val();
    data.connectiontimeout = $('input#connectiontimeout').val();
    data.maxerrorretry = $('input#maxerrorretry').val();
    data.sockettimeout = $('input#sockettimeout').val();
    
    data.createNfsCache = $('input#createNfsCache').prop('checked');
    data.nfsCacheZoneid = $('select#nfsCacheZoneid').val();
    data.nfsCacheNfsServer = $('input#nfsCacheNfsServer').val();
    data.nfsCachePath = $('input#nfsCachePath').val();
    
    //Swift
    data.url = $('input#url').val();
    data.account = $('input#account').val();
    data.username = $('input#username').val();
    data.key = $('input#key').val();
    data.storagepolicy = $('input#storagepolicy').val();
    
    secondaryStroage.addImageStore(data);
}

//edit button event
var callEdit = function(id) {
	$('#' + id).modal('show');
	$('#' + id).find('.traffic-label').val($('#' + id).find('.traffic-label-real').val());			
}

//addzone button
var cancelEdit = function(id) {
	$('#' + id).find('.traffic-label').val("")
	$('#' + id).modal('hide');
}
var okEdit = function(id) {
	$('#' + id).find('.traffic-label-real').val($('#' + id).find('.traffic-label').val());
	$('#' + id).modal('hide');			
}

//remove button PublicTraffic
var removePublicTraffic = function(div) {
	var tr = div.closest('tr');
	tr.remove();
}
//add button PublicTraffic
var addPublicTraffic = function() {
	var tbody = $('table.public-traffic').find('tbody');
	if(isValidEssential(".setup-network-form.public-traffic", 'public-traffic')) {
		var tr = $('<tr/>', {
			class: 'public-traffic-data'
		});
		var thWidth = $('th.public-traffic-table').outerWidth();
		
		var tdGateway = $('<td/>');
		var labelGateway = $('<label/>', {
			name: 'dataPublicGateway',
			type: 'text',
			class: "public-traffic public-traffic-table"
		}).text($('input#inputPublicGateway').val());

		
		var tdNetmask = $('<td/>');
		var labelNetmask = $('<label/>', {
			name: 'dataPublicNetmask',
			type: 'text',
			class: "public-traffic public-traffic-table"
		}).text($('input#inputPublicNetmask').val());


		var tdVlanid = $('<td/>');
		var labelVlanid = $('<label/>', {
			name: 'dataPublicVlanid',
			type: 'text',
			class: "public-traffic public-traffic-table"
		}).text($('input#inputPublicVlanid').val());

		
		var tdStartIp = $('<td/>');
		var labelStartIp = $('<label/>', {
			name: 'dataPublicStartIp',
			type: 'text',
			class: "public-traffic public-traffic-table"
		}).text($('input#inputPublicStartIp').val());

			
		var tdEndIp = $('<td/>');
		var labelEndIp = $('<label/>', {
			name: 'dataPublicEndIp',
			type: 'text',
			class: "public-traffic public-traffic-table"
		}).text($('input#inputPublicEndIp').val());

			
		var tdAdd = $('<td/>');
		var labelAdd = $('<div/>', {
			name: 'dataPublicAdd',
			type: 'text',
			class: "public-traffic-add public-traffic-table"
		});
		var tdActions = $('<td/>');
		var divActions = $('<div/>', {
			name: 'dataPublicActions',
			class: "public-traffic-remove public-traffic-table",
			onclick: 'removePublicTraffic($(this))'
		});
		var iconActions = $('<i/>', {
			class: 'f-s-17 m-r-5 fa fa-plus'
		});

		tdGateway.append(labelGateway);
		tr.append(tdGateway);

		tdNetmask.append(labelNetmask);
		tr.append(tdNetmask);
		
		tdVlanid.append(labelVlanid);
		tr.append(tdVlanid);

		tdStartIp.append(labelStartIp);
		tr.append(tdStartIp);

		tdEndIp.append(labelEndIp);
		tr.append(tdEndIp);
		
		tdAdd.append(labelAdd);
		tr.append(tdAdd);

		divActions.append(iconActions);
		tdActions.append(divActions);
		tr.append(tdActions);
		
		tbody.append(tr);
		
		$('input#inputPublicGateway').val("");
		$('input#inputPublicNetmask').val("");
		$('input#inputPublicVlanid').val("");
		$('input#inputPublicStartIp').val("");
		$('input#inputPublicEndIp').val("");
	}
}

//result show add zone
var proocedingWorking = function(id) {
	$('li#' + id).find('i').prop('class', 'fa fa-play');
	$('li#' + id).removeClass('hidden');
}
var successWorking = function(id) {
	$('li#' + id).find('i').prop('class', 'fa fa-check');
}
var errorWorking = function(id, errortext) {
	$('li#' + id).find('i').prop('class', 'fa fa-ban fa-stack-lg text-danger');
//	$('li#errorMessage').removeClass('hidden');
//	$('label#errorMessageDetail').text(errortext);	
	
	var errorPointName = $('li#' + id).find('label').text();
	
	swal({ title: "Error: " + errorPointName + "!", text: errortext, type: "error", confirmButtonText: "확인" }).then(
	        function() {
	            window.location.reload();
	        });                    			
}
