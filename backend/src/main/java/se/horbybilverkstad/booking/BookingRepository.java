package se.horbybilverkstad.booking;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public class BookingRepository {
  private final SpringDataBookingRepository repository;

  public BookingRepository(SpringDataBookingRepository repository) {
    this.repository = repository;
  }

  public Booking save(BookingRequest request) {
    return repository.save(BookingEntity.from(request)).toBooking();
  }

  public List<Booking> findAll() {
    return repository.findAllByOrderByCreatedAtDesc().stream()
        .map(BookingEntity::toBooking)
        .toList();
  }

  public Optional<Booking> findById(UUID id) {
    return repository.findById(id).map(BookingEntity::toBooking);
  }
}

interface SpringDataBookingRepository extends JpaRepository<BookingEntity, UUID> {
  List<BookingEntity> findAllByOrderByCreatedAtDesc();
}
