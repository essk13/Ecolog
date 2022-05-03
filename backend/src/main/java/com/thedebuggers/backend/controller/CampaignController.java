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

        return ResponseEntity.ok(CampaignResDto.of(campaign));
    }

}
