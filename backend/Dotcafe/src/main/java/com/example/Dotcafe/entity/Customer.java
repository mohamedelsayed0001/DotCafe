package com.example.Dotcafe.entity;

import com.example.Dotcafe.entity.Dto.CustomerDto;
import jakarta.persistence.*;
import lombok.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Builder
@Setter
@Getter
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
    @OneToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private Cart cart;
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL,mappedBy = "customer")
    private List<Order> orders;
    @Lob
    @Basic(fetch = FetchType.EAGER)
    private byte[] image;
    public CustomerDto getDto() {
         return CustomerDto.builder().
                 name(name).
                 mail(mail).
                 id(id).
                 role(role).
                 points(points).
                 phoneNumber(phoneNumber).
                 image(image != null ? new String(image, StandardCharsets.UTF_8): null).
                 build();

    }
}
