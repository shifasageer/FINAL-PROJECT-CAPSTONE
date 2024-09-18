package com.ust.wellbeing.service;

import com.ust.wellbeing.entity.ScreenTime;
import com.ust.wellbeing.repository.ScreenTimeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ScreenTimeService {

    private final ScreenTimeRepository screenTimeRepository;

    public ScreenTimeService(ScreenTimeRepository screenTimeRepository) {
        this.screenTimeRepository = screenTimeRepository;
    }

    public ScreenTime addScreenTime(ScreenTime screenTime, Long userId) {
        screenTime.setUserId(userId);
        return screenTimeRepository.save(screenTime);
    }

    public List<ScreenTime> getAllScreenTimes(Long userId) {
        return screenTimeRepository.findByUserId(userId);
    }

    public ScreenTime getScreenTimeById(Long id, Long userId) {
        return screenTimeRepository.findById(id)
                .filter(screenTime -> screenTime.getUserId().equals(userId))
                .orElseThrow(() -> new IllegalArgumentException("ScreenTime not found"));
    }

    public List<ScreenTime> getScreenTimesByDate(LocalDate date, Long userId) {
        return screenTimeRepository.findByDateAndUserId(date, userId);
    }

    public ScreenTime updateScreenTime(Long id, ScreenTime updatedScreenTime, Long userId) {
        ScreenTime existingScreenTime = getScreenTimeById(id, userId);
        existingScreenTime.setDate(updatedScreenTime.getDate());
        existingScreenTime.setAppUsage(updatedScreenTime.getAppUsage());
        return screenTimeRepository.save(existingScreenTime);
    }

    public void deleteScreenTime(Long id, Long userId) {
        ScreenTime screenTime = getScreenTimeById(id, userId);
        screenTimeRepository.delete(screenTime);
    }

    public int getTotalScreenTimeForDate(LocalDate date, Long userId) {
        return screenTimeRepository.findByDateAndUserId(date, userId).stream()
                .flatMap(screenTime -> screenTime.getAppUsage().values().stream())
                .mapToInt(Integer::intValue)
                .sum();
    }
    
    public Map<String, Object> getScreenTimeChartData(Long userId) {
        // Fetch the last 5 days of screen time data for the user
        List<ScreenTime> lastFiveDaysRecords = screenTimeRepository.findTop5ByUserIdOrderByDateDesc(userId);

        // Map to store average usage over the last 5 days
        Map<String, Double> averageUsage = new HashMap<>();

        // Map to store usage data for the most recent day
        Map<String, Integer> singleDayUsage = new HashMap<>();

        int totalDays = lastFiveDaysRecords.size();
        for (ScreenTime screenTime : lastFiveDaysRecords) {
            Map<String, Integer> appUsage = screenTime.getAppUsage();

            // Sum up app usage for calculating the average
            for (Map.Entry<String, Integer> entry : appUsage.entrySet()) {
                averageUsage.merge(entry.getKey(), entry.getValue().doubleValue(), Double::sum);

                // If singleDayUsage is empty, populate it with the latest day's usage
                if (singleDayUsage.isEmpty()) {
                    singleDayUsage.put(entry.getKey(), entry.getValue());
                }
            }
        }

        // Calculate the average usage by dividing by the total number of days
        for (Map.Entry<String, Double> entry : averageUsage.entrySet()) {
            averageUsage.put(entry.getKey(), entry.getValue() / totalDays);
        }

        // Prepare the response data
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("averageUsage", averageUsage);
        responseData.put("singleDayUsage", singleDayUsage);

        return responseData;
    }
}

