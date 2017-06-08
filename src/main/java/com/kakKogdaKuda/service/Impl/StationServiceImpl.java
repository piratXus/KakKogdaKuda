package com.kakKogdaKuda.service.Impl;

import com.kakKogdaKuda.model.Bus;
import com.kakKogdaKuda.model.Station;
import com.kakKogdaKuda.service.interfaces.StationServiceInterface;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by piratXus on 27.05.2017.
 */
@Service("stationService")
public class StationServiceImpl implements StationServiceInterface {

//    @Autowired
//    private StationMapper stationMapper;

    List<Station> stations = new ArrayList<>();

    @Override
    public List<Station> getAllStation() {
        List<Station> allStation = new ArrayList<>();
        List<Bus> buses = new ArrayList<>();
        allStation.add(new Station(1L,"Технический университет"));
        allStation.add(new Station(9L,"Богданчука"));
        allStation.add(new Station(10L,"Завод"));
        allStation.add(new Station(11L,"Центр молодежного творчества"));
        allStation.add(new Station(12L,"Зеленая"));
        allStation.add(new Station(13L,"МОПРа"));
        allStation.add(new Station(2L,"Проспект Машерова"));
        allStation.add(new Station(14L,"ЦУМ"));
        allStation.add(new Station(15L,"Гимназия №1"));
        allStation.add(new Station(16L,"Промсиройбанк"));
        allStation.add(new Station(3L,"Орджоникидзе"));
        return allStation;
    }

    @Override
    public Station getStationByName(String nameStation) {
        List<Station> stations = getAllStation();
        Station stat = new Station();
        for (Station station:stations){
            if(station.getNameStation().equals(nameStation)){
                stat = station;
            }else {
                stat = null;
            }
        }
        return stat;
    }

    @Override
    public List<Station> getStationByBus(Long busId) {
        return null;
    }
}
