package se.horbybilverkstad.booking;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ValidationErrorResponse> handleValidation(MethodArgumentNotValidException exception) {
    List<String> errors = exception.getBindingResult().getFieldErrors().stream()
        .map(error -> error.getDefaultMessage() == null ? "Ogiltigt värde" : error.getDefaultMessage())
        .distinct()
        .toList();

    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(new ValidationErrorResponse(errors));
  }

  public record ValidationErrorResponse(List<String> errors) {
  }
}
