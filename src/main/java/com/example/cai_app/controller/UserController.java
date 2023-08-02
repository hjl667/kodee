package com.example.cai_app.controller;

import com.example.cai_app.model.Glossary;
import com.example.cai_app.model.Transcription;
import com.example.cai_app.model.User;
import com.example.cai_app.repository.UserRepository;
import com.example.cai_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    public User createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @DeleteMapping("/glossary/{userName}/deleteAll")
    public String deleteGlossaryByName(@PathVariable String userName){
        userService.deleteUserByName(userName);
        return "Glossary deleted successfully";
    }

    @GetMapping("/user/{userName}/find")
    public User findByName(@PathVariable String userName){
        return userRepository.findByName(userName);
    }

}
