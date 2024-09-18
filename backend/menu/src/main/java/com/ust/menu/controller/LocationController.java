package com.ust.menu.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.ust.menu.service.LocationService;
import java.util.Map;
 
@CrossOrigin(origins = "http://localhost:4200")  // Allow requests from Angular frontend
@RestController
public class LocationController {
 
    private final LocationService locationService;
 
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }
    
    @GetMapping("/track-location")
    public Map<String, String> trackUserLocation(@RequestParam double latitude, @RequestParam double longitude) {
        String locationMessage = locationService.trackLocation(latitude, longitude);
        return Map.of("message", locationMessage);
    }
 
    @GetMapping("/track-location-manual")
    public Map<String, String> trackUserLocationManual(@RequestParam double latitude, @RequestParam double longitude) {
        String locationMessage = locationService.trackLocation(latitude, longitude);
        return Map.of("message", locationMessage);
    }
}
 
