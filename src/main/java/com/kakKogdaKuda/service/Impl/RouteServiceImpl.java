package com.kakKogdaKuda.service.Impl;

import com.kakKogdaKuda.model.Bus;
import com.kakKogdaKuda.model.Route;
import com.kakKogdaKuda.service.interfaces.BusServiceInterface;
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

    @Autowired
    private BusServiceInterface busService;

//    @Autowired
//    private RouteMapper routeMapper;


    @Override
    public List<Route> getRoutBySation(String startPoint, String endPoint) {
        List<Route> routes = new ArrayList<>();
        List<Bus> buses = new ArrayList<>();
        buses.add(new Bus(1L,"1"));
        routes.add(new Route(startPoint+"-"+endPoint,stationService.getAllStation(),buses));
        return routes;
    }
}
