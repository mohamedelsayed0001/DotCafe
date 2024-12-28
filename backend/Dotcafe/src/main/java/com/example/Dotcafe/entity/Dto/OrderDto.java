package com.example.Dotcafe.entity.Dto;

import com.example.Dotcafe.entity.Progress;
import com.fasterxml.jackson.annotation.JsonFormat;
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
    private Double orderPrice;
    private Double taxes;
    private Double total;
    private Integer points;
    private List<OrderItemDto> orderItems;
    private Progress progress;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime localDateTime;

}
