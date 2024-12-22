package com.example.Dotcafe.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.Generated;

@Entity
@Data
@Builder
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    @ManyToOne
    private Product product;
    private Integer quantity;
    @Enumerated(EnumType.STRING)
    private Size size;
    private String customize;
    private Double price;
    @ManyToOne
    private Order order;
    @ManyToOne
    private Cart cart;


}
