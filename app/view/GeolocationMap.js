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
        mapOptions:{
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            streetViewControl: false,
            zoom: 9,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
            },
            center: new google.maps.LatLng(54.9952, -2.43609)
        },
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
                this.getGeo().on('locationerror', function(){
                    if(!me.marker){
                        me.marker = new google.maps.Marker({
                            position: new google.maps.LatLng(54.9952, -2.43609),
                            map: me.map,
                            draggable: true
                        }, this);
                    }
                });
                this.getGeo().on('locationupdate', function(){
                    var center_timeout;
                    center_timeout = null;
                    if(!me.marker){
                        me.marker = new google.maps.Marker({
                            position: new google.maps.LatLng(me._geo.getLatitude(), me._geo.getLongitude()),
                            map: me.map,
                            draggable: true
                        }, this);
                        me.map.setZoom(13);
                        google.maps.event.addListener(me.map, 'dragstart', function(){
                            if(center_timeout){
                                clearTimeout(center_timeout);
                                center_timeout = null;
                            }
                        });
                        google.maps.event.addListener(me.marker, 'dragend', function(){
                            me.marker_postion = me.marker.getPosition();
                            center_timeout = setTimeout(function(){
                                //me.map.panTo(me.marker.getPosition());
                                me.map.setCenter(me.marker.getPosition());
                            }, 500);
                        });
                    }
                });
                this.getGeo().updateLocation();
            }
        }
    }
});