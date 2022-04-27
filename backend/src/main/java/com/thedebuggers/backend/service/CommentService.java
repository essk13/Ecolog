package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> getCommentList(long postNo);
}
