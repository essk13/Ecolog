package com.thedebuggers.backend.dto;

import com.thedebuggers.backend.domain.entity.Campaign;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class CampaignResDto {
    private long no;
    private String title;
    private String content;
    private String image;
    private String location;

    private LocalDateTime start_date;
    private LocalDateTime end_date;

    private long max_personnel;
    private List<ProfileResDto> join_personnel;

    private BaseUserInfoResDto writer;

    public static CampaignResDto of(Campaign campaign, List<User> userList){
        return CampaignResDto.builder()
                .no(campaign.getNo())
                .title(campaign.getTitle())
                .content(campaign.getContent())
                .image(campaign.getImage())
                .location(campaign.getLocation())
                .start_date(campaign.getStart_date())
                .end_date(campaign.getEnd_date())
                .max_personnel(campaign.getMax_personnel())
                .writer(BaseUserInfoResDto.of(campaign.getUser()))
                .build();

    }
}
