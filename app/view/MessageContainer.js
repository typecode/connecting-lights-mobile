/*
    'Segedunum Fort'  54.98764    -1.532115
    'Vallum Farm & Tea Room'  55.008751   -1.927018
    'The Errington Arms Public House' 55.012558   -2.02156
    'Housesteads Roman Fort'  55.011822   -2.331782
    'Once Brewed Visitor Centre'  54.996319   -2.388512
    'Walltown Quarry' 54.98698    -2.519565
    'Birdoswald Visitor Centre'   54.990021   -2.603127
    'Walby Farm Park Visitor Centre'  54.935692   -2.874963
    'Carlisle Castle Visitor Centre'  54.897182   -2.942473
    'Castle Keep' 54.968742   -1.61038
    'Brocolitia'  55.035591   -2.220269
    'Housesteads' 55.010132   -2.32266
    'Steel Rigg'  55.002991   -2.390963
    'Cawfields'   54.992886   -2.450167
    'Tullie House Viewing Point'  54.895824   -2.940662
    'Burgh by Sands'  54.922157   -3.046147
    'Bowness on Solway'   54.95208    -3.207218
*/

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
        'Ext.form.Panel',
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
                xtype: 'formpanel',
                layout: 'vbox',
                items:[
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Write a Message',
                        items:[

                        ]
                    },
                    {
                        xtype:'fieldset',
                        items:[
                            {
                                xtype: 'textareafield',
                                rows:10,
                                placeHolder:'Input a message!',
                                listeners: {
                                    keyup: function(){
                                        this.up('formpanel').getComponent('actionbar').getComponent('counter-text').setHtml('<p class="context">' + this.getValue().length + '/140</p>');
                                        if(this.getValue().length > 140){
                                            this.setValue(this.last_value);
                                            return;
                                        }
                                        this.last_value = this.getValue();
                                    },
                                    change: function(){
                                        this.up('formpanel').getComponent('actionbar').getComponent('counter-text').setHtml('<p class="context">' + this.getValue().length + '/140</p>');
                                        if(this.getValue().length > 140){
                                            this.setValue(this.last_value);
                                            return;
                                        }
                                        this.last_value = this.getValue();
                                    }
                                }
                            }
                        ]

                    },
                    {
                        itemId:'actionbar',
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                itemId: 'counter-text',
                                xtype: 'container',
                                styleHtmlContent: true,
                                flex:3,
                                html: [
                                    '<p class="context">0/140</p>'
                                ].join('')
                            },
                            {
                                xtype: 'container',
                                flex:6
                            },
                            {
                                xtype: 'button',
                                iconCls:'refresh',
                                iconMask: true,
                                flex:2,
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
                        xtype: 'button',
                        text: 'Choose Color',
                        ui: 'forward',
                        //docked:'bottom',
                        handler: function() {
                            this.up('messagecontainer').animateActiveItem(this.up('messagecontainer').getComponent('color'), {type: 'slide', direction: 'left'});
                        },
                        style: 'margin-top: 20px'
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
                layout: 'vbox',
                //scrollable: false,
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
                        itemId: 'messageText',
                        xtype: 'container',
                        cls:'padding',
                        styleHtmlContent: true
                    },
                    {
                        itemId: 'color-picker-container',
                        xtype: 'container',
                        styleHtmlContent: true,
                        height: '280px',
                        html: [
                            '<div id="color-picker" class="color-picker">',
                            '<div class="handle"></div>',
                            '<canvas></canvas>',
                            '</div>'
                        ].join('')
                    },
                    {
                        xtype: 'container',
                        cls: 'padding',
                        items: [
                            {
                                xtype: 'button',
                                text: 'Select a Location',
                                ui: 'forward',
                                //docked:'bottom',
                                handler: function() {
                                    this.up('messagecontainer').animateActiveItem(this.up('messagecontainer').getComponent('location_select'), {type: 'slide', direction: 'left'});
                                }
                            }
                        ]
                    }
                ],
                listeners: {
                    activate: function() {
                        var me, color_picker_src, color_picker_height;
                        me = this;
                        this.getComponent('messageText').setHtml('<p class="color-msg"><span>&ldquo;</span>' + me.up('messagecontainer').message.get('message') + '</p>');
                        if(!this.color_picker){
                            color_picker_src = 'resources/images/color-picker.png';
                            color_picker_height = '195px';
                            if($(window).height() > 520){
                                $('#color-picker').addClass('hd');
                                color_picker_src = 'resources/images/color-picker-HD.png';
                                color_picker_height = '280px';
                            }
                            this.getComponent('color-picker-container').setHeight(color_picker_height);
                            this.color_picker = new ColorPicker({
                                $e: $('#color-picker'),
                                src: color_picker_src
                            });
                            this.color_picker.$e.bind('color:picked', function(e, d){
                                me.element.dom.style.background = 'rgba('+d.r+', '+d.g+', '+d.b+', 1.0)';
                                me.up('messagecontainer').message.set('red', d.r);
                                me.up('messagecontainer').message.set('green', d.g);
                                me.up('messagecontainer').message.set('blue', d.b);
                            });
                        }
                    }
                }
            },

            {
                itemId: 'location_select',
                xtype: 'formpanel',
                layout: 'vbox',
                items:[
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Select a Location',
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
                    {
                        xtype: 'button',
                        itemId: 'geolocation_button',
                        text: 'Automatically',
                        ui: 'forward',
                        handler: function() {
                            this.up('messagecontainer').animateActiveItem(this.up('messagecontainer').getComponent('location_map_geo'), {type: 'slide', direction: 'left'});
                        },
                        style: 'margin-top: 20px'
                    },
                    {
                        xtype: 'button',
                        text: 'By Viewing Station',
                        ui: 'forward',
                        handler: function() {
                            this.up('messagecontainer').animateActiveItem(this.up('messagecontainer').getComponent('location_viewing'), {type: 'slide', direction: 'left'});
                        },
                        style: 'margin-top: 20px'
                    },
                    {
                        xtype: 'button',
                        text: 'By Location on a Map',
                        ui: 'forward',
                        handler: function() {
                            this.up('messagecontainer').animateActiveItem(this.up('messagecontainer').getComponent('location_map'), {type: 'slide', direction: 'left'});
                        },
                        style: 'margin-top: 20px'
                    }
                ],
                listeners: {
                    activate: function(){

                    },
                    deactivate: function(){

                    }
                }
            },

            {
                itemId: 'location_viewing',
                xtype: 'formpanel',
                scrollable: false,
                layout: 'vbox',
                items:[
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Select a Location',
                        items:[
                            {
                                xtype: 'button',
                                ui: 'back',
                                text: 'Back',
                                handler: function() {
                                    this.up('messagecontainer').animateActiveItem(this.up('messagecontainer').getComponent('location_select'), {type: 'slide', direction: 'right'});
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls:'padding',
                        styleHtmlContent: true,
                        html: ['<p class="">Select a viewing station:</p>'].join('')
                    },
                    {
                        itemId:'locationList',
                        xtype:'list',
                        styleHtmlContent: true,
                        height:'195px',
                        data: [
                            {text: 'Birdoswald Visitor Centre', value: '54.990021 -2.603127'},
                            {text: 'Bowness on Solway', value: '54.95208 -3.207218'},
                            {text: 'Brocolitia', value: '55.035591 -2.220269'},
                            {text: 'Burgh by Sands', value: '54.922157 -3.046147'},
                            {text: 'Carlisle Castle Visitor Centre', value: '54.897182 -2.942473'},
                            {text: 'Castle Keep', value: '54.968742 -1.61038'},
                            {text: 'Cawfields', value: '54.992886 -2.450167'},
                            {text: 'Housesteads', value: '55.010132 -2.32266'},
                            {text: 'Housesteads Roman Fort', value:  '55.011822 -2.331782'},
                            {text: 'Once Brewed Visitor Centre', value: '54.996319 -2.388512'},
                            {text: 'Segedunum Fort', value: '54.98764 -1.532115'},
                            {text: 'Steel Rigg', value: '55.002991 -2.390963'},
                            {text: 'The Errington Arms Public House', value: '55.012558 -2.02156'},
                            {text: 'Tullie House Viewing Point', value: '54.895824 -2.940662'},
                            {text: 'Vallum Farm & Tea Room', value:  '55.008751 -1.927018'},
                            {text: 'Walby Farm Park Visitor Centre', value: '54.935692 -2.874963'},
                            {text: 'Walltown Quarry', value: '54.98698 -2.519565'}
                        ],
                        itemTpl: '{text}',
                        listeners: {
                            select: function(me, record){
                                var my_geo;
                                my_geo = record.get('value').split(' ');
                                this.up('messagecontainer').message.set('latitude', my_geo[0]);
                                this.up('messagecontainer').message.set('longitude', my_geo[1]);
                            }
                        }

                    },
                    {
                        xtype: 'button',
                        text: 'Send your message!',
                        ui: 'confirm',
                        handler: function() {
                            if(this.up('formpanel').getComponent('locationList').hasSelection()){
                                this.up('messagecontainer').animateActiveItem(this.up('messagecontainer').getComponent('thanks'), {type: 'slide', direction: 'left'});
                            }

                        },
                        style: 'margin-top: 16px;'
                    }
                ],
                listeners: {
                    activate: function(){

                    },
                    deactivate: function(){

                    }
                }
            },

            {
                itemId: 'location_map_geo',
                xtype: 'formpanel',
                layout: 'fit',
                scrollable: false,
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
                                    this.up('messagecontainer').animateActiveItem(this.up('messagecontainer').getComponent('location_select'), {type: 'slide', direction: 'right'});
                                }
                            }
                        ]
                    },
                    Ext.create('connecting-lights-mobile.view.GeolocationMap'),
                    {
                        xtype: 'container',
                        cls: 'padding',
                        docked: 'bottom',
                        items: [
                            {
                                xtype: 'button',
                                text: 'Send your message!',
                                ui: 'confirm',
                                docked:'bottom',
                                handler: function() {
                                    this.up('messagecontainer').animateActiveItem(this.up('messagecontainer').getComponent('thanks'), {type: 'slide', direction: 'left'});
                                }
                            }
                        ]
                    }
                ],
                listeners: {
                    activate: function(){
                        this.down('geolocationmap').use_geolocation();
                    },
                    deactivate: function(){
                        var my_geo;
                        my_geo = this.down('geolocationmap').get_position();
                        this.up('messagecontainer').message.set('latitude', my_geo[0]);
                        this.up('messagecontainer').message.set('longitude', my_geo[1]);
                    }
                }
            },

            {
                itemId: 'location_map',
                xtype: 'formpanel',
                layout: 'fit',
                scrollable: false,
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
                                    this.up('messagecontainer').animateActiveItem(this.up('messagecontainer').getComponent('location_select'), {type: 'slide', direction: 'right'});
                                }
                            }
                        ]
                    },
                    Ext.create('connecting-lights-mobile.view.GeolocationMap'),
                    {
                        xtype: 'container',
                        cls: 'padding',
                        docked: 'bottom',
                        items: [
                            {
                                xtype: 'button',
                                text: 'Send your message!',
                                ui: 'confirm',
                                docked:'bottom',
                                handler: function() {
                                    this.up('messagecontainer').animateActiveItem(this.up('messagecontainer').getComponent('thanks'), {type: 'slide', direction: 'left'});
                                }
                            }
                        ]
                    }
                ],
                listeners: {
                    activate: function(){
                        this.down('geolocationmap').use_wall_location();
                    },
                    deactivate: function(){
                        var my_geo;
                        my_geo = this.down('geolocationmap').get_position();
                        this.up('messagecontainer').message.set('latitude', my_geo[0]);
                        this.up('messagecontainer').message.set('longitude', my_geo[1]);
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
                            '<p class="thanks-text">Thanks for submitting your message!</p>'
                        ].join('')
                    },
                    {
                        xtype: 'container',
                        cls: 'padding',
                        items: [
                            {
                                xtype: 'button',
                                text: 'View a feed of new messages!',
                                handler: function() {
                                    this.up('main').setActiveItem(this.up('main').down('feedcontainer'));
                                }
                            }
                        ]
                    }/*,
                    {
                        xtype: 'container',
                        cls: 'padding',
                        items: [
                            {
                                xtype: 'button',
                                text: 'Vizualize the wall live!',
                                handler: function() {
                                    this.up('main').setActiveItem(this.up('main').down('visualizecontainer'));
                                }
                            }
                        ]
                    }*/
                ],
                listeners: {
                    activate: function(){

                        Ext.Ajax.request({
                            url: 'http://connecting-light.herokuapp.com/messages.json',
                            method: 'POST',
                            jsonData: {
                                message: {
                                    red: this.up('messagecontainer').message.get('red'),
                                    green: this.up('messagecontainer').message.get('green'),
                                    blue: this.up('messagecontainer').message.get('blue'),
                                    latitude: this.up('messagecontainer').message.get('latitude'),
                                    longitude: this.up('messagecontainer').message.get('longitude'),
                                    location_on_wall: this.up('messagecontainer').message.get('location_on_wall'),
                                    message: this.up('messagecontainer').message.get('message')
                                }
                            },
                            success: function(response){

                            }
                        });
                    },
                    deactivate: function(){

                    }
                }
            }
        ]
    }

});
