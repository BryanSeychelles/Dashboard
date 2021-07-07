package com.example.weather.controller;

import java.io.Serializable;
import java.math.BigDecimal;

public class CurrentWeather implements Serializable {
    
    private String description;
    private BigDecimal temperature;
    private BigDecimal feelsLike;
    private BigDecimal windSpeed;

    public CurrentWeather(String description, BigDecimal temperature, BigDecimal feelsLike, BigDecimal windSpeed) {
        this.description = description;
        this.temperature = temperature;
        this.feelsLike = feelsLike;
        this.windSpeed = windSpeed;
    }

    public String getDescription() {
        return this.description;
    }
    public BigDecimal getTemperature() {
        return this.temperature;
    }
    public BigDecimal getFeelsLike() {
        return this.feelsLike;
    }
    public BigDecimal getWindSpeed() {
        return this.windSpeed;
    }
}
