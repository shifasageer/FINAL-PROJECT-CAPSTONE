package com.ust.menu.service;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
 
import java.util.List;
import java.util.Map;
 
@Service
public class LocationService {
 
    private final String API_KEY = "cf286c81eb1094eee78bee50da7d838f";
    private final RestTemplate restTemplate = new RestTemplate();
 
    // Define some sample dangerous zones (could be crime zones, accident-prone zones, etc.)
    private final double[][] dangerZones = {
        {40.730610, -73.935242},  // Example: New York Crime Zone
        {34.052235, -118.243683},  // Example: LA Accident Zone
        {13.085, 80.272},  // Example: Danger Zone 1
        {13.086, 80.268},
        {8.5361, 76.8830},
        {8.5358, 76.8825},
        {8.5365, 76.8840},
        {8.5355, 76.8835},
        {8.5370, 76.8820},
        {8.5372, 76.8845},
        {8.5368, 76.8850},
        {8.5350, 76.8815},
        {8.5380, 76.8835},
        {8.5345, 76.8820},
        {8.5375, 76.8805},
        {8.5360, 76.8845},
        {8.5357, 76.8810},
        {8.5363, 76.8860},
        {8.5378, 76.8855},
        {8.5362, 76.8870},
        {8.5348, 76.8800},
        {8.5385, 76.8825},
        {8.5340, 76.8835},
        {8.5373, 76.8820}
    };
 
    public String trackLocation(double latitude, double longitude) {
        String locationInfo = getLocationFromAPI(latitude, longitude);
 
        // Parse the location info to categorize zones (e.g., based on city, region, etc.)
        if (isInDangerZone(latitude, longitude)) {
            return "Warning: You are entering a crime or accident-prone area at location: " + locationInfo;
        }
        return "You are in a safe zone at location: " + locationInfo;
    }
 
    private boolean isInDangerZone(double lat, double lng) {
        double radius = 0.02; // Approx. 2km range for a danger zone
        for (double[] zone : dangerZones) {
            double zoneLat = zone[0];
            double zoneLng = zone[1];
            if (Math.abs(lat - zoneLat) < radius && Math.abs(lng - zoneLng) < radius) {
                return true;
            }
        }
        return false;
    }
 
    private String getLocationFromAPI(double latitude, double longitude) {
        String apiUrl = UriComponentsBuilder.fromHttpUrl("http://api.positionstack.com/v1/reverse")
                .queryParam("access_key", API_KEY)
                .queryParam("query", latitude + "," + longitude)
                .toUriString();
 
        try {
            // Use ParameterizedTypeReference for type safety
            ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                    apiUrl,
                    org.springframework.http.HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
 
            Map<String, Object> response = responseEntity.getBody();
 
            // Extract the necessary location details (city, region, etc.) from the response
            if (response != null && response.get("data") instanceof List) {
                List<?> data = (List<?>) response.get("data");
                if (!data.isEmpty()) {
                    Map<?, ?> locationData = (Map<?, ?>) data.get(0);
                    String city = (String) locationData.get("locality");
                    String region = (String) locationData.get("region");
                    String country = (String) locationData.get("country");
 
                    return city + ", " + region + ", " + country;
                }
            }
            return "Unknown location";
 
        } catch (Exception e) {
            return "Error fetching location: " + e.getMessage();
        }
    }
}