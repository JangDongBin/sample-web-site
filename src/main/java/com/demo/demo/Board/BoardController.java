package com.demo.demo.Board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {
    private final BoardRepository boardRepository;

    @GetMapping("")
    public String boardList(Model model, @PageableDefault(size = 20) Pageable pageable, @RequestParam(required = false, defaultValue = "") String searchString){
        Page<Board> boardPagingList = boardRepository.findByUseridContainingOrTitleContainingOrderByIdDesc(searchString, searchString, pageable);

        int startPage = Math.max(1, (boardPagingList.getPageable().getPageNumber() / pageable.getPageSize()) * pageable.getPageSize() + 1);
        int endPage = Math.min(boardPagingList.getTotalPages(), startPage + pageable.getPageSize() - 1);

        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);
        model.addAttribute("list", boardPagingList);

        model.addAttribute("searchString", searchString);
        model.addAttribute("title", "리스트");

        return "Board/boardList";
    }
    
    
}
