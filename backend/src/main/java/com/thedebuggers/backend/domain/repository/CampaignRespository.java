package com.thedebuggers.backend.domain.repository;

import com.thedebuggers.backend.domain.entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CampaignRespository extends JpaRepository<Campaign, Long> {

    Optional<Campaign> findByNo(long campaignNo);
}
