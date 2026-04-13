import React from 'react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_2c2465d1-108e-46f2-8f78-446c2974f0d1/artifacts/bkpp9zrl_match%26live.jpeg';

export default function Footer() {
  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <div className="site-footer__logo">
            <img src={LOGO_URL} alt="Match&Live" className="site-footer__logo-img" />
            <span className="site-footer__logo-text">Match&Live</span>
          </div>
          <p className="site-footer__tagline">
            Tu proximo match inmobiliario. Encuentra compañero de piso como quien hace swipe.
          </p>
        </div>

        <div className="site-footer__links">
          <div className="site-footer__col">
            <h4>Plataforma</h4>
            <a href="#como-funciona">Como funciona</a>
            <a href="#pisos">Explorar pisos</a>
            <a href="#testimonios">Testimonios</a>
          </div>
          <div className="site-footer__col">
            <h4>Ciudades</h4>
            <a href="#pisos">Madrid</a>
            <a href="#pisos">Barcelona</a>
            <a href="#pisos">Valencia</a>
            <a href="#pisos">Sevilla</a>
          </div>
          <div className="site-footer__col">
            <h4>Legal</h4>
            <a href="#inicio">Privacidad</a>
            <a href="#inicio">Terminos</a>
            <a href="#inicio">Cookies</a>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© 2026 Match&Live. Todos los derechos reservados.</p>
      </div>

      <style>{`
        .site-footer {
          padding: 64px 24px 0;
          background: var(--color-text);
          color: rgba(255,255,255,0.7);
        }
        .site-footer__inner {
          display: grid;
          grid-template-columns: 1.2fr 2fr;
          gap: 48px;
          max-width: 1200px;
          margin: 0 auto;
          padding-bottom: 48px;
        }
        .site-footer__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .site-footer__logo-img {
          width: 44px;
          height: 44px;
          object-fit: contain;
          object-position: center;
          flex: 0 0 auto;
        }
        .site-footer__logo-text {
          font-size: 1.15rem;
          font-weight: 800;
          color: #fff;
          white-space: nowrap;
        }
        .site-footer__tagline {
          font-size: 0.92rem;
          line-height: 1.6;
          max-width: 280px;
        }
        .site-footer__links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        .site-footer__col h4 {
          color: #fff;
          font-size: 0.88rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 16px;
        }
        .site-footer__col a {
          display: block;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          font-size: 0.9rem;
          padding: 5px 0;
          transition: color 0.2s ease;
        }
        .site-footer__col a:hover {
          color: var(--color-accent);
        }
        .site-footer__bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding: 20px 24px;
          text-align: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        .site-footer__bottom p {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.35);
        }

        @media (max-width: 768px) {
          .site-footer__inner { grid-template-columns: 1fr; gap: 32px; }
          .site-footer__links { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .site-footer__links { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}
