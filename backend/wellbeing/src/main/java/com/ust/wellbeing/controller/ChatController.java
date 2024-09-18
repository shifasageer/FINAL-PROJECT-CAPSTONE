package com.ust.wellbeing.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ust.wellbeing.service.AIService;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins="http://localhost:4200",
methods = {RequestMethod.GET,RequestMethod.OPTIONS,RequestMethod.PUT,RequestMethod.DELETE,RequestMethod.POST})

public class ChatController {
 
    
    @Autowired
    AIService aiService;
    
    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody String prompt) {
        String response = this.aiService.chat(prompt);
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", response);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }
}  
    
    