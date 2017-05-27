package com.kakKogdaKuda.model;

/**
 * Created by piratXus on 27.05.2017.
 */
public class Bus {
    private Long id;
    private  String numberBus;

    public Bus() {
    }

    public Bus(Long id,  String numberBus) {
        this.id = id;
        this.numberBus = numberBus;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumberBus() {
        return numberBus;
    }

    public void setNumberBus(String numberBus) {
        this.numberBus = numberBus;
    }

    @Override
    public String toString() {
        return "Bus{" +
                "id=" + id +
                ", numberBus='" + numberBus + '\'' +
                '}';
    }
}
