package com.patikaProject.xyzCars.bussiness.request;

import lombok.Data;

@Data
public class ChangePasswordUserRequest {
    private String oldPassword;
    private String newPassword;
}
