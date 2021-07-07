package dashboardApp.service;

import java.net.URI;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriTemplate;

@Service
public class RedditService {
    
    private final String baseUrl = "https://www.reddit.com";

    public ResponseEntity<String> getLastNPosts(int numberOfPosts, String subredditName) {
        String completeUrl = baseUrl + "/r/{subredditName}/new/.json?limit={numberOfPosts}";

        UriTemplate uriTemplate = new UriTemplate(completeUrl);
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        URI url = uriTemplate.expand(subredditName, numberOfPosts);
        headers.set("User-Agent", "dashboard");
        HttpEntity<String> entity = new HttpEntity<String>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);                

        return response;
    }
    
    public ResponseEntity<String> getTopNMostPopularSubreddits(int numberOfSubreddits) {
        String completeUrl = baseUrl + "/subreddits/popular/.json?limit={numberOfSubreddits}";
        
        UriTemplate uriTemplate = new UriTemplate(completeUrl);
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        URI url = uriTemplate.expand(numberOfSubreddits);
        headers.set("User-Agent", "dashboard");
        HttpEntity<String> entity = new HttpEntity<String>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);                

        return response;
    }
}
