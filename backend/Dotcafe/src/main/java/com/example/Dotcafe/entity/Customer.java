package com.example.Dotcafe.entity;

import com.example.Dotcafe.entity.Dto.CustomerDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Customer {
    private String mail;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String role;
    private Long points;
    private String password;
    private String phoneNumber;


    public CustomerDto getDto() {
         return CustomerDto.builder().
                 name(name).
                 mail(mail).
                 id(id).
                 role(role).
                 points(points).
                 phoneNumber(phoneNumber).
                 build();

    }
}
