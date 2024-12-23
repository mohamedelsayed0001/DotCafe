package com.example.Dotcafe.sevices;

import com.example.Dotcafe.entity.Category;
import com.example.Dotcafe.entity.Dto.CategoryDto;
import com.example.Dotcafe.entity.Dto.ProductDto;
import com.example.Dotcafe.entity.Product;
import com.example.Dotcafe.repository.CategoryRepository;
import com.example.Dotcafe.repository.ProductRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class ProductService {
    private final ProductRepository productRepository;
   private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public ProductDto create(ProductDto productDto) throws IllegalArgumentException {
        productDto.setId(null);
        Optional<Product> isAProduct = productRepository.findByNameIgnoreCase(productDto.getName());
        if(isAProduct.isPresent() && isAProduct.get().getInStock() && !isAProduct.get().isDeleted()){
            throw new IllegalArgumentException("Product name exist");
        }
        if(productDto.getCategoryId()==null){
            throw new IllegalArgumentException("Category not found");
        }
        Optional<Category> isACategory = categoryRepository.findById(productDto.getCategoryId());
        if (isACategory.isPresent()){
            Product product = productDto.getProduct();
            product.setDeleted(false);
            product.setCategory(isACategory.get());
            isAProduct.ifPresent(value -> product.setId(value.getId()));
            Product newProduct = productRepository.save(product);
            productDto = newProduct.getDto();
            return productDto;
        }
        else{
            throw new IllegalArgumentException("Category not found");
        }


    }

    public void delete(Long id) {
        Optional<Product> currentProduct = productRepository.findById(id);
        if (currentProduct.isPresent()) {
            currentProduct.get().setInStock(false);
            currentProduct.get().setDeleted(true);
            Product product = currentProduct.get();
            productRepository.save(currentProduct.get());
        } else {
            throw new IllegalArgumentException("This product is not available");
        }
    }
    @Transactional
    public ProductDto edit(ProductDto productDto) throws IllegalArgumentException {
        Optional<Product> currentProduct = productRepository.findById(productDto.getId());

        if (currentProduct.isPresent() ) {
            Optional<Product> otherItem = productRepository.findByNameIgnoreCase(productDto.getName());
            if (otherItem.isPresent() && !otherItem.get().getId().equals(productDto.getId())) {
                throw new IllegalArgumentException("Another product with the same name already exists.");
            }
            Optional<Category> isACategory = categoryRepository.findById(productDto.getCategoryId());
            if (isACategory.isPresent()) {
                Product product = productDto.getProduct();
                product.setId(currentProduct.get().getId());
                product.setCategory(isACategory.get());
                Product newProduct = productRepository.save(product);
                productDto = newProduct.getDto();
                return productDto;}
            else {
                throw new IllegalArgumentException("This category doesn't exist");
            }
        } else {
            throw new IllegalArgumentException("This product is not available");
        }
    }

    public List<CategoryDto> menu(){
        return categoryRepository.findAll(Sort.by(Sort.Direction.ASC, "name"))
                .stream()
                .map(Category::getDto)
                .toList();

    }

    public List<ProductDto> search(String keyword) {
        List<Product> products = productRepository.findByNameContainingIgnoreCaseAndInStockTrue(keyword);
        List<ProductDto> productDtos = new ArrayList<>(products.stream().map(Product::getDto).toList());
       productDtos = sortProductsManually(productDtos);
      return productDtos;
}

    public List<ProductDto> sortProductsManually(List<ProductDto> products) {
        products.sort(new Comparator<ProductDto>() {
            @Override
            public int compare(ProductDto p1, ProductDto p2) {
                return p1.getName().compareToIgnoreCase(p2.getName());
            }
        });
        return products;
    }




}