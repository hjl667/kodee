package com.example.cai_app.service;

import com.example.cai_app.model.Glossary;
import com.example.cai_app.model.Term;


import com.example.cai_app.repository.GlossaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.regex.Pattern;
import java.util.*;

@Service
public class GlossaryLookUpService {

    @Autowired
    private GlossaryRepository glossaryRepository;

    public List<Term> checkAgainstGlossaries(String text, List<Integer> glossaryIds) {
        Map<String, String> chineseToEnglish = new HashMap<>();
        Map<String, String> englishToChinese = new HashMap<>();

        boolean isChinese = containsChinese(text);

        for (int glossaryId : glossaryIds) {
            Glossary glossary = glossaryRepository.findById(glossaryId).orElseThrow(() -> new RuntimeException("Glossary not found"));

            for (Term term : glossary.getTerms()) {
                if (isChinese) {
                    chineseToEnglish.put(term.getChineseTerm(), term.getEnglishTerm());
                } else {
                    englishToChinese.put(term.getEnglishTerm().toLowerCase(), term.getChineseTerm());
                }
            }
        }

        if (isChinese) {
            return findTermsInTextChinese(text, chineseToEnglish, 4);
        } else {
            return findTermsInTextEnglish(text.split("(?U)(?=\\p{P}|\\p{Z}|$)"), englishToChinese, 4);
        }
    }

    private List<Term> findTermsInTextChinese(String text, Map<String, String> termMap, int maxPhraseLength) {
        List<Term> termsInTranscription = new ArrayList<>();

        int length = text.length();
        for (int i = 0; i < length; i++) {
            boolean foundTerm = false;
            for (int j = i + 1; j <= Math.min(i + maxPhraseLength, length); j++) {
                String substring = text.substring(i, j);
                if (termMap.containsKey(substring)) {
                    String englishTerm = termMap.get(substring);
                    termsInTranscription.add(new Term(substring, englishTerm));  // create new Term object
                    i = j - 1;  // skip to the end of the found phrase
                    foundTerm = true;
                    break;
                }
            }

            // Check if a single character is a number, if no term was found in the previous loop.
            if (!foundTerm) {
                String singleChar = text.substring(i, i+1);
                try {
                    Double.parseDouble(singleChar);  // Single char is a number

                    // Check if the last term is a number, if so append this number to it.
                    if (!termsInTranscription.isEmpty()) {
                        Term lastTerm = termsInTranscription.get(termsInTranscription.size() - 1);
                        if (lastTerm.getChineseTerm().matches("\\d+")) {
                            lastTerm.setChineseTerm(lastTerm.getChineseTerm() + singleChar);
                            lastTerm.setEnglishTerm(lastTerm.getEnglishTerm() + singleChar);
                        } else {
                            termsInTranscription.add(new Term(singleChar, singleChar));  // create new Term object
                        }
                    } else {
                        termsInTranscription.add(new Term(singleChar, singleChar));  // create new Term object
                    }

                } catch (NumberFormatException e) {
                    // Single char is not a number, do nothing
                }
            }
        }

        return termsInTranscription;
    }

    private List<Term> findTermsInTextEnglish(String[] words, Map<String, String> termMap, int maxPhraseLength) {
        List<Term> termsInTranscription = new ArrayList<>();

        for (int i = 0; i < words.length; i++) {
            String word = words[i].trim().toLowerCase();
            StringBuilder phrase = new StringBuilder(word);

            for (int j = i+1; j < Math.min(i + maxPhraseLength, words.length); j++) {
                phrase.append(" ").append(words[j].trim().toLowerCase());
                if (termMap.containsKey(phrase.toString())) {
                    String chineseTerm = termMap.get(phrase.toString());
                    termsInTranscription.add(new Term(phrase.toString(), chineseTerm));  // create new Term object
                    i = j;  // skip to the end of the found phrase
                    break;
                }
            }

            if (termMap.containsKey(word)) {
                String chineseTerm = termMap.get(word);
                termsInTranscription.add(new Term(word, chineseTerm));  // create new Term object
            } else if (!termMap.containsKey(phrase.toString())) {
                try {
                    Double.parseDouble(word);  // word is a number
                    termsInTranscription.add(new Term(word, word));  // create new Term object for number
                } catch (NumberFormatException e) {
                    // word is not a number, do nothing
                }
            }
        }

        return termsInTranscription;
    }

    private boolean containsChinese(String text) {
        Pattern pattern = Pattern.compile("[\\p{InCJK Unified Ideographs}&&\\P{InCJK Compatibility Ideographs}]");
        return pattern.matcher(text).find();
    }

}
