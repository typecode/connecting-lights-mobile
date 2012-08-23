var welcome_container,
    about_container,
    message_container,
    visualize_container;

welcome_container = Ext.create('connecting-lights-mobile.view.WelcomeContainer');
about_container = Ext.create('connecting-lights-mobile.view.AboutContainer');
message_container = Ext.create('connecting-lights-mobile.view.MessageContainer');
visualize_container = Ext.create('connecting-lights-mobile.view.VisualizeContainer');

Ext.define("connecting-lights-mobile.view.Main", {
    extend: 'Ext.tab.Panel',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
        tabBarPosition: 'bottom',
        items: [
            welcome_container,
            about_container,
            message_container,
            visualize_container
        ]
    }
});
