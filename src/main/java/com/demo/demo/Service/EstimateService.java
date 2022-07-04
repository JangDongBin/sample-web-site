package com.demo.demo.Service;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EstimateService {
    public void estimate(Model model){
        model.addAttribute("estimateForm", new EstimateForm());
    }
}
