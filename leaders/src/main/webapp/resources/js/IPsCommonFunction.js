/**
 * 
 */
	
	function releaseSecondaryIPBtnClicked(ipObj) {

			swal({
				title: 'Release Secondary IP from NIC',
	            showCancelButton: true,
	            allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
	            confirmButtonColor: "#DD6B55",
	            allowEscapeKey: false,
				}).then(function(result) {
					
					if (result.dismiss === "cancel") { // 취소면 그냥 나감
						return;
					}

					work = "Release Secondary IP : " + ipObj.ipaddress;

					$.ajax({
		    			url:setContextPath + '/apiReleaseSecondaryIP',
		    			type:'POST',
		    			async: false,
		    			dataType:'text',
		    			data:{"ipid":ipObj.id},
		    			success:function(data){
		    				console.log("apiReleaseSecondaryIP");

		    				var arr = data.split("~");
		    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
		    				if ( arr[0] != "connection failed.") {
		    					// data => arr[0] 으로 변경
		    					var jobid = JSON.parse(arr[0]).removeipfromnicresponse.jobid;
		    					
		    					loadingImageMethod(jobid, work);
		    					
		    				} else {
		    					errorObj = JSON.parse(arr[1]).removeipfromnicresponse;
		    					swal("error",errorObj.errortext,"error");
		    					setNotification(errorObj.errortext, 'error');
		    				}
		    				
		    			},error:function(request, status, error){
		       				console.log(request+","+status+","+error);
		       			}
		       		});	
					
				});
			
	}
	
    function moveMonitoringContents(vmid) {
    	console.log(vmid);
		$.redirect(setContextPath + '/admin/monitoringContents',
				{'vmid':vmid});
    }
	    