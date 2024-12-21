package io.github.owengraham;

import io.github.owengraham.api.ScrapRepository;
import io.github.owengraham.exceptions.ScrapValidationException;
import io.github.owengraham.models.Scrap;
import io.github.owengraham.utils.JsonLoader;
import io.github.owengraham.utils.JsonWriter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class ScrapRepositoryTest {

    @Mock
    private JsonLoader jsonLoader;

    @Mock
    private JsonWriter jsonWriter;

    @InjectMocks
    private ScrapRepository scrapRepository;


    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @ParameterizedTest
    @MethodSource("io.github.owengraham.utils.ScrapDataProvider#provideInvalidScrapObjects")
    void testAddScrapInvalid(String expectedMessage, Scrap scrap) {
        ScrapValidationException exception = assertThrows(ScrapValidationException.class, () -> scrapRepository.addScrap(scrap));
        assertEquals(expectedMessage, exception.getMessage());
    }
}
