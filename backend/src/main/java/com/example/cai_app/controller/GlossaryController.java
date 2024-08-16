package com.example.cai_app.controller;

import com.example.cai_app.model.Glossary;
import com.example.cai_app.repository.GlossaryRepository;
import com.example.cai_app.service.GlossaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
public class GlossaryController {

    @Autowired
    private GlossaryService glossaryService;

    @Autowired
    private GlossaryRepository glossaryRepository;

    @PostMapping("/glossary/{userId}")
    public Glossary uploadGlossary(@PathVariable int userId, @RequestBody Glossary glossary){
        return glossaryService.uploadGlossary(userId, glossary);
    }
    @GetMapping("/glossary/{userId}/display")
    public List<Glossary> getAllGlossary(@PathVariable int userId){
        return glossaryService.getAllGlossaryIDs(userId);
    }

    @GetMapping("/glossary/{glossaryName}/get")
    public Glossary getGlossary(@PathVariable String glossaryName){
        return glossaryRepository.findByName(glossaryName);
    }

    @DeleteMapping("/glossary/{glossaryName}/delete")
    public String deleteGlossaryByName(@PathVariable String glossaryName){
        glossaryService.deleteGlossaryByName(glossaryName);
        return "Glossary deleted successfully";
    }

}
