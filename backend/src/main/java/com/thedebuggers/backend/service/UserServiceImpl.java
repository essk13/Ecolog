package com.thedebuggers.backend.service;

import com.thedebuggers.backend.common.exception.CustomException;
import com.thedebuggers.backend.common.util.ErrorCode;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.domain.repository.UserRepository;
import com.thedebuggers.backend.dto.LoginReqDto;
import com.thedebuggers.backend.dto.UserUpdateReqDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final String defaultImageUrl = "http://ecolog_image_url";
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public User createUser(LoginReqDto loginDto) {

        User user = User.builder()
                .email(loginDto.getEmail())
                .name(loginDto.getName())
                .password("")
                .nickname(loginDto.getEmail().substring(0, loginDto.getEmail().indexOf('@')))
                .image(defaultImageUrl)
                .loginType(loginDto.getLoginType())
                .build();

        return userRepository.save(user);
    }

    @Override
    public User getUserByUserNo(Long userNo) {
        return userRepository.findByNo(userNo).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
    }

    @Override
    public void deleteUser(User user){
        userRepository.delete(user);
    }

    @Override
    public void updateUser(User user, UserUpdateReqDto updateDto) {

        user.update(updateDto);

        userRepository.save(user);
    }
}