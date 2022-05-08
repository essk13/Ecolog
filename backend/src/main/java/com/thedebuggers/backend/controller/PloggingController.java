package com.thedebuggers.backend.controller;

import com.thedebuggers.backend.auth.ELUserDetails;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.PloggingReqDto;
import com.thedebuggers.backend.dto.PloggingResDto;
import com.thedebuggers.backend.dto.RankingResDto;
import com.thedebuggers.backend.service.PloggingService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "플로깅 관련 API", tags = "Plogging")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/plogging")
@RestController
public class PloggingController {

    private final PloggingService ploggingService;

    @PostMapping
    @ApiOperation(value = "플로깅 기록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<PloggingResDto> registPlogging(@ApiIgnore Authentication authentication,
                                                          @RequestPart(value = "plogging_info") PloggingReqDto ploggingReqDto,
                                                          @RequestPart(value = "images") @ApiParam(value = "결과, 경로 순으로 업로드") List<MultipartFile> imageFileList) {
        ELUserDetails userDetails = (ELUserDetails)authentication.getDetails();
        User user = userDetails.getUser();
        PloggingResDto ploggingResDto = ploggingService.registPlogging(user, ploggingReqDto, imageFileList);
        return ResponseEntity.ok(ploggingResDto);
    }

    @GetMapping("/{userNo}")
    @ApiOperation(value = "플로깅 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<List<PloggingResDto>> getPloggingList(@PathVariable long userNo) {
        List<PloggingResDto> ploggingList = ploggingService.getPloggingList(userNo);
        return ResponseEntity.ok(ploggingList);
    }

    @GetMapping("/info/{ploggingNo}")
    @ApiOperation(value = "플로깅 상세 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<PloggingResDto> getPlogging(@PathVariable long ploggingNo) {
        PloggingResDto ploggingResDto = ploggingService.getPlogging(ploggingNo);
        return ResponseEntity.ok(ploggingResDto);
    }

    @GetMapping("/rank/time")
    @ApiOperation(value = "플로깅 기간 별 랭킹")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<List<RankingResDto>> getRankingByTime(@ApiParam(value = "입력 키워드: all, month, week") @RequestParam String type) {
        List<RankingResDto> rankingResDtoList = ploggingService.getRankingByTime(type);
        return ResponseEntity.ok(rankingResDtoList);
    }

    @GetMapping("/rank/follow")
    @ApiOperation(value = "플로깅 지인 랭킹")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<List<RankingResDto>> getRankingByFollow(@ApiIgnore Authentication authentication) {
        ELUserDetails userDetails = (ELUserDetails)authentication.getDetails();
        User user = userDetails.getUser();
        List<RankingResDto> rankingResDtoList = ploggingService.getRankingByFollow(user);
        return ResponseEntity.ok(rankingResDtoList);
    }

    @GetMapping("/rank/region")
    @ApiOperation(value = "플로깅 지역 랭킹")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<List<RankingResDto>> getRankingByRegion(@ApiIgnore Authentication authentication,
                                                                   @ApiParam(value = "지역 이름", defaultValue = "구미") @RequestParam String region) {
        ELUserDetails userDetails = (ELUserDetails)authentication.getDetails();
        User user = userDetails.getUser();
        List<RankingResDto> rankingResDtoList = ploggingService.getRankingByRegion(user);
        return ResponseEntity.ok(rankingResDtoList);
    }

    @GetMapping("/region")
    @ApiOperation(value = "플로깅 지역 별 진행 상황 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<?> getProgressByRegion() {
        return null;
    }
}
