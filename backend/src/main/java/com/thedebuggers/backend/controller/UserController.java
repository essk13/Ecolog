package com.thedebuggers.backend.controller;

import com.thedebuggers.backend.auth.ELUserDetails;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.UserInfoResDto;
import com.thedebuggers.backend.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "사용자 정보 관련 API", tags = {"User"})
@Slf4j
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    @ApiOperation(value = "내 정보")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<UserInfoResDto> myInfo(Authentication authentication){

        log.info(authentication.toString());
        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
//        User user = userDetails.getUser();
        String userEmail = userDetails.getUsername();

        User user = userService.getUserByEmail(userEmail);
        return ResponseEntity.ok(UserInfoResDto.of(user));
    }
}
