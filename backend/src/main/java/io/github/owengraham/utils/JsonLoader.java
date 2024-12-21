package io.github.owengraham.utils;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import io.github.owengraham.exceptions.LoadScrapsException;
import io.github.owengraham.models.Scrap;

public class JsonLoader {
    public List<Scrap> loadScraps(String filePath) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        try {
            return mapper.readValue(new File(filePath), new TypeReference<List<Scrap>>() {});
        } catch (IOException e) {
            throw new LoadScrapsException("Failed to load scraps", e);
        }
    }
}
