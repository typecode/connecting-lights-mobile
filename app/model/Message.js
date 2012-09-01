Ext.define('connecting-lights-mobile.model.Message', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'latitude', type: 'decimal' },
            { name: 'longitude', type: 'decimal' },
            { name: 'message', type: 'string' },
            { name: 'red', type: 'integer' },
            { name: 'green', type: 'integer' },
            { name: 'blue', type: 'integer' },
            { name: 'location_on_wall', type: 'decimal'}
        ]
    }
});
