package com.jwt.jwtcapstone.service;

import com.jwt.jwtcapstone.dto.AuthenticationResponse;
import com.jwt.jwtcapstone.model.Users;
import com.jwt.jwtcapstone.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private UserRepo repo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Users register(Users user) {
        if (user.getId() != null && repo.existsById(user.getId())) {
            throw new RuntimeException("A user with this ID already exists.");
        }

        if (repo.findByEmailaddress(user.getEmailaddress()) != null) {
            throw new RuntimeException("A user with this username already exists.");
        }

        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return user;
    }

    public AuthenticationResponse verify(Users user) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmailaddress(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(user.getEmailaddress());
            Users existingUser = repo.findByEmailaddress(user.getEmailaddress());
            return new AuthenticationResponse(token, existingUser.getId());
        } else {
            return new AuthenticationResponse("fail", null);
        }
    }

    public Users getuserdetails(String emailaddress) {
        return repo.findByEmailaddress(emailaddress);
    }
    
    public Users getUserById(Long id) {
        return repo.findById(id).orElse(null);
    }
}
