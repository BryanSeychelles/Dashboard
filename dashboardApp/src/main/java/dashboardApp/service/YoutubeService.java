package dashboardApp.service;

import java.net.URI;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriTemplate;

@Service
public class YoutubeService {

    @Value("${youtube.api.key}")
    private String apiKey;

    private final String baseUrl = "https://youtube.googleapis.com/youtube/v3";

    public String getIdByName(String name, String type) {
        String completeUrl = baseUrl + "/search?part=snippet&maxResults=1&q={name}&key={key}";
        String id = null;

        UriTemplate uriTemplate = new UriTemplate(completeUrl);
        RestTemplate restTemplate = new RestTemplate();

        URI url = uriTemplate.expand(name, apiKey);
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode root = mapper.readTree(response.getBody());
            id = root.path("items").get(0).at("/id/" + type + "Id").asText();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            System.out.println("ERROR : ID NOT FOUND!");
        }

        return id;
    }    

    public ResponseEntity<String> getSubscribers(String channelName) {
        String completeUrl = baseUrl + "/channels?part=statistics&id={channelId}&key={key}";
        String channelId = getIdByName(channelName, "channel");

        UriTemplate uriTemplate = new UriTemplate(completeUrl);
        RestTemplate restTemplate = new RestTemplate();

        URI url = uriTemplate.expand(channelId, apiKey);
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        return response;
    }

    public ResponseEntity<String> getNumberOfViews(String videoName) {
        String completeUrl = baseUrl + "/videos?part=statistics&id={videoId}&key={key}";
        String videoId = getIdByName(videoName, "video");

        UriTemplate uriTemplate = new UriTemplate(completeUrl);
        RestTemplate restTemplate = new RestTemplate();

        URI url = uriTemplate.expand(videoId, apiKey);
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        return response;
    }

    public ResponseEntity<String> getLastNComments(int numberOfComments, String videoName) {
        String completeUrl = baseUrl + "/commentThreads?part=snippet&videoId={videoId}&maxResults={numberOfComments}&key={key}";
        String videoId = getIdByName(videoName, "video");

        UriTemplate uriTemplate = new UriTemplate(completeUrl);
        RestTemplate restTemplate = new RestTemplate();

        URI url = uriTemplate.expand(videoId, numberOfComments, apiKey);
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        return response;
    }
}
