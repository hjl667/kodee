package com.example.cai_app.service;

import com.example.cai_app.model.User;
import com.example.cai_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        //check if a user with the same name already exists
        return userRepository.save(user);
    }

    public void deleteUserByName(String userName) {
        User user = userRepository.findByName(userName);
        if (user != null) {
            userRepository.delete(user);
        }
    }
}
