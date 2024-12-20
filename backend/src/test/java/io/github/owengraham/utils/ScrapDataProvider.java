package io.github.owengraham.utils;

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
                Arguments.of("Invalid event, name cannot be empty",new Event("", "event-img", LocalDate.of(2024, 1, 1), "venue", List.of("lineup"))),//name is empty
                Arguments.of("Invalid wishlist, no image file or link provided", new Wishlist("wishlist-name", null, "brand",new BigDecimal(0), "link")),//img is null
                Arguments.of("Invalid film, release year too long ago", new Film("film-name", "film-img", "director",-1, 0, "review"))//year is negative
        );
    }
}
