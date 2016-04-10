
define(["dojo/promise/all", "dojo/_base/declare", "../models/apiModel", "dojo/Deferred",  "dojo/Evented",  "../Util/Util"],
		function (all, declare, model, Deferred, Evented, util) {
			var factory = new util();
	        var OffensePresenter = declare([], {
	        	offense_type: {},
	        	offenses: null,
	        	source_ips: null,
	        	dest_ips: null,
	        	offenseAPI : {},
	        	sourceAPI: {},
	        	destAPI: {},
	        	
	        	constructor: function(){
		        	this.offense_type = {
		        		'0': 	'Source IP',
		        		'1':	'Destination IP',
		        		'2':	'Event Name',
		        		'3':	'Username',
		        		'4':	'Source MAC Address',
		        		'5':	'Destination MAC Address',
		        		'6':	'Log Source',
		        		'7':	'Hostname',
		        		'8':	'Source Port',
		        		'9':	'Destination Port',
		        		'10':	'Source IPv6',
		        		'11': 'Destination IPv6',
		        		'12':	'Source ASN',
		        		'13':	'Destination ASN',
		        		'14':	'Rule',
		        		'15':	'App Id',
		        		'18':	'Scheduled Search',
		        	};
		        	//these are not really necessary, simple types are assigned by value
		        	this.offenses = this.source_ips = this.dest_ips = null;
		        	this.offenseAPI = new model('offenses').apiStore;
		        	this.sourceAPI = new model('offense-source-address').apiStore;
		        	this.destAPI= new model('offense-local-address').apiStore;
	        	},
	        	
	        	parseResults: function(){
	        		var self = this;
	            	for(var i =0; i< self.offenses.length  ; i++){
	            		var item = self.offenses[i];            	         			
        				var sources = offense.source_address_ids;
        				var filtered = self.source_ips.filter(function(item){
	            			return sources.indexOf(item.id) > -1;
	            		});
        				self.offense.source_addresses = filtered;
        				
        				var destinations = offense.local_destination_address_ids;
        				filtered = self.dest_ips.filter(function(item){
	            			return destinations.indexOf(item.id) > -1;
	            		});
        				self.local_destination_addresses = filtered;
        				
        				item.item.last_updated = factory.timeConverter(item.last_updated);
            			item.start_time= factory.timeConverter(item.start_time);
            			item.categories = item.categories.toString();
            			item.destination_networks = item.destination_networks.toString();
            			item.offense_type = offense_type[item.offense_type];
            			self.offenses[i] = item;
	            	}
	            },
	            
	           getOffenses: function(){
	        	   var self = this;
	        	   var d = new Deferred(function(reason){
  				      debugger
  				      console.log("Cancelled deferred with the reason" + reason)
	            	});
	        	   self.offenseAPI.query({}).then(function(offenses){
	        		   self.offense = offenses;
	                	console.log("Done getting offense list");
	                	d.resolve();
	                }, function(err){
        			    // Do something when the request errors out
        				deferred.cancel(err);
        				debugger
        			});
	                return deferred.promise;
	           },
	           
	           getOffense_Sources: function(){
	        	   var self = this;
	        	   var d = new Deferred(function(reason){
  				      debugger
  				      console.log("Cancelled deferred with the reason" + reason)
	            	});
	        	   self.sourceAPI.query({fields: 'source_ip, i'}).then(function(source_ips){
               			self.source_ips = source_ips;
	                	console.log("Done getting offense source addresses");
	                	d.resolve();
	                }, function(err){
        			    // Do something when the request errors out
        				deferred.cancel(err);
        				debugger
        			});
	                return deferred.promise;
	           },
	           
	           getOffense_Destinations: function(){
	        	   var self = this;
	        	   var d = new Deferred(function(reason){
  				      debugger
  				      console.log("Cancelled deferred with the reason" + reason)
	            	});
	        	   self.destAPI.query({fields: 'local_destination_ip, id'}).then(function(dest_ips){
   	        			self.dest_ips = dest_ips;
	                	console.log("Done getting offense local destination addresses");
	                	d.resolve();
	                }, function(err){
        			    // Do something when the request errors out
        				deferred.cancel(err);
        				debugger
        			});
	                return deferred.promise;
	           },
	        
	            getALL: function () {
	            	var self = this;
	            	var deferred = new Deferred(function(reason){
  				      debugger
  				      console.log("Cancelled deferred with the reason" + reason)
	            	});
	            	all([self.getOffenses(), self.getOffense_Sources(),  self.getOffense_Destinations()  ]).then(function(){
	            		  self.parseResults();
	            		  deferred.resolve(self.offenses);
	            	 }, function(err){
        			    // Do something when the request errors out
        				deferred.cancel(err);
        				debugger
        			});
	                return deferred.promise;
	            },
	           
	        });

	        return OffensePresenter;
});