import React from 'react';
import logoUrl from '../assets/match-live-logo.svg';
import './Footer.scss';
export default function Footer() {
  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <div className="site-footer__logo">
            <img src={logoUrl} alt="Match&Live" className="site-footer__logo-img" />
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
    </footer>
  );
}



