package se.horbybilverkstad.booking;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "bookings")
public class BookingEntity {
  @Id
  private UUID id;

  @Column(nullable = false, length = 120)
  private String service;

  @Column(name = "registration_number", nullable = false, length = 12)
  private String registrationNumber;

  @Column(nullable = false, columnDefinition = "text")
  private String description;

  @Column(nullable = false, length = 30)
  private String phone;

  @Column(name = "preferred_date")
  private LocalDate preferredDate;

  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  protected BookingEntity() {
  }

  private BookingEntity(
      UUID id,
      String service,
      String registrationNumber,
      String description,
      String phone,
      LocalDate preferredDate,
      Instant createdAt
  ) {
    this.id = id;
    this.service = service;
    this.registrationNumber = registrationNumber;
    this.description = description;
    this.phone = phone;
    this.preferredDate = preferredDate;
    this.createdAt = createdAt;
  }

  static BookingEntity from(BookingRequest request) {
    return new BookingEntity(
        UUID.randomUUID(),
        request.service().trim(),
        normalizeNullable(request.registrationNumber()),
        request.description().trim(),
        request.phone().trim(),
        request.preferredDate(),
        Instant.now()
    );
  }

  Booking toBooking() {
    return new Booking(
        id,
        service,
        registrationNumber,
        description,
        phone,
        preferredDate,
        createdAt
    );
  }

  private static String normalizeNullable(String value) {
    if (value == null || value.isBlank()) {
      return "";
    }
    return value.trim().toUpperCase();
  }
}
