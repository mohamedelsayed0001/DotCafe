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
public class ProductService {
    private final ProductRepository productRepository;
   private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public ProductDto create(ProductDto productDto) throws CloneNotSupportedException,IllegalArgumentException {
        Optional<Product> isAProduct = productRepository.getProductByName(productDto.getName());
        if(isAProduct.isPresent()){
            throw new CloneNotSupportedException();
        }
        Optional<Category> isACategory = categoryRepository.findById(productDto.getCategoryId());
        if (isACategory.isPresent()){
            Product product = productDto.getProduct();
            product.setId(null);
            product.setInStock(true);
            product.setCategory(isACategory.get());

            Product newProduct = productRepository.save(product);

            Category category = isACategory.get();
            category.addProduct(newProduct);
            categoryRepository.save(category);

            productDto = newProduct.getDto();
            return productDto;

        }
        throw new IllegalArgumentException();

    }
    public ProductDto delete(ProductDto productDto) {
        Optional<Product> currentproduct = productRepository.findById(productDto.getId());
        if (currentproduct.isPresent()) {
            productDto.setInStock(false);
            Product newproduct = productRepository.save(productDto.getProduct());
            return newproduct.getDto();

        } else
            throw new IllegalArgumentException();

    }

    public ProductDto edit(ProductDto productDto) throws IllegalArgumentException {
        Optional<Product> currentproduct = productRepository.findById(productDto.getId());
        if (currentproduct.isPresent()) {
            Product newproduct = currentproduct.get();

            Product finalproduct = productRepository.save(productDto.getProduct());


            return finalproduct.getDto();
        }
        else
            throw new IllegalArgumentException();
    }

    public List<CategoryDto> menu(){
        Iterable<Category> categories = categoryRepository.findAll();
        List<CategoryDto> menu = new ArrayList<>();
        for(Category category : categories){
            CategoryDto categoryDto = category.getDto();
            menu.add(categoryDto);
        }
        return menu;

    }
}