Ext.define("connecting-lights-mobile.view.FeedContainer", {
    extend: 'Ext.dataview.List',
    xtype: 'feedcontainer',
    requires: [
        
    ],
    config: {
        title: 'Feed',
        iconCls: 'more',
        store: Ext.create('connecting-lights-mobile.store.FeedStore'),
        plugins: [
            {
                xclass: 'Ext.plugin.PullRefresh'
            },
            {
                xclass: 'Ext.plugin.ListPaging',
                autoPaging: true
            }
        ],
        styleHtmlContent: true,
        disableSelection: true,
        limit: 10,
        itemTpl: [
            '<div class="color-box" style="background-color: rgb({red}, {green}, {blue});"></div>',
            '<div class="message">{message}</div>'
        ],
        listeners:{
            activate: function(){
            }
        }
    }
});