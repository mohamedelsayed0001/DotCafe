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

    public OrderService(OrderItemMapper orderItemMapper, OrderItemRepository orderItemRepository, CartRepository cartRepository, CartMapper cartMapper, OrderRepository orderRepository, OrderMapper orderMapper, CustomerRepository customerRepository) {
        this.orderItemMapper = orderItemMapper;
        this.orderItemRepository = orderItemRepository;
        this.cartRepository = cartRepository;
        this.cartMapper = cartMapper;
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.customerRepository = customerRepository;
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

//    public CartDto updateCart(CartDto cartDto) {
//        Cart cart = cartMapper.getCart(cartDto);
//        cart.updateTotalPrice();
//        cart = cartRepository.save(cart);
//        return cartMapper.getDto(cart);
//    }
public CartDto updateCart(OrderItemDto orderItemDto, Long userId) {
    OrderItem orderItem = orderItemMapper.getOrderItem(orderItemDto, userId);
    orderItem.calcPrice();
    orderItemRepository.save(orderItem);
//    for(OrderItem i : cart.getOrderItems())
//    {
//        if(i.getId().equals(orderItemDto.getId())){
//            cart.getOrderItems().remove(i);
//            cart.getOrderItems().add(orderItemMapper.getOrderItem(orderItemDto,userId));
//        }
//    }
    Optional<Cart> cartOpt = cartRepository.findByCustomerId(userId);
    Cart cart = cartOpt.get();
    cart.updateCart();
    cartRepository.save(cart);
    return cartMapper.getDto(cart);
}

  public OrderDto placeOrder(Long userId){
       Order order = new Order();
      Optional<Customer> customerExist = customerRepository.findById(userId);
      if(customerExist.isEmpty()) {
          throw new IllegalArgumentException("cust not found");
      }
      Customer customer = customerExist.get();

       Cart cart = customer.getCart();
       cart.updateCart();
       order.setId(null);
       order.setTotal(cart.getTotal());
       order.setTaxes(cart.getTaxes());
       order.setCustomer(customer);
       order.setOrderPrice(cart.getOrderPrice());
       order.setProgress(Progress.ORDER_PLACED);
       order.setOrderItems(new ArrayList<>());
       order.setPoints(cart.getPoints());
       customer.setPoints(customer.getPoints()-cart.getPoints()+10);
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
       return orderMapper.getDto(fullOrder.get());
    }
    public void updatepoints(Long userId,Integer points){
        Customer customer = customerRepository.findById(userId).
        orElseThrow(()-> new IllegalArgumentException("Cart not found"));
        Cart cart = customer.getCart();
        if(points > customer.getPoints()){
            throw new IllegalArgumentException("points exceeded");
        }
        cart.setPoints(points);
        cart.updateCart();
        cartRepository.save(cart);

    }
    public void deleteOrderItem(Long orderItemId) {
        Optional<OrderItem> deletedItem = orderItemRepository.findById(orderItemId);
        Cart currentcart = deletedItem.get().getCart();
        currentcart.getOrderItems().remove(deletedItem.get());
        cartRepository.save(currentcart);
    }

}
