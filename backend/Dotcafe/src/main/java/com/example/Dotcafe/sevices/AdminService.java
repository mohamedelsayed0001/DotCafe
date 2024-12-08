package com.example.Dotcafe.sevices;
import com.example.Dotcafe.entity.Category;
import com.example.Dotcafe.entity.Dto.CategoryDto;
import com.example.Dotcafe.repository.CategoryRepository;
import com.example.Dotcafe.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;



@Service
public class AdminService {

    static CategoryRepository categoryRepository;

    public CategoryDto createCategory(CategoryDto categoryDto) throws Exception{
        Optional<Category> pastcategory = categoryRepository.getCategorybyname(categoryDto.getName());
        if (pastcategory.isPresent()) {
            throw new IllegalArgumentException();
        }
     Category newcategory= categoryRepository.save(categoryDto.getCategory());
     return newcategory.getcategoryDto();


 }
}
