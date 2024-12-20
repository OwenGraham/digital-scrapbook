package io.github.owengraham.api;

import io.github.owengraham.exceptions.LoadScrapsException;
import io.github.owengraham.exceptions.WriteScrapException;
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

    public List<Scrap> getScraps() throws LoadScrapsException {
        return JsonLoader.loadScraps(FILE_PATH);
    }

    public Scrap addScrap(Scrap scrap) throws WriteScrapException, LoadScrapsException {
        List<Scrap> scraps = getScraps();
        scraps.add(scrap);
        JsonWriter.writeScraps(FILE_PATH, scraps);
        return scrap;
    }
}
