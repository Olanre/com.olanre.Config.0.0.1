define(["dojo/_base/declare", "../models/apiModel", "dojo/Deferred",  "dojo/Evented" ], function (declare, model, Deferred, Evented) {
	        var UserPresenter = declare([], {
	        	user: null,
	        	userAPI : null,
	        	constructor: function(){
	        		this.users =  [];   	
	        		this.userAPI = new model("users").apiStore;
	        	},
	           
	            getUsers: function () {
	            	var self = this;
	            	var deferred = new Deferred(function(reason){
  				      debugger
  				      console.log("Cancelled deferred with the reason" + reason)
	            	});
	                self.userAPI.query({}).then(function(users){
	                	self.users = users;
	                	deferred.resolve(self.users);
	                	
	                }, function(err){
        			    // Do something when the request errors out
        				console.log(err);
        				deferred.cancel(err);
        				debugger
        			});
	                return deferred.promise;
	            },
	           
	        });

	        return UserPresenter;
});