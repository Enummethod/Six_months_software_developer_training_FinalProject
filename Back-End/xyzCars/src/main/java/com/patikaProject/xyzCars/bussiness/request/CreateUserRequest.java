package com.patikaProject.xyzCars.bussiness.request;


import lombok.Data;

@Data
public class CreateUserRequest {
    private String name;
    private String lastName;
    private String userName;
    private String password;
}
