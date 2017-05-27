/**
 * Created by piratXus on 25.05.2017.
 */
export default class RouteService{
    constructor($http){
        this.http = $http;
    }



    getAllStation(){
        const url = "http://localhost:8080/api/main/station";
        return this.http.get(url,{
        }).then((resp) => {
            return resp.data;
        }).catch((castError) => {
            console.dir(castError);
        });
    }

    getRoteByStation(startPoint,endPoint){
        const url = "http://localhost:8080/api/main/station/"+startPoint+"/"+endPoint;

        return this.http.get(url,{
        }).then((resp) => {
            return resp.data;
        }).catch((castError) => {
            console.dir(castError);
        });

    }
}
RouteService.$inject = ['$http'];