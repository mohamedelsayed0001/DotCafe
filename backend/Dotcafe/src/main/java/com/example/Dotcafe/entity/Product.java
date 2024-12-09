package com.example.Dotcafe.entity;

import com.example.Dotcafe.entity.Dto.ProductDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Base64;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Product_id_seq")
    private Long id;
    private String name;
    private Double price;
    @JsonIgnore
    @ManyToOne
    private Category category;
    private Long stockQuantity;
    @Lob
    private byte[] image;
    @JsonIgnore
    public ProductDto getDto(){
        return ProductDto.builder().
                id(id).
                name(name).
                category(category.getcategoryDto()).
                price(price).
                stockQuantity(stockQuantity).
                image(image != null ? Base64.getEncoder().encodeToString(image) : null).
                build();
    }


}
