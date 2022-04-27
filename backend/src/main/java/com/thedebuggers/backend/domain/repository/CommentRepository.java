package com.thedebuggers.backend.domain.repository;

import com.thedebuggers.backend.domain.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByPostNo(@Param(value = "no") long postNo);
}
