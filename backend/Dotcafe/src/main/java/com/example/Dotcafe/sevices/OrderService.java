package com.example.Dotcafe.sevices;

import com.example.Dotcafe.entity.*;
import com.example.Dotcafe.entity.Dto.CartDto;
import com.example.Dotcafe.entity.Dto.OrderDto;
import com.example.Dotcafe.entity.Dto.OrderItemDto;
import com.example.Dotcafe.mappers.CartMapper;
import com.example.Dotcafe.mappers.OrderItemMapper;
import com.example.Dotcafe.mappers.OrderMapper;
import com.example.Dotcafe.repository.CartRepository;
import com.example.Dotcafe.repository.CustomerRepository;
import com.example.Dotcafe.repository.OrderItemRepository;
import com.example.Dotcafe.repository.OrderRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
    private final CustomerRepository customerRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public OrderService(OrderItemMapper orderItemMapper, OrderItemRepository orderItemRepository, CartRepository cartRepository, CartMapper cartMapper, OrderRepository orderRepository, OrderMapper orderMapper, CustomerRepository customerRepository, SimpMessagingTemplate simpMessagingTemplate) {
        this.orderItemMapper = orderItemMapper;
        this.orderItemRepository = orderItemRepository;
        this.cartRepository = cartRepository;
        this.cartMapper = cartMapper;
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.customerRepository = customerRepository;
        this.simpMessagingTemplate = simpMessagingTemplate;
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
        cart.get().updateCart();
        cartRepository.save(cart.get());
        return orderItemMapper.getDto(orderItem);

    }
public CartDto updateCart(OrderItemDto orderItemDto, Long userId) {
    OrderItem orderItem = orderItemMapper.getOrderItem(orderItemDto, userId);
    orderItem.calcPrice();
    orderItemRepository.save(orderItem);
    Cart cart = cartRepository.findByCustomerId(userId).
            orElseThrow(()->new IllegalArgumentException("Cart not found"));
    cart.updateCart();
    cartRepository.save(cart);
    return cartMapper.getDto(cart);
}

  public OrderDto placeOrder(Long userId){
       Order order = new Order();
      Customer customer = customerRepository.findById(userId).
              orElseThrow(()->new IllegalArgumentException("Customer not found"));

       Cart cart = customer.getCart();
       cart.updateCart();
       order.setId(null);
       order.setTotal(cart.getTotal());
       order.setTaxes(cart.getTaxes());
       order.setCustomer(customer);
       order.setOrderPrice(cart.getOrderPrice());
       order.setProgress(Progress.PLACED);
       order.setOrderItems(new ArrayList<>());
       order.setPoints(cart.getPoints());
       customer.setPoints(customer.getPoints()-cart.getPoints()+Math.round(cart.getOrderPrice()));
       order = orderRepository.save(order);
       customerRepository.save(customer);
       for(OrderItem orderItem : cart.getOrderItems()){
          orderItem.setCart(null);
          orderItem.setOrder(order);
          orderItemRepository.save(orderItem);
       }
       cart.setOrderItems(new ArrayList<>());
       cart.setOrderPrice(0D);
       cart.setTotal(0D);
       cart.setTaxes(0D);
       cart.setPoints(0);
       cartRepository.save(cart);
       Optional<Order> fullOrder = orderRepository.findById(order.getId());
       if(fullOrder.isEmpty()) throw new IllegalArgumentException("can't happen");
       simpMessagingTemplate.convertAndSend("/track/admin/order",orderMapper.getDto(fullOrder.get()));
       return orderMapper.getDto(fullOrder.get());
    }
    public CartDto updatePoints(Long userId, Integer points){
        Customer customer = customerRepository.findById(userId).
        orElseThrow(()-> new IllegalArgumentException("Cart not found"));
        Cart cart = customer.getCart();
        if(points > customer.getPoints()){
            throw new IllegalArgumentException("points exceeded");
        }
        cart.setPoints(points);
        cart.updateCart();
        return cartMapper.getDto(cartRepository.save(cart));

    }

    public CartDto deleteOrderItem(Long orderItemId) {
        OrderItem deletedItem = orderItemRepository.findById(orderItemId).
                orElseThrow(()->new IllegalArgumentException("Item not found"));;
        Cart currentcart = deletedItem.getCart();
        currentcart.getOrderItems().remove(deletedItem);
        currentcart.updateCart();
        return cartMapper.getDto(cartRepository.save(currentcart));
    }

}
