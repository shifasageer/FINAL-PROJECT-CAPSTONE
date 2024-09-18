package com.ust.wellbeing.controller;

import com.ust.wellbeing.entity.DayPlanner;
import com.ust.wellbeing.service.DayPlannerService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/day-planner")
public class DayPlannerController {

    private final DayPlannerService dayPlannerService;

    public DayPlannerController(DayPlannerService dayPlannerService) {
        this.dayPlannerService = dayPlannerService;
    }

    @PostMapping
    public DayPlanner addDayPlanner(@RequestBody DayPlanner planner) {
        return dayPlannerService.addDayPlanner(planner);
    }

    @GetMapping
    public List<DayPlanner> getAllDayPlanners() {
        return dayPlannerService.getAllDayPlanners();
    }

    @GetMapping("/{id}")
    public DayPlanner getDayPlannerById(@PathVariable Long id) {
        return dayPlannerService.getDayPlannerById(id);
    }

    @GetMapping("/date/{date}")
    public List<DayPlanner> getDayPlannersByDate(@PathVariable LocalDate date) {
        return dayPlannerService.getDayPlannersByDate(date);
    }

    @PutMapping("/{id}")
    public DayPlanner updateDayPlanner(@PathVariable Long id, @RequestBody DayPlanner updatedPlanner) {
        return dayPlannerService.updateDayPlanner(id, updatedPlanner);
    }

    @DeleteMapping("/{id}")
    public void deleteDayPlanner(@PathVariable Long id) {
        dayPlannerService.deleteDayPlanner(id);
    }

    // New Endpoint: Get Average Mood for a Given Period
    @GetMapping("/average-mood/{period}")
    public Map<String, Double> getAverageMood(@PathVariable String period) {
        return dayPlannerService.getAverageMood(period);
    }

    // New Endpoint: Get Mood Data for Plotting
    @GetMapping("/mood-data")
    public Map<LocalDate, String> getMoodDataForPlotting() {
        return dayPlannerService.getMoodDataForPlotting();
    }
}
