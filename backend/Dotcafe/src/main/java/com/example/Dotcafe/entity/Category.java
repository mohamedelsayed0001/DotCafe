package com.example.Dotcafe.entity;

import com.example.Dotcafe.entity.Dto.CategoryDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.engine.internal.Cascade;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Category {
    @Id
    private Long id;
    private  String name;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private List<Product> products;

    public CategoryDto getcategoryDto() {return CategoryDto.builder().name(name).products(products).build();
    }



}
