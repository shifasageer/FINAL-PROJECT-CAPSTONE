package com.ust.wellbeing.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Map;

@Entity
public class ScreenTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)  // Correctly map the userId column
    private Long userId;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @ElementCollection
    @CollectionTable(
        name = "app_usage",
        joinColumns = @JoinColumn(name = "screen_time_id") // Fixed this line
    )
    @MapKeyColumn(name = "app_name")
    @Column(name = "hours_used")
    private Map<String, Integer> appUsage; // Map to store  names and usage hours

    // Constructors
    public ScreenTime() {}

    public ScreenTime(LocalDate date, Map<String, Integer> appUsage) {
        this.date = date;
        this.appUsage = appUsage;
    }

    
    public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	// Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Map<String, Integer> getAppUsage() {
        return appUsage;
    }

    public void setAppUsage(Map<String, Integer> appUsage) {
        this.appUsage = appUsage;
    }
}
