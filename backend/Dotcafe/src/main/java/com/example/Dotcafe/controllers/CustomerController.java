package com.example.Dotcafe.controllers;

import com.example.Dotcafe.entity.Dto.CustomerDto;
import com.example.Dotcafe.repository.CartRepository;
import com.example.Dotcafe.sevices.CustomerService;
import lombok.SneakyThrows;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    private final CustomerService customerService;
    private final CartRepository cartRepository;

    public CustomerController(CustomerService customerService, CartRepository cartRepository) {
        this.customerService = customerService;
        this.cartRepository = cartRepository;
    }

    @SneakyThrows

    @PostMapping("/signup")
    public ResponseEntity<?> create(@RequestBody CustomerDto customerDto) {
        try {
            CustomerDto createdAccount = customerService.signup(customerDto);
            return new ResponseEntity<>(createdAccount, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CustomerDto customerDto) {
        try {
            return new ResponseEntity<>(customerService.login(customerDto), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(customerService.getCustomer(id), HttpStatus.OK);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/cart/{userId}")
    public ResponseEntity<?> getcart(@PathVariable Long userId) {
        return new ResponseEntity<>(customerService.getcart(userId), HttpStatus.ACCEPTED);
    }


    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getprofile(@PathVariable Long userId){
        try {
            return new ResponseEntity<>(customerService.getprofile(userId), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/profile/edit/{userId}")
    public ResponseEntity<?> editprofile(@PathVariable Long userId,@RequestBody CustomerDto customerDto){
        try {
            return new ResponseEntity<>(customerService.editprofile(userId,customerDto), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}