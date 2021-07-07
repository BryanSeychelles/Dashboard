package com.example.weather_react.controller;

import java.net.URI;

import org.springframework.web.util.UriTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class WeatherController {

    private static final String WEATHER_URL = "http://api.openweathermap.org/data/2.5/{type}?q={city},{country}&APPID={key}&units=metric";
    private final String apiKey = "517d6c40e4e16d4fb35dc45476afa874";

    @RequestMapping(method = RequestMethod.GET, value = "/api/weather/weatherByCity/{city}/{country}")
    public @ResponseBody Object getWeatherByCity(@PathVariable String city, @PathVariable String country) {

        RestTemplate restTemplate = new RestTemplate();
        UriTemplate uriTemplate = new UriTemplate(WEATHER_URL);

        URI url = uriTemplate.expand("weather", city, country, apiKey);

        ResponseEntity<Object> response = restTemplate.getForEntity(url, Object.class);

        return response;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/weather/forecastByCity/{city}/{country}")
    public @ResponseBody Object getForecastByCity(@PathVariable String city, @PathVariable String country) {

        RestTemplate restTemplate = new RestTemplate();
        UriTemplate uriTemplate = new UriTemplate(WEATHER_URL);

        URI url = uriTemplate.expand("forecast", city, country, apiKey);

        ResponseEntity<Object> response = restTemplate.getForEntity(url, Object.class);

        return response;
    }
}
