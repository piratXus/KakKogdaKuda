package com.kakKogdaKuda.model;

import java.util.List;

/**
 * Created by piratXus on 27.05.2017.
 */
public class Route {
    private String name;
    private List<Station> stationForBuses;
    private List<Bus> buses;

    public Route() {
    }

    public Route(String name, List<Station> stationForBuses, List<Bus> buses) {
        this.name = name;
        this.stationForBuses = stationForBuses;
        this.buses = buses;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Station> getStationForBuses() {
        return stationForBuses;
    }

    public void setStationForBuses(List<Station> stationForBuses) {
        this.stationForBuses = stationForBuses;
    }

    public List<Bus> getBuses() {
        return buses;
    }

    public void setBuses(List<Bus> buses) {
        this.buses = buses;
    }

    @Override
    public String toString() {
        return "Route{" +
                "name='" + name + '\'' +
                ", stationForBuses=" + stationForBuses +
                ", buses=" + buses +
                '}';
    }
}
