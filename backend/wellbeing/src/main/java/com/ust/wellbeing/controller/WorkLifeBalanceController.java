package com.ust.wellbeing.controller;

import com.ust.wellbeing.entity.WorkLifeBalance;
import com.ust.wellbeing.service.WorkLifeBalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/work-life-balance")
@CrossOrigin(origins = "http://localhost:4200",
methods = {RequestMethod.GET, RequestMethod.OPTIONS, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.POST})

public class WorkLifeBalanceController {

    @Autowired
    private WorkLifeBalanceService workLifeBalanceService;

    public WorkLifeBalanceController(WorkLifeBalanceService workLifeBalanceService) {
        this.workLifeBalanceService = workLifeBalanceService;
    }

    @PostMapping
    public ResponseEntity<WorkLifeBalance> addWorkLifeBalance(@RequestBody WorkLifeBalance workLifeBalance, @RequestParam Long userId) {
        return ResponseEntity.ok(workLifeBalanceService.addWorkLifeBalance(workLifeBalance, userId));
    }

    @GetMapping
    public ResponseEntity<List<WorkLifeBalance>> getAllWorkLifeBalances(@RequestParam Long userId) {
        return ResponseEntity.ok(workLifeBalanceService.getAllWorkLifeBalances(userId));
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<WorkLifeBalance>> getWorkLifeBalancesByDate(@PathVariable String date, @RequestParam Long userId) {
        LocalDate localDate = LocalDate.parse(date);
        return ResponseEntity.ok(workLifeBalanceService.getWorkLifeBalancesByDate(localDate, userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkLifeBalance> getWorkLifeBalanceById(@PathVariable Long id, @RequestParam Long userId) {
        return ResponseEntity.ok(workLifeBalanceService.getWorkLifeBalanceById(id, userId));
    }

    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkLifeBalance(@PathVariable Long id, @RequestParam Long userId) {
        workLifeBalanceService.deleteWorkLifeBalance(id, userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/tasks/pending")
    public ResponseEntity<WorkLifeBalance> addTaskToPending(@PathVariable Long id, @RequestParam String task, @RequestParam Long userId) {
        return ResponseEntity.ok(workLifeBalanceService.addTaskToPending(id, task, userId));
    }

    @PostMapping("/{id}/tasks/completed")
    public ResponseEntity<WorkLifeBalance> markTaskAsCompleted(@PathVariable Long id, @RequestParam String task, @RequestParam Long userId) {
        return ResponseEntity.ok(workLifeBalanceService.markTaskAsCompleted(id, task, userId));
    }

    @DeleteMapping("/{id}/tasks")
    public ResponseEntity<WorkLifeBalance> removeTask(@PathVariable Long id, @RequestParam String task, @RequestParam boolean completed, @RequestParam Long userId) {
        return ResponseEntity.ok(workLifeBalanceService.removeTask(id, task, completed, userId));
    }
}
