package com.example.cai_app.repository;
import com.example.cai_app.model.Glossary;
import com.example.cai_app.model.Transcription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TranscriptionRepository extends JpaRepository<Transcription, Integer> {
    List<Transcription> findByUserId(int userId);
    Transcription findByName(String name);
}
