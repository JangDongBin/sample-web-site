package com.demo.demo.Admin;

import java.io.File;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
    //private final 

    public AdminPopup insertPopup(AdminPopupForm adminPopupForm, MultipartFile imgFile) throws Exception{
        System.out.println("\n"+ adminPopupForm + "\n");
        
        String originalImageName = imgFile.getOriginalFilename();
        String imgName = "";
        String filePath = System.getProperty("user.dir") + "/src/main/resources/static/files/";

        // UUID 를 이용하여 파일명 새로 생성
        // UUID - 서로 다른 객체들을 구별하기 위한 클래스
        UUID uuid = UUID.randomUUID();
        String savedFileName = uuid + "_" + originalImageName; // 저장될 파일명
        imgName = savedFileName;
        File saveFile = new File(filePath, imgName);
        imgFile.transferTo(saveFile);
        AdminPopup newAdminPopup;

        if(adminPopupForm.getId() == null){
            newAdminPopup = AdminPopup.builder()
                            .id(null)
                            .popupName(adminPopupForm.getPopupName())
                            .content(adminPopupForm.getContent())
                            .startDateTime(adminPopupForm.getStartDateTime())
                            .endDateTime(adminPopupForm.getEndDateTime())
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
                            .startDateTime(adminPopupForm.getStartDateTime())
                            .endDateTime(adminPopupForm.getEndDateTime())
                            .popupType(adminPopupForm.getPopupType())
                            .running(adminPopupForm.getRunning())
                            .imgName(imgName)
                            .imgPath("/files/" + imgName)
                            .build();
        }

        return newAdminPopup;
    }
}
