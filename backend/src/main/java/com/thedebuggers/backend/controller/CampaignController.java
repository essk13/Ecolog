package com.thedebuggers.backend.controller;

import com.thedebuggers.backend.auth.ELUserDetails;
import com.thedebuggers.backend.domain.entity.Campaign;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.CampaignReqDto;
import com.thedebuggers.backend.dto.CampaignResDto;
import com.thedebuggers.backend.service.CampaignService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.stream.Collectors;

@Api(value = "캠페인 API", tags = "Campaign")
@Slf4j
@RequestMapping("/api/v1/community/{communityNo}/campaign")
@RequiredArgsConstructor
@RestController
public class CampaignController {

    private final CampaignService campaignService;

    @PostMapping
    @ApiOperation(value = "캠페인 모집 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<?> registCampaign(
            @RequestBody CampaignReqDto campaignReqDto,
            @PathVariable long communityNo,
            Authentication authentication
    ){
        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        Campaign campaign = null;

        try {
            campaign = campaignService.registCampaign(campaignReqDto, communityNo, user);
        }catch (Exception e) {
            return ResponseEntity.ok("Failed");
        }
        long campaignNo = campaign.getNo();
        List<User> userList = campaignService.getCampaignMember(campaignNo);

        return ResponseEntity.ok(CampaignResDto.of(campaign, userList));
    }

    @GetMapping
    @ApiOperation(value = "캠페인 모집 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<List<CampaignResDto>> getCampaignList(
            @PathVariable long communityNo
    ) {
        List<Campaign> campaignList = campaignService.getCampaignList(communityNo);

        List<CampaignResDto> result = campaignList.stream().map(campaign -> {
            List<User> userList = campaignService.getCampaignMember(campaign.getNo());
            return CampaignResDto.of(campaign, userList);
        }).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    @GetMapping("/{campaignNo}")
    @ApiOperation(value = "켐페인 모집 상세 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<CampaignResDto> getCampaign(
            @PathVariable long campaignNo
    ) {
        Campaign campaign = campaignService.getCampaign(campaignNo);
        List<User> userList = campaignService.getCampaignMember(campaignNo);

        return ResponseEntity.ok(CampaignResDto.of(campaign, userList));
    }

    @PostMapping("/{campaignNo}")
    @ApiOperation(value = "캠페인 모집 참가 / 참가취소")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<CampaignResDto> joinCampaign(
            @PathVariable long campaignNo,
            Authentication authentication
    ) {
        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        long userNo = user.getNo();
        Campaign campaign = campaignService.getCampaign(campaignNo);

        campaignService.joinCampaign(campaign, user);
        List<User> userList = campaignService.getCampaignMember(campaignNo);

        return ResponseEntity.ok(CampaignResDto.of(campaign, userList));
    }

    @PutMapping("/{campaignNo}")
    @ApiOperation(value = "캠페인 모집 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<CampaignResDto> updateCampaign(
            @RequestPart(value = "campaign_info") CampaignReqDto campaignReqDto,
            @RequestPart(value = "image", required = false) MultipartFile imageFile,
            @PathVariable long campaignNo,
            @ApiIgnore Authentication authentication
    ) {
        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        Campaign campaign = campaignService.updateCampaign(campaignReqDto, campaignNo, user, imageFile);
        List<User> userList = campaignService.getCampaignMember(campaignNo);

        return ResponseEntity.ok(CampaignResDto.of(campaign, userList));
    }

    @DeleteMapping("/{campaignNo}")
    @ApiOperation(value = "캠페인 모집 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<Boolean> deleteCampaign(
            @PathVariable long campaignNo,
            @ApiIgnore Authentication authentication
    ) {
        ELUserDetails userDetails = (ELUserDetails)authentication.getDetails();
        User user = userDetails.getUser();

        boolean result = campaignService.deleteCampaign(user, campaignNo);

        return ResponseEntity.ok(result);
    }

}
