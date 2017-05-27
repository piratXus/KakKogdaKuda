package com.kakKogdaKuda.model;

/**
 * Created by piratXus on 27.05.2017.
 */
public class Station {
    private Long id;
    private String nameStation;

    public Station() {
    }

    public Station(Long id, String nameStation) {
        this.id = id;
        this.nameStation = nameStation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameStation() {
        return nameStation;
    }

    public void setNameStation(String nameStation) {
        this.nameStation = nameStation;
    }



    @Override
    public String toString() {
        return "Station{" +
                "id=" + id +
                ", nameStation='" + nameStation + '\'' +
                '}';
    }
}


