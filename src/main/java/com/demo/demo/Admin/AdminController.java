package com.demo.demo.Admin;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@ControllerAdvice
@RequestMapping("/admin")
public class AdminController {
    @GetMapping("")
    public String admin_main(){
        return "Admin/admin_main";
    }

    @GetMapping("/page")
    public String admin_page(){
        return "Admin/admin_page";
    }

    @GetMapping("/board")
    public String admin_board(){
        return "Admin/admin_board";
    }

    @GetMapping("/banner")
    public String admin_banner(){
        return "Admin/admin_banner";
    }
}
