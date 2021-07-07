package dashboardApp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    
    @GetMapping({"/home", "/auth*"})
	public String signInPage() {
		return "../static/index.html";
    }
}
