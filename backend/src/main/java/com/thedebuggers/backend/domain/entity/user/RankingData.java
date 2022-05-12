package com.thedebuggers.backend.domain.entity.user;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public interface RankingData {
    Long getUserNo();
    Integer getCnt();
    Double getDist();
}
