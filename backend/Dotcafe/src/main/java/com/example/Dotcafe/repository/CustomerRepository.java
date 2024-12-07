package com.example.Dotcafe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Customer getCustomerByMail(String mail);
    boolean existsByMail(String mail);
}
