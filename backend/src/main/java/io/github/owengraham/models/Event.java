package io.github.owengraham.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.util.List;

public class Event extends Scrap {
    private LocalDate date;
    private String venue;
    private List<String> lineup;

    @JsonCreator
    public Event(
            @JsonProperty("name") String name,
            @JsonProperty("img") String img,
            @JsonProperty("date") LocalDate date,
            @JsonProperty("venue") String venue,
            @JsonProperty("lineup") List<String> lineup) {
        super(ScrapType.EVENT, name, img);
        this.date = date;
        this.venue = venue;
        this.lineup = lineup;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public List<String> getLineup() {
        return lineup;
    }

    public void setLineup(List<String> lineup) {
        this.lineup = lineup;
    }
}
