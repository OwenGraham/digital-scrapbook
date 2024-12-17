package io.github.owengraham.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Book extends Scrap {
    private String author;
    private int releaseYear;
    private int rating;
    private String review;

    @JsonCreator
    public Book(
            @JsonProperty("name") String name,
            @JsonProperty("img") String img,
            @JsonProperty("author") String author,
            @JsonProperty("releaseYear") int releaseYear,
            @JsonProperty("rating") int rating,
            @JsonProperty("review") String review) {
        super(ScrapType.BOOK, name, img);
        this.author = author;
        this.releaseYear = releaseYear;
        this.rating = rating;
        this.review = review;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
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
