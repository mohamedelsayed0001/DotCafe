package com.example.Dotcafe.sevices;

import com.example.Dotcafe.entity.Cart;
import com.example.Dotcafe.entity.Customer;
import com.example.Dotcafe.entity.Dto.CartDto;
import com.example.Dotcafe.entity.Dto.CustomerDto;
import com.example.Dotcafe.mappers.CartMapper;
import com.example.Dotcafe.repository.CartRepository;
import com.example.Dotcafe.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final CartRepository cartRepository;
    private  final CartMapper cartMapper;

    public CustomerService(CustomerRepository customerRepository, PasswordEncoder passwordEncoder, CartRepository cartRepository, CartMapper cartMapper) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
        this.cartRepository = cartRepository;
        this.cartMapper = cartMapper;
    }

    public CustomerDto login(CustomerDto customerDto) throws IllegalArgumentException{
        Optional<Customer> customer = customerRepository.getCustomerByMail(customerDto.getMail());
        if(customer.isEmpty()){
            throw new IllegalArgumentException("Account not found signup to continue");
        }
        else if(!passwordEncoder.checkPassword(customerDto.getPassword(),customer.get().getPassword())){
            throw new IllegalArgumentException("Wrong password");
        }
        else{
            return customer.get().getDto();
        }
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
        newcustomer.setCart(createcart(newcustomer));
        customerRepository.save(newcustomer);
        return newcustomer.getDto();

    }
    public Cart createcart(Customer newcustomer){
        Cart cart=new Cart();
        cart.setId(null);
        cart.setCustomer(newcustomer);
        cart.setOrderItems(new ArrayList<>());

     return cartRepository.save(cart);
    }

    public List<CustomerDto> getAllUsers() {
        List<Customer> cutomers = customerRepository.findAll();
        List<CustomerDto> cutomerDtos = new ArrayList<>();

        for (Customer customer : cutomers) {
            cutomerDtos.add(customer.getDto());
        }

        return cutomerDtos;
    }
    public CartDto getcart(Long id){
        Optional <Cart>cart= cartRepository.findByCustomerId(id);
        return cartMapper.getDto(cart.get());
    }
    public CustomerDto updateUser(CustomerDto dto) throws IllegalArgumentException{
        Optional<Customer> opCustomer = customerRepository.findById(dto.getId());

        if(opCustomer.isPresent()) {
            Customer customer = opCustomer.get();
            customer.setRole(dto.getRole());
            customer.setPoints(dto.getPoints());
            customerRepository.save(customer);

            return customer.getDto();

        } else {
            throw new IllegalArgumentException("Customer doesn't exist");
        }
    }

    public String deleteUser (Long userId) throws IllegalArgumentException {
        Optional<Customer> opCustomer = customerRepository.findById(userId);

        if(opCustomer.isPresent()) {
            Customer customer= opCustomer.get();

            if(customer.getRole().equals("admin")) {
                List<Customer> admins = customerRepository.findByRoleIgnoreCase("admin");
                if(admins.size() == 1) {
                    throw new IllegalArgumentException("Can't delete the last admin");
                }
            }

            customerRepository.delete(customer);
            return "User deleted Successfully";
        } else {
            throw new IllegalArgumentException("Customer doesn't exist");
        }
    }
}