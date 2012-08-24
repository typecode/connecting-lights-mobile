Ext.define("connecting-lights-mobile.view.WelcomeContainer", {
    extend: 'Ext.Container',
    xtype: 'welcomecontainer',
    requires: [
        'Ext.Img'
    ],
    config: {
        title: 'Welcome',
        iconCls: 'home',

        styleHtmlContent: true,
        scrollable: true,

        layout: 'vbox',

        items:[
        /*
            {
                xtype:'image',
                src: 'resources/images/logo.png',
                //flex: 1,
                height: '35px'
            },
            {
                xtype:'image',
                src: 'resources/images/wall.jpeg',
                //flex: 1,
                height: '200px'
            },
        */
            {
                xtype: 'container',
                html: [
                    '<div class="welcome">',
                    '   <h1><img src="resources/images/logo.png"></img></h1>',
                    '   <p><img src="resources/images/wall.jpeg"></img></p>',
                    '   <div class="padding">',
                    '     <p><strong>Connecting Light</strong> is a digital art installation along Hadrian’s Wall World Heritage Site. The installation consists of hundreds of large-scale, light-filled balloons transmitting colors from one-to-another, creating a communication network spanning over seventy miles.</p>',
                    '    <p>The installation is open to the public from Friday, August 31st to Saturday, September 1st.</p>',
                    '    <p>View the full site <a href="http://connectinglights.com">here</a>.</p>',
                    '   </div>',
                    '</div>'
                ].join('')
            }
        ]
    }
});