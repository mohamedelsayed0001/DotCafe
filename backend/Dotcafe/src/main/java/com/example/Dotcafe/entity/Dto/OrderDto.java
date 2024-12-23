package com.example.Dotcafe.entity.Dto;

import com.example.Dotcafe.entity.Customer;
import com.example.Dotcafe.entity.OrderItem;
import com.example.Dotcafe.entity.Progress;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDto {
    private Long id;
    private String userMail;
    private Double totalPrice;
    private List<OrderItemDto> orderItems;
    private Progress progress;
    @JsonFormat(pattern = "yyyy-MM-dd 'T' HH:mm:ss")
    private LocalDateTime localDateTime;

}
