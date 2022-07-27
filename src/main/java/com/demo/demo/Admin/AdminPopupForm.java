package com.demo.demo.Admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminPopupForm {
    private Long id;
    
    private String popupName;
    
    private String content;
    
    private String startDate;

    private String endDate;
    
    private String popupType;
    
    private String running;
    
    private String imgName;
    
    private String imgPath;
}
