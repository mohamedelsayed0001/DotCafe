package com.example.Dotcafe.sevices;
import com.example.Dotcafe.entity.Category;
import com.example.Dotcafe.entity.Dto.CategoryDto;
import com.example.Dotcafe.entity.Product;
import com.example.Dotcafe.repository.CategoryRepository;
import com.example.Dotcafe.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Locale;
import java.util.Optional;



@Service
public class AdminService {

   private final CategoryRepository categoryRepository;
   private final ProductRepository productRepository;

    public AdminService(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
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
                productRepository.save(p);
            }
            categoryRepository.deleteById(id);
        }


    }


}
