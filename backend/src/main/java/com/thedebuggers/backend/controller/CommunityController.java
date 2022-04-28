package com.thedebuggers.backend.controller;

import com.thedebuggers.backend.domain.entity.Community;
import com.thedebuggers.backend.dto.CommunityDto;
import com.thedebuggers.backend.service.CommunityService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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
    private ResponseEntity<List<Community>> getCommunityList(

    ){
        List<Community> result = communityService.getCommunityList();

//        Community res = Community.builder().title("ex").description("ex2").build();

        return ResponseEntity.ok(result);
    }

    @GetMapping("/{no}")
    @ApiOperation(value = "커뮤니티 상세 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<Community> getCommunity(
            @ApiParam("커뮤니티 번호") @PathVariable long no
    ) {
        Community result = communityService.getCommunity(no);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    @ApiOperation(value = "커뮤니티 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<Boolean> registCommunity(
        @RequestBody CommunityDto communityDto
    ){
        boolean result = communityService.registCommunity(communityDto);
        return ResponseEntity.ok(result);
    }

}
