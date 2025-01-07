package io.github.owengraham.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Film extends Scrap {
    private String director;
    private int releaseYear;
    private int rating;
    private String review;

    @JsonCreator
    public Film(
            @JsonProperty("name") String name,
            @JsonProperty("img") String img,
            @JsonProperty("director") String director,
            @JsonProperty("releaseYear") int releaseYear,
            @JsonProperty("rating") int rating,
            @JsonProperty("review") String review) {
        super(ScrapType.FILM, name, img);
        this.director = director;
        this.releaseYear = releaseYear;
        this.rating = rating;
        this.review = review;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }
}
