package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.Campaign;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.CampaignReqDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CampaignService {
    Campaign registCampaign(CampaignReqDto campaignReqDto, long communityNo, User user) throws Exception;

    List<Campaign> getCampaignList(long communityNo);

    List<User> getCampaignMember(long campaignNo);

    Campaign getCampaign(long campaignNo);

    void joinCampaign(Campaign campaign, User user);

    Campaign updateCampaign(CampaignReqDto campaignReqDto, long campaignNo, User user, MultipartFile imageFile);

    boolean deleteCampaign(User user, long campaignNo);
}
