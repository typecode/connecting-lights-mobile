Ext.define("connecting-lights-mobile.view.Main", {
    extend: 'Ext.tab.Panel',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top'
                },

                html: [
                    '<div>',
                    '<p><strong>Connecting Light</strong> is a digital art installation along Hadrian’s Wall World Heritage Site. The installation consists of hundreds of large-scale, light-filled balloons transmitting colors from one-to-another, creating a communication network spanning over seventy miles.</p>',
                    '<p>The installation is open to the public from Friday, August 31st to Saturday, September 1st.</p>',
                    '<p>View the full site <a href="http://connectinglights.com">here</a>.</p>',
                    '</div>'
                ].join('')
            },

            {
                title: 'Submit',
                iconCls: 'action',
                xtype: 'formpanel',
                layout: 'vbox',

                items: [
                    {
                        xtype: 'label',
                        html: [
                            '<div>',
                            '<p>Enter a message to send to the wall!</p>',
                            '</div>'
                        ].join('')
                    },
                    {
                        xtype:'fieldset',
                        items:[
                            {
                                xtype: 'textareafield',
                                label: 'Message'
                            }
                        ]
                        
                    },
                    {
                        xtype: 'button',
                        text: 'Send Message',
                        ui: 'confirm',
                        handler: function() {
                            this.up('formpanel').submit();
                        }
                    }
                ]
            },

            {
                title: 'Vizualize',
                iconCls: 'maps',

                items: [
                    {
                        docked: 'top'
                    }
                ]
            }
        ]
    }
});
