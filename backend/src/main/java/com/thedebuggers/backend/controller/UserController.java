package com.thedebuggers.backend.controller;

import com.thedebuggers.backend.auth.ELUserDetails;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.MyInfoResDto;
import com.thedebuggers.backend.dto.ProfileResDto;
import com.thedebuggers.backend.dto.UserUpdateReqDto;
import com.thedebuggers.backend.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Api(value = "사용자 정보 관련 API", tags = {"User"})
@Slf4j
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @GetMapping
    @ApiOperation(value = "내 정보")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<MyInfoResDto> myInfo(Authentication authentication) {

            ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
            User user = userDetails.getUser();

        return ResponseEntity.ok(MyInfoResDto.of(user));
    }

    @GetMapping("/{userNo}")
    @ApiOperation(value = "프로필 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<ProfileResDto> profile(@PathVariable Long userNo) {

        User user = userService.getUserByUserNo(userNo);

        return ResponseEntity.ok(user != null ? ProfileResDto.of(user) : null);
    }

    @PutMapping
    @ApiOperation(value = "회원 정보 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<String> update(@RequestBody UserUpdateReqDto updateReqDto, Authentication authentication) {

        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        log.info(user.toString());
        log.info(updateReqDto.toString());
        try {
            userService.updateUser(user, updateReqDto);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.ok("Failed");
        }
        return ResponseEntity.ok("Success");
    }

    @DeleteMapping
    @ApiOperation(value = "회원 탈퇴")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<String> delete(Authentication authentication) {

        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        try {
            userService.deleteUser(user);
        }catch (Exception e){
            return ResponseEntity.ok("Failed");
        }
        return ResponseEntity.ok("Success");
    }
}