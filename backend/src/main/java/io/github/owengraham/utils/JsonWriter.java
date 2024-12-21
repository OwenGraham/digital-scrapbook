package io.github.owengraham.utils;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.github.owengraham.exceptions.WriteScrapException;
import io.github.owengraham.models.Scrap;

public class JsonWriter {
    public void writeScraps(String filePath, List<Scrap> scraps) throws WriteScrapException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());

        try {
            mapper.writeValue(new File(filePath), scraps);
        } catch (IOException e) {
            throw new WriteScrapException("Failed to add scrap",e);
        }
    }
}
