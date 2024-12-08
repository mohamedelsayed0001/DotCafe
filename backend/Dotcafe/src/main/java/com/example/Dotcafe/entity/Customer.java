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
@Table(name = "customer")
public class Customer {
    private String mail;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Customer_id_seq")
    private Long id;
    private String name;
    private String role;
    private Long points;
    private String password;
    private String phoneNumber;


    public CustomerDto getcustomerDto() {
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
