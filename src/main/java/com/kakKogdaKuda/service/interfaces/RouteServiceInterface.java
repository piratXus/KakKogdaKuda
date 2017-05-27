package com.kakKogdaKuda.service.interfaces;

import com.kakKogdaKuda.model.Route;

import java.util.List;

/**
 * Created by piratXus on 27.05.2017.
 */
public interface RouteServiceInterface {
    List<Route> getRoutBySation(String startPoint,String endPoint);
}
