package com.example.cai_app.model;

import java.util.List;

public class TranscriptionMessage {
    private String text;
    private List<Integer> glossaryIds;

    public TranscriptionMessage(String text, List<Integer> glossaryIds) {
        this.text = text;
        this.glossaryIds = glossaryIds;
    }

    public TranscriptionMessage() {
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<Integer> getGlossaryIds() {
        return glossaryIds;
    }

    public void setGlossaryIds(List<Integer> glossaryIds) {
        this.glossaryIds = glossaryIds;
    }
}
