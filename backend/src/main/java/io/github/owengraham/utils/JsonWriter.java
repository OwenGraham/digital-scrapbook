package io.github.owengraham.utils;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.github.owengraham.exceptions.WriteScrapException;
import io.github.owengraham.models.Scrap;

public class JsonWriter {
    private final ObjectMapper mapper;

    // Default constructor
    public JsonWriter() {
        this.mapper = new ObjectMapper();
        this.mapper.registerModule(new JavaTimeModule());
    }

    // Constructor with ObjectMapper parameter for dependency injection
    public JsonWriter(ObjectMapper mapper) {
        this.mapper = mapper;
        this.mapper.registerModule(new JavaTimeModule());
    }

    public void writeScraps(String filePath, List<? extends Scrap> scraps) throws WriteScrapException {
        try {
            mapper.writeValue(new File(filePath), scraps);
        } catch (IOException e) {
            throw new WriteScrapException("Failed to add scrap",e);
        }
    }
}
