package com.example.Dotcafe.sevices;
import com.example.Dotcafe.entity.Category;
import com.example.Dotcafe.entity.Dto.CategoryDto;
import com.example.Dotcafe.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;



@Service
public class AdminService {

    static CategoryRepository categoryRepository;

    public CategoryDto createCategory(CategoryDto categoryDto) throws Exception{
        Optional<Category> pastcategory = categoryRepository.findCategoryByName(categoryDto.getName());
        if (pastcategory.isPresent()) {
            throw new IllegalArgumentException();
        }
        categoryDto.setId(null);
        categoryDto.setProducts(null);
     Category newcategory= categoryRepository.save(categoryDto.getCategory());
     return newcategory.getcategoryDto();


 }
}
