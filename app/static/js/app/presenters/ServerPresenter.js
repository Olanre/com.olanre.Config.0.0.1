define(["dojo/_base/declare", "../models/apiModel", "dojo/Deferred",  "dojo/Evented" ], function (declare, model, Deferred, Evented) {
	        var HostPresenter = declare([], {
	        	hosts: null,    	
	            hostAPI : {},
	            components: null,
	            componentsAPI : {},

	            constructor: function(){
	            	this.hostAPI = new model("servers").apiStore;
	            	this.hosts = [];
	            	
	            	this.componentAPI = new model('components').apiStore;
	            	this.components = [];
	            },
	           
	           parse_hosts: function(){
	        	   var self = this;
	        	   for(var i =0; i< self.hosts.length; i++){          			
	        		   var item = self.hosts[i];
	        			   
    					item.maxPortValue = item.properties.maxPortValue;
    					item.minPortValue = item.properties.minPortValue;
    					item.portExclusionList = item.properties.portExclusionList;
    					delete item.properties;
    					delete item.category;
    					for(var j = 0; j < item.components; j++){
    						var id = item.components[j];
    						item.components[j] = self.componentAPI.get(id).instance_name;
    					}
    					item.components = item.components.toString();
    					
    					var primary_host = item.servers_hosts.filter(function(server_host){
	            			return item.primary_host_id == server_host.id;
	            		});
        				if( primary_host !== null  &&  primary_host.length > 0){
        					item.primary_host = primary_host[0];
        					delete item.primary_host_id;
        				}else{
        					item.primary_host = "";
        				}
    		   
		    		   var secondary_host = item.servers_hosts.filter(function(server_host){
		        			return item.secondary_host_id == server_host.id;
		        		});
						if(secondary_host !== null  &&  secondary_host.length > 0){
							item.secondary_host = secondary_host[0];
							delete item.secondary_host_id;
						}else{
							item.secondary_host = "";
						}
        						            			
            			self.hosts[i] = item;
	        	   }
	            },
	            
	            getComponents: function(){
	            	var self = this;
	            	var deferred = new Deferred(function(reason){
  				      debugger
  				      console.log("Cancelled deferred with the reason" + reason)
	            	});
	                self.componentAPI.query({}).then(function(components){
	                	self.components = components;
	                	return deferred.resolve();
	                	
	                }, function(err){
        			    // Do something when the request errors out
        				deferred.cancel(err);
        				debugger
        			});
	                return deferred.promise;
	            },
					           
	            getServers: function () {
	            	var self = this;
	            	var deferred = new Deferred(function(reason){
  				      debugger
  				      console.log("Cancelled deferred with the reason" + reason)
	            	});
	                self.hostAPI.query({}).then(function(hosts){
	                	self.hosts = hosts;
	                	self.getComponents().then(function(){
	                		self.parse_hosts();
		                	return deferred.resolve(self.hosts);
	                	}, function(err){
	        			    // Do something when the request errors out
	        				deferred.cancel(err);
	        				debugger
	        			});	                	
	                	
	                }, function(err){
        			    // Do something when the request errors out
        				deferred.cancel(err);
        				debugger
        			});
	                return deferred.promise;
	            },
	            
	           
	        });

	        return HostPresenter;
});