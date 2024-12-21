package io.github.owengraham.api;

import io.github.owengraham.exceptions.LoadScrapsException;
import io.github.owengraham.exceptions.ScrapValidationException;
import io.github.owengraham.exceptions.WriteScrapException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class ScrapExceptionHandler {

    @ExceptionHandler(LoadScrapsException.class)
    public ResponseEntity<String> handleLoadScrapsException(LoadScrapsException e) {
        return ResponseEntity.status(500).body(e.getMessage());
    }

    @ExceptionHandler(WriteScrapException.class)
    public ResponseEntity<String> handleWriteScrapException(WriteScrapException e) {
        return ResponseEntity.status(500).body(e.getMessage());
    }

    @ExceptionHandler(ScrapValidationException.class)
    public ResponseEntity<ValidationErrorResponse> handleScrapValidationException(ScrapValidationException e) {
        ValidationErrorResponse errorResponse = new ValidationErrorResponse(e.getType(), e.getField(), e.getValidationMethod(), e.getMessage());

        return ResponseEntity.badRequest().body(errorResponse);
    }
}
