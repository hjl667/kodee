package com.example.cai_app.repository;
import com.example.cai_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer>{
    User findByName(String userName);
}
