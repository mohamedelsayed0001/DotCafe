package com.example.Dotcafe.entity.Dto;

import com.example.Dotcafe.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {
    private String mail;
    private long id;
    private String name;
    private String role;
    private long points;
    private String password;
    private String phoneNumber;

    public Customer getcustomer() {
        return Customer.builder()
                .name(name)
                .mail(mail)
                .id(id)
                .role(role)
                .points(points)
                .password(password)
                .phoneNumber(phoneNumber)
                .build();
    }

}
