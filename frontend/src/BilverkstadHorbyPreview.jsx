import React, { useState } from "react";
import { motion } from "framer-motion";
import { Car, CheckCircle2, Clock, MapPin, Menu, Phone, ShieldCheck, Wrench, X } from "lucide-react";

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

export default function BilverkstadHorbyPreview() {
  const [menuOpen, setMenuOpen] = useState(false);

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
                <span>Ring verkstaden direkt.</span>
              </h1>
              <p>
                Ring oss om bilen låter konstigt, varningslampor lyser eller du behöver snabb felsökning.
                Vi hjälper dig vidare direkt.
              </p>

              <div className="hero-actions">
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

        <section id="tjanster" className="services-section">
          <div className="section-inner">
            <div className="section-heading">
              <div>
                <p className="section-label">Tjänster</p>
                <h2>Vanliga verkstadsjobb</h2>
              </div>
              <LinkButton href="tel:0415123456">
                <Icon type="phone" /> Ring verkstaden
              </LinkButton>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <Card key={service} className="service-card">
                  <div className="service-icon">
                    <Icon type="wrench" />
                  </div>
                  <h3>{service}</h3>
                  <p>Ring oss så kontrollerar vi bilen och hjälper dig vidare med tydlig offert.</p>
                </Card>
              ))}
            </div>
          </div>
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
