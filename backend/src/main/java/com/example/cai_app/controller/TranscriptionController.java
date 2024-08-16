package com.example.cai_app.controller;

import com.example.cai_app.model.Glossary;
import com.example.cai_app.model.Transcription;
import com.example.cai_app.repository.TranscriptionRepository;
import com.example.cai_app.service.TranscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class TranscriptionController {
    @Autowired
    private TranscriptionService transcriptionService;

    @Autowired
    private TranscriptionRepository transcriptionRepository;

    @PostMapping("/transcription/{userId}")
    public Transcription uploadTranscription(@PathVariable int userId, @RequestBody Transcription transcription){
        return transcriptionService.uploadTranscription(userId, transcription);
    }

    @GetMapping("/transcription/{userId}/display")
    public List<Transcription> getAllGlossary(@PathVariable int userId){
        return transcriptionService.getAllTranscriptionIDs(userId);
    }

    @GetMapping("/transcription/{transcriptionName}/get")
    public Transcription getGlossary(@PathVariable String transcriptionName){
        return transcriptionRepository.findByName(transcriptionName);
    }

    @DeleteMapping("/transcription/{transcriptionName}/delete")
    public String deleteGlossaryByName(@PathVariable String transcriptionName){
        transcriptionService.deleteTranscriptionByName(transcriptionName);
        return "Glossary deleted successfully";
    }

    @GetMapping("/translate")
    public ResponseEntity<String> translate(
            @RequestParam String selectedTranscription,
            @RequestParam String language) {

        String translation = transcriptionService.translate(selectedTranscription, language);
        return ResponseEntity.ok(translation);
    }



}
