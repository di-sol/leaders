/**
 * 
 */
	
	function startBtnClicked(instanceData) {
		
		// 먼저 template list 가져와서 select list에 뿌려줌
		var newHostsList = new Object();
		
		$.ajax({
			url: setContextPath + '/getListHosts',
			type:'POST',
			dataType:'text',
			async: false,
			data:{"test":""},
			success:function(data){
				console.log("getListHosts");
				
				var arr = data.split("~");
				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
				
				if ( arr[0] != "connection failed.") {
					
					var hostsList = JSON.parse(arr[0]).listhostsresponse.host;

					for(var i=0; i<hostsList.length; i++) {
						newHostsList[hostsList[i].id] = hostsList[i].name;
					}
					// console.log(newTemplatesList);
					
				} else {
					errorObj = JSON.parse(arr[1]).listhostsresponse;
					swal("error",errorObj.errortext,"error");
					return;
				}

			},error:function(request, status, error){
   				console.log(request+","+status+","+error);
				return;
   			}
   		});	
		
		// console.log(newHostsList);
		
		swal({
		  	title: 'Start VM',
		  	input: 'select',
		  	inputOptions: newHostsList,
		  	inputPlaceholder: 'Select a host',
		  	showCancelButton: true,
		  	allowEscapeKey: false,
		  	allowOutsideClick: false,

		}).then(function (result) {
			
			console.log(result);
			
			if (result.dismiss === "cancel") { // 취소면 그냥 나감
				return;
			}
			
			var hostid = result.value;
			work = "Start VM : " + instanceData.name;
			
			var command = "";
			if (hostid == "") { // select 선택값이 없으면 value가 없다 
				command = "startVirtualMachine&id="+instanceData.id;
			} else {// select 선택값이 있을 때(templateid 가 있을경우)
				command = "startVirtualMachine&id="+instanceData.id + "&hostid=" + hostid;
			}
			
			$.ajax({
    			url:setContextPath + '/apiStartVM',
    			type:'POST',
    			dataType:'text',
    			async: false,
    			data:{"test":command},
    			success:function(data){
    				console.log("startVirtualMachine");
    				// console.log(data);
    				var arr = data.split("~");
    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
    				if ( arr[0] != "connection failed.") {
    					// data => arr[0] 으로 변경
        				var jobid = JSON.parse(arr[0]).startvirtualmachineresponse.jobid;
        				
        				loadingImageMethod(jobid, work);
    					
    				} else {
    					errorObj = JSON.parse(arr[1]).startvirtualmachineresponse;
    					swal("error",errorObj.errortext,"error");
    					setNotification(errorObj.errortext, 'error');
    				}
    				
    			},error:function(request, status, error){
       				console.log(request+","+status+","+error);
       			}
       		});	
		});
		
	}

	
	
	function stopBtnClicked(instanceData) {
		
		swal({
			title: 'Stop VM',
			input: 'checkbox',
			inputPlaceholder: 'Forced Stop',
            showCancelButton: true,
            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Stop",
            allowEscapeKey: false,
			}).then(function(result) {
				if (result.dismiss === "cancel") { // 취소면 그냥 나감
					return;
				}
				// result.value 가 1이면 expunge 체크된 상황
				// result.value 가 0이면 destroy, cancel 은 dismiss:cancel 로 반환
				var cmd = "";
				var work = "";
				// console.log(id);
				if (result.value === 0) {
					// destroy
					cmd = "stopVirtualMachine&id="+instanceData.id;
					work = "Stop VM : " + instanceData.name;

				} else if (result.value === 1) { 
					// destroy with expunge
					cmd = "stopVirtualMachine&id="+instanceData.id + "&forced=true";		
					work = "Forced Stop VM : " + instanceData.name;
				}
				// console.log(cmd);

				$.ajax({
	    			url:setContextPath + '/apiStopVM',
	    			type:'POST',
	    			async: false,
	    			dataType:'text',
	    			data:{"test":cmd},
	    			success:function(data){
	    				console.log("stopVirtualMachine cmd : " + cmd);
	
	    				var arr = data.split("~");
	    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
	    				if ( arr[0] != "connection failed.") {
	    					// data => arr[0] 으로 변경
		    				var jobid = JSON.parse(arr[0]).stopvirtualmachineresponse.jobid;
		    				
		    				loadingImageMethod(jobid, work);
	    					
	    				} else {
	    					errorObj = JSON.parse(arr[1]).stopvirtualmachineresponse;
	    					swal("error",errorObj.errortext,"error");
	    					setNotification(errorObj.errortext, 'error');
	    				}

	    			},error:function(request, status, error){
	       				console.log(request+","+status+","+error);
	       			}
	       		});	
				
			});
		
		
	}
	
	function destroyBtnClicked(instanceData) {
		
		swal({
			title: 'Destroy VM',
			input: 'checkbox',
			inputPlaceholder: 'With Expunge',
            showCancelButton: true,
            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Destroy",
            allowEscapeKey: false,
			}).then(function(result) {
				if (result.dismiss === "cancel") { // 취소면 그냥 나감
					return;
				}
				// result.value 가 1이면 expunge 체크된 상황
				// result.value 가 0이면 destroy, cancel 은 dismiss:cancel 로 반환
				var cmd = "";
				var work = "";
				// console.log(id);
				if (result.value === 0) {
					// destroy
					cmd = "destroyVirtualMachine&id="+instanceData.id;
					work = "Destroy VM : " + instanceData.name;

				} else if (result.value === 1) { 
					// destroy with expunge
					cmd = "destroyVirtualMachine&id="+instanceData.id + "&expunge=true";		
					work = "Expunge VM : " + instanceData.name;
				}
				// console.log(cmd);

				$.ajax({
	    			url:setContextPath + '/apiDestroyVM',
	    			type:'POST',
	    			async: false,
	    			dataType:'text',
	    			data:{"test":cmd},
	    			success:function(data){
	    				console.log("destroyVirtualMachine cmd : " + cmd);

	    				// console.log(data);
	    				var arr = data.split("~");
	    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
	    				if ( arr[0] != "connection failed.") {
	    					// data => arr[0] 으로 변경
	        				var jobid = JSON.parse(arr[0]).destroyvirtualmachineresponse.jobid;
	        				
	        				loadingImageMethod(jobid, work);
	    					
	    				} else {
	    					errorObj = JSON.parse(arr[1]).destroyvirtualmachineresponse;
	    					swal("error",errorObj.errortext,"error");
	    					setNotification(errorObj.errortext, 'error');
	    				}

	    			},error:function(request, status, error){
	       				console.log(request+","+status+","+error);
	       			}
	       		});	

			});
	}
	
	function recoverBtnClicked(instanceData) {
		
		swal({
			title: 'Recover VM',
			text: '복구 하시겠습니까?',
            showCancelButton: true,
            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
            confirmButtonColor: "#DD6B55",
            allowEscapeKey: false,
			}).then(function(result) {
				
				console.log(result);
				
				if (result.dismiss === "cancel") { // 취소면 그냥 나감
					return;
				}

				work = "Recover VM : " + instanceData.name;
				$.ajax({
	    			url:setContextPath + '/apiRecoverVM',
	    			type:'POST',
	    			async: false,
	    			dataType:'text',
	    			data:{"test":"recoverVirtualMachine&id=" + instanceData.id},
	    			success:function(data){
	    				console.log("recoverVirtualMachine");
	    				// 데이터 오는거에 따라서 오류인지 확인할것
	    				var arr = data.split("~");
	    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
	    				if ( arr[0] != "connection failed.") {
	    					
	    					// jobid 없는것
	    					/*swal("success", work, "success");
	    					setNotification(work, 'success');	    
	    					*/
	    					// loadingImageMethod 안에 jobid (undefined) 없는것 처리 했음
	    					var jobid = JSON.parse(arr[0]).recovervirtualmachineresponse.jobid;

	    					loadingImageMethod(jobid, work);
	    					
	    				} else {
	    					errorObj = JSON.parse(arr[1]).recovervirtualmachineresponse;
	    					swal("error",errorObj.errortext,"error");
	    					setNotification(errorObj.errortext, 'error');
	    				}

	    			},error:function(request, status, error){
	       				console.log(request+","+status+","+error);
	       			}
	       		});
			});	
		
	}

	function reinstoreBtnClicked(instanceData) {
		
		// 먼저 template list 가져와서 select list에 뿌려줌
		var newTemplatesList = new Object();
		
		$.ajax({
			url:setContextPath + '/getListTemplates',
			type:'POST',
			dataType:'text',
			async: false,
			data:{"test":""},
			success:function(data){
				console.log("getListTemplates");
				
				var arr = data.split("~");
				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
				if ( arr[0] != "connection failed.") {
					
					var templatesList = JSON.parse(arr[0]).listtemplatesresponse.template;

					for(var i=0; i<templatesList.length; i++) {
						newTemplatesList[templatesList[i].id] = templatesList[i].name;
					}
					// console.log(newTemplatesList);
					
				} else {
	   				errorObj = JSON.parse(arr[1]).listhostsresponse;
	   				swal("error",errorObj.errortext,"error");
					return;
				}
			},error:function(request, status, error){
   				console.log(request+","+status+","+error);
				return;
   			}
   		});	
		
		// console.log(newTemplatesList);
		
		swal({
		  	title: 'Reinstall VM',
		  	input: 'select',
		  	/* inputOptions: {
		  		newTemplatesList
		  	}, {} 이게 오브젝트 넣으란 거구나...*/
		  	
		  	inputOptions: newTemplatesList,
		  	text: "NOTE: Proceed with caution. This will cause the VM to be reinstalled from the template " + 
		  			"data on the root disk will be lost. Extra data volumes, if any, will not be touched.",
		  	inputPlaceholder: 'Select a template(Default)',
		  	showCancelButton: true,
		  	allowEscapeKey: false,
		  	allowOutsideClick: false,

		}).then(function (result) {
			
			console.log(result);
			
			if (result.dismiss === "cancel") { // 취소면 그냥 나감
				return;
			}
			
			var templateid = result.value;
			work = "Reinstall VM : " + instanceData.name;
			
			var command = "";
			if (templateid == "") { // select 선택값이 없으면 value가 없다 
				command = "restoreVirtualMachine&virtualmachineid="+instanceData.id;
			} else {// select 선택값이 있을 때(templateid 가 있을경우)
				command = "restoreVirtualMachine&virtualmachineid="+instanceData.id + "&templateid=" + templateid;
			}
			
			$.ajax({
    			url:setContextPath + '/apiReinstallVM',
    			type:'POST',
    			dataType:'text',
    			async: false,
    			data:{"test":command},
    			success:function(data){
    				console.log("restoreVirtualMachine");
    				// console.log(data);
    				    				
    				var arr = data.split("~");
    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
    				if ( arr[0] != "connection failed.") {
    					// data => arr[0] 으로 변경
        				var jobid = JSON.parse(arr[0]).restorevmresponse.jobid;
        				
        				loadingImageMethod(jobid, work);
    					
    				} else {
    					errorObj = JSON.parse(arr[1]).startvirtualmachineresponse;
    					swal("error",errorObj.errortext,"error");
    					setNotification(errorObj.errortext, 'error');
    				}
    				
    			},error:function(request, status, error){
       				console.log(request+","+status+","+error);
       			}
       		});	
		});

	}
	
	function expungeBtnClicked(instanceData) {
		
		swal({
			title: 'Expunge VM',
			text: 'Expunge 하시겠습니까?',
            showCancelButton: true,
            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
            confirmButtonColor: "#DD6B55",
            allowEscapeKey: false,
			}).then(function(result) {
				
				console.log(result);
				
				if (result.dismiss === "cancel") { // 취소면 그냥 나감
					return;
				}

				work = "Expunge VM : " + instanceData.name;
				$.ajax({
	    			url:setContextPath + '/apiExpungeVM',
	    			type:'POST',
	    			dataType:'text',
	    			async: false,
	    			data:{"test":"expungeVirtualMachine&id="+instanceData.id},
	    			success:function(data){
	    				console.log("expungeVirtualMachine");

	    				var arr = data.split("~");
	    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
	    				if ( arr[0] != "connection failed.") {
	    					// data => arr[0] 으로 변경
	    					var jobid = JSON.parse(arr[0]).expungevirtualmachineresponse.jobid;
	    					
	    					loadingImageMethod(jobid, work);
	    					
	    				} else {
	    					errorObj = JSON.parse(arr[1]).expungevirtualmachineresponse;
	    					swal("error",errorObj.errortext,"error");
	    					setNotification(errorObj.errortext, 'error');
	    				}
	    				 
	    			},error:function(request, status, error){
	       				console.log(request+","+status+","+error);
	       			}
	       		});	
			});	
	}
	
	function takeSnapshotBtnClicked(instanceData) {
			
		 swal({
		 	title: 'Take Snapshot',
			html:
			  	'<table align="center">' + 
			  	'<tr><td style="text-align:right; padding-right:20px;">Name</td><td><input type="text" class="swal2-input not-space" id="snapshotName" onkeyup="preventSpace($(this));"></td></tr>' +
			    '<tr><td style="text-align:right; padding-right:20px;">Description</td><td><textarea id="snapshotDesciption" class="swal2-input" style="height:100px;"></textarea></td></tr>' +
			    '<tr><td style="text-align:right; padding-right:20px;">Snapshot Memory</td><td><input type="checkbox" id="memoryChecked"></td></tr>' + 
			    '</table>',
			showCancelButton: true,
			allowEscapeKey: false,
			allowOutsideClick: false,
			confirmButtonText: 'OK',
			onOpen: () => {
				// memorycheck 부분이 다름 
				if (instanceData.state === "Stopped"){ // tr 잡기위함
					$("#memoryChecked").parent().parent().hide();
				} else if (instanceData.state === "Running"){
					$("#memoryChecked").parent().parent().show();	
				}
			}
			
			}).then(function(result){
				
				console.log(result);
				
				if (result.dismiss === "cancel") { // 취소면 그냥 나감LnewAlarm
					return;
				}

				name = $("#snapshotName").val();
				description = $("#snapshotDesciption").val();
				snapshotmemory = $("#memoryChecked").is(':checked');
				
				// 입력을 할수도 있고, 안할수도 있어서 
				var command = "createVMSnapshot";
				work = "Create Snapshot : " + instanceData.name;
			
				$.ajax({
	    			url:setContextPath + '/apiCreateVMSnapshot',
	    			type:'POST',
	    			dataType:'text',
	    			async: false,
	    			data:{	"command":command,
	    					"id":instanceData.id,
		    				"name":name,
		    				"description":description,
		    				"snapshotmemory":snapshotmemory },
	    			success:function(data){
	    				console.log("apiCreateVMSnapshot");
	    				// console.log(data);


	    				var arr = data.split("~");
	    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
	    				if ( arr[0] != "connection failed.") {
	    					// data => arr[0] 으로 변경
	    					var jobid = JSON.parse(arr[0]).createvmsnapshotresponse.jobid;
	    					
	    					loadingImageMethod(jobid, work);
	    					
	    				} else {
	    					errorObj = JSON.parse(arr[1]).createvmsnapshotresponse;
	    					swal("error",errorObj.errortext,"error");
	    					setNotification(errorObj.errortext, 'error');
	    				}
	    				
	    			},error:function(request, status, error){
	       				console.log(request+","+status+","+error);    
	       			}
	       		});
				
			})

	}
	
	function changeServiceOfferingBtnClicked(instanceData) {
		
		var newServiceList = new Object();
		
		var command = "listServiceOfferings&virtualmachineid=" + instanceData.id;
		$.ajax({
			url:setContextPath + '/getListSerivce',
			type:'POST',
			dataType:'text',
			async: false,
			data:{"test":command},
			success:function(data){
				console.log("getListSerivce");
				// console.log(data);
				
				var serviceList = JSON.parse(data).listserviceofferingsresponse.serviceoffering;
				// console.log(serviceList);
				for(var i=0; i<serviceList.length; i++) {
					newServiceList[serviceList[i].id] = serviceList[i].name;
				}

			},error:function(request, status, error){
   				console.log(request+","+status+","+error);
   			}
   		});	

		// console.log(newServiceList);
		
		swal({
		  	title: 'Change Serice Offering',
		  	input: 'select',
		  	inputOptions: newServiceList,
		  	inputPlaceholder: 'Select Compute Offering',
		  	showCancelButton: true,
		  	allowEscapeKey: false,
		  	allowOutsideClick: false,

		}).then(function (result) {
			
			console.log(result);
			
			if (result.dismiss === "cancel") { // 취소면 그냥 나감
				return;
			}
			
			if (result.value == "") {
				swal("Compute Offering 을 선택하세요","","error");
			}
			
			var serviceofferingid = result.value;
			
			work = "Change Service Offering : " + instanceData.name;
			
			$.ajax({
    			url:setContextPath + '/apiChangeServiceOffering',
    			type:'POST',
    			dataType:'text',
    			async: false,
     			data:{	"virtualmachineid" : instanceData.id,
    					"serviceofferingid" : serviceofferingid },
    			success:function(data){
    				console.log("Change Service Offering");
    				
    				var arr = data.split("~");
    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
    				if ( arr[0] != "connection failed.") {
    					// data => arr[0] 으로 변경
    					var jobid = JSON.parse(arr[0]).scalevirtualmachineresponse.jobid;
    					
    					loadingImageMethod(jobid, work);
    					
    				} else {
    					errorObj = JSON.parse(arr[1]).scalevirtualmachineresponse;
    					swal("error",errorObj.errortext,"error");
    					setNotification(errorObj.errortext, 'error');
    				}
   				
    			},error:function(request, status, error){
       				console.log(request+","+status+","+error);
       			}
       		});	
		});
		
		
	}
	
	function attachISOBtnClicked(instanceData) {
		
		// 먼저 iso list 가져와서 select list에 뿌려줌
		var newIsosList = new Object();

		$.ajax({
			url:setContextPath + '/getListIsos',
			type:'POST',
			dataType:'json',
			async: false,
			data:{"test":""},
			success:function(data){
				console.log("getListIsos");
				// console.log(data);
				newIsosList = data; // data 자체가 jsonOject라서 바로 밀어넣을수 있음

			},error:function(request, status, error){
   				console.log(request+","+status+","+error);
   			}
   		});	

		// console.log(newIsosList);
		
		swal({
		  	title: 'Attach ISO',
		  	input: 'select',
		  	inputOptions: newIsosList,
		  	inputPlaceholder: 'Select a ISO',
		  	showCancelButton: true,
		  	allowEscapeKey: false,
		  	allowOutsideClick: false,

		}).then(function (result) {
			
			console.log(result);
			
			if (result.dismiss === "cancel") { // 취소면 그냥 나감
				return;
			}
			
			if (result.value == "") {
				swal("ISO 를 선택하세요","","error");
				return;
			}
			
			var isoid = result.value;

			work = "Attach ISO : " + instanceData.name;
			
			var command = "attachIso&virtualmachineid=" + instanceData.id + "&id=" + isoid;
			
			$.ajax({
    			url:setContextPath + '/apiAttachISO',
    			type:'POST',
    			dataType:'text',
    			async: false,
    			data:{"test":command},
    			success:function(data){
    				console.log("attachIso");
    				//console.log(data);
    				
    				var arr = data.split("~");
    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
    				if ( arr[0] != "connection failed.") {
    					// data => arr[0] 으로 변경
    					var jobid = JSON.parse(arr[0]).attachisoresponse.jobid;
    					
    					loadingImageMethod(jobid, work);
    					
    				} else {
    					errorObj = JSON.parse(arr[1]).attachisoresponse;
    					swal("error",errorObj.errortext,"error");
    					setNotification(errorObj.errortext, 'error');
    				}
    				
    			},error:function(request, status, error){
       				console.log(request+","+status+","+error);
       			}
       		});	
		});
		
	}
	
	function detachISOBtnClicked(instanceData) {
		
		swal({
		  	title: 'Detach ISO',
		  	showCancelButton: true,
		  	allowEscapeKey: false,
		  	allowOutsideClick: false,

		}).then(function (result) {
			
			console.log(result);
			
			if (result.dismiss === "cancel") { // 취소면 그냥 나감
				return;
			}
			
			work = "Detach ISO : " + instanceData.name;			
			
			var command = "detachIso&virtualmachineid=" + instanceData.id;
			
			$.ajax({
    			url:setContextPath + '/apiDetachISO',
    			type:'POST',
    			dataType:'text',
    			async: false,
    			data:{"test":command},
    			success:function(data){
    				console.log("detachIso");
    				//console.log(data);
    				
    				var arr = data.split("~");
    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
    				if ( arr[0] != "connection failed.") {
    					// data => arr[0] 으로 변경
    					var jobid = JSON.parse(arr[0]).detachisoresponse.jobid;
    					
    					loadingImageMethod(jobid, work);
    					
    				} else {
    					errorObj = JSON.parse(arr[1]).detachisoresponse;
    					swal("error",errorObj.errortext,"error");
    					setNotification(errorObj.errortext, 'error');
    				}
    				
    			},error:function(request, status, error){
       				console.log(request+","+status+","+error);
       			}
       		});	
		});
	}
	
	
	function migrateRunBtnClicked (instanceData) {
		
		setInstanceDataForMulti(instanceData);
		
		$.ajax({
			url: setContextPath + '/getListMigrateHosts',
			type:'POST',
			dataType:'text',
			async: false,
			data:{	"command":"findHostsForMigration",
					"virtualmachineid": instanceData.id},
			success:function(data){
				console.log("getListMigrateHosts");

				var migrateHostsList = JSON.parse(data).findhostsformigrationresponse.host;

				// 쌓이니깐 지워줄것
				modalTable.rows().remove().draw();
				for(var i=0; i<migrateHostsList.length; i++) {
					// 첫칸은 라디오 박스
					hiddenid = migrateHostsList[i].id;
					name = migrateHostsList[i].name;
					suitableformigration = migrateHostsList[i].suitableformigration;
					cpuused = migrateHostsList[i].cpuused;
					memoryused = migrateHostsList[i].memoryused;
					if (cpuused == null) {
						cpuused = "";
					}
					if (memoryused == null) {
						memoryused = "";
					}					
					memoryused == ""? memoryused = "": memoryused = (memoryused/(1024*1024*1024)).toFixed(2) + ' GB';

					workRow = [];
					workRow[0] = '';  
					workRow[1] = hiddenid;  
					workRow[2] = name;
					workRow[3] = suitableformigration;
					workRow[4] = cpuused;
					workRow[5] = memoryused;

					modalTable.row.add(workRow).draw(false);  
				}
				
				// 첫번째 tr css 줄것
				// console.log($('input[type="radio"].migrateSelectorClass').parent());
				$('input[type="radio"].migrateSelectorClass').parent().css({
					"vertical-align":"middle"
				});
				

			},error:function(request, status, error){
   				console.log(request+","+status+","+error);
   			}
   		});
		$('#migrateModal').modal('show'); // 이거 안해주면 vms 페이지에서 show 안된다. 그건 data, data-toggle이 modal 이랑 연결된게 아니라서 
		$("#migrateModal").show();
		$(".modal-backdrop").show();
		
	} 
	
	// vms 에서 multi로 사용하기 위해서 
	var instanceDataForMulti;
	
	function setInstanceDataForMulti (instanceDataForMulti) {
		this.instanceDataForMulti = instanceDataForMulti;
	}
	
	function getInstanceDataForMulti () {
		return instanceDataForMulti;
	}
	
	$("[id=migrateModalCloseBtn]").on("click",function(){
		$("#migrateModal").hide();
		$(".modal-backdrop").hide();
		
		// check 해제 하기
		modalTable
		.rows()
	    .nodes()
	    .to$()      
		.find('input[type="radio"].migrateSelectorClass:checked').prop('checked', false);

	});
	
	/* modal table 정의 */
	var modalTable = $('#example81').DataTable({

    	// radio 는 필터 기능 삭제
		'columnDefs': [{
		   	'targets': 0,
		   	'searchable':false,
		   	'orderable':false,
		   	'className': 'dt-body-center',
		   	'render': function (data, type, full, meta){
		   		// console.log(full);
		   		// licenseNumber = full[3];
		       	return '<input type="radio" name="migrateSelector" class="migrateSelectorClass" value="' + full[1] + '">';
			}
		},{ /* (hidden)id column 숨기기 */
            'targets': 1,
            'visible': false,
            'searchable': false
        }],
		'order': [3, 'desc']
    });    	
	
	function letsRunMigrate() {
		
		instanceData = getInstanceDataForMulti();
		
		var checkedHostId = modalTable
						    .rows()
						    .nodes()
						    .to$()      // Convert to a jQuery object
							.find('input[type="radio"].migrateSelectorClass:checked').val();
		
		console.log(checkedHostId);
		
		if (checkedHostId == null) {
			swal("Migrate 할 Host 를 선택하세요","","error");
			return;
		}
		
		work = "Migrate Primary Storage : " + instanceData.name;
		
		$.ajax({
			url:setContextPath + '/apiMigratePrimaryStorage',
			type:'POST',
			dataType:'text',
			async: false,
			data:{ "hostid" : checkedHostId,
				   "virtualmachineid" : instanceData.id },
			success:function(data){
				console.log("apiMigratePrimaryStorage Run");
				 
				$("#migrateModal").hide();
				$(".modal-backdrop").hide();
				
				// console.log(data);
				var arr = data.split("~");
				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);				
				if ( arr[0] != "connection failed.") {
					// data => arr[0] 으로 변경
					var jobid = JSON.parse(arr[0]).migratevirtualmachineresponse.jobid;
					
					loadingImageMethod(jobid, work);
					
				} else {
					errorObj = JSON.parse(arr[1]).migratevirtualmachineresponse;
					console.log(errorObj);
					swal("error",errorObj.errortext,"error");
					setNotification(errorObj.errortext, 'error');
				}

			},error:function(request, status, error){
   				console.log(request+","+status+","+error);
   				return;
   			}
   		});	
		/* setNotification("Migrate " + name); */
		// migrateVirtualMachineWithVolume&hostid=f55c58c7-25ca-4c51-be88-87d21209cd2b&virtualmachineid=947ee493-f2c8-46db-b5e1-b61e12e9a70d&response=json&_=1530748876897
		// migrateVirtualMachine&hostid=1dc4b7e8-a608-4378-b913-e28422fda4ab&virtualmachineid=947ee493-f2c8-46db-b5e1-b61e12e9a70d&response=json&_=1530753588791
		// migrateVirtualMachineWithVolume, migrateVirtualMachine 이거 두개 무슨 차이인지?
		// migrateVirtualMachine 은 not suitable에서
		// migrateVirtualMachineWithVolume 은 사용이 잘안되네....;;, 20180730 확인결과 Volume은 없었다.run, stop 다 확인해봄
	}
	
	function migrateStopBtnClicked(instanceData) {
		// listStoragePools&zoneid= 해서 값부터 가져오기
		// 먼저 template list 가져와서 select list에 뿌려줌
		var newStoragePoolsList = new Object();
		
		$.ajax({
			url:setContextPath + '/getListStoragePools',
			type:'POST',
			dataType:'text',
			async: false,
			data:{"test":"listStoragePools&zoneid=" + instanceData.zoneid},
			success:function(data){
				console.log("getListStoragePools");
				
				// console.log(data);
				var arr = data.split("~");
				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);				
				if ( arr[0] != "connection failed.") {
					
					var storagePools = JSON.parse(arr[0]).liststoragepoolsresponse.storagepool;

					for(var i=0; i<storagePools.length; i++) {
						newStoragePoolsList[storagePools[i].id] = storagePools[i].name;
					}
					// console.log(newStoragePoolsList);
					
				} else {
					errorObj = JSON.parse(arr[1]).liststoragepoolsresponse;
					swal("error",errorObj.errortext,"error");
					return;
				}
		
			},error:function(request, status, error){
   				console.log(request+","+status+","+error);
   				return;
   			}
   		});	
		
		//console.log(newStoragePoolsList);
		
		swal({
		  	title: 'Migrate Instance To Another Primary Storage',
		  	input: 'select',
		  	/* inputOptions: {
		  		newTemplatesList
		  	}, {} 이게 오브젝트 넣으란 거구나...*/
		  	
		  	inputOptions: newStoragePoolsList,
		  	inputPlaceholder: 'Select a Primary Storage',
		  	showCancelButton: true,
		  	allowEscapeKey: false,
		  	allowOutsideClick: false,
		  	
		}).then(function (result) {
			
			console.log(result);
			
			if (result.dismiss === "cancel") { // 취소면 그냥 나감
				return;
			}
			
			if (result.value == "") { // 선택안하면 안됨
				swal("Primary Storage 를 선택하세요","","error");
				return;
			}
			
			var storageid = result.value;

			work = "Migrate Primary Storage : " + instanceData.name;
			
			$.ajax({
    			url:setContextPath + '/apiMigratePrimaryStorage',
    			type:'POST',
    			dataType:'text',
    			async: false,
    			data:{ "storageid" : storageid,
    				   "virtualmachineid" : instanceData.id },
    			success:function(data){
    				console.log("apiMigratePrimaryStorage Stop");
    				// console.log(data);
    				
    				var arr = data.split("~");
    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
    				if ( arr[0] != "connection failed.") {
    					// data => arr[0] 으로 변경
    					var jobid = JSON.parse(arr[0]).migratevirtualmachineresponse.jobid;
    					
    					loadingImageMethod(jobid, work);
    					
    				} else {
    					errorObj = JSON.parse(arr[1]).migratevirtualmachineresponse;
    					swal("error",errorObj.errortext,"error");
    					setNotification(errorObj.errortext, 'error');
    				}
    				
    			},error:function(request, status, error){
       				console.log(request+","+status+","+error);
       			}
       		});	
		});
		
	}
	
	
	function editBtnClicked(instanceData) {
		
		// 이미 열려 있으면 무시, 안열려 있으면 null, 열려있는데 값없으면 "", 안열려있을때만 열기
		if ($("#displayNameHtml input[type='text']").val() != null) {
			return;
		}
		
		// displayname 수정
		displaynamevalue = instanceData.displayname;
		$("#displayNameHtml").empty();
		$("#displayNameHtml").append('<input type="text" class="not-space" value="' + displaynamevalue + '" style="width:200px;"/>'); 
		
		// dynamicallyscaleable 수정
		dynamicallyHtml = 	'<select class="form-control" style="max-width:200px;">' +  
							'<option value="true">true</option>' +
							'<option value="false">false</option>' +
							'</select>';      		
		// console.log(dynamicallyHtml);
		$("#dynamicallyScalableHtml").empty();
		$("#dynamicallyScalableHtml").append(dynamicallyHtml);
		dynamicallyscaleablevalue = instanceData.isdynamicallyscalable;
		// console.log(dynamicallyscaleablevalue); 
		$('#dynamicallyScalableHtml select option[value="' + dynamicallyscaleablevalue+ '"]').attr("selected", "selected"); // select 선택 기본값
		
/*		 
		// os type 수정 할일 별로 없을거라고 주석처리 하라고 하심, 나중에 필요하면 guestosid 로 변경해야 됨
		// command=listOsTypes Os list 얻기
		osTypeHtmlStr = "";
		command = "listOsTypes";
		$.ajax({
			url:'<%=cp%>/getListOsTypes',
			type:'POST',
			dataType:'text',
			async: false,
			data:{"test":command},
			success:function(data){
				console.log("getlistOsTypes");
				//console.log(data);
				
				var osTypes = JSON.parse(data).listostypesresponse.ostype;
				
				osTypeHtmlStr += '<select class="form-control" style="max-width:200px;">'; 
				for (var i=0; i<osTypes.length; i++) {
					osTypeHtmlStr += '<option value="' + osTypes[i].id + '">' + osTypes[i].description + '</option>';
				}
				osTypeHtmlStr += '</select>';

			},error:function(request, status, error){
   				console.log(request+","+status+","+error);
   			}
   		});
		$("#osTypeHtml").empty();
		$("#osTypeHtml").append(osTypeHtmlStr);
		selectedOsTypeId = "${template.get('ostypeid')}";
		$('#osTypeHtml select option[value="' + selectedOsTypeId + '"]').attr("selected", "selected"); // select 선택 기본값
		*/
		
		// group 수정
		var groupValue = instanceData.group;
		if (instanceData.group == null) {
			groupValue = "";
		}
		$("#groupHtml").empty();
		$("#groupHtml").append('<input type="text" class="not-space" value="' + groupValue + '" style="width:200px;"/>');
		
		
		// 취소, confirm 버튼 넣기 
		$("#editButtonGroup").show();

	}
	
	function cancelEdit(instanceData) {
		console.log(instanceData);
		displaynamevalue = instanceData.displayname;
		dynamicallyscaleablevalue = instanceData.isdynamicallyscalable;
		// osTypeName = "${template.get('ostypename')}";
		var groupValue = instanceData.group;
		if (instanceData.group == null) {
			groupValue = "";
		}
		$("#displayNameHtml").text(displaynamevalue);
		$("#dynamicallyScalableHtml").text(dynamicallyscaleablevalue);
		// $("#osTypeHtml").text(osTypeName);
		$("#groupHtml").text(groupValue);
		
		$("#editButtonGroup").hide();
		
	}
	
	function letsEdit(instanceData) {
		
		var displayname = $("#displayNameHtml input[type='text']").val();
		console.log("displayname : " + displayname);
		
		var isdynamicallyscalable = $("#dynamicallyScalableHtml select").val();
		console.log("isdynamicallyscalable : " + isdynamicallyscalable);
/*     		
    		var ostypeid = $("#osTypeHtml select").val();
    		console.log(ostypeid);
    		var ostypename = $('#osTypeHtml select option[value="' + ostypeid + '"]').text();
    		console.log(ostypename);
    		 */
		var group = $("#groupHtml input[type='text']").val();
		console.log("group : " + group);

		work = 'Edit VM : ' + instanceData.name;
		var command = ""
		if (displayname != instanceData.displayname) { // displayname 이 변경되었으면
			// command = "updateVirtualMachine&id=" + id + "&group=" + group + "&isdynamicallyscalable=" + isdynamicallyscalable + "&ostypeid=" + ostypeid + "&displayname=" + displayname;
			command = "updateVirtualMachine&id=" + instanceData.id + "&group=" + group + "&isdynamicallyscalable=" + isdynamicallyscalable + "&displayname=" + displayname;
		} else { // displayname 까지 같이 변경
			// command = "updateVirtualMachine&id=" + id + "&group=" + group + "&isdynamicallyscalable=" + isdynamicallyscalable + "&ostypeid=" + ostypeid;
			command = "updateVirtualMachine&id=" + instanceData.id + "&group=" + group + "&isdynamicallyscalable=" + isdynamicallyscalable;    			
		}
		
		$.ajax({
    			url:setContextPath + '/apiEditVM',
    			type:'POST',
    			dataType:'text',
    			async: false,
    			data:{"test":command},
    			success:function(data){
    				console.log("apiEditVM");
    				// console.log(data);

    				var obj = JSON.parse(data).updatevirtualmachineresponse.virtualmachine;
    				displayname = obj.displayname;
    				isdynamicallyscalable = obj.isdynamicallyscalable;
    				group = obj.group;
    				
    				var arr = data.split("~");
    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
    				if ( arr[0] != "connection failed.") {
    					
    					// jobid 없는것
    					swal("success", work, "success");
    					setNotification(work, 'success');	    
    					
    				} else {
    					errorObj = JSON.parse(arr[1]).updatevirtualmachineresponse;
    					swal("error",errorObj.errortext,"error");
    					setNotification(errorObj.errortext, 'error');
    				}

    			},error:function(request, status, error){
       				console.log(request+","+status+","+error);
       			}
       		});

		$("#displayNameHtml").text(displayname);
		$("#dynamicallyScalableHtml").text(isdynamicallyscalable);
		// $("#osTypeHtml").text(ostypename);
		$("#groupHtml").text(group);
		
		$("#editButtonGroup").hide();
	}
	
	function assignInstanceBtnClicked(instanceData) {
		
		swal({
		 	title: 'Assign Instance To Another Account',
			html:
			  	'<table align="center">' + 
    			  	'<tr>' + 
    			  		'<td style="text-align:right; padding-right:20px;">Account Type : </td>' + 
    			  		'<td><select id="assignSelectAccountType" class="swal2-input" style="width:200px; margin: 0 0 5 0;" onchange="changeAccountType();"></select></td>' + 
    			  	'</tr>' +
    			    '<tr>' + 
			    		'<td style="text-align:right; padding-right:20px;"><span style="color:red;">*&nbsp;</span>Domain : </td>' + 
			    		'<td><select id="assignSelectDomain" class="swal2-input" style="width:200px; margin: 0 0 5 0;"></select></td>' + 
			    	'</tr>' +	 
    			    '<tr id="assignSelectAccount">' + 
			    		'<td style="text-align:right; padding-right:20px;"><span style="color:red;">*&nbsp;</span>Account : </td>' + 
			    		'<td><select class="swal2-input" style="width:200px; margin: 0 0 5 0;"></select></td>' + 
			    	'</tr>' +    			    	
    			    '<tr id="assignSelectProject">' + 
    			    	'<td style="text-align:right; padding-right:20px;"><span style="color:red;">*&nbsp;</span>Project : </td>' + 
    			    	'<td><select class="swal2-input" style="width:200px; margin: 0 0 5 0;"></select></td>' + 
    			    '</tr>' + 
			    '</table>',
			showCancelButton: true,
			allowEscapeKey: false,
			allowOutsideClick: false,
			confirmButtonText: 'OK',
			onOpen: () => {
			    
				// assign select account type 구성품 채우기
				assignSelectAccountTypeHtml = 	"<option value='Account'>Account</option>" + 
												"<option value='Project'>Project</option>";
				$("#assignSelectAccountType").append(assignSelectAccountTypeHtml);
				
				// 시작 값에 따라서 변경
				changeAccountType();
				
				command = "listDomains&listAll=true&details=min";
				$.ajax({
	    			url:setContextPath + '/getDomainsList',
	    			type:'POST',
	    			dataType:'text',
	    			async: false,
	    			data:{"test":command},
	    			success:function(data){
	    				console.log("getDomainsList");
						// console.log(data);
						
	    				var domainList = JSON.parse(data).listdomainsresponse.domain;
	    				assignSelectDomainHtml = "";
	   					for(var i=0; i<domainList.length; i++) {
	   						assignSelectDomainHtml += "<option value='" + domainList[i].id + "'>" + domainList[i].name + "</option>";
	   					}
	   					$("#assignSelectDomain").append(assignSelectDomainHtml);
   
   		    			},error:function(request, status, error){
   		       				console.log(request+","+status+","+error);
	       			}
	       		});
				
				
				domainid = $('select[id="assignSelectDomain"]').val();  
				// console.log(domainid);
				
				command = "listAccounts&domainId=" + domainid + "&state=Enabled&listAll=true";
   					$.ajax({
   		    			url:setContextPath + '/getAssignAccountsList',
   		    			type:'POST',
   		    			dataType:'text',
   		    			async: false,
   		    			data:{"test":command},
   		    			success:function(data){
   		    				console.log("getAssignAccountsList");
							//console.log(data);
							
   		    				var accountList = JSON.parse(data).listaccountsresponse.account;
   		    				
   		    				assignSelectAccountHtml = "";
   		    				
   		   					for(var i=0; i<accountList.length; i++) {
   		   						assignSelectAccountHtml += "<option value='" + accountList[i].name + "'>" + accountList[i].name + "</option>";
   		   					}
   							
   		   					$("#assignSelectAccount select").append(assignSelectAccountHtml);
   		   					
   		    			},error:function(request, status, error){
   		       				console.log(request+","+status+","+error);
   		       			}
	       			});	
				
				}

			}).then(function(result){
				
				console.log(result);
				
				if (result.dismiss === "cancel") { // 취소면 그냥 나감
					return;
				}
				
				// project 선택 상태에서 OK 클릭하면 return
	    		if ($("#assignSelectProject").is(":visible")) {
	    			swal("현재 Project 는 Assign 할수 없습니다.","","error");
	    			return;
	    		}    					

				var accountname = $("#assignSelectAccount select").val();
				var domainid = $('select[id="assignSelectDomain"]').val(); 

				work = "Assign VM : " + instanceData.name;
				
				var command = "assignVirtualMachine&virtualmachineid=" + instanceData.id + "&domainid=" + domainid+ "&account=" + accountname;
				console.log("command : " + command);
				$.ajax({
	    			url:setContextPath + '/apiAssignVirtualMachine',
	    			type:'POST',
	    			dataType:'text',
	    			async: false,
	    			data:{"test":command},
	    			success:function(data){
	    				console.log("apiAssignVirtualMachine");
	    				// console.log(data);
	    				var arr = data.split("~");
	    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
	    				if ( arr[0] != "connection failed.") {
	    					// data => arr[0] 으로 변경
	    					swal("success", work, "success");
	    					setNotification(work, 'success');
		    				// 변경
	    					var obj = JSON.parse(arr[0]).assignvirtualmachineresponse.virtualmachine;
		    				$("#changeDomain").text(obj.domain);
		    				$("#changeAccount").text(obj.account);
		    				
	    				} else {
	    					errorObj = JSON.parse(arr[1]).assignvirtualmachineresponse;
	    					swal("error",errorObj.errortext,"error");
	    					setNotification(errorObj.errortext, 'error');
	    				}

	    			},error:function(request, status, error){
	       				console.log(request+","+status+","+error);    
	       			}
	       		});
				
			})
	}
	
	function rebootBtnClicked(instanceData) {

		swal({
			title: 'Reboot VM',
			text: '부팅 하시겠습니까?',
            showCancelButton: true,
            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
            confirmButtonColor: "#DD6B55",
            allowEscapeKey: false,
			}).then(function(result) {
				
				console.log(result);
				
				if (result.dismiss === "cancel") { // 취소면 그냥 나감
					return;
				}

				work = "Reboot VM : " + instanceData.name;
				$.ajax({
	    			url:setContextPath + '/apiRebootVM',
	    			type:'POST',
	    			dataType:'text',
	    			data:{"test":"rebootVirtualMachine&id="+instanceData.id},
	    			success:function(data){
		    				console.log("rebootVirtualMachine");
		    				// console.log(data);
		    				var arr = data.split("~");
		    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
		    				if ( arr[0] != "connection failed.") {
		    					// data => arr[0] 으로 변경
		    					var jobid = JSON.parse(arr[0]).rebootvirtualmachineresponse.jobid;
		    					
		    					loadingImageMethod(jobid, work);
		    					
		    				} else {
		    					errorObj = JSON.parse(arr[1]).rebootvirtualmachineresponse;
		    					swal("error",errorObj.errortext,"error");
		    					setNotification(errorObj.errortext, 'error');
		    				}
	    				
		    			},error:function(request, status, error){
		       				console.log(request+","+status+","+error);
		       			}
	       			});
			});		
	}
	
	function changeAccountType () {
		selectedAccountType = $('select[id="assignSelectAccountType"]').val(); 
		
		if (selectedAccountType === "Account") {
			$("#assignSelectAccount").show();
			$("#assignSelectProject").hide();
		} else {
			$("#assignSelectAccount").hide();
			$("#assignSelectProject").show();
		}
	}
	
	function viewSnapshotsClicked(instanceData) {
	 	var vmid = instanceData.id;
	 	var vmname = instanceData.name;
		
	 	$.redirect( setContextPath + '/admin/viewSnapshots', 
				{'vmid':vmid,
	 			 'vmname':vmname} );
	}
	