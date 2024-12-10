package com.example.Dotcafe.entity;

import com.example.Dotcafe.entity.Dto.ItemDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Boolean availability;
    private Double price;
    @JsonIgnore
    public ItemDto getitemDto(){
        return ItemDto.builder()
                .id(id)
                .availability(availability)
                .price(price)
                .name(name)
                .build();
    }

}
