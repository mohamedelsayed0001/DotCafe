package com.example.Dotcafe.repository;

import com.example.Dotcafe.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {

    Optional<Customer>getCustomerByMail(String mail);

    List<Customer> findByRole(String role);

}
