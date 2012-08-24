Ext.define("connecting-lights-mobile.view.AboutContainer", {
    extend: 'Ext.Container',
    xtype: 'Aboutcontainer',
    requires: [
        'Ext.Img'
    ],
    config: {
        title: 'About',
        iconCls: 'info',

        styleHtmlContent: false,
        scrollable: {
            direction: 'horizontal',
            directionLock: true
        },
        layout: {
            type: 'vbox',
            align: 'stretch'
        },

        items:[
            {
                docked: 'top',
                xtype: 'titlebar',
                title: 'Connect the Lights'
            },
            {
                xtype: 'container',
                html: [
                    '<img src="resources/images/about.png"></img>'
                ].join('')
            }
        ]
    }
});