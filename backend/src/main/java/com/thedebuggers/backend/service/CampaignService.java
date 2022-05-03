package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.Campaign;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.CampaignReqDto;

public interface CampaignService {
    Campaign registCampaign(CampaignReqDto campaignReqDto, long communityNo, User user) throws Exception;
}
