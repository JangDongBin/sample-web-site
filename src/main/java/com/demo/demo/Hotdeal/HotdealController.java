package com.demo.demo.Hotdeal;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HotdealController {
    @GetMapping("/hotdeal")
    public String hotdeal(){
        return "hotdeal/hotdeal";
    }
}
