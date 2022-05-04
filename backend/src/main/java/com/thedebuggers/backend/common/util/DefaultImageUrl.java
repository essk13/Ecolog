package com.thedebuggers.backend.common.util;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

@RequiredArgsConstructor
public class DefaultImageUrl {

    @Value("${ecolog.default.profiile}")
    public static String PROFILE_DEFAULT_URL;
}
