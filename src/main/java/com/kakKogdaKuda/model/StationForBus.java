package com.kakKogdaKuda.model;

/**
 * Created by piratXus on 27.05.2017.
 */
public class StationForBus {
    private String nameStation;
    private String timeBusThisStation;

    public StationForBus() {
    }

    public StationForBus(String nameStation, String timeBusThisStation) {
        this.nameStation = nameStation;
        this.timeBusThisStation = timeBusThisStation;
    }

    public String getNameStation() {
        return nameStation;
    }

    public void setNameStation(String nameStation) {
        this.nameStation = nameStation;
    }

    public String getTimeBusThisStation() {
        return timeBusThisStation;
    }

    public void setTimeBusThisStation(String timeBusThisStation) {
        this.timeBusThisStation = timeBusThisStation;
    }
}
