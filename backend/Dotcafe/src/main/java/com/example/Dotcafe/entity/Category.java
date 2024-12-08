package com.example.Dotcafe.entity;

import com.example.Dotcafe.entity.Dto.CategoryDto;
import jakarta.persistence.*;
import lombok.*;


import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Category_id_seq")
    private Long id;
    private  String name;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Product> products;

    public CategoryDto getcategoryDto() {return CategoryDto.builder().id(id).name(name)
            .products(products)
         .build();
    }



}
