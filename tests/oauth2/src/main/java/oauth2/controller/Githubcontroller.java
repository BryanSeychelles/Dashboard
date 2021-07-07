package oauth2.controller;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import lombok.Data;

@RestController
@RequestMapping("/github")
public class Githubcontroller {

    @Value("${spring.security.oauth2.client.registration.github.clientId}")
    private String clientId;

    @GetMapping("/clientId")
    public String getValue()
    {
        System.out.println("Client ID : " + clientId);
        return clientId;
    }

    // private static final String clientId = "3b5e27318ea64e223610";
    private static final String clientSecret = "56c5b3e80c36fcb7aacdfa64f140bf07aa5a5215";
    private static final String userInfoUrl = "https://api.github.com/user";
    private static final String accessTokenUrl = "https://github.com/login/oauth/access_token";

    @Data
    private static class OauthAccessToken {

        @JsonProperty("access_token")
        private String accessToken;

    }

    // @Autowired
    private RestTemplate restTemplate = new RestTemplate();

    private OauthAccessToken getOAuthAccessToken(String code){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Accept", "application/json");
        Map<String, String> params = new HashMap<>();
        params.put("client_id", clientId);
        params.put("client_secret", clientSecret);
        params.put("code", code);
        HttpEntity<Map> request = new HttpEntity<>(params, headers);
        OauthAccessToken accessTokenReponse = this.restTemplate.postForObject(accessTokenUrl, request, OauthAccessToken.class);
        return accessTokenReponse;
    }

    private String getUserInfo(String accessToken){
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "token " + accessToken);
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        return this.restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity, String.class).getBody();
    }
    
    @RequestMapping("login")
    @ResponseBody
    public String login(@RequestParam("code") String code) {
        System.out.println("code : " + code);
       OauthAccessToken oauthAccessToken =  getOAuthAccessToken(code);
       System.out.println(oauthAccessToken);
       String userInfo = getUserInfo(oauthAccessToken.getAccessToken());
       System.out.println(userInfo);
       return "ehe te nandayo ?!";
    }
}
