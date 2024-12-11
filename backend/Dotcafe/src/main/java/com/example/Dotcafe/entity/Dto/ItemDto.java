package com.example.Dotcafe.entity.Dto;

import com.example.Dotcafe.entity.Item;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Id;
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
    private Boolean availability;
    private Double price;
    @JsonIgnore
    public Item getitem(){
        return Item
                .builder()
                .id(id)
                .availability(availability)
                .price(price)
                .name(name)
                .build();
    }

}
