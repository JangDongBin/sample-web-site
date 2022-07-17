package com.demo.demo.Board;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    //글쓰기, 조회, 수정.
    public void detailProcess(Model model, Long id) {
        if (id != null) {
            Optional<Board> board = boardRepository.findById(id);

            if (board.isPresent()) {
                BoardForm boardForm = BoardForm.builder()
                        .id(board.get().getId())
                        .useridField(board.get().getUserid())
                        .CategoryField(board.get().getCategory())
                        .ContentField(board.get().getContent())
                        .build();
                        
                model.addAttribute("boardForm", boardForm);
            }
        } else {
            model.addAttribute("boardForm", new BoardForm());
        }
    }

    public Board updateProcess(BoardForm boardForm) {
        Board newBoard;

        if (boardForm.getId() == null) {
            newBoard = Board.builder()
                    .id(null)
                    .userid(boardForm.getUseridField())
                    .category(boardForm.getCategoryField())
                    .content(boardForm.getContentField())
                    .build();
        } else {
            newBoard = Board.builder()
                    .id(boardForm.getId())
                    .userid(boardForm.getUseridField())
                    .category(boardForm.getCategoryField())
                    .content(boardForm.getContentField())
                    .build();
        }

        boardRepository.save(newBoard);
        return newBoard;
    }

}