package com.example.Dotcafe.controllers;

import com.example.Dotcafe.entity.Dto.CategoryDto;
import com.example.Dotcafe.sevices.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menu")
@CrossOrigin(origins = "http://localhost:3000")
public class MenuController {
    private final ProductService productService;


    public MenuController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryDto>> menu(){
        return new ResponseEntity<>(productService.menu(), HttpStatus.OK);

    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String keyword){
            return new ResponseEntity<>(productService.search(keyword),HttpStatus.OK);
    }



}