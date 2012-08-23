Ext.define("connecting-lights-mobile.view.GeolocationMap", {
    extend: "Ext.Map",
    xtype: 'geolocationmap',
    get_position: function(){
        if(this.marker_postion){
            return [this.marker_postion.lat(), this.marker_postion.lng()];
        } else {
            return [this._geo._latitude, this._geo._longitude];
        }
    },
    recenter: function(){
        var my_position;
        this.marker_postion = null;
        my_position = new google.maps.LatLng(this._geo.getLatitude(), this._geo.getLongitude());
        if(this.marker){
            this.marker.setPosition(my_position);
        }
        if(this.map){
            this.map.panTo(my_position);
        }
    },
    config: {
        useCurrentLocation: {
            autoUpdate: false
        },
        align:'top',
        height: '100%',
        listeners: {
            maprender : function(comp, map){
                var me;
                me = this;
                this.map = map;
                this.getGeo().on('locationupdate', function(){
                    me.marker = new google.maps.Marker({
                        position: new google.maps.LatLng(me._geo.getLatitude(), me._geo.getLongitude()),
                        map: me.map,
                        draggable: true
                    }, this);
                    google.maps.event.addListener(me.marker, 'dragend', function(){
                        me.marker_postion = me.marker.getPosition();
                        setTimeout(function(){
                            me.map.panTo(me.marker.getPosition());
                        }, 500);
                    });
                });
                this.getGeo().updateLocation();
            }
        }
    }
});