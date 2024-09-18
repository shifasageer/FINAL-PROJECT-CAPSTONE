package com.ust.wellbeing.repository;

import com.ust.wellbeing.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
 
public interface TestRepository extends JpaRepository<Test, Long> {
}