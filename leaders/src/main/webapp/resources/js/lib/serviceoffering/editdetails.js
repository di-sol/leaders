function editBtnClicked (serviceofferingkind) {
  
		
        // 이미 열려 있으면 무시, 안열려 있으면 null, 열려있는데 값없으면 "", 안열려있을때만 열기
        if ($("#NameHtml input[type='text']").val() != null) {
          return;   
        }  
        
        if(serviceofferingkind == 'cpt')
        {  
          
	        // name 수정         
	        namevalue = "${serviceofferinglist.getJSONObject(index).get('name')}";                               
	        $("#NameHtml").empty();
	        $("#NameHtml").append('<input type="text" value="' + namevalue + '" style="width:200px;"/>');
	        
	        descriptionvalue = "${serviceofferinglist.getJSONObject(index).get('displaytext')}";                               
	        $("#DescriptionHtml").empty();
	        $("#DescriptionHtml").append('<input type="text" value="' + descriptionvalue + '" style="width:200px;"/>');
	   
	         	//취소, confirm 버튼 넣기 
	        $("#editButtonGroup").show();
        }
        
        
        else if(serviceofferingkind == 'sys')
    	{
      
    		// name 수정         
		    namevalue = "${systemofferinglist.getJSONObject(index).get('name')}";                               
		    $("#NameHtml").empty();
		    $("#NameHtml").append('<input type="text" value="' + namevalue + '" style="width:200px;"/>');
		    
		    descriptionvalue = "${systemofferinglist.getJSONObject(index).get('displaytext')}";                               
		    $("#DescriptionHtml").empty();
		    $("#DescriptionHtml").append('<input type="text" value="' + descriptionvalue + '" style="width:200px;"/>');
		
		     	//취소, confirm 버튼 넣기 
		    $("#editButtonGroup").show();
    	}
        
        else if(serviceofferingkind == 'disk')
    	{
      
		    // name 수정         
		    namevalue = "${diskofferinglist.getJSONObject(index).get('name')}";                               
		    $("#NameHtml").empty();
		    $("#NameHtml").append('<input type="text" value="' + namevalue + '" style="width:200px;"/>');
		    
		    descriptionvalue = "${diskofferinglist.getJSONObject(index).get('displaytext')}";                               
		    $("#DescriptionHtml").empty();
		    $("#DescriptionHtml").append('<input type="text" value="' + descriptionvalue + '" style="width:200px;"/>');
		
		     	//취소, confirm 버튼 넣기   
		    $("#editButtonGroup").show();
    	}
        
        else if(serviceofferingkind == 'net')
    	{
      
		    // name 수정         
		    namevalue = "${networkofferinglist.getJSONObject(index).get('name')}";                               
		    $("#NameHtml").empty();
		    $("#NameHtml").append('<input type="text" value="' + namevalue + '" style="width:200px;"/>');
		    
		    descriptionvalue = "${networkofferinglist.getJSONObject(index).get('displaytext')}";                               
		    $("#DescriptionHtml").empty();
		    $("#DescriptionHtml").append('<input type="text" value="' + descriptionvalue + '" style="width:200px;"/>');
		
		     	//취소, confirm 버튼 넣기 
		    $("#editButtonGroup").show();
    	}
        
        else if(serviceofferingkind == 'vpc')
    	{
      
		    // name 수정         
		    namevalue = "${vpcofferinglist.getJSONObject(index).get('name')}";                               
		    $("#NameHtml").empty();
		    $("#NameHtml").append('<input type="text" value="' + namevalue + '" style="width:200px;"/>');
		    
		    descriptionvalue = "${vpcofferinglist.getJSONObject(index).get('displaytext')}";                               
		    $("#DescriptionHtml").empty();
		    $("#DescriptionHtml").append('<input type="text" value="' + descriptionvalue + '" style="width:200px;"/>');
		
		     	//취소, confirm 버튼 넣기 
		    $("#editButtonGroup").show();
    	}
        

     }
    
    function enableBtnClicked(serviceofferingkind){
    	
    	if ( serviceofferingkind == 'net')
    	{
	    	id = "${networkofferinglist.getJSONObject(index).get('id')}";
	    	state = "${networkofferinglist.getJSONObject(index).get('state')}";
	    	var command = ""
	    	command = "updateNetworkOffering&id=" + id + "&state=Enabled";
	    	
	    	$.ajax({
		        url:'<%=cp%>/apiEditServiceOffering',
		        type:'POST',
		        dataType:'text',
		        async: false,
		        data:{"test":command},
		        success:function(data){
		           console.log("apiEditServiceOffering");
		           console.log(data);  
		           //var obj = JSON.parse(data).updateserviceofferingresponse.serviceoffering;
		           //name = obj.name;
		           //description = obj.displaytext;   
		           
		           // 이건 jobid 없음 
		           // var obj = JSON.parse(data).updatevirtualmachineresponse.virtualmachine;
		           //  loadingImageMethod('<%=cp %>', jobid, 'Migrate Primary Storage');  
		           // obj의 return 값에 ostypename이 없다. 위에서 정한값을 넣어줄것
		
		        },error:function(request, status, error){
		              console.log(request+","+status+","+error);
		           }
		        });
				
				location.href = "<%=cp%>/admin/serviceoffering";   
			
    	}
    	
    	else if ( serviceofferingkind == 'vpc')
    	{
	    	id = "${vpcofferinglist.getJSONObject(index).get('id')}";
	    	state = "${vpcofferinglist.getJSONObject(index).get('state')}";
	    	var command = ""
	    	command = "updateVPCOffering&id=" + id + "&state=Enabled";
	    	
	    	$.ajax({
		        url:'<%=cp%>/apiEditServiceOffering',
		        type:'POST',
		        dataType:'text',
		        async: false,
		        data:{"test":command},
		        success:function(data){
		           console.log("apiEditServiceOffering");
		           console.log(data);  
		           //var obj = JSON.parse(data).updateserviceofferingresponse.serviceoffering;
		           //name = obj.name;
		           //description = obj.displaytext;   
		           
		           // 이건 jobid 없음 
		           // var obj = JSON.parse(data).updatevirtualmachineresponse.virtualmachine;
		           //  loadingImageMethod('<%=cp %>', jobid, 'Migrate Primary Storage'); 
		           // obj의 return 값에 ostypename이 없다. 위에서 정한값을 넣어줄것
		
		        },error:function(request, status, error){
		              console.log(request+","+status+","+error);
		           }
		        });
				
				location.href = "<%=cp%>/admin/serviceoffering";   
			
    	}
    	
    	
    }
    
	function disableBtnClicked(serviceofferingkind){
    	
    	if ( serviceofferingkind == 'net')
    	{
	    	id = "${networkofferinglist.getJSONObject(index).get('id')}";

	    	var command = ""
	    	command = "updateNetworkOffering&id=" + id + "&state=Disabled";
	    	
	    	$.ajax({
		        url:'<%=cp%>/apiEditServiceOffering',
		        type:'POST',
		        dataType:'text',
		        async: false,
		        data:{"test":command},
		        success:function(data){
		           console.log("apiEditServiceOffering");
		           console.log(data);  
		           //var obj = JSON.parse(data).updateserviceofferingresponse.serviceoffering;
		           //name = obj.name;
		           //description = obj.displaytext;   
		           
		           // 이건 jobid 없음 
		           // var obj = JSON.parse(data).updatevirtualmachineresponse.virtualmachine;
		           //  loadingImageMethod('<%=cp %>', jobid, 'Migrate Primary Storage'); 
		           // obj의 return 값에 ostypename이 없다. 위에서 정한값을 넣어줄것
		
		        },error:function(request, status, error){
		              console.log(request+","+status+","+error);
		           }
		        });
				
				location.href = "<%=cp%>/admin/serviceoffering";   
			  
    	}
    	
    	else if ( serviceofferingkind == 'vpc')
    	{
	    	id = "${vpcofferinglist.getJSONObject(index).get('id')}";
	    	state = "${vpcofferinglist.getJSONObject(index).get('state')}";
	    	var command = ""
	    	command = "updateVPCOffering&id=" + id + "&state=Disabled" ;
	    	
	    	$.ajax({
		        url:'<%=cp%>/apiEditServiceOffering',
		        type:'POST',
		        dataType:'text',
		        async: false,
		        data:{"test":command},
		        success:function(data){
		           console.log("apiEditServiceOffering");
		           console.log(data);  
		           //var obj = JSON.parse(data).updateserviceofferingresponse.serviceoffering;
		           //name = obj.name;
		           //description = obj.displaytext;   
		           
		           // 이건 jobid 없음 
		           // var obj = JSON.parse(data).updatevirtualmachineresponse.virtualmachine;
		           // loadingImageMethod('<%=cp %>', jobid, 'Migrate Primary Storage'); 
		           // obj의 return 값에 ostypename이 없다. 위에서 정한값을 넣어줄것
		
		        },error:function(request, status, error){
		              console.log(request+","+status+","+error);
		           }
		        });
				
				location.href = "<%=cp%>/admin/serviceoffering";   
			
    	}
    	
    	
    }
    
	function deleteBtnClicked (serviceofferingkind) {
		
		
	if (serviceofferingkind == 'cpt')
	{
        
		id = "${serviceofferinglist.getJSONObject(index).get('id')}";
		var command = ""
		command = "deleteServiceOffering&id=" + id;
		  
			$.ajax({
	        url:'<%=cp%>/apiEditServiceOffering',
	        type:'POST',
	        dataType:'text',
	        async: false,
	        data:{"test":command},
	        success:function(data){
	           console.log("apiEditServiceOffering");
	           console.log(data);  
	           //var obj = JSON.parse(data).updateserviceofferingresponse.serviceoffering;
	           //name = obj.name;
	           //description = obj.displaytext;   
	           
	           // 이건 jobid 없음 
	           // var obj = JSON.parse(data).updatevirtualmachineresponse.virtualmachine;
	           //  loadingImageMethod('<%=cp %>', jobid, 'Migrate Primary Storage');
	           // obj의 return 값에 ostypename이 없다. 위에서 정한값을 넣어줄것
	
	        },error:function(request, status, error){
	              console.log(request+","+status+","+error);
	           }
	        });
			
			location.href = "<%=cp%>/admin/serviceoffering";      
	 }
	
	else if (serviceofferingkind == 'sys')
	{
        
		id = "${systemofferinglist.getJSONObject(index).get('id')}";
		var command = ""
		command = "deleteServiceOffering&id=" + id;
		  
			$.ajax({
	        url:'<%=cp%>/apiEditServiceOffering',
	        type:'POST',
	        dataType:'text',
	        async: false,
	        data:{"test":command},
	        success:function(data){
	           console.log("apiEditServiceOffering");
	           console.log(data);  
	           //var obj = JSON.parse(data).updateserviceofferingresponse.serviceoffering;
	           //name = obj.name;
	           //description = obj.displaytext;   
	           
	           // 이건 jobid 없음 
	           // var obj = JSON.parse(data).updatevirtualmachineresponse.virtualmachine;
	           //  loadingImageMethod('<%=cp %>', jobid, 'Migrate Primary Storage');
	           // obj의 return 값에 ostypename이 없다. 위에서 정한값을 넣어줄것
	
	        },error:function(request, status, error){
	              console.log(request+","+status+","+error);
	           }
	        });
			
			location.href = "<%=cp%>/admin/serviceoffering";      
	 }
	
	else if (serviceofferingkind == 'disk')
	{
        
		id = "${diskofferinglist.getJSONObject(index).get('id')}";
		var command = ""
		command = "deleteDiskOffering&id=" + id;
		  
			$.ajax({
	        url:'<%=cp%>/apiEditServiceOffering',
	        type:'POST',
	        dataType:'text',
	        async: false,
	        data:{"test":command},
	        success:function(data){
	           console.log("apiEditServiceOffering");
	           console.log(data);  
	           //var obj = JSON.parse(data).updateserviceofferingresponse.serviceoffering;
	           //name = obj.name;
	           //description = obj.displaytext;   
	           
	           // 이건 jobid 없음 
	           // var obj = JSON.parse(data).updatevirtualmachineresponse.virtualmachine;
	           //  loadingImageMethod('<%=cp %>', jobid, 'Migrate Primary Storage');
	           // obj의 return 값에 ostypename이 없다. 위에서 정한값을 넣어줄것
	
	        },error:function(request, status, error){
	              console.log(request+","+status+","+error);
	           }
	        });
			
			location.href = "<%=cp%>/admin/serviceoffering";      
	 }
	
	else if (serviceofferingkind == 'net')
	{
        
		id = "${networkofferinglist.getJSONObject(index).get('id')}";
		var command = ""
		command = "deleteNetworkOffering&id=" + id;
		  
			$.ajax({
	        url:'<%=cp%>/apiEditServiceOffering',
	        type:'POST',
	        dataType:'text',
	        async: false,
	        data:{"test":command},
	        success:function(data){
	           console.log("apiEditServiceOffering");
	           console.log(data);  
	           //var obj = JSON.parse(data).updateserviceofferingresponse.serviceoffering;
	           //name = obj.name;
	           //description = obj.displaytext;   
	           
	           // 이건 jobid 없음 
	           // var obj = JSON.parse(data).updatevirtualmachineresponse.virtualmachine;
	           //  loadingImageMethod('<%=cp %>', jobid, 'Migrate Primary Storage');
	           // obj의 return 값에 ostypename이 없다. 위에서 정한값을 넣어줄것
	
	        },error:function(request, status, error){
	              console.log(request+","+status+","+error);
	           }
	        });
			
			location.href = "<%=cp%>/admin/serviceoffering";      
	 }
	
	else if (serviceofferingkind == 'vpc')
	{
        
		id = "${vpcofferinglist.getJSONObject(index).get('id')}";
		var command = ""
		command = "deleteVPCOffering&id=" + id;
		  
			$.ajax({
	        url:'<%=cp%>/apiEditServiceOffering',
	        type:'POST',
	        dataType:'text',  
	        async: false,
	        data:{"test":command},
	        success:function(data){
	           console.log("apiEditServiceOffering");
	           console.log(data);  
	           //var obj = JSON.parse(data).updateserviceofferingresponse.serviceoffering;
	           //name = obj.name;
	           //description = obj.displaytext;   
	           
	           // 이건 jobid 없음 
	           // var obj = JSON.parse(data).updatevirtualmachineresponse.virtualmachine;
	           //  loadingImageMethod('<%=cp %>', jobid, 'Migrate Primary Storage');
	           // obj의 return 값에 ostypename이 없다. 위에서 정한값을 넣어줄것
	
	        },error:function(request, status, error){
	              console.log(request+","+status+","+error);
	           }
	        });
			
			location.href = "<%=cp%>/admin/serviceoffering";      
	 }
	
     }
    
    function letsEdit (serviceofferingkind) {  
    	
    	console.log(serviceofferingkind);
    	
        if ( serviceofferingkind == 'cpt')
        	{
    	
				        var name = $("#NameHtml input[type='text']").val();
				        console.log(name);

				        var description = $("#DescriptionHtml input[type='text']").val();
				       // console.log(group);
				        
				        id = "${serviceofferinglist.getJSONObject(index).get('id')}";    
				
				        var command = ""
				        if (name != "${serviceofferinglist.getJSONObject(index).get('name')}") { // displayname 이 변경되었으면
				           // command = "updateVirtualMachine&id=" + id + "&group=" + group + "&isdynamicallyscalable=" + isdynamicallyscalable + "&ostypeid=" + ostypeid + "&displayname=" + displayname;
				           command = "updateServiceOffering&id=" + id + "&name=" + name + "&displaytext=" + description;
				        } else { // displayname 까지 같이 변경
				           // command = "updateVirtualMachine&id=" + id + "&group=" + group + "&isdynamicallyscalable=" + isdynamicallyscalable + "&ostypeid=" + ostypeid;
				        	command = "updateServiceOffering&id=" + id + "&name=" + name + "&displaytext=" + description;
				        }
				        
				        $.ajax({
				              url:'<%=cp%>/apiEditServiceOffering',
				              type:'POST',
				              dataType:'text',
				              async: false,
				              data:{"test":command},
				              success:function(data){
				                 console.log("apiEditServiceOffering");
				                 console.log(data);
				                 var obj = JSON.parse(data).updateserviceofferingresponse.serviceoffering;
				                 name = obj.name;
				                 description = obj.displaytext;
				                 
				                 // 이건 jobid 없음 
				                 // var obj = JSON.parse(data).updatevirtualmachineresponse.virtualmachine;
				                 //  loadingImageMethod('<%=cp %>', jobid, 'Migrate Primary Storage');
				                 // obj의 return 값에 ostypename이 없다. 위에서 정한값을 넣어줄것
				
				              },error:function(request, status, error){
				                    console.log(request+","+status+","+error);
				                 }
				              });
				
				        $("#NameHtml").text(name);
				        $("#DescriptionHtml").text(description);  
				        // $("#osTypeHtml").text(ostypename);
				       // $("#groupHtml").text(group);
				        
				        $("#editButtonGroup").hide();
        	}
        
        else if ( serviceofferingkind == 'sys')
    	{
	
			        var name = $("#NameHtml input[type='text']").val();
			        console.log(name);

			        var description = $("#DescriptionHtml input[type='text']").val();
			       // console.log(group);
			        
			        id = "${systemofferinglist.getJSONObject(index).get('id')}";    
			
			        var command = ""
			        if (name != "${systemofferinglist.getJSONObject(index).get('name')}") { // displayname 이 변경되었으면
			           // command = "updateVirtualMachine&id=" + id + "&group=" + group + "&isdynamicallyscalable=" + isdynamicallyscalable + "&ostypeid=" + ostypeid + "&displayname=" + displayname;
			           command = "updateServiceOffering&id=" + id + "&name=" + name + "&displaytext=" + description;
			        } else { // displayname 까지 같이 변경
			           // command = "updateVirtualMachine&id=" + id + "&group=" + group + "&isdynamicallyscalable=" + isdynamicallyscalable + "&ostypeid=" + ostypeid;
			        	command = "updateServiceOffering&id=" + id + "&name=" + name + "&displaytext=" + description;               
			        }
			        
			        $.ajax({
			              url:'<%=cp%>/apiEditServiceOffering',
			              type:'POST',
			              dataType:'text',
			              async: false,
			              data:{"test":command},
			              success:function(data){
			                 console.log("apiEditServiceOffering");
			                 console.log(data);
			                 var obj = JSON.parse(data).updateserviceofferingresponse.serviceoffering;
			                 name = obj.name;
			                 description = obj.displaytext;
			                 
			                 // 이건 jobid 없음 
			                 // var obj = JSON.parse(data).updatevirtualmachineresponse.virtualmachine;
			                 //  loadingImageMethod('<%=cp %>', jobid, 'Migrate Primary Storage');
			                 // obj의 return 값에 ostypename이 없다. 위에서 정한값을 넣어줄것
			
			              },error:function(request, status, error){
			                    console.log(request+","+status+","+error);
			                 }
			              });
			
			        $("#NameHtml").text(name);
			        $("#DescriptionHtml").text(description);  
			        // $("#osTypeHtml").text(ostypename);
			       // $("#groupHtml").text(group);
			        
			        $("#editButtonGroup").hide();
    	}
        
        else if ( serviceofferingkind == 'disk')
    	{
	
			        var name = $("#NameHtml input[type='text']").val();
			        console.log(name);

			        var description = $("#DescriptionHtml input[type='text']").val();
			       // console.log(group);
			        
			        id = "${diskofferinglist.getJSONObject(index).get('id')}";    
			
			        var command = ""
			        if (name != "${diskofferinglist.getJSONObject(index).get('name')}") { // displayname 이 변경되었으면
			           // command = "updateVirtualMachine&id=" + id + "&group=" + group + "&isdynamicallyscalable=" + isdynamicallyscalable + "&ostypeid=" + ostypeid + "&displayname=" + displayname;
			           command = "updateDiskOffering&id=" + id + "&name=" + name + "&displaytext=" + description;
			        } else { // displayname 까지 같이 변경
			           // command = "updateVirtualMachine&id=" + id + "&group=" + group + "&isdynamicallyscalable=" + isdynamicallyscalable + "&ostypeid=" + ostypeid;
			        	command = "updateDiskOffering&id=" + id + "&name=" + name + "&displaytext=" + description;               
			        }
			        
			        $.ajax({
			              url:'<%=cp%>/apiEditServiceOffering',
			              type:'POST',
			              dataType:'text',
			              async: false,
			              data:{"test":command},
			              success:function(data){
			                 console.log("apiEditServiceOffering");
			                 console.log(data);
			                 var obj = JSON.parse(data).updatediskofferingresponse.diskoffering;
			                 name = obj.name;
			                 description = obj.displaytext;
			                 
			                 // 이건 jobid 없음 
			                 // var obj = JSON.parse(data).updatevirtualmachineresponse.virtualmachine;
			                 //  loadingImageMethod('<%=cp %>', jobid, 'Migrate Primary Storage');
			                 // obj의 return 값에 ostypename이 없다. 위에서 정한값을 넣어줄것
			
			              },error:function(request, status, error){
			                    console.log(request+","+status+","+error);
			                 }
			              });
			
			        $("#NameHtml").text(name);
			        $("#DescriptionHtml").text(description);  
			        // $("#osTypeHtml").text(ostypename);
			       // $("#groupHtml").text(group);
			        
			        $("#editButtonGroup").hide();
    	}
        
        else if ( serviceofferingkind == 'net')
    	{
	
			        var name = $("#NameHtml input[type='text']").val();
			        console.log(name);

			        var description = $("#DescriptionHtml input[type='text']").val();
			       // console.log(group);
			        
			        id = "${networkeofferinglist.getJSONObject(index).get('id')}";    
			
			        var command = ""
			        if (name != "${networkofferinglist.getJSONObject(index).get('name')}") { // displayname 이 변경되었으면
			           // command = "updateVirtualMachine&id=" + id + "&group=" + group + "&isdynamicallyscalable=" + isdynamicallyscalable + "&ostypeid=" + ostypeid + "&displayname=" + displayname;
			           command = "updateNetworkOffering&id=" + id + "&name=" + name + "&displaytext=" + description;
			           command = command + "availability=Optional";
			        } else { // displayname 까지 같이 변경
			           // command = "updateVirtualMachine&id=" + id + "&group=" + group + "&isdynamicallyscalable=" + isdynamicallyscalable + "&ostypeid=" + ostypeid;
			        	command = "updateNetworkOffering&id=" + id + "&name=" + name + "&displaytext=" + description; 
			        	command = command + "availability=Optional";
			        }
			        
			        $.ajax({
			              url:'<%=cp%>/apiEditServiceOffering',
			              type:'POST',
			              dataType:'text',
			              async: false,
			              data:{"test":command},
			              success:function(data){
			                 console.log("apiEditServiceOffering");
			                 console.log(data);
			                 var obj = JSON.parse(data).updatenetworkofferingresponse.networkoffering;
			                 name = obj.name;
			                 description = obj.displaytext;
			                 
			                 // 이건 jobid 없음 
			                 // var obj = JSON.parse(data).updatevirtualmachineresponse.virtualmachine;
			                 //  loadingImageMethod('<%=cp %>', jobid, 'Migrate Primary Storage');
			                 // obj의 return 값에 ostypename이 없다. 위에서 정한값을 넣어줄것
			
			              },error:function(request, status, error){
			                    console.log(request+","+status+","+error);
			                 }
			              });
			
			        $("#NameHtml").text(name);
			        $("#DescriptionHtml").text(description);  
			        // $("#osTypeHtml").text(ostypename);
			       // $("#groupHtml").text(group);
			        
			        $("#editButtonGroup").hide();
    	}
        
        else if ( serviceofferingkind == 'vpc')
    	{
	
			        var name = $("#NameHtml input[type='text']").val();
			        console.log(name);

			        var description = $("#DescriptionHtml input[type='text']").val();
			       // console.log(group);
			        
			        id = "${vpcofferinglist.getJSONObject(index).get('id')}";    
			
			        var command = ""
			        if (name != "${vpcofferinglist.getJSONObject(index).get('name')}") { // displayname 이 변경되었으면
			           // command = "updateVirtualMachine&id=" + id + "&group=" + group + "&isdynamicallyscalable=" + isdynamicallyscalable + "&ostypeid=" + ostypeid + "&displayname=" + displayname;
			           command = "updateVPCOffering&id=" + id + "&name=" + name + "&displaytext=" + description;
			        } else { // displayname 까지 같이 변경
			           // command = "updateVirtualMachine&id=" + id + "&group=" + group + "&isdynamicallyscalable=" + isdynamicallyscalable + "&ostypeid=" + ostypeid;
			        	command = "updateVPCOffering&id=" + id + "&name=" + name + "&displaytext=" + description;               
			        }
			        
			        $.ajax({
			              url:'<%=cp%>/apiEditServiceOffering',
			              type:'POST',  
			              dataType:'text',
			              async: false,
			              data:{"test":command},
			              success:function(data){
			                 console.log("apiEditServiceOffering");
			                 console.log(data);
			                 /* var obj = JSON.parse(data).updatevpcofferingresponse.vpcoffering;
			                 name = obj.name;
			                 description = obj.displaytext; */
			                 
			                 // 이건 jobid 없음 
			                 // var obj = JSON.parse(data).updatevirtualmachineresponse.virtualmachine;
			                 //  loadingImageMethod('<%=cp %>', jobid, 'Migrate Primary Storage');
			                 // obj의 return 값에 ostypename이 없다. 위에서 정한값을 넣어줄것
			
			              },error:function(request, status, error){
			                    console.log(request+","+status+","+error);
			                 }
			              });
			
			        $("#NameHtml").text(name);
			        $("#DescriptionHtml").text(description);  
			        // $("#osTypeHtml").text(ostypename);
			       // $("#groupHtml").text(group);
			        
			        $("#editButtonGroup").hide();
    	}
     }
    
    function cancelEdit (serviceofferingkind) {
		
    	
    	if ( serviceofferingkind == 'cpt')
    	{
    	
			namevalue = "${serviceofferinglist.getJSONObject(index).get('name')}";
			descriptionvalue = "${serviceofferinglist.getJSONObject(index).get('displaytext')}";
			// osTypeName = "${template.get('ostypename')}";
			//groupValue = "${groupValue}";
	
			$("#NameHtml").text(namevalue);
			$("#DescriptionHtml").text(descriptionvalue);
			// $("#osTypeHtml").text(osTypeName);
			//$("#groupHtml").text(groupValue);
			
			$("#editButtonGroup").hide();
    	}
    	
    	else if ( serviceofferingkind == 'sys')
    	{
    	
			namevalue = "${systemofferinglist.getJSONObject(index).get('name')}";
			descriptionvalue = "${systemofferinglist.getJSONObject(index).get('displaytext')}";
			// osTypeName = "${template.get('ostypename')}";
			//groupValue = "${groupValue}";
	
			$("#NameHtml").text(namevalue);
			$("#DescriptionHtml").text(descriptionvalue);
			// $("#osTypeHtml").text(osTypeName);
			//$("#groupHtml").text(groupValue);
			
			$("#editButtonGroup").hide();
    	}
    	
    	else if ( serviceofferingkind == 'disk')
    	{
    	
			namevalue = "${diskofferinglist.getJSONObject(index).get('name')}";
			descriptionvalue = "${diskofferinglist.getJSONObject(index).get('displaytext')}";
			// osTypeName = "${template.get('ostypename')}";
			//groupValue = "${groupValue}";
	
			$("#NameHtml").text(namevalue);
			$("#DescriptionHtml").text(descriptionvalue);
			// $("#osTypeHtml").text(osTypeName);
			//$("#groupHtml").text(groupValue);
			
			$("#editButtonGroup").hide();
    	}
    	
    	else if ( serviceofferingkind == 'network')
    	{
    	
			namevalue = "${networkofferinglist.getJSONObject(index).get('name')}";
			descriptionvalue = "${networkofferinglist.getJSONObject(index).get('displaytext')}";
			// osTypeName = "${template.get('ostypename')}";
			//groupValue = "${groupValue}";
	
			$("#NameHtml").text(namevalue);
			$("#DescriptionHtml").text(descriptionvalue);
			// $("#osTypeHtml").text(osTypeName);
			//$("#groupHtml").text(groupValue);
			
			$("#editButtonGroup").hide();
    	}
    	
    	else if ( serviceofferingkind == 'vpc')
    	{
    	
			namevalue = "${vpcofferinglist.getJSONObject(index).get('name')}";
			descriptionvalue = "${vpcofferinglist.getJSONObject(index).get('displaytext')}";
			// osTypeName = "${template.get('ostypename')}";
			//groupValue = "${groupValue}";
	
			$("#NameHtml").text(namevalue);
			$("#DescriptionHtml").text(descriptionvalue);
			// $("#osTypeHtml").text(osTypeName);
			//$("#groupHtml").text(groupValue);
			
			$("#editButtonGroup").hide();
    	}
	}