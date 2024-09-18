package com.ust.wellbeing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ust.wellbeing.entity.ScreenTime;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScreenTimeRepository extends JpaRepository<ScreenTime, Long> {
   
    List<ScreenTime> findByDateAndUserId(LocalDate date, Long userId);
    List<ScreenTime> findByUserId(Long userId);
    List<ScreenTime> findTop5ByUserIdOrderByDateDesc(Long userId);

}
