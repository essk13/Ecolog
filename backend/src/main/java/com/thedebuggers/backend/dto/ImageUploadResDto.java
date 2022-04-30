package com.thedebuggers.backend.dto;


import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@ApiModel("ImageUploadResponse")
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class ImageUploadResDto {
    private String imageUrl;
}
