package com.demo.demo.Board;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; //글번호

    private String userId; //작성자

    private String title;

    @Column(length = 40)
    private String category; //카테고리

    @Column(length = 600)
    private String content; //내용

    private String imgName; //이미지

    private String imgPath; //이미지 경로

    @CreationTimestamp
    private LocalDateTime createDateTime; //생성 시간

    @CreationTimestamp
    private LocalDateTime updateDateTime; //수정 시간
}
