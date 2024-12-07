package entity.DTO;

import entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class customerDto {
    private String mail;
    private long id;
    private String name;
    private String role;
    private long points;

    public Customer getcustomer(String name, String mail, long id, String role, long points,String password) {
        return Customer.builder()
                .name(name)
                .mail(mail)
                .id(id)
                .role(role)
                .points(points)
                .password(password)
                .build();
    }

}
