package com.thedebuggers.backend.domain.repository;

import com.thedebuggers.backend.domain.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByCommunityNo(@Param(value = "no") long communityNo);
    Post findByNo(long postNo);
}
