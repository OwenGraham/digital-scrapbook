package io.github.owengraham.api;

import io.github.owengraham.exceptions.LoadScrapsException;
import io.github.owengraham.exceptions.ScrapValidationException;
import io.github.owengraham.exceptions.WriteScrapException;
import io.github.owengraham.utils.ScrapValidator;
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
    private JsonLoader jsonLoader = new JsonLoader();
    private JsonWriter jsonWriter = new JsonWriter();

    public ScrapRepository() {
    }

    public List<Scrap> getScraps() throws LoadScrapsException {
        return jsonLoader.loadScraps(FILE_PATH);
    }

    public Scrap addScrap(Scrap scrap) throws WriteScrapException, LoadScrapsException, ScrapValidationException {
        ScrapValidator.validate(scrap);
        List<Scrap> scraps = getScraps();
        scraps.add(scrap);
        jsonWriter.writeScraps(FILE_PATH, scraps);
        return scrap;
    }
}
