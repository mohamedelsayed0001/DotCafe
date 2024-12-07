package entity;

import entity.DTO.customerDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    private String mail;
    private long id;
    private String name;
    private String role;
    private long points;
    private String password;

    public customerDto getcustomerDto(String name, String mail, long id, String role, long points) {
        return customerDto.builder()
                .name(name)
                .mail(mail)
                .id(id)
                .role(role)
                .points(points)
                .build();
    }
}
