var myStore = Ext.create('Ext.data.Store', {
    model: 'connecting-lights-mobile.model.Message',
    proxy: {
        type: 'ajax',
        url : '/connecting-lights-backend/messages.json',
        startParam: 'since_id',
        reader: {
            type: 'json',
            rootProperty: 'users'
        }
    },
    autoLoad: true
});

Ext.define("connecting-lights-mobile.view.FeedContainer", {
    extend: 'Ext.dataview.List',
    xtype: 'feedcontainer',
    requires: [
        'Ext.Img'
    ],
    config: {
        title: 'Feed',
        iconCls: 'more',
        store: myStore,
        plugins: [
            {
                xclass: 'Ext.plugin.PullRefresh',
                pullRefreshText: 'Pull down for new messages!'
            }
        ],
        styleHtmlContent: true,
        itemTpl: [
            '<div class="color-box"></div>',
            '<div class="message">{message}</div>'
        ],
        listeners:{
            activate: function(){
                
            }
        }
    }
});