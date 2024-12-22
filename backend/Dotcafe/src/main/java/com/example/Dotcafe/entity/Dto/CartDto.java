package com.example.Dotcafe.entity.Dto;

import com.example.Dotcafe.entity.Customer;
import com.example.Dotcafe.entity.OrderItem;
import jakarta.persistence.*;
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
}
