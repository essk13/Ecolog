package com.thedebuggers.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.thedebuggers.backend.domain.entity.Plogging;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class PloggingResDto {
    private long no;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime startedAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime endedAt;

    private String resultImg;
    private String routeImg;
    private int time;
    private double distance;
    private double calories;
    private ProfileResDto user;

    public static PloggingResDto of(Plogging plogging) {
        return PloggingResDto.builder()
                .no(plogging.getNo())
                .startedAt(plogging.getStartedAt())
                .endedAt(plogging.getEndedAt())
                .resultImg(plogging.getResultImg())
                .routeImg(plogging.getRouteImg())
                .time(plogging.getTime())
                .distance(plogging.getDistance())
                .calories(plogging.getCalories())
                .user(ProfileResDto.of(plogging.getUser()))
                .build();
    }
}
