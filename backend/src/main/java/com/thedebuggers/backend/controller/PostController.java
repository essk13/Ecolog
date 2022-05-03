package com.thedebuggers.backend.controller;

import com.thedebuggers.backend.auth.ELUserDetails;
import com.thedebuggers.backend.domain.entity.Post;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.PostReqDto;
import com.thedebuggers.backend.dto.PostResDto;
import com.thedebuggers.backend.service.PostService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.stream.Collectors;

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
    private ResponseEntity<PostResDto> registPost(@ApiIgnore Authentication authentication,
                                                  @ApiParam(defaultValue = "1") @PathVariable long communityNo,
                                                  @RequestBody PostReqDto postReqDto) {
        ELUserDetails userDetails = (ELUserDetails)authentication.getDetails();
        User user = userDetails.getUser();
        Post post = postService.registPost(user, postReqDto, communityNo);
        return ResponseEntity.ok(PostResDto.of(post));
    }

    @GetMapping
    @ApiOperation(value = "게시물 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<List<PostResDto>> getPostList(
            @ApiParam(value = "0 : 전체 커뮤니티의 공개 게시물, 1~ : 해당 커뮤니티의 전체 게시물", defaultValue = "1") @PathVariable long communityNo) {
        List<PostResDto> postList;

        if (communityNo == 0)
            postList = postService.getAllPost().stream().map(PostResDto::of).collect(Collectors.toList());
        else
            postList = postService.getPostList(communityNo).stream().map(PostResDto::of).collect(Collectors.toList());;

        return ResponseEntity.ok(postList);
    }

    @GetMapping("/{postNo}")
    @ApiOperation(value = "게시물 상세 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<PostResDto> getPost(@ApiIgnore Authentication authentication,
                                               @ApiParam(defaultValue = "1") @PathVariable long postNo) throws Exception {
        ELUserDetails userDetails = (ELUserDetails)authentication.getDetails();
        User user = userDetails.getUser();
        Post post = postService.getPost(user, postNo);
        return ResponseEntity.ok(PostResDto.of(post));
    }

    @PutMapping("/{postNo}")
    @ApiOperation(value = "게시글 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<Boolean> modifyPost(@ApiIgnore Authentication authentication,
                                               @PathVariable long postNo, @RequestBody PostReqDto postDto) {
        ELUserDetails userDetails = (ELUserDetails)authentication.getDetails();
        User user = userDetails.getUser();
        boolean result = postService.modifyPost(user, postNo, postDto);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{postNo}")
    @ApiOperation(value = "게시글 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<Boolean> deletePost(@ApiIgnore Authentication authentication,
                                               @PathVariable long postNo) {
        ELUserDetails userDetails = (ELUserDetails)authentication.getDetails();
        User user = userDetails.getUser();
        boolean result = postService.deletePost(user, postNo);
        return ResponseEntity.ok(result);
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
        boolean result = postService.likePost(postNo, userNo);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/mine")
    @ApiOperation(value = "커뮤니티 내 게시물 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<List<PostResDto>> getMyPostList(
            @ApiParam(defaultValue = "1") @PathVariable long communityNo, Authentication authentication) {
        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        long userNo = userDetails.getUser().getNo();

        List<PostResDto> postList = postService.getMyPostListInCommunity(communityNo, userNo).stream().map(PostResDto::of).collect(Collectors.toList());;

        return ResponseEntity.ok(postList);
    }
}


