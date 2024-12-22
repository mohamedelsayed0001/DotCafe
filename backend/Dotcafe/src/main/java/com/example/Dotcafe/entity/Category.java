package com.example.Dotcafe.entity;

import com.example.Dotcafe.entity.Dto.CategoryDto;
import jakarta.persistence.*;
import lombok.*;


import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private  String name;
    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER,mappedBy = "category")
    private List<Product> products = new ArrayList<>();

    public CategoryDto getDto() {
        CategoryDto categoryDto = CategoryDto.builder().id(id).name(name)
         .build();
        categoryDto.setProducts(new ArrayList<>());
        for(Product p : products){
           if(p.getInStock()) categoryDto.addProductDto(p.getDto());
        }
        return categoryDto;

    }



}
