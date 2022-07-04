package com.demo.demo.Service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EstimateForm {
    private Long id;
    private String name;
    private String phone_number;
    private String category;
    private String purchase;
    private String time;
    private String brand;
    private String model_name;
    private String inquiry;
}
