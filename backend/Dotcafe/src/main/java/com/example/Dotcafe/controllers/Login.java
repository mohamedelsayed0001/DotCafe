package com.example.Dotcafe.controllers;

import com.example.Dotcafe.entity.Customer;
import com.example.Dotcafe.entity.Dto.CustomerDto;
import com.example.Dotcafe.repository.CustomerRepository;
import com.example.Dotcafe.sevices.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
public class Login {
    CustomerService customerService;
    CustomerRepository customerRepository;

    public Login(CustomerService customerService, CustomerRepository customerRepository) {
        this.customerService = customerService;
        this.customerRepository = customerRepository;
    }

    @PostMapping("/hello")
    public ResponseEntity<?> login(@RequestBody CustomerDto customerDto){
        Optional<Customer> customer = customerRepository.getCustomerByMail(customerDto.getMail());
        try {
            customerService.login(customerDto);
            return new ResponseEntity<>(customer.get().getcustomerDto(), HttpStatus.ACCEPTED);
        }
        catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please signup");
        }
        catch (IllegalArgumentException e){
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("wrong password");
        }
        catch (Exception e){
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("null");
        }


    }

}
