package com.example.cai_app.service;

import com.example.cai_app.model.Glossary;
import com.example.cai_app.model.Transcription;
import com.example.cai_app.model.User;
import com.example.cai_app.repository.GlossaryRepository;
import com.example.cai_app.repository.TranscriptionRepository;
import com.example.cai_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

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

    public String translate(String selectedTranscription, String language) {
        final String LIBRE_TRANSLATE_URL = "https://libretranslate.com/translate";
        final String API_KEY = "3ec3a75d-ebda-472c-8e94-bb165ab17c32";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        String targetLanguage = language.equals("English") ? "zh" : "en";
        String sourceLanguage = targetLanguage.equals("zh") ? "en" : "zh";

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("q", selectedTranscription);
        body.add("source",  sourceLanguage);  // Adjusted to use the passed language
        body.add("target", targetLanguage);
        body.add("format", "text");
        body.add("api_key", API_KEY);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(LIBRE_TRANSLATE_URL, entity, Map.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            return (String) response.getBody().get("translatedText");
        } else {
            throw new RuntimeException("Failed to fetch translation: " + response.getBody());
        }
    }

}
