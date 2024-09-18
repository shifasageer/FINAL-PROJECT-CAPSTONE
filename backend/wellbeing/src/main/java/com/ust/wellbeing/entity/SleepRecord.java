package com.ust.wellbeing.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "sleep_schedule")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SleepRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "day_of_week", nullable = false)
    private String dayOfWeek;

    @Column(name = "bedtime", nullable = false)
    private LocalTime bedtime;

    @Column(name = "wakeup_time", nullable = false)
    private LocalTime wakeupTime;

    @Column(name = "duration", nullable = false)
    private double duration;

    @Column(name = "additional_notes")
    private String additionalNotes;
}
