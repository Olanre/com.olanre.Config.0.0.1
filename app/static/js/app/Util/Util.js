define(["dojo/_base/declare"], function(declare){
	    var Util =  declare([], {
	    	
	        
	    	getCookie: function(name){
	    		var value = "; " + document.cookie;
	    		  var parts = value.split("; " + name + "=");
	    		  if (parts.length == 2) return parts.pop().split(";").shift();
	    	},
	    
	    	Items: function(){
	    		var obj = {};
	    	    for(var i=0; i<arguments.length; i++)
	    	        obj[arguments[i]] = null;

	    	    return obj;
	    	},
	    	
	    	intersect_safe: function(a, b){
	    		a = a.sort();
	    		b = b.sort();
	    		var ai = bi= 0;
	    		var result = [];

	    		while( ai < a.length && bi < b.length ){
	    			if      (a[ai] < b[bi] ){ ai++; }
	    			else if (a[ai] > b[bi] ){ bi++; }
	    			else /* they're equal */
	    			{
	    				result.push(ai);
	    				ai++;
	    				bi++;
	    			}
	    		}
	    		return result;
	    	},
	    	
	    	getEndpoints: function(type){
	    			var endPoints = {'log_sources': '/api/configuration/log_sources',
	    							'log_source_types': '/api/configuration/log_source_types',
	    							'log_source_protocols': '/api/configuration/log_source_protocols',
	    							'log_source_groups': '/api/config/log_source_groups',
    								'users' : '/api/usermanagement/users',
    								'offenses': '/api/siem/offenses',
    								'offense-source-address' : '/api/siem/source_addresses',
    								'offense-local-address' : '/api/siem/local_destination_addresses',
    								'ref_set' : '/api/reference_data/sets',
    								'regex_property': '/api/config/event_sources/custom_properties/regex_properties',
    								'property_expression': '/api/config/event_sources/custom_properties/property_expressions',
    								'qid_records' : '/api/data_classification/qid_records',
    								'low_level_category' : '/api/data_classification/low_level_categories',
    								'networks': '/api/config/network_hierarchy/networks',
    								'servers': '/api/config/deployment/hosts',
    								'components': '/api/config/deployment/components',
    								'apps': '/api/gui_app_framework/applications'
	    			};
	    			if(endPoints[type] !== null){
	    				return endPoints[type];
	    			}else{
	    				return null;
	    			}
	    	},
	    	
	    	getDateTime: function(){
	    		var now     = new Date(); 
	    	    var year    = now.getFullYear();
	    	    var month   = now.getMonth()+1; 
	    	    var day     = now.getDate();
	    	    var hour    = now.getHours();
	    	    var minute  = now.getMinutes();
	    	    var second  = now.getSeconds(); 
	    	    if(month.toString().length == 1) {
	    	        var month = '0'+month;
	    	    }
	    	    if(day.toString().length == 1) {
	    	        var day = '0'+day;
	    	    }   
	    	    if(hour.toString().length == 1) {
	    	        var hour = '0'+hour;
	    	    }
	    	    if(minute.toString().length == 1) {
	    	        var minute = '0'+minute;
	    	    }
	    	    if(second.toString().length == 1) {
	    	        var second = '0'+second;
	    	    }   
	    	    var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
	    	    console.log("The time been used is " + dateTime);
	    	     return dateTime;
	    	},
	    	
	    	timeConverter: function(UNIX_timestamp){
	    		var a = new Date(UNIX_timestamp);
	    		  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	    		  var year = a.getFullYear();
	    		  var month = months[a.getMonth()];
	    		  var date = a.getDate();
	    		  var hour = a.getHours();
	    		  var min = a.getMinutes();
	    		  var sec = a.getSeconds();
	    		  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
	    		  return time;
	    	}

	    });
	    
	    return Util;
      
    
	});


