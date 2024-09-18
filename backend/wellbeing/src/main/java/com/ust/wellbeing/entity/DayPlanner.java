package com.ust.wellbeing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "day_planner")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DayPlanner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)  // Correctly map the userId column
    private Long userId;
    
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "mood", nullable = false)
    private String mood; // e.g., Happy, Sad, Anxious, Calm, etc.

    @Column(name = "anxiety_level", nullable = false)
    private int anxietyLevel; // e.g., scale from 1-10

    @Column(name = "medication_taken", nullable = false)
    private boolean medicationTaken; // true if medication was taken

    @Column(name = "exercised", nullable = false)
    private boolean exercised; // true if exercise was done

    @Column(name = "symptoms")
    private String symptoms; // Any symptoms experienced

    @Column(name = "energy_level", nullable = false)
    private int energyLevel; // e.g., scale from 1-10
    
    public boolean isMedicationTaken() {
        return medicationTaken;
    }

   
    
}
