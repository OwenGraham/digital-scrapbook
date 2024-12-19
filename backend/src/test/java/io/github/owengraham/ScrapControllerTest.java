package io.github.owengraham;

import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import org.springframework.boot.test.context.SpringBootTest;

import io.restassured.module.mockmvc.RestAssuredMockMvc;

import io.github.owengraham.api.Main;
import io.github.owengraham.api.ScrapRepository;
import io.github.owengraham.api.ScrapController;
import io.github.owengraham.models.Film;
import io.github.owengraham.models.Scrap;
import io.github.owengraham.models.Wishlist;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.*;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.when;
import static org.hamcrest.Matchers.*;
import static org.hamcrest.MatcherAssert.assertThat;

@SpringBootTest(classes = Main.class)
public class ScrapControllerTest {

    @Mock
    private ScrapRepository scrapRepository;

    private ScrapController scrapController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        scrapController = new ScrapController(scrapRepository);
        RestAssuredMockMvc.standaloneSetup(scrapController);
    }

    @Test
    @DisplayName("Verify that the GET /api/scraps endpoint returns a list of scraps.")
    void testGetScraps() {
        // Arrange
        Wishlist scrap = new Wishlist("wishlist-name", "wishlist-img", "brand", new BigDecimal("10.00"), "link");
        Film film = new Film("film-name", "film-img", "director", 0000, 0, "review");
        List<Scrap> scraps = Arrays.asList(scrap, film);
        when(scrapRepository.getScraps()).thenReturn(scraps);

        // Act and Assert using RestAssuredMockMvc
        when()
                .get("/api/scraps")
                .then()
                .statusCode(200)
                .body("$.size()", is(2))
                .body("[0].type", equalTo("WISHLIST"))
                .body("[0].name", equalTo("wishlist-name"))
                .body("[0].img", equalTo("wishlist-img"))
                .body("[0].brand", equalTo("brand"))
                .body("[0].price", equalTo(10.00f))
                .body("[0].link", equalTo("link"))
                .body("[1].type", equalTo("FILM"))
                .body("[1].name", equalTo("film-name"))
                .body("[1].img", equalTo("film-img"))
                .body("[1].director", equalTo("director"))
                .body("[1].releaseYear", equalTo(0000))
                .body("[1].rating", equalTo(0))
                .body("[1].review", equalTo("review"));

        // Verify repository method was called
        verify(scrapRepository, times(1)).getScraps();
    }

    @Test
    @DisplayName("Verify that the GET /api/scraps endpoint returns an empty list when there are no scraps")
    void testGetScrapsEmpty() {
        // Arrange
        List<Scrap> scraps = Arrays.asList();
        when(scrapRepository.getScraps()).thenReturn(scraps);

        // Act and Assert using RestAssuredMockMvc
        when()
                .get("/api/scraps")
                .then()
                .statusCode(200)
                .body("$.size()", is(0));

        // Verify repository method was called
        verify(scrapRepository, times(1)).getScraps();
    }

    @Test
    @DisplayName("Verify that the POST /api/scraps endpoint adds a scrap.")
    void testAddScrap() {
        // Arrange
        Wishlist scrap = new Wishlist("wishlist-name", "wishlist-img", "brand", new BigDecimal("10.00"), "link");
        when(scrapRepository.addScrap(any(Scrap.class))).thenReturn(scrap);

        // Act and Assert using RestAssuredMockMvc
        given()
                .contentType("application/json")
                .accept("application/json")
                .body(scrap)
                .when()
                .post("/api/scraps")
                .then()
                .statusCode(200)
                .body("name", equalTo("wishlist-name"))
                .body("img", equalTo("wishlist-img"))
                .body("brand", equalTo("brand"))
                .body("price", equalTo(10.00f))
                .body("link", equalTo("link"));

        // Verify repository method was called
        // Capture the argument passed to the repository
        ArgumentCaptor<Scrap> scrapCaptor = ArgumentCaptor.forClass(Scrap.class);
        verify(scrapRepository, times(1)).addScrap(scrapCaptor.capture());
        Scrap capturedScrap = scrapCaptor.getValue();

        // Verify that the captured scrap is equal to the original scrap
        assertThat(capturedScrap, allOf(
                hasProperty("type", equalTo(scrap.getType())),
                hasProperty("name", equalTo(scrap.getName())),
                hasProperty("img", equalTo(scrap.getImg())),
                hasProperty("brand", equalTo(scrap.getBrand())),
                hasProperty("price", equalTo(scrap.getPrice())),
                hasProperty("link", equalTo(scrap.getLink()))));
    }
}
