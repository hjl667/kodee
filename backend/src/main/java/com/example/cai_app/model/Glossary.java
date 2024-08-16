package com.example.cai_app.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.*;
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@Entity
@Table(name = "glossaries")
public class Glossary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true)
    private String name;

    @Column(nullable = false)
    private String Language;

    @Column(nullable = false)
    private LocalDate dateCreated;

    @Column(nullable = false)
    private int userId;

    @JsonManagedReference
    @OneToMany(mappedBy = "glossary", cascade = CascadeType.ALL)
    private List<Term> terms;

    public Glossary(int id, String name, LocalDate dateCreated, int userId, List<Term> terms) {
        this.id = id;
        this.name = name;
        this.terms = terms;
        this.dateCreated =dateCreated;
        this.userId = userId;
    }

    public Glossary() {

    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLanguage() {
        return Language;
    }

    public void setLanguage(String language) {
        Language = language;
    }

    public List<Term> getTerms() {
        return terms;
    }

    @Transactional
    public void setTerms(List<Term> terms) {
        if (this.terms != null) {
            this.terms.forEach(term -> term.setGlossary(null));
        }
        this.terms = terms;
        terms.forEach(term -> term.setGlossary(this));
    }

}
