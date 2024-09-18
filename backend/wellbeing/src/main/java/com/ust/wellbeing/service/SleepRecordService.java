package com.ust.wellbeing.service;

import com.ust.wellbeing.entity.SleepRecord;
import com.ust.wellbeing.repository.SleepRecordRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.OptionalDouble;


@Service
public class SleepRecordService {

    private final SleepRecordRepository sleepRecordRepository;

    public SleepRecordService(SleepRecordRepository sleepRecordRepository) {
        this.sleepRecordRepository = sleepRecordRepository;
    }

    public SleepRecord addSleepSchedule(SleepRecord record) {
        return sleepRecordRepository.save(record);
    }

    public List<SleepRecord> getUserSleepRecord() {
        // Since there's only one user, return all records.
        return sleepRecordRepository.findAll();
    }
    
    public Map<String, Double> getAverageDuration(String period, Long userId) {
        LocalDate now = LocalDate.now();
        LocalDate startDate;
        int daysInPeriod;

        switch (period.toLowerCase()) {
            case "week":
                startDate = now.minusWeeks(1);
                daysInPeriod = 7;
                break;
            case "month":
                startDate = now.minusMonths(1);
                daysInPeriod = now.lengthOfMonth(); // Days in the current month
                break;
            case "year":
                startDate = now.minusYears(1);
                daysInPeriod = now.lengthOfYear(); // Days in the current year
                break;
            default:
                throw new IllegalArgumentException("Invalid period type. Use 'week', 'month', or 'year'.");
        }

        // Retrieve and filter records by userId and date range
        List<SleepRecord> records = sleepRecordRepository.findByUserIdAndDateAfter(userId, startDate);
        double totalDuration = records.stream()
                                      .mapToDouble(SleepRecord::getDuration)
                                      .sum();

        double averageDuration = totalDuration / daysInPeriod;

        return Map.of("averageDuration", averageDuration);
    }


//    public Map<String, Double> getAverageDuration(String period) {
//        LocalDate now = LocalDate.now();
//        LocalDate startDate;
//        int daysInPeriod;
//
//        switch (period.toLowerCase()) {
//            case "week":
//                startDate = now.minusWeeks(1);
//                daysInPeriod = 7;
//                break;
//            case "month":
//                startDate = now.minusMonths(1);
//                daysInPeriod = now.lengthOfMonth(); // Days in the current month
//                break;
//            case "year":
//                startDate = now.minusYears(1);
//                daysInPeriod = now.lengthOfYear(); // Days in the current year
//                break;
//            default:
//                throw new IllegalArgumentException("Invalid period type. Use 'week', 'month', or 'year'.");
//        }
//
//        List<SleepRecord> records = sleepRecordRepository.findAll();
//        double totalDuration = records.stream()
//                                      .filter(record -> !record.getDate().isBefore(startDate))
//                                      .mapToDouble(SleepRecord::getDuration)
//                                      .sum();
//        
//        double averageDuration = totalDuration / daysInPeriod;
//
//        return Map.of("averageDuration", averageDuration);
//    }

    public Map<String, String> getEstimatedSleepTime(Long userId) {
        List<SleepRecord> records = sleepRecordRepository.findByUserId(userId);
        OptionalDouble averageSeconds = records.stream()
                                               .mapToDouble(record -> record.getBedtime().toSecondOfDay())
                                               .average();

        LocalTime averageSleepTime = averageSeconds.isPresent()
                                     ? LocalTime.ofSecondOfDay((long) averageSeconds.getAsDouble())
                                     : LocalTime.of(0, 0);

        return Map.of("estimatedSleepTime", roundToNearest30Minutes(averageSleepTime).toString());
    }

    public Map<String, String> getEstimatedWakeUpTime(Long userId) {
        List<SleepRecord> records = sleepRecordRepository.findByUserId(userId);
        OptionalDouble averageSeconds = records.stream()
                                               .mapToDouble(record -> record.getWakeupTime().toSecondOfDay())
                                               .average();

        LocalTime averageWakeUpTime = averageSeconds.isPresent()
                                      ? LocalTime.ofSecondOfDay((long) averageSeconds.getAsDouble())
                                      : LocalTime.of(0, 0);

        return Map.of("estimatedWakeUpTime", roundToNearest30Minutes(averageWakeUpTime).toString());
    }



    private LocalTime roundToNearest30Minutes(LocalTime time) {
        int minutes = time.getMinute();
        int roundedMinutes = (minutes + 15) / 30 * 30; // Round to the nearest 30 minutes
        return time.withMinute(roundedMinutes % 60).withSecond(0).withNano(0);
    }
    
    public List<SleepRecord> getRecordsByUserIdAndDateAfter(Long userId, LocalDate startDate) {
        return sleepRecordRepository.findByUserIdAndDateAfter(userId, startDate);
    }
   
}
