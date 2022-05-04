package com.thedebuggers.backend.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.thedebuggers.backend.domain.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;


@Getter
@Setter
@SuperBuilder
@ApiModel("FollowUserResDto")
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class FollowUserResDto extends BaseUserInfoResDto{

    private boolean isFollowing;

    public static FollowUserResDto of(User user, User requestUser){
        return FollowUserResDto.builder()
                .no(user.getNo())
                .email(user.getEmail())
                .name(user.getName())
                .nickname(user.getNickname())
                .birth(user.getBirth())
                .image(user.getImage())
                .isFollowing(requestUser.getFollowingUser().contains(user))
                .build();
    }
}
