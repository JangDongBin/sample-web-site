package com.demo.demo.Board;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardForm {
    
    private Long id;
    @NotBlank
    @Length(min = 3, max = 30)
    @Pattern(regexp = "^[a-z0-9_-]{3,20}$")
    private String userId;

    @NotBlank
    @Length(min = 3, max = 20)
    private String title;

    @NotBlank
    @Length(min = 3, max = 20)
    private String category;

    @NotBlank
    @Length(min = 5)
    private String content;

    @NotBlank
    private String imgName;

    private String imgPath;

}
