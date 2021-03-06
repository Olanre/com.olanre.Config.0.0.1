define(["dojo/promise/all","dojo/_base/declare", "../models/apiModel", "dojo/Deferred",  "dojo/Evented", "../Util/Util" ],
		function (all, declare, model, Deferred, Evented, util) {
		var factory = new util();
		var RegexPresenter = declare([], {
	        	regex_property: [],    	
	        	sensors: [],
	        	property_express: [],
	        	qid : [],
	        	category: [],
	        	types: [],
	            regexAPI : {},
	            propertyAPI:  {},
	            qidAPI:  {},
	            categoryAPI:  {},
	            sensorsAPI :  {},
	            typesAPI :  {},
	            
	            constructor: function(){
	            	this.regex_property = [];   	
	            	this.sensors = [];
	            	this.property_express = [];
	            	this.qid = [];
	            	this.category = [];
	            	this.types = [];
		            this.regexAPI = new model("regex_property").apiStore;
		            this.propertyAPI = new model("property_expression").apiStore;
		            this.qidAPI = new model("qid_records").apiStore;
		            this.categoryAPI = new model("low_level_category").apiStore;
		            this.sensorsAPI = new model('log_sources').apiStore;
		            this.typesAPI = new model('log_source_types').apiStore;
	            },
	           
	           parseResults: function(){
	        	   var self = this;
	        	   for (var i =0 ; i< self.property_express.length; i++ ){            			
	        		   var property = self.property_express[i];
	            				
        				var regex = self.regex_property.filter(function(item){
	            			return item.id == property.regex_property_id;
	            		});
        				if(regex !== null  &&  regex.length > 0){
        					property.name = regex[0].name;
        					property.description = regex[0].description;
        					delete property.regex_property_id;
        				}
        				
        				var low_level_category = self.category.filter(function(item){
	            			return item.id == property.low_level_category_id;
	            		});
        				if(low_level_category !== null  && low_level_category.length > 0){
        					property.low_level_category = low_level_category[0].name ;
        					delete property.low_level_category_id;
        					
        				}else{
        					property.low_level_category = "";
        				}
        				
        				
        				
        				var logsources = self.sensors.filter(function(item){
	            			return item.id == property.log_source_id;
	            		});
        				if(logsources !== null  && logsources.length > 0){
        					property.logsource_name = logsources[0].name ;
        					delete property.log_source_id;
        					
        				}else{
        					property.logsource_name = "";
        				}
        				
        				var types = self.typesAPI.get(property.log_source_type_id).name;
        				if(types !== null){
        					property.logsource_type = types[0].name ;
        					delete property.log_source_type_id;
        					
        				}else{
        					property.logsource_types;
        				}
        				
        				if(property.qid !== null ){
        					var qidmap = self.qidAPI.get(property.qid).name;
        					property.qid = qidmap ;
        					
        				}else{
        					property.qid = "";
        				}
        				property.created= factory.timeConverter(property.created);
        				property.modified= factory.timeConverter(property.modified);
            			
            			self.property_express[i] = property;
	        	   }
	            },
	            
	            getProperties: function(){
	            	var self = this;
	            	var d = new Deferred(function(reason){
	  				      debugger
	  				      console.log("Cancelled deferred with the reason" + reason)
		            	});
	            	self.propertyAPI.query({}).then(function(properties){
	                	self.property_express = properties;
	                	console.log("Done getting regex property expressions");
	                	d.resolve();
	            	},function(err){
	        			// Do something when the request errors out
	        			d.cancel(err);
	        		});
	            	return d.promise;
	            },
	            
	            getQids: function(){
	            	var self = this;
	            	var d = new Deferred(function(reason){
	  				      debugger
	  				      console.log("Cancelled deferred with the reason" + reason)
		            });
	            	self.qidAPI.query({}).then(function(qids){
    	        		self.qids = qids;
	                	console.log("Done getting qid map details");
	                	d.resolve();
	            	},function(err){
	        			// Do something when the request errors out
	        			d.cancel(err);
	        		});
	            	return d.promise;
	            },
	            
	            getCategories: function(){
	            	var self = this;
	            	var d = new Deferred(function(reason){
	  				      debugger
	  				      console.log("Cancelled deferred with the reason" + reason)
		            });
	            	self.categoryAPI.query({}).then(function(category_list){
    	        		self.category = category_list;
	                	console.log("Done getting low level categories");
	                	d.resolve();
            		},function(err){
        			    // Do something when the request errors out
        				d.cancel(err);
        			});
	            	return d.promise;
	            },
	            
	            getLogsources: function(){
	            	var self = this;
	            	var d = new Deferred(function(reason){
	  				      debugger
	  				      console.log("Cancelled deferred with the reason" + reason)
		            });
	            	self.sensorsAPI.query({}).then(function(sensor_devices){
    	        		self.sensors = sensor_devices;
    	        		console.log("Done getting sensor devices");
	                	d.resolve();
            		},function(err){
        			    // Do something when the request errors out
        				d.cancel(err);
        			});
	            	return d.promise;
	            },
	            
	            getTypes: function(){
	            	var self = this;
	            	var d = new Deferred(function(reason){
	  				      debugger
	  				      console.log("Cancelled deferred with the reason" + reason)
		            });
	            	self.typesAPI.query({}).then(function(sensor_types){
    	        		self.types = sensor_types;
	                	console.log("Done getting sensor types");
	                	d.resolve();
            		},function(err){
        			    // Do something when the request errors out
        				d.cancel(err);
        			});
	            	return d.promise;
	            },
					           
	            getRegex: function () {
	            	var self = this;
	            	var d = new Deferred(function(reason){
  				      debugger
  				      console.log("Cancelled deferred with the reason" + reason)
	            	});
	                self.regexAPI.query({}).then(function(regexes){
	                	self.regex_property = regexes;
	                	console.log("Done getting regex properties");
	                	d.resolve();
	                }, function(err){
        			    // Do something when the request errors out
        				
        				deferred.cancel(err);
        				debugger
        			});
	                return d.promise;
	            },
	            
	            getAll: function(){
	            	var self = this;
	            	var d = new Deferred(function(reason){
	  				      debugger
	  				      console.log("Cancelled deferred with the reason" + reason)
		            });
	            	all([self.getProperties(), self.getTypes(), self.getCategories(), self.getLogsources(), self.getRegex()]).then(function(){
	            			self.parseResults();
	            			
	            			d.resolve(self.property_express);
	            	 }, function(err){
	        			    // Do something when the request errors out
	        				console.log(err);
	        				d.cancel(err);
	        				debugger
	        		});
	            	return d.promise;
	            },
	           
	        });

	        return RegexPresenter;
});