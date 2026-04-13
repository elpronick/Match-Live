import React from 'react';

import logoUrl from '../assets/match-live-logo.svg';

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

      <style>{`
        .hero {
          padding: 140px 24px 80px;
          overflow: hidden;
        }
        .hero__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-accent);
          background: rgba(232, 139, 139, 0.12);
          border-radius: var(--radius-pill);
          margin-bottom: 24px;
          animation: fadeInUp 0.6s ease;
        }
        .hero__badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-accent);
          animation: pulse-dot 2s ease infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .hero__title {
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          font-weight: 800;
          line-height: 1.02;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
          animation: fadeInUp 0.6s ease 0.1s both;
        }
        .hero__title-accent {
          background: linear-gradient(135deg, var(--color-accent), var(--color-green));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero__subtitle {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--color-muted);
          max-width: 480px;
          margin-bottom: 32px;
          animation: fadeInUp 0.6s ease 0.2s both;
        }
        .hero__actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 40px;
          animation: fadeInUp 0.6s ease 0.3s both;
        }
        .hero__btn {
          display: inline-flex;
          align-items: center;
          padding: 16px 32px;
          font-size: 0.95rem;
          font-weight: 700;
          border-radius: var(--radius-pill);
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .hero__btn--primary {
          color: #fff;
          background: var(--color-accent);
          box-shadow: 0 8px 28px rgba(232, 139, 139, 0.35);
        }
        .hero__btn--primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(232, 139, 139, 0.45);
          background: var(--color-accent-dark);
        }
        .hero__btn--secondary {
          color: var(--color-text);
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid var(--color-border);
        }
        .hero__btn--secondary:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.9);
        }
        .hero__stats {
          display: flex;
          align-items: center;
          gap: 24px;
          animation: fadeInUp 0.6s ease 0.4s both;
        }
        .hero__stat strong {
          display: block;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--color-text);
        }
        .hero__stat span {
          font-size: 0.82rem;
          color: var(--color-muted);
        }
        .hero__stat-divider {
          width: 1px;
          height: 36px;
          background: var(--color-border);
        }
        .hero__visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 480px;
          animation: fadeInRight 0.8s ease 0.2s both;
        }
        .hero__card {
          position: absolute;
          width: 300px;
          border-radius: 24px;
          overflow: hidden;
          background: var(--color-surface-strong);
          box-shadow: var(--shadow-card);
        }
        .hero__card--back {
          transform: rotate(6deg) translateX(30px) translateY(-10px);
          opacity: 0.7;
          z-index: 1;
        }
        .hero__card--front {
          transform: rotate(-3deg) translateX(-10px);
          z-index: 2;
        }
        .hero__card-img {
          width: 100%;
          height: 260px;
          background-size: cover;
          background-position: center;
        }
        .hero__card-info {
          padding: 18px 20px;
        }
        .hero__card-tag {
          display: inline-block;
          padding: 5px 12px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-accent);
          background: rgba(232, 139, 139, 0.12);
          border-radius: var(--radius-pill);
          margin-bottom: 8px;
        }
        .hero__card-location {
          font-size: 0.85rem;
          color: var(--color-muted);
          margin-bottom: 4px;
        }
        .hero__card-price {
          font-size: 1.15rem;
          font-weight: 800;
        }
        .hero__floating-logo {
          position: absolute;
          bottom: 20px;
          right: 20px;
          width: 64px;
          height: 64px;
          object-fit: contain;
          object-position: center;
          filter: drop-shadow(0 8px 24px rgba(0,0,0,0.14));
          z-index: 3;
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 900px) {
          .hero__inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero__visual {
            min-height: 380px;
          }
          .hero__card { width: 240px; }
          .hero__card-img { height: 200px; }
          .hero { padding: 120px 24px 60px; }
        }
        @media (max-width: 640px) {
          .hero__stats { flex-wrap: wrap; gap: 16px; }
          .hero__stat-divider { display: none; }
          .hero__actions { flex-direction: column; }
          .hero__btn { justify-content: center; }
        }
      `}</style>
    </section>
  );
}

