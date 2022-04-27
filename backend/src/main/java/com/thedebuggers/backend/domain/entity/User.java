package com.thedebuggers.backend.domain.entity;

import com.thedebuggers.backend.domain.ProviderType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.jetbrains.annotations.NotNull;

import javax.persistence.*;

@Entity
@Getter
@Setter
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
    private ProviderType providerType;

    private String providerId;
}
