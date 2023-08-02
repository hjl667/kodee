package com.example.cai_app.service;

import com.example.cai_app.model.Glossary;
import com.example.cai_app.model.Transcription;
import com.example.cai_app.model.User;
import com.example.cai_app.repository.GlossaryRepository;
import com.example.cai_app.repository.TranscriptionRepository;
import com.example.cai_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TranscriptionService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TranscriptionRepository transcriptionRepository;

    public Transcription uploadTranscription(int userId, Transcription transcription){
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        transcription.setUserId(userId);
        return transcriptionRepository.save(transcription);
    }

    public void deleteTranscriptionByName(String transcriptionName) {
        Transcription transcription = transcriptionRepository.findByName(transcriptionName);
        if (transcription != null) {
            transcriptionRepository.delete(transcription);
        }
    }

    public List<Transcription> getAllTranscriptionIDs(int userId) {
        return transcriptionRepository.findByUserId(userId);
    }

}
