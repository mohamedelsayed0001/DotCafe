package com.example.Dotcafe.controllers;
import com.example.Dotcafe.entity.Dto.CategoryDto;
import com.example.Dotcafe.entity.Dto.ProductDto;
import com.example.Dotcafe.sevices.AdminService;
import com.example.Dotcafe.sevices.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final AdminService adminService;
    private final ProductService productService;

    public AdminController(AdminService adminService, ProductService productService) {
        this.adminService = adminService;
        this.productService = productService;
    }

    @GetMapping("/menu")
    public ResponseEntity<List<CategoryDto>> menu(){
        return new ResponseEntity<>(adminService.menu(), HttpStatus.OK);

    }

    @PostMapping(value = "/category")
    public ResponseEntity<?> create(@RequestBody CategoryDto categoryDto){
        try {
            CategoryDto createdCategory = adminService.createCategory(categoryDto);
            return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping ("/category/edit/{id}")
    public ResponseEntity<?> edit(@PathVariable Long id, @RequestBody CategoryDto categoryDto){
        try {
            categoryDto.setId(id);
            CategoryDto editedCategory = adminService.editCategory(categoryDto);
            return new ResponseEntity<>(editedCategory, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping ("/category/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id){
        try {
            adminService.deleteCategory(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/product")
    public ResponseEntity<?> create(@RequestBody ProductDto productDto){
        try{
            return new ResponseEntity<>(productService.create(productDto), HttpStatus.CREATED);
        }catch (IllegalArgumentException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            productService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping("/product/edit/{id}")
    public ResponseEntity<?> edit(@PathVariable Long id, @RequestBody ProductDto productDto) {
        try {
            productDto.setId(id);
            return new ResponseEntity<>(productService.edit(productDto), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>( e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getOrders(
            @RequestParam(required = false,defaultValue = "0") Integer page,
            @RequestParam(required = false,defaultValue = "10") Integer size
    ) {
        try {
            return new ResponseEntity<>(adminService.getOrders(page,size),HttpStatus.OK);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }



}
