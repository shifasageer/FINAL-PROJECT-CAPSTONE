package com.ust.wellbeing.repository;

import com.ust.wellbeing.entity.SleepRecord;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface SleepRecordRepository extends JpaRepository<SleepRecord, Long> {
	
	List<SleepRecord> findByUserIdAndDateAfter(Long userId, LocalDate date);
	List<SleepRecord> findByUserId(Long userId);
	
	 


}
