Ext.define('connecting-lights-mobile.store.FeedStore',{
    extend: 'Ext.data.Store',
    config: {
        model: 'connecting-lights-mobile.model.Message',

        pageSize: 10,
        autoLoad: true,

        proxy: {
            type: 'ajax',
            url : '/connecting-lights-backend/messages.json',
            limitParam: 'count',
            reader: {
                type: 'json'
            }
        }
    }
});
