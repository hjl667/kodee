package com.example.cai_app.controller;
import com.example.cai_app.model.Glossary;
import com.example.cai_app.model.Term;
import com.example.cai_app.repository.GlossaryRepository;
import com.example.cai_app.service.GlossaryLookUpService;
import com.example.cai_app.service.TermService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class TermController {

    @Autowired
    private GlossaryRepository glossaryRepository;

    @Autowired
    private TermService termService;

    @Autowired
    private GlossaryLookUpService glossaryLookUpService;

    @PostMapping("/term/{glossaryName}/addterms")
    public void addTerms(@PathVariable String glossaryName, @RequestBody List<Term> terms){
        Glossary glossary = glossaryRepository.findByName(glossaryName);
        termService.addTerms(terms, glossary);
    }
    //to be updated
    @DeleteMapping("/term/{glossaryName}/deleteterms")
    public void deleteTerms(@PathVariable String glossaryName, @RequestBody List<Term> terms){
        Glossary glossary = glossaryRepository.findByName(glossaryName);
        termService.deleteTerms(terms, glossary);
    }

    @GetMapping("/term/get")
    public List<Term> getTermswithText(@RequestParam List<Integer> glossaryIds, @RequestParam String text){
        return glossaryLookUpService.checkAgainstGlossaries(text, glossaryIds);
    }
}
