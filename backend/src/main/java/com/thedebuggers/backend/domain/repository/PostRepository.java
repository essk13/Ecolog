package com.thedebuggers.backend.domain.repository;

import com.thedebuggers.backend.domain.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByTypeAndIsOpenTrue(int type);
    List<Post> findAllByCommunityNoAndType(long communityNo, int type);
    Optional<Post> findByNo(long postNo);

    @Modifying
    @Query("update Post p set p.likeCount = p.likeCount + 1 where p.no = :postNo")
    void updateLikePlus(long postNo);

    @Modifying
    @Query("update Post p set p.likeCount = p.likeCount - 1 where p.no = :postNo")
    void updateLikeMinus(long postNo);

    List<Post> findAllByCommunityNoAndUserNo(long communityNo, long userNo);

    List<Post> findAllByUserNoAndIsOpenTrue(long userNo);
}
