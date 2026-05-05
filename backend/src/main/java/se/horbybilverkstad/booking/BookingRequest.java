package se.horbybilverkstad.booking;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record BookingRequest(
    @NotBlank(message = "Välj ärende")
    String service,

    @Pattern(regexp = "^$|^[A-Za-z0-9 -]{2,12}$", message = "Ange ett giltigt registreringsnummer")
    String registrationNumber,

    @NotBlank(message = "Beskriv problemet")
    @Size(min = 8, message = "Beskriv problemet med minst 8 tecken")
    String description,

    @NotBlank(message = "Ange mobilnummer")
    @Pattern(regexp = "^[0-9 +()-]{7,20}$", message = "Ange ett giltigt mobilnummer")
    String phone,

    LocalDate preferredDate
) {
}
