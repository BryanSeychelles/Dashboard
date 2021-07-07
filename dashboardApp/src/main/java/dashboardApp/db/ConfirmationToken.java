package dashboardApp.db;

import java.time.LocalDate;
import java.util.UUID;

import javax.persistence.*;

@Entity
@Table(name = "confirmation_token")
public class ConfirmationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String token;

    @Column(name = "created_date", nullable = false, length = 50)
    private LocalDate createdDate;

    @OneToOne
    @JoinColumn(nullable = false)
    private User user;

    public ConfirmationToken() {}

    public ConfirmationToken(User user) {
        this.token = UUID.randomUUID().toString();
        this.createdDate = LocalDate.now();
        this.user = user;
	}

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public LocalDate getCreatedDate() {
        return createdDate;
    }
    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
}