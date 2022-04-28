package com.thedebuggers.backend.domain.repository;

import com.thedebuggers.backend.domain.entity.UserCommunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCommunityRepository extends JpaRepository<UserCommunity, Long> {
}
