package com.example.Dotcafe.entity.Dto;

import com.example.Dotcafe.entity.Cart;
import com.example.Dotcafe.entity.Order;
import com.example.Dotcafe.entity.Product;
import com.example.Dotcafe.entity.Size;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItemDto {
    private  Long id;
    private Long productId;
    private String productName;
    private Integer quantity;
    private Size size;
    private String customize;
    private Double price;
    private Double totalPrice;

}
