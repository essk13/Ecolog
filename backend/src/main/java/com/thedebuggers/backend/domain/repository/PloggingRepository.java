package com.thedebuggers.backend.domain.repository;

import com.thedebuggers.backend.domain.entity.Plogging;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PloggingRepository extends JpaRepository<Plogging, Long> {

    List<Plogging> findAllByUserNo(long userNo);

    @Query(value = "select user_no, count(*) cnt, sum(distance) dist from plogging where ended_at BETWEEN :startDay AND :endDay group by user_no order by dist desc",
            nativeQuery = true)
    <T> List<T> getRankingByTime(String startDay, String endDay, Class<T> type);
}
