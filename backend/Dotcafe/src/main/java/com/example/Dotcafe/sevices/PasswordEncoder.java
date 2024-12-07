package com.example.Dotcafe.sevices;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;


@Service
public class PasswordEncoder {

    // Method to hash the password
    public String encodePassword(String rawPassword) {
        return BCrypt.hashpw(rawPassword, BCrypt.gensalt());
    }

    // Method to check if the password matches the hashed password
    public boolean checkPassword(String rawPassword, String storedHashedPassword) {
        return BCrypt.checkpw(rawPassword, storedHashedPassword);
    }

}