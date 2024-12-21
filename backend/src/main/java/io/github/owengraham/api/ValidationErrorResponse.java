package io.github.owengraham.api;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.github.owengraham.models.ScrapType;

public class ValidationErrorResponse {
    private ScrapType scrapType;
    private String field;
    private String validationError;
    private String message;

    @JsonCreator
    public ValidationErrorResponse(@JsonProperty("scrapType") ScrapType scrapType,
                                   @JsonProperty("field") String field,
                                   @JsonProperty("validationError") String validationError,
                                   @JsonProperty("message") String message) {
        this.scrapType = scrapType;
        this.field = field;
        this.validationError = validationError;
        this.message = message;
    }

    public ScrapType getScrapType() {
        return scrapType;
    }

    public String getField() {
        return field;
    }

    public String getValidationError() {
        return validationError;
    }

    public String getMessage() {
        return message;
    }
}
