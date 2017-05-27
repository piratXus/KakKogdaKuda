package com.kakKogdaKuda.service.Impl;

import com.kakKogdaKuda.model.Bus;
import com.kakKogdaKuda.model.Route;
import com.kakKogdaKuda.model.Station;
import com.kakKogdaKuda.model.StationForBus;
import com.kakKogdaKuda.service.interfaces.RouteServiceInterface;
import com.kakKogdaKuda.service.interfaces.StationServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by piratXus on 27.05.2017.
 */
@Service("routeService")
public class RouteServiceImpl implements RouteServiceInterface {

    @Autowired
    private StationServiceInterface stationService;

    @Override
    public List<Route> getRoutBySation(String startPoint, String endPoint) {
        List<Route> routes = new ArrayList<>();
        List<Station> stations = stationService.getAllStation();
        List<StationForBus> stationForBuses = new ArrayList<>();

        for (Station station:stations) {
            if(station.getNameStation().equals(startPoint) || station.getNameStation().equals(endPoint)){
                stationForBuses.add(new StationForBus(station.getNameStation(),"123"));
            }

        }
        routes.add(new Route(stationForBuses,new Bus(1L,"2")));
        return routes;
    }
}
