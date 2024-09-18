package com.ust.wellbeing.repository;

import com.ust.wellbeing.entity.WorkLifeBalance;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkLifeBalanceRepository extends JpaRepository<WorkLifeBalance, Long> {
    List<WorkLifeBalance> findByUserId(Long userId);
    List<WorkLifeBalance> findByUserIdAndDate(Long userId, LocalDate date);
}