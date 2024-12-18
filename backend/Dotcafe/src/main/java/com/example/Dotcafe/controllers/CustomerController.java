package com.example.Dotcafe.controllers;

import com.example.Dotcafe.entity.Dto.CustomerDto;
import com.example.Dotcafe.sevices.CustomerService;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    private final CustomerService customerService;

    @SneakyThrows


    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }
    @PostMapping("/signup")
    public ResponseEntity<?> create(@RequestBody CustomerDto customerDto){
      try {
          CustomerDto createdAccount = customerService.signup(customerDto);
          return new ResponseEntity<>(createdAccount,HttpStatus.CREATED);
      } catch (IllegalArgumentException e) {
          return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
      }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CustomerDto customerDto){
        try {
            return new ResponseEntity<>(customerService.login(customerDto), HttpStatus.CREATED);
        }
        catch (IllegalArgumentException e){
            return new ResponseEntity<>( e.getMessage(), HttpStatus.BAD_REQUEST);
        }



    }
}