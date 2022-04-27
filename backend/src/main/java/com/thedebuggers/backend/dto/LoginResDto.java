package com.thedebuggers.backend.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.thedebuggers.backend.domain.entity.LoginType;
import com.thedebuggers.backend.domain.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@ApiModel("LoginRequest")
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class LoginResDto {

    private String email;
    private String name;
    private String nickname;
    private LoginType loginType;

    public static LoginResDto of(User user){

        return LoginResDto.builder()
                .email(user.getEmail())
                .name(user.getName())
                .nickname(user.getNickname())
                .loginType(user.getLoginType())
                .build();
    }
}
