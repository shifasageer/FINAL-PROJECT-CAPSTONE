package com.jwt.jwtcapstone.repo;

import com.jwt.jwtcapstone.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepo extends JpaRepository<Users, Long> {

    Users findByUsername(String username);
    
    Users findByEmailaddress(String emailaddress);
    
    Users findById(long id);

}
