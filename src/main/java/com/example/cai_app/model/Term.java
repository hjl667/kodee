package com.example.cai_app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@Entity
@Table(name = "terms")
public class Term {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String ChineseTerm;
    @Column(nullable = false)
    private String EnglishTerm;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "glossary_id", nullable = false)
    private Glossary glossary;

    public Term(int id, String chineseTerm, String englishTerm, Glossary glossary) {
        this.ChineseTerm = chineseTerm;
        this.EnglishTerm = englishTerm;
        this.glossary = glossary;
    }

    public Term(){

    }

    public Term(String singleChar, String singleChar1) {
        this.ChineseTerm = singleChar;
        this.EnglishTerm = singleChar1;
    }

    public Glossary getGlossary() {
        return glossary;
    }

    public void setGlossary(Glossary glossary) {
        this.glossary = glossary;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getChineseTerm() {
        return ChineseTerm;
    }

    public void setChineseTerm(String chineseTerm) {
        ChineseTerm = chineseTerm;
    }

    public String getEnglishTerm() {
        return EnglishTerm;
    }

    public void setEnglishTerm(String englishTerm) {
        EnglishTerm = englishTerm;
    }

    @Override
    public String toString() {
        return "Term{" +
                "id=" + id +
                ", ChineseTerm='" + ChineseTerm + '\'' +
                ", EnglishTerm='" + EnglishTerm + '\'' +
                ", glossary=" + (glossary != null ? glossary.getName() : "null") +
                '}';
    }
}
