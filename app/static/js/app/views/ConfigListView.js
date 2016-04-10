define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin",
    "dojo/router", "dojo/text!./_templates/ConfigListView.html"],
    function (declare, _WidgetBase, _TemplatedMixin, router, template) {

        var ConfigListView = declare([_WidgetBase, _TemplatedMixin], {
            templateString: template,

            postCreate: function () {
                var self = this;
                
            },
            
            goToSensors: function(){
            	console.log("Redirect to sensor devices here");
            	router.go("/Logsources");
            },
            
            goToUsers: function(){
            	console.log("Redirect to users here");
            	router.go("/Users");
            },
            
            goToOffenses: function(){
            	console.log("Redirect to offenses here");
            	router.go("/Offenses");
            },
            
            goToReferenceSets: function(){
            	console.log("Redirect to reference sets here");
            	router.go("/ReferenceSets");
            },
            
            goToCEP: function(){
            	console.log("Redirect to custom event properties here");
            	router.go("/CustomProperties");
            },
            
            goToNetworks: function(){
            	console.log("Redirect to networks here");
            	router.go("/Networks");
            },
            
            goToHosts: function(){
            	console.log("Redirect to server hosts here");
            	router.go("/Hosts");
            },
            
            goToApps: function(){
            	console.log("Redirect to application extensions here");
            	router.go("/Apps");
            },
            
            
        });

        return ConfigListView;
    }
);