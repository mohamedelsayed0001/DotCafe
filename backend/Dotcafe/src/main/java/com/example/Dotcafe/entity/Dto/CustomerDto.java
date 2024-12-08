package com.example.Dotcafe.entity.Dto;

import com.example.Dotcafe.entity.Customer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@Builder
@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {
    private String mail;
    private Long id;
    private String name;
    private String role;
    private Long points;
    private String password;
    private String phoneNumber;

    @JsonIgnore
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
