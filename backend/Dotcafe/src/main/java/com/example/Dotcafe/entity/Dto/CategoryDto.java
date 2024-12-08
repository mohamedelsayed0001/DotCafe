package com.example.Dotcafe.entity.Dto;

import com.example.Dotcafe.entity.Category;
import com.example.Dotcafe.entity.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDto {

    private String name;
    private List<Product> products;

    @JsonIgnore
    Category getCategory(){
        return Category.builder().name(name).products(products).build();
    }

}
