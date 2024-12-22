package com.example.Dotcafe.mappers;

import com.example.Dotcafe.entity.Cart;
import com.example.Dotcafe.entity.Customer;
import com.example.Dotcafe.entity.Dto.OrderItemDto;
import com.example.Dotcafe.entity.OrderItem;
import com.example.Dotcafe.entity.Product;
import com.example.Dotcafe.repository.CartRepository;
import com.example.Dotcafe.repository.CustomerRepository;
import com.example.Dotcafe.repository.ProductRepository;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@Service
public class OrderItemMapper {

    private final ProductRepository productRepository;
    private final CartRepository cartRepository;
    private final CustomerRepository customerRepository;
    public OrderItemMapper(ProductRepository productRepository, CartRepository cartRepository, CustomerRepository customerRepository) {
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
        this.customerRepository = customerRepository;
    }

    public OrderItemDto getDto(OrderItem orderItem){
        return OrderItemDto.builder().
                id(orderItem.getId()).
                quantity(orderItem.getQuantity()).
                size(orderItem.getSize()).
                price(orderItem.getPrice()).
                customize(orderItem.getCustomize()).
                productId(orderItem.getProduct().getId()).
                productName(orderItem.getProduct().getName()).
                build();

    }

    public OrderItem getOrderItem(OrderItemDto orderItemDto,Long userId){
        Optional<Product> productExist = productRepository.findById(orderItemDto.getProductId());
        if(productExist.isEmpty()){
            throw new IllegalArgumentException("product in order not found");
        }
        Product product = productExist.get();

        Optional<Customer> customer = customerRepository.findById(userId);
        if(customer.isEmpty()){
            throw new IllegalArgumentException("Customer not found");
        }
        Cart cart = customer.get().getCart();
        
        return OrderItem.builder().
                order(null).
                cart(cart).
                customize(orderItemDto.getCustomize()).
                product(product).
                id(orderItemDto.getId()).
                price(orderItemDto.getPrice()).
                quantity(orderItemDto.getQuantity()).
                size(orderItemDto.getSize())
                .build();

        }



}
