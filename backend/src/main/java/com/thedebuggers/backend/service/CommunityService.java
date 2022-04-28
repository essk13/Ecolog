package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.Community;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.CommunityDto;
import com.thedebuggers.backend.dto.UserCommunityDto;

import java.util.List;

public interface CommunityService {
    List<Community> getCommunityList();

    Community getCommunity(long no);

    boolean registCommunity(CommunityDto communityResDto);

    Community joinCommunity(long no, User user);

    List<User> getCommunityMember(long no);
}
