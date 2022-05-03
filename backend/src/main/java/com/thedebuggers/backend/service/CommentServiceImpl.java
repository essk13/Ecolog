package com.thedebuggers.backend.service;

import com.thedebuggers.backend.common.exception.CustomException;
import com.thedebuggers.backend.common.util.ErrorCode;
import com.thedebuggers.backend.domain.entity.Comment;
import com.thedebuggers.backend.domain.entity.Post;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.domain.repository.CommentRepository;
import com.thedebuggers.backend.dto.CommentReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;
    private final PostService postService;

    @Override
    public List<Comment> getCommentList(long postNo) {
        return commentRepository.findByPostNo(postNo);
    }

    @Override
    public void registComment(long postNo, User user, CommentReqDto commentDto) {
        Post post = postService.getPost(postNo);

        if (post == null) throw new CustomException(ErrorCode.NOT_FOUND);

        Comment comment = Comment.builder()
                .post(post)
                .user(user)
                .content(commentDto.getContent())
                .build();

        commentRepository.save(comment);
    }

    @Override
    public Comment getCommentByNo(long commentNo) {
        return commentRepository.findByNo(commentNo).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
    }

    @Override
    public void updateComment(long commentNo, CommentReqDto commentDto, User user){

        Comment comment = commentRepository.findByNo(commentNo).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));

        if (comment.getUser().getNo() != user.getNo()) throw new CustomException(ErrorCode.METHOD_NOT_ALLOWED);

        comment.setContent(commentDto.getContent());

        commentRepository.save(comment);
    }

    @Override
    public void deleteComment(long commentNo, User user) {

        Comment comment = commentRepository.findByNo(commentNo).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));

        if (comment.getUser().getNo() != user.getNo()) throw new CustomException(ErrorCode.METHOD_NOT_ALLOWED);

        commentRepository.delete(comment);
    }

    @Override
    public List<Comment> getUserCommentsInCommunity(long communityNo, long userNo) {
        return commentRepository.getUserCommentsInCommunity(communityNo, userNo);
    }
}
