package com.thedebuggers.backend.dto;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CommentDto {
    private long no;
    private String content;
    private LocalDateTime createdAt;
    private long postNo;
    private long userNo;
}
