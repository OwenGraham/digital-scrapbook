package io.github.owengraham.api;

import io.github.owengraham.models.Scrap;

public class SingleScrapResponse {
    private Scrap scrap;
    private String message;

    public SingleScrapResponse() {
    }

    public SingleScrapResponse(Scrap scrap, String message) {
        this.scrap = scrap;
        this.message = message;
    }

    public Scrap getScrap() {
        return scrap;
    }

    public void setScrap(Scrap scrap) {
        this.scrap = scrap;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
