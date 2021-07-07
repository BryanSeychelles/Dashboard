package dashboardApp;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import dashboardApp.db.User;
import dashboardApp.db.UserRepository;
import dashboardApp.db.WidgetInstance;
import dashboardApp.db.WidgetInstanceRepository;

@Component
public class DataLoader implements ApplicationRunner {
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private WidgetInstanceRepository widgetInstanceRepository;

    @Override
    public void run(ApplicationArguments args) {
        if ((userRepository.findByEmail("admin@admin.com")) == null) {
            User admin = new User("admin", "admin", "admin@admin.com", "admin");
            admin.setEnabled(true);
		    admin.setPassword(bCryptPasswordEncoder.encode(admin.getPassword()));
            userRepository.save(admin);
        }
        User admin = userRepository.findByEmail("admin@admin.com");
        if ((widgetInstanceRepository.findByUser(admin).isEmpty())) {
            HashMap<String, String> stringParams = new HashMap<>();
            stringParams.put("city", "Paris");
            WidgetInstance meteo11 = new WidgetInstance(
                "weather_1",
                "weather",
                "Display temperature for a given city",
                1,
                stringParams,
                null,
                admin
            );
            widgetInstanceRepository.save(meteo11);

            stringParams = new HashMap<>();
            stringParams.put("city", "London");
            WidgetInstance meteo12 = new WidgetInstance(
                "weather_1",
                "weather",
                "Display temperature for a given city",
                2,
                stringParams,
                null,
                admin
            );
            widgetInstanceRepository.save(meteo12);

            stringParams = new HashMap<>();
            stringParams.put("city", "Paris");
            WidgetInstance meteo21 = new WidgetInstance(
                "weather_2",
                "weather",
                "Display position and wind for a given city",
                3,
                stringParams,
                null,
                admin
            );
            widgetInstanceRepository.save(meteo21);

            stringParams = new HashMap<>();
            stringParams.put("channel_name", "Oliech");
            WidgetInstance youtube11 = new WidgetInstance(
                "youtube_1",
                "youtube",
                "Display the number of subscribers for a given channel",
                4,
                stringParams,
                null,
                admin
            );
            widgetInstanceRepository.save(youtube11);

            stringParams = new HashMap<>();
            stringParams.put("video_name", "11ANS de JDG - Partie 1");
            WidgetInstance youtube21 = new WidgetInstance(
                "youtube_2",
                "youtube",
                "Display the number of views for a given video",
                5,
                stringParams,
                null,
                admin
            );
            widgetInstanceRepository.save(youtube21);

            stringParams = new HashMap<>();
            stringParams.put("video_name", "Demon Slayer EN 17 MINUTES | RE: TAKE");
            HashMap<String, Integer> intParams = new HashMap<>();
            intParams.put("number_of_comments", 10);
            WidgetInstance youtube31 = new WidgetInstance(
                "youtube_3",
                "youtube",
                "Display the last n comments for a given video",
                6,
                stringParams,
                intParams,
                admin
            );
            widgetInstanceRepository.save(youtube31);

            stringParams = new HashMap<>();
            stringParams.put("subreddit_name", "TellMeAFact");
            intParams = new HashMap<>();
            intParams.put("number_of_posts", 5);
            WidgetInstance reddit11 = new WidgetInstance(
                "reddit_1",
                "reddit",
                "Display the last n posts for a given subreddit",
                7,
                stringParams,
                intParams,
                admin
            );
            widgetInstanceRepository.save(reddit11);
        }
    }
}
