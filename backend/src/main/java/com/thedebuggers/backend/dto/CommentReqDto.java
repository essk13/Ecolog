package com.thedebuggers.backend.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class CommentReqDto {
    private String content;
}
