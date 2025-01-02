package io.github.owengraham;

import io.github.owengraham.api.ScrapRepository;
import io.github.owengraham.exceptions.LoadScrapsException;
import io.github.owengraham.exceptions.ScrapValidationException;
import io.github.owengraham.exceptions.WriteScrapException;
import io.github.owengraham.models.Scrap;
import io.github.owengraham.models.ScrapType;
import io.github.owengraham.models.Wishlist;
import io.github.owengraham.utils.JsonLoader;
import io.github.owengraham.utils.JsonWriter;
import io.github.owengraham.utils.ScrapValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

import java.math.BigDecimal;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class ScrapRepositoryTest {

    @Mock
    private JsonLoader jsonLoader;

    @Mock
    private JsonWriter jsonWriter;

    @Mock
    private ScrapValidator scrapValidator;

    @InjectMocks
    private ScrapRepository scrapRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("Test getScraps propagates exception")
    void testGetScrapsException() throws LoadScrapsException {
        when(jsonLoader.loadScraps(anyString())).thenThrow(new LoadScrapsException("Test exception", new Exception()));
        LoadScrapsException exception = assertThrows(LoadScrapsException.class, () -> scrapRepository.getScraps());
        assertEquals("Test exception", exception.getMessage());
    }

    @Test
    @DisplayName("Test getScraps returns list")
    void testGetScrapsReturn() throws LoadScrapsException {
        when(jsonLoader.loadScraps(anyString())).thenReturn(new ArrayList<>());
        assertEquals(new ArrayList<>(), scrapRepository.getScraps());
    }

    @Test
    @DisplayName("Test addScrap propagates WriteScrapException")
    void testAddScrapWriteException() throws LoadScrapsException, ScrapValidationException {
        Wishlist scrap = new Wishlist("wishlist-name", "wishlist-img", "brand", new BigDecimal("10.00"), "link");
        when(jsonLoader.loadScraps(anyString())).thenReturn(new ArrayList<>());
        doThrow(new WriteScrapException("Test exception", new Exception())).when(jsonWriter).writeScraps(anyString(), anyList());
        doNothing().when(scrapValidator).validate(scrap);
        WriteScrapException exception = assertThrows(WriteScrapException.class, () -> scrapRepository.addScrap(scrap));
        assertEquals("Test exception", exception.getMessage());
    }

    @Test
    @DisplayName("Test addScrap propagates ScrapValidationException")
    void testAddScrapValidationException()  {
        when(jsonLoader.loadScraps(anyString())).thenThrow(new ScrapValidationException(ScrapType.WISHLIST, "brand", "isNotEmpty"));
        ScrapValidationException exception = assertThrows(ScrapValidationException.class, () -> scrapRepository.addScrap(new Wishlist("wishlist-name", "wishlist-img", "", new BigDecimal("10.00"), "link")));
        assertThat(exception, allOf(
            hasProperty("type", is(ScrapType.WISHLIST)),
            hasProperty("field", is("brand")),
            hasProperty("validationMethod", is("isNotEmpty"))
        ));
    }

    @Test
    @DisplayName("Test addScrap propagates LoadScrapsException")
    void testAddScrapLoadException() {
        doNothing().when(scrapValidator).validate(any());
        when(jsonLoader.loadScraps(anyString())).thenThrow(new LoadScrapsException("Test exception", new Exception()));
        LoadScrapsException exception = assertThrows(LoadScrapsException.class, () -> scrapRepository.addScrap(new Wishlist("wishlist-name", "wishlist-img", "brand", new BigDecimal("10.00"), "link")));
        assertEquals("Test exception", exception.getMessage());
    }

    @Test
    @DisplayName("Test addScrap returns scrap")
    void testAddScrapReturn() {
        Wishlist scrap = new Wishlist("wishlist-name", "wishlist-img", "brand", new BigDecimal("10.00"), "link");
        when(jsonLoader.loadScraps(anyString())).thenReturn(new ArrayList<>());
        doNothing().when(scrapValidator).validate(scrap);
        Scrap result = scrapRepository.addScrap(scrap);
        assertEquals(scrap, result);
    }

    @Test
    @DisplayName("Test addScrap calls validate")
    void testAddScrapCallsValidate() throws LoadScrapsException, ScrapValidationException {
        Wishlist scrap = new Wishlist("wishlist-name", "wishlist-img", "brand", new BigDecimal("10.00"), "link");
        when(jsonLoader.loadScraps(anyString())).thenReturn(new ArrayList<>());
        doNothing().when(scrapValidator).validate(scrap);
        scrapRepository.addScrap(scrap);
        verify(scrapValidator, times(1)).validate(scrap);
    }

    @Test
    @DisplayName("Test addScrap calls loadScraps")
    void testAddScrapCallsLoadScraps() throws LoadScrapsException, ScrapValidationException {
        Wishlist scrap = new Wishlist("wishlist-name", "wishlist-img", "brand", new BigDecimal("10.00"), "link");
        when(jsonLoader.loadScraps(anyString())).thenReturn(new ArrayList<>());
        doNothing().when(scrapValidator).validate(scrap);
        scrapRepository.addScrap(scrap);
        verify(jsonLoader, times(1)).loadScraps(anyString());
    }

    @Test
    @DisplayName("Test addScrap calls writeScraps")
    void testAddScrapCallsWriteScraps() throws LoadScrapsException, ScrapValidationException, WriteScrapException {
        Wishlist scrap = new Wishlist("wishlist-name", "wishlist-img", "brand", new BigDecimal("10.00"), "link");
        when(jsonLoader.loadScraps(anyString())).thenReturn(new ArrayList<>());
        doNothing().when(scrapValidator).validate(scrap);
        scrapRepository.addScrap(scrap);
        verify(jsonWriter, times(1)).writeScraps(anyString(), anyList());
    }
}
