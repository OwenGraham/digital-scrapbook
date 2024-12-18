package io.github.owengraham.api;

import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.ArrayList;
import java.io.IOException;
import io.github.owengraham.models.Scrap;
import io.github.owengraham.utils.JsonLoader;
import io.github.owengraham.utils.JsonWriter;

@Repository
public class ScrapRepository {
    private final String FILE_PATH = "data/scraps.json";

    public List<Scrap> getScraps() {
        try {
            return JsonLoader.loadScraps(FILE_PATH);
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public Scrap getScrapByName(String name) {
        List<Scrap> scraps = getScraps();
        for (Scrap scrap : scraps) {
            if (scrap.getName().equals(name)) {
                return scrap;
            }
        }
        return null;
    }

    public Scrap addScrap(Scrap scrap) {
        List<Scrap> scraps = getScraps();
        scraps.add(scrap);
        try {
            JsonWriter.writeScraps(FILE_PATH, scraps);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return scrap;
    }
}
