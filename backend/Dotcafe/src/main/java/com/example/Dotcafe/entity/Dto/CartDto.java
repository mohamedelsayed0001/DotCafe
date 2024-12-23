package com.example.Dotcafe.entity.Dto;

import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartDto {
    private Long id;
    private Long customerId;
    private List<OrderItemDto> orderItems;
    private Double orderPrice = 0D; //order with out taxes
    private Double taxes = 0D;
    private Double total = 0D;
}
