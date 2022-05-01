package com.thedebuggers.backend.service;


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
    public boolean registCommunity(CommunityDto communityDto) {
        Community community = Community.builder()
                .title(communityDto.getTitle())
                .description(communityDto.getDescription())
                .image(communityDto.getImage())
                .manager(userRepository.findByNo(communityDto.getUserNo()).orElse(null))
                .sido(communityDto.getSido())
                .sigungu(communityDto.getSigungu())
                .tag(communityDto.getTag())
                .build();

        community = communityRepository.save(community);

        UserCommunity userCommunity = UserCommunity.builder()
                .user(userRepository.findByNo(communityDto.getUserNo()).orElse(null))
                .community(community)
                .build();

        userCommunity = userCommunityRepository.save(userCommunity);

        return true;
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
        List<UserCommunity> userCommunityList = userCommunityRepository.findAllByCommunityNo(communityNo);

        if (community == null) {
            System.out.println("1번 에러");
            throw new Exception();
        }

        if (community.getManager().getNo() != user.getNo()) {
            System.out.println("2번 에러");
            throw new Exception();
        }

        userCommunityRepository.deleteAll(userCommunityList);
        communityRepository.delete(community);

    }

    @Override
    public void quitCommunity(long communityNo, long userNo) throws Exception {
        UserCommunity userCommunity = userCommunityRepository.findAllByCommunityNoAndUserNo(communityNo, userNo);

        Community community = communityRepository.findByNo(communityNo);

        if (userCommunity == null) {
            throw new Exception();
        }

        if (community.getManager().getNo() == userNo) {
            throw new Exception();
        }

        userCommunityRepository.delete(userCommunity);
    }


}
