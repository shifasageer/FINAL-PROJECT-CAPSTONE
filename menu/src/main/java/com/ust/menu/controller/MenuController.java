package com.ust.menu.controller;

import com.ust.menu.entity.Menu;
import com.ust.menu.exception.ResourceNotFoundException;
import com.ust.menu.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins="http://localhost:4200",
methods = {RequestMethod.GET,RequestMethod.OPTIONS,RequestMethod.PUT,RequestMethod.DELETE})
public class MenuController {

    @Autowired
    private MenuService menuService;

    // Create a new emergency contact
    @PostMapping("/contacts")
    public ResponseEntity<Menu> createContact(@RequestBody Menu menu, @RequestParam Long userId) {
    	menu.setUserId(userId);
        Menu createdContact = menuService.createContact(menu);
        return new ResponseEntity<>(createdContact, HttpStatus.CREATED);
    }

    // Get all emergency contacts
//    @GetMapping("/contacts")
//    public ResponseEntity<List<Menu>> getAllContacts() {
//        List<Menu> contacts = menuService.getAllContacts();
//        return new ResponseEntity<>(contacts, HttpStatus.OK);
//    }
    
    @GetMapping("/contacts")
    public ResponseEntity<List<Menu>> getContactsByUserId(@RequestParam Long userId) {
        List<Menu> contacts = menuService.getContactsByUserId(userId);
        return ResponseEntity.ok(contacts);
    }

    // Get a single emergency contact by ID
//    @GetMapping("/contacts/{id}")
//    public ResponseEntity<Menu> getContactById(@PathVariable Long id) {
//        Menu contact = menuService.getContactById(id);
//        return new ResponseEntity<>(contact, HttpStatus.OK);
//    }

    // Update an existing emergency contact by ID
    @PutMapping("/contacts/{id}")
    public ResponseEntity<Menu> updateContact(@PathVariable Long id, @RequestBody Menu menu) {
        Menu updatedContact = menuService.updateContact(id, menu);
        return new ResponseEntity<>(updatedContact, HttpStatus.OK);
    }

    // Delete an emergency contact by ID
//    @DeleteMapping("/contacts/{firstName}")
//    public ResponseEntity<?> deleteContact(@PathVariable String firstName) {
//    	try {
//            menuService.deleteContact(firstName);
//            return new ResponseEntity<>("Deleted succefully",HttpStatus.OK);
//        } catch (ResourceNotFoundException e) {
//            return ResponseEntity.status(404).body(e.getMessage());
//        }
//        
//    }
    
    @DeleteMapping("/{userId}/contact")
    public ResponseEntity<?> deleteContact(@PathVariable Long userId, @RequestParam String firstName) {
  
         menuService.deleteContactByUserIdAndContactName(userId, firstName);
         return new ResponseEntity<>("Deleted succefully",HttpStatus.OK);
     
    }
    
    
    
    
    
    
}
