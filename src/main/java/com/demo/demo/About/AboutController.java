package com.demo.demo.About;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AboutController {
    @GetMapping("/company")
    public String company(){
        return "About/company";
    }

    @GetMapping("/partner")
    public String partner(){
        return "About/partner";
    }
}
