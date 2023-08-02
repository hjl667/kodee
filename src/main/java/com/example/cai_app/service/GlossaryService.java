package com.example.cai_app.service;

import com.example.cai_app.model.Glossary;
import com.example.cai_app.model.User;
import com.example.cai_app.repository.GlossaryRepository;
import com.example.cai_app.repository.TermRepository;
import com.example.cai_app.repository.TranscriptionRepository;
import com.example.cai_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.regex.Pattern;
import java.util.*;
import com.example.cai_app.model.Term;

import javax.transaction.Transactional;
import org.springframework.transaction.support.TransactionTemplate;


@Service
@Transactional
public class GlossaryService {

    @Autowired
    private GlossaryRepository glossaryRepository;

    @Autowired
    private TermRepository termRepository;
    @Autowired
    private TransactionTemplate transactionTemplate;


    public Glossary uploadGlossary(int userId, Glossary glossary) {
        return transactionTemplate.execute(status -> {

            // Ensure the name is unique
            if (glossaryRepository.findByName(glossary.getName()) != null) {
                throw new IllegalArgumentException("Glossary name must be unique");
            }

            // Ensure all necessary fields are not null
            if (glossary.getName() == null || glossary.getLanguage() == null || glossary.getDateCreated() == null) {
                throw new IllegalArgumentException("Glossary has fields that are null");
            }

            // Assign the userId from the path variable
            glossary.setUserId(userId);

            // Save glossary first, this will generate an ID if it's auto-incremented
            Glossary savedGlossary = glossaryRepository.save(glossary);

            // Now glossary has an ID, we can save terms
            if (glossary.getTerms() != null) {
                for (Term term : glossary.getTerms()) {
                    // Ensure all necessary fields are not null
                    if (term.getChineseTerm() == null || term.getEnglishTerm() == null) {
                        throw new IllegalArgumentException("Term has fields that are null");
                    }

                    term.setGlossary(savedGlossary); // set the saved glossary into term
                    termRepository.save(term); // save term
                }
            }

            return savedGlossary;
        });
    }

    public void deleteGlossaryByName(String glossaryName) {
        Glossary glossary = glossaryRepository.findByName(glossaryName);
        if (glossary != null) {
            glossaryRepository.delete(glossary);
        }
    }

    public List<Glossary> getAllGlossaryIDs(int userId) {
        return glossaryRepository.findByUserId(userId);
    }


}
