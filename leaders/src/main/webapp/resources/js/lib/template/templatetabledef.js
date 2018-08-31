// template 테이블 정의
var table1 = $('#templatetable')
.DataTable(
		{

			'dom' : 'Bfrtip',
			'buttons' : [	
				{
				text : 'Add Template',
				className : 'templateurlresource-add-btn'
			} ],
     

			'columnDefs' : [
					{
						'targets' : [ 0, 1, 2, 3, 4 ],
						//	'searchable':false,  
						'orderable' : false

					}
					 ],
			'order' : [ 4, 'desc' ]

		});
		
	// iso 테이블 정의	
	var table2 = $('#isotable')
	.DataTable(
			{

				'dom' : 'Bfrtip',
				'buttons' : [
					{
					text : 'Register ISO',
					className : 'isoresource-add-btn'
				} ],
	     

				'columnDefs' : [
						{
							'targets' : [ 0, 1, 2, 3],
							//	'searchable':false,  
							'orderable' : false

						}
						 ],
				'order' : [ 3, 'desc' ]

			});
	

$(".dataTables_wrapper .dt-buttons").css({
'float' : 'right',
'padding-left' : '5px'
});

$('.templateurlresource-add-btn').click(function() {
	console.log('check');
	$("#templateurlcreateBtn").modal('show');
});

$('.templatelocalresource-add-btn').click(function() {
	console.log('check');
	$("#templatelocalcreateBtn").modal('show');
});

$('.isoresource-add-btn').click(function() {
	console.log('check');
	$("#isocreateBtn").modal('show');
});
