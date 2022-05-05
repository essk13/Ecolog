package com.thedebuggers.backend.dto;

import com.thedebuggers.backend.domain.entity.Community;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class CommunityResDto {
    private long no;
    private String title;
    private String description;
    private BaseUserInfoResDto manager;
    private String image;
    private String sido;
    private String sigungu;
    private String tag;

    private long join_count;

    public static CommunityResDto of(Community community, long userCount) {
        return CommunityResDto.builder()
                .no(community.getNo())
                .title(community.getTitle())
                .description(community.getDescription())
                .manager(BaseUserInfoResDto.of(community.getManager()))
                .image(community.getImage())
                .sido(community.getSido())
                .sigungu(community.getSigungu())
                .tag(community.getTag())
                .join_count(userCount)
                .build();
    }
}
