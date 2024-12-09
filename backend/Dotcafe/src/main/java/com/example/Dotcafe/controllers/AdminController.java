package com.example.Dotcafe.controllers;
import com.example.Dotcafe.entity.Dto.CategoryDto;
import com.example.Dotcafe.entity.Dto.ProductDto;
import com.example.Dotcafe.repository.CategoryRepository;
import com.example.Dotcafe.sevices.AdminService;
import com.example.Dotcafe.sevices.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;
    private final ProductService productService;

    public AdminController(AdminService adminService, ProductService productService) {
        this.adminService = adminService;
        this.productService = productService;
    }

    @PostMapping(value = "/category")
    public ResponseEntity<?> create(@RequestBody CategoryDto categoryDto){
        try {
            CategoryDto createdcategory = adminService.createCategory(categoryDto);
            return new ResponseEntity<>(createdcategory, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("this category already exists");
        }
    }

    @PutMapping ("/category/edit")
    public ResponseEntity<?> edit(@RequestBody CategoryDto categoryDto){
        try {
            CategoryDto editedCategory = adminService.editCategory(categoryDto);
            return new ResponseEntity<>(editedCategory, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("this name already exist");
        }
    }

    @PostMapping("/product")
    public ResponseEntity<?> create(@RequestBody ProductDto productDto){
        try{
            return new ResponseEntity<>(productService.create(productDto), HttpStatus.CREATED);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("category not found");
        }
        catch (CloneNotSupportedException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("product name exist");

        }

    }

    @DeleteMapping("/product")
    public ResponseEntity<?> delete(@RequestBody ProductDto productDto) {
        try {
            ProductDto deletedProduct = productService.delete(productDto);
            return new ResponseEntity<>(deletedProduct, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting product: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/product/edit")
    public ResponseEntity<?> edit(@RequestBody ProductDto productDto) {
        try {
            ProductDto editedProduct = productService.edit(productDto);
            return new ResponseEntity<>(editedProduct, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error editing product: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }



}
