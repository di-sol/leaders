/**
 * 
 */

function deleteAccoutBtnClicked(userData) {
	
	var command = "deleteAccount&id=" + userData.accountid;
	
	swal({
		title: 'Delete Account',
		text: 'Account 삭제 하시겠습니까?',
        showCancelButton: true,
        allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
        confirmButtonColor: "#DD6B55",
        allowEscapeKey: false,
		}).then(function(result) {
			
			console.log(result);
			
			if (result.dismiss === "cancel") { // 취소면 그냥 나감
				return;
			}

			work = "Delete Account : " + userData.account;
			
			$.ajax({
    			url:setContextPath + '/apiDeleteAccountUser',
    			type:'POST',
    			async: false,
    			dataType:'text',
    			data:{ "command" : command },
    			success:function(data){
    				console.log("apiDeleteAccountUser");
    				// 데이터 오는거에 따라서 오류인지 확인할것
    				var arr = data.split("~");
    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
    				if ( arr[0] != "connection failed.") {
    					jobid = JSON.parse(arr[0]).deleteaccountresponse.jobid;
    					
    					loadingImageMethod(jobid, work);	    
    					
    				} else {
    					errorObj = JSON.parse(arr[1]).deleteaccountresponse;
    					swal("error",errorObj.errortext,"error");
    					setNotification(errorObj.errortext, 'error');
    				}

    			},error:function(request, status, error){
       				console.log(request+","+status+","+error);
       			}
       		});
		});	

}

function generateKeyClicked(userData) {
	// registerUserKeys&response=json&id=27d4bad0-c5a1-4158-b94a-55aa195414df&_=1532570447795
	var command = "registerUserKeys&id=" + userData.id;
	
	swal({
		title: 'Generate Key',
		text: 'Key 생성 하시겠습니까?',
        showCancelButton: true,
        allowOutsideClick: false, // 바깥 클릭안되게, 바깥 클릭하면 창 종료되니깐
        confirmButtonColor: "#DD6B55",
        allowEscapeKey: false,
		}).then(function(result) {
			
			console.log(result);
			
			if (result.dismiss === "cancel") { // 취소면 그냥 나감
				return;
			}

			work = "Generate Key : " + userData.account + " , " + userData.username;
			
			$.ajax({
    			url:setContextPath + '/apiGenerateKey',
    			type:'POST',
    			async: false,
    			dataType:'text',
    			data:{ "command" : command },
    			success:function(data){
    				console.log("apiGenerateKey");
    				// 데이터 오는거에 따라서 오류인지 확인할것
    				console.log(data);
    				var arr = data.split("~");
    				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
    				if ( arr[0] != "connection failed.") {
    					
    					apikey = JSON.parse(arr[0]).registeruserkeysresponse.userkeys.apikey;
    					secretkey = JSON.parse(arr[0]).registeruserkeysresponse.userkeys.secretkey;
    					
    					$("#apiKeyId").empty();
    					$("#apiKeyId").text(apikey);
    					
    					$("#secretKeyId").empty();
    					$("#secretKeyId").text(secretkey);
    					
    					swal("success", work, "success");
    					setNotification(work, 'success');
    					
    				} else {
    					errorObj = JSON.parse(arr[1]).registeruserkeysresponse;
    					swal("error",errorObj.errortext,"error");
    					setNotification(errorObj.errortext, 'error');
    				}

    			},error:function(request, status, error){
       				console.log(request+","+status+","+error);
       			}
       		});
		});	

}

function changePasswordBtnClicked(userData) {

	swal({
	 	title: 'Change Password',
		html:
		  	'<table align="center">' + 
			  	'<tr>' + 
			  		'<td style="text-align:right; padding-right:20px;"><span style="color:red;">*&nbsp;</span>New Password : </td>' + 
			  		'<td><input type="password" id="newPasswordId" class="swal2-input" style="width:200px; margin: 0 0 5 0;" /></td>' + 
			  	'</tr>' +
			    '<tr>' + 
		    		'<td style="text-align:right; padding-right:20px;"><span style="color:red;">*&nbsp;</span>Confirm Password : </td>' + 
		    		'<td><input type="password" id="confirmPasswordId" class="swal2-input" style="width:200px; margin: 0 0 5 0;" /></td>' + 
		    '</table>',
		showCancelButton: true,
		allowEscapeKey: false,
		allowOutsideClick: false,
		confirmButtonText: 'OK'
	}).then(function(result){
			
		console.log(result);
		
		if (result.dismiss === "cancel") { // 취소면 그냥 나감
			return;
		}
    	var newPwd = $("#newPasswordId").val().trim();
    	var confirmPwd = $("#confirmPasswordId").val().trim();
    	
		if (newPwd != confirmPwd) {
			swal("Error","비밀번호가 일치하지 않습니다.","error");
			return;
		}
		
    	var command = "updateUser&id=" + userData.id + "&password=" + newPwd;
   
		work = "Change Password : " + userData.account + " , " + userData.username;

		$.ajax({
			url:setContextPath + '/apiChangePassword',
			type:'POST',
			async: false,
			dataType:'text',
			data:{ "command" : command },
			success:function(data){
				console.log("apiChangePassword");
				// 데이터 오는거에 따라서 오류인지 확인할것
				console.log(data);
				var arr = data.split("~");
				console.log("arr[0] = ", arr[0], " arr[1] = ", arr[1]);
				if ( arr[0] != "connection failed.") {
					
					// 이것도 jobid 없음
					swal("success", work, "success");
					setNotification(work, 'success');
					
				} else {
					errorObj = JSON.parse(arr[1]).updateuserresponse;
					swal("error",errorObj.errortext,"error");
					setNotification(errorObj.errortext, 'error');
				}

			},error:function(request, status, error){
   				console.log(request+","+status+","+error);
   			}
   		});
		
	})

}	    