package com.example.cai_app.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "userId", cascade = CascadeType.ALL)
    private Set<Glossary> glossaries;

    @OneToMany(mappedBy = "userId", cascade = CascadeType.ALL)
    private Set<Transcription> transcriptions;

    public User(int id, String name, String password, Set<Glossary> glossaries, Set<Transcription> transcriptions) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.glossaries = glossaries;
        this.transcriptions = transcriptions;
    }

    public User() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Glossary> getGlossaries() {
        return glossaries;
    }

    public void setGlossaries(Set<Glossary> glossaries) {
        this.glossaries = glossaries;
    }

    public Set<Transcription> getTranscriptions() {
        return transcriptions;
    }

    public void setTranscriptions(Set<Transcription> transcriptions) {
        this.transcriptions = transcriptions;
    }
}
