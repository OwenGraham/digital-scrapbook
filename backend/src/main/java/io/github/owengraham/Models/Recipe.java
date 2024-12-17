package io.github.owengraham.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Recipe extends Scrap {
    private List<String> ingredients;
    private List<String> steps;

    @JsonCreator
    public Recipe(
            @JsonProperty("name") String name,
            @JsonProperty("img") String img,
            @JsonProperty("ingredients") List<String> ingredients,
            @JsonProperty("steps") List<String> steps) {
        super(ScrapType.RECIPE, name, img);
        this.ingredients = ingredients;
        this.steps = steps;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public List<String> getSteps() {
        return steps;
    }

    public void setSteps(List<String> steps) {
        this.steps = steps;
    }
}
