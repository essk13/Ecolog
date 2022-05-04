package com.thedebuggers.backend.domain.repository;

import com.thedebuggers.backend.domain.entity.Plogging;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PloggingRepository extends JpaRepository<Plogging, Long> {

    List<Plogging> findAllByUserNo(long userNo);
}
