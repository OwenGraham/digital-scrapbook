package io.github.owengraham.api;

import io.github.owengraham.models.Scrap;

import java.util.List;

public class ScrapResponse {
    private List<Scrap> scraps;
    private String message;

    public ScrapResponse() {
    }

    public ScrapResponse(List<Scrap> scraps, String message) {
        this.scraps = scraps;
        this.message = message;
    }

    public List<Scrap> getScraps() {
        return scraps;
    }

    public void setScraps(List<Scrap> scraps) {
        this.scraps = scraps;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
