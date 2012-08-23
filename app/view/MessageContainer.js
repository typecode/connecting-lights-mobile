var geolocation_map = Ext.create('connecting-lights-mobile.view.GeolocationMap');

Ext.define("connecting-lights-mobile.view.MessageContainer", {
    extend: 'Ext.Container',
    xtype: 'messagecontainer',
    config: {
        title: 'Message',
        iconCls: 'action',
        layout: 'card',
        defaults:{
            flex: 1
        },

        listeners: {
            deactivate: function(){
                this.setActiveItem(0);
            }
        },

        items: [

            {  //0
                xtype: 'container',
                layout: 'fit',
                items:[
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Location',
                        items:[

                        ]
                    },
                    geolocation_map,
                    {
                        xtype: 'button',
                        text: 'Enter Message',
                        height:'10%',
                        ui: 'next',
                        docked:'bottom',
                        handler: function() {
                            message_container.animateActiveItem(1, {type: 'slide', direction: 'left'});
                        }
                    }
                ]
            },

            {  //1
                xtype: 'container',
                layout: 'fit',
                items:[
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Message',
                        items:[
                            {
                                xtype: 'button',
                                ui: 'back',
                                text: 'Back',
                                handler: function() {
                                    message_container.animateActiveItem(0, {type: 'slide', direction: 'right'});
                                }
                            }
                        ]
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
                        text: 'Choose Color',
                        ui: 'next',
                        docked:'bottom',
                        handler: function() {
                            message_container.animateActiveItem(2, {type: 'slide', direction: 'left'});
                        }
                    }
                ]
            },

            {  //2
                xtype: 'container',
                layout: 'fit',
                listeners: {
                    activate: function() {
                        var me;
                        me = this;
                        this.color_picker = new ColorPicker({
                            $e: $('#color-picker'),
                            src: 'resources/images/color-picker-HD.png'
                        });
                        this.color_picker.$e.bind('color:picked', function(){
                            //console.log(me.element.up('.x-container', 3));
                            me.element.up('.x-container',3).dom.style.backgroundColor = 'rgba(0,0,0,1)';
                            
                        });
                    }
                },
                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Color',
                        items:[
                            {
                                xtype: 'button',
                                ui: 'back',
                                text: 'Back',
                                handler: function() {
                                    message_container.animateActiveItem(1, {type: 'slide', direction: 'right'});
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        html: [
                            '<div id="color-picker" class="color-picker">',
                            '<div class="handle"></div>',
                            '<canvas></canvas>',
                            '</div>'
                        ].join('')
                    },
                    {
                        xtype: 'button',
                        text: 'Send Message',
                        ui: 'confirm',
                        docked:'bottom',
                        handler: function() {
                            message_container.animateActiveItem(3, {type: 'slide', direction: 'left'});
                        }
                    }
                ]
            },


            {  //3
                xtype: 'container',
                layout: 'fit',
                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Thanks!'
                    },
                    {
                        xtype: 'container',
                        html: [
                            '<p>Thanks!</p>'
                        ].join('')
                    }
                ]
            }
        ]
    }
    
});
