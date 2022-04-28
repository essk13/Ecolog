package com.thedebuggers.backend.controller;

import com.thedebuggers.backend.auth.ELUserDetails;
import com.thedebuggers.backend.domain.entity.Post;
import com.thedebuggers.backend.dto.PostDto;
import com.thedebuggers.backend.service.PostService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "커뮤니티 게시물 관련 API", tags = "Post")
@Slf4j
@RequestMapping("/api/v1/community/{communityNo}/post")
@RequiredArgsConstructor
@RestController
public class PostController {

    private final PostService postService;

    @PostMapping
    @ApiOperation(value = "게시물 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<Boolean> registPost(@ApiParam(defaultValue = "1") @PathVariable long communityNo,
                                               @ApiParam("communityNo, createdAt은 사용되지 않음.") @RequestBody PostDto postDto) {
        postDto.setCommunityNo(communityNo);
        if (!postService.registPost(postDto)) {
           return ResponseEntity.status(404).body(false);
        }
        return ResponseEntity.ok(true);
    }

    @GetMapping
    @ApiOperation(value = "게시물 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<List<Post>> getPostList(
            @ApiParam(value = "0 : 전체 커뮤니티의 공개 게시물, 1~ : 해당 커뮤니티의 전체 게시물", defaultValue = "1") @PathVariable long communityNo) {
        List<Post> postList;
        if (communityNo == 0) {
            postList = postService.getAllPost();
        }
        else {
            postList = postService.getPostList(communityNo);
        }
        if (postList == null) {
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.ok(postList);
    }

    @GetMapping("/{postNo}")
    @ApiOperation(value = "게시물 상세 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<Post> getPost(@ApiParam(defaultValue = "1") @PathVariable long communityNo,
                                         @ApiParam(defaultValue = "1") @PathVariable long postNo) {
        Post post = postService.getPost(postNo);
        if (post == null) {
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.ok(post);
    }

    @PutMapping("/{postNo}")
    @ApiOperation(value = "게시글 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<Boolean> modifyPost(@PathVariable long postNo,
                                            @ApiParam("title, content, image, open 사용") @RequestBody PostDto postDto) {
        if (!postService.modifyPost(postNo, postDto)) {
            return ResponseEntity.status(404).body(false);
        }
        return ResponseEntity.ok(true);
    }

    @DeleteMapping("/{postNo}")
    @ApiOperation(value = "게시글 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<Boolean> deletePost(@PathVariable long postNo) {
        if (!postService.deletePost(postNo)) {
            return ResponseEntity.status(404).body(false);
        }
        return ResponseEntity.ok(true);
    }

    @PostMapping("/{postNo}/like")
    @ApiOperation(value = "게시글 좋아요 / 취소")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<Boolean> likePost(@ApiIgnore Authentication authentication,
                                             @PathVariable long postNo) {
        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        long userNo = userDetails.getUser().getNo();
        if (!postService.likePost(postNo, userNo)) {
            return ResponseEntity.status(404).body(false);
        }
        return ResponseEntity.ok(true);
    }
}


