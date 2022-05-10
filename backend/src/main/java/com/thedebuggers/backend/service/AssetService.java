package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.AssetReqDto;
import com.thedebuggers.backend.dto.MyAssetResDto;

public interface AssetService {
    boolean buyAsset(User user, AssetReqDto assetReqDto);
    MyAssetResDto getMyAssetList(User user);
}
