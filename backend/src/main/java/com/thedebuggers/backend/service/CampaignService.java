package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.Campaign;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.CampaignReqDto;
import com.thedebuggers.backend.dto.CampaignResDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CampaignService {
    CampaignResDto registCampaign(CampaignReqDto campaignReqDto, long communityNo, User user, MultipartFile imageFile);

    List<CampaignResDto> getCampaignList(long communityNo);

    List<User> getCampaignMember(long campaignNo);

    CampaignResDto getCampaign(long campaignNo);

    CampaignResDto joinCampaign(long campaignNo, User user);

    CampaignResDto updateCampaign(CampaignReqDto campaignReqDto, long campaignNo, User user, MultipartFile imageFile);

    boolean deleteCampaign(User user, long campaignNo);
}
