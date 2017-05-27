/**
 * Created by piratXus on 18.05.2017.
 */
import 'angular-sanitize';
import 'ui-select';
import 'ui-select/dist/select.css';


class FilterController {

    constructor(routeService,$rootScope) {
        this.rootScope = $rootScope;
        this.rootScope.endPoint = "";
        this.rootScope.startPoint = "";
        this.routeService = routeService;
        console.log("filter");
        this.stations = [];
        this.routeService.getAllStation().then((resp)=>{
            this.stations = resp;
            console.dir(resp);
        });

    };



    searchRoute(){
        this.getRoutByPoints(this.rootScope.places,this.rootScope.startPoint,this.rootScope.endPoint, this.routeService,
            this.searchPlace,this.rootScope.directionsService,this.rootScope.directionsDisplay).then((request) => {
            this.showRouteOnMap(request.waypoints, request.directionsService, request.directionsDisplay)
        });

    }

    getRoutByPoints(places,startPoint,endPoint,routService,searchPlace,directionsService,directionsDisplay) {
        return new Promise((resolve, reject) => {
            routService.getRoteByStation(startPoint,endPoint).then((points) => {
                console.dir(points);
                var wayPoints = [];
                let str;
                let flag = false;
                let firstStation;
                points.routs.forEach((station)=>{
                    var requestPlace = {
                        query: 'Брест '+station.nameStation,
                        type: ['bus_station'],
                    };
                    str = station.nameStation;
                    if(points.routs[0] === station){
                        firstStation = str;
                    }
                    searchPlace(requestPlace,str,places,firstStation).then((resp)=>{
                        console.dir("after rhen");
                        wayPoints.push(resp.waypoint);
                        console.dir(wayPoints);
                        flag = true;
                    });
                });



                setTimeout(()=>{
                    console.dir();
                    if(flag){
                        resolve({
                            waypoints:wayPoints,
                            directionsService:directionsService,
                            directionsDisplay: directionsDisplay,
                        });
                    }else{
                        reject("do not way points");
                    }
                },2000);
            });
        });
    }

    searchPlace(request,nameStation,places,firstStation){
        let flag = false;
        let way;
        return new Promise((resolve,reject)=>{
            places.textSearch(request, callback);
            setTimeout(()=>{
                if(flag){
                    resolve({waypoint: way});
                }else {
                    reject('error');
                }
            },1000)
        });

        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                let stations = [];
                let were = [];
                for (var i = 0; i < results.length; i++) {
                   /* if(results[i].name === firstStation){
                        were = results[i].formatted_address.split(',');
                        console.log('were');
                        console.dir(were);
                    }*/
                    if (results[i].name === nameStation) {
                        way = results[i];
                        console.log("way");
                        console.dir(way);
                        break;
                    }
                }
               /* if(stations.length > 1){
                    let numberaa = [];
                    stations.forEach((s)=>{
                        console.log('station');
                        console.dir(s);
                        numberaa = s.formatted_address.split(',');

                        if(numberaa.length == were.length){
                            console.log("way");
                            way = results[i];
                            console.dir(way);
                        };
                    });
                }else{
                    };*/
               flag = true;
            }
        }
    }


    showRouteOnMap(route, directionsService, directionsDisplay) {
        console.log("rote");
        console.dir(route[route.length-1]);

        let startPoint = new google.maps.LatLng(route[0].geometry.location.lat(), route[0].geometry.location.lng());
        let endPoint = new google.maps.LatLng(route[route.length-1].geometry.location.lat(), route[route.length-1].geometry.location.lng());

        let wayPoints = [];
        if(route.length > 2){
            for(let i = 1;i<route.length-1;i++){
                wayPoints.push({
                    location:new google.maps.LatLng(route[i].geometry.location.lat(),route[i].geometry.location.lng()),
                    stopover: false,
                });
            }
        }
        console.dir('wayPoints');

        console.dir(wayPoints);

        if (wayPoints.length) {
            let request = {
                origin: startPoint,
                waypoints: wayPoints,
                destination: endPoint,
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                provideRouteAlternatives: true,
                avoidHighways: false,
                avoidTolls: false
            };
            directionsService.route(request, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                }
            });
        } else {
            let request = {
                origin: startPoint,
                destination: endPoint,
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                provideRouteAlternatives: false,
                avoidHighways: false,
                avoidTolls: false
            };
            directionsService.route(request, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                }
            });
        }

    }

}


FilterController.$inject = ['routeService','$rootScope'];

export default FilterController;