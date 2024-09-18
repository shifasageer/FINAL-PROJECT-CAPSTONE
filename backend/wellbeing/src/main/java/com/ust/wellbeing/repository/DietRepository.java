package com.ust.wellbeing.repository;



import com.ust.wellbeing.entity.Diet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface DietRepository extends JpaRepository<Diet, Long> {
    List<Diet> findByDate(java.util.Date date);
    List<Diet> findByDateAndUserId(LocalDate date, Long userId);
}

