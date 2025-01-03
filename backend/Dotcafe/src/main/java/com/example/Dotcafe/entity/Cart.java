package com.example.Dotcafe.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Setter
@Getter
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
    private Double orderPrice = 0D;
    private Double taxes = 0D;
    private Double total= 0D;
    private Integer points=0;
    public void addOrderItem(OrderItem orderItem){
        orderItems.add(orderItem);
        orderPrice +=orderItem.getTotalPrice();
    }
    public void updateCart(){
        orderPrice = 0D;
        for(OrderItem orderItem : orderItems){
            orderItem.calcPrice();
            orderPrice +=orderItem.getTotalPrice();
        }
        orderPrice = Math.round(orderPrice*1000)/1000.0;
        taxes = .12* orderPrice;
        taxes = Math.round(taxes*1000)/1000.0;
        total = orderPrice +taxes- ((double)points/100);
        total = Math.round(total*1000)/1000.0;
        if(orderItems.isEmpty()){
            total = 0D;
        }
    }


}
