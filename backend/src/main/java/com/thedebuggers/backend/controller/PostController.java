package com.thedebuggers.backend.controller;

import com.thedebuggers.backend.domain.entity.Post;
import com.thedebuggers.backend.dto.PostDto;
import com.thedebuggers.backend.service.PostService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

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
        boolean result = postService.registPost(postDto);
        return ResponseEntity.ok(result);
    }

    @GetMapping
    @ApiOperation(value = "게시물 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<List<Post>> getPostList(@ApiParam(defaultValue = "1") @PathVariable long communityNo) {
        List<Post> postList = postService.getPostList(communityNo);
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
        return ResponseEntity.ok(post);
    }
}


