package com.example.Dotcafe.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Setter
@Getter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Customer customer;
    private Double orderPrice;
    private Double taxes;
    private Double total;
    private Integer points;
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL,mappedBy = "order")
    private List<OrderItem> orderItems;
    @Enumerated(EnumType.STRING)
    private Progress progress;
    private LocalDateTime localDateTime;

  @PrePersist
  private void onCreate() {
    this.localDateTime = LocalDateTime.now();
  }



}
