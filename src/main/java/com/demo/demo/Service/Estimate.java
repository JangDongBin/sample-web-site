package com.demo.demo.Service;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


//DB에 밀어 넣을 정보들.
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Estimate {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
