package com.thedebuggers.backend.service;


import com.thedebuggers.backend.common.exception.CustomException;
import com.thedebuggers.backend.common.util.ErrorCode;
import com.thedebuggers.backend.domain.entity.Community;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.domain.entity.UserCommunity;
import com.thedebuggers.backend.domain.repository.CommunityRepository;
import com.thedebuggers.backend.domain.repository.UserCommunityRepository;
import com.thedebuggers.backend.domain.repository.UserRepository;
import com.thedebuggers.backend.dto.CommunityDto;
import com.thedebuggers.backend.dto.UserCommunityDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class CommunityServiceImpl implements CommunityService{

    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;
    private final UserCommunityRepository userCommunityRepository;

    @Override
    public List<Community> getCommunityList() {

        return communityRepository.findAllByOrderByNoDesc();
    }

    @Override
    public Community getCommunity(long no) {
        return communityRepository.findByNo(no);
    }

    @Override
    public Community registCommunity(CommunityDto communityDto, long userNo) {
//        User user = userRepository.findByNo(userNo).orElseThrow(new CustomException(ErrorCode.NOT_FOUND));

        Community community = Community.builder()
                .title(communityDto.getTitle())
                .description(communityDto.getDescription())
                .image(communityDto.getImage())
                .manager(userRepository.findByNo(userNo).orElse(null))
                .sido(communityDto.getSido())
                .sigungu(communityDto.getSigungu())
                .tag(communityDto.getTag())
                .build();

        community = communityRepository.save(community);

        UserCommunity userCommunity = UserCommunity.builder()
                .user(userRepository.findByNo(userNo).orElse(null))
                .community(community)
                .build();

//        joinCommunity(community.getNo(), user);
        userCommunity = userCommunityRepository.save(userCommunity);

        return community;
    }

    @Override
    public Community joinCommunity(long no, User user) {

        Community community = communityRepository.findByNo(no);

        UserCommunity userCommunity = UserCommunity.builder()
                .user(user)
                .community(community)
                .build();
        userCommunity = userCommunityRepository.save(userCommunity);

        return community;
    }

    @Override
    public List<User> getCommunityMember(long no) {

        List<User> userList = userCommunityRepository.findAllUserByCommunityNo(no);

        return userList;
    }

    @Override
    public Community updateCommunity(long communityNo, User user, CommunityDto communityDto) {
        try {
            Community community = Community.builder()
                    .title(communityDto.getTitle())
                    .description(communityDto.getDescription())
                    .image(communityDto.getImage())
                    .manager(userRepository.findByNo(communityDto.getUserNo()).orElse(null))
                    .sido(communityDto.getSido())
                    .sigungu(communityDto.getSigungu())
                    .tag(communityDto.getTag())
                    .build();
            communityRepository.updateCommunity(communityNo, community);
            return community;
        } catch (Exception e) {
            System.out.print(e);
            return null;
        }
    }

    @Override
    public void deleteCommunity(long communityNo, User user) throws Exception {

        Community community = communityRepository.findByNo(communityNo);
//        List<UserCommunity> userCommunityList = userCommunityRepository.findAllByCommunityNo(communityNo);

        // 커뮤니티 게시글 조회 >> 삭제
        // 댓글 삭제
        // 좋아요 중개 테이블 삭제


        if (community == null) {
            System.out.println("1번 에러");
            throw new Exception();
        }

        if (community.getManager().getNo() != user.getNo()) {
            System.out.println("2번 에러");
            throw new Exception();
        }

//        userCommunityRepository.deleteAll(userCommunityList);
        communityRepository.delete(community);

    }

    @Override
    public void quitCommunity(long communityNo, long userNo) throws Exception {
        UserCommunity userCommunity = userCommunityRepository.findAllByCommunityNoAndUserNo(communityNo, userNo);

        Community community = userCommunity.getCommunity();

//        Community community = communityRepository.findByNo(communityNo);

        if (userCommunity == null) {
            throw new Exception();
        }

        if (community.getManager().getNo() == userNo) {
            throw new Exception();
        }

        userCommunityRepository.delete(userCommunity);
    }


}
