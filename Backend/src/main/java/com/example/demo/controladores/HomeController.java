@Controller
public class HomeController {
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("componentName", "Home");
        return "index";
    }
}
