package com.thedebuggers.backend.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.thedebuggers.backend.domain.entity.LoginType;
import com.thedebuggers.backend.domain.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@ApiModel("UserInfoResponse")
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class MyInfoResDto extends BaseUserInfoResDto {
    private double height;
    private double weight;
    private String phone;
    private String address;
    private LoginType loginType;

    private List<BaseUserInfoResDto> followingUser;
    private List<BaseUserInfoResDto> followerUser;

    public static MyInfoResDto of(User user){
        return MyInfoResDto.builder()
                .no(user.getNo())
                .email(user.getEmail())
                .name(user.getName())
                .nickname(user.getNickname())
                .birth(user.getBirth())
                .height(user.getHeight())
                .weight(user.getWeight())
                .phone(user.getPhone())
                .image(user.getImage())
                .address(user.getAddress())
                .loginType(user.getLoginType())
                .build();
    }
}
