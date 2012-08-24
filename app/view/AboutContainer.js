Ext.define("connecting-lights-mobile.view.AboutContainer", {
    extend: 'Ext.Container',
    xtype: 'Aboutcontainer',
    requires: [
        'Ext.Img'
    ],
    config: {
        title: 'About',
        iconCls: 'info',
        layout: {
            type: 'hbox',
            align: 'middle',
            maxHeight: '100%'
        },
        styleHtmlContent: false,
        scrollable: {
            direction: 'horizontal',
            directionLock: true
        },
        style: 'background-color: white',
        items:[
            {
                html: '<img src="../resources/images/about.png" />',
                resizable: true,
                autoHeight: true,
                maxHeight: '100%'
            }
        ],
        listeners:{
            activate: function(){
                console.log(this.element.dom.outerHeight);
            }
        }
    }
});