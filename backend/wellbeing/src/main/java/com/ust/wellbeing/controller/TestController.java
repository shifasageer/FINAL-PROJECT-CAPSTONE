package com.ust.wellbeing.controller;

import com.ust.wellbeing.entity.Test;
import com.ust.wellbeing.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
 
@RestController
@RequestMapping("/api/tests")
public class TestController {
 
    @Autowired
    private TestService testService;
 
    @PostMapping
    public Test saveTest(@RequestParam String userId, @RequestParam int score) {
        Test test = new Test();
        test.setUserId(userId);
        test.setScore(score);
        return testService.saveTest(test);
    }
}