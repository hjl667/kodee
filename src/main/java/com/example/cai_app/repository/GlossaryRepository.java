package com.example.cai_app.repository;
import com.example.cai_app.model.Glossary;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface GlossaryRepository extends JpaRepository<Glossary, Integer>{
    List<Glossary> findByUserId(int userId);
    Glossary findByName(String name);

}
