Ext.define('connecting-lights-mobile.model.Message', {
    extend: 'Ext.data.Model',
    config: {
        identifer: 'uuid',
        fields: [
            { name: 'id' },
            { name: 'lat', type: 'decimal' },
            { name: 'lng', type: 'decimal' },
            { name: 'message', type: 'string' },
            { name: 'r', type: 'integer' },
            { name: 'g', type: 'integer' },
            { name: 'b', type: 'integer' },
            { name: 'sent', type: 'boolean' }
        ],
        proxy: {
            type: 'localstorage',
            id: 'message'
        }
    }
});