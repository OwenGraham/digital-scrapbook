package io.github.owengraham.utils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import io.github.owengraham.exceptions.LoadScrapsException;
import io.github.owengraham.models.Scrap;

public class JsonLoader {
    private final ObjectMapper mapper;

    public JsonLoader() {
        this.mapper = new ObjectMapper();
        this.mapper.registerModule(new JavaTimeModule());
    }

    public JsonLoader(ObjectMapper mapper) {
        this.mapper = mapper;
        this.mapper.registerModule(new JavaTimeModule());
    }

    public List<Scrap> loadScraps(String filePath) {
        File file = new File(filePath);
        if (!file.exists()) {
            return new ArrayList<>(); // Return an empty list if the file doesn't exist
        }
        try {
            return mapper.readValue(file, new TypeReference<List<Scrap>>() {
            });
        } catch (IOException e) {
            throw new LoadScrapsException("Failed to load scraps", e);
        }
    }
}
