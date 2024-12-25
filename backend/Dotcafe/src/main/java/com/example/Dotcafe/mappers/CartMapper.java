package com.example.Dotcafe.mappers;

import com.example.Dotcafe.entity.Cart;
import com.example.Dotcafe.entity.Customer;
import com.example.Dotcafe.entity.Dto.CartDto;
import com.example.Dotcafe.entity.Dto.OrderItemDto;
import com.example.Dotcafe.entity.Dto.ProductDto;
import com.example.Dotcafe.entity.OrderItem;
import com.example.Dotcafe.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class CartMapper {

    private final OrderItemMapper orderItemMapper;
    private final CustomerRepository customerRepository;

    public CartMapper(OrderItemMapper orderItemMapper, CustomerRepository customerRepository) {
        this.orderItemMapper = orderItemMapper;
        this.customerRepository = customerRepository;
    }

    public CartDto getDto(Cart cart){
        List<OrderItemDto> orderItemDtos = new ArrayList<>();
        for(OrderItem orderItem : cart.getOrderItems()) {
            orderItemDtos.add(orderItemMapper.getDto(orderItem));
        }
        orderItemDtos.sort(Comparator.comparingLong(OrderItemDto::getId));
        return CartDto.builder().
                id(cart.getId()).
                customerId(cart.getCustomer().getId()).
                orderItems(orderItemDtos).
                orderPrice(cart.getOrderPrice()).
                points(cart.getPoints()).
                taxes(cart.getTaxes()).
                total(cart.getTotal()).
                build();
    }

    public Cart getCart(CartDto cartDto){
        List<OrderItem> orderItems = new ArrayList<>();
        for(OrderItemDto orderItemDto : cartDto.getOrderItems()){
            orderItems.add(orderItemMapper.getOrderItem(orderItemDto,cartDto.getCustomerId()));
        }
        Optional<Customer> customer = customerRepository.findById(cartDto.getCustomerId());
        if(customer.isEmpty()){
            throw new IllegalArgumentException("customer not found");
        }
        return Cart.builder().
                customer(customer.get()).
                orderItems(orderItems).
                id(cartDto.getId()).
                points(cartDto.getPoints()).
                orderPrice(cartDto.getOrderPrice()).
                total(cartDto.getTotal()).
                taxes(cartDto.getTaxes()).
                build();
    }



}
