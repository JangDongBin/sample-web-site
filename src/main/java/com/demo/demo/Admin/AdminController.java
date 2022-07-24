package com.demo.demo.Admin;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@ControllerAdvice
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;

    @GetMapping("")
    public String adminMain(){
        return "Admin/adminMain";
    }

    @GetMapping("/menu")
    public String adminMenu(){
        return "Admin/adminMenu";
    }

    @GetMapping("/desgin")
    public String adminDesgin(){
        return "Admin/adminDesgin";
    }

    @GetMapping("/member")
    public String adminMember(){
        return "Admin/adminMember";
    }

    @GetMapping("/popup")
    public String adminPopup(Model model, @RequestParam(required = false) Long id){
        model.addAttribute("popupSetting", new AdminPopupForm());
        return "Admin/adminPopup";
    }

    @PostMapping("/popup")
    public String adminPopupPost(Model model, Long id, AdminPopupForm adminPopupForm, MultipartFile imgFile) throws Exception{
        
        if(imgFile == null){
            if (adminPopupForm.getPopupName() == null || adminPopupForm.getContent() == null
                    || adminPopupForm.getStartDateTime() == null || adminPopupForm.getEndDateTime() == null
                    || adminPopupForm.getPopupType() == null || adminPopupForm.getRunning() == null
                    || imgFile == null) {
                        System.out.println("\n" + adminPopupForm + "\n");
                        System.out.println("\n" + imgFile + "\n");
                        return "redirect:/admin/popup";
            }
        }
        
        //System.out.println(adminPopupForm);
        AdminPopup adminPopup = adminService.insertPopup(adminPopupForm, imgFile);
        System.out.println(adminPopup);
        return "redirect:/admin";
    }

    @GetMapping("/board")
    public String adminBoard(){
        return "Admin/adminBoard";
    }

    @GetMapping("/posting")
    public String adminPosting(){
        return "Admin/adminPosting";
    }
}
