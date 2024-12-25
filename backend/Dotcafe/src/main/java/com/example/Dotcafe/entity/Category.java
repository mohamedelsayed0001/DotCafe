package com.example.Dotcafe.entity;

import com.example.Dotcafe.entity.Dto.CategoryDto;
import com.example.Dotcafe.entity.Dto.OrderItemDto;
import com.example.Dotcafe.entity.Dto.ProductDto;
import jakarta.persistence.*;
import lombok.*;


import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Entity
@Setter
@Getter
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
        categoryDto.getProducts().sort(Comparator.comparingLong(ProductDto::getId));
        return categoryDto;

    }

    public CategoryDto getDtoAdmin() {
        CategoryDto categoryDto = CategoryDto.builder().id(id).name(name)
                .build();
        categoryDto.setProducts(new ArrayList<>());
        for(Product p : products){
          if(!p.isDeleted())  categoryDto.addProductDto(p.getDto());
        }
        categoryDto.getProducts().sort(Comparator.comparingLong(ProductDto::getId));
        return categoryDto;

    }




}
