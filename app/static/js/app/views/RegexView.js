define(["dojo/_base/declare", "dijit/_WidgetBase",
    "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
    "app/presenters/RegexPresenter", "dojo/router",
    "dojo/text!./_templates/RegexView.html", "dojo/Deferred",],
    function (declare, _WidgetBase,
        _TemplatedMixin, _WidgetsInTemplateMixin,
        presenter, router,
        template, deferred) {

        var RegexView = declare([_WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin], {
                templateString: template,

                store: null,

                postCreate: function() {
                	var self = this;
                    self.store = new presenter();
                    self.store.getAll().then(function(regexes){
                    	self.regexes.innerHTML = JSON.stringify(regexes);
                    });
                },
                
                goToConfigList: function(){
                	console.log("Redirect to main listing here");
                	router.go("/");
                },

            });

        return RegexView;
    }
);