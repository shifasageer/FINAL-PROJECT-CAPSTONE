package com.ust.wellbeing.service;

import com.ust.wellbeing.entity.DayPlanner;
import com.ust.wellbeing.repository.DayPlannerRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DayPlannerService {

    private final DayPlannerRepository dayPlannerRepository;

    public DayPlannerService(DayPlannerRepository dayPlannerRepository) {
        this.dayPlannerRepository = dayPlannerRepository;
    }

    public DayPlanner addDayPlanner(DayPlanner planner) {
        return dayPlannerRepository.save(planner);
    }

    public List<DayPlanner> getAllDayPlanners() {
        return dayPlannerRepository.findAll();
    }

    public DayPlanner getDayPlannerById(Long id) {
        return dayPlannerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("DayPlanner not found"));
    }

    public List<DayPlanner> getDayPlannersByDate(LocalDate date) {
        return dayPlannerRepository.findByDate(date);
    }

    public DayPlanner updateDayPlanner(Long id, DayPlanner updatedPlanner) {
        DayPlanner existingPlanner = getDayPlannerById(id);
        existingPlanner.setDate(updatedPlanner.getDate());
        existingPlanner.setMood(updatedPlanner.getMood());
        existingPlanner.setAnxietyLevel(updatedPlanner.getAnxietyLevel());
        existingPlanner.setMedicationTaken(updatedPlanner.isMedicationTaken());
        existingPlanner.setExercised(updatedPlanner.isExercised());
        existingPlanner.setSymptoms(updatedPlanner.getSymptoms());
        existingPlanner.setEnergyLevel(updatedPlanner.getEnergyLevel());
        return dayPlannerRepository.save(existingPlanner);
    }

    public void deleteDayPlanner(Long id) {
        dayPlannerRepository.deleteById(id);
    }

    // New Method: Get Average Mood for a Given Period
    public Map<String, Double> getAverageMood(String period) {
        LocalDate now = LocalDate.now();
        LocalDate startDate;

        switch (period.toLowerCase()) {
            case "week":
                startDate = now.minusWeeks(1);
                break;
            case "month":
                startDate = now.minusMonths(1);
                break;
            case "year":
                startDate = now.minusYears(1);
                break;
            default:
                throw new IllegalArgumentException("Invalid period type. Use 'week', 'month', or 'year'.");
        }

        List<DayPlanner> records = dayPlannerRepository.findAll().stream()
                .filter(record -> !record.getDate().isBefore(startDate))
                .collect(Collectors.toList());

        double averageMood = records.stream()
                .mapToInt(record -> moodToScore(record.getMood()))
                .average()
                .orElse(0.0);

        return Map.of("averageMood", averageMood);
    }

    // New Method: Get Mood Data for Plotting
    public Map<LocalDate, String> getMoodDataForPlotting() {
        return dayPlannerRepository.findAll().stream()
                .collect(Collectors.toMap(DayPlanner::getDate, DayPlanner::getMood));
    }

    // Helper Method: Convert Mood to Numerical Score
    private int moodToScore(String mood) {
        switch (mood.toLowerCase()) {
            case "happy":
                return 9;
            case "content":
                return 7;
            case "calm":
                return 5;
            case "anxious":
                return 3;
            case "stressed":
                return 1;
            default:
                return 0; // Neutral or undefined mood
        }
    }
}
