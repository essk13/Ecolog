package com.thedebuggers.backend.controller;

import com.thedebuggers.backend.auth.ELUserDetails;
import com.thedebuggers.backend.domain.entity.Comment;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.CommentReqDto;
import com.thedebuggers.backend.dto.CommentResDto;
import com.thedebuggers.backend.service.CommentService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Api(value = "댓글 관련 API", tags = "Comment")
@Slf4j
@RequestMapping("/api/v1/community/{communityNo}/post/{postNo}/comment")
@RequiredArgsConstructor
@RestController
public class CommentController {

    private final CommentService commentService;

    @GetMapping
    @ApiOperation(value = "댓글 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<List<CommentResDto>> getCommentList(@ApiParam(defaultValue = "1") @PathVariable long postNo) {
        List<Comment> commentList = commentService.getCommentList(postNo);

        List<CommentResDto> result = commentList.stream().map(CommentResDto::of).collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @PostMapping
    @ApiOperation(value = "댓글 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<String> registComment(@ApiParam(defaultValue = "1") @PathVariable long postNo, @RequestBody CommentReqDto commentDto, Authentication authentication) {
        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        try {
            commentService.registComment(postNo, user, commentDto);
        }catch (Exception e){
            return ResponseEntity.ok("Failed");
        }
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/{commentNo}")
    @ApiOperation(value = "댓글 상세 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<?> getCommentDetail(@ApiParam(defaultValue = "1") @PathVariable long commentNo) {
        Comment comment = null;
        try {
            comment = commentService.getCommentByNo(commentNo);
        }catch (Exception e){
            return ResponseEntity.ok("Failed");
        }
        return ResponseEntity.ok(CommentResDto.of(comment));
    }
    @PutMapping("/{commentNo}")
    @ApiOperation(value = "댓글 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<String> updateComment(@ApiParam(defaultValue = "1") @PathVariable long commentNo, @RequestBody CommentReqDto commentDto, Authentication authentication) {
        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        try {
            commentService.updateComment(commentNo, commentDto, user);
        }catch (Exception e){
            return ResponseEntity.ok("Failed");
        }
        return ResponseEntity.ok("Success");
    }
    @DeleteMapping("/{commentNo}")
    @ApiOperation(value = "댓글 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<String> deleteComment(@ApiParam(defaultValue = "1") @PathVariable long commentNo, Authentication authentication) {
        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        try {
            commentService.deleteComment(commentNo,user);
        }catch (Exception e){
            return ResponseEntity.ok("Failed");
        }
        return ResponseEntity.ok("Success");
    }
}
