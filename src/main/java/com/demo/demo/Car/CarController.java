package com.demo.demo.Car;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/carbrand")
public class CarController {
    @GetMapping("")
    public String carBrandList(){
        return "car/carBrandList";
    }

    @GetMapping("/brand")
    public String carList(@RequestParam("brand") String brand){ //brand에 따른 정보들 불러와야됨.
        System.out.println("\n\n" + brand);

        //db? api?
        return "car/carList";
    }

    @GetMapping("/car")
    public String carInfo(@RequestParam("car") String car){ //차량정보. //차량 제원 불러오기.
        System.out.println("\n\n"+car);
        return "car/carInfo";
    }
}
