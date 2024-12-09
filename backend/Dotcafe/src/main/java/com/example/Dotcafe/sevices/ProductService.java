package com.example.Dotcafe.sevices;

import com.example.Dotcafe.entity.Dto.ProductDto;
import com.example.Dotcafe.entity.Product;
import com.example.Dotcafe.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductDto deleteproduct(ProductDto productDto) {
        Optional<Product> currentproduct = productRepository.findById(productDto.getId());
        if (currentproduct.isPresent()) {
            productDto.setStockQuantity(0L);
            Product newproduct = productRepository.save(productDto.getProduct());
            return newproduct.getDto();

        } else
            throw new IllegalArgumentException();

    }

    public ProductDto editproduct(ProductDto productDto) throws IllegalArgumentException {
        Optional<Product> currentproduct = productRepository.findById(productDto.getId());
        if (currentproduct.isPresent()) {
            Product newproduct = currentproduct.get();

            Product finalproduct = productRepository.save(productDto.getProduct());


            return finalproduct.getDto();
        }
        else
            throw new IllegalArgumentException();
    }
}