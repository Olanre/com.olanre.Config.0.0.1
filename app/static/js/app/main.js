define([
        "dojo/dom", "./views/ConfigListView", "./router", "./Util/Util", "dojo/domReady!"],
    function (dom, ConfigListView, router, util) {
        var parentNode = dom.byId("viewContainer");
        var views =  {
    		'/': ConfigListView,
    		//'/Logsources' : LogSourceView,
    		//'/Users': UserView,
    		//'/Apps': AppView,
    		//'/Networks': NetworkView,
    		//'/Offenses': OffenseView,
    		//'/ReferenceSets': ReferenceSetView,
    		//'/CustomProperties': CustomPropertyView,
    		//Hosts': HostView,
        };
        
        createRoutes(parentNode, router, views );
        
        router.startup();

        function createAndAppendDiv(parent) {
        	
            var div = document.createElement("div");
            if(parent !== null){
            	parent.appendChild(div);
            }
            return div;
        }
        
        function createRoutes(parentNode, router, views ){
        	for(key in views){
        		if(views.hasOwnProperty(key)){
        			var View = new views[key](null, createAndAppendDiv(parentNode));
        			router.registerView(key, View);
        		}
        	}
        }
    }
);