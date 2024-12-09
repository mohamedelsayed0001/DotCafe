package com.example.Dotcafe.entity.Dto;

import com.example.Dotcafe.entity.Category;
import com.example.Dotcafe.entity.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDto {
    private Long id;
    private String name;
    private List<ProductDto> products = new ArrayList<>();

    @JsonIgnore
    public Category getCategory(){
        return Category.builder().id(id).name(name).products(new ArrayList<>())
        .build();
    }
    @JsonIgnore
    public void addProductDto(ProductDto productDto){
        products.add(productDto);

    }

}
