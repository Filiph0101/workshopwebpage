import "./Contact.css";
import { FiMapPin, FiPhone, FiPhoneCall, FiClock, FiCalendar } from "react-icons/fi";

const openingHours = [
  { day: "Måndag", time: "07:00 – 16:30" },
  { day: "Tisdag", time: "07:00 – 16:30" },
  { day: "Onsdag", time: "07:00 – 16:30" },
  { day: "Torsdag", time: "07:00 – 16:30" },
  { day: "Fredag", time: "07:00 – 16:30" },
  { day: "Lördag", time: "Stängt" },
  { day: "Söndag", time: "Stängt" },
];

function Contact() {
  return (
    <section className="contact-section">
      <div className="contact-card">
        <div className="contact-info">
          <span className="contact-eyebrow">KONTAKT</span>

          <h2>
            Välkommen till
            <br />
            Hörby Bilverkstad
          </h2>

          <div className="contact-list">
            <a className="contact-item" href="https://maps.app.goo.gl/6nTtxgAa47935D558">
              <FiMapPin />
              <span>
                Silvergatan 15
                <br />
                Hörby
              </span>
            </a>

            <a className="contact-item" href="tel:0702457944">
              <FiPhone />
              <span>0702457944</span>
            </a>

            <div className="contact-item">
              <FiClock />
              <span>Mån–Fre 07:00–16:30</span>
            </div>

            <div className="contact-item">
              <FiCalendar />
              <span>Tidsbokning via telefon</span>
            </div>
          </div>
        </div>

        <div className="contact-map">
        <iframe
          title="Karta till Hörby Bilverkstad"
          src="https://www.google.com/maps?q=Silvergatan%2015%2C%20H%C3%B6rby&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

        <div className="contact-hours">
          <span className="hours-eyebrow">ÖPPETTIDER</span>

          <div className="hours-list">
            {openingHours.map((item) => (
              <div className="hours-row" key={item.day}>
                <span>{item.day}</span>
                <strong>{item.time}</strong>
              </div>
            ))}
          </div>

          <a href="tel:0702457944" className="contact-book-button">
            <FiPhoneCall />
            <span>Ring oss</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;