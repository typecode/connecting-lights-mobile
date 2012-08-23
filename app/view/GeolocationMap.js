Ext.define("connecting-lights-mobile.view.GeolocationMap", {
    extend: "Ext.Map",
    xtype: 'mapview',
    config: {
        useCurrentLocation: true,
        align:'top',
        height: '100%',
        listeners: {
            maprender : function(comp, map){
                new google.maps.Marker({
                    position: new google.maps.LatLng(this._geo.getLatitude(), this._geo.getLongitude()),
                    map: map
                });
            }
        }
    }
});