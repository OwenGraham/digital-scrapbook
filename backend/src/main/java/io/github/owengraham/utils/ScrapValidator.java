package io.github.owengraham.utils;

import io.github.owengraham.exceptions.ScrapValidationException;
import io.github.owengraham.models.*;

import java.math.BigDecimal;
import java.util.regex.Pattern;

public class ScrapValidator {

    private static final Pattern URL_PATTERN = Pattern.compile("^(http|https)://.*$");

    public static void validate(Scrap scrap) {
        if (scrap.getName() == null || scrap.getName().isEmpty()) {
            throw new ScrapValidationException(scrap.getType(),"name","isNotEmpty");
        }
        if (scrap.getImg() == null || scrap.getImg().isEmpty()) {
            throw new ScrapValidationException(scrap.getType(),"img","isNotEmpty");
        }

        switch (scrap.getType()) {
            case EVENT:
                validateEvent((Event) scrap);
                break;
            case WISHLIST:
                validateWishlist((Wishlist) scrap);
                break;
            case FILM:
                validateFilm((Film) scrap);
                break;
            case BOOK:
                validateBook((Book) scrap);
                break;
            case ALBUM:
                validateAlbum((Album) scrap);
                break;
            case RECIPE:
                validateRecipe((Recipe) scrap);
                break;
            case TRIP:
                validateTrip((Trip) scrap);
                break;
        }
    }

    private static void validateEvent(Event event) {
        if (event.getDate() == null) {
            throw new ScrapValidationException(ScrapType.EVENT,"date","isNotNull");
        }
        if (event.getVenue() == null || event.getVenue().isEmpty()) {
            throw new ScrapValidationException(ScrapType.EVENT,"venue","isNotEmpty");
        }
        if (event.getLineup() == null || event.getLineup().isEmpty()) {
            throw new ScrapValidationException(ScrapType.EVENT,"lineup","isNotEmpty");
        }
    }

    private static void validateWishlist(Wishlist wishlist) {
        if (wishlist.getBrand() == null || wishlist.getBrand().isEmpty()) {
            throw new ScrapValidationException(ScrapType.WISHLIST,"brand","isNotEmpty");
        }
        if (wishlist.getPrice() == null) {
            throw new ScrapValidationException(ScrapType.WISHLIST,"price","isNotNull");
        }
        if (wishlist.getPrice().compareTo(BigDecimal.valueOf(0)) < 0) {
            throw new ScrapValidationException(ScrapType.WISHLIST,"price","isPositive");
        }
        if (wishlist.getLink() == null || wishlist.getLink().isEmpty()) {
            throw new ScrapValidationException(ScrapType.WISHLIST,"link","isNotEmpty");
        }
        if (!URL_PATTERN.matcher(wishlist.getLink()).matches()) {
            throw new ScrapValidationException(ScrapType.WISHLIST,"link","isUrl");
        }
    }

    private static void validateFilm(Film film) {
        if (film.getDirector() == null || film.getDirector().isEmpty()) {
            throw new ScrapValidationException(ScrapType.FILM,"director","isNotEmpty");
        }
        if (film.getReleaseYear() < 0) {
            throw new ScrapValidationException(ScrapType.FILM,"releaseYear","isPositive");
        }
        if (film.getRating() < 0 || film.getRating() > 5) {
            throw new ScrapValidationException(ScrapType.FILM,"rating","isInRange");
        }
        if (film.getReview() == null || film.getReview().isEmpty()) {
            throw new ScrapValidationException(ScrapType.FILM,"review","isNotEmpty");
        }
    }

    private static void validateBook(Book book) {
        if (book.getAuthor() == null || book.getAuthor().isEmpty()) {
            throw new ScrapValidationException(ScrapType.BOOK,"author","isNotEmpty");
        }
        if (book.getRating() < 0 || book.getRating() > 5) {
            throw new ScrapValidationException(ScrapType.BOOK,"rating","isInRange");
        }
        if (book.getReview() == null || book.getReview().isEmpty()) {
            throw new ScrapValidationException(ScrapType.BOOK,"review","isNotEmpty");
        }
    }

    private static void validateAlbum(Album album) {
        if (album.getArtist() == null || album.getArtist().isEmpty()) {
            throw new ScrapValidationException(ScrapType.ALBUM,"artist","isNotEmpty");
        }
        if (album.getReleaseYear() < 0) {
            throw new ScrapValidationException(ScrapType.ALBUM,"releaseYear","isPositive");
        }
        if (album.getRating() < 0 || album.getRating() > 5) {
            throw new ScrapValidationException(ScrapType.ALBUM,"rating","isInRange");
        }
        if (album.getReview() == null || album.getReview().isEmpty()) {
            throw new ScrapValidationException(ScrapType.ALBUM,"review","isNotEmpty");
        }
    }

    private static void validateRecipe(Recipe recipe) {
        if (recipe.getCookingTime() < 0) {
            throw new ScrapValidationException(ScrapType.RECIPE,"cookingTime","isPositive");
        }
        if (recipe.getIngredients() == null || recipe.getIngredients().isEmpty()) {
            throw new ScrapValidationException(ScrapType.RECIPE,"ingredients","isNotEmpty");
        }
        if (recipe.getSteps() == null || recipe.getSteps().isEmpty()) {
            throw new ScrapValidationException(ScrapType.RECIPE,"steps","isNotEmpty");
        }
    }

    private static void validateTrip(Trip trip) {
        if(trip.getLocation() == null || trip.getLocation().isEmpty()) {
            throw new ScrapValidationException(ScrapType.TRIP,"location","isNotEmpty");
        }
        if(trip.getFrom() == null) {
            throw new ScrapValidationException(ScrapType.TRIP,"from","isNotNull");
        }
        if(trip.getTo() == null) {
            throw new ScrapValidationException(ScrapType.TRIP,"to","isNotNull");
        }
    }
}
