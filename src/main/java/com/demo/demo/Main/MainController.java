package com.demo.demo.Main;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.demo.demo.Service.EstimateForm;


@Controller
@RequestMapping("/")
public class MainController {
    @GetMapping("/")
    public String index(Model model){
        model.addAttribute("Estimate", new EstimateForm());
        return "index";
    }
}
