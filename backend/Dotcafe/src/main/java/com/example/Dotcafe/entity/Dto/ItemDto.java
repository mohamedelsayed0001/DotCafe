package com.example.Dotcafe.entity.Dto;

import com.example.Dotcafe.entity.Item;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemDto {

    private Long id;
    private String name;
    private Double quantity;
    private Double price;
    @JsonIgnore
    public Item getItem(){
        return Item
                .builder()
                .id(id)
                .quantity(quantity)
                .price(price)
                .name(name)
                .build();
    }

}
