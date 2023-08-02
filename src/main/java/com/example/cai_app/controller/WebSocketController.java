package com.example.cai_app.controller;


import com.example.cai_app.model.TranscriptionMessage;
import com.example.cai_app.service.GlossaryLookUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.cai_app.model.Term;

import java.util.List;

@Controller
@CrossOrigin
public class WebSocketController {

    @Autowired
    private GlossaryLookUpService glossaryLookupService;

    @MessageMapping("/transcribe")
    @SendTo("/topic/glossary")
    public List<Term> transcribe(TranscriptionMessage transcriptionMessage) {
        String text = transcriptionMessage.getText();
        List<Integer> glossaryIds = transcriptionMessage.getGlossaryIds();
        return glossaryLookupService.checkAgainstGlossaries(text, glossaryIds);
    }
}
