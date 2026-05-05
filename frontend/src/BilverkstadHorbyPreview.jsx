import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Car, CheckCircle2, Clock, MapPin, Menu, Phone, ShieldCheck, Wrench, X } from "lucide-react";

const services = [
  "Service & oljebyte",
  "Bromsar",
  "Däckbyte",
  "Felsökning",
  "AC-service",
  "Besiktningsfix"
];

const icons = {
  phone: Phone,
  calendar: CalendarCheck,
  wrench: Wrench,
  pin: MapPin,
  clock: Clock,
  check: CheckCircle2,
  menu: Menu,
  close: X,
  car: Car,
  shield: ShieldCheck
};

function Icon({ type, className = "" }) {
  const Component = icons[type] || CheckCircle2;
  return <Component className={`icon ${className}`} aria-hidden="true" />;
}

function Button({ children, variant = "primary", className = "", ...props }) {
  return (
    <button className={`button button-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}

function LinkButton({ children, variant = "primary", className = "", ...props }) {
  return (
    <a className={`button button-${variant} ${className}`} {...props}>
      {children}
    </a>
  );
}

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function validateBookingData(data) {
  const errors = [];
  if (!data.service) errors.push("Välj ärende");
  if (!data.description || data.description.trim().length < 8) errors.push("Beskriv problemet med minst 8 tecken");
  if (!data.phone || data.phone.replace(/\D/g, "").length < 7) errors.push("Ange ett giltigt mobilnummer");
  return { valid: errors.length === 0, errors };
}

const bookingValidationTests = [
  {
    name: "godkänner komplett bokningsförfrågan",
    input: { service: "Felsökning", description: "Motorlampan lyser och bilen går ojämnt", phone: "070-123 45 67" },
    expectedValid: true
  },
  {
    name: "stoppar tomt ärende",
    input: { service: "", description: "Bromsarna låter konstigt", phone: "0701234567" },
    expectedValid: false
  },
  {
    name: "stoppar för kort telefonnummer",
    input: { service: "Bromsar", description: "Bromsarna låter konstigt", phone: "123" },
    expectedValid: false
  }
];

function runBookingValidationTests() {
  return bookingValidationTests.map((test) => {
    const result = validateBookingData(test.input);
    return {
      name: test.name,
      passed: result.valid === test.expectedValid
    };
  });
}

async function createBooking(payload) {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const message = body?.errors?.[0] || "Det gick inte att skicka förfrågan just nu";
    throw new Error(message);
  }

  return body;
}

export default function BilverkstadHorbyPreview() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const testResults = useMemo(() => runBookingValidationTests(), []);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      service: formData.get("service"),
      registrationNumber: formData.get("registrationNumber"),
      description: formData.get("description"),
      phone: formData.get("phone"),
      preferredDate: formData.get("date") || null
    };
    const validation = validateBookingData(payload);

    if (!validation.valid) {
      setFormError(validation.errors[0]);
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      const booking = await createBooking(payload);
      setSubmittedBooking(booking);
      form.reset();
    } catch (error) {
      setFormError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-mark">
              <Icon type="wrench" />
            </div>
            <div>
              <p className="brand-name">Hörby Bilverkstad</p>
              <p className="brand-subtitle">Service nära dig</p>
            </div>
          </div>

          <nav className="desktop-nav">
            <a href="#boka">Boka tid</a>
            <a href="#tjanster">Tjänster</a>
            <a href="#kontakt">Kontakt</a>
          </nav>

          <LinkButton className="desktop-call" href="tel:0415123456">
            <Icon type="phone" /> Ring nu
          </LinkButton>

          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Öppna meny">
            {menuOpen ? <Icon type="close" /> : <Icon type="menu" />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <a href="#boka">Boka tid</a>
            <a href="#tjanster">Tjänster</a>
            <a href="#kontakt">Kontakt</a>
            <LinkButton href="tel:0415123456">
              <Icon type="phone" /> Ring verkstaden
            </LinkButton>
          </div>
        )}
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-inner">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="hero-copy"
            >
              <div className="eyebrow">
                <Icon type="pin" /> Bilverkstad i Hörby
              </div>
              <h1>
                Behöver bilen hjälp?
                <span>Boka snabbt och enkelt.</span>
              </h1>
              <p>
                Beskriv problemet, lämna ditt mobilnummer och välj önskad tid. Vi återkommer med bekräftelse eller
                ringer upp direkt.
              </p>

              <div className="hero-actions">
                <LinkButton href="#boka" className="large-button">
                  <Icon type="calendar" /> Boka tid
                </LinkButton>
                <LinkButton href="tel:0415123456" variant="secondary" className="large-button">
                  <Icon type="phone" /> Ring nu
                </LinkButton>
              </div>

              <div className="trust-row">
                <span><Icon type="check" /> Snabb återkoppling</span>
                <span><Icon type="check" /> Tydliga priser</span>
                <span><Icon type="check" /> Lokalt i Hörby</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <Card className="emergency-card">
                <div className="emergency-main">
                  <div className="big-icon">
                    <Icon type="car" />
                  </div>
                  <h2>Akut hjälp?</h2>
                  <p>Ring oss direkt om bilen inte startar, varningslampor lyser eller du behöver snabb felsökning.</p>
                  <LinkButton href="tel:0415123456" variant="light" className="full-width">
                    <Icon type="phone" /> 0415-123 456
                  </LinkButton>
                </div>
                <div className="emergency-meta">
                  <div>
                    <Icon type="clock" />
                    <p>Öppet</p>
                    <span>Mån-Fre 08-17</span>
                  </div>
                  <div>
                    <Icon type="shield" />
                    <p>Trygg service</p>
                    <span>Offert innan jobb</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        <section id="boka" className="booking-section">
          <div className="booking-grid">
            <div>
              <p className="section-label">Boka verkstadstid</p>
              <h2>Fyll i på under en minut</h2>
              <p className="section-copy">
                Formuläret är kopplat till Java-backenden. När kunden skickar förfrågan valideras datan på både klient
                och server.
              </p>
              <div className="steps">
                <div><strong>1.</strong> Välj tjänst</div>
                <div><strong>2.</strong> Beskriv problemet</div>
                <div><strong>3.</strong> Skicka bokningsförfrågan</div>
              </div>
            </div>

            <Card className="form-card">
              {!submittedBooking ? (
                <form onSubmit={handleSubmit} className="booking-form">
                  <div className="field">
                    <label htmlFor="service">Vad behöver du hjälp med?</label>
                    <select id="service" name="service" required>
                      <option value="">Välj ärende</option>
                      {services.map((service) => <option key={service} value={service}>{service}</option>)}
                      <option value="Annat problem">Annat problem</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="registrationNumber">Registreringsnummer</label>
                    <input id="registrationNumber" name="registrationNumber" placeholder="ABC123" />
                  </div>

                  <div className="field">
                    <label htmlFor="description">Beskriv problemet</label>
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Exempel: Bilen låter konstigt när jag bromsar, motorlampan lyser..."
                      required
                    />
                  </div>

                  <div className="two-fields">
                    <div className="field">
                      <label htmlFor="phone">Mobilnummer</label>
                      <input id="phone" name="phone" placeholder="070-123 45 67" required />
                    </div>
                    <div className="field">
                      <label htmlFor="date">Önskad dag</label>
                      <input id="date" name="date" type="date" />
                    </div>
                  </div>

                  {formError && (
                    <div className="form-error" role="alert">
                      {formError}
                    </div>
                  )}

                  <Button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? "Skickar..." : "Skicka bokningsförfrågan"}
                  </Button>
                  <p className="form-note">Vi ringer eller SMS:ar för att bekräfta tiden.</p>
                </form>
              ) : (
                <div className="success-state">
                  <div className="success-icon">
                    <Icon type="check" />
                  </div>
                  <h3>Förfrågan skickad!</h3>
                  <p>Boknings-id: {submittedBooking.id}</p>
                  <Button variant="secondary" onClick={() => setSubmittedBooking(null)}>Skicka en till</Button>
                </div>
              )}
            </Card>
          </div>
        </section>

        <section id="tjanster" className="services-section">
          <div className="section-inner">
            <div className="section-heading">
              <div>
                <p className="section-label">Tjänster</p>
                <h2>Vanliga verkstadsjobb</h2>
              </div>
              <LinkButton href="#boka">Boka service</LinkButton>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <Card key={service} className="service-card">
                  <div className="service-icon">
                    <Icon type="wrench" />
                  </div>
                  <h3>{service}</h3>
                  <p>Boka en tid så kontrollerar vi bilen och återkommer med tydlig offert.</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="technical-section">
          <details>
            <summary>Teknisk kontroll</summary>
            <div className="test-list">
              {testResults.map((test) => (
                <div key={test.name}>
                  <span className={test.passed ? "passed" : "failed"}>{test.passed ? "Godkänt" : "Fel"}</span>
                  <span>{test.name}</span>
                </div>
              ))}
            </div>
          </details>
        </section>

        <section id="kontakt" className="contact-section">
          <Card className="contact-card">
            <div>
              <p className="section-label">Kontakt</p>
              <h2>Kom förbi eller ring direkt</h2>
              <p>Exempeladress i Hörby. Byt ut adress och telefonnummer när riktiga uppgifter finns.</p>
            </div>
            <div className="contact-links">
              <a href="tel:0415123456">
                <Icon type="phone" />
                <span>
                  <small>Ring verkstaden</small>
                  <strong>0415-123 456</strong>
                </span>
              </a>
              <div>
                <Icon type="pin" />
                <span>
                  <small>Adress</small>
                  <strong>Verkstadsgatan 1, Hörby</strong>
                </span>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
