import "./Services.css";

import engineOilIcon from "../assets/engine_oil_indicator_icon_transparent_v2.webp";
import diagnosticsIcon from "../assets/ecg_monitor_magnifier_transparent.webp";
import brakesIcon from "../assets/brake_disc_icon_transparent.webp";
import tyreIcon from "../assets/tyre_icon_transparent.webp";
import snowflakeIcon from "../assets/snowflake_icon_transparent.webp";

const services = [
  {
    icon: engineOilIcon,
    title: "Bilservice",
    text: "Regelbunden service enligt fabrikantens rekommendationer för nybilsgaranti och säker drift.",
  },
  {
    icon: diagnosticsIcon,
    title: "Felsökning",
    text: "Modern felsökning med avancerad utrustning. Vi hittar problemet – snabbt.",
  },
  {
    icon: brakesIcon,
    title: "Bromsar",
    text: "Kontroll, reparation och byte av bromsar. Din säkerhet är vår prioritet.",
  },
  {
    icon: tyreIcon,
    title: "Däckservice",
    text: "Däckbyte, balansering, lagring och förvaring. Vi hjälper dig hela vägen.",
  },
  {
    icon: snowflakeIcon,
    title: "AC-service",
    text: "Kontroll och påfyllning av AC-system för ett skönt klimat i bilen.",
  },
];

function Services() {
  return (
    <section className="services">
      <div className="services-header">
        <span className="services-eyebrow">VÅRA TJÄNSTER</span>
        <h2>Allt för din bil – under ett och samma tak</h2>
        <p>
          Vi erbjuder ett komplett utbud av tjänster för att din bil ska rulla
          säkert året runt.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <img src={service.icon} alt="" className="service-icon" />

            <h3>{service.title}</h3>

            <p>{service.text}</p>

          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;