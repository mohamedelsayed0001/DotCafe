package com.example.Dotcafe.sevices;
import com.example.Dotcafe.entity.Category;
import com.example.Dotcafe.entity.Dto.CategoryDto;
import com.example.Dotcafe.entity.Dto.OrderDto;
import com.example.Dotcafe.entity.Order;
import com.example.Dotcafe.entity.OrderItem;
import com.example.Dotcafe.entity.Product;
import com.example.Dotcafe.mappers.OrderMapper;
import com.example.Dotcafe.repository.CategoryRepository;
import com.example.Dotcafe.repository.OrderRepository;
import com.example.Dotcafe.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;



@Service
public class AdminService {

   private final CategoryRepository categoryRepository;
   private final ProductRepository productRepository;
   private final OrderRepository orderRepository;
   private final OrderMapper orderMapper;

    public AdminService(CategoryRepository categoryRepository, ProductRepository productRepository, OrderRepository orderRepository, OrderMapper orderMapper) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
    }

    public CategoryDto createCategory(CategoryDto categoryDto) throws IllegalArgumentException {
        Optional<Category> pastCategory = categoryRepository.findByNameIgnoreCase(categoryDto.getName());
        if (pastCategory.isPresent()) {
            throw new IllegalArgumentException("This category already exists");
        }
        categoryDto.setId(null);
       Category category = categoryRepository.save(categoryDto.getCategory());
       category.setProducts(new ArrayList<>());
       return category.getDto();


    }


    public CategoryDto editCategory(CategoryDto categoryDto) throws IllegalArgumentException{
        Optional<Category> pastCategory = categoryRepository.findById(categoryDto.getId());
        if (pastCategory.isPresent()) {

            Optional<Category> otherCategory = categoryRepository.findByNameIgnoreCase(categoryDto.getName());
            if(otherCategory.isPresent() && ! categoryDto.getId().equals(otherCategory.get().getId()))
                throw new IllegalArgumentException("This name already exist");

            Category category = categoryRepository.save(categoryDto.getCategory());
            return category.getDto();
        }
        else
            throw new IllegalArgumentException("This id or category does not exist");

    }

    public void deleteCategory(Long id){
        Optional<Category> category = categoryRepository.findById(id);
        if(category.isPresent()){

            for(Product p : category.get().getProducts()){
                p.setCategory(null);
                p.setInStock(false);
                p.setDeleted(true);
                productRepository.save(p);
            }
            categoryRepository.deleteById(id);
        }


    }

    public List<CategoryDto> menu(){
        return categoryRepository.findAll(Sort.by(Sort.Direction.ASC, "name"))
                .stream()
                .map(Category::getDtoAdmin)
                .toList();

    }

    public List<OrderDto> getOrders(int index,int size){
        Pageable pageable = PageRequest.of(index, size, Sort.by("localDateTime").descending());
        Page<Order> page = orderRepository.findAll(pageable);
        List<OrderDto> orders = new ArrayList<>();
        for(Order order : page.getContent()){
            orders.add(orderMapper.getDto(order));
        }
        return orders;


    }




}
