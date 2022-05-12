package com.thedebuggers.backend.domain.repository.plogging;

import com.thedebuggers.backend.domain.entity.plogging.Plogging;
import com.thedebuggers.backend.domain.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PloggingRepository extends JpaRepository<Plogging, Long> {

    List<Plogging> findAllByUserNo(long userNo);

    @Query(value = "select user_no as userNo, count(*) cnt, sum(distance) dist from plogging where ended_at BETWEEN :startDay AND :endDay group by user_no order by dist desc, cnt desc",
            nativeQuery = true)
    <T> List<T> getRankingByTime(String startDay, String endDay, Class<T> type);

    @Query(value = "select user_no as userNo, count(*) cnt, sum(distance) dist from plogging where ended_at BETWEEN :startDay AND :endDay AND user_no in :userList group by user_no order by dist desc, cnt desc",
            nativeQuery = true)
    <T> List<T> getRankingByFollow(List<User> userList, String startDay, String endDay, Class<T> type);

    @Query(value = "select user_no as userNo, count(*) cnt, sum(distance) dist from plogging where ended_at BETWEEN :startDay AND :endDay AND user_no in (select u.no from user u where address = :address) group by user_no order by dist desc, cnt desc",
            nativeQuery = true)
    <T> List<T> getRankingByAddress(String address, String startDay, String endDay, Class<T> type);
}
