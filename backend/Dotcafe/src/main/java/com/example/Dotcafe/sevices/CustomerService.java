package com.example.Dotcafe.sevices;

import com.example.Dotcafe.entity.Cart;
import com.example.Dotcafe.entity.Customer;
import com.example.Dotcafe.entity.Dto.CartDto;
import com.example.Dotcafe.entity.Dto.CustomerDto;
import com.example.Dotcafe.entity.Dto.OrderDto;
import com.example.Dotcafe.entity.Dto.OrderItemDto;
import com.example.Dotcafe.entity.Order;
import com.example.Dotcafe.mappers.CartMapper;
import com.example.Dotcafe.mappers.OrderMapper;
import com.example.Dotcafe.repository.CartRepository;
import com.example.Dotcafe.repository.CustomerRepository;
import com.example.Dotcafe.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final CartRepository cartRepository;
    private  final CartMapper cartMapper;
    private final OrderMapper orderMapper;

    public CustomerService(CustomerRepository customerRepository, PasswordEncoder passwordEncoder, CartRepository cartRepository, CartMapper cartMapper, OrderMapper orderMapper) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
        this.cartRepository = cartRepository;
        this.cartMapper = cartMapper;
        this.orderMapper = orderMapper;
    }

    public CustomerDto login(CustomerDto customerDto) throws IllegalArgumentException{
        Customer customer = customerRepository.getCustomerByMail(customerDto.getMail()).
        orElseThrow(()-> new IllegalArgumentException("Account not found signup to continue"));;

       if(!passwordEncoder.checkPassword(customerDto.getPassword(),customer.getPassword())){
            throw new IllegalArgumentException("Wrong password");
        }

        CustomerDto response = new CustomerDto();
        response.setName(customer.getName());
        response.setRole(customer.getRole());
        response.setMail(customer.getMail());
        response.setId(customer.getId());
        response.setPoints(customer.getPoints());
        response.setPhoneNumber(customer.getPhoneNumber());
        return response;

    }
    public CustomerDto getCustomer(Long id) throws IllegalArgumentException{
        Customer customer = customerRepository.findById(id).
                orElseThrow(()-> new IllegalArgumentException("Customer not found"));;
        CustomerDto response = new CustomerDto();
        response.setName(customer.getName());
        response.setRole(customer.getRole());
        response.setMail(customer.getMail());
        response.setId(customer.getId());
        response.setPoints(customer.getPoints());
        response.setPhoneNumber(customer.getPhoneNumber());
        return response;

    }
    public CustomerDto signup(CustomerDto customerDto) throws IllegalArgumentException {
        Optional<Customer> customer = customerRepository.getCustomerByMail(customerDto.getMail());
        if (customer.isPresent()) {
            throw new IllegalArgumentException("You already have an account");
        }
        String encodedPassword = passwordEncoder.encodePassword(customerDto.getPassword());
        customerDto.setPassword(encodedPassword);
        customerDto.setId(null);
        customerDto.setRole("customer");
        customerDto.setPoints(0L);
        Customer newcustomer= customerRepository.save(customerDto.getCustomer());
        newcustomer.setCart(createCart(newcustomer));
        customerRepository.save(newcustomer);
        return newcustomer.getDto();

    }
    public Cart createCart(Customer newcustomer){
        Cart cart=new Cart();
        cart.setId(null);
        cart.setCustomer(newcustomer);
        cart.setOrderItems(new ArrayList<>());

     return cartRepository.save(cart);
    }
    public CartDto getCart(Long id){
        Cart cart= cartRepository.findByCustomerId(id).
                orElseThrow(()->new IllegalArgumentException("Cart not found"));;
        return cartMapper.getDto(cart);
    }
    public CustomerDto getProfile(Long userid) {
        Optional<Customer> userprofile = customerRepository.findById(userid);
        if (userprofile.isEmpty())
            throw new IllegalArgumentException("this user doesn't exist");

        List<Order> allOrders = userprofile.get().getOrders();
        List<OrderDto> orderDtoList = new ArrayList<>();
        for (Order order : allOrders) {
            orderDtoList.add(orderMapper.getDto(order));
        }
        orderDtoList.sort(Comparator.comparingLong(OrderDto::getId));
        CustomerDto profile = userprofile.get().getDto();
        profile.setOrders(orderDtoList);
        return profile;
    }
    public  CustomerDto editProfile(Long userid, CustomerDto customerDto){
        Optional<Customer> anotherCustomer = customerRepository.getCustomerByMail(customerDto.getMail());
         if(anotherCustomer.isPresent()&& !Objects.equals(anotherCustomer.get().getId(), userid)){
             throw new IllegalArgumentException("this email address is used");
         }
         Customer customer = customerRepository.findById(userid).
         orElseThrow(()-> new IllegalArgumentException("User not Found"));
         customer.setMail(customerDto.getMail());
         customer.setName(customerDto.getName());
         customer.setImage(customerDto.image());
         customer.setPhoneNumber(customerDto.getPhoneNumber());
         customerRepository.save(customer);
         customerDto = customer.getDto();
         List<OrderDto> orderDtoList = new ArrayList<>();
         for (Order order : customer.getOrders()){
            orderDtoList.add(orderMapper.getDto(order));
         }
         orderDtoList.sort(Comparator.comparingLong(OrderDto::getId));
         customerDto.setOrders(orderDtoList);
         return customerDto;
    }
}