import "./Hero.css";
import heroImage from "../assets/hero-image.webp";
import stopwatchIcon from "../assets/stopwatch_icon_transparent.webp";
import supportIcon from "../assets/support_agent_icon_transparent.webp";
import shieldIcon from "../assets/shield_check_icon_transparent.webp";
import { FiMapPin, FiPhoneCall } from "react-icons/fi";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="eyebrow-icon">★</span>
          <span>DIN LOKALA BILVERKSTAD I HÖRBY</span>
        </div>

        <h1 className="hero-title">
          <span>Service, reparation</span>
          <span>&amp; däck i Hörby</span>
        </h1>

        <p className="hero-text">
          Vi tar hand om din bil som om den vore vår egen.
          <br />
          Kvalitet, trygghet och personlig service – varje gång.
        </p>

        <div className="hero-actions">
          <a href="tel:041512345" className="hero-button primary">
            <FiPhoneCall />
            <span>Ring oss</span>
          </a>

          <a href="#contact" className="hero-button secondary">
            <FiMapPin />
            <span>Hitta hit</span>
          </a>

        </div>

        <div className="hero-features">
          <div className="hero-feature">
            <img src={stopwatchIcon} alt="" />
            <div>
              <strong>Snabb respons</strong>
              <span>Ofta lediga tider samma vecka</span>
            </div>
          </div>

          <div className="hero-feature">
            <img src={supportIcon} alt="" />
            <div>
              <strong>Personlig service</strong>
              <span>Vi förklarar och hjälper dig</span>
            </div>
          </div>

          <div className="hero-feature">
            <img src={shieldIcon} alt="" />
            <div>
              <strong>Tryggt &amp; säkert</strong>
              <span>Auktoriserad verkstadspersonal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-image-wrap">
        <img src={heroImage} alt="Mekaniker som arbetar med en bilmotor" />
      </div>
    </section>
  );
}

export default Hero;