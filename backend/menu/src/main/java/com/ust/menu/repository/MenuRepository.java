package com.ust.menu.repository;

import java.util.List;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ust.menu.entity.Menu;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    // Additional query methods (if needed) can be defined here
	Optional<Menu> findByFirstName(String firstName);
	List<Menu> findByUserId(Long userId);
	Menu findByUserIdAndFirstName(Long userId, String firstName);
	
}