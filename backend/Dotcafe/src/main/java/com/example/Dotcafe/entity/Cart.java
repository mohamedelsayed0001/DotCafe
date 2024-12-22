package com.example.Dotcafe.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "cart",orphanRemoval = true)
    private List<OrderItem> orderItems;
    private Double totalPrice = 0D;

    public void addOrderItem(OrderItem orderItem){
        orderItems.add(orderItem);
        totalPrice+=orderItem.getTotalPrice();
    }
    public void updateTotalPrice(){
        totalPrice = 0D;
        for(OrderItem orderItem : orderItems){
            orderItem.calcPrice();
            totalPrice+=orderItem.getTotalPrice();
        }
    }


}
