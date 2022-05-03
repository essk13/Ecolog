package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.Campaign;
import com.thedebuggers.backend.domain.entity.Community;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.domain.entity.UserCampaign;
import com.thedebuggers.backend.domain.repository.CampaignRespository;
import com.thedebuggers.backend.domain.repository.UserCampaignRepository;
import com.thedebuggers.backend.dto.CampaignReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CampaignServiceImpl implements CampaignService{

    private final CampaignRespository campaignRespository;
    private final CommunityService communityService;
    private final UserCampaignRepository userCampaignRepository;

    @Override
    public Campaign registCampaign(CampaignReqDto campaignReqDto, long communityNo, User user) throws Exception {

        Community community = communityService.getCommunity(communityNo);

        if (community == null) throw new Exception();

        Campaign campaign = Campaign.builder()
                .title(campaignReqDto.getTitle())
                .content(campaignReqDto.getContent())
                .image(campaignReqDto.getImage())
                .start_date(campaignReqDto.getStart_date())
                .end_date(campaignReqDto.getEnd_date())
                .max_personnel(campaignReqDto.getMax_personnel())
                .location(campaignReqDto.getLocation())
                .community(community)
                .user(user)
                .build();

        campaign = campaignRespository.save(campaign);

        UserCampaign userCampaign = UserCampaign.builder()
                .user(user)
                .campaign(campaign)
                .build();

        userCampaignRepository.save(userCampaign);

        return campaign;
    }
}