package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.Comment;
import com.thedebuggers.backend.domain.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;

    @Override
    public List<Comment> getCommentList(long postNo) {
        return commentRepository.findByPostNo(postNo);
    }
}
