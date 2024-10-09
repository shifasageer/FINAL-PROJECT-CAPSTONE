package com.jwt.jwtcapstone.controller;

import com.jwt.jwtcapstone.dto.AuthenticationResponse;
import com.jwt.jwtcapstone.model.Users;
import com.jwt.jwtcapstone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:4200",
methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.OPTIONS,RequestMethod.PUT,RequestMethod.DELETE})
@RestController
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/register")
    public Users register(@RequestBody Users user) {
        return service.register(user);
    }

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody Users user) {
        return service.verify(user);
    }

    @GetMapping("/userdetails")
    public Users userdetailsById(@RequestParam Long id) {
        return service.getUserById(id);
    }
    
}

