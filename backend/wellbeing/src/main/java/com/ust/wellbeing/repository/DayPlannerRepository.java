package com.ust.wellbeing.repository;

import com.ust.wellbeing.entity.DayPlanner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DayPlannerRepository extends JpaRepository<DayPlanner, Long> {
    List<DayPlanner> findByDate(LocalDate date);
}
