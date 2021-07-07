package dashboardApp.service;

import java.net.URI;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriTemplate;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String temp;

    private static String apiKey;

    @PostConstruct
    public void init() {
        apiKey = this.temp;
    }
    

    public static ResponseEntity<String> getWeather(String city) {
        String baseUrl = "http://api.openweathermap.org/data/2.5/weather?q={city}&APPID={key}&units=metric";

        UriTemplate uriTemplate = new UriTemplate(baseUrl);
        RestTemplate restTemplate = new RestTemplate();

        URI url = uriTemplate.expand(city, apiKey);
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        return response;
    }
}
