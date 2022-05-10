package com.thedebuggers.backend.domain.repository;

import com.thedebuggers.backend.domain.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetRepository extends JpaRepository<Asset, Long> {

}
