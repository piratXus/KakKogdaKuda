import map from 'google-maps';

class MapController {


    constructor() {
            this.initMap().then((res) => {
            this.getCurrentPosition(res.map).then((resp)=>{
               this.getBusNearestStation(resp.place, res.places, res.google,res.map,res.directionsService,res.directionsDisplay);
            });
        });

    }

    initMap() {
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
                let directionsDisplay = new google.maps.DirectionsRenderer();
                let directionsService = new google.maps.DirectionsService();
                directionsDisplay.setMap(ourMap);
                directionsDisplay.setOptions( { suppressMarkers: true, suppressInfoWindows: true } );

                let places = new google.maps.places.PlacesService(ourMap);
                if (ourMap) {
                    resolve({
                        map: ourMap,
                        google: google,
                        places: places,
                        directionsDisplay: directionsDisplay,
                        directionsService: directionsService
                    });
                } else {
                    reject("Error create map");
                }

            });
        });
    };

    getCurrentPosition(ourMap){
        console.log("getCurrentPosition");
        return new Promise((resolve, reject)=>{
            let requestPlace = {};
            let pos = {};
            if (navigator.geolocation) {
                console.log("naaaaa");
                pos = {
                    lat: 52.1002527,
                    lng: 23.7540576
                };
                /* pos{
                 lat: ,
                 lng:
                 };*/
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
                /*navigator.geolocation.getCurrentPosition(function(position) {
                    pos = {
                        lat: '52.1002527',
                        lng: '23.7540576'
                    };
                       /!* pos{
                            lat: ,
                            lng:
                        };*!/
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
                });*/
            }else{
                console.log("error");
                reject('Error geolocation');
            }
        });

    };

    getBusNearestStation(place, places, google, ourMap,directionsService,directionsDisplay){
        places.nearbySearch(place, callback);
        function callback(results, status) {
            console.log("result");
            console.dir(results);
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    let marker = new google.maps.Marker({
                        position: new google.maps.LatLng(results[i].geometry.location.lat(), results[i].geometry.location.lng()),
                        map: ourMap
                    });
                    marker.addListener('click',()=>{
                        let startPoint = {
                            lat: marker.position.lat(),
                            lng: marker.position.lng()
                        };
                        console.log('click');
                        console.dir(startPoint);
                        this.test();
                       /* this.getEndPoint(startPoint).then((resp)=>{
                            console.log('inside getEndPoint');
                            this.getRoutByPoints(startPoint,resp.endPoint).then((request)=>{
                                this.showRouteOnMap(request.request,directionsService,directionsDisplay)
                            });
                        });*/
                    });
                }
            }
        }
    };

    test(){
        console.log('test');
    }

    getEndPoint(startPoint){
        console.log('getEnd');
        console.dir(startPoint);
        return new Promise((resolve, reject)=>{
            if(startPoint){
            let endPoint = {
                lat: 52.0984915,
                lng: 23.6848068
            };
            resolve({endPoint: endPoint});
        }else{
                reject('Do not set start point');
            }
        });
    }

    getRoutByPoints(startPoint,endPoint,wayPoints){
        return new Promise((resolve, reject)=>{
            if(endPoint){
                if(wayPoints){
                    let request = {
                        origin: startPoint,
                        waypoints: wayPoints,
                        destination: endPoint,
                        travelMode: google.maps.TravelMode.DRIVING,
                        unitSystem: google.maps.UnitSystem.METRIC,
                        provideRouteAlternatives: false,
                        avoidHighways: false,
                        avoidTolls: false
                    };
                    resolve({request: request});
                }else{
                    let request = {
                        origin: startPoint,
                        destination: endPoint,
                        travelMode: google.maps.TravelMode.DRIVING,
                        unitSystem: google.maps.UnitSystem.METRIC,
                        provideRouteAlternatives: false,
                        avoidHighways: false,
                        avoidTolls: false
                    };
                    resolve({request: request});
                }
            }else{
                reject('Do not set end point');
            }
        });


    }

    showRouteOnMap(request,directionsService,directionsDisplay){
        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
                let routes = result.routes;
            }
        });
    }


}


MapController.$inject = [ 'accessService',];

export default MapController;