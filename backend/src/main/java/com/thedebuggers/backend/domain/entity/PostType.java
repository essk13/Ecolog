package com.thedebuggers.backend.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PostType {
    NOTICE(1),
    FREE(2),
    CAMPAIGN(3);

    private final int value;
}
