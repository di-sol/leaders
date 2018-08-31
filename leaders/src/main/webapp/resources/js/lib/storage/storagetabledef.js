// template 테이블 정의

/*
    객체 : storageVolumeTable
    기능 : DataTables의 프레임워크를 사용하여 테이블을 생성
    	volume table을 설정값을 세팅하는 함수
    파라미터 : 
*/  
var storageVolumeTable = $('#volumetable').DataTable({

	'dom' : 'Bfrtip',
	'buttons' : [],
	'columnDefs' : [ {
		targets : '_all',
		orderable : true
	} ],
	'order' : [ 0, 'desc' ]

});

/*
객체 : storageSnapshotTable
기능 : DataTables의 프레임워크를 사용하여 테이블을 생성
	snapshot table을 설정값을 세팅하는 함수
파라미터 : 
*/  
var storageSnapshotTable = $('#snapshotTable').DataTable({

	'dom' : 'Bfrtip',
	'buttons' : [],
	'columnDefs' : [ {
		targets : '_all',
		orderable : true
	} ],
	'order' : [ 0, 'desc' ]

});


/*
객체 : storageVMSnapshotTable
기능 : DataTables의 프레임워크를 사용하여 테이블을 생성
	VM snapshot table을 설정값을 세팅하는 함수
파라미터 : 
*/  
var storageVMSnapshotTable = $('#VMsnapshotTable').DataTable({

	'dom' : 'Bfrtip',
	'buttons' : [],
	'columnDefs' : [ {
		targets : '_all',
		orderable : true
	} ],
	'order' : [ 0, 'desc' ]

});

/*
객체 : storageMetricsTable
기능 : DataTables의 프레임워크를 사용하여 테이블을 생성
	Metrics table을 설정값을 세팅하는 함수
파라미터 : 
*/  
var storageMetricsTable = $('#metricsTable').DataTable({

	'dom' : 'Bfrtip',
	'buttons' : [],
	'columnDefs' : [ {
		targets : '_all',
		orderable : true
	} ],
	'order' : [ 0, 'desc' ]

});

/*
객체 : storageVolumeEventTable
기능 : DataTables의 프레임워크를 사용하여 테이블을 생성
	volume Event table을 설정값을 세팅하는 함수
파라미터 : 
*/  
var storageVolumeEventTable = $('#volumeEventTable').DataTable({

	'dom' : 'Bfrtip',
	'buttons' : [],
	'columnDefs' : [ {
		targets : '_all',
		orderable : false
	} ],
	'order' : [ 6, 'desc' ],
	'pageLength' : 10

});

$(".dataTables_wrapper .dt-buttons").css({
	'float' : 'right',
	'padding-left' : '5px'
});




/*
함수명 : refreshVolumeTable
기능 : volume table을 새로고침하는 함수 
	 버튼을 생성해 연결함. 버튼 클릭시 table이 새로고침된다.
파라미터 : 
*/    
function refreshVolumeTable() {

	// 전체 비우고
	storageVolumeTable.rows().remove().draw();

	// 처음 로딩인지 리프레쉬 버튼 눌러서 로딩인지 확인후 로딩 시간 다르게 부여
	if (volumepageInitial) {
		volumepageInitial = false;
		setTime = 0; // 바로 로드
	} else {
		setTime = 250; // 0.25초 뒤 로드로 설정
	}

	// 비우고 1초 뒤에 리스트 가져오게, refresh 되는 느낌 살려서
	var command = "listVolumes&listall=true";

	setTimeout(
			function() {
				// ajax로 metrics list 가져오기
				$
						.ajax({
							url : contextPath + '/apiCall',
							type : 'POST',
							async : false,
							dataType : 'json',
							data : {
								"test" : command
							},
							success : function(data) {
								var volumelist = data.listvolumesresponse.volume;

								for (var i = 0; i < volumelist.length; i++) {
									// add instance 중에 null 처리 안해주면 에러 난다.
									var volumeid = workRow = [];
									workRow[0] = volumelist[i].name == null ? ""
											: '<span onclick="clickedStoragelist(\''
													+ volumelist[i].id
													+ '\')" style="cursor: pointer">'
													+ volumelist[i].name
													+ '</span>';
									workRow[1] = volumelist[i].domain == null ? ""
											: volumelist[i].domain;
									workRow[2] = volumelist[i].vmname == null ? ""
											: volumelist[i].vmname;
									workRow[3] = volumelist[i].hypervisor == null ? ""
											: volumelist[i].hypervisor;
									workRow[4] = volumelist[i].account == null ? ""
											: volumelist[i].account;
									workRow[5] = volumelist[i].zonename == null ? ""
											: volumelist[i].zonename;
									workRow[6] = volumelist[i].state == null ? ""
											: volumelist[i].state;
									workRow[7] = '<i class="fa fa-plus" style="font-size: 24px; line-height: 32px; vertical-align: middle;"></i>';
									// 한줄식 채워넣기
									storageVolumeTable.row.add(workRow).draw(
											false);
								}

								changeVolumeTableStateColor();

								// quickview td 에 class 와 style 줘야 됨.
								storageVolumeTable.rows().nodes().to$().find(
										'td:nth-child(8)').css({// 14번째(quickview)
									// td 다잡음
									"text-align" : "center"
								});
								storageVolumeTable.rows().nodes().to$().find(
										'td:nth-child(8)').addClass(
										'storageQuickViewButton');
								storageVolumeTable.rows().nodes().to$().find(
										'td:nth-child(8)').addClass(
										'storageQuickViewButtonvolume');

								// quick view icon 에 기능 주기
								storageVolumeTable
										.rows()
										.nodes()
										.to$()
										.find('td:nth-child(8)')
										.mouseover(
												function() {
													// index 기반이기 땜누에 vmlist에서
													// index 값 찾아주기, 페이지 reload
													// 한게 아니기 때문에 page에 남아있는
													// ${vmlist}기준으로 찾아야됨
													// ${vmlist} 는 0부터 차례대로
													// 입력되어있음 vmList = ${vmlist}
													// 먼저 선택한 row의 td 첫번짹
													// 값(name) 값 획득
													volumename = $(this)
															.parent()
															.find(
																	'td:nth-child(1)')
															.text();
													var index;
													for (var i = 0; i < volumelist.length; i++) { // vmlist
														// index
														// 는
														// 0부터
														// 차례대로
														// 생성
														if (volumename === volumelist[i].name) {
															index = i;
															break;
														}
													}

													callQuickViewStorage(
															volumelist, index,
															$(this).offset());

												});

							},
							error : function(request, status, error) {
								
							}
						});
			}, setTime)
}

function changeVolumeTableStateColor() {
	var allRows = storageVolumeTable.rows().nodes().to$().find(
			'td:nth-child(7)'); // 7번째 td 다잡음
	for (var i = 0; i < allRows.length; i++) {
		if (allRows.eq(i).text() === "Ready") {
			allRows.eq(i).removeClass('bg-danger');
			allRows.eq(i).addClass('bg-success');
		} else {
			allRows.eq(i).removeClass('bg-success');
			allRows.eq(i).addClass('bg-danger');
		}
	}
}


/*
함수명 : refreshSnapshotTable
기능 : snapshot table을 새로고침하는 함수 
	 버튼을 생성해 연결함. 버튼 클릭시 table이 새로고침된다.
파라미터 : 
*/ 
function refreshSnapshotTable() {

	// 전체 비우고
	storageSnapshotTable.rows().remove().draw();

	// 처음 로딩인지 리프레쉬 버튼 눌러서 로딩인지 확인후 로딩 시간 다르게 부여
	if (snapshotpageInitial) {
		snapshotpageInitial = false;
		setTime = 0; // 바로 로드
	} else {
		setTime = 250; // 0.25초 뒤 로드로 설정
	}

	// 비우고 1초 뒤에 리스트 가져오게, refresh 되는 느낌 살려서
	var command = "listSnapshots&listall=true";

	setTimeout(
			function() {
				// ajax로 metrics list 가져오기
				$
						.ajax({
							url : contextPath + '/apiCall',
							type : 'POST',
							async : false,
							dataType : 'json',
							data : {
								"test" : command
							},
							success : function(data) {
								var snapshotlist = data.listsnapshotsresponse.snapshot;
								

								for (var i = 0; i < snapshotlist.length; i++) {
									// add instance 중에 null 처리 안해주면 에러 난다.

									workRow = [];
									workRow[0] = snapshotlist[i].volumename == null ? ""
											: '<span onclick="clickedSnapshotlist(\''
													+ snapshotlist[i].id
													+ '\')" style="cursor: pointer">'
													+ snapshotlist[i].volumename
													+ '</span>';
									workRow[1] = snapshotlist[i].name == null ? ""
											: snapshotlist[i].name;
									workRow[2] = snapshotlist[i].intervaltype == null ? ""
											: snapshotlist[i].intervaltype;
									workRow[3] = snapshotlist[i].created == null ? ""
											: snapshotlist[i].created;
									workRow[4] = snapshotlist[i].state == null ? ""
											: snapshotlist[i].state;
									workRow[5] = '<i class="fa fa-plus" style="font-size: 24px; line-height: 32px; vertical-align: middle;"></i>';
									// 한줄식 채워넣기
									storageSnapshotTable.row.add(workRow).draw(
											false);
								}

								changeSnapshotTableStateColor();

								// quickview td 에 class 와 style 줘야 됨.
								storageSnapshotTable.rows().nodes().to$().find(
										'td:nth-child(6)').css({// 6번째(quickview)
									// td 다잡음
									"text-align" : "center"
								});
								storageSnapshotTable.rows().nodes().to$().find(
										'td:nth-child(6)').addClass(
										'storageSnapshotQuickViewButton');
								storageSnapshotTable.rows().nodes().to$().find(
										'td:nth-child(6)').addClass(
										'storageQuickViewButtonsnapshot');

								// quick view icon 에 기능 주기
								storageSnapshotTable
										.rows()
										.nodes()
										.to$()
										.find('td:nth-child(6)')
										.mouseover(
												function() {
													// index 기반이기 땜누에 vmlist에서
													// index 값 찾아주기, 페이지 reload
													// 한게 아니기 때문에 page에 남아있는
													// ${vmlist}기준으로 찾아야됨
													// ${vmlist} 는 0부터 차례대로
													// 입력되어있음 vmList = ${vmlist}
													// 먼저 선택한 row의 td 첫번짹
													// 값(name) 값 획득
													snapshotname = $(this)
															.parent()
															.find(
																	'td:nth-child(1)')
															.text();
												
													var index;
													for (var i = 0; i < snapshotlist.length; i++) {
														if (snapshotname === snapshotlist[i].volumename) {
															index = i;
															break;
														}
													}

													callQuickViewSnapshot(
															snapshotlist,
															index, $(this)
																	.offset());

												});

							},
							error : function(request, status, error) {
								
							}
						});
			}, setTime)
}

function changeSnapshotTableStateColor() {
	var allRows = storageSnapshotTable.rows().nodes().to$().find(
			'td:nth-child(5)'); // 5번째 td 다잡음
	for (var i = 0; i < allRows.length; i++) {
		if (allRows.eq(i).text() === "Ready") {
			allRows.eq(i).removeClass('bg-danger');
			allRows.eq(i).addClass('bg-success');
		} else {
			allRows.eq(i).removeClass('bg-success');
			allRows.eq(i).addClass('bg-danger');
		}
	}
}



/*
함수명 : refreshVMSnapshotTable
기능 : VM snapshot table을 새로고침하는 함수 
	 버튼을 생성해 연결함. 버튼 클릭시 table이 새로고침된다.
파라미터 : 
*/ 
function refreshVMSnapshotTable() {

	// 전체 비우고
	storageVMSnapshotTable.rows().remove().draw();

	// 처음 로딩인지 리프레쉬 버튼 눌러서 로딩인지 확인후 로딩 시간 다르게 부여
	if (VMsnapshotpageInitial) {
		VMsnapshotpageInitial = false;
		setTime = 0; // 바로 로드
	} else {
		setTime = 250; // 0.25초 뒤 로드로 설정
	}

	// 비우고 1초 뒤에 리스트 가져오게, refresh 되는 느낌 살려서
	var command = "listVMSnapshot&listall=true";

	setTimeout(
			function() {
				// ajax로 metrics list 가져오기
				$
						.ajax({
							url : contextPath + '/apiCall',
							type : 'POST',
							async : false,
							dataType : 'json',
							data : {
								"test" : command
							},
							success : function(data) {
								var vmsnapshotlist = data.listvmsnapshotresponse.vmSnapshot;
								
								try{
									for (var i = 0; i < vmsnapshotlist.length; i++) {
										// add instance 중에 null 처리 안해주면 에러 난다.
										
										workRow = [];
										workRow[0] = vmsnapshotlist[i].displayname == null ? ""
												: '<span onclick="clickedVmsnapshotlist(\''
														+ vmsnapshotlist[i].id
														+ '\')" style="cursor: pointer">'
														+ vmsnapshotlist[i].displayname
														+ '</span>';
										workRow[1] = vmsnapshotlist[i].state == null ? ""
												: vmsnapshotlist[i].state;
										workRow[2] = vmsnapshotlist[i].type == null ? ""
												: vmsnapshotlist[i].type;
										workRow[3] = vmsnapshotlist[i].current == null ? ""
												: vmsnapshotlist[i].current;
										workRow[4] = vmsnapshotlist[i].parentName == null ? ""
												: vmsnapshotlist[i].parentName;
										workRow[5] = vmsnapshotlist[i].created == null ? ""
												: vmsnapshotlist[i].created;
										workRow[6] = '<i class="fa fa-plus" style="font-size: 24px; line-height: 32px; vertical-align: middle;"></i>';
										// 한줄식 채워넣기
										storageVMSnapshotTable.row.add(workRow)
												.draw(false);
									}

									changeVMSnapshotTableStateColor();

									// quickview td 에 class 와 style 줘야 됨.
									storageVMSnapshotTable.rows().nodes().to$()
											.find('td:nth-child(7)').css({// 8번째(quickview)
												// td 다잡음
												"text-align" : "center"
											});
									storageVMSnapshotTable
											.rows()
											.nodes()
											.to$()
											.find('td:nth-child(7)')
											.addClass(
													'storageVMSnapshotQuickViewButton');
									storageVMSnapshotTable
											.rows()
											.nodes()
											.to$()
											.find('td:nth-child(7)')
											.addClass(
													'storageQuickViewButtonvmsnapshot');

									// quick view icon 에 기능 주기
									storageVMSnapshotTable
											.rows()
											.nodes()
											.to$()
											.find('td:nth-child(7)')
											.mouseover(
													function() {
														// index 기반이기 땜누에 vmlist에서
														// index 값 찾아주기, 페이지 reload
														// 한게 아니기 때문에 page에 남아있는
														// ${vmlist}기준으로 찾아야됨
														// ${vmlist} 는 0부터 차례대로
														// 입력되어있음 vmList = ${vmlist}
														// 먼저 선택한 row의 td 첫번짹
														// 값(name) 값 획득
														vmsnapshotname = $(this)
																.parent()
																.find(
																		'td:nth-child(1)')
																.text();
														
														var index;
														for (var i = 0; i < vmsnapshotlist.length; i++) { // vmlist
															// index
															// 는
															// 0부터
															// 차례대로
															// 생성
															if (vmsnapshotname === vmsnapshotlist[i].displayname) {
																index = i;
																break;
															}
														}

														callQuickViewVMSnapshot(
																vmsnapshotlist,
																index, $(this)
																		.offset());

													});
								}catch(e){
									
								}

								

							},
							error : function(request, status, error) {
								
							}
						});
			}, setTime)
}

function changeVMSnapshotTableStateColor() {
	var allRows = storageVMSnapshotTable.rows().nodes().to$().find(
			'td:nth-child(2)'); // 2번째 td 다잡음
	for (var i = 0; i < allRows.length; i++) {
		if (allRows.eq(i).text() === "Ready") {
			allRows.eq(i).removeClass('bg-danger');
			allRows.eq(i).addClass('bg-success');
		} else {
			allRows.eq(i).removeClass('bg-success');
			allRows.eq(i).addClass('bg-danger');
		}
	}
}

/*
함수명 : refreshMetricsTable
기능 : Metrics table을 새로고침하는 함수 
	 버튼을 생성해 연결함. 버튼 클릭시 table이 새로고침된다.
파라미터 : 
*/ 
function refreshMetricsTable() {

	// 전체 비우고
	storageMetricsTable.rows().remove().draw();

	// 처음 로딩인지 리프레쉬 버튼 눌러서 로딩인지 확인후 로딩 시간 다르게 부여
	if (metricspageInitial) {
		metricspageInitial = false;
		setTime = 0; // 바로 로드
	} else {
		setTime = 250; // 0.25초 뒤 로드로 설정
	}

	// 비우고 1초 뒤에 리스트 가져오게, refresh 되는 느낌 살려서
	var command = "listVolumesMetrics&listall=true";

	setTimeout(
			function() {
				// ajax로 metrics list 가져오기
				$
						.ajax({
							url : contextPath + '/apiCall',
							type : 'POST',
							async : false,
							dataType : 'json',
							data : {
								"test" : command
							},
							success : function(data) {
								var metricslist = data.listvolumesmetricsresponse.volume;
							

								for (var i = 0; i < metricslist.length; i++) {
									// add instance 중에 null 처리 안해주면 에러 난다.

									workRow = [];
									workRow[0] = metricslist[i].name == null ? ""
											: '<span onclick="clickedStoragelist(\''
													+ metricslist[i].id
													+ '\')" style="cursor: pointer">'
													+ metricslist[i].name
													+ '</span>';
									workRow[1] = metricslist[i].state == null ? ""
											: metricslist[i].state;
									workRow[2] = metricslist[i].vmname == null ? ""
											: metricslist[i].vmname;
									workRow[3] = metricslist[i].sizegb == null ? ""
											: metricslist[i].sizegb;
									workRow[4] = metricslist[i].physicalsize == null ? ""
											: metricslist[i].physicalsize;
									workRow[5] = metricslist[i].utilization == null ? ""
											: metricslist[i].utilization;
									workRow[6] = metricslist[i].storagetype == null ? ""
											: metricslist[i].storagetype;
									workRow[7] = metricslist[i].storage == null ? ""
											: metricslist[i].storage;
									workRow[8] = '<i class="fa fa-plus" style="font-size: 24px; line-height: 32px; vertical-align: middle;"></i>';
									// 한줄식 채워넣기
									storageMetricsTable.row.add(workRow).draw(
											false);
								}

								changeMetircsTableStateColor();

								// quickview td 에 class 와 style 줘야 됨.
								storageMetricsTable.rows().nodes().to$().find(
										'td:nth-child(9)').css({// 14번째(quickview)
									// td 다잡음
									"text-align" : "center"
								});
								storageMetricsTable.rows().nodes().to$().find(
										'td:nth-child(9)').addClass(
										'storageMetricsQuickViewButton');
								storageMetricsTable.rows().nodes().to$().find(
										'td:nth-child(9)').addClass(
										'storageQuickViewButtonMetrics');

								// quick view icon 에 기능 주기
								storageMetricsTable
										.rows()
										.nodes()
										.to$()
										.find('td:nth-child(9)')
										.mouseover(
												function() {
													// index 기반이기 땜누에 vmlist에서
													// index 값 찾아주기, 페이지 reload
													// 한게 아니기 때문에 page에 남아있는
													// ${vmlist}기준으로 찾아야됨
													// ${vmlist} 는 0부터 차례대로
													// 입력되어있음 vmList = ${vmlist}
													// 먼저 선택한 row의 td 첫번짹
													// 값(name) 값 획득
													volumename = $(this)
															.parent()
															.find(
																	'td:nth-child(1)')
															.text();
												
													var index;
													for (var i = 0; i < metricslist.length; i++) { // vmlist
														// index
														// 는
														// 0부터
														// 차례대로
														// 생성
														if (volumename === metricslist[i].name) {
															index = i;
															break;
														}
													}

													callQuickViewStorageMetrics(
															metricslist, index,
															$(this).offset());

												});

							},
							error : function(request, status, error) {
								
							}
						});
			}, setTime)
}

function changeMetircsTableStateColor() {
	var allRows = storageMetricsTable.rows().nodes().to$().find(
			'td:nth-child(2)'); // 7번째 td 다잡음
	for (var i = 0; i < allRows.length; i++) {
		if (allRows.eq(i).text() === "Ready") {
			allRows.eq(i).removeClass('bg-danger');
			allRows.eq(i).addClass('bg-success');
		} else {
			allRows.eq(i).removeClass('bg-success');
			allRows.eq(i).addClass('bg-danger');
		}
	}
}


/*
함수명 : refreshVolumeEventTable
기능 : volume event table을 새로고침하는 함수 
	 버튼을 생성해 연결함. 버튼 클릭시 table이 새로고침된다.
파라미터 : 
*/ 

function refreshVolumeEventTable() {

	// 전체 비우고
	storageVolumeEventTable.rows().remove().draw();

	// 처음 로딩인지 리프레쉬 버튼 눌러서 로딩인지 확인후 로딩 시간 다르게 부여
	if (volumeEventpageInitial) {
		volumeEventpageInitial = false;
		setTime = 0; // 바로 로드
	} else {
		setTime = 250; // 0.25초 뒤 로드로 설정
	}

	// 비우고 1초 뒤에 리스트 가져오게, refresh 되는 느낌 살려서
	var command = "listEvents&listall=true";

	setTimeout(
			function() {
				// ajax로 metrics list 가져오기
				$
						.ajax({
							url : contextPath + '/apivolumeEvent',
							type : 'POST',
							async : false,
							dataType : 'json',
							data : {
								"test" : command
							},
							success : function(data) {
								var volumeEventlist = data;
								
								try{
									for (var i = 0; i < volumeEventlist.length; i++) {
										// add instance 중에 null 처리 안해주면 에러 난다.

										workRow = [];
										workRow[0] = volumeEventlist[i].description == null ? ""
												: volumeEventlist[i].description;
										workRow[1] = volumeEventlist[i].level == null ? ""
												: volumeEventlist[i].level;
										workRow[2] = volumeEventlist[i].type == null ? ""
												: volumeEventlist[i].type;
										workRow[3] = volumeEventlist[i].account == null ? ""
												: volumeEventlist[i].account;
										workRow[4] = volumeEventlist[i].domain == null ? ""
												: volumeEventlist[i].domain;
										workRow[5] = volumeEventlist[i].state == null ? ""
												: volumeEventlist[i].state;
										workRow[6] = volumeEventlist[i].created == null ? ""
												: volumeEventlist[i].created;
										// workRow[7] = '<i class="fa fa-plus"
										// style="font-size: 24px; line-height:
										// 32px; vertical-align: middle;"></i>';
										// 한줄식 채워넣기

										storageVolumeEventTable.row.add(workRow)
												.draw(false);
									}
									// quickview td 에 class 와 style 줘야 됨.
									storageVolumeEventTable.rows().nodes().to$()
											.find('td:nth-child(8)').css({// 8번째(quickview)
												// td 다잡음
												"text-align" : "center"
											});
									storageVolumeEventTable.rows().nodes().to$()
											.find('td:nth-child(8)').addClass(
													'storageQuickViewButton');
									storageVolumeEventTable.rows().nodes().to$()
											.find('td:nth-child(8)').addClass(
													'storageQuickViewButtonvolume');

									// quick view icon 에 기능 주기
									storageVolumeEventTable
											.rows()
											.nodes()
											.to$()
											.find('td:nth-child(8)')
											.mouseover(
													function() {
														// index 기반이기 땜누에 vmlist에서
														// index 값 찾아주기, 페이지 reload
														// 한게 아니기 때문에 page에 남아있는
														// ${vmlist}기준으로 찾아야됨
														// ${vmlist} 는 0부터 차례대로
														// 입력되어있음 vmList = ${vmlist}
														// 먼저 선택한 row의 td 첫번짹
														// 값(name) 값 획득
														volumeeventname = $(this)
																.parent()
																.find(
																		'td:nth-child(1)')
																.text();
														
														var index;
														for (var i = 0; i < volumeEventlist.length; i++) { // vmlist
															// index
															// 는
															// 0부터
															// 차례대로
															// 생성
															if (vmsnapshotname === volumeEventlist[i].name) {
																index = i;
																break;
															}
														}

														callQuickViewVolumeEvent(
																volumeEventlist,
																index, $(this)
																		.offset());

													});
								}catch(e){
									
								}
								

							},
							error : function(request, status, error) {
								
							}
						});
			}, setTime)
}

