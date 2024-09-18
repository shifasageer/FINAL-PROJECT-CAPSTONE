package com.ust.wellbeing.controller;

import com.ust.wellbeing.entity.Diet;
import com.ust.wellbeing.service.DietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/diet")
@CrossOrigin(origins="http://localhost:4200",
methods = {RequestMethod.GET,RequestMethod.OPTIONS,RequestMethod.PUT,RequestMethod.DELETE})
public class DietController {

    @Autowired
    private DietService dietService;

//    @PostMapping("/add")
//    public ResponseEntity<Diet> addDiet(@RequestBody Diet diet) {
//        return ResponseEntity.ok(dietService.saveDiet(diet));
//    }
//
//    @GetMapping("/date/{date}")
//    public ResponseEntity<List<Diet>> getDietByDate(@PathVariable Date date) {
//        return ResponseEntity.ok(dietService.getDietByDate(date));
//    }
    
    @PostMapping("/add")
    public ResponseEntity<Diet> addDiet(@RequestBody Diet diet, @RequestParam Long userId) {
        return ResponseEntity.ok(dietService.saveDiet(diet, userId));
    }

    @GetMapping("/date/{date}/user")
    public ResponseEntity<List<Diet>> getDietByDateAndUserId(@PathVariable LocalDate date, @RequestParam Long userId) {
        return ResponseEntity.ok(dietService.getDietByDateAndUserId(date, userId));
    }
}

