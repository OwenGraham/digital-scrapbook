package io.github.owengraham.utils;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.github.owengraham.models.Scrap;

public class JsonWriter {
    public static void writeScraps(String filePath, List<Scrap> scraps) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.writeValue(new File(filePath), scraps);
    }
}
