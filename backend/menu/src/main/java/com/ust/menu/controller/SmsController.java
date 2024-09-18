package com.ust.menu.controller;
//
////import com.twilio.rest.api.v2010.account.Message;
////import com.twilio.type.PhoneNumber;
//import com.ust.menu.entity.Menu;
//import com.ust.menu.service.MenuService;
//import com.ust.menu.service.SmsService;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/sms")
//public class SmsController {
//
//    @Value("${twilio.phone-number}")
//    private String fromPhoneNumber;
//
//    private final MenuService menuService;
//    private final SmsService smsService;
//
//    public SmsController(MenuService menuService, SmsService smsService) {
//        this.menuService = menuService;
//        this.smsService = smsService;
//    }
//
//    @PostMapping("/send")
//    public String sendSms(@RequestParam(value = "lat", defaultValue = "8.515475313336047") String lat,
//                          @RequestParam(value = "lon", defaultValue = "76.89765991988219") String lon) {
//        List<Menu> contacts = menuService.getAllContacts();  // Fetch all contacts
//
//        String googleMapsLink = "https://www.google.com/maps?q=" + lat + "," + lon;
//        String messageBody = "This is an emergency message. Please respond immediately. Please come to the  Location: " + googleMapsLink;
//        String countryCode = "+91";  // Define your country code here
//
//        StringBuilder response = new StringBuilder();
//        for (Menu contact : contacts) {
//            String contactNo = contact.getContactNo().trim();
//
//            // Check if the contact number already starts with the country code
//            if (!contactNo.startsWith(countryCode)) {
//                contactNo = countryCode + contactNo;
//            }
//
//            try {
//                smsService.sendSms(contactNo, messageBody);
//                response.append("Message sent successfully to ").append(contactNo).append("\n");
//            } catch (Exception e) {
//                e.printStackTrace();
//                response.append("Failed to send message to ").append(contactNo).append(": ").append(e.getMessage()).append("\n");
//            }
//        }
//        return response.toString();
//    }
//}

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ust.menu.entity.Menu;
import com.ust.menu.service.MenuService;
import com.ust.menu.service.SmsMessageService;
import com.ust.menu.service.SmsService;

import java.util.List;

@RestController
@RequestMapping("/sms")
public class SmsController {

    @Autowired
    private MenuService menuService;

    @Autowired
    private SmsService smsService;

    @Autowired
    private SmsMessageService smsMessageService;  // Inject SmsMessageService

    @PostMapping("/send")
    public String sendSms(@RequestParam(value = "lat", defaultValue = "8.515475313336047") String lat,
                          @RequestParam(value = "lon", defaultValue = "76.89765991988219") String lon, 
                          @RequestParam Long userId) {
        List<Menu> contacts = menuService.getContactsByUserId(userId);  // Fetch all contacts

        String googleMapsLink = "https://www.google.com/maps?q=" + lat + "," + lon;
        String messageBody = smsMessageService.getMessageBody() + " Please come to the  Location: " + googleMapsLink;
        String countryCode = "+91";  // Define your country code here

        StringBuilder response = new StringBuilder();
        for (Menu contact : contacts) {
            String contactNo = contact.getContactNo().trim();

            // Check if the contact number already starts with the country code
            if (!contactNo.startsWith(countryCode)) {
                contactNo = countryCode + contactNo;
            }

            try {
                smsService.sendSms(contactNo, messageBody);
                response.append("Message sent successfully to ").append(contactNo).append("\n");
            } catch (Exception e) {
                e.printStackTrace();
                response.append("Failed to send message to ").append(contactNo).append(": ").append(e.getMessage()).append("\n");
            }
        }
        return response.toString();
    }
    
    @GetMapping("/getmessage")
    public String getCurrentMessage(@RequestParam Long userId) {
        return smsMessageService.getMessageBody();
    }

  
    @PostMapping("/edit/messageBody")
    public String updateMessageBody(@RequestBody String newMessageBody) {
        smsMessageService.updateMessageBody(newMessageBody);
        return newMessageBody;
    }
}

