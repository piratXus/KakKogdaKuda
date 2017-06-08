import map from 'google-maps';

class MapController {
    constructor(acsesService,routeService,$rootScope) {
        this.rootScope = $rootScope;
        this.routService = routeService;
        this.initMap().then((res) => {
            this.getCurrentPosition(res.map).then((resp) => {
                this.rootScope.ourMap = res.map;
                this.getBusNearestStation(resp.place, res.places, res.google, res.map,this.rootScope);
            });
        });

    }

    initMap() {
        let rootScope = this.rootScope;
        return new Promise(function (resolve, reject) {
            console.log("init");
            map.KEY = 'AIzaSyCM6ib8LkmGA4gUSYYmyvO1ZJz_LFwp9CI';
            map.VERSION = '3.26';
            map.LIBRARIES.push('places');
            map.load(google => {
                const ourMap = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: 52.0913827, lng: 23.7416279},
                    zoom: 13
                });
                rootScope.directionsDisplay = new google.maps.DirectionsRenderer();
                rootScope.directionsService = new google.maps.DirectionsService();
                rootScope.directionsDisplay.setMap(ourMap);
                rootScope.directionsDisplay.setOptions({suppressMarkers: true, suppressInfoWindows: true});


                rootScope.places = new google.maps.places.PlacesService(ourMap);
                if (ourMap) {
                    resolve({
                        map: ourMap,
                        google: google,
                        places: rootScope.places,
                        directionsDisplay: rootScope.directionsDisplay,
                        directionsService: rootScope.directionsService
                    });
                } else {
                    reject("Error create map");
                }

            });
        });
    };

    getCurrentPosition(ourMap) {
        return new Promise((resolve, reject) => {
            let requestPlace = {};
            let pos = {};
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                 pos = {
                 lat: position.coords.latitude,
                 lng: position.coords.longitude
                 };
                 console.log("current position");
                 console.dir(pos);
                 ourMap.setCenter(pos);
                 ourMap.zoom = 17;
                 requestPlace = {
                 location : pos,
                 radius: 550,
                 type: ['bus_station'],
                 };
                 console.log("places");
                 console.dir(requestPlace);
                 resolve({place: requestPlace});
                 });
            } else {
                reject('Error geolocation');
            }
        });

    };


    getBusNearestStation(place, places, google, ourMap,rootScope) {

        let startPoint = this.selectStartPointInMap;
        places.nearbySearch(place, callback);
        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    let marker = new google.maps.Marker({
                        position: new google.maps.LatLng(results[i].geometry.location.lat(), results[i].geometry.location.lng()),
                        map: ourMap
                    });
                    marker.addListener('click', () => {
                        console.dir(results[i]);
                         startPoint( results[i],rootScope);
                    });
                }
            }
        }
    };



    selectStartPointInMap(place, rootScope){
        rootScope.startPoint = place.name;
        console.dir(rootScope.startPoint);
    };

}
MapController.$inject = [ 'accessService', 'routeService','$rootScope'];

export default MapController;