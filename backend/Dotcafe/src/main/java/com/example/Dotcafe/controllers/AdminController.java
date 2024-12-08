package com.example.Dotcafe.controllers;
import com.example.Dotcafe.entity.Dto.CategoryDto;
import com.example.Dotcafe.repository.CategoryRepository;
import com.example.Dotcafe.sevices.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/Admin")
public class AdminController {

    private final AdminService adminService;



    public AdminController(AdminService adminService) {
        this.adminService=adminService;

    }
    @PostMapping(value = "/createcategory")
    public ResponseEntity<?> create(@RequestBody CategoryDto categoryDto){
        try {
            CategoryDto createdcategory = adminService.createCategory(categoryDto);
            return new ResponseEntity<>(createdcategory, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("this category already exists");
        } catch (Exception e) {
           return null;
        }
    }

}
