package io.github.owengraham.api;

import io.github.owengraham.exceptions.LoadScrapsException;
import io.github.owengraham.exceptions.WriteScrapException;
import io.github.owengraham.models.Scrap;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/scraps")
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.151:3000"})
public class ScrapController {
    private final ScrapRepository scrapRepository;

    @Autowired
    public ScrapController(ScrapRepository scrapRepository) {
        this.scrapRepository = scrapRepository;
    }

    @GetMapping
    public ResponseEntity<ScrapResponse> getScraps() throws LoadScrapsException {
        List<Scrap> scraps = scrapRepository.getScraps();
        ScrapResponse response = new ScrapResponse(scraps, "Successfully loaded scraps.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SingleScrapResponse> addScrap(@RequestBody Scrap scrap) throws WriteScrapException, LoadScrapsException {
        Scrap responseScrap = scrapRepository.addScrap(scrap);
        SingleScrapResponse response = new SingleScrapResponse(responseScrap, "Successfully added scrap.");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
