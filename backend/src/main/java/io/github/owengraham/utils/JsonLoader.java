package io.github.owengraham.utils;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import io.github.owengraham.models.Scrap;

public class JsonLoader {
    public static List<Scrap> loadScraps(String filePath) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        return mapper.readValue(new File(filePath), new TypeReference<List<Scrap>>() {
        });
    }
}
