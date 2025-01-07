package io.github.owengraham.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;

public class Trip extends Scrap {
    private String location;
    private LocalDate from;
    private LocalDate to;

    @JsonCreator
    public Trip(
            @JsonProperty("name") String name,
            @JsonProperty("img") String img,
            @JsonProperty("location") String location,
            @JsonProperty("from") LocalDate from,
            @JsonProperty("to") LocalDate to) {
        super(ScrapType.TRIP, name, img);
        this.location = location;
        this.from = from;
        this.to = to;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getFrom() {
        return from;
    }

    public void setFrom(LocalDate from) {
        this.from = from;
    }

    public LocalDate getTo() {
        return to;
    }

    public void setTo(LocalDate to) {
        this.to = to;
    }
}
