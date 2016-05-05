define(["bootstrap/Modal", "dojo/query","dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin",
        "./widgets/LogSourceWidget", "./widgets/UserWidget",
        "./widgets/AppWidget", "./widgets/NetworkWidget", "./widgets/OffenseWidget", 
        "./widgets/ReferenceWidget", "./widgets/ServerWidget","./widgets/RegexWidget" ,
     "dojo/text!./_templates/ConfigListView.html", "dijit/Dialog"],
    function (Modal, query, declare, _WidgetBase, _TemplatedMixin,  LogSourceWidget, UserWidget, AppWidget, NetworkWidget,
    		OffenseWidget, ReferenceSetWidget, HostWidget, CustomPropertyWidget,  template) {

        var ConfigListView = declare([_WidgetBase, _TemplatedMixin], {
            templateString: template,
 
            widgets: [],
            widgetView: null,
            constructor : function(){
            	
            	this.widgets =  {
            		'Logsources' : LogSourceWidget,
            		'Users': UserWidget,
            		'Apps': AppWidget,
            		'Networks': NetworkWidget,
            		'Offenses': OffenseWidget,
            		'ReferenceSets': ReferenceSetWidget,
            		'CustomProperties': CustomPropertyWidget,
            		'Hosts': HostWidget,
                };
            },
            
            makeWidget: function(wig){
            	console.log(wig);
        		if(this.widgets.hasOwnProperty(wig) ){
        			this.widgetView = new this.widgets[wig]({});
        			this.bodyNode.innerHTML = '';
        			this.widgetView.placeAt(this.bodyNode);
        			query("#exportModal").modal('show');
        		}
            },
            
            
            makeLogSourceWidget: function(){
            	console.log(this);
            	this.makeWidget('Logsources');
            },
            
            makeUserWidget: function(){
            	this.makeWidget('Users');
            },
            
            makeAppWidget: function(){
            	this.makeWidget('Apps');
            },
            
            makeNetworkWidget: function(){
            	this.makeWidget('Networks');
            },
            
            makeOffenseWidget: function(){
            	this.makeWidget('Offenses');
            },
            
            makeReferenceSetWidget: function(){
            	this.makeWidget('ReferenceSets');
            },
            
            makeCustomPropertyWidget: function(){
            	this.makeWidget('CustomProperties');
            },
            
            makeHostWidget: function(){
            	this.makeWidget('Hosts');
            },  
             
        });

        return ConfigListView;
    }
);