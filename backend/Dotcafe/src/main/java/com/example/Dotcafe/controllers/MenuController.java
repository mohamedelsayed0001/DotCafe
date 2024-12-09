package com.example.Dotcafe.controllers;

import com.example.Dotcafe.entity.Dto.ProductDto;
import com.example.Dotcafe.sevices.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/menu")
public class MenuController {
    private final ProductService productService;


    public MenuController(ProductService productService) {
        this.productService = productService;
    }

    @DeleteMapping("/deleteproduct")
    public ResponseEntity<?> deleteProduct(@RequestBody ProductDto productDto) {
        try {
            ProductDto deletedProduct = productService.deleteproduct(productDto);
            return new ResponseEntity<>(deletedProduct, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting product: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/editproduct")
    public ResponseEntity<?> editProduct(@RequestBody ProductDto productDto) {
        try {
            ProductDto editedProduct = productService.editproduct(productDto);
            return new ResponseEntity<>(editedProduct, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error editing product: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}