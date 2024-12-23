package com.example.Dotcafe.mappers;

import com.example.Dotcafe.entity.Dto.OrderDto;
import com.example.Dotcafe.entity.Dto.OrderItemDto;
import com.example.Dotcafe.entity.Order;
import com.example.Dotcafe.entity.OrderItem;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderMapper {
    private final OrderItemMapper orderItemMapper;

    public OrderMapper(OrderItemMapper orderItemMapper) {
        this.orderItemMapper = orderItemMapper;
    }

    public OrderDto getDto(Order order) {
        List<OrderItemDto> orderItemDtoList = new ArrayList<>();
        for(OrderItem orderItem :order.getOrderItems()){
            orderItemDtoList.add(orderItemMapper.getDto(orderItem));
        }
        return OrderDto.builder().
                id(order.getId()).
                userMail(order.getCustomer().getMail()).
                orderItems(orderItemDtoList).
                orderPrice(order.getOrderPrice()).
                total(order.getTotal()).
                taxes(order.getTaxes()).
                localDateTime(order.getLocalDateTime()).
                progress(order.getProgress()).
                build();
    }

}
