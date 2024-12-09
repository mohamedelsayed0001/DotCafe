package com.example.Dotcafe.entity.Dto;

import com.example.Dotcafe.entity.Category;
import com.example.Dotcafe.entity.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Base64;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDto {
    private Long id;
    private String name;
    private Double price;
    private CategoryDto category;
    private Long stockQuantity;
    private String image;

    @JsonIgnore
    public Product getProduct(){
        return Product.builder().
                id(id).
                name(name).
                category(category.getCategory()).
                price(price).
                stockQuantity(stockQuantity).
                image(image!=null ?Base64.getDecoder().decode(image) : null).
                build();
    }

}
