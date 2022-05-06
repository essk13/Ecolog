package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.Community;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.CommunityDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CommunityService {
    List<Community> getCommunityList();

    Community getCommunity(long no);

    Community registCommunity(CommunityDto communityResDto, long userNo, MultipartFile imageFile);

    Community joinCommunity(long no, User user);

    List<User> getCommunityMember(long no);

    Community updateCommunity(long communityNo, User user, CommunityDto communityDto, MultipartFile imageFile);

    void deleteCommunity(long communityNo, User user) throws Exception;

    void quitCommunity(long communityNo, long userNo) throws Exception;

    List<Community> getMyCommunityList(long userNo);

    List<Community> getPopularCommunityList();

    long getCommunityMemberCount(long communityNo);

    boolean checkCommunityUser(long userNo, long communityNo);
}
