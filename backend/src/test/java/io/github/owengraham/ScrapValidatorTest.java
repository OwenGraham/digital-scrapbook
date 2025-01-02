package io.github.owengraham;

import io.github.owengraham.exceptions.ScrapValidationException;
import io.github.owengraham.models.Scrap;
import io.github.owengraham.utils.ScrapValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import static org.junit.jupiter.api.Assertions.*;

public class ScrapValidatorTest {
    private ScrapValidator scrapValidator;

    @BeforeEach
    void setUp() {
        scrapValidator = new ScrapValidator();
    }

    @ParameterizedTest
    @DisplayName("Test validate throws appropriate exception when Scrap object is invalid")
    @MethodSource("io.github.owengraham.utils.ScrapDataProvider#provideInvalidScrapObjects")
    void testValidate(String expectedMessage, Scrap scrap) {
        ScrapValidationException exception = assertThrows(ScrapValidationException.class, () -> scrapValidator.validate(scrap));
        assertEquals(expectedMessage, exception.getMessage());
    }

    @ParameterizedTest
    @DisplayName("Test validate doesn't throw exception when Scrap object is valid")
    @MethodSource("io.github.owengraham.utils.ScrapDataProvider#provideValidScrapObjects")
    void testValidate(Scrap scrap) {
        assertDoesNotThrow(() -> scrapValidator.validate(scrap));
    }
}
