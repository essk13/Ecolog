package com.thedebuggers.backend.service;


import com.thedebuggers.backend.domain.entity.Community;
import com.thedebuggers.backend.domain.repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class CommunityServiceImpl implements CommunityService{

    private final CommunityRepository communityRepository;

    @Override
    public List<Community> getCommunityList() {
        return communityRepository.findAllByOrderByNoDesc();
    }

}
