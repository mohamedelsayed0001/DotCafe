package com.example.Dotcafe.sevices;

import com.example.Dotcafe.entity.Cart;
import com.example.Dotcafe.entity.Customer;
import com.example.Dotcafe.entity.Dto.CartDto;
import com.example.Dotcafe.entity.Dto.OrderItemDto;
import com.example.Dotcafe.entity.OrderItem;
import com.example.Dotcafe.mappers.CartMapper;
import com.example.Dotcafe.mappers.OrderItemMapper;
import com.example.Dotcafe.repository.CartRepository;
import com.example.Dotcafe.repository.OrderItemRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderService {

   private final OrderItemMapper orderItemMapper;
   private final OrderItemRepository orderItemRepository;
   private final CartRepository cartRepository;
   private final CartMapper cartMapper;

    public OrderService(OrderItemMapper orderItemMapper, OrderItemRepository orderItemRepository, CartRepository cartRepository, CartMapper cartMapper) {
        this.orderItemMapper = orderItemMapper;
        this.orderItemRepository = orderItemRepository;
        this.cartRepository = cartRepository;
        this.cartMapper = cartMapper;
    }

    public OrderItemDto addToCart(OrderItemDto orderItemDto,Long userId){
        orderItemDto.setId(null);
        OrderItem orderItem = orderItemMapper.getOrderItem(orderItemDto,userId);
        orderItem.calcPrice();
        Optional<Cart> cart = cartRepository.findByCustomerId(userId);
        if(cart.isEmpty()){
            throw new IllegalArgumentException("can't find cart ya ahmed !!");
        }
        cart.get().addOrderItem(orderItem);
        cartRepository.save(cart.get());
        return orderItemMapper.getDto(orderItem);

    }

    public CartDto updateCart(CartDto cartDto){
        Cart cart = cartMapper.getCart(cartDto);
        cart.updateTotalPrice();
        cart = cartRepository.save(cart);
        return cartMapper.getDto(cart);
    }



}
