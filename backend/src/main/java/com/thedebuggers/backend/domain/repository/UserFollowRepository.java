package com.thedebuggers.backend.domain.repository;

import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.domain.entity.UserFollow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserFollowRepository extends JpaRepository<UserFollow, Long> {

    Optional<UserFollow> findByFollowerAndFollowee(User follower, User followee);
}
