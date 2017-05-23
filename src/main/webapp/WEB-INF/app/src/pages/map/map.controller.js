import map from 'google-maps';

class MapController {

    constructor() {

        this.initMap().then((res) => {
            this.getCurrentPosition(res.map).then((resp)=>{
                console.log("reaponse getCurrent");
                console.dir(resp);
               this.getBusNearestStation(resp.place, res.places, res.google,res.map);
            });
        });

    }

    initMap() {
        return new Promise(function (resolve, reject) {
            console.log("initMap ");
            map.KEY = 'AIzaSyCM6ib8LkmGA4gUSYYmyvO1ZJz_LFwp9CI';
            map.VERSION = '3.26';
            map.LIBRARIES.push('places');
            console.dir(map);
            map.load(google => {
                const ourMap = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: 52.0913827, lng: 23.7416279},
                    zoom: 13
                });

                const places = new google.maps.places.PlacesService(ourMap);
                console.log("map");
                console.dir(ourMap);
                if (ourMap) {
                    resolve({
                        map: ourMap,
                        google: google,
                        places: places
                    });
                } else {
                    reject("Error create map");
                }

            });
        });
    };

    getCurrentPosition(ourMap){
        console.dir(ourMap);
        return new Promise((resolve, reject)=>{
            let requestPlace = {};
            let pos = {};
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    ourMap.setCenter(pos);
                    ourMap.zoom = 17;
                    requestPlace = {
                        location : pos,
                        radius: 650,
                        type: ['bus_station'],
                    };
                    console.log("places");
                    console.dir(requestPlace);
                    resolve({place: requestPlace});
                });
            }else{
                reject('Error geolocation');
            }
        });

    };

    getBusNearestStation(place, places, google, ourMap){
        console.dir(place);
        places.nearbySearch(place, callback);

        function callback(results, status) {
            console.dir(results);
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    let marker = new google.maps.Marker({
                        position: new google.maps.LatLng(results[i].geometry.location.lat(), results[i].geometry.location.lng()),
                        map: ourMap
                    });
                }
            }
        }
    };

}


MapController.$inject = [ 'accessService'];

export default MapController;