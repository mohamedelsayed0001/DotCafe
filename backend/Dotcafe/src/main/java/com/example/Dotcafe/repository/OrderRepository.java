package com.example.Dotcafe.repository;

import com.example.Dotcafe.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findAllByCustomer_Id(Long userId);
    Page <Order> findAll(Pageable pageable);
}
