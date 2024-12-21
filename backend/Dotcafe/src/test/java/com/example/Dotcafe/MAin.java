package com.example.Dotcafe.sevices;

import org.junit.jupiter.api.Test;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;


public class MAin {

   static String encodePassword(String rawPassword) {

        return BCrypt.hashpw(rawPassword, BCrypt.gensalt());
    }

    public static void main(String[] args) {


        System.out.println(encodePassword("1234"));
    }



}