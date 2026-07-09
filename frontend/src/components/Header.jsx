import "./Header.css";
import logo from "../assets/geometric_logo_transparent.webp";
import { FiPhoneCall } from "react-icons/fi";

function Header() {
  return (
    <header className="site-header">
      <a className="header-logo" href="/" aria-label="Till startsidan">
        <img src={logo} alt="Hörby Bilverkstad logo" />
        <div className="logo-text">
          <span className="logo-title">HÖRBY</span>
          <span className="logo-subtitle">BILVERKSTAD</span>
        </div>
      </a>

      <nav className="header-nav" aria-label="Huvudmeny">
        <a href="#services">Tjänster</a>
        <a href="#contact">Kontakt</a>
      </nav>

      <a className="header-phone" href="tel:0702457944">
        <FiPhoneCall className="phone-icon" />
        <span>0702457944</span>
      </a>
    </header>
  );
}

export default Header;