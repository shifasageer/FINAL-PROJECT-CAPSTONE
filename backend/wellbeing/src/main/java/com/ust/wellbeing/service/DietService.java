package com.ust.wellbeing.service;

import com.ust.wellbeing.entity.Diet;
import com.ust.wellbeing.repository.DietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class DietService {

    @Autowired
    private DietRepository dietRepository;

    private final String apiUrl = "https://api.calorieninjas.com/v1/nutrition?query=";
    private final String apiKey = "cQuMjfvaAXNfzv82lS6KsQ==hlEFBN7Cq6nlq3RX"; // Replace with your actual API key

//    public Diet saveDiet(Diet diet) {
//        calculateNutrients(diet);
//        return dietRepository.save(diet);
//    }
//
//    public List<Diet> getDietByDate(java.util.Date date) {
//        return dietRepository.findByDate(date);
//    }
    
    
    
    public Diet saveDiet(Diet diet, Long userId) {
        diet.setUserId(userId);
        calculateNutrients(diet);
        return dietRepository.save(diet);
    }

    public List<Diet> getDietByDateAndUserId(LocalDate date, Long userId) {
        return dietRepository.findByDateAndUserId(date, userId);
    }
    

    private void calculateNutrients(Diet diet) {
        RestTemplate restTemplate = new RestTemplate();
        String[] meals = {diet.getBreakfast(), diet.getLunch(), diet.getDinner(), diet.getDrink(), diet.getSnack()};
        
        double totalCalories = 0, totalCarbs = 0, totalSugar = 0, totalProtein = 0, totalFiber = 0, totalFat = 0;

        for (String meal : meals) {
            if (meal != null && !meal.isEmpty()) {
                String url = apiUrl + meal;
                HttpHeaders headers = new HttpHeaders();
                headers.set("X-Api-Key", apiKey);
                HttpEntity<String> entity = new HttpEntity<>(headers);
                
                ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
                
                if (response.getStatusCode() == HttpStatus.OK) {
                    List<Map<String, Object>> items = (List<Map<String, Object>>) response.getBody().get("items");

                    for (Map<String, Object> item : items) {
                        totalCalories += (double) item.get("calories");
                        totalCarbs += (double) item.get("carbohydrates_total_g");
                        totalSugar += (double) item.get("sugar_g");
                        totalProtein += (double) item.get("protein_g");
                        totalFiber += (double) item.get("fiber_g");
                        totalFat += (double) item.get("fat_total_g");
                    }
                }
            }
        }

        diet.setTotalCalories(totalCalories);
        diet.setTotalCarbs(totalCarbs);
        diet.setTotalSugar(totalSugar);
        diet.setTotalProtein(totalProtein);
        diet.setTotalFiber(totalFiber);
        diet.setTotalFat(totalFat);
    }
}
