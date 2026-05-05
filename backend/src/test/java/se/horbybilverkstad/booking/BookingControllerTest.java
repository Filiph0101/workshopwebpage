package se.horbybilverkstad.booking;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class BookingControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Test
  void createsBooking() throws Exception {
    mockMvc.perform(post("/api/bookings")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                  "service": "Felsökning",
                  "registrationNumber": "abc123",
                  "description": "Motorlampan lyser och bilen går ojämnt",
                  "phone": "070-123 45 67",
                  "preferredDate": "2026-05-05"
                }
                """))
        .andExpect(status().isCreated())
        .andExpect(header().exists("Location"))
        .andExpect(jsonPath("$.id").exists())
        .andExpect(jsonPath("$.registrationNumber").value("ABC123"));
  }

  @Test
  void rejectsInvalidBooking() throws Exception {
    mockMvc.perform(post("/api/bookings")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                  "service": "",
                  "description": "Kort",
                  "phone": "123"
                }
                """))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors", hasSize(3)));
  }

  @Test
  void listsBookings() throws Exception {
    mockMvc.perform(get("/api/bookings"))
        .andExpect(status().isOk());
  }
}
