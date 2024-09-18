package com.ust.wellbeing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "work_life_balance")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkLifeBalance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)  // Correctly map the userId column
    private Long userId;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "working_hours", nullable = false)
    private int workingHours;

    @Column(name = "family_hours", nullable = false)
    private int familyHours;

    @ElementCollection
    @CollectionTable(name = "tasks_completed", joinColumns = @JoinColumn(name = "work_life_balance_id"))
    @Column(name = "task")
    private List<String> tasksCompleted;

    @ElementCollection
    @CollectionTable(name = "tasks_pending", joinColumns = @JoinColumn(name = "work_life_balance_id"))
    @Column(name = "task")
    private List<String> tasksPending;

    @ElementCollection
    @CollectionTable(name = "family_reminders", joinColumns = @JoinColumn(name = "work_life_balance_id"))
    @Column(name = "reminder")
    private List<String> familyReminders;

    @ElementCollection
    @CollectionTable(name = "alerts", joinColumns = @JoinColumn(name = "work_life_balance_id"))
    @Column(name = "alert")
    private List<String> alerts;

    @Column(name = "work_life_balance_score")
    private Double workLifeBalanceScore;  // Score representing the balance between work and life

    public Double calculateWorkLifeBalanceScore() {
        if (workingHours + familyHours == 0) {
            return 0.0;
        }
        return familyHours / (double) (workingHours + familyHours);
    }
    
    

    
}
