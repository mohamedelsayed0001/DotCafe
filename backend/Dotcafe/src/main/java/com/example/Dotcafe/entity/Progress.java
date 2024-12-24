package com.example.Dotcafe.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Progress {
    @JsonProperty("Placed")
    PLACED,
    @JsonProperty("Preparing")
    PREPARING,
    @JsonProperty("Ready")
    READY;

    @Override
    public String toString() {
        if (this.equals(Progress.READY)) {
            return "Ready";
        } else if (this.equals(Progress.PLACED)) {
            return "Placed";
        } else {
            return "Preparing";
        }

    }
}


