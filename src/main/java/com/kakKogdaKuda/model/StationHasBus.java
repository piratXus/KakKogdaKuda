package com.kakKogdaKuda.model;

/**
 * Created by piratXus on 27.05.2017.
 */
public class StationHasBus {
    private Long idStation;
    private Long idBus;
    private String time;

    public StationHasBus() {
    }

    public StationHasBus(Long idStation, Long idBus, String time) {
        this.idStation = idStation;
        this.idBus = idBus;
        this.time = time;
    }

    public Long getIdStation() {
        return idStation;
    }

    public void setIdStation(Long idStation) {
        this.idStation = idStation;
    }

    public Long getIdBus() {
        return idBus;
    }

    public void setIdBus(Long idBus) {
        this.idBus = idBus;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "StationHasBus{" +
                "idStation=" + idStation +
                ", idBus=" + idBus +
                ", time='" + time + '\'' +
                '}';
    }
}
