package com.example.cai_app.model;
import java.time.LocalDate;
import javax.persistence.*;

@Entity
@Table(name = "transcriptions")
public class Transcription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String name;

    @Column(nullable = false)
    private LocalDate dateCreated;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int userId;

    public Transcription(int id, String name, String content, LocalDate dateCreated, int userId) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.dateCreated = dateCreated;
        this.userId = userId;
    }

    public Transcription() {

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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
