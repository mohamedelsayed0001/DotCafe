package com.example.Dotcafe.sevices;

import com.example.Dotcafe.entity.Customer;
import com.example.Dotcafe.entity.Dto.CustomerDto;
import com.example.Dotcafe.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;
@Service
public class CustomerService {

    CustomerRepository customerRepository;


    private final PasswordEncoder passwordEncoder;

    public CustomerService(CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void login(CustomerDto customerDto) throws Exception{
        Optional<Customer> customer = customerRepository.getCustomerByMail(customerDto.getMail());
        if(customer.isEmpty()){
            throw new NoSuchElementException();
        }
        else if(!passwordEncoder.checkPassword(customerDto.getPassword(),customer.get().getPassword())){
            throw new IllegalArgumentException();
        }
    }
    public void signup(CustomerDto customerDto) throws Exception{

    }



}
