package com.thedebuggers.backend.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.thedebuggers.backend.domain.entity.LoginType;
import com.thedebuggers.backend.domain.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Setter
@Builder
@ApiModel("UserInfoResponse")
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class UserInfoResDto {
    private long no;
    private String email;
    private String name;
    private String nickname;
    private String birth;
    private double height;
    private double weight;
    private String phone;
    private String image;
    private String address;
    private LoginType loginType;

    public static UserInfoResDto of(User user){
        return UserInfoResDto.builder()
                .no(user.getNo())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .birth(user.getBirth())
                .height(user.getHeight())
                .weight(user.getHeight())
                .phone(user.getPhone())
                .image(user.getImage())
                .address(user.getAddress())
                .loginType(user.getLoginType())
                .build();
    }
}
