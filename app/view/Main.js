Ext.define("connecting-lights-mobile.view.Main", {
    extend: 'Ext.tab.Panel',
    xtype:'main',
    uses: [
        'connecting-lights-mobile.view.WelcomeContainer',
        'connecting-lights-mobile.view.AboutContainer',
        'connecting-lights-mobile.view.MessageContainer',
        'connecting-lights-mobile.view.VisualizeContainer',
        'connecting-lights-mobile.view.FeedContainer'
    ],
    config: {
        tabBarPosition: 'bottom',
        items: [
            Ext.create('connecting-lights-mobile.view.WelcomeContainer'),
            Ext.create('connecting-lights-mobile.view.AboutContainer'),
            Ext.create('connecting-lights-mobile.view.MessageContainer'),
            Ext.create('connecting-lights-mobile.view.FeedContainer'),
            Ext.create('connecting-lights-mobile.view.VisualizeContainer')
        ]
    }
});
