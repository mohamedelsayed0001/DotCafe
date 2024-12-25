package com.example.Dotcafe.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Size {
    @JsonProperty("Small")
    SMALL,
    @JsonProperty("Medium")
    MEDIUM,
    @JsonProperty("Large")
    LARGE
}
