package com.thedebuggers.backend.domain.repository;

import com.thedebuggers.backend.domain.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {

    List<Community> findAllByOrderByNoDesc();

    Community findByNo(long no);
}
