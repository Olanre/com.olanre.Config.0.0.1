define(["dojo/_base/declare", "dijit/_WidgetBase",
    "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
    "app/presenters/AppPresenter", "dojo/router",
    "dojo/text!./_templates/AppView.html", "dojo/Deferred",],
    function (declare, _WidgetBase,
        _TemplatedMixin, _WidgetsInTemplateMixin,
        presenter, router,
        template, deferred) {

        var AppView = declare([_WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin], {
                templateString: template,

                store: null,

                postCreate: function() {
                	var self = this;
                    self.store = new presenter();
                    self.store.getApps().then(function(apps){
                    	self.apps.innerHTML = JSON.stringify(apps);
                    });
                },
                
                goToConfigList: function(){
                	console.log("Redirect to main listing here");
                	router.go("/");
                },               
            });

        return AppView;
    }
);