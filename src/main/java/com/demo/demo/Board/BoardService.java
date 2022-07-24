package com.demo.demo.Board;

import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    public void boardView(Model model, Long id){
        Optional<Board> board = boardRepository.findById(id);
        Board viewBoard = board.get();

        model.addAttribute("board", viewBoard);
        model.addAttribute("boardid", id);
    }

    public void newBoardForm(Model model, Long id){
        model.addAttribute("arg0", new BoardForm());
    }
    
    public Board boardInsert(BoardForm boardForm, MultipartFile imgFile){
        String oriImgName = imgFile.getOriginalFilename();
        String imgName = "";
        String projectPath = System.getProperty("user.dir") + "/src/main/resources/static/files/";

        // UUID 를 이용하여 파일명 새로 생성
        // UUID - 서로 다른 객체들을 구별하기 위한 클래스
        UUID uuid = UUID.randomUUID();
        String savedFileName = uuid + "_" + oriImgName; // 저장될 파일명
        imgName = savedFileName;
        File saveFile = new File(projectPath, imgName);
        try {
            imgFile.transferTo(saveFile);
        } catch (IllegalStateException | IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        Board newBoard;

        if (boardForm.getId() == null) {
            newBoard = Board.builder()
                    .id(null)
                    .userId(boardForm.getUserId())
                    .title(boardForm.getTitle())
                    .category(boardForm.getCategory())
                    .content(boardForm.getContent())
                    .imgName(imgName)
                    .imgPath("/files/" + imgName)
                    .build();
        } else {
            newBoard = Board.builder()
                    .id(boardForm.getId())
                    .userId(boardForm.getUserId())
                    .title(boardForm.getTitle())
                    .category(boardForm.getCategory())
                    .content(boardForm.getContent())
                    .imgName(imgName)
                    .imgPath("/files/" + imgName)
                    .build();
        }
        boardRepository.save(newBoard);
        return newBoard;
    }
}