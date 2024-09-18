package com.ust.wellbeing.service;

import com.ust.wellbeing.entity.WorkLifeBalance;
import com.ust.wellbeing.repository.WorkLifeBalanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class WorkLifeBalanceService {

    @Autowired
    private WorkLifeBalanceRepository workLifeBalanceRepository;

    public WorkLifeBalanceService(WorkLifeBalanceRepository workLifeBalanceRepository) {
        this.workLifeBalanceRepository = workLifeBalanceRepository;
    }

    public WorkLifeBalance addWorkLifeBalance(WorkLifeBalance workLifeBalance, Long userId) {
        workLifeBalance.setUserId(userId);
        workLifeBalance.setWorkLifeBalanceScore(workLifeBalance.calculateWorkLifeBalanceScore());
        return workLifeBalanceRepository.save(workLifeBalance);
    }

    public List<WorkLifeBalance> getAllWorkLifeBalances(Long userId) {
        return workLifeBalanceRepository.findByUserId(userId);
    }

    public WorkLifeBalance getWorkLifeBalanceById(Long id, Long userId) {
        return workLifeBalanceRepository.findById(id)
                .filter(workLifeBalance -> workLifeBalance.getUserId().equals(userId))
                .orElseThrow(() -> new IllegalArgumentException("WorkLifeBalance not found"));
    }

    public List<WorkLifeBalance> getWorkLifeBalancesByDate(LocalDate date, Long userId) {
        return workLifeBalanceRepository.findByUserIdAndDate(userId, date);
    }


    public void deleteWorkLifeBalance(Long id, Long userId) {
        WorkLifeBalance workLifeBalance = getWorkLifeBalanceById(id, userId);
        workLifeBalanceRepository.delete(workLifeBalance);
    }

    public WorkLifeBalance addTaskToPending(Long id, String task, Long userId) {
        WorkLifeBalance workLifeBalance = getWorkLifeBalanceById(id, userId);
        workLifeBalance.getTasksPending().add(task);
        workLifeBalance.setWorkLifeBalanceScore(workLifeBalance.calculateWorkLifeBalanceScore());
        return workLifeBalanceRepository.save(workLifeBalance);
    }

    public WorkLifeBalance markTaskAsCompleted(Long id, String task, Long userId) {
        WorkLifeBalance workLifeBalance = getWorkLifeBalanceById(id, userId);
        if (workLifeBalance.getTasksPending().remove(task)) {
            workLifeBalance.getTasksCompleted().add(task);
        }
        workLifeBalance.setWorkLifeBalanceScore(workLifeBalance.calculateWorkLifeBalanceScore());
        return workLifeBalanceRepository.save(workLifeBalance);
    }

    public WorkLifeBalance removeTask(Long id, String task, boolean completed, Long userId) {
        WorkLifeBalance workLifeBalance = getWorkLifeBalanceById(id, userId);
        if (completed) {
            workLifeBalance.getTasksCompleted().remove(task);
        } else {
            workLifeBalance.getTasksPending().remove(task);
        }
        workLifeBalance.setWorkLifeBalanceScore(workLifeBalance.calculateWorkLifeBalanceScore());
        return workLifeBalanceRepository.save(workLifeBalance);
    }
}
