package com.example.Dotcafe.controllers;

import com.example.Dotcafe.entity.Dto.CartDto;
import com.example.Dotcafe.entity.Dto.ItemDto;
import com.example.Dotcafe.entity.Dto.OrderItemDto;
import com.example.Dotcafe.sevices.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/order")
public class OrderController {

   private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> addToCart(@RequestBody OrderItemDto orderItemDto, @PathVariable Long userId){

        try{
            return new ResponseEntity<>(orderService.addToCart(orderItemDto,userId), HttpStatus.CREATED);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }
@DeleteMapping("/{orderitemId}")
public ResponseEntity<?> delete( @PathVariable Long orderitemId){
    orderService.deleteorderitem(orderitemId);
    return new ResponseEntity<>( HttpStatus.CREATED);

}
//    @PutMapping("/update/cart/{userId}")
//    public ResponseEntity<?> updateCart(@RequestParam Long userId, @RequestBody CartDto cartDto){
////        cartDto.setCustomerId(userId);
////        try {
////          return new ResponseEntity<>(  orderService.updateCart(cartDto),HttpStatus.OK);
////        }
//    }

}
