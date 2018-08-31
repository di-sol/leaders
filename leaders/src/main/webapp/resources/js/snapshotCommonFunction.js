/**
 * 
 */
	
	function deleteBtnClicked(snapshotData) {

   		swal({
   			title: 'Delete Snapshot',
   			text: '스냅샷 삭제 하시겠습니까?',
               showCancelButton: true,
               allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
               confirmButtonColor: "#DD6B55",
               allowEscapeKey: false,
   			}).then(function(result) {
   				
   				console.log(result);
   				
   				if (result.dismiss === "cancel") { // 취소면 그냥 나감
   					return;
   				}

   				work = "Delete Snapshot : " + snapshotData.displayname;
   				$.ajax({
   	    			url:setContextPath + '/apiDeleteSnapshot',
   	    			type:'POST',
   	    			dataType:'text',
   	    			data:{ "vmsnapshotid" : snapshotData.id },
   	    			success:function(data){
   	    				
   		    				console.log("deleteSnapshot");
   		    				// console.log(data);
   		    				
   		    				var arr = data.split("~");
   		    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
   		    				if ( arr[0] != "connection failed.") {
   		    					// data => arr[0] 으로 변경
   		    					var jobid = JSON.parse(arr[0]).deletevmsnapshotresponse.jobid;
   		    					
   		    					loadingImageMethod(jobid, work);
   		    					
   		    				} else {
   		    					errorObj = JSON.parse(arr[1]).deletevmsnapshotresponse;
   		    					swal("error",errorObj.errortext,"error");
   		    					setNotification(errorObj.errortext, 'error');
   		    				}
	    				
   		    			},error:function(request, status, error){
   		       				console.log(request+","+status+","+error);
   		       			}
   	       			});
   			});		
    
    	
    }
    
    function revertBtnClicked(snapshotData) {
   		swal({
   			title: 'Revert To VM Snapshot',
   			text: '스냅샷 Revert 하시겠습니까?',
               showCancelButton: true,
               allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
               confirmButtonColor: "#DD6B55",
               allowEscapeKey: false,
   			}).then(function(result) {
   				
   				console.log(result);
   				
   				if (result.dismiss === "cancel") { // 취소면 그냥 나감
   					return;
   				}

   				work = "Revert Snapshot : " + snapshotData.displayname;
   				$.ajax({
   	    			url:setContextPath + '/apiRevertToVMSnapshot',
   	    			type:'POST',
   	    			dataType:'text',
   	    			data:{ "vmsnapshotid" : snapshotData.id },
   	    			success:function(data){
   		    				console.log("deleteSnapshot");
   		    				// console.log(data);

   		    				var arr = data.split("~");
   		    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
   		    				if ( arr[0] != "connection failed.") {
   		    					// data => arr[0] 으로 변경
   		    					var jobid = JSON.parse(arr[0]).reverttovmsnapshotresponse.jobid;
   		    					
   		    					loadingImageMethod(jobid, work);
   		    					
   		    				} else {
   		    					errorObj = JSON.parse(arr[1]).reverttovmsnapshotresponse;
   		    					swal("error",errorObj.errortext,"error");
   		    					setNotification(errorObj.errortext, 'error');
   		    				}
		    				
   		    			},error:function(request, status, error){
   		       				console.log(request+","+status+","+error);
   		       			}
   	       			});
   			});		

    }
    
    
    function createSnapshotBtnClicked(snapshotData) {

    		swal({
    		 	title: 'Take Snapshot',
    			html:
    			  	'<table align="center">' + 
    			  		'<tr><td colspan="2">Please confirm that you want to take a snapshot of this volume.</td></tr>' +
        			  	'<tr>' + 
        			  		'<td style="text-align:right; padding-right:20px;">Name : </td>' + 
        			  		'<td><select id="swalInputName" class="swal2-input" style="width:200px; margin: 0 0 5 0;"></select></td>' + 
        			  	'</tr>' +
        			    '<tr>' + 
    			    		'<td style="text-align:right; padding-right:20px;"><span style="color:red;">*&nbsp;</span>Volume : </td>' + 
    			    		'<td><select id="swalSelectVolume" class="swal2-input" style="width:200px; margin: 0 0 5 0;"></select></td>' + 
    			    '</table>',
    			showCancelButton: true,
    			allowEscapeKey: false,
    			allowOutsideClick: false,
    			confirmButtonText: 'OK',
    			onOpen: () => {
    			    
    		    	// list volume 얻기
    				$.ajax({
    	    			url: setContextPath + '/getVMVolumeList',
    	    			type:'POST',
    	    			dataType:'text',
    	    			async: false,
    	    			data:{"vmid":snapshotData.virtualmachineid},
    	    			success:function(data){
    	    				console.log("getVMVolumeList");
    						console.log(data);
    						
    	    				var volumeList = JSON.parse(data).listvolumesresponse.volume;
    	    				console.log(volumeList);
    	    				
    	    				htmlString = '';
    	    				
    	    				// 여기서부터는 되는게 없어서 일단 내용만 살려둠 나중에 수정해야 됨, 동명대 홈페이지도 안됨
    	   					for(var i=0; i<volumeList.length; i++) {
    	   						htmlString += "<option value='" + volumeList[i].id + "'>" + volumeList[i].name + "</option>";
    	   					}
    	    				
    	   					$("#swalSelectVolume").append(htmlString);
       
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

				work = "Take a Snapshot : " + snapshotData.name;
				// 동명대에서도 안되는 기능이라서 할수가 없음
				swal("현재 지원안됨.","","error");
				
			})

    }
    
    
    function moveMonitoringContents(vmid) {
    	console.log(vmid);
		$.redirect(setContextPath + '/admin/monitoringContents',
				{'vmid':vmid});
    }
	    