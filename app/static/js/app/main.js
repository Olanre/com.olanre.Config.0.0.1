define([
        "dojo/dom", "./views/ConfigListView", "./router", "./Util/Util", "dojo/domReady!"],
    function (dom, ConfigListView, router, util) {
        var parentNode = dom.byId("viewContainer");
        
        var ListView = new ConfigListView(null, createAndAppendDiv(parentNode));
        router.registerView("/", ListView);

        
        router.startup();

        function createAndAppendDiv(parent) {
        	
            var div = document.createElement("div");
            if(parent !== null){
            	parent.appendChild(div);
            }
            return div;
        }
        
    }
);