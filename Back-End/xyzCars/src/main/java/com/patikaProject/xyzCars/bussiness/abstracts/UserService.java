package com.patikaProject.xyzCars.bussiness.abstracts;

import com.patikaProject.xyzCars.bussiness.request.ChangePasswordUserRequest;
import com.patikaProject.xyzCars.bussiness.request.CreateUserRequest;
import com.patikaProject.xyzCars.bussiness.response.ChangePasswordResponse;
import com.patikaProject.xyzCars.core.utilities.DataResult;
import com.patikaProject.xyzCars.core.utilities.Result;
import com.patikaProject.xyzCars.entities.concretes.User;

import java.util.List;

public interface UserService {
    DataResult<List<User>> getAllUser();

    DataResult<User> getById(int userId);

    DataResult<User> getByUserName(String userName);

    DataResult<User> createOneUser(CreateUserRequest createUserRequest);

   ChangePasswordResponse updateOneUser(int userId, ChangePasswordUserRequest changePasswordUserRequest);

    Result removeById(int userId);
}
