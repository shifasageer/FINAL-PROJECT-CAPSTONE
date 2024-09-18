package com.ust.wellbeing.service;

import com.ust.wellbeing.entity.Test;
import com.ust.wellbeing.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
@Service
public class TestService {
 
    @Autowired
    private TestRepository testRepository;
 
    public Test saveTest(Test test) {
        return testRepository.save(test);
    }
 
    // Other business logic can be added here
}