package io.github.owengraham;

import io.github.owengraham.models.Scrap;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/scraps")
@CrossOrigin(origins = "http://localhost:3000")
public class ScrapController {
    private final ScrapRepository scrapRepository;

    @Autowired
    public ScrapController(ScrapRepository scrapRepository) {
        this.scrapRepository = scrapRepository;
    }

    @GetMapping
    public List<Scrap> getScraps() {
        return scrapRepository.getScraps();
    }

    @PostMapping
    public Scrap addScrap(@RequestBody Scrap scrap) {
        return scrapRepository.addScrap(scrap);
    }
}
