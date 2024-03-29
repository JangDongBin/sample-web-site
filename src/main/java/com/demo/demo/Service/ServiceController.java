package com.demo.demo.Service;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/service")
public class ServiceController {
    @GetMapping("/estimate")
    public String Estimate(Model model){
        model.addAttribute("Estimate", new EstimateForm());
        return "service/estimate";
    }
    
    //폼에서 데이터 입력 받고 수행 해야 할 서비스
    @PostMapping("/estimate")
    public String saveEstimate(Estimate estimate){
        System.out.println(estimate);
        return "redirect:/"; //수행 후 돌아가야 할 페이지
    }

    @GetMapping("/premium")
    public String premium(Model model){
        model.addAttribute("Estimate", new EstimateForm());
        return "service/premium";
    }
}
