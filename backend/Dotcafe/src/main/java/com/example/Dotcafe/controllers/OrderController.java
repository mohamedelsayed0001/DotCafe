package com.example.Dotcafe.controllers;

import com.example.Dotcafe.entity.Dto.OrderItemDto;
import com.example.Dotcafe.sevices.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/order")
public class OrderController {

   private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/cart/{userId}")
    public ResponseEntity<?> addToCart(@RequestBody OrderItemDto orderItemDto, @PathVariable Long userId){

        try{
            return new ResponseEntity<>(orderService.addToCart(orderItemDto,userId), HttpStatus.CREATED);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }
@DeleteMapping("/{orderItemId}")
public ResponseEntity<?> delete( @PathVariable Long orderItemId) {
   try{
       return new ResponseEntity<>(orderService.deleteOrderItem(orderItemId),HttpStatus.OK);
   }catch (Exception e){
       return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
   }

}
@PutMapping("/place/{userId}")
public ResponseEntity<?> placeorders (@PathVariable Long userId) {
        try {
            return new ResponseEntity<>(  orderService.placeOrder(userId),HttpStatus.OK);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }
    @PutMapping("/update/{userId}")
    public ResponseEntity<?> updateCart (@PathVariable Long userId, @RequestBody OrderItemDto orderItemDto){
        try {
            return new ResponseEntity<>(orderService.updateCart(orderItemDto,userId), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @PostMapping("/points/{userId}")
    public ResponseEntity<?> updatePoints(@PathVariable Long userId, @RequestParam Integer points){
        try {
            return new ResponseEntity<>(orderService.updatePoints(userId,points),HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }



}

