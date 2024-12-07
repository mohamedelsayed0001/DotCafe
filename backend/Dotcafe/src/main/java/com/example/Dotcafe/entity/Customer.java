package com.example.Dotcafe.entity;

import com.example.Dotcafe.entity.Dto.CustomerDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private long id;
    private String name;
    private String role;
    private long points;
    private String password;
    private String phoneNumber;

    public CustomerDto getcustomerDto() {
        return CustomerDto.builder()
                .name(name)
                .mail(mail)
                .id(id)
                .role(role)
                .points(points)
                .build();
    }
}
