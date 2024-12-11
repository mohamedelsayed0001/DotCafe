package com.example.Dotcafe.sevices;

import com.example.Dotcafe.entity.Category;
import com.example.Dotcafe.entity.Dto.CategoryDto;
import com.example.Dotcafe.entity.Dto.ProductDto;
import com.example.Dotcafe.entity.Item;
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
//
//            Category category = isACategory.get();
//            category.addProduct(newProduct);
//            categoryRepository.save(category);

            productDto = newProduct.getDto();
            return productDto;

        }
        throw new IllegalArgumentException();

    }
    public ProductDto delete(ProductDto productDto) {
        Optional<Product> currentProduct = productRepository.findById(productDto.getId());
        if(currentProduct.isPresent()){
          Optional<Category> isACategory = categoryRepository.findById(productDto.getCategoryId());
        if (isACategory.isPresent()){
           // Product product = productDto.getProduct();
            currentProduct.get().setInStock(false);
//            product.setCategory(isACategory.get());
//            Product newProduct = productRepository.save(product);
//            Category category = isACategory.get();
//            category.addProduct(newProduct);
//            categoryRepository.save(category);
            productDto = currentProduct.get().getDto();
            return productDto;

    } else {
            throw new IllegalArgumentException("this category doesn't exist");
        }
    } else {
        throw new IllegalArgumentException("this product is not available");
    }}
    public ProductDto edit(ProductDto productDto) throws IllegalArgumentException {
        Optional<Product> currentProduct = productRepository.findById(productDto.getId());

        if (currentProduct.isPresent() ) {
            Optional<Product> otheritem = productRepository.getProductByName(productDto.getName());
            if (otheritem.isPresent() && !otheritem.get().getId().equals(productDto.getId())) {
                throw new IllegalArgumentException("Another product with the same name already exists.");
            }
            Optional<Category> isACategory = categoryRepository.findById(productDto.getCategoryId());
            if (isACategory.isPresent()) {
                Product product = productDto.getProduct();
                product.setId(currentProduct.get().getId());
                product.setCategory(isACategory.get());
                Product newProduct = productRepository.save(product);
//
//                Category category = isACategory.get();
//                category.addProduct(newProduct);
//                categoryRepository.save(category);

                productDto = newProduct.getDto();
                return productDto;}
      else {
                throw new IllegalArgumentException("this category doesn't exist");
            }
        } else {
            throw new IllegalArgumentException("this product is not available");
        }
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