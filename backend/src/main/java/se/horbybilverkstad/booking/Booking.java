package se.horbybilverkstad.booking;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record Booking(
    UUID id,
    String service,
    String registrationNumber,
    String description,
    String phone,
    LocalDate preferredDate,
    Instant createdAt
) {
  static Booking from(BookingRequest request) {
    return new Booking(
        UUID.randomUUID(),
        request.service().trim(),
        normalizeNullable(request.registrationNumber()),
        request.description().trim(),
        request.phone().trim(),
        request.preferredDate(),
        Instant.now()
    );
  }

  private static String normalizeNullable(String value) {
    if (value == null || value.isBlank()) {
      return "";
    }
    return value.trim().toUpperCase();
  }
}
