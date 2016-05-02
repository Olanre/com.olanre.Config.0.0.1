define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin",
        "./widgets/LogSourceWidget", "./widgets/UserWidget",
        "./widgets/AppWidget", "./widgets/NetworkWidget", "./widgets/OffenseWidget", 
        "./widgets/ReferenceWidget", "./widgets/ServerWidget","./widgets/RegexWidget" ,
    "dojo/router", "dojo/text!./_templates/ConfigListView.html"],
    function (declare, _WidgetBase, _TemplatedMixin,  LogSourceWidget, UserWidget, AppWidget, NetworkWidget,
    		OffenseWidget, ReferenceSetWidget, HostWidget, CustomPropertyWidget, router, template) {

        var ConfigListView = declare([_WidgetBase, _TemplatedMixin], {
            templateString: template,

            
            widgets: [],
            widgetView: null,
            
            postCreate : function(){
            	
            	this.widgets =  {
            		'/Logsources' : LogSourceWidget,
            		'/Users': UserWidget,
            		'/Apps': AppWidget,
            		'/Networks': NetworkWidget,
            		'/Offenses': OffenseWidget,
            		'/ReferenceSets': ReferenceSetWidget,
            		'/CustomProperties': CustomPropertyWidget,
            		'/Hosts': HostWidget,
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