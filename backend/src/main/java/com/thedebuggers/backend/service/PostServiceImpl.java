package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.Post;
import com.thedebuggers.backend.domain.repository.CommunityRepository;
import com.thedebuggers.backend.domain.repository.PostRepository;
import com.thedebuggers.backend.domain.repository.UserRepository;
import com.thedebuggers.backend.dto.PostDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;

    @Override
    public boolean registPost(PostDto postDto) {
        try {
            Post post = Post.builder()
                    .title(postDto.getTitle())
                    .content(postDto.getContent())
                    .image(postDto.getImage())
                    .createdAt(LocalDateTime.now())
                    .isOpen(postDto.isOpen())
                    .community(communityRepository.findByNo(postDto.getCommunityNo()))
                    .user(userRepository.findByNo(postDto.getUserNo()).orElse(null))
                    .build();

            post = postRepository.save(post);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<Post> getAllPost() {
        try {
            return postRepository.findByIsOpen(true);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<Post> getPostList(long communityNo) {
        try {
            return postRepository.findByCommunityNo(communityNo);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Post getPost(long postNo) {
        try {
            return postRepository.findByNo(postNo);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    @Transactional
    public boolean modifyPost(long postNo, PostDto postDto) {
        try {
            Post post = Post.builder()
                    .title(postDto.getTitle())
                    .content(postDto.getContent())
                    .image(postDto.getImage())
                    .isOpen(postDto.isOpen())
                    .build();

            postRepository.modifyPost(postNo, post);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deletePost(long postNo) {
        try {
            postRepository.deleteById(postNo);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
