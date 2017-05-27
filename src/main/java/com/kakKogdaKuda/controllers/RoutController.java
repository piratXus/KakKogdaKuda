package com.kakKogdaKuda.controllers;

import com.kakKogdaKuda.model.Route;
import com.kakKogdaKuda.model.Station;
import com.kakKogdaKuda.service.interfaces.RouteServiceInterface;
import com.kakKogdaKuda.service.interfaces.StationServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by piratXus on 27.05.2017.
 */
@RestController
@RequestMapping("/main")
public class RoutController {

    @Autowired
    private RouteServiceInterface routeService;

    @Autowired
    private StationServiceInterface stationService;

    @GetMapping(path = "/station")
    public List<Station> getAllStation(){
        return stationService.getAllStation();
    }

    @GetMapping(path = "/route/{startPoint}/{endPoint}")
    public List<Route> getRoute(@PathVariable (name = "startPoint") String startPoint,
                                @PathVariable (name = "endPoint")String endPoint){
        return routeService.getRoutBySation(startPoint,endPoint);
    }
}
