   
/*
함수 : volumeActionfilter
기능 :  볼륨에 대한 정보를 입력받아 해당 볼륨의 조건에 맞는 버튼의 리스트를 생성하는 함수
파라미터 : volumelist - 필터링할 볼륨 데이터

*/ 
	var volumeActionfilter = function(volumelist) {
        var jsonObj = volumelist
        var allowedActions = [];


        if (jsonObj.state == 'Destroyed' || jsonObj.state == 'Migrating' || jsonObj.state == 'Uploading') {
            return [];
        }
		
        if (jsonObj.state == 'UploadError') {
            return ["remove"];
        }

        if (jsonObj.hypervisor != "Ovm" && jsonObj.state == "Ready") {
            if (jsonObj.hypervisor == 'KVM') {
                if (jsonObj.vmstate == 'Running') {
                    if (g_kvmsnapshotenabled == true) { //"kvm.snapshot.enabled" flag should be taken to account only when snapshot is being created for Running vm (CLOUDSTACK-4428)
                        allowedActions.push("takeSnapshot");
                        allowedActions.push("recurringSnapshot");
                    }
                } else {
                    allowedActions.push("takeSnapshot");
                    allowedActions.push("recurringSnapshot");
                }
            } else {
                allowedActions.push("takeSnapshot");
                allowedActions.push("recurringSnapshot");
            }
        }

        if ((jsonObj.type == "DATADISK"  || jsonObj.type == "ROOT") && (jsonObj.state == "Ready" || jsonObj.state == "Allocated")) {
            allowedActions.push("resize");
        }

        if (jsonObj.state != "Allocated") {
            if ((jsonObj.vmstate == "Stopped" || jsonObj.virtualmachineid == null) && jsonObj.state == "Ready") {
                allowedActions.push("downloadVolume");
            }
        }



        if (jsonObj.type == "ROOT" || jsonObj.type == "DATADISK") {
            //if (jsonObj.state == "Ready" && isAdmin() && jsonObj.virtualmachineid != null) {
        	if (jsonObj.state == "Ready" && jsonObj.virtualmachineid != null) {
                allowedActions.push("migrateVolume");
            }
        }

        if (jsonObj.state != "Creating") {
            if (jsonObj.type == "ROOT") {
                if (jsonObj.vmstate == "Stopped") {
                    allowedActions.push("createVolumeTemplate");
                }
            } else { //jsonObj.type == "DATADISK"
                if (jsonObj.virtualmachineid != null) {
                    if (jsonObj.vmstate == "Running" || jsonObj.vmstate == "Stopped" || jsonObj.vmstate == "Destroyed") {
                        allowedActions.push("detachDisk");
                    }
                } else { // Disk not attached
                    //allowedActions.push("remove");
                	allowedActions.push("deleteVolume");
                    //if (jsonObj.state == "Ready" && isAdmin()) {
                    if (jsonObj.state == "Ready") {
                        allowedActions.push("migrateToAnotherStorage");
                    }
                    allowedActions.push("attachDisk");
                }
            }
        }

        return allowedActions;
    };
    
    
    /*
    	함수 : snapshotActionfilter
    	기능 :  snapshot 에 대한 정보를 입력받아 해당 볼륨의 조건에 맞는 버튼의 리스트를 생성하는 함수
    	파라미터 : volumelist - 필터링할 볼륨 데이터

    */ 
    var snapshotActionfilter = function(snapshotlist) {
        var jsonObj = snapshotlist;

        if (jsonObj.state == 'Destroyed') {
            return [];
        }

        var allowedActions = [];
        if (jsonObj.state == "BackedUp") {
            allowedActions.push("createSnapshotTemplate");
            allowedActions.push("createSnapshotVolume");

            if (jsonObj.revertable) {
                allowedActions.push("srevertSnapshot");
            }
        }
        //allowedActions.push("remove");
        allowedActions.push("deleteSnapshot");
        return allowedActions;
    };
    
    
    /*
    	함수 : vmSnapshotActionfilter
    	기능 :  VM snapshot 에 대한 정보를 입력받아 해당 볼륨의 조건에 맞는 버튼의 리스트를 생성하는 함수
    	파라미터 : volumelist - 필터링할 볼륨 데이터

    */ 
    var vmSnapshotActionfilter = function(vmsnapshotlist) {
        var jsonObj = vmsnapshotlist;
        if (jsonObj.state == 'Error') {
            return ["remove"];
        }

        var allowedActions = [];
        if (jsonObj.state == "Ready") {
            //allowedActions.push("remove");
        	allowedActions.push("takeSnapshotVM");
            allowedActions.push("revertToVMSnapshot");
            allowedActions.push("deleteVMSnapshot");
           
         
            
//            if (args && args.context && args.context.instances && args.context.instances[0].hypervisor && args.context.instances[0].hypervisor === "KVM") {
//                allowedActions.push("takeSnapshot");
//            }
        }

        return allowedActions;
    };
    
    