define(["dojo/_base/declare", "../models/apiModel", "dojo/Deferred",  "dojo/Evented", "../Util/Util" ],
		function (declare, model, Deferred, Evented, util) {
	        var AppPresenter = declare([], {
	            apps: null,
	        	appAPI : null,
	        	constructor: function(){
	        		this.apps =  [];   	
	        		this.appAPI = new model("apps").apiStore
	        	},
	           parse_apps: function(){
	        	   var self = this;
	        	   for(var i = 0; i < self.apps.length; i ++){
	        		   var item = self.apps[i];
         
    					item.id = item['application_state']['id'];
    					item.status = item['application_state']['status'];
    					item.error_message = item['application_state']['error_message'];
    					item.docker_port = item['manifest']['docker_port'];
    					item.description = item['manifest']['description'];
    					item.name = item['manifest']['name'];
    					item.capabilities = item['manifest']['areas'][0]['required_capabilities'].join(" ");

    					delete item.application_state;
    					delete item.manifest;
    							
            			self.apps[i] = item;
            			
            			console.log("In the loop for idex :" + i + " \n" + item);
	        	   }
	            },
					           
	            getApps: function () {
	            	var self = this;
	            	var deferred = new Deferred(function(reason){
  				      debugger
  				      console.log("Cancelled deferred with the reason" + reason)
	            	});
	                self.appAPI.query({}).then(function(apps){
	                	self.apps = apps;
	                	self.parse_apps();
	                	return deferred.resolve(self.apps);
	                	
	                }, function(err){
        			    // Do something when the request errors out
        				deferred.cancel(err);
        				debugger
        			});
	                return deferred.promise;
	            },
	           
	        });

	        return AppPresenter;
});