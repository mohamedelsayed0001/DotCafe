package com.example.Dotcafe.entity;

import com.example.Dotcafe.entity.Dto.ProductDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;

@Setter
@Getter
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
    private boolean deleted;
    @Lob
    @Basic(fetch = FetchType.EAGER)
    private byte[] image;
    public ProductDto getDto(){
        return ProductDto.builder().
                id(id).
                name(name).
                categoryId(category.getId()).
                price(price).
                inStock(inStock).
                image(image != null ? new String(image, StandardCharsets.UTF_8): null).
                description(description).
                build();
    }


}
