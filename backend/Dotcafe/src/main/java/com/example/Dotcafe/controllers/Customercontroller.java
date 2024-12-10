package com.example.Dotcafe.controllers;

import com.example.Dotcafe.entity.Customer;
import com.example.Dotcafe.entity.Dto.CustomerDto;
import com.example.Dotcafe.repository.CustomerRepository;
import com.example.Dotcafe.sevices.CustomerService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:5173")
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
          return new ResponseEntity<>(createdaccount,HttpStatus.CREATED);
      } catch (IllegalArgumentException e) {
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("you already have an account");
      } catch (Exception e) {
          throw new RuntimeException(e);
      }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CustomerDto customerDto){
        Optional<Customer> customer = customerRepository.getCustomerByMail(customerDto.getMail());
        try {
            customerService.login(customerDto);
            return new ResponseEntity<>(customer.get().getcustomerDto(), HttpStatus.ACCEPTED);
        }
        catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("account not found signup to continue");
        }
        catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("wrong password");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("null");
        }


    }
}