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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double price;
    private String description;
    @ManyToOne
    private Category category;
    private Boolean inStock;
    @Lob
    @Basic(fetch = FetchType.EAGER) // to fetch large obj directly
    private byte[] image;
    @JsonIgnore
    public ProductDto getDto(){
        return ProductDto.builder().
                id(id).
                name(name).
                categoryId(category.getId()).
                price(price).
                inStock(inStock).
                image(image != null ? Base64.getEncoder().encodeToString(image) : null).
                description(description).
                build();
    }


}
