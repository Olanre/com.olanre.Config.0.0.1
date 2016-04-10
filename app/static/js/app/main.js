define([
        "dojo/dom", "./views/ConfigListView", "./views/LogSourceView", "./views/UserView",
        "./views/AppView", "./views/NetworkView", "./views/OffenseView", "./views/ReferenceView",
        "./views/ServerView","./views/RegexView" ,"./router", "../Util/Util", "dojo/domReady!"],
    function (dom, ConfigListView, LogSourceView, UserView, AppView, NetworkView,
    		OffenseView, ReferenceSetView, HostView, CustomPropertyView, router, util) {
        var parentNode = dom.byId("viewContainer");
        var views =  {
    		'/': ConfigListView,
    		'/Logsources' : LogSourceView,
    		'/Users': UserView,
    		'/Apps': AppView,
    		'/Networks': NetworkView,
    		'/Offenses': OffenseView,
    		'/ReferenceSets': ReferenceSetView,
    		'/CustomProperties': CustomPropertyView,
    		'/Hosts': HostView,
        };
        
        /**var ConfigListView = new ConfigListView(null, createAndAppendDiv(parentNode));
        router.registerView("/", ConfigListView);
        
        var LogSourceView = new LogSourceView(null, createAndAppendDiv(parentNode));
        router.registerView("/Logsources", LogSourceView);
        
        var UsersView = new UsersView(null, createAndAppendDiv(parentNode));
        router.registerView("/Users", UsersView);
        
        var AppView = new AppView(null, createAndAppendDiv(parentNode));
        router.registerView("/Apps", AppView);

        var NetworkView = new NetworkView(null, createAndAppendDiv(parentNode));
        router.registerView("/Networks", NetworkView);*/
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
        			router.register(key, views[key]);
        		}
        	}
        }
    }
);