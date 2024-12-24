package com.example.Dotcafe.entity.Dto;

import com.example.Dotcafe.entity.Cart;
import com.example.Dotcafe.entity.Customer;
import com.example.Dotcafe.entity.Order;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

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
    private List<OrderDto> orders=new ArrayList<>();
    @JsonProperty("src")
    private String image;

    @JsonIgnore
    public byte[] image(){
        return image!=null ?image.getBytes(StandardCharsets.UTF_8) : null;
    }


    @JsonIgnore
    public Customer getCustomer() {
        return Customer.builder()
                .name(name)
                .mail(mail)
                .id(id)
                .role(role)
                .points(points)
                .password(password)
                .phoneNumber(phoneNumber)
                .image(image!=null ?image.getBytes(StandardCharsets.UTF_8) : null)
                .build();
    }

}
