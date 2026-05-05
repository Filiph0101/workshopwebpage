package se.horbybilverkstad.booking;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {
  private final BookingRepository repository;

  public BookingController(BookingRepository repository) {
    this.repository = repository;
  }

  @PostMapping
  public ResponseEntity<Booking> create(@Valid @RequestBody BookingRequest request) {
    Booking booking = repository.save(Booking.from(request));
    return ResponseEntity
        .created(URI.create("/api/bookings/" + booking.id()))
        .body(booking);
  }

  @GetMapping
  public List<Booking> list() {
    return repository.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Booking> get(@PathVariable UUID id) {
    return repository.findById(id)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }
}
