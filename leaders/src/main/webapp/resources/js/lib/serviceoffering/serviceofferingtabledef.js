// 테이블 column 속성 정의  , 행 order 기능 정의

// compute 테이블
var table1 = $('#computingtable')
		.DataTable(
				{

					'dom' : 'Bfrtip',
					'buttons' : [ {
						text : 'Add Resource',
						className : 'computeresource-add-btn'
					} ],

					//'rowReorder' : true,      

					'columnDefs' : [
							{
								'targets' : [ 0, 1, 3 ],
								//	'searchable':false,  
								'orderable' : false
							/*	'className': 'dt-body-center',
								'render': function (data, type, full, meta){ 
									num1 = full[1];
							    	return '<input type="checkbox" name="' + num1 + '" value="' 
							   	+ $('<div/>').text(data).html() + '">';
							}  */

							},
							{
								'targets' : 2,
								//'searchable' : false,  
								//'orderable' : false,
								'render' : function(data, type, full, meta) {
									if (type === 'display') {
										var $span = $('<span></span>');

										$(
												'<div class="c1" style="float: left; width: 25%; color:black; cursor: pointer" ><i class="fa fa-angle-up" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										$(
												'<div class="c2" style="float: left; width: 25%; color:black; cursor: pointer" ><i class="fa fa-angle-down" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										$(
												'<div class="c3" style="float: left; width: 25%; color:black; cursor: pointer" ><i class="fa fa-angle-double-up" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										$(
												'<div class="c4" style="float: left; width: 25%; color:black; cursor: pointer" ><i class="fa fa-angle-double-down" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										return $span.html();
									}
									return data;
								}
							} ],
					'drawCallback' : function(settings) {
						//$('#computingtable tr:last .c2').remove();

						// Remove previous binding before adding it
						$('.c1').unbind('click');
						$('.c2').unbind('click');
						$('.c3').unbind('click');
						$('.c4').unbind('click');
						$('.c5').unbind('click');

						/*	$('.c5').unbind('mouseover');
							$('.c5').unbind('mouseleave'); */

						// 마우스 올리면 색깔 변경
						$('.c1').mouseover(color);
						$('.c2').mouseover(color);
						$('.c3').mouseover(color);
						$('.c4').mouseover(color);
						$('.c5').mouseover(color);

						// 마우스 떠나면 원래 색으로
						$('.c1').mouseleave(colorOff);
						$('.c2').mouseleave(colorOff);
						$('.c3').mouseleave(colorOff);
						$('.c4').mouseleave(colorOff);
						$('.c5').mouseleave(colorOff);

						// Bind clicks to functions  
						$('.c1').click(cmoveUp);
						$('.c2').click(cmoveDown);
						$('.c3').click(cmoveTop);
						$('.c4').click(cmoveBottom);
						//$('.c1').click(moveUp);
					},
					'order' : [ 2, 'desc' ]

				});

$(".dataTables_wrapper .dt-buttons").css({
	'float' : 'right',
	'padding-left' : '5px'
});

//System 테이블
var table2 = $('#systemtable')
		.DataTable(
				{

					'dom' : 'Bfrtip',
					'buttons' : [ {
						text : 'Add Resource',
						className : 'systemresource-add-btn',
					} ],

					//'rowReorder' : true,  
					'columnDefs' : [
							{
								'targets' : [ 0, 1, 3 ],
								'orderable' : false,
							},
							{
								'targets' : 2,
								'render' : function(data, type, full, meta) {
									if (type === 'display') {
										var $span = $('<span></span>');

										$(
												'<div class="s1" style="float: left; width: 25%; color:black; cursor: pointer" title="Move up one row" ><i class="fa fa-angle-up" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										$(
												'<div class="s2" style="float: left; width: 25%; color:black; cursor: pointer" title="Move down one row"><i class="fa fa-angle-down" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										$(
												'<div class="s3" style="float: left; width: 25%; color:black; cursor: pointer" title="Move to top"><i class="fa fa-angle-double-up" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										$(
												'<div class="s4" style="float: left; width: 25%; color:black; cursor: pointer" title="Move to bottom"><i class="fa fa-angle-double-down" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										return $span.html();
									}
									return data;
								}
							} ],
					'drawCallback' : function(settings) {
						//$('#computingtable tr:last .c2').remove();

						// Remove previous binding before adding it
						$('.s1').unbind('click');
						$('.s2').unbind('click');
						$('.s3').unbind('click');
						$('.s4').unbind('click');
						$('.s5').unbind('click');

						/*	$('.c5').unbind('mouseover');
							$('.c5').unbind('mouseleave'); */

						$('.s1').mouseover(color);
						$('.s2').mouseover(color);
						$('.s3').mouseover(color);
						$('.s4').mouseover(color);
						$('.s5').mouseover(color);

						$('.s1').mouseleave(colorOff);
						$('.s2').mouseleave(colorOff);
						$('.s3').mouseleave(colorOff);
						$('.s4').mouseleave(colorOff);
						$('.s5').mouseleave(colorOff);

						// Bind clicks to functions
						$('.s1').click(smoveUp);
						$('.s2').click(smoveDown);
						$('.s3').click(smoveTop);
						$('.s4').click(smoveBottom);
						//$('.c1').click(moveUp);
					},
					'order' : [ 2, 'desc' ]
				});

$(".dataTables_wrapper .dt-buttons").css({
	'float' : 'right',
	'padding-left' : '5px'
});

//Disk 테이블
var table3 = $('#disktable')
		.DataTable(
				{
					// check box는 필터 기능 삭제
					'dom' : 'Bfrtip',
					'buttons' : [ {
						text : 'Add Resource',
						className : 'diskresource-add-btn',
					} ],

					//'rowReorder' : true,  
					'columnDefs' : [
							{
								'targets' : [ 0, 1, 2, 3, 5 ],
								'orderable' : false,

							},
							{
								'targets' : 4,
								'render' : function(data, type, full, meta) {
									if (type === 'display') {
										var $span = $('<span></span>');

										$(
												'<div class="d1" style="float: left; width: 25%; color:black; cursor: pointer" ><i class="fa fa-angle-up" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										$(
												'<div class="d2" style="float: left; width: 25%; color:black; cursor: pointer" ><i class="fa fa-angle-down" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										$(
												'<div class="d3" style="float: left; width: 25%; color:black; cursor: pointer" ><i class="fa fa-angle-double-up" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										$(
												'<div class="d4" style="float: left; width: 25%; color:black; cursor: pointer" ><i class="fa fa-angle-double-down" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										return $span.html();
									}
									return data;
								}
							} ],
					'drawCallback' : function(settings) {
						//$('#computingtable tr:last .c2').remove();

						// Remove previous binding before adding it
						$('.d1').unbind('click');
						$('.d2').unbind('click');
						$('.d3').unbind('click');
						$('.d4').unbind('click');
						$('.d5').unbind('click');

						/*	$('.c5').unbind('mouseover');
							$('.c5').unbind('mouseleave'); */

						$('.d1').mouseover(color);
						$('.d2').mouseover(color);
						$('.d3').mouseover(color);
						$('.d4').mouseover(color);
						$('.d5').mouseover(color);

						$('.d1').mouseleave(colorOff);
						$('.d2').mouseleave(colorOff);
						$('.d3').mouseleave(colorOff);
						$('.d4').mouseleave(colorOff);
						$('.d5').mouseleave(colorOff);

						// Bind clicks to functions
						$('.d1').click(dmoveUp);
						$('.d2').click(dmoveDown);
						$('.d3').click(dmoveTop);
						$('.d4').click(dmoveBottom);
						//$('.c1').click(moveUp);  
					},
					'order' : [ 4, 'desc' ]
				});

$(".dataTables_wrapper .dt-buttons").css({
	'float' : 'right',
	'padding-left' : '5px'
});

//Network 테이블
var table4 = $('#networktable')
		.DataTable(
				{
					// check box는 필터 기능 삭제
					'dom' : 'Bfrtip',
					'buttons' : [ {
						text : 'Add Resource',
						className : 'networkresource-add-btn',

					} ],

					//'rowReorder' : true,  
					'columnDefs' : [
							{
								'targets' : [ 0, 1, 3 ],
								'orderable' : false,

							},
							{
								'targets' : 2,
								'render' : function(data, type, full, meta) {
									if (type === 'display') {
										var $span = $('<span></span>');

										$(
												'<div class="n1" style="float: left; width: 25%; color:black; cursor: pointer" ><i class="fa fa-angle-up" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										$(
												'<div class="n2" style="float: left; width: 25%; color:black; cursor: pointer" ><i class="fa fa-angle-down" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										$(
												'<div class="n3" style="float: left; width: 25%; color:black; cursor: pointer" ><i class="fa fa-angle-double-up" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										$(
												'<div class="n4" style="float: left; width: 25%; color:black; cursor: pointer" ><i class="fa fa-angle-double-down" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										return $span.html();
									}
									return data;
								}
							} ],
					'drawCallback' : function(settings) {
						//$('#computingtable tr:last .c2').remove();

						// Remove previous binding before adding it
						$('.n1').unbind('click');
						$('.n2').unbind('click');
						$('.n3').unbind('click');
						$('.n4').unbind('click');
						$('.n5').unbind('click');

						/*	$('.c5').unbind('mouseover');
							$('.c5').unbind('mouseleave'); */

						$('.n1').mouseover(color);
						$('.n2').mouseover(color);
						$('.n3').mouseover(color);
						$('.n4').mouseover(color);
						$('.n5').mouseover(color);

						$('.n1').mouseleave(colorOff);
						$('.n2').mouseleave(colorOff);
						$('.n3').mouseleave(colorOff);
						$('.n4').mouseleave(colorOff);
						$('.n5').mouseleave(colorOff);

						// Bind clicks to functions
						$('.n1').click(nmoveUp);
						$('.n2').click(nmoveDown);
						$('.n3').click(nmoveTop);
						$('.n4').click(nmoveBottom);
						//$('.c1').click(moveUp);
					},
					'order' : [ 2, 'desc' ]
				});

$(".dataTables_wrapper .dt-buttons").css({
	'float' : 'right',
	'padding-left' : '5px'
});

// VPC 테이블
var table5 = $('#vpctable')
		.DataTable(
				{
					// check box는 필터 기능 삭제
					'dom' : 'Bfrtip',
					'buttons' : [ {
						text : 'Add Resource',
						className : 'vpcresource-add-btn',

					} ],

					//	'rowReorder' : true,   
					'columnDefs' : [
							{
								'targets' : [ 0, 1, 3 ],
								'orderable' : false,

							},
							{
								'targets' : 2,
								'render' : function(data, type, full, meta) {
									if (type === 'display') {
										var $span = $('<span></span>');

										$(
												'<div class="v1" style="float: left; width: 25%; color:black; cursor: pointer" ><i class="fa fa-angle-up" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										$(
												'<div class="v2" style="float: left; width: 25%; color:black; cursor: pointer" ><i class="fa fa-angle-down" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										$(
												'<div class="v3" style="float: left; width: 25%; color:black; cursor: pointer" ><i class="fa fa-angle-double-up" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										$(
												'<div class="v4" style="float: left; width: 25%; color:black; cursor: pointer" ><i class="fa fa-angle-double-down" style="font-size:24px; line-height : 32px; text-align:center;"></i></div>')
												.appendTo($span);
										return $span.html();
									}
									return data;
								}
							} ],
					'drawCallback' : function(settings) {
						//$('#computingtable tr:last .c2').remove();

						// Remove previous binding before adding it
						$('.v1').unbind('click');
						$('.v2').unbind('click');
						$('.v3').unbind('click');
						$('.v4').unbind('click');
						$('.v5').unbind('click');

						/*	$('.c5').unbind('mouseover');
							$('.c5').unbind('mouseleave'); */

						$('.v1').mouseover(color);
						$('.v2').mouseover(color);
						$('.v3').mouseover(color);
						$('.v4').mouseover(color);
						$('.v5').mouseover(color);

						$('.v1').mouseleave(colorOff);
						$('.v2').mouseleave(colorOff);
						$('.v3').mouseleave(colorOff);
						$('.v4').mouseleave(colorOff);
						$('.v5').mouseleave(colorOff);

						// Bind clicks to functions
						$('.v1').click(vmoveUp);
						$('.v2').click(vmoveDown);
						$('.v3').click(vmoveTop);
						$('.v4').click(vmoveBottom);
						//$('.c1').click(moveUp);  
					},
					'order' : [ 2, 'desc' ]
				});

$(".dataTables_wrapper .dt-buttons").css({
	'float' : 'right',
	'padding-left' : '5px'
});

function enableColorCheck(kind) {

	if (kind == 'net') {
		 // console.log(metricsTable.rows().nodes().to$());
        var allRows = table4.rows().nodes().to$().find('td:nth-child(2)'); // 2번째 td 다잡음
        for (var i=0; i<allRows.length; i++) {
           // console.log(allRows.eq(i).text());
           if (allRows.eq(i).text() === "Enabled") {
              allRows.eq(i).removeClass('bg-danger');
              allRows.eq(i).addClass('bg-success');
           } else {
              allRows.eq(i).removeClass('bg-success');
              allRows.eq(i).addClass('bg-danger');
           }
        }
	}

	else if (kind == 'vpc') {
		 // console.log(metricsTable.rows().nodes().to$());
        var allRows = table5.rows().nodes().to$().find('td:nth-child(2)'); // 2번째 td 다잡음
        for (var i=0; i<allRows.length; i++) {
           // console.log(allRows.eq(i).text());
           if (allRows.eq(i).text() === "Enabled") {
              allRows.eq(i).removeClass('bg-danger');
              allRows.eq(i).addClass('bg-success');
           } else {
              allRows.eq(i).removeClass('bg-success');
              allRows.eq(i).addClass('bg-danger');
           }
        }
	}
}

function color() {
	$(this).css("color", '#2C81B7');
}

function colorOff() {
	$(this).css("color", 'black');
}

function cmoveUp() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'up', 1);
}

// Move the row down
function cmoveDown() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'down', 1);
}

function cmoveTop() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'top', 1);
}

function cmoveBottom() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'bottom', 1);
}

function smoveUp() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'up', 2);
}

// Move the row down
function smoveDown() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'down', 2);
}

function smoveTop() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'top', 2);
}

function smoveBottom() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'bottom', 2);
}

function dmoveUp() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'up', 3);
}

// Move the row down
function dmoveDown() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'down', 3);
}

function dmoveTop() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'top', 3);
}

function dmoveBottom() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'bottom', 3);
}

function nmoveUp() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'up', 4);
}

// Move the row down
function nmoveDown() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'down', 4);
}

function nmoveTop() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'top', 4);
}

function nmoveBottom() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'bottom', 4);
}

function vmoveUp() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'up', 5);
}

// Move the row down
function vmoveDown() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'down', 5);
}

function vmoveTop() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'top', 5);
}

function vmoveBottom() {
	var tr = $(this).parents('tr');
	moveRow(tr, 'bottom', 5);
}

// Move up or down (depending...)
function moveRow(row, direction, tableKind) {
	
	switch (tableKind) {

	//compute table
	case 1: {

		var index = table1.row(row).index();
		var sl1 = serviceofferingList[index];

		if (direction == 'top' && index != 0) {
			var data1 = table1.row(index).data();

			for (var i = index; i > 0; i--) {
				table1.row(i).data(table1.row(i - 1).data());
				serviceofferingList[i] = serviceofferingList[i - 1];
			}

			table1.row(0).data(data1);
			serviceofferingList[0] = sl1;

			if (index < 10)
				table1.page(0).draw(false);
			else
				table1.page(1).draw(false);
		}

		else if (direction == 'bottom'
				&& index != table1.column(0).data().length - 1) {
			var data1 = table1.row(index).data();
			var length = table1.column(0).data().length;
			var sl1 = serviceofferingList[index];

			for (var i = index; i < length; i++) {
				table1.row(i).data(table1.row(i + 1).data());
				serviceofferingList[i] = serviceofferingList[i + 1];
			}

			table1.row(length - 1).data(data1);
			serviceofferingList[length - 1] = sl1;

			if (index < 10)
				table1.page(0).draw(false);
			else
				table1.page(1).draw(false);
		}

		else if (direction == 'up' || direction == 'down') {
			var order = -1;
			if (direction == 'down') {
				order = 1;
			}

			var data1 = table1.row(index).data();
			var sl1 = serviceofferingList[index];
			//data1.order += order;  

			var data2 = table1.row(index + order).data();
			var sl2 = serviceofferingList[index + order];
			//data2.order += -order; 

			table1.row(index).data(data2);
			table1.row(index + order).data(data1);
			serviceofferingList[index] = sl2;
			serviceofferingList[index + order] = sl1;

			if (index < 10)
				table1.page(0).draw(false);
			else
				table1.page(1).draw(false);

		}
		
		break;
	}

		// system table
	case 2: {
		
		var index = table2.row(row).index();
		var sl1 = systemofferingList[index];

		if (direction == 'top' && index != 0) {
			var data1 = table2.row(index).data();

			for (var i = index; i > 0; i--) {
				table2.row(i).data(table2.row(i - 1).data());
				systemofferingList[i] = systemofferingList[i - 1];
			}

			table2.row(0).data(data1);
			systemofferingList[0] = sl1;

			if (index < 10)
				table2.page(0).draw(false);
			else
				table2.page(1).draw(false);
		}

		else if (direction == 'bottom'
				&& index != table2.column(0).data().length - 1) {
			var data1 = table2.row(index).data();
			var length = table2.column(0).data().length;
			var sl1 = systemofferingList[index];

			for (var i = index; i < length; i++) {
				table2.row(i).data(table2.row(i + 1).data());
				systemofferingList[i] = systemofferingList[i + 1];
			}

			table2.row(length - 1).data(data1);
			systemofferingList[length - 1] = sl1;

			if (index < 10)
				table2.page(0).draw(false);
			else
				table2.page(1).draw(false);
		}

		else if (direction == 'up' || direction == 'down') {
			var order = -1;
			if (direction == 'down') {
				order = 1;
			}

			var data1 = table2.row(index).data();
			var sl1 = systemofferingList[index];
			//data1.order += order;  

			var data2 = table2.row(index + order).data();
			var sl2 = systemofferingList[index + order];
			//data2.order += -order; 

			table2.row(index).data(data2);
			table2.row(index + order).data(data1);
			systemofferingList[index] = sl2;
			systemofferingList[index + order] = sl1;

			if (index < 10)
				table2.page(0).draw(false);
			else
				table2.page(1).draw(false);

		}
		break;
	}

		//disk table
	case 3: {

		var index = table3.row(row).index();
		var sl1 = diskofferingList[index];

		if (direction == 'top' && index != 0) {
			var data1 = table3.row(index).data();

			for (var i = index; i > 0; i--) {
				table3.row(i).data(table3.row(i - 1).data());
				diskofferingList[i] = diskofferingList[i - 1];
			}

			table3.row(0).data(data1);
			diskofferingList[0] = sl1;

			if (index < 10)
				table3.page(0).draw(false);
			else
				table3.page(1).draw(false);
		}

		else if (direction == 'bottom'
				&& index != table3.column(0).data().length - 1) {
			var data1 = table3.row(index).data();
			var length = table3.column(0).data().length;
			var sl1 = diskofferingList[index];

			for (var i = index; i < length; i++) {
				table3.row(i).data(table3.row(i + 1).data());
				diskofferingList[i] = diskofferingList[i + 1];
			}

			table3.row(length - 1).data(data1);
			diskofferingList[length - 1] = sl1;

			if (index < 10)
				table3.page(0).draw(false);
			else
				table3.page(1).draw(false);
		}

		else if (direction == 'up' || direction == 'down') {
			var order = -1;
			if (direction == 'down') {
				order = 1;
			}

			var data1 = table3.row(index).data();
			var sl1 = diskofferingList[index];
			//data1.order += order;  

			var data2 = table3.row(index + order).data();
			var sl2 = diskofferingList[index + order];
			//data2.order += -order; 

			table3.row(index).data(data2);
			table3.row(index + order).data(data1);
			diskofferingList[index] = sl2;
			diskofferingList[index + order] = sl1;

			if (index < 10)
				table3.page(0).draw(false);
			else
				table3.page(1).draw(false);

		}
		break;
	}

		// network table
	case 4: {

		var index = table4.row(row).index();
		var sl1 = networkofferingList[index];

		if (direction == 'top' && index != 0) {
			var data1 = table4.row(index).data();

			for (var i = index; i > 0; i--) {
				table4.row(i).data(table4.row(i - 1).data());
				networkofferingList[i] = networkofferingList[i - 1];
			}

			table4.row(0).data(data1);
			networkofferingList[0] = sl1;

			if (index < 10)
				table4.page(0).draw(false);
			else
				table4.page(1).draw(false);
		}

		else if (direction == 'bottom'
				&& index != table4.column(0).data().length - 1) {
			var data1 = table4.row(index).data();
			var length = table4.column(0).data().length;
			var sl1 = networkofferingList[index];

			for (var i = index; i < length; i++) {
				table4.row(i).data(table4.row(i + 1).data());
				networkofferingList[i] = networkofferingList[i + 1];
			}

			table4.row(length - 1).data(data1);
			networkofferingList[length - 1] = sl1;

			if (index < 10)
				table4.page(0).draw(false);
			else
				table4.page(1).draw(false);
		}

		else if (direction == 'up' || direction == 'down') {
			var order = -1;
			if (direction == 'down') {
				order = 1;
			}

			var data1 = table4.row(index).data();
			var sl1 = networkofferingList[index];
			//data1.order += order;  

			var data2 = table4.row(index + order).data();
			var sl2 = networkofferingList[index + order];
			//data2.order += -order; 

			table4.row(index).data(data2);
			table4.row(index + order).data(data1);
			networkofferingList[index] = sl2;
			networkofferingList[index + order] = sl1;

			if (index < 10)
				table4.page(0).draw(false);
			else
				table4.page(1).draw(false);

		}
		enableColorCheck('net');
		break;
	}

		//vpc table
	case 5: {

		var index = table5.row(row).index();
		var sl1 = vpcofferingList[index];

		if (direction == 'top' && index != 0) {
			var data1 = table5.row(index).data();

			for (var i = index; i > 0; i--) {
				table5.row(i).data(table5.row(i - 1).data());
				vpcofferingList[i] = vpcofferingList[i - 1];
			}

			table5.row(0).data(data1);
			vpcofferingList[0] = sl1;

			if (index < 10)
				table5.page(0).draw(false);
			else
				table5.page(1).draw(false);
		}

		else if (direction == 'bottom'
				&& index != table5.column(0).data().length - 1) {
			var data1 = table5.row(index).data();
			var length = table5.column(0).data().length;
			var sl1 = vpcofferingList[index];

			for (var i = index; i < length; i++) {
				table5.row(i).data(table5.row(i + 1).data());
				vpcofferingList[i] = vpcofferingList[i + 1];
			}

			table5.row(length - 1).data(data1);
			vpcofferingList[length - 1] = sl1;

			if (index < 10)
				table5.page(0).draw(false);
			else
				table5.page(1).draw(false);
		}

		else if (direction == 'up' || direction == 'down') {
			var order = -1;
			if (direction == 'down') {
				order = 1;
			}

			var data1 = table5.row(index).data();
			var sl1 = vpcofferingList[index];
			//data1.order += order;  

			var data2 = table5.row(index + order).data();
			var sl2 = vpcofferingList[index + order];
			//data2.order += -order; 

			table5.row(index).data(data2);
			table5.row(index + order).data(data1);
			vpcofferingList[index] = sl2;
			vpcofferingList[index + order] = sl1;

			if (index < 10)
				table5.page(0).draw(false);
			else
				table5.page(1).draw(false);

		}

		enableColorCheck('vpc');
		break;
	}
	}

}
