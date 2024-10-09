package com.ust.menu.service;


import com.ust.menu.entity.Menu;
import com.ust.menu.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ust.menu.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    // Create a new emergency contact
    public Menu createContact(Menu menu) {
        return menuRepository.save(menu);
    }

    // Retrieve all emergency contacts
//    public List<Menu> getAllContacts() {
//        return menuRepository.findAll();
//    }
    
    public List<Menu> getContactsByUserId(Long userId) {
        return menuRepository.findByUserId(userId);
    }

    // Retrieve a specific emergency contact by ID
    public Menu getContactById(Long id) {
        Optional<Menu> contact = menuRepository.findById(id);
        if (contact.isPresent()) {
            return contact.get();
        } else {
            throw new ResourceNotFoundException("Contact not found with ID: " + id);
        }
    }

    // Update an existing emergency contact by ID
    public Menu updateContact(Long id, Menu menuDetails) {
        Optional<Menu> contact = menuRepository.findById(id);
        if (contact.isPresent()) {
            Menu contactToUpdate = contact.get();
            contactToUpdate.setFirstName(menuDetails.getFirstName());
            contactToUpdate.setContactNo(menuDetails.getContactNo());
            return menuRepository.save(contactToUpdate);
        } else {
            throw new ResourceNotFoundException("Contact not found with ID: " + id);
        }
    }

    // Delete an emergency contact by ID
//    public void deleteContact(Long id) {
//        Optional<Menu> contact = menuRepository.findById(id);
//        if (contact.isPresent()) {
//            menuRepository.delete(contact.get());
//        } else {
//            throw new ResourceNotFoundException("Contact not found with ID: " + id);
//        }
//    }
    public void deleteContact(String firstName) {
        Optional<Menu> contact = menuRepository.findByFirstName(firstName);
        if (contact.isPresent()) {
            menuRepository.delete(contact.get());
        } else 
        {
            throw new ResourceNotFoundException("Contact not found with First Name: " + firstName);
        }
    }
    
    public void deleteContactByUserIdAndContactName(Long userId, String firstName) {
        Menu contact = menuRepository.findByUserIdAndFirstName(userId, firstName);
        if (contact != null) {
            menuRepository.delete(contact);
        }
    }
    
}
