package com.example.Dotcafe.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class OrderWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    public OrderWebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // Optional: Only if you expect clients to send WebSocket messages to this controller
    @MessageMapping("/order/{orderId}")
    public void receiveOrderUpdate(String orderId, String orderState) {
        // You can process incoming WebSocket messages if needed
        messagingTemplate.convertAndSend("/track/order/" + orderId, orderState);
        System.out.println(orderState);
    }
}

