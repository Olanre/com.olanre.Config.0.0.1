define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin",
        "./widgets/LogSourceWidget", "./widgets/UserWidget",
        "./widgets/AppWidget", "./widgets/NetworkWidget", "./widgets/OffenseWidget", 
        "./widgets/ReferenceWidget", "./widgets/ServerWidget","./widgets/RegexWidget" ,
    "dojo/router", "dojo/text!./_templates/ConfigListView.html"],
    function (declare, _WidgetBase, _TemplatedMixin,  LogSourceView, UserView, AppView, NetworkView,
    		OffenseView, ReferenceSetView, HostView, CustomPropertyView, router, template) {

        var ConfigListView = declare([_WidgetBase, _TemplatedMixin], {
            templateString: template,

            postCreate: function () {
                var self = this;
                
            },
            
            widgets: [],
            widgetView: null,
            
            constructor : function(){
            	
            	this.widgets =  {
            		'/Logsources' : LogSourceView,
            		'/Users': UserView,
            		'/Apps': AppView,
            		'/Networks': NetworkView,
            		'/Offenses': OffenseView,
            		'/ReferenceSets': ReferenceSetView,
            		'/CustomProperties': CustomPropertyView,
            		'/Hosts': HostView,
                };
            },
            
            makeWidget: function(wig){
        		if(this.widgets.hasOwnProperty(wig) ){
        			var Widget = new widgets[key]({});
        			this.widgetView = Widget;
        			this.WidgetView.placeAt(this.bodyNode);
        			dom.byId("exportModal").modal('show')
        		}
            },
            
        });

        return ConfigListView;
    }
);