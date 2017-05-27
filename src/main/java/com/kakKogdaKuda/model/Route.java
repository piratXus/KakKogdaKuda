package com.kakKogdaKuda.model;

import java.util.List;

/**
 * Created by piratXus on 27.05.2017.
 */
public class Route {
    private List<StationForBus> stationForBuses;
    private Bus bus;

    public Route() {
    }

    public Route(List<StationForBus> stationForBuses, Bus bus) {
        this.stationForBuses = stationForBuses;
        this.bus = bus;
    }

    public List<StationForBus> getStationForBuses() {
        return stationForBuses;
    }

    public void setStationForBuses(List<StationForBus> stationForBuses) {
        this.stationForBuses = stationForBuses;
    }

    public Bus getBus() {
        return bus;
    }

    public void setBus(Bus bus) {
        this.bus = bus;
    }

    @Override
    public String toString() {
        return "Route{" +
                "stationForBuses=" + stationForBuses +
                ", bus=" + bus +
                '}';
    }
}
