package dashboardApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import dashboardApp.db.ConfirmationToken;
import dashboardApp.db.ConfirmationTokenRepository;
import dashboardApp.db.User;
import dashboardApp.service.UserService;

@Controller
public class AuthenticationController {

    @Autowired
    private UserService userService;
    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    // @GetMapping("/sign-in")
	// public String signInPage() {
	// 	return "sign-in";
    // }
    // @GetMapping("/sign-up")
	// String signUpPage(User user) {
	// 	return "sign-up";
	// }
    
    // @PostMapping("/sign-up")
    // public String signUp(User user) {
    //     userService.signUpUser(user);
    //     return "redirect:/sign-in";
    // }

    @GetMapping("/register/confirm")
	public String confirmMail(@RequestParam("token") String token) {
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(token);
        if (confirmationToken != null) {
            userService.confirmUser(confirmationToken);
        } else {
            System.out.println("Invalid token");
        }
		return "redirect:/auth#login";
    }

    @PostMapping("/register")
    public String signUpUser(
        @RequestParam("firstName") String firstName,
        @RequestParam("lastName") String lastName,
        @RequestParam("email") String email,
        @RequestParam("password") String password
    ) {
        userService.signUpUser(new User(firstName, lastName, email, password));
        return "redirect:/auth#login";
    }
}
