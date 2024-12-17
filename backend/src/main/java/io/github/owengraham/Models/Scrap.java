package io.github.owengraham.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = Event.class, name = "EVENT"),
        @JsonSubTypes.Type(value = Wishlist.class, name = "WISHLIST"),
        @JsonSubTypes.Type(value = Film.class, name = "FILM"),
        @JsonSubTypes.Type(value = Book.class, name = "BOOK"),
        @JsonSubTypes.Type(value = Album.class, name = "ALBUM"),
        @JsonSubTypes.Type(value = Recipe.class, name = "RECIPE"),
        @JsonSubTypes.Type(value = Trip.class, name = "TRIP")
})

public abstract class Scrap {
    private ScrapType type;
    private String name;
    private String img;

    @JsonCreator
    public Scrap(
            @JsonProperty("type") ScrapType type,
            @JsonProperty("name") String name,
            @JsonProperty("img") String img) {
        this.type = type;
        this.name = name;
        this.img = img;
    }

    public ScrapType getType() {
        return type;
    }

    public void setType(ScrapType type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}