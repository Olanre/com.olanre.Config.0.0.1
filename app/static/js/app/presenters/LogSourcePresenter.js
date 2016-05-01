
define(["dojo/promise/all", "dojo/_base/declare", "../models/apiModel", "dojo/Deferred",  "../Util/Util" ], function (all, declare, model, Deferred, util) {
	        var LogSourcePresenter =  declare(null, {
	        	count : null,
	        	sensors : null,
	        	groups : null,
	        	types : null,
	        	factory : new util(),
	        	sensorsAPI: null ,
	        	groupsAPI: null,
	        	typesAPI: null,
	        	
	        	constructor: function(){
	        		this.count = null;
		        	this.sensors = null;
		        	this.groups = null;
		        	this.types = null;
		        	
		        	this.sensorsAPI = new model('log_sources').apiStore;
		        	this.groupsAPI = new model('log_source_groups').apiStore;
		        	this.typesAPI = new model('log_source_types').apiStore;
	        	},
	        	
	        	
	        	parse_sources : function(){
	        		var d =  new Deferred(function(reason){
  				      debugger
				      console.log("Cancelled deferred with the reason" + reason)
	        		});
	        		var self = this;
	        		for(var i = 0; i< self.sensors.length; i++){
	        			(function(item, i){
		            		var name;
		            		
		            		item.type = self.typesAPI.get(item.type).name;
		            		var logsourcegroups = item.groups;
		            		for( var j = 0; j < logsourcegroups.length; j++){
	        					item.groups[j] = self.groupsAPI.get(logsourcegroups[j]).name;         				
		            		}
		            		item.groups = item.groups.toString();
	            			
        					var protocol = "";
            				item.creation_date = factory.timeConverter(item.creation_date);
                			item.last_event_time= factory.timeConverter(item.last_event_time);
                			
                			item.modified_date = factory.timeConverter(item.modified_date);
                			item.target_event_collector = item['target_event_collector']['name'];
                			item.language = item.language.name;
                			for(key in item.protocol_config){
                				protocol += item.protocol_config[key] + " ";
                			}
                			item.protocol_config = protocol;
                			self.sensors[i] = item;
                			
                			if( (self.sensors.length -1) == i) return d.resolve();
	            			

	        			})(self.sensors[i], i);
	        		}
            		return d.promise;
	            },
	            
	            
	           parse_types  : function(){
	        	   var self = this;
	        	   for(var i =0; i < self.types.length; i++){
	            		var id =  self.types[i].id;
	            		var filtered = self.sensors.filter(function(item){
	            			return item.type == id;
	            		});
	            		
	            		self.types[i]['log_sources'] = filtered;
	        	   }
	            },
	            
	            parse_groups: function(){
	            	var self = this;
	            	for(var i =0; i < self.groups.length; i++){
	            		var id =  self.groups[i].id;
	            		for(var j= 0; j < self.groups[i].log_sources.length; j++){
	            			var filtered = self.sensors.filter(function(item){
		            			return item.id ==  self.groups[i].log_sources[j];
		            		});
	            			self.groups[i].log_sources[j] = filtered;
	            			
	            			//debugger
	            		}

	            	}
	            	self.groups = self.buildTree( self.groups);
	            	 
	            },
	            
	            buildTree: function ( arr, parent, tree){
	            	var self = this;
	            	tree = typeof tree !== 'undefined' ? tree : [];
	            	var sensor_parent = arr.filter( function(node){ return node.parent_id == null });
	                parent = typeof parent !== 'undefined' ? parent :  sensor_parent;
	            	
	            	 var children = arr.filter( function(child){ return child.parent_id == parent.id; });
	            	 if(children.length > 0){
	            		if(parent.parent_id == null){
	            			tree = parent;
	            		}
	            		parent.children = children;
		            	 
		            	 children.forEach(function(child){
		            		self.buildTree( arr, child);
		            	 });
	            	 }
	            	 return tree;	            	 
	            	 
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
	            
	            getGroups: function(){
	            	var self = this;
	            	var d = new Deferred(function(reason){
	  				      debugger
	  				      console.log("Cancelled deferred with the reason" + reason)
		            });
	            	self.groupsAPI.query({}).then(function(sensor_groups){
    	        		self.groups = sensor_groups;
	                	console.log("Done getting sensor groups");
	                	d.resolve();
            		},function(err){
        			    // Do something when the request errors out
        				d.cancel(err);
        			});
	            	return d.promise;
	            },
	            
	            getKeys: function(){
	            	return this.sensors
	            }
	            
	        
	            getAll: function(){
	            	var self = this;
	            	var d = new Deferred(function(reason){
  				      debugger
  				      console.log("Cancelled deferred with the reason" + reason)
	            	});
	            	all([self.getLogsources(), self.getTypes(), self.getGroups()]).then(function(){
	            		
	            		self.parse_sources().then(function(){
		            		all([self.parse_types(), self.parse_groups()]).then(function(){
		            			var result = { 'sensors': self.sensors, 'types': self.types, 'groups': self.groups };
			            		 d.resolve(result);
		            		}, function(err){
		        			    // Do something when the request errors out
		        				console.log(err);
		        				d.cancel(err);
		        			
		            		});
	            		}, function(err){
	        			    // Do something when the request errors out
	        				console.log(err);
	        				d.cancel(err);
	        			
	            		});
	            	 }, function(err){
	        			    // Do something when the request errors out
	        				console.log(err);
	        				d.cancel(err);
	        			
	        		});
	            	 
	                return d.promise;
	            },
	           
	        });
	        
	        return LogSourcePresenter;

	        
});