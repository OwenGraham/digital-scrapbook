package io.github.owengraham;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.owengraham.utils.JsonLoader;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class JsonLoaderTest {

    @Mock
    private ObjectMapper mapper;

    @InjectMocks
    private JsonLoader jsonLoader;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("Test loadScraps returns empty list when file does not exist")
    void testLoadScrapsNoFile() {

    }
}
