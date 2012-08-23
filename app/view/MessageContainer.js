Ext.define("connecting-lights-mobile.view.MessageContainer", {
    extend: 'Ext.Container',
    xtype: 'messagecontainer',
    requires: [
        'Ext.TitleBar',
        'Ext.form.FieldSet',
        'Ext.field.TextArea',
        'connecting-lights-mobile.view.GeolocationMap',
        'connecting-lights-mobile.model.Message'
    ],
    config: {
        title: 'Contribute',
        iconCls: 'action',
        layout: 'card',
        defaults:{
            flex: 1
        },

        listeners: {
            activate: function(){
                this.setActiveItem(0);
                this.message = Ext.create('connecting-lights-mobile.model.Message', {

                });
            },
            deactivate: function(){

            }
        },

        items: [

            {
                itemId: 'message',
                xtype: 'container',
                layout: 'fit',
                items:[
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Write a Message'
                    },
                    {
                        xtype:'fieldset',
                        items:[
                            {
                                xtype: 'textareafield'
                            }
                        ]
                        
                    },
                    {
                        xtype: 'button',
                        text: 'Choose Color',
                        ui: 'next',
                        docked:'bottom',
                        handler: function() {
                            this.up('messagecontainer').animateActiveItem(this.up('messagecontainer').getComponent('color'), {type: 'slide', direction: 'left'});
                        }
                    }
                ],
                listeners: {
                    activate: function(){

                    },
                    deactivate: function(){
                        this.up('messagecontainer').message.message = this.up('messagecontainer').down('textareafield').getValue();
                    }
                }
            },

            {
                itemId: 'color',
                xtype: 'container',
                layout: 'fit',
                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Color your Message',
                        items:[
                            {
                                xtype: 'button',
                                ui: 'back',
                                text: 'Back',
                                handler: function() {
                                    this.up('messagecontainer').animateActiveItem(this.up('messagecontainer').getComponent('message'), {type: 'slide', direction: 'right'});
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        styleHtmlContent: true,
                        html: [
                            '<div id="color-picker" class="color-picker">',
                            '<div class="handle"></div>',
                            '<canvas></canvas>',
                            '</div>'
                        ].join('')
                    },
                    {
                        xtype: 'button',
                        text: 'Select a Location',
                        ui: 'next',
                        docked:'bottom',
                        handler: function() {
                            this.up('messagecontainer').animateActiveItem(this.up('messagecontainer').getComponent('map'), {type: 'slide', direction: 'left'});
                        }
                    }
                ],
                listeners: {
                    activate: function() {
                        var me;
                        me = this;
                        if(!this.color_picker){
                            this.color_picker = new ColorPicker({
                                $e: $('#color-picker'),
                                src: 'resources/images/color-picker-HD.png'
                            });
                            this.color_picker.$e.bind('color:picked', function(e, d){
                                me.up('messagecontainer').message.r = d.r;
                                me.up('messagecontainer').message.g = d.g;
                                me.up('messagecontainer').message.b = d.b;
                            });
                        }
                    }
                }
            },

            {
                itemId: 'map',
                xtype: 'container',
                layout: 'fit',
                items:[
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Choose a Location',
                        items:[
                            {
                                xtype: 'button',
                                ui: 'back',
                                text: 'Back',
                                handler: function() {
                                    this.up('messagecontainer').animateActiveItem(this.up('messagecontainer').getComponent('color'), {type: 'slide', direction: 'right'});
                                }
                            }
                        ]
                    },
                    Ext.create('connecting-lights-mobile.view.GeolocationMap'),
                    {
                        xtype: 'button',
                        text: 'Send your message!',
                        ui: 'confirm',
                        docked:'bottom',
                        handler: function() {
                            this.up('messagecontainer').animateActiveItem(this.up('messagecontainer').getComponent('thanks'), {type: 'slide', direction: 'left'});
                        }
                    }
                ],
                listeners: {
                    activate: function(){
                        this.down('geolocationmap').recenter();
                    },
                    deactivate: function(){
                        var my_geo;
                        my_geo = this.down('geolocationmap').get_position();
                        //this.up('messagecontainer').message.lat = my_geo._latitude;
                        //this.up('messagecontainer').message.lng = my_geo._longitude;
                    }
                }
            },


            {  //3
                itemId: 'thanks',
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
                        styleHtmlContent: true,
                        html: [
                            '<p>Thanks!</p>'
                        ].join('')
                    }
                ],
                listeners: {
                    activate: function(){
                        this.up('messagecontainer').message.save();
                    },
                    deactivate: function(){

                    }
                }
            }
        ]
    }
    
});
