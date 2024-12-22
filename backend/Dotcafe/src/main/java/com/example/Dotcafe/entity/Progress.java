package com.example.Dotcafe.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Progress {
    @JsonProperty("Order Placed")
    ORDER_PLACED,
    @JsonProperty("Order Preparing")
    PREPARING,
    @JsonProperty("Order Ready")
    READY
}
