package com.thedebuggers.backend.dto;

import com.thedebuggers.backend.domain.entity.Campaign;
import com.thedebuggers.backend.domain.entity.Community;
import com.thedebuggers.backend.domain.entity.User;
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

    private ProfileResDto writer;

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
                .join_personnel(userList.stream().map(ProfileResDto::of).collect(Collectors.toList()))
                .writer(ProfileResDto.of(campaign.getUser()))
                .build();

    }
}
