package com.example.Dotcafe.sevices;

import com.example.Dotcafe.entity.Category;
import com.example.Dotcafe.entity.Dto.CategoryDto;
import com.example.Dotcafe.entity.Dto.ProductDto;
import com.example.Dotcafe.entity.Product;
import com.example.Dotcafe.repository.CategoryRepository;
import com.example.Dotcafe.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AhmedService {

  private CategoryRepository categoryRepository;
  private ProductRepository productRepository;

    public AhmedService(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    public ProductDto createProduct(ProductDto productDto) throws CloneNotSupportedException,IllegalArgumentException {
        Optional<Product> isAProduct = productRepository.getProductByName(productDto.getName());
        if(isAProduct.isPresent()){
            throw new CloneNotSupportedException();
        }
        CategoryDto categoryDto = productDto.getCategory();
        Optional<Category> isACategory = categoryRepository.findById(categoryDto.getId());
        if (isACategory.isPresent()){
            Product product = productDto.getProduct();
            product.setId(null);
            product.setCategory(isACategory.get());
            Product newProduct = productRepository.save(product);
            Category category = isACategory.get();
            category.addProduct(newProduct);
            categoryRepository.save(category);
            productDto = newProduct.getDto();
            productDto.getCategory().setProducts(null);
            return productDto;

        }
        throw new IllegalArgumentException();

    }
    public List<CategoryDto> menu(){
        Iterable<Category> categories = categoryRepository.findAll();
        List<CategoryDto> menu = new ArrayList<>();
        for(Category category : categories){
            CategoryDto categoryDto = category.getcategoryDto();
            for(Product p : categoryDto.getProducts()){
                p.getCategory().setProducts(new ArrayList<>());
            }
            menu.add(categoryDto);
        }
        return menu;

    }




}
