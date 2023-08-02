package com.example.cai_app.service;

import com.example.cai_app.model.Glossary;
import com.example.cai_app.repository.GlossaryRepository;
import com.example.cai_app.repository.TermRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import com.example.cai_app.model.Term;

import javax.transaction.Transactional;


@Service
@Transactional
public class TermService {

    private static final Logger LOGGER = Logger.getLogger(TermService.class.getName());


    @Autowired
    private GlossaryRepository glossaryRepository;

    @Autowired TermRepository termRepository;


    public void addTerms(List<Term> terms, Glossary glossary){
        // Validation checks...

        // Fetch the current list of terms in the glossary
        List<Term> currentTerms = glossary.getTerms();

        // Add the new terms to the current list
        // And set the glossary for each term
        for (Term term : terms) {
            term.setGlossary(glossary);
            currentTerms.add(term);
        }

        // Set the updated list back to the glossary
        glossary.setTerms(currentTerms);

        // If glossary instance is managed, no need to call save explicitly
    }

    public void deleteTerms(List<Term> termsToDelete, Glossary glossary){
        // Fetch the current list of terms in the glossary
        List<Term> currentTerms = glossary.getTerms();

        // Create a new list of terms excluding the ones to delete
        List<Term> newTerms = new ArrayList<>();
        for (Term term : currentTerms) {
            boolean shouldDelete = false;
            for (Term termToDelete : termsToDelete) {
                if (term.getChineseTerm().equals(termToDelete.getChineseTerm())) {
                    shouldDelete = true;
                    break;
                }
            }

            if (!shouldDelete) {
                newTerms.add(term);
            }
        }

        // Create a new glossary with the updated terms
        Glossary newGlossary = new Glossary();
        newGlossary.setName(glossary.getName());
        newGlossary.setLanguage(glossary.getLanguage());
        newGlossary.setDateCreated(glossary.getDateCreated());
        newGlossary.setUserId(glossary.getUserId());
        newGlossary.setTerms(newTerms);

        // Save the new glossary to the database
        glossaryRepository.save(newGlossary);

        // Delete the old glossary from the database
        glossaryRepository.delete(glossary);
    }

}
