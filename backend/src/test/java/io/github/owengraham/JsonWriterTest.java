package io.github.owengraham;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.owengraham.exceptions.WriteScrapException;
import io.github.owengraham.models.Scrap;
import io.github.owengraham.models.Wishlist;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import io.github.owengraham.utils.JsonWriter;
import org.mockito.MockitoAnnotations;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.*;

public class JsonWriterTest {

    @Mock
    private ObjectMapper mapper;

    @InjectMocks
    private JsonWriter jsonWriter;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("Test writeScraps calls mapper writeValue with correct arguments")
    void testWriteScraps() throws IOException {
        // Arrange
        Wishlist scrap = new Wishlist("wishlist-name", "wishlist-img", "brand", new BigDecimal("10.00"), "link");
        doNothing().when(mapper).writeValue(any(File.class), anyList());
        jsonWriter.writeScraps("test", List.of(scrap));
        ArgumentCaptor<File> fileCaptor = ArgumentCaptor.forClass(File.class);
        ArgumentCaptor<List> scrapCaptor = ArgumentCaptor.forClass(List.class);

        // Act
        verify(mapper, times(1)).writeValue(fileCaptor.capture(), scrapCaptor.capture());

        File capturedFile = fileCaptor.getValue();
        List capturedScrap = scrapCaptor.getValue();

        // Assert
        assertEquals("test", capturedFile.getPath());
        assertEquals(List.of(scrap), capturedScrap);
    }

    @Test
    @DisplayName("Test writeScraps propagates exception")
    void testWriteScrapsException() throws IOException {
        doThrow(new IOException()).when(mapper).writeValue(any(File.class), anyList());
        assertThrows(WriteScrapException.class, () -> jsonWriter.writeScraps("test", List.of()));
    }
}
