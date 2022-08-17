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
    public String adminMain(Model model) {
        model.addAttribute("depth1", "home");
        model.addAttribute("depth2", "");
        return "Admin/adminMain";
    }

    @GetMapping("/menu")
    public String adminMenu() {
        return "Admin/adminMenu";
    }

    @GetMapping("/desgin")
    public String adminDesgin() {
        return "Admin/adminDesgin";
    }

    @GetMapping("/member")
    public String adminMember() {
        return "Admin/adminMember";
    }

    @GetMapping("/popup")
    public String adminPopup(Model model, @RequestParam(required = false) Long id) {
        model.addAttribute("popupSetting", new AdminPopupForm());
        return "Admin/adminPopup";
    }

    @PostMapping("/popup")
    public String adminPopupPost(AdminPopupForm adminPopupForm, @RequestParam(required = false) MultipartFile imgFile) throws Exception {
        System.out.println(imgFile);
        if (adminPopupForm.getPopupName() == null || adminPopupForm.getContent() == null || adminPopupForm.getStartDate() == null || 
            adminPopupForm.getEndDate() == null || adminPopupForm.getPopupType() == null || adminPopupForm.getRunning() == null) {
            return "redirect:/admin/popup";
        }
        //System.out.println(System.getProperty("user.dir") + "/src/main/resources/static/filses");
        AdminPopup adminPopup = adminService.insertPopup(adminPopupForm, imgFile);
        System.out.println(adminPopup);
        return "redirect:/admin";
    }

    @GetMapping("/board/list")
    public String adminBoardList(Model model) {
        model.addAttribute("depth1", "board");
        model.addAttribute("depth2", "");
        return "Admin/board/list";
    }

    @GetMapping("/board/view")
    public String adminBoardView(Model model) {
        model.addAttribute("depth1", "board");
        model.addAttribute("depth2", "");
        return "Admin/board/view";
    }

    @GetMapping("/posting")
    public String adminPosting() {
        return "Admin/adminPosting";
    }

    @GetMapping("/login")
    public String adminLogin() {
        return "Admin/adminLogin";
    }

    @GetMapping("/consult")
    public String adminConsult(Model model) {
        model.addAttribute("depth1", "consult");
        model.addAttribute("depth2", "");
        return "Admin/adminConsult";
    }
}
