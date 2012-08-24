var MESSAGE_PROMPTS, active_prompt;

MESSAGE_PROMPTS = [
    "Cities I have been to:   ",
    "People I'm connected to:   ",
    "Borders I've crossed:   ",
    "Things that feel like home:   ",
    "",
    "I feel connected to:   ",
    "I communicate via:   ",
    "Places I've lived:   ",
    ""
];

active_prompt = this.active_prompt = Math.floor(Math.random() * MESSAGE_PROMPTS.length);

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
                        title: 'Write a Message',
                        items:[
                            {
                                xtype: 'button',
                                ui:'normal',
                                iconCls:'refresh',
                                iconMask: true,
                                handler: function() {
                                    active_prompt++;
                                    if(active_prompt >= MESSAGE_PROMPTS.length){
                                        active_prompt = 0;
                                    }
                                    this.up('messagecontainer').down('textareafield').setValue(MESSAGE_PROMPTS[active_prompt]);
                                    this.up('messagecontainer').down('textareafield').focus();
                                },
                                align: 'right'
                            }
                        ]
                    },
                    {
                        xtype:'container',
                        layout:'fit',
                        items:[
                            {
                                xtype: 'textareafield',
                                rows:10
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
                        this.up('messagecontainer').down('textareafield').setValue(MESSAGE_PROMPTS[active_prompt]);
                        this.up('messagecontainer').down('textareafield').focus();
                    },
                    deactivate: function(){
                        this.up('messagecontainer').message.set('message', this.up('messagecontainer').down('textareafield').getValue());
                    }
                }
            },

            {
                itemId: 'color',
                xtype: 'container',
                layout: 'fit',
                cls:'transition-background',
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
                                me.element.dom.style.background = 'rgb('+d.r+', '+d.g+', '+d.b+')';
                                me.up('messagecontainer').message.set('r', d.r);
                                me.up('messagecontainer').message.set('g', d.g);
                                me.up('messagecontainer').message.set('b', d.b);
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
                        this.up('messagecontainer').message.set('lat', my_geo[0]);
                        this.up('messagecontainer').message.set('lng', my_geo[1]);
                    }
                }
            },


            {  //3
                itemId: 'thanks',
                xtype: 'container',
                layout: 'vbox',
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
                    },
                    {
                        itemId:'saved_object',
                        xtype: 'container',
                        styleHtmlContent: true,
                        html: [
                            '<p>Thanks!</p>'
                        ].join('')
                    }
                ],
                listeners: {
                    activate: function(){
                        this.getComponent('saved_object').setHtml(Ext.JSON.encode(this.up('messagecontainer').message.getData()));
                    },
                    deactivate: function(){

                    }
                }
            }
        ]
    }
    
});
