package com.thedebuggers.backend.domain.repository;

import com.thedebuggers.backend.domain.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByCommunityNo(@Param(value = "no") long communityNo);
    Post findByNo(long postNo);

    @Modifying
    @Query("update Post p set p.title = :#{#post.title}, p.content = :#{#post.content}," +
            "p.image = :#{#post.image}, p.isOpen = :#{#post.open} where p.no = :#{#postNo}")
    void modifyPost(long postNo, Post post);
}
