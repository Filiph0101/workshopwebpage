package se.horbybilverkstad.booking;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Repository;

@Repository
public class BookingRepository {
  private final List<Booking> bookings = new ArrayList<>();

  public synchronized Booking save(Booking booking) {
    bookings.add(booking);
    return booking;
  }

  public synchronized List<Booking> findAll() {
    return List.copyOf(bookings);
  }

  public synchronized Optional<Booking> findById(UUID id) {
    return bookings.stream().filter(booking -> booking.id().equals(id)).findFirst();
  }
}
