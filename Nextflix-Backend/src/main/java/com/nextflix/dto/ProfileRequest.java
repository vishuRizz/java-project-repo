package com.nextflix.dto;

public class ProfileRequest {
    private String name;
    private Long userId; // Yeh sirf ID store karega, full User object nahi

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
