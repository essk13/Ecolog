package com.thedebuggers.backend.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.thedebuggers.backend.domain.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CommunityResponse")
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class CommunityDto {

    private long no;
    private String title;
    private String description;
    private long userNo;
    private String image;

}
