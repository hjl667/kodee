package com.example.cai_app.repository;
import com.example.cai_app.model.Glossary;
import com.example.cai_app.model.Term;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface TermRepository extends JpaRepository<Term, Integer>{
    List<Term> findByGlossaryId(int glossaryId);
}