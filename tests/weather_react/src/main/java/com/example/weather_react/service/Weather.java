// package com.example.weather_react.service;

// import java.net.URI;

// import org.springframework.stereotype.Service;
// import org.springframework.web.bind.annotation.ResponseBody;
// import org.springframework.web.client.RestTemplate;
// import org.springframework.web.util.UriTemplate;

// @Service
// public class Weather {
//     private static final String WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?q={city},{country}&APPID={key}&units=metric";
//     private final String apiKey = "517d6c40e4e16d4fb35dc45476afa874";

//     public @ResponseBody String getWeather(String city) {

//         RestTemplate restTemplate = new RestTemplate();
//         UriTemplate uriTemplate = new UriTemplate(WEATHER_URL);

//         URI url = uriTemplate.expand("weather", city, apiKey);

//         ResponseEntity<Object> response = restTemplate.getForEntity(url, Object.class);

//         return response;
//     }
// }
