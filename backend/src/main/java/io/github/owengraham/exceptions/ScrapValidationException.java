package io.github.owengraham.exceptions;

import io.github.owengraham.models.ScrapType;

public class ScrapValidationException extends RuntimeException {
    private final ScrapType type;
    private final String field;
    private final String validationMethod;

    public ScrapValidationException(ScrapType type, String field, String validationMethod) {
        super(String.format("Validation failed for %s: field '%s' failed validation '%s'", type, field, validationMethod));
        this.type = type;
        this.field = field;
        this.validationMethod = validationMethod;
    }

    public ScrapType getType() {
        return type;
    }

    public String getField() {
        return field;
    }

    public String getValidationMethod() {
        return validationMethod;
    }
}
