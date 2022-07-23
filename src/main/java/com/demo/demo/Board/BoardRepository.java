package com.demo.demo.Board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long>{
    Page<Board> findByCategoryOrderByIdDesc(String searchString, Pageable pageable);
    Page<Board> findAll(Pageable pageable);
}
