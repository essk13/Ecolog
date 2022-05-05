package com.thedebuggers.backend.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.thedebuggers.backend.domain.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class RankingResDto {
    private ProfileResDto user;
    private int cnt;
    private double dist;

    public static RankingResDto of(User user, int cnt, double dist) {
        return RankingResDto.builder()
                .user(ProfileResDto.of(user))
                .cnt(cnt)
                .dist(dist)
                .build();
    }
}
