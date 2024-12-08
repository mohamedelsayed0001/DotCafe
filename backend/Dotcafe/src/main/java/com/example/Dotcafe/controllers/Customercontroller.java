package com.example.Dotcafe.controllers;

import com.example.Dotcafe.entity.Dto.CustomerDto;
import com.example.Dotcafe.repository.CustomerRepository;
import com.example.Dotcafe.sevices.CustomerService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
public class Customercontroller {

    private final CustomerService customerService;
    private final CustomerRepository customerRepository;

    @SneakyThrows


    public Customercontroller(CustomerService customerService, CustomerRepository customerRepository) {
        this.customerService = customerService;
        this.customerRepository = customerRepository;
    }
    @PostMapping("/signup")
    public ResponseEntity<?> create(@RequestBody CustomerDto customerDto){
      try {
          CustomerDto createdaccount = customerService.signup(customerDto);
          return new ResponseEntity<>(createdaccount,HttpStatus.OK);
      } catch (IllegalArgumentException e) {
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("you already have an account");
      } catch (Exception e) {
          throw new RuntimeException(e);
      }

    }
}