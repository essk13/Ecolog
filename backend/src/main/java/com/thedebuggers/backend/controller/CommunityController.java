package com.thedebuggers.backend.controller;

import com.thedebuggers.backend.auth.ELUserDetails;
import com.thedebuggers.backend.domain.entity.Community;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.CommunityDto;
import com.thedebuggers.backend.dto.CommunityResDto;
import com.thedebuggers.backend.dto.BaseUserInfoResDto;
import com.thedebuggers.backend.service.CommunityService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.stream.Collectors;


@Api(value = "커뮤니티 API", tags = {"Community"})
@Slf4j
@RequestMapping("/api/v1/community")
@RequiredArgsConstructor
@RestController
public class CommunityController {

    private final CommunityService communityService;

    @GetMapping
    @ApiOperation(value = "커뮤니티 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<List<CommunityResDto>> getCommunityList(

    ){
        List<Community> communityList = communityService.getCommunityList();

        List<CommunityResDto> result = communityList.stream().map(CommunityResDto::of).collect(Collectors.toList());
//        Community res = Community.builder().title("ex").description("ex2").build();

        return ResponseEntity.ok(result);
    }

    @PostMapping
    @ApiOperation(value = "커뮤니티 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<CommunityResDto> registCommunity(
            @RequestBody CommunityDto communityDto,
            Authentication authentication
    ){
        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        long userNo = user.getNo();

        Community community = communityService.registCommunity(communityDto, userNo);

        return ResponseEntity.ok(CommunityResDto.of(community));
    }

    @GetMapping("/{no}")
    @ApiOperation(value = "커뮤니티 상세 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<CommunityResDto> getCommunity(
            @ApiParam("커뮤니티 번호") @PathVariable long no
    ) {
        Community community = communityService.getCommunity(no);
        return ResponseEntity.ok(CommunityResDto.of(community));
    }


    @PostMapping("/{no}")
    @ApiOperation(value = "커뮤니티 가입")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<CommunityResDto> joinCommunity(
            @ApiParam("커뮤니티 번호") @PathVariable long no,
            Authentication authentication
    ) {
        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        User user = userDetails.getUser();


        Community community = communityService.joinCommunity(no, user);
        return ResponseEntity.ok(CommunityResDto.of(community));
    }

    @PutMapping("/{communityNo}")
    @ApiOperation(value = "커뮤니티 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<CommunityResDto> updateCommunity(
        @ApiParam("커뮤니티 번호") @PathVariable long communityNo,
        @RequestBody CommunityDto communityDto,
        Authentication authentication
    ){
        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        Community community = communityService.updateCommunity(communityNo, user, communityDto);
        return ResponseEntity.ok(CommunityResDto.of(community));
    }

    @DeleteMapping("/{communityNo}")
    @ApiOperation(value = "커뮤니티 탈퇴")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<String> quitCommunity(
            @ApiParam("커뮤니티 번호") @PathVariable long communityNo,
            Authentication authentication
    ) {
        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        long userNo = user.getNo();

        try {
            communityService.quitCommunity(communityNo, userNo);
        }catch (Exception e) {
            return ResponseEntity.ok("Failed");
        }
        return ResponseEntity.ok("Success");
    }


    @GetMapping("/{no}/member")
    @ApiOperation(value = "커뮤니티 멤버 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<List<BaseUserInfoResDto>> getCommunityMember(
            @ApiParam("커뮤니티 번호") @PathVariable long no
    ){
        List<User> result = communityService.getCommunityMember(no);
        List<BaseUserInfoResDto> profileResDtoList = result.stream().map(BaseUserInfoResDto::of).collect(Collectors.toList());
        return ResponseEntity.ok(profileResDtoList);
    }

    @DeleteMapping("/{communityNo}/delete")
    @ApiOperation(value = "커뮤니티 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<String> deleteCommunity(
            @ApiParam("커뮤니티 번호") @PathVariable long communityNo,
            Authentication authentication
    ) {
        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        try {
            communityService.deleteCommunity(communityNo, user);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.ok("Failed");
        }
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/mine")
    @ApiOperation(value = "내가 가입한 커뮤니티 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<List<CommunityResDto>> getMyCommunityList(@ApiIgnore Authentication authentication){
        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        long userNo = userDetails.getUser().getNo();

        List<Community> communityList = communityService.getMyCommunityList(userNo);

        List<CommunityResDto> result = communityList.stream().map(CommunityResDto::of).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    @GetMapping("/popular")
    @ApiOperation(value = "인기 커뮤니티 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<List<CommunityResDto>> getPopularCommunityList(

    ) {
        List<Community> communityList = communityService.getPopularCommunityList();

        return ResponseEntity.ok(communityList.stream().map(CommunityResDto::of).collect(Collectors.toList()));
    }

}
