$(function() {
    "use strict";
    $('.year-calendar').pignoseCalendar({
        theme: 'light', // light, dark, blue
        scheduleOptions: {
    		colors: {
    			event: '#2fabb7',
    			server_event: '#5c6270',
    			server_info: '#80c340'
    		}
    	},
    	schedules: [{
    		name: 'server_event',
    	    date: '2018-04-09'
    	}, {
    		name: 'server_info',
    	    date: '2018-04-09'
    	}, {
    		name: 'event',
    	    date: '2018-04-24',
    	}],
    	select: function(date, context) {
    		console.log('events for this date', context.storage.schedules);
    		var sche = context.storage.schedules;
    		if(sche.length>1){
    			//$('#context-calendar').text(sche[0].name);
    			$('#context-calendar-ul li').remove();
    			$('#context-calendar-ul').append('<li class="list-group-item">['+sche[0].date + "] : "+ sche[0].name+'</li>');
    			for(var i=1; i<sche.length; i++){
        			//console.log(sche[i].name);
        			//$('#context-calendar').append('<br>'+sche[i].name);
        			$('#context-calendar-ul').append('<li class="list-group-item">['+sche[0].date + "] : "+ sche[i].name+'</li>');
        		}
    		}else if(sche.length==1){
    			$('#context-calendar-ul li').remove();
    			$('#context-calendar-ul').append('<li class="list-group-item">['+sche[0].date + "] : "+ sche[0].name+'</li>');
    			//$('#context-calendar').text(sche[0].name);
    		}else{
    			$('#context-calendar-ul li').remove();
    			//$('#context-calendar').text("");
    		}
    		
    		
    	}
    });

    $('input.calendar').pignoseCalendar({
        format: 'YYYY-MM-DD' // date format string. (2017-02-02)
    });
});

