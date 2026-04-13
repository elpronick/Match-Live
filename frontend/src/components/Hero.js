import React from 'react';
import logoUrl from '../assets/match-live-logo.svg';
import './Hero.scss';
export default function Hero() {
  return (
    <section className="hero" id="inicio" data-testid="hero-section">
      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__badge" data-testid="hero-badge">
            <span className="hero__badge-dot" />
            Tu proximo match inmobiliario
          </div>
          <h1 className="hero__title" data-testid="hero-title">
            Encuentra tu <span className="hero__title-accent">compañero de piso</span> ideal
          </h1>
          <p className="hero__subtitle" data-testid="hero-subtitle">
            Descubre habitaciones como si hicieras swipe. Filtra por zona,
            presupuesto y estilo de vida. Tu proximo hogar esta a un match de distancia.
          </p>
          <div className="hero__actions">
            <a href="#pisos" className="hero__btn hero__btn--primary" data-testid="hero-cta-primary">
              Empezar a buscar
            </a>
            <a href="#como-funciona" className="hero__btn hero__btn--secondary" data-testid="hero-cta-secondary">
              Como funciona
            </a>
          </div>
          <div className="hero__stats" data-testid="hero-stats">
            <div className="hero__stat">
              <strong>2,400+</strong>
              <span>Habitaciones</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>850+</strong>
              <span>Matches</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>4 ciudades</strong>
              <span>Disponibles</span>
            </div>
          </div>
        </div>
        <div className="hero__visual" data-testid="hero-visual">
          <div className="hero__card hero__card--back">
            <div className="hero__card-img" style={{backgroundImage: "url('https://images.pexels.com/photos/20725943/pexels-photo-20725943.jpeg')"}} />
          </div>
          <div className="hero__card hero__card--front">
            <div className="hero__card-img" style={{backgroundImage: "url('https://images.pexels.com/photos/20725941/pexels-photo-20725941.jpeg')"}} />
            <div className="hero__card-info">
              <span className="hero__card-tag">Top match</span>
              <p className="hero__card-location">Malasaña, Madrid</p>
              <p className="hero__card-price">460 EUR/mes</p>
            </div>
          </div>
          <img
            src={logoUrl}
            alt=""
            className="hero__floating-logo"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}



