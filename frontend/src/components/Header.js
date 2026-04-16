import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../assets/match-live-logo.svg';
import './Header.scss';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Pisos', href: '#pisos' },
  { label: 'Testimonios', href: '#testimonios' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollMeterActive, setScrollMeterActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const nextScrollY = window.scrollY;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0
      );
      const nextProgress = maxScroll > 0 ? Math.min(nextScrollY / maxScroll, 1) : 0;

      setScrolled(nextScrollY > 20);
      setScrollProgress(nextProgress);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleBurgerClick = () => {
    setMenuOpen((prev) => !prev);
    setScrollMeterActive((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setScrollMeterActive(false);
  };

  return (
    <header
      className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}
      data-testid="site-header"
    >
      <div className="site-header__inner">
        <a href="#inicio" className="site-header__logo" data-testid="header-logo" aria-label="Ir a inicio">
          <img src={logoUrl} alt="Match&Live" className="site-header__logo-img" />
        </a>

        <a href="#inicio" className="site-header__logo-text" data-testid="header-logo-text">
          Match&Live
        </a>

        <nav className={`site-header__nav ${menuOpen ? 'is-open' : ''}`} data-testid="header-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`site-header__link ${link.href === '#inicio' ? '' : 'site-header__link--mobile-only'}`}
              data-testid={`nav-link-${link.href.slice(1)}`}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <div className="site-header__nav-auth" data-testid="header-mobile-auth">
            <Link
              to="/login"
              className="site-header__nav-auth-link"
              data-testid="header-mobile-login-button"
              onClick={closeMenu}
            >
              Inicio sesión
            </Link>
            <Link
              to="/register"
              className="site-header__nav-auth-link site-header__nav-auth-link--cta"
              data-testid="header-mobile-register-button"
              onClick={closeMenu}
            >
              Registro
            </Link>
          </div>
        </nav>

        <div className="site-header__actions">
          <a href="#inicio" className="site-header__login" data-testid="header-home-button">Inicio</a>
          <Link to="/login" className="site-header__login" data-testid="header-login-button">Sesión</Link>
          <Link to="/register" className="site-header__cta" data-testid="header-cta-button">Registro</Link>

          <button
            className={`site-header__burger ${menuOpen ? 'is-open' : ''}`}
            onClick={handleBurgerClick}
            data-testid="header-burger-button"
            aria-label="Menu"
            aria-pressed={scrollMeterActive}
          >
            <span className="site-header__burger-line" />
            <span className="site-header__burger-line" />
            <span className="site-header__burger-line" />
            <span
              className={`site-header__burger-meter ${scrollMeterActive ? 'is-active' : ''}`}
              style={{ '--scroll-progress': scrollProgress }}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </header>
  );
}



