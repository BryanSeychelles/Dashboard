package dashboardApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import dashboardApp.db.ConfirmationToken;
import dashboardApp.db.ConfirmationTokenRepository;
import dashboardApp.db.User;
import dashboardApp.db.UserRepository;
import dashboardApp.security.CustomUserDetails;

@Service
public class UserService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;
    @Autowired
    private EmailSenderService emailSenderService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new CustomUserDetails(user);
    }

    public void signUpUser(User user) {
        if (!userExists(user)) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);

            ConfirmationToken confirmationToken = new ConfirmationToken(user);
            confirmationTokenRepository.save(confirmationToken);
            sendConfirmationMail(user.getEmail(), confirmationToken.getToken());
        } else {
            System.out.println("User already exists !");
        }
    }

    public void confirmUser(ConfirmationToken token) {
        final User user = token.getUser();
        user.setEnabled(true);
        userRepository.save(user);
        confirmationTokenRepository.delete(token);
    }

    public void sendConfirmationMail(String userMail, String token) {

        final SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(userMail);
        mailMessage.setSubject("Mail Confirmation Link!");
        mailMessage.setFrom("epitruc.sutoremote@gmail.com");
        mailMessage.setText(
            "Thank you for registering. Please click on the below link to activate your account."
            + "http://localhost:8080/register/confirm?token="
            + token
        );
        emailSenderService.sendEmail(mailMessage);
    }

    public boolean userExists(User user) {
        return userRepository.findByEmail(user.getEmail()) != null;
    }
}
