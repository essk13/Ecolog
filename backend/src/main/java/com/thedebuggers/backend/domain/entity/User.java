package com.thedebuggers.backend.domain.entity;

import com.thedebuggers.backend.dto.UserUpdateReqDto;
import lombok.*;
import org.jetbrains.annotations.NotNull;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long no;

    private String email;

    private String password;

    private String name;

    private String nickname;

    private String birth;

    private double height;

    private double weight;

    private String phone;

    private String image;

    private String address;

    @NotNull
    @Enumerated(EnumType.STRING)
    private LoginType loginType;

    public void update(UserUpdateReqDto updateDto) {

        this.name = updateDto.getName();
        this.nickname = updateDto.getNickname();
        this.birth = updateDto.getBirth();
        this.height = updateDto.getHeight();
        this.weight = updateDto.getWeight();
        this.phone = updateDto.getPhone();
        this.image = updateDto.getImage();
        this.address = updateDto.getAddress();
    }
}
