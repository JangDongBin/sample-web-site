package com.demo.demo.Car;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/carbrand")
public class CarController {
    @GetMapping("")
    public String CarBrandList(){
        return "Car/carBrandList";
    }
}
