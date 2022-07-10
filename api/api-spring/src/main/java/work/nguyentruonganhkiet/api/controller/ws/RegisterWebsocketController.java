package work.nguyentruonganhkiet.api.controller.ws;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class RegisterWebsocketController {

    @MessageMapping("/connected")
    @SendTo("/channel/connected")
    public String register(String name) {
        System.out.println(name);
        return "User Connected: " + name;
    }
}
