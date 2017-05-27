package com.kakKogdaKuda.service.interfaces;

import com.kakKogdaKuda.model.Station;

import java.util.List;

/**
 * Created by piratXus on 27.05.2017.
 */
public interface StationServiceInterface {
    List<Station> getAllStation();
    Station getStationByName(String nameStation);
    List<Station> getStationByBus(Long busId);
}
