package com.example.Dotcafe.controllers;


import com.example.Dotcafe.entity.Dto.ProductDto;
import com.example.Dotcafe.sevices.AhmedService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AhmedController {
    private AhmedService ahmedService;

    public AhmedController(AhmedService ahmedService) {
        this.ahmedService = ahmedService;
    }

    @PostMapping("/product/create")
    public ResponseEntity<?> create(@RequestBody ProductDto productDto){
        try{
            return new ResponseEntity<>(ahmedService.createProduct(productDto), HttpStatus.CREATED);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("category not found");
        }
        catch (CloneNotSupportedException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("product name exist");

        }

    }
    @GetMapping("/menu")
    public ResponseEntity<?> menu(){
        return new ResponseEntity<>(ahmedService.menu(), HttpStatus.OK);

    }


}