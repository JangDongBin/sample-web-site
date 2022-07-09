package com.demo.demo.Board;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    public void detailProcess(Model model, Long id) {
        if (id != null) {
            Optional<Board> board = boardRepository.findById(id);

            if (board.isPresent()) {
                BoardForm boardForm = BoardForm.builder()
                        .id(board.get().getId())
                        .useridField(board.get().getUserid())
                        .TitleField(board.get().getTitle())
                        .ContentField(board.get().getContent())
                        .build();
                        
                model.addAttribute("boardForm", boardForm);
            }
        } else {
            model.addAttribute("boardForm", new BoardForm());
        }
    }
}