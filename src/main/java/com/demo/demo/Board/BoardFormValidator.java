package com.demo.demo.Board;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BoardFormValidator  implements Validator{
    private final BoardRepository BoardRepository;

    @Override
    public boolean supports(Class<?> clazz) {
        return clazz.isAssignableFrom(BoardForm.class);
    }

    @Override
    public void validate(Object target, Errors errors) {
    } 
}
