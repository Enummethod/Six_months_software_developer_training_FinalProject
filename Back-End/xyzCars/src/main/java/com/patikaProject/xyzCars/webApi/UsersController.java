package com.patikaProject.xyzCars.webApi;

import com.patikaProject.xyzCars.bussiness.request.ChangePasswordUserRequest;
import com.patikaProject.xyzCars.bussiness.request.CreateUserRequest;
import com.patikaProject.xyzCars.bussiness.response.ChangePasswordResponse;
import com.patikaProject.xyzCars.bussiness.abstracts.UserService;
import com.patikaProject.xyzCars.core.utilities.DataResult;
import com.patikaProject.xyzCars.core.utilities.Result;
import com.patikaProject.xyzCars.entities.concretes.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {

    private final UserService userService;

    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public DataResult<List<User>> getAllUsers(){
        return userService.getAllUser();
    }

    @GetMapping("/{userId}")
    public DataResult<User> getById(@PathVariable int userId){
        return userService.getById(userId);

    }



    @PostMapping
    public DataResult<User> createOneUser(@RequestBody CreateUserRequest createUserRequest){
        return userService.createOneUser(createUserRequest);
    }

    @PutMapping("/{userId}")
    public ChangePasswordResponse updateOneUser(@PathVariable int userId, @RequestBody ChangePasswordUserRequest changePasswordUserRequest){
        return userService.updateOneUser(userId,changePasswordUserRequest);
    }

    @DeleteMapping("/{userId}")
    public Result removeById(@PathVariable int userId){
        return userService.removeById(userId);
    }
}
