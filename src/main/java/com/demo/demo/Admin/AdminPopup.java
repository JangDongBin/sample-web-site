package com.demo.demo.Admin;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
//@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminPopup {
    private Long id;
    
    private String popupName;
    
    private String content;
    
    private LocalDate startDate;
    
    private LocalDate endDate;
    
    private String popupType;
    
    private String running;
    
    private String imgName;
    
    private String imgPath;
}
