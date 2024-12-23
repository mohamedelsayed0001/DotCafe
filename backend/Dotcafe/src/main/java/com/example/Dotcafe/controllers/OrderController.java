package com.example.Dotcafe.controllers;

import com.example.Dotcafe.entity.Dto.CartDto;
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

    @PostMapping("/{userId}")
    public ResponseEntity<?> addToCart(@RequestBody OrderItemDto orderItemDto, @PathVariable Long userId){

        try{
            return new ResponseEntity<>(orderService.addToCart(orderItemDto,userId), HttpStatus.CREATED);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }
//@DeleteMapping("/{orderItemId}")
//public ResponseEntity<?> delete( @PathVariable Long orderItemId) {
//    orderService.deleteOrderItem(orderItemId);
//    return new ResponseEntity<>(HttpStatus.CREATED);
//}
@PutMapping("/place/{userId}")
public ResponseEntity<?> placeorders (@PathVariable Long userId, @RequestBody CartDto cartDto) {
        return new ResponseEntity<>(  orderService.placeorder(userId,cartDto),HttpStatus.OK);
    }
    @PutMapping("/update/cart/{userId}")
    public ResponseEntity<?> updateCart (@PathVariable Long userId, @RequestBody CartDto cartDto){
        cartDto.setCustomerId(userId);
        try {
            return new ResponseEntity<>(orderService.updateCart(cartDto), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}

