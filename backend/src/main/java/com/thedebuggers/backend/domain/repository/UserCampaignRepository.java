package com.thedebuggers.backend.domain.repository;

import com.thedebuggers.backend.domain.entity.UserCampaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCampaignRepository extends JpaRepository<UserCampaign, Long> {


}
