package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.domain.repository.UserRepository;
import com.thedebuggers.backend.dto.LoginReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public User updateUser(LoginReqDto loginDto) {
        User user = userRepository.findByEmail(loginDto.getEmail()).orElse(null);

        if (user == null) return null;

        if (!user.getImage().equals(loginDto.getImageUrl())){
            user.setImage(loginDto.getImageUrl());
        }

        return userRepository.save(user);
    }

    @Override
    public User createUser(LoginReqDto loginDto) {
        User user = User.builder()
                .email(loginDto.getEmail())
                .password(passwordEncoder.encode(loginDto.getId() + loginDto.getEmail()))
                .image(loginDto.getImageUrl())
                .loginType(loginDto.getLoginType())
                .build();
        return userRepository.save(user);
    }

    @Override
    public User getUserByUserNo(Long userNo) {
        return userRepository.findByNo(userNo).orElse(null);
    }
}
