package com.example.Dotcafe.entity;

import com.example.Dotcafe.entity.Dto.ProductDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @ManyToOne
    private Category category;
    private Long stockQuantity;
    @Lob
    private byte[] image;
    private String imageName;
    private String imageType;
    ProductDto getDto(){
        return ProductDto.builder().
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
