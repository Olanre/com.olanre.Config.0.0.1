define(["dojo/_base/declare", "dijit/_WidgetBase",
    "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
    "app/presenters/ServerPresenter", "dojo/router",
    "dojo/text!./_templates/ServerView.html", "dojo/Deferred",],
    function (declare, _WidgetBase,
        _TemplatedMixin, _WidgetsInTemplateMixin,
        presenter, router,
        template, deferred) {

        var ServerView = declare([_WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin], {
                templateString: template,

                store: null,

                postCreate: function() {
                	var self = this;
                    self.store = new presenter();
                    self.store.getServers().then(function(hosts){
                    	self.hosts.innerHTML = JSON.stringify(hosts);
                    });
                },
                
                goToConfigList: function(){
                	console.log("Redirect to main listing here");
                	router.go("/");
                },

            });

        return ServerView;
    }
);