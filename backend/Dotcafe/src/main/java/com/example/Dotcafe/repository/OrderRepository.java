package com.example.Dotcafe.repository;

import com.example.Dotcafe.entity.Order;
import org.hibernate.query.criteria.JpaSearchOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
}
