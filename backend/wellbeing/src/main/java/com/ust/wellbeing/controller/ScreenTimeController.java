package com.ust.wellbeing.controller;

import com.ust.wellbeing.entity.ScreenTime;
import com.ust.wellbeing.service.ScreenTimeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/screen-time")
@CrossOrigin(origins="http://localhost:4200",
methods = {RequestMethod.GET,RequestMethod.OPTIONS,RequestMethod.PUT,RequestMethod.DELETE})
public class ScreenTimeController {

    private final ScreenTimeService screenTimeService;

    public ScreenTimeController(ScreenTimeService screenTimeService) {
        this.screenTimeService = screenTimeService;
    }

    @PostMapping
    public ResponseEntity<ScreenTime> addScreenTime(@RequestBody ScreenTime screenTime, @RequestParam Long userId) {
        return ResponseEntity.ok(screenTimeService.addScreenTime(screenTime, userId));
    }

    @GetMapping
    public ResponseEntity<List<ScreenTime>> getAllScreenTimes(@RequestParam Long userId) {
        return ResponseEntity.ok(screenTimeService.getAllScreenTimes(userId));
    }

    

    @GetMapping("/date/{date}")
    public ResponseEntity<List<ScreenTime>> getScreenTimesByDate(@PathVariable String date, @RequestParam Long userId) {
        LocalDate localDate = LocalDate.parse(date);
        return ResponseEntity.ok(screenTimeService.getScreenTimesByDate(localDate, userId));
    }

    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScreenTime(@PathVariable Long id, @RequestParam Long userId) {
        screenTimeService.deleteScreenTime(id, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/total/{date}")
    public ResponseEntity<Integer> getTotalScreenTimeForDate(@PathVariable String date, @RequestParam Long userId) {
        LocalDate localDate = LocalDate.parse(date);
        return ResponseEntity.ok(screenTimeService.getTotalScreenTimeForDate(localDate, userId));
    }
    
    @GetMapping("/chartdata")
    public ResponseEntity<Map<String, Object>> getScreenTimeChartData(@RequestParam Long userId) {
        Map<String, Object> data = screenTimeService.getScreenTimeChartData(userId);
        return ResponseEntity.ok(data);
    }
}
