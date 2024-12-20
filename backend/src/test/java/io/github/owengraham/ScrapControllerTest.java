package io.github.owengraham;

import io.github.owengraham.api.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.owengraham.exceptions.LoadScrapsException;
import io.github.owengraham.exceptions.WriteScrapException;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import io.restassured.module.mockmvc.RestAssuredMockMvc;

import io.github.owengraham.models.Film;
import io.github.owengraham.models.Scrap;
import io.github.owengraham.models.Wishlist;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.*;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.when;
import static org.hamcrest.Matchers.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.fail;


@SpringBootTest(classes = Main.class)
public class ScrapControllerTest {

    @Mock
    private ScrapRepository scrapRepository;

    private ScrapController scrapController;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        scrapController = new ScrapController(scrapRepository);
        RestAssuredMockMvc.mockMvc(MockMvcBuilders.standaloneSetup(scrapController)
                .setControllerAdvice(new ScrapExceptionHandler())
                .build());
    }

    @Test
    @DisplayName("Verify that the GET /api/scraps endpoint returns a list of scraps.")
    void testGetScraps() throws IOException {
        // Arrange
        Wishlist scrap = new Wishlist("wishlist-name", "wishlist-img", "brand", new BigDecimal("10.00"), "link");
        Film film = new Film("film-name", "film-img", "director", 0000, 0, "review");
        List<Scrap> scraps = Arrays.asList(scrap, film);
        when(scrapRepository.getScraps()).thenReturn(scraps);

        // Act using RestAssuredMockMvc
        String responseBody = when().get("api/scraps").then().statusCode(200).extract().asString();

        // Assert

        // Verify repository method was called
        verify(scrapRepository, times(1)).getScraps();

        try {
            // Parse the response body into a ScrapResponse object
            ObjectMapper objectMapper = new ObjectMapper();
            ScrapResponse response = objectMapper.readValue(responseBody, ScrapResponse.class);

            assertThat(response.getMessage(), equalTo("Successfully loaded scraps."));

            assertThat(response.getScraps(), hasSize(2));

            assertThat(response.getScraps().get(0), allOf(
                    hasProperty("type", equalTo(scrap.getType())),
                    hasProperty("name", equalTo(scrap.getName())),
                    hasProperty("img", equalTo(scrap.getImg())),
                    hasProperty("brand", equalTo(scrap.getBrand())),
                    hasProperty("price", equalTo(scrap.getPrice())),
                    hasProperty("link", equalTo(scrap.getLink()))));

            assertThat(response.getScraps().get(1), allOf(
                    hasProperty("type", equalTo(film.getType())),
                    hasProperty("name", equalTo(film.getName())),
                    hasProperty("img", equalTo(film.getImg())),
                    hasProperty("director", equalTo(film.getDirector())),
                    hasProperty("releaseYear", equalTo(film.getReleaseYear())),
                    hasProperty("rating", equalTo(film.getRating())),
                    hasProperty("review", equalTo(film.getReview())))
            );
        } catch (Exception e) {
            fail("Exception occurred while deserializing response: " + e.getMessage());
        }
    }

    @Test
    @DisplayName("Verify that the GET /api/scraps endpoint returns an empty list when there are no scraps")
    void testGetScrapsEmpty() throws IOException {
        // Arrange
        List<Scrap> scraps = Arrays.asList();
        when(scrapRepository.getScraps()).thenReturn(scraps);

        // Act using RestAssuredMockMvc
        String responseBody = when().get("api/scraps").then().statusCode(200).extract().asString();

        // Assert
        assertThat(responseBody, equalTo("{\"scraps\":[],\"message\":\"Successfully loaded scraps.\"}"));

        // Verify repository method was called
        verify(scrapRepository, times(1)).getScraps();
    }

    @Test
    @DisplayName("Verify that the POST /api/scraps endpoint adds a scrap.")
    void testAddScrap() throws IOException {
        // Arrange
        Wishlist scrap = new Wishlist("wishlist-name", "wishlist-img", "brand", new BigDecimal("10.00"), "link");
        when(scrapRepository.addScrap(any(Scrap.class))).thenReturn(scrap);

        // Capture the argument passed to the repository
        ArgumentCaptor<Scrap> scrapCaptor = ArgumentCaptor.forClass(Scrap.class);

        // Act using RestAssuredMockMvc
        String responseBody = given()
                .contentType("application/json")
                .accept("application/json")
                .body(scrap)
                .when()
                .post("/api/scraps")
                .then()
                .statusCode(201)
                .extract().asString();

        // Assert

        // Verify repository method was called
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

    @Test
    @DisplayName("Verify that the POST /api/scraps endpoint returns a 400 status code when the request body is empty.")
    void testAddScrapEmpty() throws IOException {
        // Act and Assert using RestAssuredMockMvc
        given()
                .contentType("application/json")
                .accept("application/json")
                .body("")
                .when()
                .post("/api/scraps")
                .then()
                .statusCode(400);

        // Verify repository method was not called
        verify(scrapRepository, never()).addScrap(any(Scrap.class));
    }

    @Test
    @DisplayName("Verify that the GET /api/scraps endpoint handles exceptions gracefully")
    void testGetScrapsException() throws Exception {
        //Arrange
        when(scrapRepository.getScraps()).thenThrow(new LoadScrapsException("Failed to load scraps", new IOException()));

        //Act using RestAssuredMockMvc
        String responseBody = when().get("/api/scraps").then().statusCode(500).extract().asString();

        //Assert
        assertThat(responseBody, equalTo("Failed to load scraps"));
    }

    @Test
    @DisplayName("Verify that the POST /api/scraps endpoint handles exceptions gracefully")
    void testAddScrapException() throws Exception {
        //Arrange
        Wishlist scrap = new Wishlist("wishlist-name", "wishlist-img", "brand", new BigDecimal("10.00"), "link");
        when(scrapRepository.addScrap(any(Scrap.class))).thenThrow(new WriteScrapException("Failed to add scrap", new IOException()));

        //Act using RestAssuredMockMvc
        String responseBody = given()
                .contentType("application/json")
                .accept("application/json")
                .body(scrap)
                .when()
                .post("/api/scraps")
                .then()
                .statusCode(500)
                .extract().asString();

        //Assert
        assertThat(responseBody, equalTo("Failed to add scrap"));
    }

    @ParameterizedTest
    @MethodSource("io.github.owengraham.utils.ScrapDataProvider#provideInvalidScrapObjects")
    @DisplayName("Verify that the POST /api/scraps endpoint returns a 400 status code when the request body is invalid.")
    void testAddScrapInvalidData(String expectedMessage, Scrap invalidScrap) throws IOException {
        //Arrange
        when(scrapRepository.addScrap(invalidScrap)).thenReturn(invalidScrap);

        //Act
        String responseBody = given()
                .contentType("application/json")
                .accept("application/json")
                .body(invalidScrap)
                .when()
                .post("/api/scraps")
                .then()
                .statusCode(400)
                .extract().asString();

        //Assert
        assertThat(responseBody, equalTo(expectedMessage));
    }
}
