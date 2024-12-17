package io.github.owengraham.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Album extends Scrap {
    private String artist;
    private int releaseYear;
    private int rating;
    private String review;

    @JsonCreator
    public Album(
            @JsonProperty("name") String name,
            @JsonProperty("img") String img,
            @JsonProperty("artist") String artist,
            @JsonProperty("releaseYear") int releaseYear,
            @JsonProperty("rating") int rating,
            @JsonProperty("review") String review) {
        super(ScrapType.ALBUM, name, img);
        this.artist = artist;
        this.releaseYear = releaseYear;
        this.rating = rating;
        this.review = review;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
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
