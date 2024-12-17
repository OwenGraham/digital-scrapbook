package io.github.owengraham;

import io.github.owengraham.models.Scrap;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public Scrap addScrap(Scrap scrap) {
        return scrapRepository.addScrap(scrap);
    }
}
