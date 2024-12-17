package io.github.owengraham.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class Wishlist extends Scrap {
    private String brand;
    private BigDecimal price;
    private String link;

    @JsonCreator
    public Wishlist(
            @JsonProperty("name") String name,
            @JsonProperty("img") String img,
            @JsonProperty("brand") String brand,
            @JsonProperty("price") BigDecimal price,
            @JsonProperty("link") String link) {
        super(ScrapType.WISHLIST, name, img);
        this.brand = brand;
        this.price = price;
        this.link = link;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
