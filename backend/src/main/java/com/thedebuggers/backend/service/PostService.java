package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.Post;
import com.thedebuggers.backend.dto.PostDto;

import java.util.List;

public interface PostService {
    boolean registPost(PostDto postDto);

    List<Post> getPostList(long communityNo);

    Post getPost(long postNo);

    void modifyPost(long postNo, PostDto postDto);

    void deletePost(long postNo);
}
