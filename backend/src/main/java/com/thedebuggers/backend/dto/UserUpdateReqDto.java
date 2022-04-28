package com.thedebuggers.backend.dto;

import lombok.*;

@Getter
@Setter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@ToString
public class UserUpdateReqDto {
    private String name;
    private String nickname;
    private String birth;
    private Double height;
    private Double weight;
    private String phone;
    private String image;
    private String address;
}
