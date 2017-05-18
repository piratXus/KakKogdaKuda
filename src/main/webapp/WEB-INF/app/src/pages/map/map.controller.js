import map from 'google-maps';


class MapController {
    constructor() {

        this.initMap().then(() => {
        });

    }


    initMap() {
        return new Promise(function (resolve, reject) {
            map.KEY = 'AIzaSyCM6ib8LkmGA4gUSYYmyvO1ZJz_LFwp9CI';
            map.load(google => {
                const ourMap = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: 53.8258089, lng: 26.2174887},
                    zoom: 7
                });
                if (ourMap) {
                    resolve({
                        map: ourMap,
                        google: google
                    });
                } else {
                    reject("Error create map");
                }
            });
        });
    };

}


MapController.$inject = [ 'accessService'];

export default MapController;