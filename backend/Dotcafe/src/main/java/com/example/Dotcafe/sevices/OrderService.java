package com.example.Dotcafe.sevices;

import com.example.Dotcafe.entity.Cart;
import com.example.Dotcafe.entity.Dto.CartDto;
import com.example.Dotcafe.entity.Dto.OrderDto;
import com.example.Dotcafe.entity.Dto.OrderItemDto;
import com.example.Dotcafe.entity.Order;
import com.example.Dotcafe.entity.OrderItem;
import com.example.Dotcafe.entity.Progress;
import com.example.Dotcafe.mappers.CartMapper;
import com.example.Dotcafe.mappers.OrderItemMapper;
import com.example.Dotcafe.mappers.OrderMapper;
import com.example.Dotcafe.repository.CartRepository;
import com.example.Dotcafe.repository.OrderItemRepository;
import com.example.Dotcafe.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderItemMapper orderItemMapper;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartMapper cartMapper;
    private  final OrderRepository orderRepository;
    private  final OrderMapper orderMapper;

    public OrderService(OrderItemMapper orderItemMapper, OrderItemRepository orderItemRepository, CartRepository cartRepository, CartMapper cartMapper, OrderRepository orderRepository, OrderMapper orderMapper) {
        this.orderItemMapper = orderItemMapper;
        this.orderItemRepository = orderItemRepository;
        this.cartRepository = cartRepository;
        this.cartMapper = cartMapper;
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
    }

    public OrderItemDto addToCart(OrderItemDto orderItemDto, Long userId) {
        orderItemDto.setId(null);
        OrderItem orderItem = orderItemMapper.getOrderItem(orderItemDto, userId);
        orderItem.calcPrice();
        Optional<Cart> cart = cartRepository.findByCustomerId(userId);
        if (cart.isEmpty()) {
            throw new IllegalArgumentException("can't find cart ya ahmed !!");
        }
        orderItemRepository.save(orderItem);
        cart.get().addOrderItem(orderItem);
        cartRepository.save(cart.get());
        return orderItemMapper.getDto(orderItem);

    }

    public CartDto updateCart(CartDto cartDto) {
        Cart cart = cartMapper.getCart(cartDto);
        cart.updateTotalPrice();
        cart = cartRepository.save(cart);
        return cartMapper.getDto(cart);
    }

  public OrderDto placeorder(Long userId, CartDto cartDto){
       Order order=new Order();
       Cart oldcart=cartMapper.getCart(cartDto);
       order.setId(null);
       order.setOrderItems(oldcart.getOrderItems());
       order.setCustomer(oldcart.getCustomer());
       order.setTotalPrice(oldcart.getTotalPrice());
       order.setProgress(Progress.ORDER_PLACED);
       oldcart.setOrderItems(new ArrayList<>());
       orderRepository.save(order);
       cartRepository.save(oldcart);

       return orderMapper.getDto(order);}

//    public void deleteOrderItem(Long orderitemid) {
//
//        Optional<OrderItem> deleteditem = orderItemRepository.findById(orderitemid);
//        Cart currentcart = deleteditem.get().getCart();
//        currentcart.getOrderItems().remove(deleteditem.get());
//        cartRepository.save(currentcart);
//    }

}
