package com.ust.wellbeing.controller;

import com.ust.wellbeing.entity.SleepRecord;
import com.ust.wellbeing.service.SleepRecordService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sleep-schedule")
@CrossOrigin(origins="http://localhost:4200",
methods = {RequestMethod.GET,RequestMethod.OPTIONS,RequestMethod.PUT,RequestMethod.DELETE})
public class SleepRecordController {

    private final SleepRecordService sleepRecordService;

    public SleepRecordController(SleepRecordService sleepRecordService) {
        this.sleepRecordService = sleepRecordService;
    }

    @PostMapping
    public SleepRecord addSleepRecord(@RequestParam Long userId,@RequestBody SleepRecord schedule) {
    	schedule.setUserId(userId);
        return sleepRecordService.addSleepSchedule(schedule);
    }

    @GetMapping
    public List<SleepRecord> getUserSleepRecord() {
        return sleepRecordService.getUserSleepRecord();
    }

//    @GetMapping("/average-duration/{period}")
//    public Map<String, Double> getAverageDuration(@PathVariable String period) {
//        return sleepRecordService.getAverageDuration(period);
//    }
    @GetMapping("/average-duration/{period}")
    public Map<String, Double> getAverageDuration(@PathVariable String period, @RequestParam Long userId) {
        return sleepRecordService.getAverageDuration(period, userId);
    }

    @GetMapping("/estimated-sleep-time")
    public Map<String, String> getEstimatedSleepTime(@RequestParam Long userId) {
        return sleepRecordService.getEstimatedSleepTime(userId);
    }

    @GetMapping("/estimated-wake-up-time")
    public Map<String, String> getEstimatedWakeUpTime(@RequestParam Long userId) {
        return sleepRecordService.getEstimatedWakeUpTime(userId);
    }
    
    

}
