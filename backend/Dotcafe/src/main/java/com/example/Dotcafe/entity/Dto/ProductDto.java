package com.example.Dotcafe.entity.Dto;

import com.example.Dotcafe.entity.Category;
import com.example.Dotcafe.entity.Product;
import com.example.Dotcafe.repository.CategoryRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    private String description;
    private Long categoryId;
    private Boolean inStock;
    @JsonProperty("src")
    private String image;




    @JsonIgnore
    public Product getProduct(){
        return Product.builder().
                id(id).
                name(name).
                category(null).
                price(price).
                inStock(inStock).
                image(image!=null ?Base64.getDecoder().decode(image) : null).
                description(description).
                build();
    }

}
