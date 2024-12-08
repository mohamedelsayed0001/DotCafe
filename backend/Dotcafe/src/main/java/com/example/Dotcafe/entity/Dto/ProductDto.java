package com.example.Dotcafe.entity.Dto;

import com.example.Dotcafe.entity.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDto {
    private Long id;
    private String name;
    private Double price;
    private String category;
    private Long stockQuantity;
    private byte[] image;
    private String imageName;
    private String imageType;
    @JsonIgnore
    Product getProduct(){
        return Product.builder().
                id(id).
                name(name).
                category(category).
                price(price).
                stockQuantity(stockQuantity).
                image(image).
                imageName(imageName).
                imageType(imageType).
                build();
    }
}
