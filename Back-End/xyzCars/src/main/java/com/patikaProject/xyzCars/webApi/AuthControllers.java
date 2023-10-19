package com.patikaProject.xyzCars.webApi;
import com.patikaProject.xyzCars.bussiness.request.CreateUserRequest;
import com.patikaProject.xyzCars.bussiness.request.LoginUser;
import com.patikaProject.xyzCars.bussiness.response.AuthResponse;
import com.patikaProject.xyzCars.bussiness.abstracts.UserService;
import com.patikaProject.xyzCars.entities.concretes.User;
import com.patikaProject.xyzCars.security.JwtTokenProvider;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/auth")
public class AuthControllers {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    private final UserService userService;

    private  BCryptPasswordEncoder bCryptPasswordEncoder;


    public AuthControllers(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginUser loginRequest) {

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword());
        Authentication auth = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwtToken = jwtTokenProvider.generateJwtToken(auth);
        User user=userService.getByUserName(loginRequest.getUserName()).getData();
        AuthResponse authResponse=new AuthResponse();
        authResponse.setMessage("Bearer "+jwtToken);
        authResponse.setUserId(user.getId());
        authResponse.setUserName(user.getUserName());
        return authResponse;

    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody CreateUserRequest registerRequest) {
        AuthResponse authResponse=new AuthResponse();
        if(userService.getByUserName(registerRequest.getUserName()).getData() != null) {
            authResponse.setMessage("Böyle bir kullanıcı zaten var");
            return authResponse;
        }
        CreateUserRequest user = new CreateUserRequest();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setName(registerRequest.getName());
        user.setLastName(registerRequest.getLastName());
        user.setUserName(registerRequest.getUserName());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userService.createOneUser(user);
        User getUser=userService.getByUserName(user.getUserName()).getData();
        authResponse.setMessage("Kullanıcı Başarıyla Oluşturuldu");
        authResponse.setUserName(getUser.getUserName());
        authResponse.setUserId(getUser.getId());

        return authResponse;


    }





}
