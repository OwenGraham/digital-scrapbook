package io.github.owengraham.utils;

import io.github.owengraham.models.Book;
import io.github.owengraham.models.Event;
import io.github.owengraham.models.Film;
import io.github.owengraham.models.Wishlist;
import org.junit.jupiter.params.provider.Arguments;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Stream;

public class ScrapDataProvider {
    static Stream<Arguments> provideInvalidScrapObjects() {
        return Stream.of(
                Arguments.of("Validation failed for EVENT: field 'name' failed validation 'isNotEmpty'",new Event("", "event-img", LocalDate.of(2024, 1, 1), "venue", List.of("lineup"))),//name is empty
                Arguments.of("Validation failed for EVENT: field 'date' failed validation 'isNotNull'",new Event("event-name", "event-img", null, "venue", List.of("lineup"))),//name is empty
                Arguments.of("Validation failed for WISHLIST: field 'img' failed validation 'isNotEmpty'", new Wishlist("wishlist-name", null, "brand",new BigDecimal(0), "link")),//img is null
                Arguments.of("Validation failed for WISHLIST: field 'price' failed validation 'isPositive'", new Wishlist("wishlist-name", "wishlist-img", "brand",new BigDecimal(-1), "link")),//price is negative
                Arguments.of("Validation failed for WISHLIST: field 'link' failed validation 'isUrl'", new Wishlist("wishlist-name", "wishlist-img", "brand",new BigDecimal(1), "link")),//price is negative
                Arguments.of("Validation failed for FILM: field 'releaseYear' failed validation 'isPositive'", new Film("film-name", "film-img", "director",-1, 0, "review")),//year is negative
                Arguments.of("Validation failed for BOOK: field 'rating' failed validation 'isInRange'", new Book("book-name", "img", "author", 0, -1, "review")),//rating is out of bounds
                Arguments.of("Validation failed for BOOK: field 'rating' failed validation 'isInRange'", new Book("book-name", "img", "author", 0, 6, "review"))//rating is out of bounds
        );
    }
}
