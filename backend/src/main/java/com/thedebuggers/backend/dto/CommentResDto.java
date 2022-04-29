package com.thedebuggers.backend.dto;

import com.thedebuggers.backend.domain.entity.Comment;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class CommentResDto {
    private long no;
    private ProfileResDto writer;
    private String content;
    private LocalDateTime createdAt;

    public static CommentResDto of(Comment comment){
        return CommentResDto.builder()
                .no(comment.getNo())
                .writer(ProfileResDto.of(comment.getUser()))
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .build();
    }
}
