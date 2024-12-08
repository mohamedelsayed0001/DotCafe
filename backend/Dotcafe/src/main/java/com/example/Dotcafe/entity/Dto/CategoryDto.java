package com.example.Dotcafe.entity.Dto;

import com.example.Dotcafe.entity.Category;
import com.example.Dotcafe.entity.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDto {
    private Long id;
    private String name;
    private List<Product> products;

    @JsonIgnore
    public Category getCategory(){
        return Category.builder().id(id).name(name)
                .products(products)
        .build();
    }

}
