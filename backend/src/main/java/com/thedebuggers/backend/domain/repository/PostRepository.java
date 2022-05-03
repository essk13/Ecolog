package com.thedebuggers.backend.domain.repository;

import com.thedebuggers.backend.domain.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByIsOpenTrue();
    List<Post> findAllByCommunityNo(long communityNo);
    Optional<Post> findByNo(long postNo);

    @Modifying
    @Query("update Post p set p.likeCount = p.likeCount + 1 where p.no = :postNo")
    void updateLikePlus(long postNo);

    @Modifying
    @Query("update Post p set p.likeCount = p.likeCount - 1 where p.no = :postNo")
    void updateLikeMinus(long postNo);
}
