define(["dojo/_base/declare", "dijit/_WidgetBase",
    "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
    "app/presenters/ReferencePresenter", "dojo/router",
    "dojo/text!./_templates/ReferenceView.html", "dojo/Deferred",],
    function (declare, _WidgetBase,
        _TemplatedMixin, _WidgetsInTemplateMixin,
        presenter, router,
        template, deferred) {

        var ReferenceView = declare([_WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin], {
                templateString: template,

                store: null,

                postCreate: function() {
                	var self = this;
                    self.store = new presenter();
                    self.store.getReferences().then(function(ref_sets){
                    	self.ref_sets.innerHTML = JSON.stringify(ref_sets);
                    });
                },
                
                goToConfigList: function(){
                	console.log("Redirect to main listing here");
                	router.go("/");
                },

            });

        return ReferenceView;
    }
);