define(["dojo/_base/declare", "../models/apiModel", "dojo/Deferred",  "dojo/Evented", "../Util/Util" ], 
	function (declare, model, Deferred, Evented, util) {
		var factory = new util();    
		var ReferencePresenter = declare([], {
	        	ref_sets: [],    	
	            referenceAPI : {},
	            
	            constructor: function(){
	            	this.ref_sets = [];
	            	this.referenceAPI = new model("ref_set").apiStore;
	            }, 
	            
	           parse_ref: function(){
	        	   var self = this;
	        	   var deferred = new Deferred(function(reason){
 				      debugger
 				      console.log("Cancelled deferred with the reason" + reason)
	        	   });
	        	   for( var i = 0; i< self.ref_sets.length; i++){    			
	        		   (function(item, i){
	            			var name = '/' + item.name;	
	        				self.referenceAPI.query(name).then(function(data){
	        					//console.log(data);
	            				item = data;
	            				item.creation_time= factory.timeConverter(item.creation_time);
	            				 if(item.number_of_elements > 0){
		            				for(var j= 0; j < item.data.length; j++){
		                				item.data[j].last_seen = factory.timeConverter(item.data[j].last_seen);
		                				item.data[j].first_seen = factory.timeConverter(item.data[j].first_seen);
		                			}
	            				}
		            			self.ref_sets[i] = item;
		            			
		            			if((self.ref_sets.length - 1) == i) return deferred.resolve(self.ref_sets);          				
	            				
	            			}, function(err){
	            			    // Do something when the process errors out
	            				deferred.cancel(err);
	            				debugger
	            			});
    				
        				})(self.ref_sets[i], i);
	        	   }
	        	   return deferred.promise;
	            },
					           
	            getReferences: function () {
	            	var self = this;
	            	var deferred = new Deferred(function(reason){
  				      debugger
  				      console.log("Cancelled deferred with the reason" + reason)
	            	});
	                self.referenceAPI.query({}).then(function(refs){
	                	self.ref_sets = refs;
	                	self.parse_ref().then(function(ref_sets){
	                		return deferred.resolve(ref_sets);
	                	});	                	
	                }, function(err){
        			    // Do something when the request errors out
        				deferred.cancel(err);
        				debugger
        			});
	                return deferred.promise;
	            },
	           
	        });

	        return ReferencePresenter;
});