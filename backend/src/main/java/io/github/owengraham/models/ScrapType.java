package io.github.owengraham.models;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum ScrapType {
    EVENT,
    WISHLIST,
    FILM,
    BOOK,
    ALBUM,
    RECIPE,
    TRIP
}
