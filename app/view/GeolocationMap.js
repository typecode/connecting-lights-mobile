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
    use_geolocation: function(){
        var me;
        me = this;
        this.location_mode = 'geo';
        if(!me.map){
            return;
        }
        this.getGeo().on('locationerror', function(){
            me.location = new google.maps.LatLng(54.9952, -2.43609);
            me.recenter();
        });
        this.getGeo().on('locationupdate', function(){
            me.location = new google.maps.LatLng(me._geo._latitude, me._geo._longitude);
            me.recenter();
        });
        this.getGeo().updateLocation();
    },
    use_wall_location: function(){
        var me;
        me = this;
        this.location_mode = 'wall';
        if(!me.map){
            return;
        }
        this.getGeo().un('locationerror');
        this.getGeo().un('locationupdate');
        me.location = new google.maps.LatLng(54.9952, -2.43609);
        me.recenter();
    },
    recenter: function(){
        var me, my_position;
        me = this;
        this.marker_postion = this.location;

        if(!me.marker && me.map){
            me.marker = new google.maps.Marker({
                position: me.location,
                map: me.map,
                draggable: true
            });
            google.maps.event.addListener(me.map, 'dragstart', function(){
                if(me.center_timeout){
                    clearTimeout(me.center_timeout);
                    me.center_timeout = null;
                }
            });
            google.maps.event.addListener(me.marker, 'dragend', function(){
                me.marker_postion = me.marker.getPosition();
                center_timeout = setTimeout(function(){
                    me.map.setCenter(me.marker.getPosition());
                }, 500);
            });
        } else if(me.marker){
            this.marker.setPosition(me.location);
        }
        if(me.map){
            this.map.panTo(me.location);
            if(this.location_mode == 'wall'){
                this.map.setZoom(9);
            }
        }
    },
    config: {
        mapOptions:{
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            streetViewControl: false,
            center: new google.maps.LatLng(54.9952, -2.43609),
            zoom: 13,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
            }
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
                this.center_timeout = null;
                if(this.location_mode == 'geo'){
                    this.use_geolocation();
                } else if(this.location_mode == 'wall'){
                    setTimeout(function(){
                        me.use_wall_location();
                    }, 500);
                }
            }
        }
    }
});