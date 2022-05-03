package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.Comment;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.CommentReqDto;

import java.util.List;

public interface CommentService {
    List<Comment> getCommentList(long postNo);

    void registComment(long postNo, User user, CommentReqDto commentDto);

    Comment getCommentByNo(long commentNo);

    void updateComment(long commentNo, CommentReqDto commentDto, User user);

    void deleteComment(long commentNo, User user);
}
