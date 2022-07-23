package com.demo.demo.Admin;

import javax.validation.Valid;

import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.demo.demo.Board.Board;
import com.demo.demo.Board.BoardForm;
import com.demo.demo.Board.BoardFormValidator;
import com.demo.demo.Board.BoardRepository;
import com.demo.demo.Board.BoardService;

import lombok.RequiredArgsConstructor;

@ControllerAdvice
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    private final BoardRepository boardRepository;
    private final BoardService boardService;
    private final BoardFormValidator boardFormValidator;


    @InitBinder("boardForm")
    public void InitBinder(WebDataBinder webDataBinder) {
        webDataBinder.addValidators(boardFormValidator);
    }


    @GetMapping("")
    public String admin_main(){
        return "Admin/admin_main";
    }

    @GetMapping("/page")
    public String admin_page(){
        return "Admin/admin_page";
    }

    
    //관리자 글쓰기
    @GetMapping("/board")
    public String admin_board(Model model, @RequestParam(required = false) Long id){
        boardService.newBoardForm(model, id);
        return "Admin/admin_board";
    }

    @PostMapping("/board-add")
    public String Post_AddBoard(BoardForm boardForm, MultipartFile imgFile, Model model) {
        Board newbBoard = boardService.boardInsert(boardForm, imgFile);
        return "redirect:/board/detail-board?id=" + newbBoard.getId();
        
    }

    @GetMapping("/banner")
    public String admin_banner(){
        return "Admin/admin_banner";
    }
}
