define(["dojo/_base/declare", "dijit/_WidgetBase",
    "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
    "app/presenters/NetworkPresenter", "dojo/router",
    "dojo/text!./_templates/NetworkView.html", "dojo/Deferred",],
    function (declare, _WidgetBase,
        _TemplatedMixin, _WidgetsInTemplateMixin,
        presenter, router,
        template, deferred) {

        var NetworkView = declare([_WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin], {
                templateString: template,

                store: null,

                postCreate: function() {
                	var self = this;
                    self.store = new presenter();
                    self.store.getNetworks().then(function(networks){
                    	self.networks.innerHTML = JSON.stringify(networks);
                    });
                },
                
                goToConfigList: function(){
                	console.log("Redirect to main listing here");
                	router.go("/");
                },
                
            });

        return NetworkView;
    }
);