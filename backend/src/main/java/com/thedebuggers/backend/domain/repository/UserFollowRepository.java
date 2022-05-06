package com.thedebuggers.backend.domain.repository;

import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.domain.entity.UserFollow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserFollowRepository extends JpaRepository<UserFollow, Long> {

    Optional<UserFollow> findByFollowerAndFollowee(User follower, User followee);

    @Query("select uc.followee from UserFollow uc where uc.follower = :follower")
    List<User> findAllFolloweeByFollower(User follower);

    @Query("select uc.follower from UserFollow uc where uc.followee = :followee")
    List<User> findAllFollowerByFollowee(User followee);
}
