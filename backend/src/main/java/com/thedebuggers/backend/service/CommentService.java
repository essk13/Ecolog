package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.Comment;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.CommentReqDto;
import com.thedebuggers.backend.dto.CommentResDto;

import java.util.List;

public interface CommentService {
    List<CommentResDto> getCommentList(long postNo);

    void registComment(long postNo, User user, CommentReqDto commentDto);

    CommentResDto getCommentByNo(long commentNo);

    void updateComment(long commentNo, CommentReqDto commentDto, User user);

    void deleteComment(long commentNo, User user);

    List<CommentResDto> getUserCommentsInCommunity(long communityNo, long userNo);
}
