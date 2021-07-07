package dashboardApp.db;

import java.util.HashMap;

import javax.persistence.*;

@Entity
@Table(name = "widget_instance")
public class WidgetInstance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "widget_name", nullable = false, length = 100)
    private String widgetName;

    @Column(name = "service_name", nullable = false, length = 100)
    private String serviceName;

    @Column(nullable = false, length = 500)
    private String description;

    @Column
    private int position;

    @Column
    private HashMap<String, String> stringParams;

    @Column
    private HashMap<String, Integer> intParams;

    @OneToOne
    @JoinColumn(nullable = false, name = "user_email", referencedColumnName = "email")
    private User user;

    public WidgetInstance() {}

    public WidgetInstance(
        String widgetName,
        String serviceName,
        String description,
        int position,
        HashMap<String, String> stringParams,
        HashMap<String, Integer> intParams,
        User user
    ) {
        this.widgetName = widgetName;
        this.serviceName = serviceName;
        this.description = description;
        this.position = position;
        this.stringParams = stringParams;
        this.intParams = intParams;
        this.user = user;
	}

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getWidgetName() {
        return widgetName;
    }
    public void setWidgetName(String widgetName) {
        this.widgetName = widgetName;
    }
    public String getServiceName() {
        return serviceName;
    }
    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public int getPostion() {
        return position;
    }
    public void setPosition(int position) {
        this.position = position;
    }
    public HashMap<String, String> getStringParams() {
        return stringParams;
    }
    public void setStringParams(HashMap<String, String> stringParams) {
        this.stringParams = stringParams;
    }
    public HashMap<String, Integer> getIntParams() {
        return intParams;
    }
    public void setIntParams(HashMap<String, Integer> intParams) {
        this.intParams = intParams;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
}