import "./Footer.css";
import logo from "../assets/geometric_logo_navy_bg_removed.webp";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo-row">
              <img src={logo} alt="Hörby Bilverkstad logo" />
              <div className="footer-logo-text">
                <span className="footer-logo-title">HÖRBY</span>
                <span className="footer-logo-subtitle">BILVERKSTAD</span>
              </div>
            </div>

            <p>
              Din lokala bilverkstad i Hörby.
              <br />
              Kvalitet, trygghet och personlig service.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Hörby Bilverkstad AB. Alla rättigheter förbehållna.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;