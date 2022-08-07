package com.demo.demo.Admin;

import java.io.File;
import java.time.LocalDate;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
    //private final 

    public AdminPopup insertPopup(AdminPopupForm adminPopupForm, MultipartFile imgFile) throws Exception{
        System.out.println("imgFile = " + imgFile);
        String imgName = "";
        File filePath = null;

        if(!imgFile.isEmpty()){
            String oriImgName = imgFile.getOriginalFilename();
            String projectPath = System.getProperty("user.dir") + "/src/main/resources/static/filses";
            filePath = new File(projectPath);
            // UUID 를 이용하여 파일명 새로 생성
            // UUID - 서로 다른 객체들을 구별하기 위한 클래스
            UUID uuid = UUID.randomUUID();
            String savedFileName = uuid + "_" + oriImgName; // 저장될 파일명
            imgName = savedFileName;
            File saveFile = new File(filePath.getAbsolutePath(), imgName);
            imgFile.transferTo(saveFile);
        }
        AdminPopup newAdminPopup;

        if(adminPopupForm.getId() == null){
            newAdminPopup = AdminPopup.builder()
                            .id(null)
                            .popupName(adminPopupForm.getPopupName())
                            .content(adminPopupForm.getContent())
                            .startDate(LocalDate.parse(adminPopupForm.getStartDate()))
                            .endDate(LocalDate.parse(adminPopupForm.getEndDate()))
                            .popupType(adminPopupForm.getPopupType())
                            .running(adminPopupForm.getRunning())
                            .imgName(imgName)
                            .imgPath("/files/" + imgName)
                            .build();
        }
        else{
            newAdminPopup = AdminPopup.builder()
                            .id(adminPopupForm.getId())
                            .popupName(adminPopupForm.getPopupName())
                            .content(adminPopupForm.getContent())
                            .startDate(LocalDate.parse(adminPopupForm.getStartDate()))
                            .endDate(LocalDate.parse(adminPopupForm.getEndDate()))
                            .popupType(adminPopupForm.getPopupType())
                            .running(adminPopupForm.getRunning())
                            .imgName(imgName)
                            .imgPath("/files/" + imgName)
                            .build();
        }
        //db에 save 남음.
        return newAdminPopup;
    }
}
