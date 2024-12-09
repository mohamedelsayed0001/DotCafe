package com.example.Dotcafe.sevices;
import com.example.Dotcafe.entity.Category;
import com.example.Dotcafe.entity.Dto.CategoryDto;
import com.example.Dotcafe.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;



@Service
public class AdminService {

   private final CategoryRepository categoryRepository;

    public AdminService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public CategoryDto createCategory(CategoryDto categoryDto) throws IllegalArgumentException {
        Optional<Category> pastcategory = categoryRepository.getCategoryByName(categoryDto.getName());
        if (pastcategory.isPresent()) {
            throw new IllegalArgumentException();
        }
        categoryDto.setId(null);
       Category category = categoryRepository.save(categoryDto.getCategory());
       category.setProducts(new ArrayList<>());
       return category.getDto();


    }


    public CategoryDto editCategory(CategoryDto categoryDto) throws IllegalArgumentException{
        Optional<Category> pastcategory = categoryRepository.findById(categoryDto.getId());
        if (pastcategory.isPresent()) {

            Optional<Category> othercategory = categoryRepository.getCategoryByName(categoryDto.getName());
            if(othercategory.isPresent() && othercategory.get().getId()!=categoryDto.getId())
                throw new IllegalArgumentException();


            Category category = categoryRepository.save(categoryDto.getCategory());
            return category.getDto();
        }
        else
            throw new IllegalArgumentException();

    }

}
