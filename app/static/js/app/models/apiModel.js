define(["dojo/_base/declare", "dojo/store/JsonRest", "dojo/store/Memory", "dojo/store/Cache", "dojo/store/Observable", "../Util/Util"],
	function(declare, JsonRest, Memory, Cache, Observable, util){
		factory = new util();
	    var AppModel =  declare([], {
	    	
	    	sessionCookie : factory.getCookie("QRadarCSRF"),
	    	constructor: function(type){
		    	this.type = type;
				this.masterStore = new JsonRest({
						target: factory.getEndpoints(this.type),
						headers: {"Accept": "application/json", "Allow-Hidden": "true", "QRadarCSRF": this.sessionCookie, "Version": "5.1"}
				});
				
				this.masterStore = new Observable(this.masterStore);
				this.cacheStore = new Memory({});
				this.apiStore = new Cache(this.masterStore, this.cacheStore);
	    	}
	    });
	    
	    return AppModel;
      
    
	});