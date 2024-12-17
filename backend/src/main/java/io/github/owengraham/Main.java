package io.github.owengraham;

import io.github.owengraham.models.Film;
import io.github.owengraham.models.Scrap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        // ScrapRepository scrapRepository = new ScrapRepository();
        // List<Scrap> scraps = scrapRepository.getScraps();
        // scraps.forEach(scrap -> System.out.println(scrap.getName()));

        // scrapRepository.addScrap(new Film("New film", "New image", "New Director", 0,
        // 0, "New review"));
        // System.out.println("Added film");

        // scraps = scrapRepository.getScraps();
        // scraps.forEach(scrap -> System.out.println(scrap.getName()));

        SpringApplication.run(Main.class, args);
    }
}