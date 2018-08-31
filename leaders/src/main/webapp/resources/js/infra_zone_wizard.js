(function($) {
	queryAsyncJobResultInterval = 3000;
	regionsecondaryenabled = null;
	
    var nfsURL = function(server, path) {
        var url;

        if (path.substring(0, 1) != "/") {
            path = "/" + path;
        }

        if (server.indexOf("://") == -1)
            url = "nfs://" + server + path;
        else
            url = server + path;
        return url;
    }
    var presetupURL = function(server, path) {
        var url;
        if (server.indexOf("://") == -1)
            url = "presetup://" + server + path;
        else
            url = server + path;
        return url;
    }
    var iscsiURL = function(server, iqn, lun) {
        var url;
        if (server.indexOf("://") == -1)
            url = "iscsi://" + server + iqn + "/" + lun;
        else
            url = server + iqn + "/" + lun;
        return url;
    }
    var smbURL = function(server, path) {
        var url = '';

        if (path.substring(0, 1) != "/") {
            path = "/" + path;
        }

        if (server.indexOf('://') == -1) {
            url += 'cifs://';
        }

        url += (server + path);

        return url;
    }

    var addParameterToCommandUrlParameterArrayIfValueIsNotEmpty = function(array, parameterName, value){
        if (value != null && value.length > 0) {
            array.push("&" + parameterName + "=" + value);
        }
    };
    var addUsernameAndPasswordToCommandUrlParameterArrayIfItIsNotNullAndNotEmpty = function(array, username, password){
    	addParameterToCommandUrlParameterArrayIfValueIsNotEmpty(array, "username", username);
    	addParameterToCommandUrlParameterArrayIfValueIsNotEmpty(array, "password", password);
    };
    	
	var getDataPhysicalNetworks = function() {
		console.log('getDataPhysicalNetworks');
		
		var physicalNetworksArray = [];
		var physicalNetworks = {};
		
		var form = $('form.setup-network-form.physical-network')
		var physicalNetwork = form.find('div.physical-network');
		
		
		for(var i = 0; i < physicalNetwork.length; i++) {
			var physicalNetworks = {};
			var trafficTypes = [];

			physicalNetworks.name = physicalNetwork.eq(i).find('input[name="physical-network-name"]').val();
			
			//trafficTypes
			var trafficType =  physicalNetwork.eq(i).find('div.traffic-type');
			
			var trafficTypeMangement = trafficType.find('div.traffic-type-management');
			if(!trafficTypeMangement.hasClass('hidden') && trafficTypeMangement.find('input[name="physical-network-management"]').prop('checked') == true) {
				trafficTypes.push('management');
			}
			var trafficTypeGuest = trafficType.find('div.traffic-type-guest');
			if(!trafficTypeGuest.hasClass('hidden') && trafficTypeGuest.find('input[name="physical-network-guest"]').prop('checked') == true) {
				trafficTypes.push('guest');				
			}
			var trafficTypePublic = trafficType.find('div.traffic-type-public');
			if(!trafficTypePublic.hasClass('hidden') && trafficTypePublic.find('input[name="physical-network-public"]').prop('checked') == true) {
				trafficTypes.push('public');								
			}
			
			physicalNetworks.trafficTypes = trafficTypes;
			
			physicalNetworksArray.push(physicalNetworks);
		}
		
		return physicalNetworksArray;
	}
	var getDataBasicPhysicalNetwork = function() {	//Netscaler
		console.log('getDataBasicPhysicalNetwork');
		var basicPhysicalNetwork = {};
		
		basicPhysicalNetwork.id = $('input.netscaler[name="IPAddress"]').val();
		basicPhysicalNetwork.username = $('input.netscaler[name="Username"]').val();
		basicPhysicalNetwork.password = $('input.netscaler[name="Password"]').val();
		basicPhysicalNetwork.networkdevicetype = $('select.netscaler[name="Type"]').find(':selected').val();
		basicPhysicalNetwork.gslbprovider = $('input:checkbox[name="GSLBService"]').prop('checked');
		basicPhysicalNetwork.gslbproviderpublicip = $('input.netscaler[name="GSLBServicePublicIP"]').val();
		basicPhysicalNetwork.gslbproviderprivateip = $('input.netscaler[name="GSLBServicePrivateIP"]').val();
		basicPhysicalNetwork.publicinterface = $('input.netscaler[name="publicInterface"]').val();
		basicPhysicalNetwork.privateinterface = $('input.netscaler[name="privateInterface"]').val();
		basicPhysicalNetwork.numretries = $('input.netscaler[name="numberOfRetries"]').val();
		basicPhysicalNetwork.capacity = $('input.netscaler[name="capacity"]').val();
		
//		var inline; // 기존 코드에서도 주석처리 되어 있었음
		var dedicated; // baisc + networkOffering 3번에선 안씀
		
		return basicPhysicalNetwork;
	}
	var getDataPod = function() {
		console.log('getDataPod');
		var pod = {};
		
		pod.name = $('#inputPodName').val();
		pod.reservedSystemGateway = $('#inputReservedSystemGateway').val();
		pod.reservedSystemNetmask = $('#inputReservedSystemNetmask').val();
		pod.reservedSystemStartIp = $('#inputStartReservedSystemIP').val();
		
		var endIp = $('#inputEndReservedSystemIP').val();
		if(endIp != '' && endIp != undefined) {
			pod.reservedSystemEndIp = endIp;
		}
	
		
		return pod;
	}
	var getDataPublicTraffic = function() {
		console.log('getDatapublicTraffic');
		var publicTraffic = [];
		
		var dataTr = $('table.public-traffic').find('tr.public-traffic-data');
		
		for(var i = 0; i < dataTr.length; i++) {
			var obj = {};
			
			obj.gateway = dataTr.eq(i).find('label[name="dataPublicGateway"]').text();
			obj.netmask = dataTr.eq(i).find('label[name="dataPublicNetmask"]').text();
			
			obj.vlanid = dataTr.eq(i).find('label[name="dataPublicVlanid"]').text();
			
			obj.startip = dataTr.eq(i).find('label[name="dataPublicStartIp"]').text();
			obj.endip = dataTr.eq(i).find('label[name="dataPublicEndIp"]').text();
			
			publicTraffic.push(obj);
		}
		return publicTraffic;
	}
	var getDataGuestTraffic = function() {
		console.log('getDataGuestTraffic');
		var guestTraffic = {};
		
		guestTraffic.guestGateway = $('input#inputGuestGateway').val();
		guestTraffic.guestNetmask = $('input#inputGuestNetmask').val();
		guestTraffic.guestStartIp = $('input#inputGuestStartIP').val();
		
		var endIp = $('input#inputGuestEndIP').val();
		if(endIp != '' && endIp != undefined) {
			guestTraffic.guestEndIp = endIp;
		}
	
		return guestTraffic;
	}
	var getDataCluster = function() {
		console.log('getDataCluster');
		var cluster = {};

		cluster.hypervisor = $('select.cluster[name="clusterHypervisor"]').find(':selected').val(); 
		cluster.name = $('#inputClusterName').val();
		
		return cluster;
	}
	var getDataHost = function() {
		console.log('getDataHost');
		var host = {};

		host.hostname = $('input#inputHostName').val(); 
		host.username = $('input#inputUserName').val();
		host.password = $('input#inputPassword').val();
		host.hosttags = $('input#inputHostTags').val();
		
		return host;
	}
	var getDataPrimaryStorage = function() {
		console.log('getDataPrimaryStorage');
		
		var primaryStorage = {};
		//args.primaryStorage.name
		primaryStorage.name = $('input#inputPrimaryStorageName').val();
		//args.primaryStorage.scope
		primaryStorage.scope = $('select.primary-storage[name="scope"]').find(':selected').val();
		 
		//args.primaryStorage.protocol
		primaryStorage.protocol = $('select.primary-storage[name="protocol"]').find(':selected').val();;

		//nfs path, server
		//PreSetup path(SR Name-Label), server="localhost"
		primaryStorage.path = $('input.primary-storage[name="path"]').val();
		primaryStorage.server = $('input.primary-storage[name="server"]').val();
		
		//iscsi iqn, lun
		primaryStorage.iqn = $('input.primary-storage[name="targetIQN"]').val();
		primaryStorage.lun = $('input.primary-storage[name="LUNNumber"]').val();
		
		//args.primaryStorage.storageTags
		primaryStorage.storageTags = $('inpu#inputPrimaryStorageTags').val();
		
		return primaryStorage;
	}
	var getDataSecondaryStorage = function() {
		console.log('getDataSecondaryStorage');
		var secondaryStorage = {};
		
		var secondaryStorageform = $('.add-resources-form.secondary-storage');
		
		secondaryStorage.provider = $('select.secondary-storage').find(':selected').val();
		secondaryStorage.name = secondaryStorageform.find('input#inputSecondaryStorageName').val();

		
		//nfs
		if(secondaryStorage.provider == 'NFS') {
			secondaryStorage.nfsServer = secondaryStorageform.find('input#inputSecondaryStorageNfsServer').val();
			secondaryStorage.path = secondaryStorageform.find('input#inputSecondaryStoragePath').val();
		}
		//smb
		else if(secondaryStorage.provider == 'SMB') {
			secondaryStorage.nfsServer = secondaryStorageform.find('input#inputSecondaryStorageNfsServer').val(); 
			secondaryStorage.path = secondaryStorageform.find('input#inputSecondaryStoragePath').val();
			secondaryStorage.smbDomain = secondaryStorageform.find('input#inputSecondaryStorageSMBDomain').val();
			secondaryStorage.smbUsername = secondaryStorageform.find('input#inputSecondaryStorageSMBUsername').val();
			secondaryStorage.smbPassword = secondaryStorageform.find('input#inputSecondaryStorageSMBPassword').val();
		}
		//S3
		else if(secondaryStorage.provider == 'S3') {
		//if name is disabled => complete
			secondaryStorage.accesskey = secondaryStorageform.find('input#inputSecondaryStorageAccessKey').val();
			secondaryStorage.secretkey = secondaryStorageform.find('input#inputSecondaryStorageSecretKey').val();
			secondaryStorage.bucket = secondaryStorageform.find('input#inputSecondaryStorageBucket').val();
			secondaryStorage.endpoint = secondaryStorageform.find('input#inputSecondaryStorageEndpoint').val();
			secondaryStorage.usehttps = secondaryStorageform.find('input#inputSecondaryStorageUseHTTPS').prop('checked');
			secondaryStorage.connectiontimeout = secondaryStorageform.find('input#inputSecondaryStorageConnectionTimeout').val();
			secondaryStorage.maxerrorretry = secondaryStorageform.find('input#inputSecondaryStorageMaxErrorRetry').val();
			secondaryStorage.sockettimeout = secondaryStorageform.find('input#inputSecondaryStorageMaxErrorRetry').val();
		
			secondaryStorage.createNfsCache = secondaryStorageform.find('input#inputSecondaryStorageNFSSecondaryStagingStore').prop('checked');
		
			if(secondaryStorage.createNfsCache) {
				secondaryStorage.nfsCacheNfsServer = secondaryStorageform.find('input#inputSecondaryStorageNfsCacheNfsServer').val();
				secondaryStorage.nfsCachePath = secondaryStorageform.find('input#inputSecondaryStorageNfsPath').val();				
			}
			
			//is name disabled
			secondaryStorage.isNameDisabled = secondaryStorageform.find('input#inputSecondaryStorageName').prop('disabled');
		}
		
		//Swift
		else if(secondaryStorage.provider == 'Swift') {
			secondaryStorage.url = secondaryStorageform.find('input#inputSecondaryStorageURL').val();
			secondaryStorage.account = secondaryStorageform.find('input#inputSecondaryStorageAccount').val();
			secondaryStorage.username = secondaryStorageform.find('input#inputSecondaryStorageUsername').val();
			secondaryStorage.key = secondaryStorageform.find('input#inputSecondaryStorageKey').val();
		}
		
		return secondaryStorage;
	}
	
	var getDataAddZone = function() {
		console.log('getDataAddZone');
		var data = {};
		var zone = {};
		//*networkType 
		zone.networkType = networkType;
			 
		// networkOfferingid
		zone.networkofferingid = $('select.network-offering[name="zoneSetup"]').find(':selected').val();
		

		//guestcidraddress  Advanced sg-disabled에서 사용 Basic에서는 사용 X
//		var guestcidraddress;
	
		if(networkType == 'Basic') { // 
			if(selectedNetworkOfferingHavingSG == true) {
				zone.securitygroupenabled = true;
			}
			else {
				zone.securitygroupenabled = false;			
			}
		}
	
		//*name &name
		zone.name = $('input.name[name="zoneSetup"]').val();
		
		//localstorageenabled &localstorageenabled enable-userVM
		zone.localstorageenabled = $('input.enable-userVM:checked[name="zoneSetup"]').prop('checked');
		
		//localstorageenabledforsystemvm &localstorageenabledforsystemvm enable-systemVM
		zone.localstorageenabledforsystemvm = $('input.enable-systemVM:checked[name="zoneSetup"]').prop('checked');
				
		//ip4dns1 &dns1
		var ip4dns1 = $('input.ipv4-dns1[name="zoneSetup"]').val();
		if(ip4dns1 != undefined && ip4dns1 != "") {
			zone.ip4dns1 = ip4dns1;
		}
		//ip4dns2 &dns2
		var ip4dns2 = $('input.ipv4-dns2[name="zoneSetup"]').val();
		if(ip4dns2 != undefined && ip4dns2 != "") {
			zone.ip4dns2 = ip4dns2;
		}
		
		//ip6dns1 &ip6dns1 //not Basic
//		var ip6dns1;
		//ip6dns2 &ip6dns2 //not Basic
//		var ip6dns2;
		
		//*internaldns1 &internaldns1
		zone.internaldns1 = $('input.internal-dns1[name="zoneSetup"]').val();
		//internaldns2 &internaldns2
		var internaldns2 = $('input.internal-dns2[name="zoneSetup"]').val();
		if(internaldns2 != undefined && internaldns2 != "") {
			zone.internaldns2 = internaldns2;
		}
		//networkdomain &domain
		var networkdomain = $('input.network-domain[name="zoneSetup"]').val();
		if(networkdomain != undefined && networkdomain != "") {
			zone.networkdomain = networkdomain;
		}
		
		//isdedicated Dedicated
		var isdedicated = $('input.dedicated:checked[name="zoneSetup"]').prop('checked');

		if(isdedicated) {
			zone.isdedicated = isdedicated;
			//domain // depend on dedicated
			var domain = $('select.domain[name="zoneSetup"]').find(':selected').val();
			if(domain != undefined && domain !="") {
				zone.domain = domain;
			}
			//account // depend on dedicated
			var account = $('input.account[name="zoneSetup"]').val();
			if(account != undefined && account != "") {
				zone.account = account;
			}
		}
		
		//get physicalNetwork data 
		data.physicalNetworks = getDataPhysicalNetworks();
		// get Netscaler Data
		data.basicPhysicalNetwork = getDataBasicPhysicalNetwork();
		//get Public Traffic Data
		data.publicTraffic = getDataPublicTraffic();

		
		//get pod data
		data.pod = getDataPod();
		//get Guest Traffic Data
		data.guestTraffic = getDataGuestTraffic();
		//get Cluster Data
		data.cluster = getDataCluster();
		//get Host Data
		data.host = getDataHost();
		//get Primary Storage Data
		data.primaryStorage = getDataPrimaryStorage(); 
		//get Secondary Storage Data
		data.secondaryStorage =	getDataSecondaryStorage();
		//result
		data.zone = zone;
		
		return data;
	}
	
	var makeParamForAddZone = function(args) {
		console.log('makeParamForAddZone'); 
		var param = [];
	    
	    //networkType
	    var networkType = args.zone.networkType; //"Basic", "Advanced"
	    param.push("&networktype=" + networkType);
	    
	    //securitygroupenabled
	    if (networkType == "Basic") {
	        if (selectedNetworkOfferingHavingSG == true)
	            param.push("&securitygroupenabled=true");
	        else
	            param.push("&securitygroupenabled=false");
	    }
	    //name
	    param.push("&name=" + args.zone.name);
	
	    //localstorageenabled
	    if (args.zone.localstorageenabled) {
	        param.push("&localstorageenabled=true");
	    }
	
	    //IPv4 dns1
	    param.push("&dns1=" + args.zone.ip4dns1);
	    //IPv4 dns2
	    if (args.zone.ip4dns2 != "" && args.zone.ip4dns2!= undefined)
	        param.push("&dns2=" + args.zone.ip4dns2);
	
	    //IPv6
	    if (args.zone.ip6dns1 != null && args.zone.ip6dns1!= undefined)
	    	param.push("&ip6dns1=" + args.zone.ip6dns1);
	    if (args.zone.ip6dns2 != null && args.zone.ip6dns2!= undefined)
	    	param.push("&ip6dns2=" + args.zone.ip6dns2);
	
	    //internal dns1
	    param.push("&internaldns1=" + args.zone.internaldns1);
	    //internal dns2
	    var internaldns2 = args.zone.internaldns2;
	    if (internaldns2 != "" && internaldns2!= undefined)
	        param.push("&internaldns2=" + internaldns2);
	    //networkdomain
	    if (args.zone.networkdomain != "" && args.zone.networkdomain!= undefined)
	        param.push("&domain=" + args.zone.networkdomain);
	    
	    return param.join("");
	}
	var makeParamForDedicateZone = function(args) {
		console.log('makeParamForDedicateZone'); 
		var param = [];
	    
	    //zoneid
	    var zoneid = args.zoneid; 
	    param.push("&zoneid=" + zoneid);
	    
	    //domainid
	    var domainid = args.domainid;
		param.push("&domainid=" + domainid);
	   
	    //account
		var account = args.account
	    if (account != null && account != undefined){
	        param.push("&account=" + account);
	    }
		
	    return param.join("");
	}
    var makeParamForAddTrafficType = function(trafficType) {
    	console.log('makeParamForAddTrafficType');
    	var inputLabel = $('input.traffic-label-real.' + trafficType).val();
    	var param = '';
    	
    	if(inputLabel != '' && inputLabel != undefined) {
    		param = '&xennetworklabel=' + inputLabel;
    	}
    	return param;
    }
	var makeParamForHost = function(args) {
		console.log('makeParamForHost');
		var param = [];
	    

        var hostname = args.host.hostname;
        var url;
        if (hostname.indexOf("http://") == -1) {
            url = "http://" + hostname;
        } else {
            url = hostname;
        }
        
        param.push("&url=" + url);
	    param.push("&zoneid=" + args.returnedZone.id);
	    param.push("&podid=" + args.returnedPod.id);
	    param.push("&clusterid=" + args.returnedCluster.id);
	    param.push("&hypervisor=" + args.returnedCluster.hypervisortype);
	    param.push("&hosttags=" + args.host.hosttags);	    	
	    param.push("&username=" + args.host.username);
	    param.push("&password=" + args.host.password);
	    
	    //clustertype
	    param.push("&clustertype=" + args.returnedCluster.clustertype);
	    
	    
	    return param.join("");	
	}
	var makeParamForPrimaryStorage = function(args) {
		console.log('makeParamForPrimaryStorage');

		var array = [];
        array.push("&zoneid=" + args.returnedZone.id);
        array.push("&podId=" + args.returnedPod.id);
        array.push("&clusterid=" + args.returnedCluster.id);
        array.push("&name=" + args.primaryStorage.name);
        array.push("&scope=" + args.primaryStorage.scope);

        // Hypervisor는 Xenserver로 고정이라 Scope는 cluster로 고정이다.

        var server = args.primaryStorage.server;

        var url = null;
        //XenServer는 primaryStorage의 protocol로 밑의 3개만을 사용.
        if (args.primaryStorage.protocol == "nfs") {
            var path = args.primaryStorage.path;
            if (path.substring(0, 1) != "/")
                path = "/" + path;
            url = nfsURL(server, path);
            
        } 
        else if (args.primaryStorage.protocol == "PreSetup") {
            var path = args.primaryStorage.path;
            if (path.substring(0, 1) != "/")
                path = "/" + path;
            url = presetupURL(server, path);
        } 
        else { // iscsi
            var iqn = args.primaryStorage.iqn;
            if (iqn.substring(0, 1) != "/")
                iqn = "/" + iqn;
            var lun = args.primaryStorage.lun;
            url = iscsiURL(server, iqn, lun);
        }
        
        array.push("&url=" + url);

        if (args.primaryStorage.storageTags != null && args.primaryStorage.storageTags.length > 0)
            array.push("&tags=" + args.primaryStorage.storageTags);
        
        return array.join('');
	}
	var makeParmaForSecondaryStorage = function(args) {
		console.log('makeParmaForSecondaryStorage');

		var array = [];

		array.push("&name=" + args.secondaryStorage.name);
		if(args.secondaryStorage.provider == 'NFS'){
			array.push("&provider=" + args.secondaryStorage.provider);
			array.push("&zoneid=" + args.returnedZone.id);
			
			var url = nfsURL(args.secondaryStorage.nfsServer, args.secondaryStorage.path)
			array.push("&url=" + url);
		}
		else if(args.secondaryStorage.provider == 'SMB') {
			array.push("&provider=" + args.secondaryStorage.provider);
			array.push("&zoneid=" + args.returnedZone.id);
			
			var url = smbURL(args.secondaryStorage.nfsServer, args.secondaryStorage.path);
			array.push("&url=" + url);
			
			array.push("&details[0].key=" + 'user');
			array.push("&details[0].value=" + args.secondaryStorage.smbUsername);
			array.push("&details[1].key=" + 'password');
			array.push("&details[1].value=" + args.secondaryStorage.smbPassword);
			array.push("&details[2].key=" + 'domain');
			array.push("&details[2].value=" + args.secondaryStorage.smbDomain);
						
		}
		else if(args.secondaryStorage.provider == 'S3') {
			array.push("&provider=" + args.secondaryStorage.provider);
			
			array.push("&details[0].key=" + 'accesskey');
			array.push("&details[0].value=" + args.secondaryStorage.accesskey);
			array.push("&details[1].key=" + 'secretkey');
			array.push("&details[1].value=" + args.secondaryStorage.secretkey);
			array.push("&details[2].key=" + 'bucket');
			array.push("&details[2].value=" + args.secondaryStorage.bucket);
			array.push("&details[2].key=" + 'usehttps');
			array.push("&details[2].value=" + args.secondaryStorage.usehttps);
			
            var index = 4;
            if (args.secondaryStorage.endpoint != null && args.secondaryStorage.endpoint.length > 0) {
            	array.push('&details[' + index.toString() + '].key=' + 'endpoint');
            	array.push('&details[' + index.toString() + '].value' + args.secondaryStorage.endpoint);
                index++;
            }
            if (args.secondaryStorage.connectiontimeout != null && args.secondaryStorage.connectiontimeout.length > 0) {
            	array.push('&details[' + index.toString() + '].key=' + 'connectiontimeout');
            	array.push('&details[' + index.toString() + '].value' + args.secondaryStorage.connectiontimeout);
                index++;
            }
            if (args.secondaryStorage.maxerrorretry != null && args.secondaryStorage.maxerrorretry.length > 0) {
            	array.push('&details[' + index.toString() + '].key=' + 'maxerrorretry');
            	array.push('&details[' + index.toString() + '].value' + args.secondaryStorage.maxerrorretry);
                index++;
            }
            if (args.secondaryStorage.sockettimeout != null && args.secondaryStorage.sockettimeout.length > 0) {
            	array.push('&details[' + index.toString() + '].key=' + 'sockettimeout');
            	array.push('&details[' + index.toString() + '].value' + args.secondaryStorage.sockettimeout);
                index++;
            }
		}
		else if(args.secondaryStorage.provider == 'Swift') {
			array.push("&provider=" + args.secondaryStorage.provider);
			array.push("&url=" + args.secondaryStorage.url);
			
            var index = 0;
            if (args.secondaryStorage.account != null && args.secondaryStorage.account.length > 0) {
            	array.push('&details[' + index.toString() + '].key=' + 'account');
            	array.push('&details[' + index.toString() + '].value' + args.secondaryStorage.account);
                index++;
            }
            if (args.secondaryStorage.username != null && args.secondaryStorage.username.length > 0) {
            	array.push('&details[' + index.toString() + '].key=' + 'username');
            	array.push('&details[' + index.toString() + '].value' + args.secondaryStorage.username);
                index++;
            }
            if (args.secondaryStorage.key != null && args.secondaryStorage.key.length > 0) {
            	array.push('&details[' + index.toString() + '].key=' + 'key');
            	array.push('&details[' + index.toString() + '].value' + args.secondaryStorage.key);
                index++;
            }
		}
        return array.join('');
	}
	var makeParamForNfsCache = function(args) {
		console.log('makeParamForNfsCache');

		var array = [];

		array.push("&provider=" + args.secondaryStorage.provider);
		array.push("&zoneid=" + args.returnedZone.id);
		
		var url = nfsURL(args.secondaryStorage.nfsServer, args.secondaryStorage.path)
		array.push("&url=" + url);

        return array.join('');
	}
	var makeParamForPod = function(args) {
		console.log('makeParamForPod');
		
        var array = [];
        array.push("&zoneid=" + args.returnedZone.id);
        array.push("&name=" + args.pod.name);
        array.push("&gateway=" + args.pod.reservedSystemGateway);
        array.push("&netmask=" + args.pod.reservedSystemNetmask);
        array.push("&startIp=" + args.pod.reservedSystemStartIp);

        var endip = args.pod.reservedSystemEndIp; //optional
        if (endip != null && endip.length > 0) {
        	array.push("&endIp=" + endip);
        }
        

        return array.join("");        
	}
	
	zone = {
		listHypervisorsZone : function(args) { 
			$.ajax({
			    url: setContextPath + "/admin/infra/listHypervisors",
	            async: false,
		        dataType: "json",
		        data: {"param": "&listAll=true"},
			    success: function(json) {
			    	console.log('listHypervisorsZone Success');
		        	
			    	var items = json.listhypervisorsresponse.hypervisor;
	
			    	var availableHypervisorArray = [];
	
			        var firstOption = "XenServer";
			        var nonSupportedHypervisors = {};
			       
			        if (items != null) {
			            for (var i = 0; i < items.length; i++) {
			                if (items[i].name in nonSupportedHypervisors) {
			                    continue;
			                }
			                if (items[i].name == firstOption) {
			                	availableHypervisorArray.unshift({
			                        id: items[i].name,
			                        name: items[i].name
			                    });
			                }
			                else {
			                	availableHypervisorArray.push({
			                        id: items[i].name,
			                        name: items[i].name
			                    });
			                }
			            }
			        }
			        //hypervisorOption 생성
			        makeHypervisorOptionZone(availableHypervisorArray);
	
			    },
			    error: function(json) {
			    	console.log('listHypervisorsZone Error');
			    }
			});
		},
		
		listNetworkOfferings : function(args) {
	        $.ajax({
	            url: setContextPath + "/admin/infra/listNetworkOfferings",
	            async: false,
		        dataType: "json",
		        data: {"param": "&state=Enabled&guestiptype=Shared"},
	            success: function(json) {
	            	console.log("listNetworkOffering Success");
	            	
	                networkOfferingObjs = json.listnetworkofferingsresponse.networkoffering;
	                var availableNetworkOfferingObjs = [];
	                $(networkOfferingObjs).each(function() {
	                    var thisNetworkOffering = this;
	                    $(this.service).each(function() {
	                        var thisService = this;
	
	                        $(thisService.provider).each(function() {
	                            if (this.name == "Netscaler") {
	                                thisNetworkOffering.havingNetscaler = true;
	                            } else if ($.inArray(this.name, baremetalProviders) != -1) {
	                                selectedBaremetalProviders.push(this.name);
	                            }
	                        });
	                        
	//                        //selectedBaremetalProviders 확인
	//                        console.log('selectedBaremetalProviders');
	//                        console.log(selectedBaremetalProviders);
	                        
	                        if (thisService.name == "SecurityGroup") {
	                            thisNetworkOffering.havingSG = true;
	                        } else if (thisService.name == "StaticNat") {
	                            $(thisService.capability).each(function() {
	                                if (this.name == "ElasticIp" && this.value == "true") {
	                                    thisNetworkOffering.havingEIP = true;
	                                    return false; //break $.each() loop
	                                }
	                            });
	                        } else if (thisService.name == "Lb") {
	                            $(thisService.capability).each(function() {
	                                if (this.name == "ElasticLb" && this.value == "true") {
	                                    thisNetworkOffering.havingELB = true;
	                                    return false; //break $.each() loop
	                                }
	                            });
	                        }
	                    });
	
	                    if (thisNetworkOffering.havingEIP == true && thisNetworkOffering.havingELB == true) { //EIP ELB
	                        if (args.hypervisor == "VMware") { //VMware does not support EIP ELB
	                            return true; //move to next item in $.each() loop
	                        }
	                    }
	
	                    availableNetworkOfferingObjs.push(thisNetworkOffering);
	                });
	                
	                //networkOffering Option 생성
	                makeNetworkOfferingOption(availableNetworkOfferingObjs);
	                //networkOffering having 조건 체크
	                checkNetworkOfferingHaving();
	            },
	            error: function(json) {
	            	console.log("listNetworkOffering error");
	            }
	        });
		},
		
		listDomains : function() {
			$.ajax({
	            url: setContextPath + "/admin/infra/listDomains",
	            async: false,
		        dataType: "json",
		        data: {"param": "&listAll=true&viewAll=true"},
	            success: function(json) {
	            	console.log('listDomain Success');
	            	
	            	var domainObjs = json.listdomainsresponse.domain;
	            	var availablDomainArray = [];
	            	$(domainObjs).each(function() {
	            		var thisDomain = this;
	            		var domain = {};
	            		domain.id = thisDomain.id;
	            		domain.name = thisDomain.name;
	            		
	            		availablDomainArray.push(domain);
	            	});
	
	            	//domainList 생성
	            	makeDomainOption(availablDomainArray);
	                
	            },
	            error: function(json) {
	            	console.log('listDomains error');
	            }
			});
		},
		
		listHypervisorsCluster : function() {
			$.ajax({
	            url: setContextPath + "/admin/infra/listHypervisors",
	            dataType: "json",
	            async: false,
		        data: {"param": ""},
	            success: function(json) {
	            	console.log('listHypervisorsCluster success');
	                var hypervisors = json.listhypervisorsresponse.hypervisor;
	                var availableHypervisorArray = [];
	                $(hypervisors).each(function() {
	                	availableHypervisorArray.push({
	                        id: this.name,
	                        name: this.name
	                    })
	                });
	                
	                makeHypervisorOptionCluster(availableHypervisorArray);
	                
	                $('select#clusterHypervisor').val($('select.hypervisor').find(':selected').val());
	            },
	            error: function(json) {
	            	console.log('listHypervisorsCluster Error');
	            } 
	        });
			
	        var vSwitchEnabled = false;
	        var dvSwitchEnabled = false;
	        // Check whether vSwitch capability is enabled
	        $.ajax({
	            url: setContextPath + "/admin/infra/listConfigurations",
	            dataType: "json",
	            data: {"param": "&name=vmware.use.nexus.vswitch"},
	            async: false,
	            success: function(json) {
	            	console.log('listConfigurations vSwitch success');
	                if (json.listconfigurationsresponse.configuration[0].value == 'true') {
	                    vSwitchEnabled = true;
	                }
	            }, error: function(json) {
	            	console.log('listConfigurations vSwitch error');
	            }
	        });
	
	        //Check whether dvSwitch is enabled or not
	        $.ajax({
	            url: setContextPath + "/admin/infra/listConfigurations",
	            dataType: "json",
	            data: {"param": "&name=vmware.use.dvswitch"},
	            async: false,
	            success: function(json) {
	            	console.log('listConfigurations dvSwitch success');
	                if (json.listconfigurationsresponse.configuration[0].value == 'true') {
	                    dvSwitchEnabled = true;
	                }
	            }, error: function(json) {
	            	console.log('listConfigurations dvSwitch error');
	            }
	        });
	        //onchange는 해당 hypervisor가 disabled이므로 제거 
		},
		
		listImageStores : function() {
	        var storageproviders = [];
	        storageproviders.push({ id: '', description: ''});
	
			 $.ajax({
	             url: setContextPath + "/admin/infra/listImageStores",
	             async: true,
	             dataType: "json",
	        	 data: {"param": "&provider=S3"},
	             success: function(json) {
	             	console.log('listImageStores Success');
	            	 
	            	 var s3stores = json.listimagestoresresponse.imagestore;
	                 if(s3stores != null && s3stores.length > 0) {
	                	 iss3stores = true;
	                	 //if (region-wide) S3 store exists already, only "S3" option should be included here. Any other type of store is not allowed to be created since cloudstack doesn't support multiple types of store at this point.
	                	 storageproviders.push({ id: 'S3', description: 'S3'}); 
	                 } else { // 현 조건 내에선 이 분기를 실행함.
	                     /*
	                     UI no longer gets providers from "listStorageProviders&type=image" because:
	                     (1) Not all of returned values are handled by UI.
	                     (2) Provider "SMB" which is handled by UI is not returned from "listStorageProviders&type=image"
	                     */
	                	 storageproviders.push({ id: 'NFS', description: 'NFS'});
	                     storageproviders.push({ id: 'SMB', description: 'SMB/CIFS'});
	                     storageproviders.push({ id: 'S3', description: 'S3'});
	                     storageproviders.push({ id: 'Swift', description: 'Swift'});
	                 }
	                 
	                 makeStorageProviderOption(storageproviders);
	
	             }, error: function(json) {
	              	console.log('listImageStores Error');
	            	 
	             }
			 });
		},
		
		addZone : function() {
			console.log("add zone");
	
			args = getDataAddZone();
			
			proocedingWorking('creatingZone');
			
			$.ajax({
		        url: setContextPath + "/admin/infra/createZone",
	            async: false,
		        dataType: "json",
		        data: {"param": makeParamForAddZone(args)},
		        success: function(json) {
		        	console.log("AddZone Success");
		        	
		        	successWorking('creatingZone');

		        	//dedicated
	            	if(args.zone.isdedicated){ //dedicated checkbox in zone wizard is checked
		                console.log("dedicated Zone");
		                	
		                var data = {
		                    zoneid: json.createzoneresponse.zone.id
		                };
		                if (args.zone.domain != "" && args.zone.domain != undefined)
		                    $.extend(data, {
		                        domainid: args.zone.domain
		                    });
		                if (args.zone.account != "" && args.zone.account != undefined)
		                    $.extend(data, {
		                        account: args.zone.account
		                    });
		    		    
		                zone.dedicateZone(data);
		            }
	            	
		            //add physicalNetwork
		            zone.addPhysicalNetworks(
		            	$.extend(args, {
		            		returnedZone: json.createzoneresponse.zone
		            	})
			         );
		            
		
		        },
		        error: function(json) {
		        	console.log("addZone Error");
		        	var responseText = json.responseText.split('~');
		        	
		        	var errortext = JSON.parse(responseText[1]).createzoneresponse.errortext;
		        	
		        	
		        	errorWorking('creatingZone', errortext);

		        }
		    });
		},
	
		dedicateZone : function(args) {
			
			console.log("dedicate zone");
		   	
		    $.ajax({
		        url: setContextPath + "/admin/infra/dedicateZone",
		        dataType: "json",
		        data: {"param":  makeParamForDedicateZone(args)},
		        success: function(json) {
		        	console.log("dedicateZone Success");
		        	alert("dedicateZone Success");
	            	//notification
	            	var work = "Dedicate Zone";
	            	var jobid = json.dedicatezoneresponse.jobid; 
	            	loadingImageMethod(jobid, work);

		        	return json;
		        },
		        error: function(json) {
		        	console.log("dedicateZone Error");  
	            	//notification
	            	var work = "Dedicate Zone";
	            	setNotification(work, 'error');

	            	return null;
		        }
		    });
		},
	
		addPhysicalNetworks : function(args) { // args={physicalNetworks-form,  returnedZone-createZone의 data}
			console.log('addPhysicalNetworks');
			
			var returnedPhysicalNetworks = [];
			
			if (args.zone.networkType == "Basic") { //Basic zone 
				 var requestedTrafficTypeCount = 2; //request guest traffic type, management traffic type
		         if (selectedNetworkOfferingHavingSG == true && selectedNetworkOfferingHavingEIP == true && selectedNetworkOfferingHavingELB == true)
		             requestedTrafficTypeCount++; //request public traffic type
		
		         //Basic zone has only one physical network
		         var array = []; // Physical network name
		         if ("physicalNetworks" in args) { //from add-zone-wizard physicalNetwork
		             array.push("&name=" + args.physicalNetworks[0].name);
		         } 
	//	         else { //from quick-install-wizard, quick-install은 사용하지 않음.
	//	             array.push("&name=PhysicalNetworkInBasicZone");
	//	         }
		         
		         //createZone에서 가져온 id
		         array.push("&zoneid=" + args.returnedZone.id);
		         
		         proocedingWorking('creatingPhysicalNetwork');
		         
		         $.ajax({ //physicalNetwork create
		        	 url: setContextPath + "/admin/infra/createPhysicalNetwork",
		             dataType: "json",
		             data: {"param": array.join("")},
		             success: function(json) {
		            	 console.log('createPhysicalNetwork Success');
		            	 
		         		 var jobid = json.createphysicalnetworkresponse.jobid;
		                 var createPhysicalNetworkIntervalID = setInterval(function() {
		                	 $.ajax({ // 작업 완료 확인
		                         url: setContextPath + "/admin/infra/queryAsyncJobResult",
		                         dataType: "json",
		                         data: {"param": '&jobid=' + jobid},
		                         success: function(json) {
		                        	 console.log('queryAsyncJobResult success');
		                        	 
		                        	 var result = json.queryasyncjobresultresponse;
		                        	 if (result.jobstatus == 0) {
		                                 return; //Job has not completed
		                             } else {
		                            	 clearInterval(createPhysicalNetworkIntervalID); //반복 정지
		                            	 
		                            	 if (result.jobstatus == 1) {
		                            		 var returnedBasicPhysicalNetwork = result.jobresult.physicalnetwork;
		                            		 var label;
		                            		 var returnedTrafficTypes = [];
		                                     
		                            		 //guest traffic add
		                            		 label = returnedBasicPhysicalNetwork.id + makeParamForAddTrafficType('guest');
		                            		 //Guest traffic 
											 $.ajax({
											    url: setContextPath + "/admin/infra/addTrafficType",
											    dataType: "json",
											    data: {"param": '&trafficType=Guest&physicalnetworkid=' + label},
											    success: function(json) {
											   	 	console.log('addTrafficType Guest success');
											   	 
											        var jobid = json.addtraffictyperesponse.jobid;
											        var addGuestTrafficTypeIntervalID = setInterval(function() {
											            $.ajax({
											                 url: setContextPath + "/admin/infra/queryAsyncJobResult",
											                 dataType: "json",
											                 data: {"param": '&jobid=' + jobid},
											                 success: function(json) {
											                	 console.log('queryAsyncJobResult success');
											               	 
											                     var result = json.queryasyncjobresultresponse;
											                     if (result.jobstatus == 0) {
											                         return; //Job has not completed
											                     } else {
											                         clearInterval(addGuestTrafficTypeIntervalID);
											
											                         if (result.jobstatus == 1) {
											                             returnedTrafficTypes.push(result.jobresult.traffictype);
											
											                             if (returnedTrafficTypes.length == requestedTrafficTypeCount) { //all requested traffic types have been added
											                                 returnedBasicPhysicalNetwork.returnedTrafficTypes = returnedTrafficTypes;
											                                 
											                                 successWorking('creatingPhysicalNetwork');
											                                 zone.configurePhysicalNetwork($.extend(args, {returnedBasicPhysicalNetwork: returnedBasicPhysicalNetwork}));
											                             }
											                         } else if (result.jobstatus == 2) {
											                             console.log("Failed to add Guest traffic type to basic zone. Error: jobresult.error");
											                             
											                             errorWorking('creatingPhysicalNetwork', "Failed to add Guest traffic type to basic zone. Error: jobresult.error");
											                         }
											                     }
											                 },
											                 error: function(json) {
											                	 console.log("Failed to add Guest traffic type to basic zone.");
											                     
													        	 errorWorking('creatingPhysicalNetwork', "Failed to add Guest traffic type to basic zone.");											                     
											                 }
											             });
											         }, queryAsyncJobResultInterval);
											     }
											 });
		                            		 
		                                     //management traffic add
		                                     label = returnedBasicPhysicalNetwork.id + makeParamForAddTrafficType('management');
		                            		 //Management traffic 
											 $.ajax({
											    url: setContextPath + "/admin/infra/addTrafficType",
											    dataType: "json",
											    data: {"param": '&trafficType=Management&physicalnetworkid=' + label},
											    success: function(json) {
											   	 	console.log('addTrafficType Management success');
											   	 
											        var jobid = json.addtraffictyperesponse.jobid;
											        var addManagementTrafficTypeIntervalID = setInterval(function() {
											            $.ajax({
											                 url: setContextPath + "/admin/infra/queryAsyncJobResult",
											                 dataType: "json",
											                 data: {"param": '&jobid=' + jobid},
											                 success: function(json) {
											                	 console.log('queryAsyncJobResult success');
											               	 
											                     var result = json.queryasyncjobresultresponse;
											                     if (result.jobstatus == 0) {
											                         return; //Job has not completed
											                     } else {
											                         clearInterval(addManagementTrafficTypeIntervalID);
											
											                         if (result.jobstatus == 1) {
											                             returnedTrafficTypes.push(result.jobresult.traffictype);
											
											                             if (returnedTrafficTypes.length == requestedTrafficTypeCount) { //all requested traffic types have been added
											                                 returnedBasicPhysicalNetwork.returnedTrafficTypes = returnedTrafficTypes;
											
											                                 successWorking('creatingPhysicalNetwork');
											                                 zone.configurePhysicalNetwork($.extend(args, {returnedBasicPhysicalNetwork: returnedBasicPhysicalNetwork}));
											                             }
											                         } else if (result.jobstatus == 2) {
											                        	 console.log("Failed to add Management traffic type to basic zone. Error: jobresult.error");
											                             
											                             errorWorking('creatingPhysicalNetwork', "Failed to add Management traffic type to basic zone. Error: jobresult.error");
											                         }
											                     }
											                 },
											                 error: function(json) {
											                	 console.log("Failed to add Management traffic type to basic zone.");
											                     
											                     errorWorking('creatingPhysicalNetwork', "Failed to add Management traffic type to basic zone.");
											                 }
											             });
											         }, queryAsyncJobResultInterval);
											     }
											 });
			                                  
		                                     //Public traffic 
	                                         if (selectedNetworkOfferingHavingSG == true && selectedNetworkOfferingHavingEIP == true && selectedNetworkOfferingHavingELB == true) {
	                                        	 label = returnedBasicPhysicalNetwork.id + makeParamForAddTrafficType('public');   
	    	                            		 //Public traffic 
	    										 $.ajax({
	    										    url: setContextPath + "/admin/infra/addTrafficType",
	    										    dataType: "json",
	    										    data: {"param": '&trafficType=Public&physicalnetworkid=' + label},
	    										    success: function(json) {
	    										   	 	console.log('addTrafficType Public success');
	    										   	 
	    										        var jobid = json.addtraffictyperesponse.jobid;
	    										        var addPublicTrafficTypeIntervalID = setInterval(function() {
	    										            $.ajax({
	    										                 url: setContextPath + "/admin/infra/queryAsyncJobResult",
	    										                 dataType: "json",
	    										                 data: {"param": '&jobid=' + jobid},
	    										                 success: function(json) {
	    										                	 console.log('queryAsyncJobResult success');
	    										               	 
	    										                     var result = json.queryasyncjobresultresponse;
	    										                     if (result.jobstatus == 0) {
	    										                         return; //Job has not completed
	    										                     } else {
	    										                         clearInterval(addPublicTrafficTypeIntervalID);
	    										
	    										                         if (result.jobstatus == 1) {
	    										                             returnedTrafficTypes.push(result.jobresult.traffictype);
	    										
	    										                             if (returnedTrafficTypes.length == requestedTrafficTypeCount) { //all requested traffic types have been added
	    										                                 returnedBasicPhysicalNetwork.returnedTrafficTypes = returnedTrafficTypes;
	    										
	    										                                 successWorking('creatingPhysicalNetwork');
	    										                                 zone.configurePhysicalNetwork($.extend(args, {returnedBasicPhysicalNetwork: returnedBasicPhysicalNetwork}));
	    										                             }
	    										                         } else if (result.jobstatus == 2) {
	    										                        	 console.log("Failed to add Public traffic type to basic zone. Error: jobresult.error");
	    										                             errorWorking('creatingPhysicalNetwork', "Failed to add Public traffic type to basic zone. Error: jobresult.error");
	    										                         }
	    										                     }
	    										                 },
	    										                 error: function(json) {
	    										                	 console.log("Failed to add Public traffic type to basic zone.");
	    										                	 errorWorking('creatingPhysicalNetwork', "Failed to add Public traffic type to basic zone.");
	    										                 }
	    										             });
	    										         }, queryAsyncJobResultInterval);
	    										     }
	    										 });
	                                         }
		                                     
		                            	 } else if (result.jobstatus == 2) {
		                            		 console.log("createPhysicalNetwork failed. Error: jobresult.error");
		                            		 errorWorking('creatingPhysicalNetwork', "createPhysicalNetwork failed. Error: jobresult.error");
	                                     }
		                             }
		                         },
		                    	 error : function() {
		                        	 console.log('queryAsyncJobResult error');
		                        	 errorWorking('creatingPhysicalNetwork', 'createPhysicalNetwork queryAsyncJobResult error');
		                    	 }
		                     });
		                 }, queryAsyncJobResultInterval);
		             }, 
		             error: function(json){
		            	 console.log('createPhysicalNetwork Error');           

		            	 var responseText = json.responseText.split('~');
			        	 
			        	 var errortext = JSON.parse(responseText[1]).createphysicalnetworkresponse.errortext;
			        	 
			        	
			        	 errorWorking('creatingPhysicalNetwork', errortext);

		             }
		         });
			}
		},
		
		configurePhysicalNetwork : function(args) {
			console.log('configurePhysicalNetwork');
			
	        if (args.zone.networkType == "Basic") {
				
	        	proocedingWorking('configuringPhysicalNetwork');

				$.ajax({
	                url: setContextPath + "/admin/infra/updatePhysicalNetwork",
	                dataType: "json",
	                data: {"param": '&state=Enabled&id=' + args.returnedBasicPhysicalNetwork.id},
	                success: function(json) {
	                	console.log('updatePhysicalNetwork success');
	                		                	
	                    var enablePhysicalNetworkIntervalID = setInterval(function() {
	                        $.ajax({
	                            url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                            dataType: "json",
	                            data: {"param": '&jobid=' + json.updatephysicalnetworkresponse.jobid},
	                            success: function(json) {
	                            	console.log('queryAsyncJobResult success');
	                            	
	                                var result = json.queryasyncjobresultresponse;
	                                if (result.jobstatus == 0) {
	                                    return; //Job has not completed
	                                } else {
	                                    clearInterval(enablePhysicalNetworkIntervalID);
	
	                                    if (result.jobstatus == 1) {
	                                        console.log("updatePhysicalNetwork succeeded.");
	
	                                        // get network service provider ID of Virtual Router
	                                        var virtualRouterProviderid;
	                                        $.ajax({
	                                            url: setContextPath + "/admin/infra/listNetworkServiceProviders",
	                                            async: false,
	                                            dataType: "json",
	                                            data: {"param": '&name=VirtualRouter&physicalNetworkid=' + args.returnedBasicPhysicalNetwork.id},
	                                            success: function(json) {
	                                            	console.log('listNetworkServiceProviders success');
	                                            	
	                                                var items = json.listnetworkserviceprovidersresponse.networkserviceprovider;
	                                                if (items != null && items.length > 0) {
	                                                    virtualRouterProviderid = items[0].id;
	                                                }
	                                            }
	                                        });
	                                        
	                                        if (virtualRouterProviderid == null) {
	                                            console.log("error: listNetworkServiceProviders API doesn't return VirtualRouter provider ID");
	                    	                	errorWorking('configuringPhysicalNetwork', "error: listNetworkServiceProviders API doesn't return VirtualRouter provider ID");	
	                                            return;
	                                        }
	
	                                        var virtualRouterElementid;
	                                        $.ajax({
	                                            url: setContextPath + "/admin/infra/listVirtualRouterElements",
	                                            async: false,
	                                            dataType: "json",
	                                            data: {"param": '&nspid=' + virtualRouterProviderid},
	                                            success: function(json) {
	                                            	console.log('listVirtualRouterElements success');
	
	                                            	var items = json.listvirtualrouterelementsresponse.virtualrouterelement;
	                                                if (items != null && items.length > 0) {
	                                                    virtualRouterElementid = items[0].id;
	                                                }
	                                            	
	                                            }
	                                        });
	                                        
	                                        if (virtualRouterElementid == null) {
	                                        	console.log("error: listVirtualRouterElements API doesn't return Virtual Router Element id");
	                                        	errorWorking('configuringPhysicalNetwork', "error: listVirtualRouterElements API doesn't return Virtual Router Element id");
	                                            return;
	                                        }
	
	                                        $.ajax({
	                                            url: setContextPath + "/admin/infra/configureVirtualRouterElement",
	                                            async: false,
	                                            dataType: "json",
	                                            data: {"param": '&enabled=true&id=' + virtualRouterElementid},
	                                            success: function(json) {
	                                            	console.log('configureVirtualRouterElement success');
	                                            	
	                                                var enableVirtualRouterElementIntervalID = setInterval(function() {
	                                                    $.ajax({
	                                                        url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                                                        dataType: "json",
	                                                        data: {"param": '&jobid=' + json.configurevirtualrouterelementresponse.jobid},
	                                                        success: function(json) {
	                                                        	console.log('queryAsyncJobResult success');
	                                                        	
	                                                            var result = json.queryasyncjobresultresponse;
	                                                            if (result.jobstatus == 0) {
	                                                                return; //Job has not completed
	                                                            } else {
	                                                                clearInterval(enableVirtualRouterElementIntervalID);
	
	                                                                if (result.jobstatus == 1) {
	                                                                    console.log("configureVirtualRouterElement succeeded.");
	
	                                                                    $.ajax({
	                                                                        url: setContextPath + "/admin/infra/updateNetworkServiceProvider",
	                                                                        dataType: "json",
	                                                                        data: {"param": '&state=Enabled&id=' + virtualRouterProviderid},
	                                                                        success: function(json) {
	                                                                        	console.log('updateNetworkServiceProvider success');
	                                                                        	
	                                                                            var enableVirtualRouterProviderIntervalID = setInterval(function() {
	                                                                                $.ajax({
	                                                                                    url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                                                                                    type:'GET',
	                                                                                    dataType: "json",
	                                                                                    data: {"param": '&jobid=' + json.updatenetworkserviceproviderresponse.jobid},
	                                                                                    success: function(json) {
	                                                                                    	console.log('queryAsyncJobResult success');
	                                                                                    	
	                                                                                        var result = json.queryasyncjobresultresponse;
	                                                                                        if (result.jobstatus == 0) {
	                                                                                            return; //Job has not completed
	                                                                                        } else {
	                                                                                            clearInterval(enableVirtualRouterProviderIntervalID);
	
	                                                                                            if (result.jobstatus == 1) {
	                                                                                                console.log("Virtual Router Provider is enabled");
	                                                                                                
	                                                                                                for (var i = 0; i < selectedBaremetalProviders.length; i++) {
	                                                                                                    $.ajax({
	                                                                                                        url: setContextPath + "/admin/infra/listNetworkServiceProviders",
	                                                                                                        async: false,
	                                                                                                        dataType: "json",
	                                                                                                        data: {"param": '&name=' + selectedBaremetalProviders[i] + '&physicalnetworkid=' + args.returnedBasicPhysicalNetwork.id},
	                                                                                                        success: function(json) {
	                                                                                                        	console.log('listNetworkServiceProviders success');
	                                                                                                        	
	                                                                                                            var items = json.listnetworkserviceprovidersresponse.networkserviceprovider;
	                                                                                                            if (items != null && items.length > 0) {
	                                                                                                                var providerid = items[0].id;
	                                                                                                                $.ajax({
	                                                                                                                    url: setContextPath + "/admin/infra/updateNetworkServiceProvider", 
	                                                                                                                    async: false,
	                                                                                                                    dataType: "json",
	                                                                                                                    data: {"param": '&id=' + providerid + '&state=Enabled'},
	                                                                                                                    success: function(json) {
	                                                                                                                    	console.log('updateNetworkServiceProvider success');
	                                                                                                                    	
	                                                                                                                        var updateNetworkServiceProviderIntervalID = setInterval(function() {
	                                                                                                                            $.ajax({
	                                                                                                                                url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                                                                                                                                dataType: "json",
	                                                                                                                                data: {"param": '&jobid=' + json.updatenetworkserviceproviderresponse.jobid},
	                                                                                                                                success: function(json) {
	                                                                                                                                	console.log('queryAsyncJobResult success');
	                                                                                                                                	
	                                                                                                                                    var result = json.queryasyncjobresultresponse;
	                                                                                                                                    if (result.jobstatus == 0) {
	                                                                                                                                        return; //Job has not completed
	                                                                                                                                    } else {
	                                                                                                                                        clearInterval(updateNetworkServiceProviderIntervalID);
	                                                                                                                                        if (result.jobstatus == 1) { //baremetal provider has been enabled successfully
	
	                                                                                                                                        } else if (result.jobstatus == 2) {
	                                                                                                                                        	console.log('result.jobresult.errortext .ConfigurePhysicalNetwork');
	                                                                                                                                        	errorWorking('configuringPhysicalNetwork', 'result.jobresult.errortext .ConfigurePhysicalNetwork');
	                                                                                                                                        }
	                                                                                                                                    }
	                                                                                                                                },
	                                                                                                                                error: function(json) {
	                                                                                                                                	console.log("error updateNetworkServiceProvider. ConfigurePhysicalNetwork");
	                                                                                                                                    errorWorking('configuringPhysicalNetwork', "error updateNetworkServiceProvider. ConfigurePhysicalNetwork");
	                                                                                                                                }
	                                                                                                                            });
	                                                                                                                        }, queryAsyncJobResultInterval);
	                                                                                                                    }
	                                                                                                                });
	                                                                                                            }
	                                                                                                        }
	                                                                                                    });
	                                                                                                }
	                                                                                                
	                                                                                                if (selectedNetworkOfferingHavingSG == true) { //need to Enable security group provider first
	                                                                                                    console.log('secyrity group provider');
	                                                                                                    
	                                                                                                    // get network service provider ID of Security Group
	                                                                                                    var securityGroupProviderid;
	                                                                                                    $.ajax({
	                                                                                                        url: setContextPath + "/admin/infra/listNetworkServiceProviders",
	                                                                                                        async: false,
	                                                                                                        dataType: "json",
	                                                                                                        data: {"param": '&name=SecurityGroupProvider&physicalNetworkid=' + args.returnedBasicPhysicalNetwork.id},
	                                                                                                        success: function(json) {
	                                                                                                        	console.log('listNetworkServiceProviders success');
	                                                                                                        	
	                                                                                                            var items = json.listnetworkserviceprovidersresponse.networkserviceprovider;
	                                                                                                            if (items != null && items.length > 0) {
	                                                                                                                securityGroupProviderid = items[0].id;
	                                                                                                            }
	                                                                                                        }
	                                                                                                    });
	
	                                                                                                    if (securityGroupProviderid == null) {
	                                                                                                    	console.log("error: listNetworkServiceProviders API doesn't return security group provider ID");
	                                                                                                    	errorWorking('configuringPhysicalNetwork', "error: listNetworkServiceProviders API doesn't return security group provider ID");
	                                                                                                        return;
	                                                                                                    }
	
	                                                                                                    $.ajax({
	                                                                                                        url: setContextPath + "/admin/infra/updateNetworkServiceProvider",
	                                                                                                        async: false,
	                                                                                                        dataType: "json",
	                                                                                                        data: {"param": '&state=Enabled&id=' + securityGroupProviderid},
	                                                                                                        success: function(json) {
	                                                                                                        	console.log('updateNetworkServiceProvider success');
	                                                                                                        	
	                                                                                                            var enableSecurityGroupProviderIntervalID = setInterval(function() {
	                                                                                                                $.ajax({
	                                                                                                                    url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                                                                                                                    dataType: "json",
	                                                                                                                    data: {"param": '&jobid=' + json.updatenetworkserviceproviderresponse.jobid},
	                                                                                                                    success: function(json) {
	                                                                                                                    	console.log('queryAsyncJobResult success');
	                                                                                                                    	
	                                                                                                                        var result = json.queryasyncjobresultresponse;
	                                                                                                                        if (result.jobstatus == 0) {
	                                                                                                                            return; //Job has not completed
	                                                                                                                        } else {
	                                                                                                                            clearInterval(enableSecurityGroupProviderIntervalID);
	
	                                                                                                                            if (result.jobstatus == 1) { //Security group provider has been enabled successfully

	                                                                                                        	                	successWorking('configuringPhysicalNetwork');
	                                                                                                                            	zone.addNetscalerProvider(args);
	                                                                                                                            } else if (result.jobstatus == 2) {
	                                                                                                                            	console.log("failed to enable security group provider. Error: jobresult.error");
	                                                                                                                                errorWorking('configuringPhysicalNetwork', "failed to enable security group provider. Error: jobresult.error");
	                                                                                                                            }
	                                                                                                                        }
	                                                                                                                    },
	                                                                                                                    error: function(json) {
	                                                                                                                    	console.log("failed to enable security group provider. ConfigurePhysicalNetwork");
	                                                                                                                    	errorWorking('configuringPhysicalNetwork', "failed to enable security group provider. ConfigurePhysicalNetwork");
	                                                                                                                    }
	                                                                                                                });
	                                                                                                            }, queryAsyncJobResultInterval);
	                                                                                                        }
	                                                                                                    });
	                                                                                                } else { //selectedNetworkOfferingHavingSG == false

	                                                                            	                	successWorking('configuringPhysicalNetwork');
	                                                                                                    zone.addNetscalerProvider(args);
	                                                                                                }
	                                                                                            } else if (result.jobstatus == 2) {
	                                                                                            	console.log("failed to enable Virtual Router Provider. Error: jobresult.error");
	                                                                                            	errorWorking('configuringPhysicalNetwork', "failed to enable Virtual Router Provider. Error: jobresult.error");
	                                                                                            }
	                                                                                        }
	                                                                                    },
	                                                                                    error: function(json) {
	                                                                                    	console.log("failed to enable Virtual Router Provider. ConfigurePhysicalNetwork");
	                                                                                    	errorWorking('configuringPhysicalNetwork', "failed to enable Virtual Router Provider. ConfigurePhysicalNetwork");
	                                                                                    }
	                                                                                });
	                                                                            }, queryAsyncJobResultInterval);
	                                                                        }
	                                                                    });
	                                                                } else if (result.jobstatus == 2) {
	                                                                	console.log("configureVirtualRouterElement failed. Error: jobresult.error");
	                                                                	errorWorking('configuringPhysicalNetwork', "configureVirtualRouterElement failed. Error: jobresult.error");
	                                                                }
	                                                            }
	                                                        },
	                                                        error: function(json) {
	                                                        	console.log("configureVirtualRouterElement failed. ConfigurePhysicalNetwork");
	                                                        	errorWorking('configuringPhysicalNetwork', "configureVirtualRouterElement failed. ConfigurePhysicalNetwork");
	                                                        }
	                                                    });
	                                                }, queryAsyncJobResultInterval);
	                                            }
	                                        });
	                                        
	                                    } else if (result.jobstatus == 2) {
	                                    	console.log("updatePhysicalNetwork failed. Error: jobresult.error");
	                                    	errorWorking('configuringPhysicalNetwork', "updatePhysicalNetwork failed. Error: jobresult.error");
	                                    }
	                                }
	                            },
	                            error: function(json) {
	                            	console.log("updatePhysicalNetwork failed. ConfigurePhysicalNetwork");
                                	errorWorking('configuringPhysicalNetwork', "updatePhysicalNetwork failed. ConfigurePhysicalNetwork");
	                                
	                            }
	                        });
	                    }, queryAsyncJobResultInterval);
	                },
	                error : function(json) {
	                	console.log('configuringPhysicalNetwork error');

	                	var responseText = json.responseText.split('~');
	                	
	                	var errortext = JSON.parse(responseText[1]).updatephysicalnetworkresponse.errortext;
	                	
		        	
	                	errorWorking('configuringPhysicalNetwork', errortext);	                	
	                	
	                }
	            });
	        }
		},
		
		addNetscalerProvider : function(args) {
	    	 console.log('add NetscalerProvider');
			 if (selectedNetworkOfferingHavingNetscaler == true) {
	             $.ajax({
	                 url: setContextPath + "/admin/infra/addNetworkServiceProvider",
	                 async: false,
	                 dataType: "json",
	                 data: {"param": '&name=Netscaler&physicalnetworkid=' + args.returnedBasicPhysicalNetwork.id},
	                 success: function(json) {
	                	 
	                     var addNetscalerProviderIntervalID = setInterval(function() {
	                         $.ajax({
	                             url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                             dataType: "json",
	                             data: {"param": '&jobid=' + json.addnetworkserviceproviderresponse.jobid},
	                             success: function(json) {
	                            	 console.log("queryAsyncJobResult success");
	                            	 
	                                 var result = json.queryasyncjobresultresponse;
	                                 if (result.jobstatus == 0) {
	                                     return; //Job has not completed
	                                 } else {
	                                     clearInterval(addNetscalerProviderIntervalID);
	
	                                     if (result.jobstatus == 1) {
	                                         args.returnedNetscalerProvider = result.jobresult.networkserviceprovider;
	                                         zone.addNetscalerDevice(args);
	                                     } else if (result.jobstatus == 2) {
	                                         alert("addNetworkServiceProvider&name=Netscaler failed. Error: jobresult.error");
	                                     }
	                                 }
	                             },
	                             error: function(json) {
	                                 alert("addNetworkServiceProvider&name=Netscaler failed. Error: addNetscalerProvider");
	                             }
	                         });
	                     }, queryAsyncJobResultInterval);
	                 }
	             });
	             //add netscaler provider (end)
	         } else { //selectedNetworkOfferingHavingNetscaler == false
	             //create a guest network for basic zone
	             zone.addGuestNetwork(args);
	         }
		},
		
		addNetscalerDevice : function(args) {
			console.log('add NetscalerDevice');
	
	        var array = [];
	        array.push("&physicalnetworkid=" + args.returnedBasicPhysicalNetwork.id);
	        addUsernameAndPasswordToCommandUrlParameterArrayIfItIsNotNullAndNotEmpty(array, args.basicPhysicalNetwork.username, args.basicPhysicalNetwork.password);
	        array.push("&networkdevicetype=" + args.basicPhysicalNetwork.networkdevicetype);
	        array.push("&gslbprovider=" + args.basicPhysicalNetwork.gslbprovider);
	        array.push("&gslbproviderpublicip=" + args.basicPhysicalNetwork.gslbproviderpublicip);
	        array.push("&gslbproviderprivateip=" + args.basicPhysicalNetwork.gslbproviderprivateip);
	
	        //construct URL starts here
	        var url = [];
	
	        var ip = args.basicPhysicalNetwork.ip;	
	        url.push("https://" + ip);
	
	        var isQuestionMarkAdded = false;
	
	        var publicInterface = args.basicPhysicalNetwork.publicinterface;
	        if (publicInterface != null && publicInterface.length > 0) {
	            if (isQuestionMarkAdded == false) {
	                url.push("?");
	                isQuestionMarkAdded = true;
	            } else {
	                url.push("&");
	            }
	            url.push("publicinterface=" + publicInterface);
	        }
	
	        var privateInterface = args.basicPhysicalNetwork.privateinterface;
	        if (privateInterface != null && privateInterface.length > 0) {
	            if (isQuestionMarkAdded == false) {
	                url.push("?");
	                isQuestionMarkAdded = true;
	            } else {
	                url.push("&");
	            }
	            url.push("privateinterface=" + privateInterface);
	        }
	
	        var numretries = args.basicPhysicalNetwork.numretries;
	        if (numretries != null && numretries.length > 0) {
	            if (isQuestionMarkAdded == false) {
	                url.push("?");
	                isQuestionMarkAdded = true;
	            } else {
	                url.push("&");
	            }
	            url.push("numretries=" + numretries);
	        }
	
	        var isInline = args.basicPhysicalNetwork.inline;
	        if (isInline != null && isInline.length > 0) {
	            if (isQuestionMarkAdded == false) {
	                url.push("?");
	                isQuestionMarkAdded = true;
	            } else {
	                url.push("&");
	            }
	            url.push("inline=" + isInline);
	        }
	
	        var capacity = args.basicPhysicalNetwork.capacity;
	        if (capacity != null && capacity.length > 0) {
	            if (isQuestionMarkAdded == false) {
	                url.push("?");
	                isQuestionMarkAdded = true;
	            } else {
	                url.push("&");
	            }
	            url.push("lbdevicecapacity=" + capacity);
	        }
	
	        var dedicated = (args.basicPhysicalNetwork.dedicated == "on"); //boolean    (true/false)
	        if (isQuestionMarkAdded == false) {
	            url.push("?");
	            isQuestionMarkAdded = true;
	        } else {
	            url.push("&");
	        }
	        url.push("lbdevicededicated=" + dedicated.toString());
	
	
	        array.push("&url=" + url.join(""));
	        
	        //construct URL ends here
	
	        $.ajax({
	            url: setContextPath + "/admin/infra/addNetscalerLoadBalancer",
	            dataType: "json",
	            data: {"param": array.join("")},
	            success: function(json) {
	            	console.log('addNetscalerLoadBalancer success');
	            	
	                var addNetscalerLoadBalancerIntervalID = setInterval(function() {
	                    $.ajax({
	                        url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                        dataType: "json",
	                        data: {"param": "&jobid=" + json.addnetscalerloadbalancerresponse.jobid},
	                        success: function(json) {
	                        	console.log('queryAsyncJobResult success');
	                        	
	                            var result = json.queryasyncjobresultresponse;
	                            if (result.jobstatus == 0) {
	                                return;
	                            } else {
	                                clearInterval(addNetscalerLoadBalancerIntervalID);
	
	                                if (result.jobstatus == 1) {
	                                    args.returnedNetscalerProvider.returnedNetscalerloadbalancer = result.jobresult.netscalerloadbalancer;
	
	                                    $.ajax({
	                                        url: setContextPath + "/admin/infra/updateNetworkServiceProvider",
	                                        dataType: "json",
	                                        data: {"param": "&state=Enabled&id=" + args.returnedNetscalerProvider.id},
	                                        success: function(json) {
	                                        	console.log('updateNetworkServiceProvider success');
	                                        	
	                                            var enableNetscalerProviderIntervalID = setInterval(function() {
	                                                $.ajax({
	                                                    url: setContextPath + "/admin/infra/queryAsyncJobResult",
	                                                    type:'GET',
	                                                    dataType: "json",
	                                                    data: {"param": "&jobid=" + json.updatenetworkserviceproviderresponse.jobid},
	                                                    success: function(json) {
	                                                    	console.log('queryAsyncJobResult success');
	                                                    	
	                                                        var result = json.queryasyncjobresultresponse;
	                                                        if (result.jobstatus == 0) {
	                                                            return;
	                                                        } else {
	                                                            clearInterval(enableNetscalerProviderIntervalID);
	
	                                                            if (result.jobstatus == 1) {
	                                                                zone.addGuestNetwork(args);
	                                                            } else if (result.jobstatus == 2) {
	                                                                alert("failed to enable Netscaler provider. Error: jobresult.error");
	                                                            }
	                                                        }
	                                                    }
	                                                });
	                                            }, queryAsyncJobResultInterval);
	                                        },
	                                        error: function(json) {
	                                            alert("failed to enable Netscaler provider. addNetscalerDevice");
	                                        }
	                                    });
	                                } else if (result.jobstatus == 2) { //addNetscalerLoadBalancer failed
	                                   console.log("addNetscalerLoadBalancer failed");
	                                }
	                            }
	                        }
	                    });
	                }, queryAsyncJobResultInterval);
	            },
	            error: function(json) {
	                console.log('addNetscalerDevice failed');
	            }
	        });
		},
		
		addGuestNetwork : function(args) {
			console.log('add GuestNetwork');
	
			proocedingWorking('creatingGuestNetwork');
			
			$.ajax({
	            url: setContextPath + "/admin/infra/createNetwork",
	            dataType: "json",
	            async: false,
	            data: {"param": '&zoneid=' + args.returnedZone.id + '&name=defaultGuestNetwork' + '&displaytext=defaultGuestNetwork' + '&networkofferingid=' + args.zone.networkofferingid},
	            success: function(json) {
	            	console.log('createNetwork success');
	            	//basic zone has only one physical network => addPod() will be called only once => so don't need to double-check before calling addPod()
	            	successWorking('creatingGuestNetwork');

	
	            	zone.addPod($.extend(args, {returnedGuestNetwork: json.createnetworkresponse.network}));
	            },
	            error: function(json) {
	            	console.log('createNetwork error');
	            	
	            	var responseText = json.responseText.split('~');
                	
                	var errortext = JSON.parse(responseText[1]).createnetworkresponse.errortext;
                	
	        	
                	errorWorking('creatingGuestNetwork', errortext);	         
	            }
	        });
		},
		
		addPod : function(args) {
	        console.log("addPod");
	        
	        proocedingWorking('creatingPod');
	        
	        $.ajax({
	            url: setContextPath + "/admin/infra/createPod",
	            async: false,
	            dataType: "json",
	            data: {"param": makeParamForPod(args)},
	            success: function(json) {
	            	console.log("addPod success");
	            	successWorking('creatingPod');
	            	
	                zone.configurePublicTraffic($.extend(args, {returnedPod: json.createpodresponse.pod}));
	            },
	            error: function(json) {
	            	console.log("addPod error");
	            	
	            	var responseText = json.responseText.split('~');
                	
                	var errortext = JSON.parse(responseText[1]).createpodresponse.errortext;
                	
	        	
                	errorWorking('creatingPod', errortext);	         
	            }
	        });
	    },
	    
	    configurePublicTraffic : function(args) {
	    	if (args.zone.networkType == "Basic" && (selectedNetworkOfferingHavingSG == true && selectedNetworkOfferingHavingEIP == true && selectedNetworkOfferingHavingELB == true)) { //|| (args.zone.networkType == "Advanced" && args.zone.sgEnabled != true)
	    			    		
	            console.log('configurePublicTraffic');
	
	            var stopNow = false;
	
	            $(args.publicTraffic).each(function() {
	                var thisPublicVlanIpRange = this;
	
	                //check whether the VlanIpRange exists or not (begin)
	                var isExisting = false;
	                $(returnedPublicVlanIpRanges).each(function() {
	                    if (this.vlan == thisPublicVlanIpRange.vlanid && this.startip == thisPublicVlanIpRange.startip && this.netmask == thisPublicVlanIpRange.netmask && this.gateway == thisPublicVlanIpRange.gateway) {
	                        isExisting = true;
	                        return false; //break each loop
	                    }
	                });
	                if (isExisting == true)
	                    return; //skip current item to next item (continue each loop)
	
	                //check whether the VlanIpRange exists or not (end)
	
	                var array = [];
	                array.push("&zoneid=" + args.returnedZone.id);
	
	                if (this.vlanid != null && this.vlanid.length > 0)
	                	array.push("&vlan=" + this.vlanid);
	                else
	                	array.push("&vlan=untagged");
	
	                array.push("&gateway=" + this.gateway);
	                array.push("&netmask=" + this.netmask);
	                arraarrayy1.push("&startip=" + this.startip);
	                if (this.endip != null && this.endip.length > 0)
	                	array.push("&endip=" + this.endip);
	
	                if (args.zone.networkType == "Basic") {
	                	array.push("&forVirtualNetwork=true");
	                } 
	                
	
	                $.ajax({
	                    url: setContextPath + "/admin/infra/createVlanIpRange",
	                    async: false,
	                    dataType: "json",
	                    data: {"param": array.join("")},
	                    success: function(json) {
	                    	console.log("createVlanIpRange success");
	                    	
	                        var item = json.createvlaniprangeresponse.vlan;
	                        returnedPublicVlanIpRanges.push(item);
	                    },
	                    error: function(json) {
	                    	console.log("createVlanIpRange error");
	                        stopNow = true;
	                    }
	                });
	
	                if (stopNow == true)
	                    return false; //break each loop, don't create next VlanIpRange
	            });
	
	            if (stopNow == true)
	                return; //stop the whole process
	
	            zone.configureGuestTraffic($.extend(args, {returnedPublicTraffic: returnedPublicVlanIpRanges}));
	            
	        } 
	    	else { //basic zone without public traffic type , skip to next step
	            zone.configureGuestTraffic(args);
	        }
	    },
	    
	    configureGuestTraffic : function(args) {
	    	console.log('configureGuestTraffic');
	    	
	    	// 현 조건 내에서는 발생하지 않는다.
	    	if (skipGuestTrafficStep == true) {
	            zone.addCluster(args);
	            return;
	      }
	    	
	    	if (args.returnedZone.networktype == "Basic") { //create an VlanIpRange for guest network in basic zone
	    		proocedingWorking('configuringGuestTraffic');
	    		
	    		var array = [];
	            array.push("&podid=" + args.returnedPod.id);
	            array.push("&networkid=" + args.returnedGuestNetwork.id);
	            array.push("&gateway=" + args.guestTraffic.guestGateway);
	            array.push("&netmask=" + args.guestTraffic.guestNetmask);
	            array.push("&startip=" + args.guestTraffic.guestStartIp);
	            if (args.guestTraffic.guestEndIp != null && args.guestTraffic.guestEndIp.length > 0)
	                array.push("&endip=" + args.guestTraffic.guestEndIp);
	            array.push("&forVirtualNetwork=false"); //indicates this new IP range is for guest network, not public network
	
	            $.ajax({
	                url: setContextPath + "/admin/infra/createVlanIpRange",
	                dataType: "json",
	                data: {"param": array.join("")},
	                success: function(json) {
	                	console.log('createVlanIpRange success configureGuestTraffic');
	                	
	                	successWorking('configuringGuestTraffic');
	                	
	                    args.returnedGuestNetwork.returnedVlanIpRange = json.createvlaniprangeresponse.vlan;
	
	                    zone.addCluster(args);
	                },
	                error: function(json) {
	                    console.log('configureGuestTraffic error');
		            	
		            	var responseText = json.responseText.split('~');
	                	
	                	var errortext = JSON.parse(responseText[1]).createvlaniprangeresponse.errortext;
	                	
		        	
	                	errorWorking('configuringGuestTraffic', errortext);	     
	                }
	            });
	        }
	    },
	    
	    addCluster : function(args) {
	        console.log('addCluster');
	
	        proocedingWorking('creatingCluster');
	        
	        // Have cluster use zone's hypervisor
	        args.cluster.hypervisor = args.zone.hypervisor ? args.zone.hypervisor : args.cluster.hypervisor; // 현 조건 내에선 hypervisor 일치
	
	        var array = [];
	        array.push("&zoneid=" + args.returnedZone.id);
	        array.push("&hypervisor=" + args.cluster.hypervisor);
	
	        var clusterType;
	
	        clusterType = "CloudManaged";
	        
	        array.push("&clustertype=" + clusterType);
	
	        array.push("&podid=" + args.returnedPod.id);
	
	        var clusterName = args.cluster.name;
	
	        array.push("&clustername=" + clusterName);
	
	        $.ajax({
	            url: setContextPath + "/admin/infra/addCluster",
	            dataType: "json",
	            data: {"param": array.join("")},
	            success: function(json) {
	            	console.log('addCluster success');
	            	successWorking('creatingCluster');
	            	
	            	zone.addHost($.extend(args, {returnedCluster: json.addclusterresponse.cluster[0]}));
	            },
	            error: function(json) {
	                console.log('addCluster error');
	            	
	            	var responseText = json.responseText.split('~');
                	
                	var errortext = JSON.parse(responseText[1]).addclusterresponse.errortext;
                	
	        	
                	errorWorking('creatingCluster', errortext);	     
	            }
	        });
	    },
	    
	    addHost : function(args) {
	        console.log('addHost');
	
	        proocedingWorking('addingHost');
	        
	        var addHostAjax = function() {
	            $.ajax({
	                url: setContextPath + "/admin/infra/addHost",
	                dataType: "json",
	                data: {"param": makeParamForHost(args)},
	                success: function(json) {
	                	console.log('addHost success');
	                	successWorking('addingHost');
	                	
	                    zone.addPrimaryStorage($.extend(args, {returnedHost: json.addhostresponse.host[0]}));
	                },
	                error: function(json) {
	                    console.log('addHost error');
		            	
		            	var responseText = json.responseText.split('~');
	                	
	                	var errortext = JSON.parse(responseText[1]).addhostresponse.errortext;
	                	
		        	
	                	errorWorking('addingHost', errortext);	     
	                }
	            });
	        };
	
	        if(args.zone.localstorageenabledforsystemvm == 'on') {
	        	$.ajax({
	                url: setContextPath + "/admin/infra/updateConfiguration",
	                dataType: "json",
	                data: {"param": "&name=system.vm.use.local.storage&value=true&zoneid=" + args.returnedZone.id},
	                success: function(json) {
	                	console.log('addHost-updateConfiguration success');
	                    addHostAjax();
	                },
	                error: function(json) {
	                   console.log('addHost-updateConfiguration error');
	                }
	            });
	        } else {
	            addHostAjax();
	        }
	    },
	    
	    addPrimaryStorage : function(args) {
	        console.log('addPrimaryStorage');
	        proocedingWorking('creatingPrimaryStorage');
	        
	        //use local storage, don't need primary storage. So, skip this step.
	        if (args.zone.localstorageenabled == 'on' && args.zone.localstorageenabledforsystemvm == 'on') { 
	            zone.addSecondaryStorage(args);
	            return;
	        }
	        $.ajax({
	            url: setContextPath + "/admin/infra/createStoragePool",
	            dataType: "json",
	            data: {"param": makeParamForPrimaryStorage(args)},
	            success: function(json) {
	            	console.log('addPrimaryStorage-createStoragePool success');
	            	successWorking('creatingPrimaryStorage');
	            	
	                zone.addSecondaryStorage($.extend(args, {returnedPrimaryStorage: json.createstoragepoolresponse.storagepool}));
	            },
	            error: function(json) {
	            	console.log('addPrimaryStorage-createStoragePool error');
	            	
	            	var responseText = json.responseText.split('~');
                	
                	var errortext = JSON.parse(responseText[1]).createstoragepoolresponse.errortext;
                	
	        	
                	errorWorking('creatingPrimaryStorage', errortext);	     
	            }
	        });
	    },
	    
	    addSecondaryStorage : function(args) {
	    	var complete = function(args) {
	            console.log('****ADD ZONE COMPLETE****');
	            $('li#completeMessage').removeClass('hidden');	       
	            
	            $('button.add-zone-button.cancel').text('finish')
	        	$('button.add-zone-button.cancel').prop('onclick', '');
	        	$('button.add-zone-button.cancel').unbind('click');
	        	$('button.add-zone-button.cancel').bind('click', function() {
	            	cancelAddZone();
	            	
	            	window.location.reload();
	            });
	    	}
	    	
	        console.log('addSecondaryStorage');
	
	        if (args.secondaryStorage.provider == '') {
	            complete(args); 
	            return; //skip addSecondaryStorage if provider dropdown is blank
	        }
	
	        //Name textbox is disabled (and populated with S3 image setore name) when S3 image store exists. In this case, do not call addImageStore to create S3 image store.
	        if(args.secondaryStorage.provider == 'S3' && args.secondaryStorage.isNameDisabled) {
	            complete(args); 
	    	} 
	        else { //Name textbox is not disabled when S3 image store does not exist. In this case, call addImageStore to create S3 image store.
	        	proocedingWorking('creatingSecondaryStorage');
	        	$.ajax({
	                url: setContextPath + "/admin/infra/addImageStore",
	                dataType: "json",
	                data: {"param": makeParmaForSecondaryStorage(args)},
	                success: function(json) {
	                    console.log('addSecondaryStorage success');
	                    successWorking('creatingSecondaryStorage');
	                    
	                	if(args.secondaryStorage.provider == 'S3' || args.secondaryStorage.provider == 'Swift'){
	                		regionsecondaryenabled = true;
	                	}
	                	
	                    complete($.extend(args, {returnedSecondaryStorage: json.addimagestoreresponse.secondarystorage}));
	                },
	                error: function(json) {
	                    console.log('addSecondaryStorage error');
		            	
		            	var responseText = json.responseText.split('~');
	                	
	                	var errortext = JSON.parse(responseText[1]).addimagestoreresponse.errortext;
	                	
		        	
	                	errorWorking('creatingSecondaryStorage', errortext);	    
	                }
	            });    
	        }
	        
	        if(args.secondaryStorage.provider == 'S3' && args.secondaryStorage.createNfsCache) {
	        	proocedingWorking('creatingSecondaryStorage');
	        	$.ajax({
	                url: setContextPath + "/admin/infra/createSecondaryStagingStore",
	                dataType: "json",
	                data: {"param": makeParamForNfsCache(args)},
		            success: function(json) {
		            	console.log('createSecondaryStagingStore success');
		            	successWorking('creatingSecondaryStorage');
		            	
		                //do nothing
		            },
		            error: function(json) {
		                console.log('addSecondaryStorage error');
		                
		                var responseText = json.responseText.split('~');
	                	
	                	var errortext = JSON.parse(responseText[1]).createsecondarystagingstoreresponse.errortext;
	                	
		        	
	                	errorWorking('creatingSecondaryStorage', errortext);
		            }
		        });
	        }
	    }
	}
	
	pod =  {
		listZones : function(selectZone) {
			$.ajax({
	            url: setContextPath + "/admin/infra/listZones",
	            dataType: "json",
	            data: {"param": ""},
	            success: function(json) {
	            	console.log('listZones success');
	            	
	            	 var zones = json.listzonesresponse.zone ? json.listzonesresponse.zone : [];
	            	 
	            	 makeListOption(zones, selectZone);
	            }, error: function(json) {
	            	console.log('listZones error');
	            }
	        });
		},
		
		addPod : function(args) {
    		$(".modal.add-pod").modal('hide');

    		var array = [];
	        
			array.push("&zoneid=" + args.zoneid);
	        array.push("&name=" + args.name);
	        array.push("&gateway=" + args.gateway);
	        array.push("&netmask=" +args.netmask);
	        array.push("&startIp=" + args.startIp);

	        var endip = args.endip; //optional
	        if (endip != null && endip.length > 0) {
	        	array.push("&endIp=" + endip);
	        }
	        
	        console.log(array.join(""));

			$.ajax({
	            url: setContextPath + "/admin/infra/createPod",
	            dataType: "json",
	            data: {"param": array.join("")},
	            success: function(json) {
            		console.log('createPod success');
            		
            		setNotification('Create Pod', 'success');

            		$.extend(args, {
	                    podid: json.createpodresponse.pod.id
                    });
            		if(args.dedicated) {
                		pod.dedicatePod(args);        				
        			}
            		else {
                		swal({ title: "Success!", text: 'Create Pod', type: "success", confirmButtonText: "확인" }).then(
                       			function() {
                       				window.location.reload();
                       			});            			
            		}
	            }, error: function(json) {
	            	console.log('createPod error');
	            	
	            	var responseText = json.responseText.split('~');
                	
                	var errortext = JSON.parse(responseText[1]).createpodresponse.errortext;
                	

                	swal({ title: "Error: Create Pod!", text: errortext, type: "error", confirmButtonText: "확인" });

                  	setNotification('Create Pod, errortext: ' + errortext, 'error');
	            }
	        });
			
		},
		
		dedicatePod : function(args) {
			console.log("dedicate pod");
			var array = [];
		    
		    //podid
		    var podid = args.podid; 
		    array.push("&podid=" + podid);
		    
		    //domainid
		    var domainid = args.domainid;
		    array.push("&domainid=" + domainid);
		   
		    //account
			var account = args.account
		    if (account != null && account != undefined){
		    	array.push("&account=" + account);
		    }
			
		    $.ajax({
		        url: setContextPath + "/admin/infra/dedicatePod",
		        dataType: "json",
		        data: {"param":  array.join("")},
		        success: function(json) {
		        	console.log("dedicatePod Success");

		        	setNotification('Dedicate Pod', 'success');
		        	
            		swal({ title: "Success!", text: 'Create Pod and Dedicate Pod', type: "success", confirmButtonText: "확인" }).then(
                   			function() {
                   				window.location.reload();
                   			});            			

		        },
		        error: function(json) {
		        	console.log("dedicatePod Error");  

	            	var responseText = json.responseText.split('~');
                	
                	var errortext = JSON.parse(responseText[1]).dedicatepodresponse.errortext;
                	

                	swal({ title: "Error : Dedicate Pod!", text: 'Create Pod Success But Dedicate Pod Error: ' + errortext, type: "error", confirmButtonText: "확인" }).then(
                   			function() {
                   				window.location.reload();
                   			});
                	
		        	setNotification('Dedicate Pod, errortext: ' + errortext, 'error');
		        }
		    });
		},
	}
	
	cluster = {
		listZones : function(selectZone) {
			$.ajax({
	            url: setContextPath + "/admin/infra/listZones",
	            dataType: "json",
	            data: {"param": ""},
	            success: function(json) {
	            	console.log('listZones success');
	            	
	            	 var zones = json.listzonesresponse.zone ? json.listzonesresponse.zone : [];
	            	 
	            	 makeListOption(zones, selectZone);
	            	 onchangeZoneCluster(selectZone.val());
	            	 
	            	 isValidSelect(selectZone.prop('id'));
	            }, error: function(json) {
	            	console.log('listZones error');
	            }
	        });
		},

		listHypervisor : function(selectHypervisor) {
			$.ajax({
	            url: setContextPath + "/admin/infra/listHypervisors",
	            dataType: "json",
	            async: false,
		        data: {"param": ""},
	            success: function(json) {
	            	console.log('listHypervisors success');
	                var hypervisors = json.listhypervisorsresponse.hypervisor;
	                var availableHypervisorArray = [];
	                $(hypervisors).each(function() {
	                	if(this.name == "XenServer") {
		                	availableHypervisorArray.push({
		                        id: this.name,
		                        name: this.name
		                    })
	                	}
	                });
	                
	                makeListOption(availableHypervisorArray, selectHypervisor);
	                
	                isValidSelect(selectHypervisor.prop('id'));
	            },
	            error: function(json) {
	            	console.log('listHypervisors Error');
	            } 
	        });
		},
		
		listPod : function(args, selectPod) {
			$.ajax({
	            url: setContextPath + "/admin/infra/listPods",
	            dataType: "json",
	            async: false,
		        data: {"param": "&zoneid=" + args.zoneid},
	            success: function(json) {
	            	console.log('listPods success');

	            	var pods = json.listpodsresponse.pod;
	                var availablePodArray = [];
	                $(pods).each(function() {
	                	availablePodArray.push({
	                        id: this.id,
	                        name: this.name
	                    })
	                });
	                
	                makeListOption(availablePodArray, selectPod);
	                
	                isValidSelect(selectPod.prop('id'));
	            },
	            error: function(json) {
	            	console.log('listPods Error');
	            } 
	        });
		},
		
		addCluster : function(args) {
			$(".modal.add-cluster").modal('hide');
			
			var array = [];
	        array.push("&zoneid=" + args.zoneid);
	        array.push("&hypervisor=" + args.hypervisor);
	
	        var clusterType;
	
	        clusterType = "CloudManaged";
	        
	        array.push("&clustertype=" + clusterType);
	
	        array.push("&podid=" + args.podid);
	
	        var clusterName = args.clustername;
	
	        array.push("&clustername=" + clusterName);
	
	        $.ajax({
	            url: setContextPath + "/admin/infra/addCluster",
	            dataType: "json",
	            data: {"param": array.join("")},
	            success: function(json) {
	            	console.log('addCluster success');
	            	
	            	setNotification('Create Pod', 'success');
	            	
            		$.extend(args, {
	                    clusterid: json.addclusterresponse.cluster[0].id
                    });
            		
            		if(args.dedicated) {
        				cluster.dedicateCluster(args);
        			}
            		else {
            			swal({ title: "Success!", text: 'Add Cluster', type: "success", confirmButtonText: "확인" }).then(
            	                function() {
            	                    window.location.reload();
            	                });   
            		}
	            },
	            error: function(json) {
	                console.log('addCluster error');
	                
	                var responseText = json.responseText.split('~');
	                
	                var errortext = JSON.parse(responseText[1]).addclusterresponse.errortext;
	                

	                swal({ title: "Error: Create Pod!", text: errortext, type: "error", confirmButtonText: "확인" });

	                setNotification('Add Cluster, errortext: ' + errortext, 'error');
	            }
	        });
		},
		
		dedicateCluster : function(args) {
			console.log("dedicate cluster");
			var array = [];
		    
		    //clusterid
		    var clusterid = args.clusterid; 
		    array.push("&clusterid=" + clusterid);
		    
		    //domainid
		    var domainid = args.domainid;
		    array.push("&domainid=" + domainid);
		   
		    //account
			var account = args.account
		    if (account != null && account != undefined){
		    	array.push("&account=" + account);
		    }
			
		    $.ajax({
		        url: setContextPath + "/admin/infra/dedicateCluster",
		        dataType: "json",
		        data: {"param":  array.join("")},
		        success: function(json) {
		        	console.log("dedicateCluster Success");

		        	setNotification('Dedicate Cluster', 'success');

		        	swal({ title: "Success!", text: 'Add Cluster and Dedicate Cluster', type: "success", confirmButtonText: "확인" }).then(
		        	        function() {
		        	            window.location.reload();
		        	        });    
		        },
		        error: function(json) {
		        	console.log("dedicateCluster Error");  
		        	
		        	var responseText = json.responseText.split('~');
		        	
		        	var errortext = JSON.parse(responseText[1]).dedicateclusterresponse.errortext;
		        	

		        	swal({ title: "Error : Dedicate Cluster!", text: 'Add Cluster Success But Dedicate Cluster Error: ' + errortext, type: "error", confirmButtonText: "확인" }).then(
		        	        function() {
		        	            window.location.reload();
		        	        });

		        	setNotification('Dedicate Cluster, errortext: ' + errortext, 'error');
		        }
		    });
		},
	}
	
	host = {
		listZones : function(selectZone) {
			$.ajax({
	            url: setContextPath + "/admin/infra/listZones",
	            dataType: "json",
	            data: {"param": ""},
	            success: function(json) {
	            	console.log('listZones success');
	            	
	            	 var zones = json.listzonesresponse.zone ? json.listzonesresponse.zone : [];
	            	 
	            	 makeListOption(zones, selectZone);
	            	 onchangeZoneHost(selectZone.val());
	            	 
	            	 isValidSelect(selectZone.prop('id'));
	            }, error: function(json) {
	            	console.log('listZones error');
	            }
	        });
		},
		
		listPod : function(args, selectPod) {
			$.ajax({
	            url: setContextPath + "/admin/infra/listPods",
	            dataType: "json",
	            async: false,
		        data: {"param": "&zoneid=" + args.zoneid},
	            success: function(json) {
	            	console.log('listPods success');

	            	var pods = json.listpodsresponse.pod;
	                var availablePodArray = [];
	                $(pods).each(function() {
	                	availablePodArray.push({
	                        id: this.id,
	                        name: this.name
	                    })
	                });
	                
	                makeListOption(availablePodArray, selectPod);
	                onchangePodHost(selectPod.val());
	                
	                isValidSelect(selectPod.prop('id'));
	            },
	            error: function(json) {
	            	console.log('listPods Error');
	            } 
	        });
		},
		
		listCluster : function(args, selectCluster) {
			$.ajax({
	            url: setContextPath + "/admin/infra/listClusters",
	            dataType: "json",
	            async: false,
		        data: {"param": "&podid=" + args.podid},
	            success: function(json) {
	            	console.log('listClusters success');

	            	var clusters = json.listclustersresponse.cluster;
	                availableClusterArray = [];
	                $(clusters).each(function() {
	                	availableClusterArray.push({
	                        id: this.id,
	                        name: this.name,
	                        hypervisor: this.hypervisortype,
	                        clustertype: this.clustertype
	                    })
	                });
	                
	                makeListOption(availableClusterArray, selectCluster);
	                
	                isValidSelect(selectCluster.prop('id'));
	            },
	            error: function(json) {
	            	console.log('listClusters Error');
	            } 
	        });
		},
		
		addHost : function(args) {
			console.log('addHost');
			$(".modal.add-host").modal('hide');
			
            var hostname = args.hostname;
            var url;
            if (hostname.indexOf("http://") == -1)
            url = "http://" + hostname; else
            url = hostname;

            $.extend(args, {
                url: url
            });
            
            var array = [];
            array.push("&url=" + url);
            array.push("&zoneid=" + args.zoneid);
            array.push("&podid=" + args.podid);
            array.push("&clusterid=" + args.clusterid);
            array.push("&hypervisor=" + args.hypervisor);
            array.push("&hosttags=" + args.hosttags);	    	
            array.push("&username=" + args.username);
            array.push("&password=" + args.password);
            array.push("&clustertype=" + args.clustertype);
    	    
            var hostid = null;
            
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
                url: setContextPath + "/admin/infra/addHost",
	            dataType: "json",
		        data: {"param": array.join("")},
                success: function (json) {
                	console.log('addHost success');
                	
                	setNotification('Add Host', 'success');
                	
                    var item = json.addhostresponse.host[0];

                    var hostid = json.addhostresponse.host[0].id;
                    var array = [];
                    if (args.accounid != "")
                        array.push("&account=" + args.account);

                    if (args.dedicated) {
                        if (hostid != null) {
                            $.ajax({
                                url: setContextPath + "/admin/infra/dedicateHost",
                	            dataType: "json",
                		        data: {"param": "&hostid=" + hostid + "&domainid=" + args.domainid + array.join("")},
                                success: function (json) {
                                	console.log('dedicateHost success');
                                	
                                	setNotification('Dedicate Host', 'success');
                                	
                                	swal({ title: "Success!", text: 'Create Pod and Dedicate Pod', type: "success", confirmButtonText: "확인" }).then(
                                	        function() {
                                	            window.location.reload();
                                	        });        
                                },

                                error: function (json) {
                                	console.log('dedicateHost error');
                                	
                                	var responseText = json.responseText.split('~');
                                	
                                	var errortext = JSON.parse(responseText[1]).dedicatepodresponse.errortext;
                                	

                                	swal({ title: "Error : Dedicate Pod!", text: 'Create Pod Success But Dedicate Pod Error: ' + errortext, type: "error", confirmButtonText: "확인" }).then(
                                	        function() {
                                	            window.location.reload();
                                	        });

                                	setNotification('Dedicate Pod, errortext: ' + errortext, 'error');

                                }
                            });
                        }
                    }
                    else {
                    	swal({ title: "Success!", text: 'Add Host', type: "success", confirmButtonText: "확인" }).then(
                                function() {
                                    window.location.reload();
                                });
                    }
                },
                error: function (json) {
                	console.log('addHost error');        
                	
                	var responseText = json.responseText.split('~');
                    
                    var errortext = JSON.parse(responseText[1]).addhostresponse.errortext;
                    

                    swal({ title: "Error: Add Host!", text: errortext, type: "error", confirmButtonText: "확인" });

                    setNotification('Add Host, errortext: ' + errortext, 'error');
                    
                }
            });
		}
	}
	
	primaryStorage = {
			listZones : function(selectZone) {
				$.ajax({
		            url: setContextPath + "/admin/infra/listZones",
		            dataType: "json",
		            data: {"param": ""},
		            success: function(json) {
		            	console.log('listZones success');
		            	
		            	var zones = json.listzonesresponse.zone ? json.listzonesresponse.zone : [];
		            	 
		            	makeListOption(zones, selectZone);
		            	
		            	onchangeZonePrimaryStorage(selectZone.val());
		            }, error: function(json) {
		            	console.log('listZones error');
		            }
		        });
			},
			
			listPods : function(args, selectPod) {
				$.ajax({
		            url: setContextPath + "/admin/infra/listPods",
		            dataType: "json",
		            data: {"param": "&zoneid=" + args.zoneid},
		            success: function(json) {
		            	console.log('listPods success');
		            	
		            	 var pods = json.listpodsresponse.pod ? json.listpodsresponse.pod : [];
		            	 
		            	 makeListOption(pods, selectPod);
		            	 onchangePodPrimaryStorage(selectPod.val());
		            }, error: function(json) {
		            	console.log('listPods error');
		            }
		        });
			},
			
			listClusters : function(args, selectCluster) {
				$.ajax({
		            url: setContextPath + "/admin/infra/listClusters",
		            dataType: "json",
		            data: {"param": "&podid=" + args.podid},
		            success: function(json) {
		            	console.log('listClusters success');
		            	
		            	 var clusters = json.listclustersresponse.cluster ? json.listclustersresponse.cluster : [];
		            	 
		            	 availableClusterArray = clusters;
		            	 
		            	 makeListOption(clusters, selectCluster);
		            	 onchangeClusterPrimaryStorage(selectCluster.val());
//		            	 onchangeProtocolPrimaryStorage($('select#protocol').val());
		            }, error: function(json) {
		            	console.log('listClusters error');
		            }
		        });
			},
			
			listStorageProviders : function(selectProvider) {
				$.ajax({
		            url: setContextPath + "/admin/infra/listStorageProviders",
		            dataType: "json",
		            data: {"param": "&type=primary"},
		            success: function(json) {
		            	console.log('listStorageProviders success');
		            	
		            	 var providers = json.liststorageprovidersresponse.dataStoreProvider ? json.liststorageprovidersresponse.dataStoreProvider : [];
                         var availableproviderArray = [];

                         $(providers).each(function() {
                        	 availableproviderArray.push({
    	                         id: this.name,
    	                         name: this.name
    	                     });
                         });
		            	 
		            	 makeListOption(availableproviderArray, selectProvider);
		            	 onchangeProviderPrimaryStorage(selectProvider.val());
		            }, error: function(json) {
		            	console.log('listStorageProviders error');
		            }
		        });
			},
			
			listStorageTags : function(selectStorageTag) {
				$.ajax({
                    url: setContextPath + "/admin/infra/listStorageTags",
		            dataType: "json",
		            data: {"param": ""},
                    success: function(json) {
                    	console.log('listStorageTags success');
                    	
                        var storageTags = json.liststoragetagsresponse.storagetag;
//                        var availableTagArray = [];
//
//                        $(storageTags).each(function() {
//                        	availableTagArray.push({
//    	                        id: this.id,
//    	                        name: this.name
//    	                    });
//                        });
//
//                        makeListOption(availableTagArray, selectStorageTag);
                    },
                    error: function(json) {
                    	console.log('listStorageTags error');
                    }
                });
			},
			
			addStorage : function(args) {
				console.log(args);
                var array =[];
                array.push("&scope=" + args.scope);

                array.push("&zoneid=" + args.zoneid);

//                if (args.scope == 'zone') { //zone wide
//
//                    array.push("&hypervisor=" + args.hypervisor);
//                }

                if (args.scope == 'cluster') {

                    array.push("&podid=" + args.podid);
                    array.push("&clusterid=" + args.clusterid);
                }

                array.push("&name=" + args.name);

                array.push("&provider=" + args.provider);

                if (args.provider == "DefaultPrimary")
                {
                    var server = args.server;
                    var url = null;
                    if (args.protocol == "nfs") {
                        var path = args.path;
                        if (path.substring(0, 1) != "/")
                            path = "/" + path;
                        url = nfsURL(server, path);
                    } else if (args.protocol == "PreSetup") {
                        var path = args.path;
                        if (path.substring(0, 1) != "/")
                            path = "/" + path;
                        url = presetupURL(server, path);
                    } else if (args.protocol == "iscsi") {
                        var iqn = args.iqn;
                        if (iqn.substring(0, 1) != "/")
                            iqn = "/" + iqn;
                        var lun = args.lun;
                        url = iscsiURL(server, iqn, lun);
                    } else {
                        url = "";
                    }

                    array.push("&url=" + url);
                }
                else
                {
                    array.push("&managed=" + (args.isManaged == "on").toString());

                    if (args.capacityBytes != null && args.capacityBytes.length > 0)
                    {
                        array.push("&capacityBytes=" + args.capacityBytes.split(",").join(""));
                    }

                    if (args.capacityIops != null && args.capacityIops.length > 0)
                    {
                        array.push("&capacityIops=" + args.capacityIops.split(",").join(""));
                    }

                    if (args.url != null && args.url.length > 0)
                    {
                        array.push("&url=" + args.url);
                    }
                }

                if (args.storageTags != null && args.storageTags.length > 0)
                {
                    array.push("&tags=" + args.storageTags);
                }

//                if ("custom" in args.response) { //???
//                    args.response.custom(array);
//                    return;
//                }

                $.ajax({
                    url: setContextPath + "/admin/infra/createStoragePool",
		            dataType: "json",
		            data: {"param": array.join("")},
                    success: function (json) {
                    	console.log('createStoragePool success');
                    	
                    	setNotification('Create Primary Storage', 'success');
                    	
                    	swal({ title: "Success!", text: 'Create Primary Storage', type: "success", confirmButtonText: "확인" }).then(
                    	        function() {
                    	            window.location.reload();
                    	        });        
                    },
                    error: function (json) {
                    	console.log('createStoragePool error');
                    	
                    	var responseText = json.responseText.split('~');
	                    
	                    var errortext = JSON.parse(responseText[1]).createstoragepoolresponse.errortext;
	                    
                    	
                    	swal({ title: "Error: Create Primary Storage!", text: errortext, type: "error", confirmButtonText: "확인" });

                        setNotification('Create Primary Storage, errortext: ' + errortext, 'error');
                    }
                });
				
			}
			
	}
	
	secondaryStroage = {
			listZones : function(selectZone) {
				$.ajax({
		            url: setContextPath + "/admin/infra/listZones",
		            dataType: "json",
		            data: {"param": ""},
		            success: function(json) {
		            	console.log('listZones success');
		            	
		            	 var zones = json.listzonesresponse.zone ? json.listzonesresponse.zone : [];
		            	 
		            	 makeListOption(zones, selectZone);
		            }, error: function(json) {
		            	console.log('listZones error');
		            }
		        });
			},
			
			addImageStore : function(args) {
				var array = [];
				
				 if (args.name != null && args.name.length > 0) {
					 array.push("&name=" + args.name);
				 }
				 
				 array.push("&provider=" + args.provider);
				
				if (args.provider == 'NFS') {
			        array.push("&zoneid=" + args.zoneid);
			        
			        var nfs_server = args.nfsServer;
			        var path = args.path;
			        var url = nfsURL(nfs_server, path);
			        
			        array.push("&url=" + url);

			        $.ajax({
			            url: setContextPath + "/admin/infra/addImageStore",
			            dataType: "json",
			            data: {"param": array.join("")},
			            success: function (json) {
			            	console.log('addImageStore success');

			            	setNotification('Create Secondary Storage', 'success');
	                    	
	                    	swal({ title: "Success!", text: 'Create Secondary Storage', type: "success", confirmButtonText: "확인" }).then(
	                    	        function() {
	                    	            window.location.reload();
	                    	        });        
			            },
			            error: function (json) {
			            	console.log('addImageStore error');
			            	
			            	var responseText = json.responseText.split('~');
		                    
		                    var errortext = JSON.parse(responseText[1]).addimagestoreresponse.errortext;
		                    
			            	
			            	swal({ title: "Error: Create Secondary Storage!", text: errortext, type: "error", confirmButtonText: "확인" });

	                        setNotification('Create Primary Secondary, errortext: ' + errortext, 'error');			            
                        }
			        });
			    } else if (args.provider == 'SMB') {
			    	array.push("&zoneid=" + args.zoneid);
			    	
			        var nfs_server = args.nfsServer;
			        var path = args.path;
			        var url = smbURL(nfs_server, path);
			        
			        array.push("&url=" + url);
			        
			        array.push('&details[0].key=' + 'user');
			        array.push("&details[0].value=" + args.smbUsername);
			        array.push('&details[1].key=' + 'password');
			        array.push("&details[1].value=" + args.smbPassword);
			        array.push('&details[2].key=' + 'domain');
			        array.push("&details[2].value=" + args.smbDomain);

			        $.ajax({
			            url: setContextPath + "/admin/infra/addImageStore",
			            dataType: "json",
			            data: {"param": array.join("")},
			            success: function (json) {
			            	console.log('addImageStore success');

		            		setNotification('Create Secondary Storage', 'success');
	                    	
	                    	swal({ title: "Success!", text: 'Create Secondary Storage', type: "success", confirmButtonText: "확인" }).then(
	                    	        function() {
	                    	            window.location.reload();
	                    	        });        
			            },
			            error: function (json) {
			            	console.log('addImageStore error');
			            	
			            	var responseText = json.responseText.split('~');
		                    
		                    var errortext = JSON.parse(responseText[1]).addimagestoreresponse.errortext;
		                    
			            	
			            	swal({ title: "Error: Create Secondary Storage!", text: errortext, type: "error", confirmButtonText: "확인" });

	                        setNotification('Create Primary Secondary, errortext: ' + errortext, 'error');	
			            }
			        });
			    } else if (args.provider == 'S3') {
			        array.push('&details[0].key=' + 'accesskey');
			        array.push("&details[0].value=" + args.accesskey);
			        array.push('&details[1].key=' + 'secretkey');
			        array.push("&details[1].value=" + args.secretkey);
			        array.push('&details[2].key=' + 'bucket');
			        array.push("&details[2].value=" + args.bucket);
			        array.push('&details[3].key=' + 'usehttps');
			        array.push("&details[3].value=" + args.usehttps);

			        var index = 4;
			        if (args.endpoint != null && args.endpoint.length > 0) {
				        array.push('&details[' + index.toString() + '].key=' + 'endpoint');
				        array.push('&details[' + index.toString() + '].value=' + args.endpoint);
			            index++;
			        }
			        if (args.connectiontimeout != null && args.connectiontimeout.length > 0) {
				        array.push('&details[' + index.toString() + '].key=' + 'connectiontimeout');
				        array.push('&details[' + index.toString() + '].value=' + args.connectiontimeout);
			            index++;
			        }
			        if (args.maxerrorretry != null && args.maxerrorretry.length > 0) {
				        array.push('&details[' + index.toString() + '].key=' + 'maxerrorretry');
				        array.push('&details[' + index.toString() + '].value=' + args.maxerrorretry);
			            index++;
			        }
			        if (args.sockettimeout != null && args.sockettimeout.length > 0) {
				        array.push('&details[' + index.toString() + '].key=' + 'sockettimeout');
				        array.push('&details[' + index.toString() + '].value=' + args.sockettimeout);
			            index++;
			        }

			        $.ajax({
			            url: setContextPath + "/admin/infra/addImageStore",
			            dataType: "json",
			            data: {"param": array.join("")},
			            success: function (json) {
			            	console.log('addImageStore success');
			                regionsecondaryenabled = true;

		                	setNotification('Create Secondary Storage', 'success');
	                    		                    	
	                    	if (args.createNfsCache) {
	    			        	var nfsCacheArray = [];

	    			        	nfsCacheArray.push("&zoneid=" + args.nfsCacheZoneid);
	    			        	nfsCacheArray.push("&provider=" + args.provider);
	    				    	
	    			            var nfs_server = args.nfsCacheNfsServer;
	    			            var path = args.nfsCachePath;
	    			            var url = nfsURL(nfs_server, path);
	    			            nfsCacheArray.push("&url=" + url);
	    			            
	    			            $.ajax({
	    				            url: setContextPath + "/admin/infra/createSecondaryStagingStore",
	    				            dataType: "json",
	    				            data: {"param": nfsCacheArray.join("")},
	    				            success: function (json) {
	    				            	console.log('createSecondaryStagingStore success');
	    			                    //do nothing
	    				            	
	    				            	setNotification('Create NFS Secondary Staging Storage', 'success');
	    		                    	
	    		                    	swal({ title: "Success!", text: 'Create Secondary Storage and Create NFS Secondary Staging Storage', type: "success", confirmButtonText: "확인" }).then(
	    		                    	        function() {
	    		                    	            window.location.reload();
	    		                    	        });
	    				            },
	    				            error: function (json) {
	    				            	console.log('createSecondaryStagingStore error');

	    				            	var responseText = json.responseText.split('~');
	    			                    
	    			                    var errortext = JSON.parse(responseText[1]).createsecondarystagingstoreresponse.errortext;
	    			                    
	    				            	
	    				            	setNotification('Create NFS Secondary Staging Storage, errortext: ' + errortext, 'error');
	    				            	
	    				            	swal({ title: "Success!", text: 'Create Secondary Storage Success But Create NFS Secondary Staging Storage Error', type: "success", confirmButtonText: "확인" }).then(
	    		                    	        function() {
	    		                    	            window.location.reload();
	    		                    	        });
	    				            }
	    				        });
	    			        }
			            },
			            error: function (json) {
			            	console.log('addImageStore error');

			            	var responseText = json.responseText.split('~');
		                    
		                    var errortext = JSON.parse(responseText[1]).addimagestoreresponse.errortext;
		                    
			            	
			            	swal({ title: "Error: Create Secondary Storage!", text: errortext, type: "error", confirmButtonText: "확인" });

	                        setNotification('Create Primary Secondary, errortext: ' + errortext, 'error');
			            }
			        });

			        
			    } else if (provider == 'Swift') {
			        array.push("&url=" + args.url);

			        var index = 0;
			        if (args.account != null && args.account.length > 0) {
				        array.push('&details[' + index.toString() + '].key=' + 'account');
				        array.push('&details[' + index.toString() + '].value=' + args.account);
			            index++;
			        }
			        if (args.username != null && args.username.length > 0) {
				        array.push('&details[' + index.toString() + '].key=' + 'username');
				        array.push('&details[' + index.toString() + '].value=' + args.username);
			            index++;
			        }
			        if (args.key != null && args.key.length > 0) {
				        array.push('&details[' + index.toString() + '].key=' + 'key');
				        array.push('&details[' + index.toString() + '].value=' + args.key);
			            index++;
			        }
			        if (args.storagepolicy != null && args.storagepolicy.length > 0) {
				        array.push('&details[' + index.toString() + '].key=' + 'storagepolicy');
				        array.push('&details[' + index.toString() + '].value=' + args.storagepolicy);
			            index++;
			        }
			        
			        $.ajax({
			            url: setContextPath + "/admin/infra/addImageStore",
			            dataType: "json",
			            data: {"param": array.join("")},
			            success: function (json) {
			            	console.log('addImageStore success');
			                regionsecondaryenabled = true;
			                
			                setNotification('Create Secondary Storage', 'success');
	                    	
	                    	swal({ title: "Success!", text: 'Create Secondary Storage', type: "success", confirmButtonText: "확인" }).then(
	                    	        function() {
	                    	            window.location.reload();
	                    	        });       
			            },
			            error: function (json) {
			            	console.log('addImageStore error');
			            	
			            	var responseText = json.responseText.split('~');
		                    
		                    var errortext = JSON.parse(responseText[1]).addimagestoreresponse.errortext;
		                    
		                    
			            	swal({ title: "Error: Create Secondary Storage!", text: errortext, type: "error", confirmButtonText: "확인" });

	                        setNotification('Create Primary Secondary, errortext: ' + errortext, 'error');
			            }
			        });
			    }
			}
	
	}
	
}(jQuery))


