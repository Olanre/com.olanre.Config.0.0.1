define(["dojo/_base/declare", "../models/apiModel", "dojo/Deferred",  "dojo/Evented" ], function (declare, model, Deferred, Evented) {
	        var NetworkPresenter = declare([], {
	        	networks: null,    	
	            networkAPI : null,
	            
	            constructor: function(){
	        		this.networks =  [];   	
	        		this.networkAPI = new model("networks").apiStore;
	        	},
	        	
	           
	            getNetworks: function () {
	            	var self = this;
	            	var deferred = new Deferred(function(reason){
  				      debugger
  				      console.log("Cancelled deferred with the reason" + reason)
	            	});
	                self.networkAPI.query({}).then(function(networks){
	                	self.networks = networks;
	                	deferred.resolve(self.networks);
	                	
	                }, function(err){
        			    // Do something when the request errors out
        				deferred.cancel(err);
        				debugger
        			});
	                return deferred.promise;
	            },
	           
	        });

	        return NetworkPresenter;
});