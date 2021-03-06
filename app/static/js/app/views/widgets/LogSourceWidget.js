﻿define(["dojo/_base/declare", "dijit/_WidgetBase",
    "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
    "app/presenters/LogSourcePresenter", "dojo/router",
    "dojo/text!./_templates/LogSourceView.html", "dojo/Deferred",],
    function (declare, _WidgetBase,
        _TemplatedMixin, _WidgetsInTemplateMixin,
        LogSourcePresenter, router,
        template, deferred) {

        var LogSourceView = declare([_WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin], {
                templateString: template,

                store: null,
                
                constructor: function(){
                	this.store = new LogSourcePresenter();
                },

                postCreate: function() {
                	var self = this;
                    this.store.getAll\().then(function(result){
                    	self.keys.innerHTML =  JSON.stringify(result.keys);
                    	//self.sensors.innerHTML = JSON.stringify(result.sensors);
                    	//self.types.innerHTML = JSON.stringify(result.types);
                    	//self.groups.innerHTML = JSON.stringify(result.groups);
                    });
                },
                
                goToConfigList: function(){
                	console.log("Redirect to main listing here");
                	router.go("/");
                },

                
            });

        return LogSourceView;
 });